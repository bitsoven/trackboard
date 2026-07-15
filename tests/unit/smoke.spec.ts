import { test } from '@japa/runner'

test.group('Unit Smoke', () => {
  test('app boots', async ({ assert }) => {
    const app = await import('@adonisjs/core/services/app')
    assert.isTrue(app.default.isReady)
  })
})
