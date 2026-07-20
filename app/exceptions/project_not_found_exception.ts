import { Exception } from '@adonisjs/core/exceptions'

export default class ProjectNotFoundException extends Exception {
  static status = 404
  static code = 'E_PROJECT_NOT_FOUND'
  static message = 'Project not found'
}
