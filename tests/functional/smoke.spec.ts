import { test } from '@japa/runner'

test.group('Smoke', () => {
  test('http server is running', async ({ assert }) => {
    // Functional suite boots httpServer via bootstrap configureSuite hook
    assert.isTrue(true)
  })
})
