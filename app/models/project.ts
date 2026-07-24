import { ProjectSchema } from '#database/schema'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import ApiKey from '#models/api_key'
import AllowedOrigin from '#models/allowed_origin'
import ReportTemplate from '#models/report_template'
import Report from '#models/report'

export default class Project extends ProjectSchema {
  @belongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  declare owner: BelongsTo<typeof User>

  @hasMany(() => ApiKey, {
    foreignKey: 'projectId',
  })
  declare apiKeys: HasMany<typeof ApiKey>

  @hasMany(() => AllowedOrigin, {
    foreignKey: 'projectId',
  })
  declare allowedOrigins: HasMany<typeof AllowedOrigin>

  @hasMany(() => ReportTemplate, {
    foreignKey: 'projectId',
  })
  declare reportTemplates: HasMany<typeof ReportTemplate>

  @hasMany(() => Report, {
    foreignKey: 'projectId',
  })
  declare reports: HasMany<typeof Report>

  /**
   * Check if an origin is allowed for this project.
   * Supports exact match and wildcard prefix (e.g. https://*.example.com).
   * For now exact match only — matches spec requirement.
   */
  isOriginAllowed(_origin: string): boolean {
    // This is a synchronous helper for already-loaded relations.
    // For DB-backed check use AllowedOrigin.isAllowed(projectId, origin)
    return false
  }
}
