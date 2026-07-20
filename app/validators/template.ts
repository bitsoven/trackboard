import vine from '@vinejs/vine'

const fieldTypes = [
  'text',
  'textarea',
  'select',
  'radio',
  'checkbox',
  'number',
  'date',
  'file',
  'severity-scale',
] as const

const templateFieldValidator = vine.object({
  key: vine
    .string()
    .trim()
    .regex(/^[a-z][a-z0-9_]*$/)
    .maxLength(64),
  label: vine.string().trim().minLength(1).maxLength(255),
  type: vine.enum(fieldTypes),
  isRequired: vine.boolean().optional(),
  is_required: vine.boolean().optional(),
  options: vine.any().optional().nullable(),
  sortOrder: vine.number().optional(),
  sort_order: vine.number().optional(),
  showIf: vine.any().optional().nullable(),
  show_if: vine.any().optional().nullable(),
})

export const createTemplateValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    isDefault: vine.boolean().optional(),
    is_default: vine.boolean().optional(),
    fields: vine.array(templateFieldValidator).optional(),
  })
)

export const updateTemplateValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    isDefault: vine.boolean().optional(),
    is_default: vine.boolean().optional(),
    fields: vine.array(templateFieldValidator).optional(),
  })
)
