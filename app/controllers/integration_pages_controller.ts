import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Project from '#models/project'
import TeamService from '#services/team_service'
import ApiKeyService from '#services/api_key_service'
import WebhookService from '#services/webhook_service'
import ApiKeyTransformer from '#transformers/api_key_transformer'
import WebhookTransformer from '#transformers/webhook_transformer'

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
export default class IntegrationPagesController {
  async index({ inertia, params, auth, session }: HttpContext) {
    const user = auth.user!
    const project = await findProjectOrFail(params.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return inertia.render('errors/not_found' as any, {} as any)
    }

    const apiKeys = await ApiKeyService.listForProject(project.id)
    const webhooks = await WebhookService.listForProject(project.id)
    const appUrl = process.env.APP_URL ?? 'http://localhost:3333'
    const apiKeyRaw = (session.flashMessages.get('apiKeyRaw') as string | undefined) ?? null

    return inertia.render(
      'integrations/index' as any,
      {
        project: { id: project.id, name: project.name, slug: project.slug },
        apiKeys: apiKeys.map((k) => new ApiKeyTransformer(k).toObject()),
        webhooks: webhooks.map((w) => new WebhookTransformer(w).toObject()),
        appUrl,
        apiKeyRaw,
      } as any
    )
  }
}
