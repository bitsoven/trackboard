import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ReportService from '#services/report_service'
import ConversationService from '#services/conversation_service'
import Project from '#models/project'

@inject()
export default class ReportPagesController {
  constructor(
    protected reportService: ReportService,
    protected conversationService: ConversationService
  ) {}

  async index({ inertia, request, auth }: HttpContext) {
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
      perPage: qs.perPage ? Number(qs.perPage) : undefined,
    }

    const result: any = await this.reportService.list(
      filters,
      user.role === 'admin' ? undefined : user.id
    )

    let reports: any[] = []
    let meta: any = null
    if (result.meta) {
      reports = result.all().map((r: any) => ({
        id: r.id,
        projectId: r.projectId,
        title: r.title,
        status: r.status,
        priority: r.priority,
        reporterEmail: r.reporterEmail,
        pageUrl: r.pageUrl,
        screenshotUrl: r.screenshotUrl,
        createdAt: r.createdAt?.toISO() ?? null,
        project: r.project
          ? { id: r.project.id, name: r.project.name, slug: r.project.slug }
          : null,
      }))
      meta = result.getMeta()
    } else {
      reports = (result as any[]).map((r: any) => ({
        id: r.id,
        projectId: r.projectId,
        title: r.title,
        status: r.status,
        priority: r.priority,
        reporterEmail: r.reporterEmail,
        pageUrl: r.pageUrl,
        screenshotUrl: r.screenshotUrl,
        createdAt: r.createdAt?.toISO() ?? null,
        project: r.project
          ? { id: r.project.id, name: r.project.name, slug: r.project.slug }
          : null,
      }))
    }

    // For admin, show all projects; for member, only owned
    const allProjects =
      user.role === 'admin' ? await Project.all() : await Project.query().where('ownerId', user.id)

    return inertia.render(
      'reports/index' as any,
      {
        reports,
        meta,
        filters,
        projects: allProjects.map((p) => ({ id: p.id, name: p.name, slug: p.slug })),
      } as any
    )
  }

  async show({ inertia, params, auth }: HttpContext) {
    const user = auth.user!
    const report = await this.reportService.findById(Number(params.id))

    // Check ownership: user must own the project or be admin
    const project = await Project.findOrFail(report.projectId)
    if (project.ownerId !== user.id && user.role !== 'admin') {
      return inertia.render('errors/not_found' as any, {} as any)
    }

    const data = {
      id: report.id,
      projectId: report.projectId,
      templateId: report.templateId,
      title: report.title,
      status: report.status,
      priority: report.priority,
      reporterEmail: report.reporterEmail,
      reporterVerifiedAt: report.reporterVerifiedAt?.toISO() ?? null,
      pageUrl: report.pageUrl,
      browserInfo: report.browserInfo,
      consoleErrors: report.consoleErrors,
      networkErrors: report.networkErrors,
      screenshotUrl: report.screenshotUrl,
      assigneeId: report.assigneeId,
      createdAt: report.createdAt?.toISO() ?? null,
      updatedAt: report.updatedAt?.toISO() ?? null,
      fieldValues: (report as any).fieldValues.map((fv: any) => ({
        fieldKey: fv.fieldKey,
        value: fv.value,
      })),
      project: (report as any).project
        ? {
            id: (report as any).project.id,
            name: (report as any).project.name,
            slug: (report as any).project.slug,
          }
        : null,
    }

    const thread = await this.conversationService.getThread(report)

    return inertia.render(
      'reports/show' as any,
      {
        report: data,
        thread: thread.map((m) => ({
          id: m.id,
          direction: m.direction,
          authorType: m.authorType,
          authorName: m.authorName,
          body: m.body,
          createdAt: m.createdAt,
        })),
      } as any
    )
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const report = await this.reportService.findById(Number(params.id))
    const project = await Project.findOrFail(report.projectId)
    if (project.ownerId !== user.id && user.role !== 'admin') {
      return response.forbidden({ message: 'Not authorized' })
    }
    const payload = request.only(['status', 'priority', 'assigneeId', 'assignee_id', 'title'])
    if ((payload as any).assignee_id !== undefined && (payload as any).assigneeId === undefined) {
      ;(payload as any).assigneeId = (payload as any).assignee_id
    }
    await this.reportService.update(report.id, payload as any)
    return response.redirect().back()
  }
}
