import { Exception } from '@adonisjs/core/exceptions'
import Report from '#models/report'
import Conversation from '#models/conversation'
import Message from '#models/message'
import type User from '#models/user'
import Notification from '#models/notification'
import Project from '#models/project'
import { sendReportReply } from '#mails/report_reply_mail'
import { randomUUID } from 'node:crypto'

export type InboundEmailPayload = {
  from: string
  to?: string
  subject?: string
  textBody?: string
  htmlBody?: string
  messageId?: string | null
  inReplyTo?: string | null
  references?: string | null
}

export type MessageResult = {
  id: number
  direction: string
  authorType: string
  authorId: number | null
  authorName: string
  body: string
  emailMessageId: string | null
  createdAt: string
}

function resolveReplyToDomain(): string {
  const configured = process.env.REPLY_TO_DOMAIN
  if (configured) return configured
  const appUrl = process.env.APP_URL ?? 'http://localhost:3333'
  const match = appUrl.match(/https?:\/\/([^:/]+)/)
  return match?.[1] ?? 'localhost'
}

export default class ConversationService {
  /**
   * The address reporters should reply to. Encodes the report so inbound mail
   * can be threaded even without knowing the Message-ID.
   */
  replyToAddress(report: Report): string {
    const token = report.replyToToken ?? this.ensureReplyToToken(report)
    return `ticket-${token}@${resolveReplyToDomain()}`
  }

  ensureReplyToToken(report: Report): string {
    if (report.replyToToken) return report.replyToToken
    report.replyToToken = randomUUID()
    return report.replyToToken
  }

  private async persistReplyToToken(report: Report): Promise<void> {
    if (!report.replyToToken) {
      report.replyToToken = randomUUID()
    }
    if (report.$dirty) await report.save()
  }

  async findOrCreateConversation(report: Report): Promise<Conversation> {
    const existing = await Conversation.query().where('reportId', report.id).first()
    if (existing) return existing
    return Conversation.create({ reportId: report.id })
  }

  /**
   * Admin sends an outbound reply to the reporter. Persists the Message,
   * stamps a stable Message-ID for threading, and emails the reporter with a
   * Reply-To address that routes future replies back to this report.
   */
  async sendReply(report: Report, body: string, user: User): Promise<MessageResult> {
    if (!report.reporterEmail) {
      throw new Exception('Cannot reply: report has no reporter email', {
        status: 422,
        code: 'E_REPLY_NO_REPORTER',
      })
    }
    await this.persistReplyToToken(report)
    const token = report.replyToToken!

    const conversation = await this.findOrCreateConversation(report)
    const messageId = `<trackboard-${randomUUID()}@${resolveReplyToDomain()}>`
    const previousOutbound = await Message.query()
      .where('conversationId', conversation.id)
      .where('direction', 'outbound')
      .orderBy('createdAt', 'desc')
      .first()

    const message = await Message.create({
      conversationId: conversation.id,
      direction: 'outbound',
      authorType: 'team',
      authorId: user.id,
      body,
      emailMessageId: messageId,
      inReplyTo: previousOutbound?.emailMessageId ?? null,
    })

    try {
      await sendReportReply(report, body, {
        replyToAddress: `ticket-${token}@${resolveReplyToDomain()}`,
        messageId,
        inReplyTo: previousOutbound?.emailMessageId ?? null,
      })
    } catch (error) {
      console.warn('Failed to send reply email', (error as Error)?.message)
    }

    return this.toResult(message)
  }

  /**
   * Thread an inbound email (from webhook or portal) onto the right report.
   * Matching order: reply-to token encoded in the To address, then by
   * In-Reply-To / References Message-ID.
   */
  async handleInbound(payload: InboundEmailPayload): Promise<MessageResult | null> {
    const report = await this.resolveReportFromInbound(payload)
    if (!report) return null

    const conversation = await this.findOrCreateConversation(report)
    const message = await Message.create({
      conversationId: conversation.id,
      direction: 'inbound',
      authorType: 'reporter',
      authorId: null,
      body: payload.textBody ?? '',
      emailMessageId: payload.messageId ?? null,
      inReplyTo: payload.inReplyTo ?? null,
    })

    await this.notifyAssigned(report, message)
    return this.toResult(message)
  }

  /**
   * Reporter replies from the public portal (no email involved).
   */
  async addPortalReply(report: Report, body: string): Promise<MessageResult> {
    const conversation = await this.findOrCreateConversation(report)
    const message = await Message.create({
      conversationId: conversation.id,
      direction: 'inbound',
      authorType: 'reporter',
      authorId: null,
      body,
    })
    await this.notifyAssigned(report, message)
    return this.toResult(message)
  }

  async getThread(report: Report): Promise<MessageResult[]> {
    const conversation = await Conversation.query().where('reportId', report.id).first()
    if (!conversation) return []
    const messages = await Message.query()
      .where('conversationId', conversation.id)
      .orderBy('createdAt', 'asc')
    return messages.map((m) => this.toResult(m))
  }

  protected async resolveReportFromInbound(payload: InboundEmailPayload): Promise<Report | null> {
    // 1. Token encoded in the To address: ticket-<token>@domain
    if (payload.to) {
      const match = payload.to.match(/ticket-([^@\s]+)@/i)
      if (match) {
        const report = await Report.query().where('replyToToken', match[1]).first()
        if (report) return report
      }
    }

    // 2. Match by Message-ID referenced in In-Reply-To / References
    const ids = this.collectReferencedIds(payload)
    if (ids.length > 0) {
      const message = await Message.query().whereIn('emailMessageId', ids).first()
      if (message) {
        const conversation = await Conversation.findOrFail(message.conversationId)
        return Report.findOrFail(conversation.reportId)
      }
    }

    return null
  }

  protected collectReferencedIds(payload: InboundEmailPayload): string[] {
    const ids: string[] = []
    if (payload.inReplyTo) ids.push(payload.inReplyTo)
    if (payload.references) {
      for (const ref of payload.references.split(/\s+/)) {
        const trimmed = ref.trim()
        if (trimmed) ids.push(trimmed)
      }
    }
    return ids
  }

  protected async notifyAssigned(report: Report, _message: Message): Promise<void> {
    let userId = report.assigneeId
    if (!userId) {
      const project = await Project.find(report.projectId)
      userId = project?.ownerId ?? null
    }
    if (!userId) return
    await Notification.create({
      userId,
      type: 'new_message',
      data: { reportId: report.id, title: report.title },
    })
  }

  protected toResult(message: Message): MessageResult {
    return {
      id: message.id,
      direction: message.direction,
      authorType: message.authorType,
      authorId: message.authorId,
      authorName: message.authorType === 'team' ? 'Team' : 'Reporter',
      body: message.body,
      emailMessageId: message.emailMessageId,
      createdAt: message.createdAt?.toISO() ?? new Date().toISOString(),
    }
  }
}
