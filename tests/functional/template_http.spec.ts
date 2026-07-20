import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import Project from '#models/project'
import ApiKey from '#models/api_key'
import ReportTemplate from '#models/report_template'

test.group('Template HTTP', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('unauthenticated admin API returns 401/302', async ({ client, assert }) => {
    const user = await User.create({
      email: 'http1@example.com',
      password: 'password123',
      fullName: 'Http1',
      role: 'admin',
    })
    const project = await Project.create({
      name: 'Http Project',
      slug: 'http-project',
      ownerId: user.id,
    })

    const response = await client
      .get(`/api/projects/${project.id}/templates`)
      .header('Accept', 'application/json')
    // Adonis auth middleware redirects to login for unauthenticated, or 401 for JSON
    assert.isTrue([401, 302].includes(response.status()))
  })

  test('authenticated CRUD via API', async ({ client, assert }) => {
    const user = await User.create({
      email: 'http2@example.com',
      password: 'password123',
      fullName: 'Http2',
      role: 'admin',
    })
    const project = await Project.create({ name: 'Http Crud', slug: 'http-crud', ownerId: user.id })

    // Create
    const createResponse = await client
      .post(`/api/projects/${project.id}/templates`)
      .loginAs(user)
      .json({
        name: 'Via HTTP',
        isDefault: true,
        fields: [
          { key: 'title', label: 'Title', type: 'text', isRequired: true },
          {
            key: 'priority',
            label: 'Priority',
            type: 'select',
            isRequired: true,
            options: { choices: ['low', 'high'] },
          },
        ],
      })

    createResponse.assertStatus(201)
    createResponse.assertBodyContains({ data: { name: 'Via HTTP' } })
    const createdId = createResponse.body().data.id

    // List
    const listResponse = await client.get(`/api/projects/${project.id}/templates`).loginAs(user)
    listResponse.assertStatus(200)
    assert.lengthOf(listResponse.body().data, 1)

    // Update (reorder)
    const updateResponse = await client
      .put(`/api/templates/${createdId}`)
      .loginAs(user)
      .json({
        name: 'Updated via HTTP',
        fields: [
          {
            key: 'priority',
            label: 'Priority',
            type: 'select',
            isRequired: true,
            options: { choices: ['low', 'high'] },
            sortOrder: 0,
          },
          { key: 'title', label: 'Title', type: 'text', isRequired: true, sortOrder: 1 },
        ],
      })
    updateResponse.assertStatus(200)
    assert.equal(updateResponse.body().data.name, 'Updated via HTTP')
    assert.equal(updateResponse.body().data.fields[0].key, 'priority')

    // Delete
    const deleteResponse = await client.delete(`/api/templates/${createdId}`).loginAs(user)
    deleteResponse.assertStatus(204)

    const afterDelete = await ReportTemplate.find(createdId)
    assert.isNull(afterDelete)
  })

  test('public widget returns template with valid key', async ({ client, assert }) => {
    const user = await User.create({
      email: 'widget-http@example.com',
      password: 'password123',
      fullName: 'WidgetHttp',
      role: 'admin',
    })
    const project = await Project.create({
      name: 'Widget Http',
      slug: 'widget-http',
      ownerId: user.id,
    })
    const { rawKey } = await ApiKey.generate(project.id, 'widget')

    // Create default template
    const create = await client
      .post(`/api/projects/${project.id}/templates`)
      .loginAs(user)
      .json({
        name: 'Widget Template',
        isDefault: true,
        fields: [{ key: 'title', label: 'Title', type: 'text', isRequired: true }],
      })
    create.assertStatus(201)

    const widgetResponse = await client.get(`/api/public/widget/templates?key=${rawKey}`)
    widgetResponse.assertStatus(200)
    assert.equal(widgetResponse.body().data.name, 'Widget Template')
    assert.lengthOf(widgetResponse.body().data.fields, 1)

    // Invalid key -> 401
    const invalid = await client.get('/api/public/widget/templates?key=invalid')
    invalid.assertStatus(401)

    // Missing key -> 400
    const missing = await client.get('/api/public/widget/templates')
    missing.assertStatus(400)
  })

  test('non-owner cannot access templates', async ({ client, assert }) => {
    const owner = await User.create({
      email: 'owner@example.com',
      password: 'password123',
      fullName: 'Owner',
      role: 'member',
    })
    const other = await User.create({
      email: 'other@example.com',
      password: 'password123',
      fullName: 'Other',
      role: 'member',
    })
    const project = await Project.create({
      name: 'Owner Project',
      slug: 'owner-project',
      ownerId: owner.id,
    })

    const response = await client.get(`/api/projects/${project.id}/templates`).loginAs(other)
    // Should be forbidden 403
    assert.equal(response.status(), 403)
  })
})
