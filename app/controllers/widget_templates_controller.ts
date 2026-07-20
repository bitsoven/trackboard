import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ReportTemplateService from '#services/report_template_service'
import ApiKey from '#models/api_key'
import ReportTemplateTransformer from '#transformers/report_template_transformer'

@inject()
export default class WidgetTemplatesController {
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
    if (!template) {
      return response.notFound({ message: 'No template found for this project' })
    }

    // Return template schema for widget to render dynamic form
    return response.json({ data: new ReportTemplateTransformer(template as any).toObject() })
  }
}
