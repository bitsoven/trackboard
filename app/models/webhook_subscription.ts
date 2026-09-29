import { WebhookSubscriptionSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import Project from '#models/project'

/**
 * The `events` column is stored as JSON. The generated schema declares it as a
 * plain string, so without explicit prepare/consume the raw array is handed to
 * SQLite, which throws "can only bind numbers, strings, bigints, buffers, and
 * null". Serialize it to a JSON string on write and parse it back on read.
 */
function jsonPrepare(value: unknown) {
  if (value === null || value === undefined) return value
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}

function jsonConsume(value: unknown) {
  if (value === null || value === undefined) return value
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }
  return value
}

export default class WebhookSubscription extends WebhookSubscriptionSchema {
  @belongsTo(() => Project, {
    foreignKey: 'projectId',
  })
  declare project: BelongsTo<typeof Project>

  @column({ prepare: jsonPrepare, consume: jsonConsume })
  declare events: any
}
