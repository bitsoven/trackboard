import encryption from '@adonisjs/core/services/encryption'
import { DateTime } from 'luxon'
import Project from '#models/project'
import TeamMember from '#models/team_member'
import User from '#models/user'
import TeamException from '#exceptions/team_exception'
import { sendTeamInviteMail } from '#mails/team_invite_mail'

const INVITE_TOKEN_TTL_DAYS = 7

type InviteParams = {
  projectId: number
  email: string
  role: 'owner' | 'admin' | 'member'
  actorId: number
  actorRole: string
}

export default class TeamService {
  /**
   * Access = global admin, the project owner, or any accepted team member.
   */
  static async canAccess(projectId: number, userId: number, role: string): Promise<boolean> {
    if (role === 'admin') return true
    const project = await Project.find(projectId)
    if (project && project.ownerId === userId) return true
    const member = await TeamMember.query()
      .where('projectId', projectId)
      .where('userId', userId)
      .whereNotNull('acceptedAt')
      .first()
    return !!member
  }

  /**
   * Manage = global admin, the project owner, or a team member with the
   * owner/admin role.
   */
  static async canManage(projectId: number, userId: number, role: string): Promise<boolean> {
    if (role === 'admin') return true
    const project = await Project.find(projectId)
    if (project && project.ownerId === userId) return true
    const member = await TeamMember.query()
      .where('projectId', projectId)
      .where('userId', userId)
      .whereNotNull('acceptedAt')
      .whereIn('role', ['owner', 'admin'])
      .first()
    return !!member
  }

  static async listMembers(projectId: number): Promise<TeamMember[]> {
    return TeamMember.query()
      .where('projectId', projectId)
      .preload('user')
      .orderBy('role')
      .orderBy('createdAt', 'asc')
  }

  /**
   * Invite an email to a project with a given role. Generates a signed,
   * expiring token and sends the invite email.
   */
  static async invite(params: InviteParams): Promise<TeamMember> {
    const canManage = await this.canManage(params.projectId, params.actorId, params.actorRole)
    if (!canManage) throw TeamException.forbidden()

    const project = await Project.findOrFail(params.projectId)

    const member = await TeamMember.firstOrCreate(
      { projectId: params.projectId, email: params.email.toLowerCase() },
      {
        projectId: params.projectId,
        email: params.email.toLowerCase(),
        role: params.role,
      }
    )

    member.role = params.role
    member.invitedAt = DateTime.now()
    member.inviteToken = this.generateInviteToken(member.id)
    await member.save()

    const appUrl = process.env.APP_URL ?? 'http://localhost:3333'
    const acceptUrl = `${appUrl.replace(/\/$/, '')}/accept-invite?token=${encodeURIComponent(
      member.inviteToken
    )}`
    await sendTeamInviteMail(project, member, acceptUrl).catch((error) => {
      console.warn('Failed to send team invite email', (error as Error)?.message)
    })

    return member
  }

  /**
   * Resolve and validate an invite token, returning the related member.
   */
  static async resolveToken(token: string): Promise<TeamMember> {
    let payload: { memberId: number; exp: number } | null
    try {
      payload = encryption.decrypt(token) as { memberId: number; exp: number } | null
    } catch {
      payload = null
    }
    if (!payload || typeof payload.memberId !== 'number' || typeof payload.exp !== 'number') {
      throw TeamException.invalidToken()
    }
    if (payload.exp < DateTime.now().toMillis()) {
      throw TeamException.invalidToken()
    }
    const member = await TeamMember.find(payload.memberId)
    if (!member || member.inviteToken !== token) {
      throw TeamException.invalidToken()
    }
    return member
  }

  /**
   * Accept an invitation by token for an already-authenticated user whose
   * email matches the invite.
   */
  static async acceptByTokenForUser(token: string, userId: number): Promise<TeamMember> {
    const member = await this.resolveToken(token)
    const user = await User.findOrFail(userId)
    if (member.email !== user.email.toLowerCase()) {
      throw TeamException.forbidden()
    }
    member.userId = user.id
    member.acceptedAt = DateTime.now()
    await member.save()
    return member
  }

  /**
   * Accept all pending invites for a user's email (used after signup/login).
   * Returns the project id of the first accepted invite, if any.
   */
  static async acceptPendingForUser(userId: number): Promise<number | null> {
    const user = await User.findOrFail(userId)
    const pending = await TeamMember.query()
      .where('email', user.email.toLowerCase())
      .whereNull('acceptedAt')
      .whereNotNull('inviteToken')
    let acceptedProjectId: number | null = null
    for (const member of pending) {
      member.userId = user.id
      member.acceptedAt = DateTime.now()
      await member.save()
      acceptedProjectId = member.projectId
    }
    return acceptedProjectId
  }

  static async changeRole(
    memberId: number,
    role: 'owner' | 'admin' | 'member',
    actorId: number,
    actorRole: string
  ): Promise<TeamMember> {
    const canManage = await this.canManageFromMember(memberId, actorId, actorRole)
    if (!canManage) throw TeamException.forbidden()

    const member = await TeamMember.findOrFail(memberId)
    if (member.role === 'owner' && role !== 'owner') {
      const ownerCount = await TeamMember.query()
        .where('projectId', member.projectId)
        .where('role', 'owner')
        .count('* as total')
      if (Number((ownerCount[0] as any).$extras.total) <= 1) {
        throw TeamException.lastOwner()
      }
    }
    member.role = role
    await member.save()
    return member
  }

  static async removeMember(memberId: number, actorId: number, actorRole: string): Promise<void> {
    const canManage = await this.canManageFromMember(memberId, actorId, actorRole)
    if (!canManage) throw TeamException.forbidden()

    const member = await TeamMember.findOrFail(memberId)
    if (member.role === 'owner') {
      const ownerCount = await TeamMember.query()
        .where('projectId', member.projectId)
        .where('role', 'owner')
        .count('* as total')
      if (Number((ownerCount[0] as any).$extras.total) <= 1) {
        throw TeamException.lastOwner()
      }
    }
    await member.delete()
  }

  /**
   * Helper: can the actor manage the team that `memberId` belongs to?
   */
  private static async canManageFromMember(
    memberId: number,
    actorId: number,
    actorRole: string
  ): Promise<boolean> {
    const member = await TeamMember.findOrFail(memberId)
    return this.canManage(member.projectId, actorId, actorRole)
  }

  private static generateInviteToken(memberId: number): string {
    const payload = {
      memberId,
      exp: DateTime.now().plus({ days: INVITE_TOKEN_TTL_DAYS }).toMillis(),
    }
    return encryption.encrypt(payload)
  }
}
