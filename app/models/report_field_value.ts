import { ReportFieldValueSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import Report from '#models/report'

export default class ReportFieldValue extends ReportFieldValueSchema {
  @belongsTo(() => Report, { foreignKey: 'reportId' })
  declare report: BelongsTo<typeof Report>
}
