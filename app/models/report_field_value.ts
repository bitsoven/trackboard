import { ReportFieldValueSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import Report from '#models/report'

export default class ReportFieldValue extends ReportFieldValueSchema {
  @column()
  declare reportId: string

  @belongsTo(() => Report, { foreignKey: 'reportId' })
  declare report: BelongsTo<typeof Report>
}
