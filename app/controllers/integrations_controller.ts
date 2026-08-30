import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Project from '#models/project'
import TeamService from '#services/team_service'
import ApiKeyService from '#services/api_key_service'
import WebhookService from '#services/webhook_service'
import { createApiKeyValidator } from '#validators/api_key'
import { createWebhookValidator } from '#validators/webhook'

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
export default class IntegrationsController {
  async storeApiKey({ params, request, auth, response, session }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized' })
    }
    const payload = await request.validateUsing(createApiKeyValidator)
    const { rawKey } = await ApiKeyService.create(project.id, payload.label)
    session.flash('apiKeyRaw', rawKey)
    session.flash('success', 'API key created')
    return response.redirect().toPath(`/projects/${project.id}/integrations`)
  }

  async revokeApiKey({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized' })
    }
    const key = await ApiKeyService.listForProject(project.id)
    const target = key.find((k) => k.id === Number(params.id))
    if (target) await ApiKeyService.revoke(target.id)
    return response.redirect().back()
  }

  async storeWebhook({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized' })
    }
    const payload = await request.validateUsing(createWebhookValidator)
    await WebhookService.create(project.id, payload)
    return response.redirect().back()
  }

  async destroyWebhook({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized' })
    }
    await WebhookService.delete(Number(params.id))
    return response.redirect().back()
  }
}
