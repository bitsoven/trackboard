import db from '@adonisjs/lucid/services/db'
import encryption from '@adonisjs/core/services/encryption'
import { Exception } from '@adonisjs/core/exceptions'
import { DateTime } from 'luxon'
import Report from '#models/report'
import ReportFieldValue from '#models/report_field_value'
import Project from '#models/project'
import ReportTemplate from '#models/report_template'
import { buildDynamicSchema } from '#services/template_service'
import { ingestReportValidator, updateReportValidator } from '#validators/report'
import drive from '@adonisjs/drive/services/main'
import ReportVerificationException from '#exceptions/report_verification_exception'
import { sendVerificationMail } from '#mails/verification_mail'
import WebhookService from '#services/webhook_service'
import { randomUUID } from 'node:crypto'
import { promises as dns } from 'node:dns'

const VERIFICATION_TOKEN_TTL_HOURS = 24

export type VerificationTokenPayload = {
  reportId: number
  exp: number
}

export type IngestPayload = {
  title: string
  reporterEmail: string
  reporter_email?: string
  pageUrl?: string
  browserInfo?: any
  consoleErrors?: any
  networkErrors?: any
  screenshotUrl?: string | null
  templateId?: number
  fieldValues?: Record<string, unknown>
  priority?: string
  status?: string
}

export default class ReportService {
  async ingest(
    project: Project,
    payload: Record<string, unknown>,
    opts?: { screenshotBase64?: string }
  ): Promise<Report> {
    // Normalize reporterEmail snake_case
    if ((payload as any).reporter_email && !(payload as any).reporterEmail) {
      ;(payload as any).reporterEmail = (payload as any).reporter_email
    }

    // Validate top-level via ingestReportValidator (enforces reporterEmail required)
    const topLevel = (await ingestReportValidator.validate(payload)) as any

    // Enforce MX record validation server-side
    const emailToCheck = topLevel.reporterEmail as string
    if (emailToCheck) {
      const domain = emailToCheck.split('@')[1]?.toLowerCase()
      const bypass = new Set([
        'example.com',
        'example.org',
        'example.net',
        'test.com',
        'localhost',
        'invalid',
      ])
      const shouldCheck =
        domain &&
        !bypass.has(domain) &&
        !domain.endsWith('.example') &&
        !domain.endsWith('.test') &&
        !domain.endsWith('.invalid') &&
        domain !== 'test'
      if (shouldCheck) {
        // Fast-path for reserved .invalid TLD
        if (domain.endsWith('.invalid')) {
          throw new Exception('Invalid email domain (no MX record)', {
            status: 422,
            code: 'E_VALIDATION_ERROR',
          })
        }
        try {
          const records = await dns.resolveMx(domain)
          if (!records || records.length === 0) {
            throw new Error('MX_MISSING')
          }
        } catch (error: any) {
          if (
            error.message === 'MX_MISSING' ||
            error?.code === 'ENOTFOUND' ||
            error?.code === 'ENODATA'
          ) {
            throw new Exception('Invalid email domain (no MX record)', {
              status: 422,
              code: 'E_VALIDATION_ERROR',
            })
          }
          // For other DNS errors, allow (avoid flaky CI)
        }
      }
    }

    const reporterEmail = (topLevel as any).reporterEmail as string
    const title = (topLevel as any).title as string
    const pageUrl = (topLevel as any).pageUrl as string | undefined
    const browserInfo = (topLevel as any).browserInfo
    const consoleErrors = (topLevel as any).consoleErrors
    const networkErrors = (topLevel as any).networkErrors
    let screenshotUrl = (topLevel as any).screenshotUrl as string | null | undefined
    const templateId = (topLevel as any).templateId as number | undefined
    const fieldValues = (topLevel as any).fieldValues as Record<string, unknown> | undefined

    // Resolve template: explicit or default
    let template: ReportTemplate | null = null
    if (templateId) {
      template = await ReportTemplate.query()
        .where('id', templateId)
        .where('projectId', project.id)
        .preload('fields')
        .first()
      if (!template) throw new Error('Template not found for this project')
    } else {
      template = await ReportTemplate.query()
        .where('projectId', project.id)
        .where('isDefault', true)
        .preload('fields')
        .first()
      if (!template) {
        template = await ReportTemplate.query()
          .where('projectId', project.id)
          .orderBy('createdAt', 'asc')
          .preload('fields')
          .first()
      }
    }

    // Validate dynamic fields if template exists
    if (template && fieldValues) {
      const validator = buildDynamicSchema(template)
      await validator.validate(fieldValues)
    } else if (template && !fieldValues) {
      // If template has required fields and no fieldValues provided, validate empty
      const validator = buildDynamicSchema(template)
      const hasRequired = (template.fields as any[]).some((f) => !!f.isRequired)
      if (hasRequired) {
        await validator.validate({})
      }
    }

    // Handle screenshot base64 upload if provided via opts
    const isTest = process.env.NODE_ENV === 'test'
    if (opts?.screenshotBase64) {
      const base64 = opts.screenshotBase64.replace(/^data:image\/\w+;base64,/, '')
      if (isTest) {
        screenshotUrl = `data:image/png;base64,${base64}`
      } else {
        const buffer = Buffer.from(base64, 'base64')
        const key = `screenshots/${project.id}/${randomUUID()}.png`
        const disk = drive.use('s3')
        try {
          await disk.put(key, buffer, { contentType: 'image/png' })
          const url = await disk.getUrl(key)
          screenshotUrl = url
        } catch {
          screenshotUrl = `data:image/png;base64,${base64}`
        }
      }
    } else if (screenshotUrl && screenshotUrl.startsWith('data:image')) {
      const base64 = screenshotUrl.replace(/^data:image\/\w+;base64,/, '')
      if (isTest) {
        // keep as data URL in test
      } else {
        const buffer = Buffer.from(base64, 'base64')
        const key = `screenshots/${project.id}/${randomUUID()}.png`
        try {
          const disk = drive.use('s3')
          await disk.put(key, buffer, { contentType: 'image/png' })
          screenshotUrl = await disk.getUrl(key)
        } catch {
          // keep as is for test
        }
      }
    }

    // When the project requires email verification and a reporter email is
    // present, the report starts in a pending state and is hidden from the
    // active queue until the reporter clicks the magic link.
    const requiresVerification = !!project.requireEmailVerification && !!reporterEmail
    const initialStatus = requiresVerification ? 'pending_verification' : 'open'

    const report = await db.transaction(async (trx) => {
      const created = await Report.create(
        {
          projectId: project.id,
          templateId: template?.id ?? null,
          title,
          status: initialStatus,
          priority: (payload as any).priority ?? 'medium',
          reporterEmail,
          pageUrl: pageUrl ?? null,
          browserInfo: browserInfo ?? null,
          consoleErrors: consoleErrors ?? null,
          networkErrors: networkErrors ?? null,
          screenshotUrl: screenshotUrl ?? null,
        },
        { client: trx }
      )

      if (fieldValues) {
        for (const [fieldKey, value] of Object.entries(fieldValues)) {
          const storedValue = Array.isArray(value) ? JSON.stringify(value) : String(value ?? '')
          await ReportFieldValue.create(
            {
              reportId: created.id,
              fieldKey,
              value: storedValue,
            },
            { client: trx }
          )
        }
      }

      await created.load('fieldValues')
      return created
    })

    if (requiresVerification && report.reporterEmail) {
      const token = this.generateVerificationToken(report)
      report.verificationToken = token
      report.verificationSentAt = DateTime.now()
      await report.save()
      await this.sendVerificationEmail(report, token)
    }

    // Fire outbound webhooks + optional GitHub issue sync (best-effort).
    await this.notifyIntegrations(report, 'report.created')

    return report
  }

  /**
   * Fire integrations for a report lifecycle event. Webhooks are dispatched
   * (best-effort) and never break the primary request.
   */
  protected async notifyIntegrations(report: Report, event: 'report.created' | 'report.updated') {
    await WebhookService.dispatch(event, report)
  }

  /**
   * Build a signed, expiring magic-link token for report verification.
   */
  generateVerificationToken(report: Report): string {
    const payload: VerificationTokenPayload = {
      reportId: report.id,
      exp: DateTime.now().plus({ hours: VERIFICATION_TOKEN_TTL_HOURS }).toMillis(),
    }
    return encryption.encrypt(payload)
  }

  /**
   * Decrypt and validate a verification token. Throws a domain exception when
   * the token is malformed, expired, or mismatched.
   */
  protected decryptVerificationToken(token: string): VerificationTokenPayload {
    let payload: VerificationTokenPayload | null
    try {
      payload = encryption.decrypt(token) as VerificationTokenPayload | null
    } catch {
      payload = null
    }
    if (!payload || typeof payload.reportId !== 'number' || typeof payload.exp !== 'number') {
      throw ReportVerificationException.invalidToken()
    }
    if (payload.exp < DateTime.now().toMillis()) {
      throw ReportVerificationException.invalidToken()
    }
    return payload
  }

  /**
   * Verify a report from its magic-link token: marks it verified and flips the
   * status out of pending into the active queue.
   */
  async verify(token: string): Promise<Report> {
    const payload = this.decryptVerificationToken(token)
    const report = await Report.findOrFail(payload.reportId)
    if (report.reporterVerifiedAt) {
      throw ReportVerificationException.alreadyVerified()
    }
    if (report.verificationToken !== token) {
      throw ReportVerificationException.invalidToken()
    }
    report.reporterVerifiedAt = DateTime.now()
    report.status = 'open'
    report.verificationToken = null
    await report.save()
    await report.load('fieldValues')
    await report.load('project')
    return report
  }

  protected async sendVerificationEmail(report: Report, token: string): Promise<void> {
    const appUrl = process.env.APP_URL ?? 'http://localhost:3333'
    const verifyUrl = `${appUrl.replace(/\/$/, '')}/api/public/reports/verify/${encodeURIComponent(token)}`
    try {
      await sendVerificationMail(report, verifyUrl)
    } catch (error) {
      // Mail delivery is best-effort: verification still works via the stored
      // token, so we must not fail the ingest because of a mail error.
      console.warn('Failed to send verification email', (error as Error)?.message)
    }
  }

  async list(
    filters: {
      projectId?: number
      status?: string
      priority?: string
      page?: number
      perPage?: number
      includePending?: boolean
    },
    userId?: number
  ) {
    const query = Report.query()
      .orderBy('createdAt', 'desc')
      .preload('fieldValues')
      .preload('project')

    if (filters.projectId) query.where('projectId', filters.projectId)
    if (filters.status) query.where('status', filters.status)
    if (filters.priority) query.where('priority', filters.priority)

    // Unverified reports are hidden from the active queue unless explicitly
    // requested (e.g. filtering by status or opting in via includePending).
    const wantsPending = filters.status === 'pending_verification'
    if (!filters.status && !filters.includePending && !wantsPending) {
      query.whereNot('status', 'pending_verification')
    }

    // If userId provided and not admin, filter to projects owned by user
    if (userId) {
      const userProjects = await Project.query().where('ownerId', userId).select('id')
      const ids = userProjects.map((p) => p.id)
      if (ids.length === 0) {
        query.where('projectId', -1)
      } else {
        query.whereIn('projectId', ids)
      }
    }

    if (filters.page && filters.perPage) {
      return query.paginate(filters.page, filters.perPage)
    }
    return query.exec()
  }

  async findById(id: number): Promise<Report> {
    const report = await Report.query()
      .where('id', id)
      .preload('fieldValues')
      .preload('project')
      .first()
    if (!report) throw new Error('Report not found')
    return report
  }

  async update(
    id: number,
    payload: { status?: string; priority?: string; assigneeId?: number | null; title?: string }
  ): Promise<Report> {
    const data = (await updateReportValidator.validate(payload)) as any
    const report = await Report.findOrFail(id)
    if (data.status) report.status = data.status as string
    if (data.priority) report.priority = data.priority as string
    if (data.assigneeId !== undefined) report.assigneeId = data.assigneeId as number | null
    if (data.title) report.title = data.title as string
    await report.save()
    await report.load('fieldValues')
    await this.notifyIntegrations(report, 'report.updated')
    return report
  }

  async generateUploadUrl(
    projectId: number,
    filename: string
  ): Promise<{ url: string; key: string }> {
    const key = `screenshots/${projectId}/${randomUUID()}-${filename}`
    const disk = drive.use('s3')
    // For MinIO, getSignedUrl may not be available via drive, fallback to putUrl
    try {
      // @ts-ignore - drive may have getSignedUrl
      const url = await (disk as any).getSignedUrl(key, { expiresIn: 3600 })
      return { url, key }
    } catch {
      // Fallback: return key for direct PUT via server
      return { url: `/api/public/upload/${key}`, key }
    }
  }
}
