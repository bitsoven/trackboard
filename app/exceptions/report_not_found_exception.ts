import { Exception } from '@adonisjs/core/exceptions'

export default class ReportNotFoundException extends Exception {
  static status = 404
  static code = 'E_REPORT_NOT_FOUND'
  static message = 'Report not found'
}
