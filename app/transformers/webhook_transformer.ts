import type WebhookSubscription from '#models/webhook_subscription'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class WebhookTransformer extends BaseTransformer<WebhookSubscription> {
  toObject() {
    const r = this.resource as any
    return {
      id: r.id,
      projectId: r.projectId,
      url: r.url,
      events: Array.isArray(r.events) ? r.events : [],
      active: !!r.active,
      createdAt: r.createdAt?.toISO() ?? null,
      updatedAt: r.updatedAt?.toISO() ?? null,
    }
  }
}
