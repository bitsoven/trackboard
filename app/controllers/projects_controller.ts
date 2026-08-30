import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ProjectService from '#services/project_service'
import ReportTemplateService from '#services/report_template_service'
import ProjectTransformer from '#transformers/project_transformer'
import { createProjectValidator } from '#validators/project'

@inject()
export default class ProjectsController {
  constructor(protected templateService: ReportTemplateService) {}

  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const projects = await ProjectService.listForUser(user.id, user.role)

    return inertia.render(
      'projects/index' as any,
      {
        projects: projects.map((p) => new ProjectTransformer(p).toObject()),
      } as any
    )
  }

  /**
   * Single project page: report templates + project settings + danger zone.
   */
  async show({ inertia, params, auth }: HttpContext) {
    const user = auth.user!
    const project = await ProjectService.findForUser(params.id, user.id, user.role)

    const templates = await this.templateService.listForProject(project.id)
    const data = templates.map((t) => ({
      id: t.id,
      projectId: t.projectId,
      name: t.name,
      isDefault: !!t.isDefault,
      createdAt: t.createdAt?.toISO() ?? null,
      fields: (t as any).fields.map((f: any) => ({
        id: f.id,
        key: f.key,
        label: f.label,
        type: f.type,
        isRequired: !!f.isRequired,
        options: typeof f.options === 'string' ? JSON.parse(f.options) : f.options,
        sortOrder: f.sortOrder,
        showIf: typeof f.showIf === 'string' ? JSON.parse(f.showIf) : f.showIf,
      })),
    }))

    return inertia.render(
      'projects/show' as any,
      {
        project: {
          id: project.id,
          name: project.name,
          slug: project.slug,
          requireEmailVerification: !!project.requireEmailVerification,
        },
        templates: data,
      } as any
    )
  }

  async store({ request, response, auth, session }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(createProjectValidator)
    const project = await ProjectService.create({
      name: payload.name,
      ownerId: user.id,
      slug: payload.slug,
      requireEmailVerification: payload.requireEmailVerification,
    })

    session.flash('success', `Project "${project.name}" created`)
    return response.redirect().toPath(`/projects/${project.id}`)
  }
}
