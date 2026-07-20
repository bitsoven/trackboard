import { TemplateFieldSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import ReportTemplate from '#models/report_template'

export type TemplateFieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'number'
  | 'date'
  | 'file'
  | 'severity-scale'

export interface TemplateFieldOptions {
  choices?: string[]
  placeholder?: string
  maxLength?: number
  min?: number
  max?: number
  accept?: string
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: string[]
}

export interface ShowIfCondition {
  fieldKey: string
  equals?: unknown
  notEquals?: unknown
  in?: unknown[]
}

export default class TemplateField extends TemplateFieldSchema {
  @belongsTo(() => ReportTemplate, {
    foreignKey: 'reportTemplateId',
  })
  declare reportTemplate: BelongsTo<typeof ReportTemplate>

  get normalizedType(): TemplateFieldType {
    return this.type as TemplateFieldType
  }
}
