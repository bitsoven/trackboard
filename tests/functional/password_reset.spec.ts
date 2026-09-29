import crypto from 'node:crypto'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import User from '#models/user'
import PasswordResetMail from '#mails/password_reset_mail'

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

test.group('Password reset', (group) => {
  let fakeMailer: ReturnType<typeof mail.fake>

  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => {
    fakeMailer = mail.fake()
    return () => mail.restore()
  })

  async function makeUser(email: string) {
    return User.create({
      email,
      password: 'password123',
      fullName: 'Reset',
      role: 'admin',
    })
  }

  test('renders the forgot password page', async ({ client }) => {
    const res = await client.get('/forgot-password')
    res.assertStatus(200)
    res.assertTextIncludes('forgot_password')
  })

  test('emails a reset link and stores a hashed token', async ({ client, assert }) => {
    const user = await makeUser('reset@example.com')

    const res = await client
      .post('/forgot-password')
      .withCsrfToken()
      .json({ email: 'reset@example.com' })
    res.assertStatus(200)

    fakeMailer.mails.assertSent(PasswordResetMail)
    await user.refresh()
    assert.isNotNull(user.passwordResetToken)
    assert.isNotNull(user.passwordResetExpiresAt)
  })

  test('does not reveal whether an email is registered', async ({ client }) => {
    const res = await client
      .post('/forgot-password')
      .withCsrfToken()
      .json({ email: 'nobody@example.com' })
    res.assertStatus(200)
    fakeMailer.mails.assertNoneSent()
  })

  test('resets the password with a valid token', async ({ client, assert }) => {
    const user = await makeUser('valid@example.com')

    const rawToken = crypto.randomBytes(32).toString('hex')
    user.passwordResetToken = hashToken(rawToken)
    user.passwordResetExpiresAt = DateTime.now().plus({ minutes: 30 })
    await user.save()

    const res = await client
      .post('/reset-password')
      .withCsrfToken()
      .json({ token: rawToken, password: 'brandnewpass1' })
    res.assertStatus(200)

    await user.refresh()
    assert.isNull(user.passwordResetToken)
    assert.isNull(user.passwordResetExpiresAt)

    const authed = await User.verifyCredentials('valid@example.com', 'brandnewpass1')
    assert.equal(authed.id, user.id)
  })

  test('rejects an invalid reset token', async ({ client }) => {
    const res = await client
      .post('/reset-password')
      .withCsrfToken()
      .json({ token: 'x'.repeat(32), password: 'brandnewpass1' })
    res.assertStatus(400)
  })
})
