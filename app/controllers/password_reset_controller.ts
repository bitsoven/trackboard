import type { HttpContext } from '@adonisjs/core/http'
import PasswordResetService from '#services/password_reset_service'
import { forgotPasswordValidator, resetPasswordValidator } from '#validators/password_reset'

export default class PasswordResetController {
  async showForgot({ inertia }: HttpContext) {
    return inertia.render('auth/forgot_password' as any, {} as any)
  }

  async sendReset({ request, response, session }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)
    await PasswordResetService.sendResetLink(email)
    session.flash('success', 'If an account exists for that email, a reset link is on its way.')
    return response.redirect().back()
  }

  async reset({ request, response, session }: HttpContext) {
    const { token, password } = await request.validateUsing(resetPasswordValidator)
    await PasswordResetService.reset(token, password)
    session.flash('success', 'Your password was reset. Please sign in.')
    return response.redirect().toRoute('session.create')
  }
}
