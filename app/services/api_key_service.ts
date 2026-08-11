import { DateTime } from 'luxon'
import ApiKey from '#models/api_key'

export default class ApiKeyService {
  static async listForProject(projectId: number): Promise<ApiKey[]> {
    return ApiKey.query()
      .where('projectId', projectId)
      .whereNull('revokedAt')
      .orderBy('createdAt', 'desc')
  }

  static async create(
    projectId: number,
    label?: string
  ): Promise<{ rawKey: string; record: ApiKey }> {
    return ApiKey.generate(projectId, label)
  }

  static async revoke(id: number): Promise<void> {
    const key = await ApiKey.findOrFail(id)
    key.revokedAt = DateTime.now()
    await key.save()
  }
}
