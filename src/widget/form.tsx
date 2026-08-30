import { type WidgetField, type ShowIfCondition } from './types.js'
import { Field } from './fields.js'
import type { I18n } from './i18n.js'

/**
 * Fields that are first-class Report columns ("title", "reporterEmail") are
 * rendered as built-in inputs by the widget, so they are never part of the
 * dynamic form.
 */
const RESERVED_FIELD_KEYS = ['title', 'reporterEmail']

/**
 * Pure helper: determine if a field should be rendered given the current values
 * and its `showIf` condition. Supports equals / notEquals / in.
 */
export function isFieldVisible(field: WidgetField, values: Record<string, unknown>): boolean {
  const condition = field.showIf as ShowIfCondition | null
  if (!condition || !condition.fieldKey) return true
  const current = values[condition.fieldKey]
  if ('equals' in condition) {
    return current === condition.equals
  }
  if ('notEquals' in condition) {
    return current !== condition.notEquals
  }
  if ('in' in condition && Array.isArray(condition.in)) {
    return condition.in.includes(current)
  }
  return true
}

interface DynamicFormProps {
  fields: WidgetField[]
  values: Record<string, unknown>
  errors: Record<string, string>
  i18n: I18n
  onChange: (key: string, value: unknown) => void
}

export function DynamicForm(props: DynamicFormProps) {
  const visible = props.fields.filter(
    (f) => !RESERVED_FIELD_KEYS.includes(f.key) && isFieldVisible(f, props.values)
  )
  return (
    <div>
      {visible.map((field) => (
        <Field
          key={field.key}
          field={field}
          value={props.values[field.key]}
          error={props.errors[field.key]}
          onChange={(v: unknown) => props.onChange(field.key, v)}
        />
      ))}
    </div>
  )
}
