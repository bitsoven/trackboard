import type TeamMember from '#models/team_member'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TeamMemberTransformer extends BaseTransformer<TeamMember> {
  toObject() {
    const r = this.resource as any
    return {
      id: r.id,
      projectId: r.projectId,
      userId: r.userId,
      role: r.role,
      email: r.email,
      name: r.user?.fullName ?? null,
      invitedAt: r.invitedAt?.toISO() ?? null,
      acceptedAt: r.acceptedAt?.toISO() ?? null,
    }
  }
}
