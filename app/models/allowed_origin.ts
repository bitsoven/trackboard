import { AllowedOriginSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import Project from '#models/project'

export default class AllowedOrigin extends AllowedOriginSchema {
  @belongsTo(() => Project, {
    foreignKey: 'projectId',
  })
  declare project: BelongsTo<typeof Project>

  /**
   * Normalize origin for comparison (strip trailing slash, lowercase host).
   */
  static normalize(origin: string): string {
    try {
      const url = new URL(origin)
      return `${url.protocol}//${url.host}`.toLowerCase()
    } catch {
      return origin.trim().replace(/\/$/, '').toLowerCase()
    }
  }

  /**
   * Check if a given Origin/Referer header value is allowed for a project.
   */
  static async isAllowed(
    projectId: number,
    headerValue: string | null | undefined
  ): Promise<boolean> {
    if (!headerValue) return false

    let originToCheck: string
    try {
      // Header may be full URL (Referer) or just origin
      const url = new URL(headerValue)
      originToCheck = `${url.protocol}//${url.host}`.toLowerCase()
    } catch {
      originToCheck = headerValue.trim().replace(/\/$/, '').toLowerCase()
    }

    const allowed = await AllowedOrigin.query().where('projectId', projectId)
    if (allowed.length === 0) return false

    return allowed.some((row) => {
      const normalizedRow = AllowedOrigin.normalize(row.origin)
      // Support wildcard like https://*.example.com
      if (normalizedRow.includes('*')) {
        const pattern = normalizedRow.replace(/\./g, '\\.').replace(/\*/g, '.*')
        return new RegExp(`^${pattern}$`).test(originToCheck)
      }
      return normalizedRow === originToCheck
    })
  }
}
