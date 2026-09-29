import { BaseMail } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'
import type User from '#models/user'

export default class PasswordResetMail extends BaseMail {
  constructor(
    private user: User,
    private resetUrl: string
  ) {
    super()
  }

  prepare() {
    this.message.to(this.user.email)
    this.message.subject('Reset your Trackboard password')
    this.message.html(`
      <p>Hello,</p>
      <p>We received a request to reset the password for your Trackboard account.</p>
      <p><a href="${this.escape(this.resetUrl)}">Choose a new password</a></p>
      <p>This link expires in 1 hour. If you did not request a reset, you can ignore this email.</p>
    `)
    this.message.text(
      `Reset your password by opening this link: ${this.resetUrl}\nThis link expires in 1 hour.`
    )
  }

  private escape(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }
}

export function sendPasswordResetMail(user: User, resetUrl: string): Promise<unknown> {
  return mail.use().send(new PasswordResetMail(user, resetUrl))
}
