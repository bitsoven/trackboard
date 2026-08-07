import vine from '@vinejs/vine'

export const ingestReportValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
    reporterEmail: vine.string().trim().email(),
    pageUrl: vine.string().trim().optional(),
    browserInfo: vine.any().optional(),
    consoleErrors: vine.any().optional(),
    networkErrors: vine.any().optional(),
    screenshotUrl: vine.string().trim().url().optional().nullable(),
    templateId: vine.number().optional(),
    fieldValues: vine.object({}).allowUnknownProperties().optional(),
    // Allow legacy reporter_email snake_case
    reporter_email: vine.string().trim().email().optional(),
  })
)

export const updateReportValidator = vine.compile(
  vine.object({
    status: vine.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
    priority: vine.enum(['low', 'medium', 'high', 'critical']).optional(),
    assigneeId: vine.number().optional().nullable(),
    title: vine.string().trim().minLength(1).maxLength(255).optional(),
  })
)
