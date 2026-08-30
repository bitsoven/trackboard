import vine from '@vinejs/vine'
import hash from '@adonisjs/core/services/hash'

const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Custom rule that verifies the supplied "current password" against the
 * user's stored hash before allowing account changes.
 */
function verifyCurrentPassword(currentHash: string) {
  return vine.createRule(async (value, _options, field) => {
    if (!value || typeof value !== 'string') {
      field.report(
        'Enter your current password to save changes',
        'account.current_password_required',
        field
      )
      return
    }
    const matches = await hash.verify(currentHash, value)
    if (!matches) {
      field.report('Current password is incorrect', 'account.current_password_invalid', field)
    }
  })()
}

/**
 * Build the account-update validator. The validator is a factory so the
 * uniqueness check can exclude the current user and the current-password
 * rule can verify against the user's stored hash.
 */
export function updateAccountValidator(userId: number, currentPasswordHash: string) {
  return vine.create({
    fullName: vine.string().maxLength(80).nullable(),
    email: email().unique({
      table: 'users',
      column: 'email',
      filter: (query) => {
        query.whereNot('id', userId)
      },
    }),
    password: password().confirmed({ confirmationField: 'passwordConfirmation' }).optional(),
    passwordConfirmation: vine.string().optional(),
    currentPassword: vine.string().use(verifyCurrentPassword(currentPasswordHash)),
  })
}

/**
 * "passwordConfirmation" is declared explicitly, so that it is part of the
 * request body type shared with the frontend. Otherwise the signup form has
 * no way to know about the errors reported for this field.
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password().confirmed({
    confirmationField: 'passwordConfirmation',
  }),
  passwordConfirmation: vine.string(),
  inviteToken: vine.string().optional(),
})

export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
