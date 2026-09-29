import { Exception } from '@adonisjs/core/exceptions'

export default class PasswordResetException extends Exception {
  static status = 400
  static code = 'E_PASSWORD_RESET_INVALID_TOKEN'

  static invalidToken() {
    const e = new PasswordResetException('This password reset link is invalid or has expired')
    e.status = 400
    return e
  }
}
