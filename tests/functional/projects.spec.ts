import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import Project from '#models/project'
import ProjectService from '#services/project_service'

test.group('Projects', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  async function makeUser(email = 'owner@example.com') {
    return User.create({
      email,
      password: 'password123',
      fullName: 'Owner',
      role: 'member',
    })
  }

  test('creating a project generates a unique slug and lists it for the owner', async ({
    client,
    assert,
  }) => {
    const user = await makeUser()

    const res = await client
      .post('/projects')
      .loginAs(user)
      .withCsrfToken()
      .form({ name: 'My Cool App' })
    res.assertStatus(200)

    const project = await Project.query().where('ownerId', user.id).firstOrFail()
    assert.equal(project.name, 'My Cool App')
    assert.equal(project.slug, 'my-cool-app')

    const list = await client.get('/projects').loginAs(user)
    list.assertStatus(200)
    list.assertTextIncludes(project.name)
  })

  test('a duplicate name is auto-disambiguated with a numeric suffix', async ({
    client,
    assert,
  }) => {
    const user = await makeUser()
    await Project.create({ name: 'Shared', slug: 'shared', ownerId: user.id })

    const res = await client
      .post('/projects')
      .loginAs(user)
      .withCsrfToken()
      .form({ name: 'Shared' })
    res.assertStatus(200)

    const rows = await Project.query().where('ownerId', user.id).select('slug')
    const slugs = rows.map((p) => p.slug)
    assert.includeMembers(slugs, ['shared', 'shared-2'])
  })

  test('a provided slug is sanitized and made unique', async ({ assert }) => {
    const user = await makeUser()
    await Project.create({ name: 'Other', slug: 'app-x', ownerId: user.id })
    const slug = await ProjectService.generateUniqueSlug('App X', 'app-x')
    assert.equal(slug, 'app-x-2')
  })

  test('a created project seeds a default Bug Report template', async ({ assert }) => {
    const user = await makeUser()
    const project = await ProjectService.create({ name: 'Templated', ownerId: user.id })
    const reportTemplateModule = await import('#models/report_template')
    const ReportTemplate = reportTemplateModule.default
    const templates = await ReportTemplate.query().where('projectId', project.id).preload('fields')
    assert.lengthOf(templates, 1)
    assert.equal(templates[0].name, 'Bug Report')
    assert.isTrue(templates[0].fields.length > 0)
  })
})
