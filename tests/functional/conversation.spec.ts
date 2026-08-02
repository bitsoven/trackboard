import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import mail from '@adonisjs/mail/services/main'
import User from '#models/user'
import Project from '#models/project'
import ApiKey from '#models/api_key'
import ReportTemplate from '#models/report_template'
import Report from '#models/report'
import AllowedOrigin from '#models/allowed_origin'
import Conversation from '#models/conversation'
import Message from '#models/message'
import ReportReplyMail from '#mails/report_reply_mail'

async function replyToAddressFromBuiltMail(mailInstance: ReportReplyMail): Promise<string | null> {
  await mailInstance.build()
  const nodeMessage =
    (mailInstance as any).message?.nodeMailerMessage ?? (mailInstance as any).message
  const replyTo = nodeMessage?.replyTo
  if (Array.isArray(replyTo) && replyTo.length) return replyTo[0].address
  return null
}

test.group('Conversation', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => {
    mail.fake()
    return () => mail.restore()
  })

  async function seedReport(requireVerification = false) {
    const admin = await User.create({
      email: `seed-${Math.random()}@example.com`,
      password: 'password123',
      fullName: 'Seed',
      role: 'admin',
    })
    const project = await Project.create({
      name: 'Conv Project',
      slug: 'conv-project',
      ownerId: admin.id,
      requireEmailVerification: requireVerification,
    })
    const { rawKey } = await ApiKey.generate(project.id, `conv-${Math.random()}`)
    await AllowedOrigin.create({ projectId: project.id, origin: 'http://localhost:3000' })
    await ReportTemplate.create({ projectId: project.id, name: 'Tmpl', isDefault: true })

    return { admin, project, rawKey }
  }

  test('outbound reply sets correct Reply-To and persists Message', async ({ client, assert }) => {
    const { admin, rawKey } = await seedReport()
    const ingest = await client
      .post('/api/public/reports?key=' + rawKey)
      .header('Origin', 'http://localhost:3000')
      .json({ title: 'Conv report', reporterEmail: 'reporter@example.com', fieldValues: {} })
    const reportId = ingest.body().data.id

    const res = await client
      .post(`/api/reports/${reportId}/messages`)
      .loginAs(admin)
      .json({ body: 'We are looking into this.' })
    res.assertStatus(201)
    assert.equal(res.body().data.direction, 'outbound')
    assert.equal(res.body().data.authorType, 'team')

    // Message row persisted
    const report = await Report.findOrFail(reportId)
    const conversation = await Conversation.query().where('reportId', reportId).firstOrFail()
    const messages = await Message.query().where('conversationId', conversation.id)
    assert.lengthOf(messages, 1)
    assert.equal(messages[0].direction, 'outbound')

    // Mail uses a Reply-To that encodes the report token
    assert.isString(report.replyToToken)
    const token = report.replyToToken
    const mailInstance = new ReportReplyMail(report, 'We are looking into this.', {
      replyToAddress: `ticket-${token}@localhost`,
      messageId: '<trackboard-x@localhost>',
      inReplyTo: null,
    })
    const replyTo = await replyToAddressFromBuiltMail(mailInstance)
    assert.isTrue(!!replyTo && replyTo.includes(`ticket-${token}@`))
  })

  test('inbound webhook threads into existing conversation via token', async ({
    client,
    assert,
  }) => {
    const { admin, rawKey } = await seedReport()
    const ingest = await client
      .post('/api/public/reports?key=' + rawKey)
      .header('Origin', 'http://localhost:3000')
      .json({ title: 'Conv report 2', reporterEmail: 'reporter@example.com', fieldValues: {} })
    const reportId = ingest.body().data.id

    // Admin sends an outbound reply (generates reply_to token + conversation)
    await client
      .post(`/api/reports/${reportId}/messages`)
      .loginAs(admin)
      .json({ body: 'Thanks for the report.' })

    const refreshed = await Report.findOrFail(reportId)
    assert.isString(refreshed.replyToToken)

    // Reporter replies via email to the ticket address
    const webhook = await client.post('/api/webhooks/inbound-email').json({
      'From': 'reporter@example.com',
      'To': `ticket-${refreshed.replyToToken}@localhost`,
      'Subject': 'Re: Conv report 2',
      'TextBody': 'Here is more info.',
      'MessageID': '<reporter-1@example.com>',
      'In-Reply-To': '<trackboard-prev@example.com>',
    })
    webhook.assertStatus(200)
    assert.isTrue(webhook.body().matched)

    // Thread now has the outbound + this inbound message
    const conversation = await Conversation.query().where('reportId', reportId).firstOrFail()
    const messages = await Message.query()
      .where('conversationId', conversation.id)
      .orderBy('createdAt', 'asc')
    assert.lengthOf(messages, 2)
    assert.equal(messages[1].direction, 'inbound')
    assert.equal(messages[1].authorType, 'reporter')
    assert.equal(messages[1].body, 'Here is more info.')
  })

  test('inbound webhook falls back to Message-ID threading', async ({ client, assert }) => {
    const { admin, rawKey } = await seedReport()
    const ingest = await client
      .post('/api/public/reports?key=' + rawKey)
      .header('Origin', 'http://localhost:3000')
      .json({ title: 'Conv report 3', reporterEmail: 'reporter@example.com', fieldValues: {} })
    const reportId = ingest.body().data.id

    // Send outbound reply so a Message-ID is stamped on the outbound Message
    await client.post(`/api/reports/${reportId}/messages`).loginAs(admin).json({ body: 'On it.' })
    const conversation = await Conversation.query().where('reportId', reportId).firstOrFail()
    const outbound = await Message.query()
      .where('conversationId', conversation.id)
      .where('direction', 'outbound')
      .firstOrFail()
    assert.isString(outbound.emailMessageId)

    // Inbound references the outbound Message-ID but no token in To
    const webhook = await client.post('/api/webhooks/inbound-email').json({
      'From': 'reporter@example.com',
      'To': 'some-unrelated-mailbox@localhost',
      'TextBody': 'Follow up',
      'MessageID': '<reporter-2@example.com>',
      'In-Reply-To': outbound.emailMessageId,
    })
    webhook.assertStatus(200)
    assert.isTrue(webhook.body().matched)

    const messages = await Message.query().where('conversationId', conversation.id)
    assert.lengthOf(messages, 2)
  })

  test('reporter portal reply creates inbound message', async ({ client, assert }) => {
    const { admin, rawKey } = await seedReport()
    const ingest = await client
      .post('/api/public/reports?key=' + rawKey)
      .header('Origin', 'http://localhost:3000')
      .json({ title: 'Portal report', reporterEmail: 'reporter@example.com', fieldValues: {} })
    const reportId = ingest.body().data.id

    // Generate a token by sending an outbound reply
    await client
      .post(`/api/reports/${reportId}/messages`)
      .loginAs(admin)
      .json({ body: 'Hi from team.' })
    const refreshed = await Report.findOrFail(reportId)

    const res = await client
      .post(`/portal/${refreshed.replyToToken}/messages`)
      .json({ body: 'Thanks for the update.' })
    res.assertStatus(200)

    // The portal reply is persisted as an inbound reporter message
    const conversation = await Conversation.query().where('reportId', reportId).firstOrFail()
    const messages = await Message.query()
      .where('conversationId', conversation.id)
      .orderBy('createdAt', 'asc')
    assert.lengthOf(messages, 2)
    assert.equal(messages[1].direction, 'inbound')
    assert.equal(messages[1].authorType, 'reporter')
    assert.equal(messages[1].body, 'Thanks for the update.')
  })
})
