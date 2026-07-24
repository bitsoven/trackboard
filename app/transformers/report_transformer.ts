import type Report from '#models/report'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ReportTransformer extends BaseTransformer<Report> {
  toObject() {
    const fieldValues = (this.resource as any).fieldValues as any[] | undefined
    return {
      id: this.resource.id,
      projectId: this.resource.projectId,
      templateId: this.resource.templateId,
      title: this.resource.title,
      status: this.resource.status,
      priority: this.resource.priority,
      reporterEmail: this.resource.reporterEmail,
      reporterVerifiedAt: this.resource.reporterVerifiedAt?.toISO() ?? null,
      pageUrl: this.resource.pageUrl,
      browserInfo: this.resource.browserInfo,
      consoleErrors: this.resource.consoleErrors,
      networkErrors: this.resource.networkErrors,
      screenshotUrl: this.resource.screenshotUrl,
      assigneeId: this.resource.assigneeId,
      createdAt: this.resource.createdAt?.toISO() ?? null,
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
      fieldValues: fieldValues
        ? fieldValues.map((fv: any) => ({
            fieldKey: fv.fieldKey,
            value: fv.value,
          }))
        : undefined,
      project: (this.resource as any).project
        ? {
            id: (this.resource as any).project.id,
            name: (this.resource as any).project.name,
            slug: (this.resource as any).project.slug,
          }
        : undefined,
    }
  }
}
