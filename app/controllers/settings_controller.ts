import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Project from '#models/project'
import AccountService from '#services/account_service'
import ProjectService from '#services/project_service'
import { updateAccountValidator } from '#validators/user'
import { updateProjectValidator } from '#validators/project'

@inject()
export default class SettingsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('settings/index' as any, {} as any)
  }

  async update({ request, response, auth, session }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(updateAccountValidator(user.id, user.password))
    await AccountService.update(user.id, {
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
    })
    session.flash('success', 'Account settings updated')
    return response.redirect().back()
  }

  async projectIndex({ params, auth, response }: HttpContext) {
    const project = await this.loadOwned(Number(params.id), auth.user!)
    if (!project) return response.redirect().toPath('/projects')
    return response.redirect().toPath(`/projects/${project.id}`)
  }

  async projectUpdate({ request, response, params, auth, session }: HttpContext) {
    const project = await this.loadOwned(Number(params.id), auth.user!)
    if (!project) return response.redirect().toPath('/projects')

    const payload = await request.validateUsing(updateProjectValidator)
    await ProjectService.update(project.id, {
      name: payload.name,
      slug: payload.slug,
      requireEmailVerification: payload.requireEmailVerification,
    })
    session.flash('success', 'Project updated')
    return response.redirect().back()
  }

  async projectDestroy({ response, params, auth, session }: HttpContext) {
    const project = await this.loadOwned(Number(params.id), auth.user!)
    if (!project) return response.redirect().toPath('/projects')

    const name = project.name
    await ProjectService.delete(project.id)
    session.flash('success', `Project "${name}" deleted`)
    return response.redirect().toPath('/projects')
  }

  /**
   * Load a project only if the user owns it or is a global admin. Returns
   * null when the project does not exist or the user lacks access, so callers
   * can render a not-found page.
   */
  private async loadOwned(id: number, user: { id: number; role: string }) {
    const project = await Project.find(id)
    if (!project) return null
    if (project.ownerId !== user.id && user.role !== 'admin') return null
    return project
  }
}
