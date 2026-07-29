import { BaseMail } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'
import type Report from '#models/report'

export default class VerificationMail extends BaseMail {
  constructor(
    private report: Report,
    private verifyUrl: string
  ) {
    super()
  }

  prepare() {
    this.message.to(this.report.reporterEmail ?? '')
    this.message.subject('Please verify your bug report')
    this.message.html(`
      <p>Hello,</p>
      <p>Thanks for submitting a bug report titled <strong>${this.escape(
        this.report.title
      )}</strong>.</p>
      <p>Please confirm your email address by clicking the link below. Until you do,
      your report will remain hidden from the team's queue.</p>
      <p><a href="${this.escape(this.verifyUrl)}">Verify my report</a></p>
      <p>This link expires in 24 hours.</p>
    `)
    this.message.text(
      `Verify your report by opening this link: ${this.verifyUrl}\nThis link expires in 24 hours.`
    )
  }

  private escape(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }
}

export function sendVerificationMail(report: Report, verifyUrl: string): Promise<unknown> {
  return new VerificationMail(report, verifyUrl).send(mail.use())
}
