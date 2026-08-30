import { TemplateFieldSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo, column } from '@adonisjs/lucid/orm'
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

/**
 * The `options` and `showIf` columns are stored as JSON. The generated schema
 * declares them as plain `any`, so without explicit prepare/consume they
 * round-trip as raw strings. Serialize them to/from objects here so consumers
 * (the widget config API in particular) receive real structures.
 */
function jsonPrepare(value: unknown) {
  return value === null || value === undefined ? value : JSON.stringify(value)
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

export default class TemplateField extends TemplateFieldSchema {
  @belongsTo(() => ReportTemplate, {
    foreignKey: 'reportTemplateId',
  })
  declare reportTemplate: BelongsTo<typeof ReportTemplate>

  @column({ prepare: jsonPrepare, consume: jsonConsume })
  declare options: any | null

  @column({ prepare: jsonPrepare, consume: jsonConsume })
  declare showIf: any | null

  get normalizedType(): TemplateFieldType {
    return this.type as TemplateFieldType
  }
}
