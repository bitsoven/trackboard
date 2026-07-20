import { ReportTemplateSchema } from '#database/schema'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Project from '#models/project'
import TemplateField from '#models/template_field'

export default class ReportTemplate extends ReportTemplateSchema {
  @belongsTo(() => Project, {
    foreignKey: 'projectId',
  })
  declare project: BelongsTo<typeof Project>

  @hasMany(() => TemplateField, {
    foreignKey: 'reportTemplateId',
  })
  declare fields: HasMany<typeof TemplateField>
}
