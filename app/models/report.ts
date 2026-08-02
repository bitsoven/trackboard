import { ReportSchema } from '#database/schema'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { belongsTo, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Project from '#models/project'
import ReportTemplate from '#models/report_template'
import ReportFieldValue from '#models/report_field_value'
import User from '#models/user'
import Conversation from '#models/conversation'

export default class Report extends ReportSchema {
  @belongsTo(() => Project, { foreignKey: 'projectId' })
  declare project: BelongsTo<typeof Project>

  @belongsTo(() => ReportTemplate, { foreignKey: 'templateId' })
  declare template: BelongsTo<typeof ReportTemplate>

  @belongsTo(() => User, { foreignKey: 'assigneeId' })
  declare assignee: BelongsTo<typeof User>

  @hasMany(() => ReportFieldValue, { foreignKey: 'reportId' })
  declare fieldValues: HasMany<typeof ReportFieldValue>

  @hasOne(() => Conversation, { foreignKey: 'reportId' })
  declare conversation: HasOne<typeof Conversation>
}
