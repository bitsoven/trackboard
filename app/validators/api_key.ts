import vine from '@vinejs/vine'

export const createApiKeyValidator = vine.compile(
  vine.object({
    label: vine.string().trim().minLength(1).maxLength(255).optional(),
  })
)
