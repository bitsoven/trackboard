import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ReportService from '#services/report_service'
import ReportTransformer from '#transformers/report_transformer'

@inject()
export default class AdminReportsController {
  constructor(protected reportService: ReportService) {}

  async index({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const qs = request.qs()
    const filters = {
      projectId: qs.projectId
        ? Number(qs.projectId)
        : qs.project_id
          ? Number(qs.project_id)
          : undefined,
      status: qs.status as string | undefined,
      priority: qs.priority as string | undefined,
      page: qs.page ? Number(qs.page) : undefined,
      perPage: qs.perPage ? Number(qs.perPage) : qs.per_page ? Number(qs.per_page) : undefined,
      includePending: qs.include_pending === '1' || qs.includePending === '1',
    }

    // Non-admin users only see their own projects
    const result: any = await this.reportService.list(
      filters,
      user.role === 'admin' ? undefined : user.id
    )

    // Handle paginated vs non-paginated
    if (result.meta) {
      return response.json({
        data: result.all().map((r: any) => new ReportTransformer(r).toObject()),
        meta: result.getMeta(),
      })
    }

    const data = (result as any[]).map((r: any) => new ReportTransformer(r).toObject())
    return response.json({ data })
  }

  async show({ params, response }: HttpContext) {
    const report = await this.reportService.findById(params.id)
    return response.json({ data: new ReportTransformer(report as any).toObject() })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = request.only(['status', 'priority', 'assigneeId', 'assignee_id', 'title'])
    // Normalize assigneeId
    if ((payload as any).assignee_id !== undefined && (payload as any).assigneeId === undefined) {
      ;(payload as any).assigneeId = (payload as any).assignee_id
    }
    const report = await this.reportService.update(params.id, payload as any)
    return response.json({ data: new ReportTransformer(report as any).toObject() })
  }
}
