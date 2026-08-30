import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import app from '@adonisjs/core/services/app'
import ApiKey from '#models/api_key'
import AllowedOrigin from '#models/allowed_origin'

export default class OriginCheckMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // In development the CORS config already allows every origin, so we mirror
    // that here and skip the origin allowlist entirely. This avoids blocking
    // local widget embeds that run on a different port than the app itself.
    // The allowlist is enforced only in test/production.
    if (app.inDev) {
      return next()
    }

    const rawKey =
      (ctx.request.qs().key as string) ||
      ctx.request.header('x-api-key') ||
      (ctx.request.input('key') as string)

    // If no key, let downstream handle (will be 401)
    if (!rawKey) {
      return next()
    }

    const project = await ApiKey.findProjectByKey(rawKey)
    if (!project) {
      return next()
    }

    const origins = await AllowedOrigin.query().where('projectId', project.id)
    const total = origins.length
    if (total === 0) {
      // No origins configured — allow all (ease dev)
      return next()
    }

    const origin = ctx.request.header('origin') || ctx.request.header('referer') || ''
    const isAllowed = await AllowedOrigin.isAllowed(project.id, origin)
    if (!origin) {
      return ctx.response.status(403).send({ message: 'Origin or Referer header required' })
    }

    if (!isAllowed) {
      return ctx.response.status(403).send({ message: 'Origin not allowed' })
    }

    return next()
  }
}
