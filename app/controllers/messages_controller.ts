import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ReportService from '#services/report_service'
import ConversationService from '#services/conversation_service'
import Project from '#models/project'
import TeamService from '#services/team_service'
import { sendMessageValidator } from '#validators/message'

@inject()
export default class MessagesController {
  constructor(
    protected reportService: ReportService,
    protected conversationService: ConversationService
  ) {}

  async store({ params, request, auth, response, session }: HttpContext) {
    const user = auth.user!
    const report = await this.reportService.findById(params.id)
    const project = await Project.findOrFail(report.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized' })
    }

    const payload = await request.validateUsing(sendMessageValidator)
    const message = await this.conversationService.sendReply(report, payload.body, user)

    // Inertia form submissions must receive an Inertia-compatible response
    // (a redirect), not plain JSON. JSON is returned for API clients/tests.
    if (request.header('x-inertia') === 'true') {
      session.flash('success', 'Reply sent')
      return response.redirect().back()
    }

    return response.created({ data: message })
  }
}
