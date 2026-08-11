import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import http from 'node:http'
import User from '#models/user'
import Project from '#models/project'
import ApiKey from '#models/api_key'
import AllowedOrigin from '#models/allowed_origin'
import ReportTemplate from '#models/report_template'
import WebhookSubscription from '#models/webhook_subscription'

test.group('Integrations', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('outbound webhook fires with correct payload shape on report status change', async ({
    client,
    assert,
  }) => {
    const received: any[] = []
    const server = http.createServer((req, res) => {
      let body = ''
      req.on('data', (chunk) => (body += chunk))
      req.on('end', () => {
        try {
          received.push(JSON.parse(body))
        } catch {}
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: true }))
      })
    })
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()))
    const port = (server.address() as any).port
    const url = `http://127.0.0.1:${port}/webhook`

    const user = await User.create({
      email: 'int@example.com',
      password: 'password123',
      fullName: 'Int',
      role: 'admin',
    })
    const project = await Project.create({
      name: 'Int Project',
      slug: 'int-project',
      ownerId: user.id,
    })
    const { rawKey } = await ApiKey.generate(project.id, 'int')
    await AllowedOrigin.create({ projectId: project.id, origin: 'http://localhost:3000' })
    await ReportTemplate.create({ projectId: project.id, name: 'T', isDefault: true })
    await WebhookSubscription.create({
      projectId: project.id,
      url,
      events: ['report.updated'],
      secret: 'supersecretsign',
      active: true,
    })

    // Ingest a report (subscribed only to report.updated, so no delivery yet)
    const res = await client
      .post(`/api/public/reports?key=${rawKey}`)
      .header('Origin', 'http://localhost:3000')
      .json({ title: 'Bug', reporterEmail: 'user@example.com', fieldValues: {} })
    res.assertStatus(201)
    const reportId = res.body().data.id

    // Update status/priority as admin
    const patch = await client
      .patch(`/api/reports/${reportId}`)
      .loginAs(user)
      .json({ status: 'resolved', priority: 'high' })
    patch.assertStatus(200)

    await new Promise((r) => setTimeout(r, 300))

    assert.lengthOf(received, 1)
    const payload = received[0]
    assert.equal(payload.event, 'report.updated')
    assert.equal(payload.report.id, reportId)
    assert.equal(payload.report.projectId, project.id)
    assert.equal(payload.report.status, 'resolved')
    assert.equal(payload.report.priority, 'high')
    assert.isString(payload.timestamp)
    assert.equal(payload.report.title, 'Bug')

    server.closeAllConnections()
    server.close()
  })
})
