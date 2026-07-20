import { Exception } from '@adonisjs/core/exceptions'

export default class TemplateNotFoundException extends Exception {
  static status = 404
  static code = 'E_TEMPLATE_NOT_FOUND'
  static message = 'Report template not found'
}
