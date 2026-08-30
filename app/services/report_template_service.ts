import db from '@adonisjs/lucid/services/db'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import ReportTemplate from '#models/report_template'
import TemplateField from '#models/template_field'
import ProjectNotFoundException from '#exceptions/project_not_found_exception'
import TemplateNotFoundException from '#exceptions/template_not_found_exception'
import Project from '#models/project'

export type CreateTemplatePayload = {
  name: string
  isDefault?: boolean
  is_default?: boolean
  fields?: Array<{
    key: string
    label: string
    type: string
    isRequired?: boolean
    is_required?: boolean
    options?: any
    sortOrder?: number
    sort_order?: number
    showIf?: any
    show_if?: any
  }>
}

export type UpdateTemplatePayload = {
  name?: string
  isDefault?: boolean
  is_default?: boolean
  fields?: Array<{
    key: string
    label: string
    type: string
    isRequired?: boolean
    is_required?: boolean
    options?: any
    sortOrder?: number
    sort_order?: number
    showIf?: any
    show_if?: any
  }>
}

function normalizeFields(rawFields: CreateTemplatePayload['fields']): Array<{
  key: string
  label: string
  type: string
  isRequired: boolean
  options: any
  sortOrder: number
  showIf: any
}> {
  if (!rawFields) return []
  return rawFields.map((f, idx) => ({
    key: f.key,
    label: f.label,
    type: f.type,
    isRequired: f.isRequired ?? f.is_required ?? false,
    options: f.options ?? null,
    sortOrder: f.sortOrder ?? f.sort_order ?? idx,
    showIf: f.showIf ?? f.show_if ?? null,
  }))
}

export default class ReportTemplateService {
  async listForProject(projectId: number): Promise<ReportTemplate[]> {
    const project = await Project.find(projectId)
    if (!project) throw new ProjectNotFoundException()

    return ReportTemplate.query()
      .where('projectId', projectId)
      .orderBy('isDefault', 'desc')
      .orderBy('createdAt', 'asc')
      .preload('fields', (q) => q.orderBy('sortOrder', 'asc'))
  }

  async findById(templateId: number): Promise<ReportTemplate> {
    const template = await ReportTemplate.query()
      .where('id', templateId)
      .preload('fields', (q) => q.orderBy('sortOrder', 'asc'))
      .first()

    if (!template) throw new TemplateNotFoundException()
    return template
  }

  async create(projectId: number, payload: CreateTemplatePayload): Promise<ReportTemplate> {
    const project = await Project.find(projectId)
    if (!project) throw new ProjectNotFoundException()

    const isDefault = payload.isDefault ?? payload.is_default ?? false

    return db.transaction(async (trx) => {
      if (isDefault) {
        await ReportTemplate.query({ client: trx })
          .where('projectId', projectId)
          .update({ isDefault: false })
      }

      const template = await ReportTemplate.create(
        {
          projectId,
          name: payload.name,
          isDefault,
        },
        { client: trx }
      )

      const normalized = normalizeFields(payload.fields)
      for (const field of normalized) {
        await TemplateField.create(
          {
            reportTemplateId: template.id,
            key: field.key,
            label: field.label,
            type: field.type,
            isRequired: field.isRequired,
            options: field.options,
            sortOrder: field.sortOrder,
            showIf: field.showIf,
          },
          { client: trx }
        )
      }

      await template.load('fields', (q) => q.orderBy('sortOrder', 'asc'))
      return template
    })
  }

  async update(templateId: number, payload: UpdateTemplatePayload): Promise<ReportTemplate> {
    const template = await this.findById(templateId)
    const isDefault = payload.isDefault ?? payload.is_default

    return db.transaction(async (trx) => {
      if (typeof isDefault === 'boolean' && isDefault) {
        await ReportTemplate.query({ client: trx })
          .where('projectId', template.projectId)
          .whereNot('id', templateId)
          .update({ isDefault: false })
        template.isDefault = true
      } else if (typeof isDefault === 'boolean') {
        template.isDefault = isDefault
      }

      if (typeof payload.name === 'string') {
        template.name = payload.name
      }

      await template.useTransaction(trx).save()

      if (payload.fields) {
        const normalized = normalizeFields(payload.fields)

        // Replace all fields: delete existing and recreate (simple reorder support)
        await TemplateField.query({ client: trx }).where('reportTemplateId', templateId).delete()

        for (const field of normalized) {
          await TemplateField.create(
            {
              reportTemplateId: templateId,
              key: field.key,
              label: field.label,
              type: field.type,
              isRequired: field.isRequired,
              options: field.options,
              sortOrder: field.sortOrder,
              showIf: field.showIf,
            },
            { client: trx }
          )
        }
      }

      await template.load('fields', (q) => q.orderBy('sortOrder', 'asc'))
      return template
    })
  }

  /**
   * Seed the standard "Bug Report" default template with its default fields.
   * Used when a project is created. Runs inside the caller's transaction when
   * a client is supplied.
   */
  async createDefault(
    projectId: number,
    client?: TransactionClientContract
  ): Promise<ReportTemplate> {
    const options = client ? { client } : {}
    const template = await ReportTemplate.create(
      {
        projectId,
        name: 'Bug Report',
        isDefault: true,
      },
      options
    )

    const defaultFields = [
      {
        key: 'steps',
        label: 'Steps to reproduce',
        type: 'textarea',
        isRequired: true,
        sortOrder: 0,
      },
      {
        key: 'expected',
        label: 'Expected behavior',
        type: 'textarea',
        isRequired: true,
        sortOrder: 1,
      },
      {
        key: 'actual',
        label: 'Actual behavior',
        type: 'textarea',
        isRequired: true,
        sortOrder: 2,
      },
      {
        key: 'severity',
        label: 'Severity',
        type: 'select',
        isRequired: true,
        sortOrder: 3,
        options: { choices: ['low', 'medium', 'high', 'critical'] },
      },
    ]

    for (const f of defaultFields) {
      await TemplateField.create(
        {
          reportTemplateId: template.id,
          key: f.key,
          label: f.label,
          type: f.type,
          isRequired: f.isRequired,
          options: (f as any).options ?? null,
          sortOrder: f.sortOrder,
        },
        options
      )
    }

    return template
  }

  async delete(templateId: number): Promise<void> {
    const template = await this.findById(templateId)
    await template.delete()
  }

  async getForWidget(projectId: number): Promise<ReportTemplate | null> {
    // Return default template if exists, otherwise first template
    let template = await ReportTemplate.query()
      .where('projectId', projectId)
      .where('isDefault', true)
      .preload('fields', (q) => q.orderBy('sortOrder', 'asc'))
      .first()

    if (!template) {
      template = await ReportTemplate.query()
        .where('projectId', projectId)
        .orderBy('createdAt', 'asc')
        .preload('fields', (q) => q.orderBy('sortOrder', 'asc'))
        .first()
    }

    return template
  }
}
