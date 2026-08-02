import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ReportService from '#services/report_service'
import ConversationService from '#services/conversation_service'
import Project from '#models/project'
import { sendMessageValidator } from '#validators/message'

@inject()
export default class MessagesController {
  constructor(
    protected reportService: ReportService,
    protected conversationService: ConversationService
  ) {}

  async store({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const report = await this.reportService.findById(Number(params.id))
    const project = await Project.findOrFail(report.projectId)
    if (project.ownerId !== user.id && user.role !== 'admin') {
      return response.forbidden({ message: 'Not authorized' })
    }

    const payload = await request.validateUsing(sendMessageValidator)
    const message = await this.conversationService.sendReply(report, payload.body, user)
    return response.created({ data: message })
  }
}
