import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Report from '#models/report'
import ConversationService from '#services/conversation_service'
import { portalMessageValidator } from '#validators/message'

@inject()
export default class PortalController {
  constructor(protected conversationService: ConversationService) {}

  async show({ params, inertia, response }: HttpContext) {
    const report = await Report.query()
      .where('replyToToken', params.reply_to_token as string)
      .first()
    if (!report) {
      return response.notFound({ message: 'Invalid portal link' })
    }

    const thread = await this.conversationService.getThread(report)
    return inertia.render(
      'portal/show' as any,
      {
        report: {
          id: report.id,
          title: report.title,
          status: report.status,
          priority: report.priority,
        },
        thread,
        replyToToken: report.replyToToken,
      } as any
    )
  }

  async store({ params, request, response }: HttpContext) {
    const report = await Report.query()
      .where('replyToToken', params.reply_to_token as string)
      .first()
    if (!report) {
      return response.notFound({ message: 'Invalid portal link' })
    }

    const payload = await request.validateUsing(portalMessageValidator)
    await this.conversationService.addPortalReply(report, payload.body)
    return response.redirect(`/portal/${report.replyToToken}`)
  }
}
