import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ReportTemplateService from '#services/report_template_service'
import { createTemplateValidator, updateTemplateValidator } from '#validators/template'
import ReportTemplateTransformer from '#transformers/report_template_transformer'
import Project from '#models/project'
import TeamService from '#services/team_service'

async function findProjectOrFail(param: string | number): Promise<Project> {
  const str = String(param)
  if (/^\d+$/.test(str)) {
    const byId = await Project.find(Number(str))
    if (byId) return byId
  }
  const bySlug = await Project.findBy('slug', str)
  if (bySlug) return bySlug
  return Project.findOrFail(param as any)
}

@inject()
export default class ReportTemplatesController {
  constructor(protected templateService: ReportTemplateService) {}

  async index({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.id)

    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized for this project' })
    }

    const templates = await this.templateService.listForProject(project.id)
    return response.json({
      data: templates.map((t) => new ReportTemplateTransformer(t as any).toObject()),
    })
  }

  async store({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.id)

    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized for this project' })
    }

    const payload = await request.validateUsing(createTemplateValidator)
    const template = await this.templateService.create(project.id, payload as any)
    return response.created({ data: new ReportTemplateTransformer(template as any).toObject() })
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const template = await this.templateService.findById(Number(params.id))
    const project = await Project.findOrFail(template.projectId)

    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized for this project' })
    }

    const payload = await request.validateUsing(updateTemplateValidator)
    const updated = await this.templateService.update(template.id, payload as any)
    return response.json({ data: new ReportTemplateTransformer(updated as any).toObject() })
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const template = await this.templateService.findById(Number(params.id))
    const project = await Project.findOrFail(template.projectId)

    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized for this project' })
    }

    await this.templateService.delete(template.id)
    return response.noContent()
  }
}
