import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import TeamService from '#services/team_service'

export default class NewAccountController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/signup', {})
  }

  async store({ request, response, auth }: HttpContext) {
    const { passwordConfirmation, inviteToken, ...payload } =
      await request.validateUsing(signupValidator)
    const user = await User.create({ ...payload })

    await auth.use('web').login(user)
    const projectId = await TeamService.acceptPendingForUser(user.id)
    if (projectId) {
      response.redirect().toPath(`/projects/${projectId}/team`)
    } else {
      response.redirect().toRoute('home')
    }
  }
}
