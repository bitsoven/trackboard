import { ApiKeySchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import Project from '#models/project'
import hash from '@adonisjs/core/services/hash'
import { randomBytes } from 'node:crypto'

export default class ApiKey extends ApiKeySchema {
  @belongsTo(() => Project, {
    foreignKey: 'projectId',
  })
  declare project: BelongsTo<typeof Project>

  /**
   * Generate a new API key pair.
   * Returns { rawKey, hash } where rawKey is shown once to the user.
   */
  static async generate(
    projectId: number,
    label?: string
  ): Promise<{ rawKey: string; record: ApiKey }> {
    const rawKey = `tb_${randomBytes(24).toString('hex')}`
    const keyHash = await hash.make(rawKey)

    const record = await ApiKey.create({
      projectId,
      keyHash,
      label: label ?? null,
    })

    return { rawKey, record }
  }

  /**
   * Verify a raw key against stored hash.
   */
  static async verify(rawKey: string, hashed: string): Promise<boolean> {
    return hash.verify(hashed, rawKey)
  }

  /**
   * Find project by raw API key (checks all non-revoked keys).
   */
  static async findProjectByKey(rawKey: string): Promise<Project | null> {
    const keys = await ApiKey.query().whereNull('revokedAt').preload('project')
    for (const k of keys) {
      if (await hash.verify(k.keyHash, rawKey)) {
        return k.project
      }
    }
    return null
  }
}
