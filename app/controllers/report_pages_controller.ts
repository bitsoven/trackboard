import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import drive from '@adonisjs/drive/services/main'
import ReportService from '#services/report_service'
import ConversationService from '#services/conversation_service'
import type { MessageResult } from '#services/conversation_service'
import Project from '#models/project'
import User from '#models/user'
import ReportTemplate from '#models/report_template'
import TeamService from '#services/team_service'

@inject()
export default class ReportPagesController {
  constructor(
    protected reportService: ReportService,
    protected conversationService: ConversationService
  ) {}

  /**
   * Reports board (Figma: Trackboard Dashboard). Groups reports into the three
   * designed columns instead of the paginated table.
   */
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const reports = await this.reportService.list(
      { includePending: true },
      user.role === 'admin' ? undefined : user.id
    )

    const templateIds = [
      ...new Set(reports.map((r: any) => r.templateId).filter((id): id is number => !!id)),
    ]
    const templates = templateIds.length
      ? await ReportTemplate.query().whereIn('id', templateIds)
      : []
    const templateNames = new Map(templates.map((t) => [t.id, t.name]))

    // Projects + templates for the "New Report" modal
    const projectsQuery =
      user.role === 'admin'
        ? Project.query().select('id', 'name', 'slug')
        : Project.query().where('ownerId', user.id).select('id', 'name', 'slug')
    const allProjects = await projectsQuery.orderBy('name', 'asc')
    const allProjectIds = allProjects.map((p) => p.id)
    const allTemplates = allProjectIds.length
      ? await ReportTemplate.query()
          .whereIn('projectId', allProjectIds)
          .preload('fields', (q) => q.orderBy('sortOrder', 'asc'))
          .orderBy('isDefault', 'desc')
          .orderBy('createdAt', 'asc')
      : []
    const projectsForModal = allProjects.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      templates: allTemplates
        .filter((t) => t.projectId === p.id)
        .map((t) => ({
          id: t.id,
          name: t.name,
          isDefault: !!t.isDefault,
          fields: (t.fields as any[]).map((f: any) => ({
            key: f.key,
            label: f.label,
            type: f.type,
            isRequired: !!f.isRequired,
            options: f.options ?? null,
            sortOrder: f.sortOrder ?? 0,
          })),
        })),
    }))

    const columns = [
      {
        key: 'new',
        label: 'New',
        statuses: ['open', 'pending_verification'],
        reports: [] as any[],
      },
      { key: 'in_progress', label: 'In Progress', statuses: ['in_progress'], reports: [] as any[] },
      {
        key: 'resolved',
        label: 'Resolved',
        statuses: ['resolved', 'closed'],
        reports: [] as any[],
      },
      {
        key: 'canceled',
        label: 'Canceled',
        statuses: ['canceled'],
        reports: [] as any[],
      },
      {
        key: 'not_now',
        label: 'Not Now',
        statuses: ['not_now'],
        reports: [] as any[],
      },
    ]

    for (const report of reports) {
      const column = columns.find((c) => c.statuses.includes(report.status))
      if (!column) continue
      column.reports.push({
        id: report.id,
        number: report.number,
        title: report.title,
        status: report.status,
        priority: report.priority,
        reporterEmail: report.reporterEmail,
        templateName: report.templateId ? (templateNames.get(report.templateId) ?? null) : null,
        createdAt: report.createdAt?.toISO() ?? null,
        updatedAt: report.updatedAt?.toISO() ?? null,
      })
    }

    return inertia.render(
      'reports/index' as any,
      {
        columns: columns.map(({ key, label, reports: columnReports }) => ({
          key,
          label,
          reports: columnReports,
        })),
        breadcrumb: [{ label: 'Reports' }],
        projects: projectsForModal,
      } as any
    )
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const projectId = Number(request.input('projectId') ?? request.input('project_id'))
    if (!projectId) {
      return response.badRequest({ message: 'Project is required' })
    }
    const project = await Project.findOrFail(projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return response.forbidden({ message: 'Not authorized for this project' })
    }

    const payload = request.only([
      'templateId',
      'template_id',
      'title',
      'fieldValues',
      'field_values',
      'priority',
    ])
    if ((payload as any).template_id !== undefined && (payload as any).templateId === undefined) {
      ;(payload as any).templateId = (payload as any).template_id
    }
    if ((payload as any).field_values !== undefined && (payload as any).fieldValues === undefined) {
      ;(payload as any).fieldValues = (payload as any).field_values
    }

    await this.reportService.createManual(project.id, payload as any, user.email)
    return response.redirect().toRoute('reports.index')
  }

  async show({ inertia, params, auth }: HttpContext) {
    const user = auth.user!
    const report = await this.reportService.findById(params.id)

    // Check ownership: user must own the project or be admin
    const project = await Project.findOrFail(report.projectId)
    if (!(await TeamService.canAccess(project.id, user.id, user.role))) {
      return inertia.render('errors/not_found' as any, {} as any)
    }

    const templateInfo = await this.reportService.getTemplateInfo(report)
    const assignee = report.assigneeId ? await User.find(report.assigneeId) : null
    const thread = await this.conversationService.getThread(report)
    const authors = await this.resolveThreadAuthors(thread)
    const assignableUsers = await this.resolveAssignableUsers(project.id)

    const data = {
      id: report.id,
      number: report.number,
      projectId: report.projectId,
      templateId: report.templateId,
      template: templateInfo.template,
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
      assignee: assignee
        ? { id: assignee.id, name: assignee.fullName, initials: assignee.initials }
        : null,
      createdAt: report.createdAt?.toISO() ?? null,
      updatedAt: report.updatedAt?.toISO() ?? null,
      fieldValues: (report as any).fieldValues
        .map((fv: any) => ({
          fieldKey: fv.fieldKey,
          label: templateInfo.fields[fv.fieldKey]?.label ?? fv.fieldKey,
          type: templateInfo.fields[fv.fieldKey]?.type ?? 'text',
          sortOrder: templateInfo.fields[fv.fieldKey]?.sortOrder ?? 0,
          value: fv.value,
        }))
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder),
      project: (report as any).project
        ? {
            id: (report as any).project.id,
            name: (report as any).project.name,
            slug: (report as any).project.slug,
          }
        : null,
    }

    const reference = report.number ? `#TB-${report.number}` : `#${String(report.id).slice(0, 8)}`

    return inertia.render(
      'reports/show' as any,
      {
        report: data,
        assignableUsers,
        thread: thread.map((m) => ({
          id: m.id,
          direction: m.direction,
          authorType: m.authorType,
          authorName: authors.get(m.id)?.name ?? m.authorName,
          authorInitials: authors.get(m.id)?.initials ?? null,
          body: m.body,
          createdAt: m.createdAt,
        })),
        breadcrumb: [{ label: 'Reports', href: '/reports' }, { label: reference }],
      } as any
    )
  }

  /**
   * Resolve display names for team-authored messages so the activity feed shows
   * the person rather than the generic "Team" label.
   */
  private async resolveThreadAuthors(thread: MessageResult[]) {
    const ids = [...new Set(thread.filter((m) => m.authorId).map((m) => m.authorId as number))]
    const resolved = new Map<number, { name: string; initials: string }>()
    if (ids.length === 0) return resolved

    const users = await User.query().whereIn('id', ids)
    const byId = new Map(users.map((u) => [u.id, u]))
    for (const message of thread) {
      if (!message.authorId) continue
      const user = byId.get(message.authorId)
      if (user)
        resolved.set(message.id, { name: user.fullName ?? user.email, initials: user.initials })
    }
    return resolved
  }

  /**
   * Team members who can be assigned to a report on this project — members
   * with an accepted invite (a linked user account).
   */
  private async resolveAssignableUsers(projectId: number) {
    const members = await TeamService.listMembers(projectId)
    return members
      .filter((member) => member.user)
      .map((member) => ({
        id: member.user.id,
        name: member.user.fullName ?? member.user.email,
        initials: member.user.initials,
        email: member.user.email,
      }))
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
