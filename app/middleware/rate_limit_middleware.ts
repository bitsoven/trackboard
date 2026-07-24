import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 60

export default class RateLimitMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const key =
      (ctx.request.qs().key as string) ||
      ctx.request.header('x-api-key') ||
      ctx.request.ip() ||
      'anonymous'
    const now = Date.now()
    let entry = store.get(key)

    if (!entry || now > entry.resetAt) {
      entry = { count: 0, resetAt: now + WINDOW_MS }
      store.set(key, entry)
    }

    entry.count += 1

    if (entry.count > MAX_REQUESTS) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
      ctx.response.header('Retry-After', String(retryAfter))
      return ctx.response.status(429).send({ message: 'Too many requests, please try again later' })
    }

    ctx.response.header('X-RateLimit-Limit', String(MAX_REQUESTS))
    ctx.response.header('X-RateLimit-Remaining', String(Math.max(0, MAX_REQUESTS - entry.count)))
    return next()
  }
}
