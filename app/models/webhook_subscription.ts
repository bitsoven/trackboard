import { WebhookSubscriptionSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import Project from '#models/project'

export default class WebhookSubscription extends WebhookSubscriptionSchema {
  @belongsTo(() => Project, {
    foreignKey: 'projectId',
  })
  declare project: BelongsTo<typeof Project>
}
