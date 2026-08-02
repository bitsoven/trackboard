import vine from '@vinejs/vine'

export const sendMessageValidator = vine.compile(
  vine.object({
    body: vine.string().trim().minLength(1).maxLength(20000),
  })
)

export const portalMessageValidator = vine.compile(
  vine.object({
    body: vine.string().trim().minLength(1).maxLength(20000),
  })
)
