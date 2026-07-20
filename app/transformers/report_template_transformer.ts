import type ReportTemplate from '#models/report_template'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ReportTemplateTransformer extends BaseTransformer<ReportTemplate> {
  toObject() {
    const fields = (this.resource as any).fields as any[] | undefined
    return {
      id: this.resource.id,
      projectId: this.resource.projectId,
      name: this.resource.name,
      isDefault: this.resource.isDefault,
      createdAt: this.resource.createdAt?.toISO() ?? null,
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
      fields: fields
        ? fields.map((f: any) => ({
            id: f.id,
            reportTemplateId: f.reportTemplateId,
            key: f.key,
            label: f.label,
            type: f.type,
            isRequired: f.isRequired,
            options: f.options,
            sortOrder: f.sortOrder,
            showIf: f.showIf,
          }))
        : undefined,
    }
  }
}
