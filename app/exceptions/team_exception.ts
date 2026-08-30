import { Exception } from '@adonisjs/core/exceptions'

export default class TeamException extends Exception {
  static status = 403
  static code = 'E_TEAM_ACTION_FORBIDDEN'

  static forbidden() {
    const e = new TeamException('You are not allowed to manage this project team')
    e.status = 403
    return e
  }

  static invalidToken() {
    const e = new TeamException('This invitation link is invalid or has expired')
    e.status = 400
    return e
  }

  static lastOwner() {
    const e = new TeamException('Cannot remove the last owner of a project')
    e.status = 403
    return e
  }
}
