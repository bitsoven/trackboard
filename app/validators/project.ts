import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    slug: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(100)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    requireEmailVerification: vine.boolean().optional(),
  })
)

export const updateProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(120),
    slug: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(100)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    requireEmailVerification: vine.boolean().optional(),
  })
)
