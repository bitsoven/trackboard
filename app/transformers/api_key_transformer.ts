import type ApiKey from '#models/api_key'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ApiKeyTransformer extends BaseTransformer<ApiKey> {
  constructor(
    resource: ApiKey,
    private rawKey?: string
  ) {
    super(resource)
  }

  toObject() {
    const r = this.resource as any
    return {
      id: r.id,
      projectId: r.projectId,
      label: r.label,
      keyPreview: r.keyHash ? `${r.keyHash.slice(0, 12)}…` : null,
      rawKey: this.rawKey ?? null,
      createdAt: r.createdAt?.toISO() ?? null,
      revokedAt: r.revokedAt?.toISO() ?? null,
    }
  }
}
