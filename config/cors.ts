import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  /**
   * Enable or disable CORS handling globally.
   */
  enabled: true,

  /**
   * In development, allow every origin to simplify local front/backend setup.
   *
   * In production the embeddable widget is loaded from the customer's own
   * site (a different origin), so the browser must be permitted to read the
   * responses of the public widget API. Authorization for those endpoints is
   * enforced separately by the API key and the `originCheck` middleware, so
   * CORS only needs to allow the browser round-trip. We therefore open up
   * cross-origin access for `/api/public/*` (and same-origin requests) while
   * leaving every other route locked down.
   */
  origin: app.inDev
    ? true
    : (origin, ctx) => {
        // Same-origin / non-browser requests are never subject to CORS.
        if (!origin) return true
        return ctx.request.url().startsWith('/api/public/')
      },

  /**
   * HTTP methods accepted for cross-origin requests.
   */
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],

  /**
   * Reflect request headers by default. Use a string array to restrict
   * allowed headers.
   */
  headers: true,

  /**
   * Response headers exposed to the browser.
   */
  exposeHeaders: [],

  /**
   * Allow cookies/authorization headers on cross-origin requests.
   */
  credentials: true,

  /**
   * Cache CORS preflight response for N seconds.
   */
  maxAge: 90,
})

export default corsConfig
