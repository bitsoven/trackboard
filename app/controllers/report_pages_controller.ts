import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import drive from '@adonisjs/drive/services/main'
import ReportService from '#services/report_service'
import ConversationService from '#services/conversation_service'
import Project from '#models/project'
import TeamService from '#services/team_service'

@inject()
export default class ReportPagesController {
  constructor(
    protected reportService: ReportService,
    protected conversationService: ConversationService
  ) {}

  async index({ inertia, request, auth }: HttpContext) {
    const user = auth.user!
    const qs = request.qs()
    const rawStatus = qs.status as string | undefined
    const needsAction = rawStatus === 'needs_action'
    const filters = {
      projectId: qs.projectId
        ? Number(qs.projectId)
        : qs.project_id
          ? Number(qs.project_id)
          : undefined,
      status: rawStatus,
      priority: qs.priority as string | undefined,
      page: qs.page ? Number(qs.page) : undefined,
      perPage: qs.perPage ? Number(qs.perPage) : undefined,
    }

    const result: any = await this.reportService.list(
      {
        ...filters,
        status: needsAction ? undefined : filters.status,
        needsAction: needsAction ? true : undefined,
      },
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
    const report = await this.reportService.findById(params.id)

    // Check ownership: user must own the project or be admin
    const project = await Project.findOrFail(report.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return inertia.render('errors/not_found' as any, {} as any)
    }

    const fieldLabels = await this.reportService.getFieldLabels(report)

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
        label: fieldLabels[fv.fieldKey] ?? fv.fieldKey,
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
    const report = await this.reportService.findById(params.id)
    const project = await Project.findOrFail(report.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized' })
    }
    const payload = request.only(['status', 'priority', 'assigneeId', 'assignee_id', 'title'])
    if ((payload as any).assignee_id !== undefined && (payload as any).assigneeId === undefined) {
      ;(payload as any).assigneeId = (payload as any).assignee_id
    }
    await this.reportService.update(report.id, payload as any)
    return response.redirect().back()
  }

  /**
   * Serve a report's screenshot through the app so it loads regardless of the
   * storage bucket's visibility. Inline data URLs are streamed directly; S3
   * object URLs are redirected to a freshly-issued presigned URL.
   */
  async screenshot({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const report = await this.reportService.findById(params.id)
    const project = await Project.findOrFail(report.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.notFound()
    }

    const url = report.screenshotUrl
    if (!url) return response.notFound()

    // Inline data URL — decode and stream directly.
    const dataMatch = url.match(/^data:(image\/[\w+.-]+);base64,(.*)$/s)
    if (dataMatch) {
      response.header('Content-Type', dataMatch[1])
      return response.send(Buffer.from(dataMatch[2], 'base64'))
    }

    // S3 object URL — derive the key and issue a short-lived presigned URL.
    try {
      const path = new URL(url).pathname
      const keyMatch = path.match(/\/screenshots\/.+/)
      if (!keyMatch) return response.notFound()
      const key = keyMatch[0].replace(/^\//, '')
      const disk = drive.use('s3')
      const signed = await disk.getSignedUrl(key, { expiresIn: '1h' })
      return response.redirect(signed)
    } catch {
      return response.notFound()
    }
  }
}
