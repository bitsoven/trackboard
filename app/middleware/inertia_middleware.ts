import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import UserTransformer from '#transformers/user_transformer'
import Project from '#models/project'
import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware'

export default class InertiaMiddleware extends BaseInertiaMiddleware {
  async share(ctx: HttpContext) {
    /**
     * The share method is called everytime an Inertia page is rendered. In
     * certain cases, a page may get rendered before the session middleware
     * or the auth middleware are executed. For example: During a 404 request.
     *
     * In that case, we must always assume that HttpContext is not fully hydrated
     * with all the properties
     */
    const { auth } = ctx as Partial<HttpContext>

    /**
     * Data shared with all Inertia pages. Make sure you are using
     * transformers for rich data-types like Models.
     */
    let projects: { id: number; name: string; slug: string }[] = []
    if (auth?.user) {
      try {
        if (auth.user.role === 'admin') {
          const all = await Project.query().select('id', 'name', 'slug')
          projects = all.map((p) => ({ id: p.id, name: p.name, slug: p.slug }))
        } else {
          const owned = await Project.query()
            .where('ownerId', auth.user.id)
            .select('id', 'name', 'slug')
          projects = owned.map((p) => ({ id: p.id, name: p.name, slug: p.slug }))
        }
      } catch {
        projects = []
      }
    }

    return {
      errors: ctx.inertia.always(this.getValidationErrors(ctx)),
      user: ctx.inertia.always(auth?.user ? UserTransformer.transform(auth.user) : undefined),
      projects: ctx.inertia.always(projects),
    }
  }

  /**
   * The flash bag is sent to every Inertia page as a top-level "flash" field
   * (a sibling of "props") and is read on the client using "usePage().flash".
   *
   * Just like the share method, the flash method may run before the session
   * middleware, so HttpContext must be treated as partially hydrated.
   */
  flash(ctx: HttpContext) {
    const { session } = ctx as Partial<HttpContext>

    /**
     * Fetching the first error from the flash messages
     */
    return {
      error: session?.flashMessages.get('error') as string | undefined,
      success: session?.flashMessages.get('success') as string | undefined,
    }
  }

  async handle(ctx: HttpContext, next: NextFn) {
    await this.init(ctx)

    const output = await next()
    this.dispose(ctx)

    return output
  }
}

declare module '@adonisjs/inertia/types' {
  type MiddlewareSharedProps = InferSharedProps<InertiaMiddleware>
  export interface SharedProps extends MiddlewareSharedProps {}
}
