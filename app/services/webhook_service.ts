import axios from 'axios'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import type Report from '#models/report'
import WebhookSubscription from '#models/webhook_subscription'

export const WEBHOOK_EVENTS = ['report.created', 'report.updated'] as const

export type WebhookEvent = (typeof WEBHOOK_EVENTS)[number]

function buildReportPayload(report: Report) {
  const r = report as any
  return {
    id: r.id,
    projectId: r.projectId,
    templateId: r.templateId,
    title: r.title,
    status: r.status,
    priority: r.priority,
    reporterEmail: r.reporterEmail,
    pageUrl: r.pageUrl,
    createdAt: r.createdAt?.toISO() ?? null,
    updatedAt: r.updatedAt?.toISO() ?? null,
  }
}

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[]
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

export default class WebhookService {
  /**
   * Dispatch an event to all matching, active subscriptions for the report's
   * project. Delivery failures are swallowed so they never break the primary
   * request (report ingest / update).
   */
  static async dispatch(event: string, report: Report): Promise<void> {
    const subscriptions = await WebhookSubscription.query()
      .where('projectId', report.projectId)
      .where('active', true)

    for (const sub of subscriptions) {
      const events = parseJsonArray(sub.events)
      if (!events.includes(event)) continue
      await this.send(sub, event, report)
    }
  }

  static async send(
    subscription: WebhookSubscription,
    event: string,
    report: Report
  ): Promise<void> {
    const payload = {
      event,
      report: buildReportPayload(report),
      timestamp: new Date().toISOString(),
    }
    const body = JSON.stringify(payload)
    const signature = crypto.createHmac('sha256', subscription.secret).update(body).digest('hex')

    try {
      await axios.post(subscription.url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-Trackboard-Event': event,
          'X-Trackboard-Signature': `sha256=${signature}`,
        },
        timeout: 5000,
      })
    } catch (error) {
      console.warn(
        `Webhook delivery failed for ${subscription.url} (${event}):`,
        (error as Error)?.message
      )
    }
  }

  static async listForProject(projectId: number): Promise<WebhookSubscription[]> {
    return WebhookSubscription.query().where('projectId', projectId).orderBy('createdAt', 'desc')
  }

  static async create(
    projectId: number,
    data: { url: string; events: string[]; secret?: string; active?: boolean }
  ): Promise<WebhookSubscription> {
    const secret = data.secret ?? crypto.randomBytes(24).toString('hex')
    return WebhookSubscription.create({
      projectId,
      url: data.url,
      events: data.events,
      secret,
      active: data.active ?? true,
    })
  }

  static async update(
    id: number,
    data: { url?: string; events?: string[]; secret?: string; active?: boolean }
  ): Promise<WebhookSubscription> {
    const sub = await WebhookSubscription.findOrFail(id)
    if (data.url !== undefined) sub.url = data.url
    if (data.events !== undefined) sub.events = data.events
    if (data.secret !== undefined) sub.secret = data.secret
    if (data.active !== undefined) sub.active = data.active
    sub.updatedAt = DateTime.now()
    await sub.save()
    return sub
  }

  static async delete(id: number): Promise<void> {
    await WebhookSubscription.query().where('id', id).delete()
  }
}
