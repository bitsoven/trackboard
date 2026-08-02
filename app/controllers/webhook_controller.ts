import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ConversationService from '#services/conversation_service'
import type { InboundEmailPayload } from '#services/conversation_service'

@inject()
export default class WebhookController {
  constructor(protected conversationService: ConversationService) {}

  /**
   * Normalize a Postmark/Resend style inbound payload (case-insensitive keys)
   * into the shape the service expects.
   */
  protected normalize(body: Record<string, any>): InboundEmailPayload {
    const pick = (...keys: string[]): string | undefined => {
      for (const key of keys) {
        const found = Object.keys(body).find((k) => k.toLowerCase() === key.toLowerCase())
        if (found && body[found] !== null) return String(body[found])
      }
      return undefined
    }

    const extractEmail = (value?: string): string => {
      if (!value) return ''
      const match = value.match(/<([^>]+)>/)
      return match ? match[1] : value
    }

    return {
      from: extractEmail(pick('from')),
      to: pick('to'),
      subject: pick('subject'),
      textBody: pick('textbody', 'text'),
      htmlBody: pick('htmlbody', 'html'),
      messageId: pick('messageid', 'message-id'),
      inReplyTo: pick('in-reply-to', 'inreplyto'),
      references: pick('references'),
    }
  }

  async inboundEmail({ request, response }: HttpContext) {
    const secret = process.env.WEBHOOK_SECRET
    if (secret && request.header('x-webhook-secret') !== secret) {
      return response.unauthorized({ message: 'Invalid webhook secret' })
    }

    const body = request.all()
    const normalized = this.normalize(body as Record<string, any>)
    const message = await this.conversationService.handleInbound(normalized)
    if (!message) {
      return response.json({ data: null, matched: false })
    }
    return response.json({ data: message, matched: true })
  }
}
