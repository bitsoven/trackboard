import User from '#models/user'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import TeamService from '#services/team_service'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    let user: User
    try {
      user = await User.verifyCredentials(email, password)
    } catch (error: any) {
      if (error.code === 'E_INVALID_CREDENTIALS') {
        session.flash('errors', { _global: 'Invalid email or password' })
        // Inertia reads from inputErrorsBag, so keep both in sync
        session.flash('inputErrorsBag', { _global: 'Invalid email or password' })
        return response.redirect().back()
      }
      throw error
    }

    await auth.use('web').login(user)
    const projectId = await TeamService.acceptPendingForUser(user.id)
    if (projectId) {
      response.redirect().toPath(`/projects/${projectId}/team`)
    } else {
      response.redirect().toRoute('home')
    }
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect().toRoute('session.create')
  }
}
