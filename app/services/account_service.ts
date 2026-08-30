import User from '#models/user'

export type UpdateAccountPayload = {
  fullName?: string | null
  email?: string
  password?: string
}

export default class AccountService {
  /**
   * Apply account changes for a user. Only the fields present on the payload
   * are updated. The password is re-hashed by the User model's auth hook, so
   * it is passed through as plain text.
   */
  static async update(userId: number, data: UpdateAccountPayload): Promise<User> {
    const user = await User.findOrFail(userId)
    if (data.fullName !== undefined) user.fullName = data.fullName
    if (data.email !== undefined) user.email = data.email
    if (data.password) user.password = data.password
    await user.save()
    return user
  }
}
