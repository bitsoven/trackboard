import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ReportTemplateService from '#services/report_template_service'
import Project from '#models/project'
import TeamService from '#services/team_service'

async function findProjectOrFail(param: string | number): Promise<Project> {
  const str = String(param)
  // Try numeric id first
  if (/^\d+$/.test(str)) {
    const byId = await Project.find(Number(str))
    if (byId) return byId
  }
  const bySlug = await Project.findBy('slug', str)
  if (bySlug) return bySlug
  // Fallback to id lookup (will throw 404)
  return Project.findOrFail(param as any)
}

@inject()
export default class TemplatePagesController {
  constructor(protected templateService: ReportTemplateService) {}

  async index({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.projectId ?? params.id)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.redirect().toPath('/projects')
    }
    return response.redirect().toPath(`/projects/${project.id}`)
  }

  async create({ inertia, params, auth }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.projectId ?? params.id)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return inertia.render('errors/not_found' as any, {} as any)
    }
    return inertia.render(
      'templates/form' as any,
      {
        project: { id: project.id, name: project.name, slug: project.slug },
        template: null,
      } as any
    )
  }

  async edit({ inertia, params, auth }: HttpContext) {
    const user = auth.user!
    const template = await this.templateService.findById(Number(params.id))
    const project = await Project.findOrFail(template.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return inertia.render('errors/not_found' as any, {} as any)
    }
    const data = {
      id: template.id,
      projectId: template.projectId,
      name: template.name,
      isDefault: !!template.isDefault,
      fields: (template as any).fields.map((f: any) => ({
        id: f.id,
        key: f.key,
        label: f.label,
        type: f.type,
        isRequired: !!f.isRequired,
        options: typeof f.options === 'string' ? JSON.parse(f.options) : f.options,
        sortOrder: f.sortOrder,
        showIf: typeof f.showIf === 'string' ? JSON.parse(f.showIf) : f.showIf,
      })),
    }
    return inertia.render(
      'templates/form' as any,
      {
        project: { id: project.id, name: project.name, slug: project.slug },
        template: data,
      } as any
    )
  }

  async store({ request, params, auth, response }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.projectId ?? params.id)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized' })
    }
    const payload = request.only(['name', 'isDefault', 'is_default', 'fields'])
    // Normalize fields from Inertia form (may be JSON string)
    if (typeof payload.fields === 'string') {
      try {
        payload.fields = JSON.parse(payload.fields)
      } catch {}
    }
    await this.templateService.create(project.id, payload as any)
    return response.redirect().toPath(`/projects/${project.id}`)
  }

  async update({ request, params, auth, response }: HttpContext) {
    const user = auth.user!
    const template = await this.templateService.findById(Number(params.id))
    const project = await Project.findOrFail(template.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized' })
    }
    const payload = request.only(['name', 'isDefault', 'is_default', 'fields'])
    if (typeof payload.fields === 'string') {
      try {
        payload.fields = JSON.parse(payload.fields)
      } catch {}
    }
    await this.templateService.update(template.id, payload as any)
    return response.redirect().toPath(`/projects/${project.id}`)
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const template = await this.templateService.findById(Number(params.id))
    const project = await Project.findOrFail(template.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized' })
    }
    await this.templateService.delete(template.id)
    return response.redirect().back()
  }
}
