import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import ProjectService from '#services/project_service'
import ApiKeyService from '#services/api_key_service'

test.group('Integrations embed snippet', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  async function makeUser(email: string) {
    return User.create({
      email,
      password: 'password123',
      fullName: 'User',
      role: 'member',
    })
  }

  const inertiaHeaders = {
    'X-Inertia': 'true',
    'X-Inertia-Version': '1',
  }

  function propsOf(res: any) {
    return JSON.parse(res.text()).props
  }

  test('integrations index passes appUrl and the real key into props', async ({
    client,
    assert,
  }) => {
    const user = await makeUser('owner@example.com')
    const project = await ProjectService.create({ name: 'Embed Project', ownerId: user.id })
    const { rawKey } = await ApiKeyService.create(project.id, 'widget')

    const res = await client
      .get(`/projects/${project.id}/integrations`)
      .loginAs(user)
      .withFlashMessages({ apiKeyRaw: rawKey })
      .headers(inertiaHeaders)

    res.assertStatus(200)
    const props = propsOf(res)
    assert.equal(props.appUrl, process.env.APP_URL ?? 'http://localhost:3333')
    assert.equal(props.apiKeyRaw, rawKey)
  })

  test('integrations index exposes a null apiKeyRaw when no key was just created', async ({
    client,
    assert,
  }) => {
    const user = await makeUser('owner2@example.com')
    const project = await ProjectService.create({ name: 'Embed Project 2', ownerId: user.id })

    const res = await client
      .get(`/projects/${project.id}/integrations`)
      .loginAs(user)
      .headers(inertiaHeaders)

    res.assertStatus(200)
    const props = propsOf(res)
    assert.isNull(props.apiKeyRaw)
  })

  test('embed snippet format matches docs/embedding.md', async ({ assert }) => {
    const appUrl = 'https://bugs.example.com'
    const key = 'tb_abcdef1234567890'
    const base = appUrl.replace(/\/$/, '')
    const snippet = `<script\n  async\n  src="${base}/widget/v1/widget.js"\n  data-project-key="${key}"\n><\/script>`
    assert.isTrue(snippet.includes(`${base}/widget/v1/widget.js`))
    assert.isTrue(snippet.includes(`data-project-key="${key}"`))
    assert.isTrue(snippet.startsWith('<script'))
    assert.isTrue(snippet.trimEnd().endsWith('</script>'))
  })
})
