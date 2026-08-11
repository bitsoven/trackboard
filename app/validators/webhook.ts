import vine from '@vinejs/vine'

export const createWebhookValidator = vine.compile(
  vine.object({
    url: vine.string().trim().url(),
    events: vine.array(vine.string().trim().minLength(1)).minLength(1),
    secret: vine.string().trim().minLength(8).optional(),
    active: vine.boolean().optional(),
  })
)

export const updateWebhookValidator = vine.compile(
  vine.object({
    url: vine.string().trim().url().optional(),
    events: vine.array(vine.string().trim().minLength(1)).optional(),
    secret: vine.string().trim().minLength(8).optional(),
    active: vine.boolean().optional(),
  })
)
