import { DateTime } from 'luxon'
import Report from '#models/report'
import Project from '#models/project'
import db from '@adonisjs/lucid/services/db'

export type OverviewStats = {
  open: number
  inProgress: number
  pendingVerification: number
  resolvedThisWeek: number
  total: number
  avgTimeToFirstResponseHours: number | null
}

export type TrendPoint = {
  date: string
  count: number
}

export default class OverviewService {
  private async getProjectIds(userId: number, role: string): Promise<number[]> {
    if (role === 'admin') {
      const projects = await Project.query().select('id')
      return projects.map((p) => p.id)
    }
    const projects = await Project.query().where('ownerId', userId).select('id')
    return projects.map((p) => p.id)
  }

  async getStats(userId: number, role: string): Promise<OverviewStats> {
    const projectIds = await this.getProjectIds(userId, role)
    if (projectIds.length === 0) {
      return {
        open: 0,
        inProgress: 0,
        pendingVerification: 0,
        resolvedThisWeek: 0,
        total: 0,
        avgTimeToFirstResponseHours: null,
      }
    }

    const [openRows, inProgressRows, pendingRows, totalRows, resolvedRows] = await Promise.all([
      Report.query().whereIn('projectId', projectIds).where('status', 'open').count('* as total'),
      Report.query()
        .whereIn('projectId', projectIds)
        .where('status', 'in_progress')
        .count('* as total'),
      Report.query()
        .whereIn('projectId', projectIds)
        .where('status', 'pending_verification')
        .count('* as total'),
      Report.query().whereIn('projectId', projectIds).count('* as total'),
      Report.query()
        .whereIn('projectId', projectIds)
        .where('status', 'resolved')
        .where('updatedAt', '>=', DateTime.now().minus({ days: 7 }).toJSDate())
        .count('* as total'),
    ])
    const extractCount = (rows: any) => {
      const row = Array.isArray(rows) ? rows[0] : rows
      if (!row) return 0
      const val =
        (row as any).$extras?.total ?? (row as any).total ?? (row as any)['count(*) as total'] ?? 0
      return Number(val)
    }
    const open = extractCount(openRows)
    const inProgress = extractCount(inProgressRows)
    const pendingVerification = extractCount(pendingRows)
    const total = extractCount(totalRows)
    const resolvedThisWeek = extractCount(resolvedRows)

    // Avg time to first response: avg hours between report.createdAt and first outbound message
    let avgTimeToFirstResponseHours: number | null = null
    try {
      const result = await db.rawQuery(
        `SELECT AVG(EXTRACT(EPOCH FROM (m.created_at - r.created_at)) / 3600) as avg_hours
         FROM reports r
         JOIN conversations c ON c.report_id = r.id
         JOIN messages m ON m.conversation_id = c.id AND m.direction = 'outbound'
         WHERE r.project_id IN (${projectIds.join(',') || 'NULL'})
         AND m.created_at = (
           SELECT MIN(m2.created_at) FROM messages m2
           JOIN conversations c2 ON c2.id = m2.conversation_id
           WHERE c2.report_id = r.id AND m2.direction = 'outbound'
         )`
      )
      const row = result.rows?.[0] ?? result[0]
      if (row?.avg_hours) avgTimeToFirstResponseHours = Math.round(Number(row.avg_hours) * 10) / 10
    } catch {
      avgTimeToFirstResponseHours = null
    }

    return {
      open,
      inProgress,
      pendingVerification,
      resolvedThisWeek,
      total,
      avgTimeToFirstResponseHours,
    }
  }

  async getTrend(userId: number, role: string, days: number = 7): Promise<TrendPoint[]> {
    const projectIds = await this.getProjectIds(userId, role)
    if (projectIds.length === 0) return []

    const since = DateTime.now().minus({ days }).startOf('day')
    const reports = await Report.query()
      .whereIn('projectId', projectIds)
      .where('createdAt', '>=', since.toJSDate())
      .select('createdAt')

    const counts = new Map<string, number>()
    for (let i = 0; i < days; i++) {
      const d = since.plus({ days: i }).toFormat('yyyy-MM-dd')
      counts.set(d, 0)
    }
    for (const r of reports) {
      const d = (r.createdAt as DateTime).toFormat('yyyy-MM-dd')
      if (counts.has(d)) counts.set(d, (counts.get(d) ?? 0) + 1)
    }
    return Array.from(counts.entries()).map(([date, count]) => ({ date, count }))
  }

  async getWorklist(userId: number, role: string): Promise<any[]> {
    const projectIds = await this.getProjectIds(userId, role)
    if (projectIds.length === 0) return []

    const reports = await Report.query()
      .whereIn('projectId', projectIds)
      .whereIn('status', ['open', 'in_progress'])
      .orderByRaw(
        `CASE priority WHEN 'critical' THEN 4 WHEN 'high' THEN 3 WHEN 'medium' THEN 2 WHEN 'low' THEN 1 ELSE 0 END DESC`
      )
      .orderBy('createdAt', 'desc')
      .limit(5)
      .preload('project')

    return reports.map((r: any) => ({
      id: r.id,
      title: r.title,
      status: r.status,
      priority: r.priority,
      reporterEmail: r.reporterEmail,
      createdAt: r.createdAt?.toISO() ?? null,
      project: r.project ? { id: r.project.id, name: r.project.name, slug: r.project.slug } : null,
    }))
  }
}
