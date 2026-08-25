import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ReportService from '#services/report_service'
import Project from '#models/project'

@inject()
export default class InboxController {
  constructor(protected reportService: ReportService) {}

  async index({ inertia, request, auth }: HttpContext) {
    const user = auth.user!
    const qs = request.qs()
    const filters: any = {
      status: qs.status as string | undefined,
      priority: qs.priority as string | undefined,
      projectId: qs.projectId
        ? Number(qs.projectId)
        : qs.project_id
          ? Number(qs.project_id)
          : undefined,
    }

    // Default to needs-action: open + in_progress
    const inboxStatuses = ['open', 'in_progress']
    const effectiveStatus = filters.status ?? null
    const statusFilter =
      effectiveStatus && inboxStatuses.includes(effectiveStatus) ? effectiveStatus : undefined

    const result: any = await this.reportService.list(
      {
        projectId: filters.projectId,
        status: statusFilter,
        priority: filters.priority,
        includePending: false,
      },
      user.role === 'admin' ? undefined : user.id
    )

    // Filter to inbox statuses and sort by urgency (priority weight + recency)
    const priorityWeight: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 }
    let reports: any[] = Array.isArray(result) ? result : result.all ? result.all() : []
    reports = reports
      .filter((r: any) => inboxStatuses.includes(r.status))
      .sort((a: any, b: any) => {
        const wa = priorityWeight[a.priority] ?? 0
        const wb = priorityWeight[b.priority] ?? 0
        if (wb !== wa) return wb - wa
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      .map((r: any) => ({
        id: r.id,
        projectId: r.projectId,
        title: r.title,
        status: r.status,
        priority: r.priority,
        reporterEmail: r.reporterEmail,
        reporterVerifiedAt: r.reporterVerifiedAt?.toISO?.() ?? r.reporterVerifiedAt ?? null,
        assigneeId: r.assigneeId,
        updatedAt: r.updatedAt?.toISO?.() ?? null,
        createdAt: r.createdAt?.toISO?.() ?? null,
        project: r.project
          ? { id: r.project.id, name: r.project.name, slug: r.project.slug }
          : null,
      }))

    const allProjects =
      user.role === 'admin' ? await Project.all() : await Project.query().where('ownerId', user.id)

    return inertia.render(
      'inbox/index' as any,
      {
        reports,
        filters: { ...filters, status: statusFilter },
        projects: allProjects.map((p) => ({ id: p.id, name: p.name, slug: p.slug })),
      } as any
    )
  }
}
