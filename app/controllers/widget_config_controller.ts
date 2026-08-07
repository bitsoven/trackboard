import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ApiKey from '#models/api_key'
import ReportTemplateService from '#services/report_template_service'
import ReportTemplateTransformer from '#transformers/report_template_transformer'

@inject()
export default class WidgetConfigController {
  constructor(protected templateService: ReportTemplateService) {}

  async show({ request, response }: HttpContext) {
    const rawKey = (request.qs().key as string) || (request.input('key') as string)

    if (!rawKey) {
      return response.badRequest({ message: 'Missing API key (query param ?key=...)' })
    }

    const project = await ApiKey.findProjectByKey(rawKey)
    if (!project) {
      return response.unauthorized({ message: 'Invalid API key' })
    }

    const template = await this.templateService.getForWidget(project.id)

    return response.json({
      data: {
        project: {
          name: project.name,
          requireEmailVerification: !!project.requireEmailVerification,
        },
        template: template ? new ReportTemplateTransformer(template as any).toObject() : null,
      },
    })
  }
}
