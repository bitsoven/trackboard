import { ReportSchema } from '#database/schema'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { beforeCreate, belongsTo, hasMany, hasOne, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Project from '#models/project'
import ReportTemplate from '#models/report_template'
import ReportFieldValue from '#models/report_field_value'
import User from '#models/user'
import Conversation from '#models/conversation'

/**
 * `browserInfo`, `consoleErrors` and `networkErrors` are stored as JSON. The
 * generated schema declares them as plain `any`, so without explicit
 * prepare/consume the raw object/array is handed to SQLite, which throws
 * "can only bind numbers, strings, bigints, buffers, and null". Store them as
 * JSON strings and parse them back on read.
 */
function jsonPrepare(value: unknown) {
  if (value === null || value === undefined) return value
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}

function jsonConsume(value: unknown) {
  if (value === null || value === undefined) return value
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }
  return value
}

export default class Report extends ReportSchema {
  @beforeCreate()
  static assignUuid(report: Report) {
    report.id = report.id || randomUUID()
  }

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

  @column({ prepare: jsonPrepare, consume: jsonConsume })
  declare browserInfo: any | null

  @column({ prepare: jsonPrepare, consume: jsonConsume })
  declare consoleErrors: any | null

  @column({ prepare: jsonPrepare, consume: jsonConsume })
  declare networkErrors: any | null
}
