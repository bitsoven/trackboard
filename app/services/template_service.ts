import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type ReportTemplate from '#models/report_template'
import type { TemplateFieldType } from '#models/template_field'

export type SupportedFieldType = TemplateFieldType

/**
 * Builds a VineJS validator at runtime from a ReportTemplate's field definitions.
 * Each field's `key` becomes a property in the schema; required fields are non-optional.
 */
function parseOptions(options: any): any {
  if (!options) return {}
  if (typeof options === 'string') {
    try {
      return JSON.parse(options)
    } catch {
      return {}
    }
  }
  return options
}

export function buildDynamicSchema(template: ReportTemplate) {
  const shape: Record<string, any> = {}

  const fields = (template as any).fields as Array<{
    key: string
    label: string
    type: SupportedFieldType
    isRequired: boolean
    options: any
  }>

  for (const field of fields ?? []) {
    const opts = parseOptions(field.options)
    let fieldValidator: any

    switch (field.type) {
      case 'text': {
        let v = vine.string().trim()
        if (opts.maxLength) v = v.maxLength(opts.maxLength)
        else v = v.maxLength(500)
        if (opts.minLength) v = v.minLength(opts.minLength)
        fieldValidator = v
        break
      }
      case 'textarea': {
        let v = vine.string().trim()
        if (opts.maxLength) v = v.maxLength(opts.maxLength)
        else v = v.maxLength(5000)
        fieldValidator = v
        break
      }
      case 'select':
      case 'radio': {
        const choices: string[] = opts.choices ?? opts.options ?? []
        if (choices.length > 0) {
          fieldValidator = vine.enum(choices)
        } else {
          fieldValidator = vine.string().trim()
        }
        break
      }
      case 'checkbox': {
        // Single checkbox = boolean, multi-checkbox (choices) = array of enums
        const choices: string[] = opts.choices ?? []
        if (choices.length > 0) {
          fieldValidator = vine.array(vine.enum(choices))
        } else {
          fieldValidator = vine.boolean()
        }
        break
      }
      case 'number': {
        let v = vine.number()
        if (typeof opts.min === 'number') v = v.min(opts.min)
        if (typeof opts.max === 'number') v = v.max(opts.max)
        fieldValidator = v
        break
      }
      case 'date': {
        // Vine's date validator expects a JS Date or ISO string that can be parsed
        fieldValidator = vine.date()
        break
      }
      case 'file': {
        // File uploads arrive as string URLs (after MinIO upload) or vine file?
        // Accept a string (url) for JSON payloads; multipart handling is separate
        fieldValidator = vine.string().trim()
        break
      }
      case 'severity-scale': {
        const min = typeof opts.scaleMin === 'number' ? opts.scaleMin : 1
        const max = typeof opts.scaleMax === 'number' ? opts.scaleMax : 5
        fieldValidator = vine.number().min(min).max(max)
        break
      }
      default: {
        fieldValidator = vine.string().trim()
        break
      }
    }

    if (!field.isRequired) {
      fieldValidator = fieldValidator.optional()
    }

    shape[field.key] = fieldValidator
  }

  const validator = vine.create(shape)

  // Use simple messages provider for clearer errors
  validator.messagesProvider = new SimpleMessagesProvider({
    required: 'The {{ field }} field is required',
    string: 'The {{ field }} must be a string',
    enum: 'The {{ field }} must be one of the allowed options',
  })

  return validator
}

/**
 * Validate a payload against a template's dynamic schema.
 * Returns the validated data or throws E_VALIDATION_ERROR.
 */
export async function validatePayload(template: ReportTemplate, payload: Record<string, unknown>) {
  const validator = buildDynamicSchema(template)
  return validator.validate(payload)
}
