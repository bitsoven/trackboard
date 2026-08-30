import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import Project from '#models/project'
import TeamMember from '#models/team_member'
import User from '#models/user'
import ReportTemplateService from '#services/report_template_service'
import ProjectNotFoundException from '#exceptions/project_not_found_exception'

export type CreateProjectPayload = {
  name: string
  ownerId: number
  slug?: string
  requireEmailVerification?: boolean
}

export default class ProjectService {
  private static SLUG_MAX_LENGTH = 80

  /**
   * List projects visible to the given user. Admins see every project;
   * regular users see the projects they own (team-based access added later).
   */
  static async listForUser(userId: number, role: string): Promise<Project[]> {
    const query = Project.query().orderBy('createdAt', 'desc')
    if (role !== 'admin') {
      query.where('ownerId', userId)
    }
    return query
  }

  /**
   * Find a project by numeric id or slug, enforcing that the user may access it.
   * Throws ProjectNotFoundException when not found or not accessible.
   */
  static async findForUser(
    idOrSlug: string | number,
    userId: number,
    role: string
  ): Promise<Project> {
    const str = String(idOrSlug)
    let project: Project | null = null
    if (/^\d+$/.test(str)) {
      project = await Project.find(Number(str))
    }
    if (!project) project = await Project.findBy('slug', str)
    if (!project) throw new ProjectNotFoundException()
    if (role !== 'admin' && project.ownerId !== userId) {
      throw new ProjectNotFoundException()
    }
    return project
  }

  /**
   * Create a project for an owner, generating a unique slug and seeding the
   * default report template within a single transaction.
   */
  static async create(payload: CreateProjectPayload): Promise<Project> {
    const slug = await this.generateUniqueSlug(payload.name, payload.slug)

    return db.transaction(async (trx) => {
      const project = await Project.create(
        {
          name: payload.name.trim(),
          slug,
          ownerId: payload.ownerId,
          requireEmailVerification: payload.requireEmailVerification ?? false,
        },
        { client: trx }
      )

      const owner = await User.query({ client: trx }).where('id', payload.ownerId).firstOrFail()
      await TeamMember.create(
        {
          projectId: project.id,
          userId: owner.id,
          email: owner.email.toLowerCase(),
          role: 'owner',
          acceptedAt: DateTime.now(),
        },
        { client: trx }
      )

      await new ReportTemplateService().createDefault(project.id, trx)

      return project
    })
  }

  /**
   * Build a URL-safe slug from a base name, disambiguating against existing
   * slugs by appending a numeric suffix when necessary.
   */
  static async generateUniqueSlug(base: string, desired?: string): Promise<string> {
    const candidate = this.slugify(desired ?? base)
    let slug = candidate
    let suffix = 2

    while (await Project.findBy('slug', slug)) {
      const tail = `-${suffix}`
      slug = candidate.slice(0, this.SLUG_MAX_LENGTH - tail.length) + tail
      suffix++
    }

    return slug
  }

  /**
   * Rename a project and/or change its slug. A provided slug is slugified and
   * made unique (the project's own current slug is never treated as a clash).
   */
  static async update(
    projectId: number,
    data: { name?: string; slug?: string; requireEmailVerification?: boolean }
  ): Promise<Project> {
    const project = await Project.findOrFail(projectId)
    if (data.name !== undefined) project.name = data.name.trim()
    if (data.slug !== undefined) {
      const desired = data.slug.trim()
      if (desired.length > 0 && desired !== project.slug) {
        project.slug = await this.generateUniqueSlug(desired, desired)
      }
    }
    if (data.requireEmailVerification !== undefined) {
      project.requireEmailVerification = data.requireEmailVerification
    }
    await project.save()
    return project
  }

  /**
   * Delete a project. Dependent rows (team members, API keys, templates,
   * reports, webhooks, etc.) are removed by the database-level cascade
   * defined on the project foreign keys.
   */
  static async delete(projectId: number): Promise<void> {
    const project = await Project.findOrFail(projectId)
    await project.delete()
  }

  private static slugify(input: string): string {
    const slug = input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, this.SLUG_MAX_LENGTH)
    return slug || 'project'
  }
}
