import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { hasMany } from '@adonisjs/lucid/orm'
import Project from '#models/project'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  @hasMany(() => Project, {
    foreignKey: 'ownerId',
  })
  declare projects: HasMany<typeof Project>

  get initials(): string {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }

    return `${first.slice(0, 2)}`.toUpperCase()
  }
}
