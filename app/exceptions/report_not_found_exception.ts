import { Exception } from '@adonisjs/core/exceptions'

export default class ReportNotFoundException extends Exception {
  static status = 404
  static code = 'E_REPORT_NOT_FOUND'

  static reportNotFound() {
    const e = new ReportNotFoundException('Report not found')
    e.status = 404
    return e
  }
}
