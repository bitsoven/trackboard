import { BaseMail } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'
import type Report from '#models/report'

export type ReplyMailOptions = {
  replyToAddress: string
  messageId: string
  inReplyTo?: string | null
}

export default class ReportReplyMail extends BaseMail {
  constructor(
    private report: Report,
    private body: string,
    private options: ReplyMailOptions
  ) {
    super()
  }

  prepare() {
    this.message.to(this.report.reporterEmail ?? '')
    this.message.replyTo(this.options.replyToAddress, process.env.MAIL_FROM_NAME ?? 'Trackboard')
    this.message.subject(`Re: ${this.report.title}`)
    this.message.messageId(this.options.messageId)
    if (this.options.inReplyTo) {
      this.message.inReplyTo(this.options.inReplyTo)
    }
    this.message.html(`
      <p>${this.escape(this.body)}</p>
      <hr />
      <p style="color:#888;font-size:12px">
        Replying to this email will be attached to report #${this.report.id}.
      </p>
    `)
    this.message.text(this.body)
  }

  private escape(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }
}

export function sendReportReply(
  report: Report,
  body: string,
  options: ReplyMailOptions
): Promise<unknown> {
  return new ReportReplyMail(report, body, options).send(mail.use())
}
