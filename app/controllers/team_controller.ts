import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Project from '#models/project'
import TeamService from '#services/team_service'
import TeamMemberTransformer from '#transformers/team_member_transformer'
import TeamException from '#exceptions/team_exception'
import { inviteTeamMemberValidator } from '#validators/team'

@inject()
export default class TeamController {
  async index({ inertia, params, auth }: HttpContext) {
    const user = auth.user!
    const project = await Project.findOrFail(params.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return inertia.render('errors/not_found' as any, {} as any)
    }

    const members = await TeamService.listMembers(project.id)
    const canManage = await TeamService.canManage(project.id, user.id, user.role)

    return inertia.render(
      'projects/team' as any,
      {
        project: { id: project.id, name: project.name, slug: project.slug },
        members: members.map((m) => new TeamMemberTransformer(m).toObject()),
        canManage,
      } as any
    )
  }

  async invite({ request, params, auth, response, session }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(inviteTeamMemberValidator)
    await TeamService.invite({
      projectId: Number(params.projectId),
      email: payload.email,
      role: payload.role,
      actorId: user.id,
      actorRole: user.role,
    })
    session.flash('success', `Invitation sent to ${payload.email}`)
    return response.redirect().back()
  }

  async remove({ params, auth, response }: HttpContext) {
    const user = auth.user!
    await TeamService.removeMember(Number(params.memberId), user.id, user.role)
    return response.redirect().back()
  }

  async changeRole({ request, params, auth, response, session }: HttpContext) {
    const user = auth.user!
    const role = request.input('role')
    if (!['owner', 'admin', 'member'].includes(role)) {
      throw TeamException.forbidden()
    }
    await TeamService.changeRole(Number(params.memberId), role, user.id, user.role)
    session.flash('success', 'Role updated')
    return response.redirect().back()
  }

  /**
   * Public accept-invite landing page. If the visitor is already logged in with
   * the invited email, the invite is accepted immediately. Otherwise they are
   * shown a signup form (posted to the normal signup route with the token).
   */
  async showAccept({ request, inertia, auth, response }: HttpContext) {
    const token = request.input('token')
    try {
      const member = await TeamService.resolveToken(token)
      const project = await Project.findOrFail(member.projectId)

      if (auth.user) {
        if (auth.user.email.toLowerCase() === member.email) {
          await TeamService.acceptByTokenForUser(token, auth.user.id)
          return response.redirect().toPath(`/projects/${project.id}/team`)
        }
        return inertia.render(
          'auth/accept_invite' as any,
          {
            error: 'This invitation was sent to a different email address.',
            token: null,
            email: null,
            projectName: null,
          } as any
        )
      }

      return inertia.render(
        'auth/accept_invite' as any,
        {
          token,
          email: member.email,
          projectName: project.name,
          error: null,
        } as any
      )
    } catch {
      return inertia.render(
        'auth/accept_invite' as any,
        {
          error: 'This invitation link is invalid or has expired.',
          token: null,
          email: null,
          projectName: null,
        } as any
      )
    }
  }
}
