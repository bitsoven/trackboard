import { Exception } from '@adonisjs/core/exceptions'

export default class ReportVerificationException extends Exception {
  static invalidToken() {
    return new this('Invalid or expired verification link', {
      status: 400,
      code: 'E_VERIFICATION_INVALID_TOKEN',
    })
  }

  static alreadyVerified() {
    return new this('This report has already been verified', {
      status: 409,
      code: 'E_VERIFICATION_ALREADY_VERIFIED',
    })
  }
}
