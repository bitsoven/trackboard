import vine from '@vinejs/vine'

export const TEAM_ROLES = ['owner', 'admin', 'member'] as const

export const inviteTeamMemberValidator = vine.compile(
  vine.object({
    email: vine.string().email().maxLength(254),
    role: vine.enum(TEAM_ROLES),
  })
)
