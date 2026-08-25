import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import OverviewService from '#services/overview_service'

@inject()
export default class OverviewController {
  constructor(protected overviewService: OverviewService) {}

  async index({ inertia, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return inertia.render('home' as any, {} as any)
    }

    const stats = await this.overviewService.getStats(user.id, user.role)
    const trend = await this.overviewService.getTrend(user.id, user.role, 7)
    const worklist = await this.overviewService.getWorklist(user.id, user.role)

    return inertia.render(
      'home' as any,
      {
        stats,
        trend,
        worklist,
      } as any
    )
  }
}
