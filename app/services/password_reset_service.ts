import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import User from '#models/user'
import PasswordResetException from '#exceptions/password_reset_exception'
import { sendPasswordResetMail } from '#mails/password_reset_mail'

const TOKEN_TTL_MINUTES = 60

/**
 * Reset tokens are stored as a SHA-256 hash so a database leak cannot be used
 * to take over accounts. The plaintext token only ever travels in the email.
 */
function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export default class PasswordResetService {
  /**
   * Issue a reset link for the given email. Resolves quietly when no account
   * matches so callers never reveal whether an email is registered.
   */
  static async sendResetLink(email: string): Promise<void> {
    const user = await User.findBy('email', email)
    if (!user) return

    const token = crypto.randomBytes(32).toString('hex')
    user.passwordResetToken = hashToken(token)
    user.passwordResetExpiresAt = DateTime.now().plus({ minutes: TOKEN_TTL_MINUTES })
    await user.save()

    const appUrl = (process.env.APP_URL ?? 'http://localhost:3333').replace(/\/$/, '')
    await sendPasswordResetMail(user, `${appUrl}/reset-password?token=${token}`)
  }

  /**
   * Consume a reset token and set a new password. Throws when the token is
   * unknown or expired.
   */
  static async reset(token: string, password: string): Promise<User> {
    const user = await User.query()
      .where('passwordResetToken', hashToken(token))
      .where('passwordResetExpiresAt', '>', DateTime.now().toJSDate())
      .first()

    if (!user) throw PasswordResetException.invalidToken()

    user.password = password
    user.passwordResetToken = null
    user.passwordResetExpiresAt = null
    await user.save()
    return user
  }
}
