import vine from '@vinejs/vine'

const email = () => vine.string().email().maxLength(254)

export const forgotPasswordValidator = vine.create({
  email: email(),
})

export const resetPasswordValidator = vine.create({
  token: vine.string().minLength(16).maxLength(254),
  password: vine.string().minLength(8).maxLength(32),
})
