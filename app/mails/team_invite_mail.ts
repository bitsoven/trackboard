import { BaseMail } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'
import type TeamMember from '#models/team_member'
import type Project from '#models/project'

export default class TeamInviteMail extends BaseMail {
  constructor(
    private project: Project,
    private member: TeamMember,
    private acceptUrl: string
  ) {
    super()
  }

  prepare() {
    this.message.to(this.member.email)
    this.message.subject(`You've been invited to ${this.project.name} on Trackboard`)
    this.message.html(`
      <p>Hello,</p>
      <p>You've been invited to join <strong>${this.escape(this.project.name)}</strong>
      on Trackboard as a <strong>${this.escape(this.member.role)}</strong>.</p>
      <p>Accept your invitation by opening the link below:</p>
      <p><a href="${this.escape(this.acceptUrl)}">Accept invitation</a></p>
      <p>This invitation link expires in 7 days.</p>
    `)
    this.message.text(
      `You've been invited to join ${this.project.name} on Trackboard as a ${this.member.role}. ` +
        `Accept here: ${this.acceptUrl}\nThis invitation link expires in 7 days.`
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

export function sendTeamInviteMail(
  project: Project,
  member: TeamMember,
  acceptUrl: string
): Promise<unknown> {
  return new TeamInviteMail(project, member, acceptUrl).send(mail.use())
}
