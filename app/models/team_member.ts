import { TeamMemberSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import Project from '#models/project'
import User from '#models/user'

export default class TeamMember extends TeamMemberSchema {
  @belongsTo(() => Project, {
    foreignKey: 'projectId',
  })
  declare project: BelongsTo<typeof Project>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>
}
