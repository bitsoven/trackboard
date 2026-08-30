import type Project from '#models/project'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ProjectTransformer extends BaseTransformer<Project> {
  toObject() {
    const r = this.resource as any
    return {
      id: r.id,
      name: r.name,
      slug: r.slug,
      ownerId: r.ownerId,
      requireEmailVerification: !!r.requireEmailVerification,
      createdAt: r.createdAt?.toISO() ?? null,
      updatedAt: r.updatedAt?.toISO() ?? null,
    }
  }
}
