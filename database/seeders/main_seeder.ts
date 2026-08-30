import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import User from '#models/user'
import Project from '#models/project'
import ApiKey from '#models/api_key'
import AllowedOrigin from '#models/allowed_origin'
import ReportTemplate from '#models/report_template'
import TemplateField from '#models/template_field'
import TeamMember from '#models/team_member'

export default class extends BaseSeeder {
  async run(): Promise<void> {
    const email = 'demo@trackboard.local'
    let user = await User.findBy('email', email)
    if (!user) {
      user = await User.create({
        email,
        password: 'password123',
        fullName: 'Demo User',
        role: 'admin',
      })
      console.log(`Created demo user: ${email} / password123`)
    }

    const slug = 'demo-project'
    let project = await Project.findBy('slug', slug)
    if (!project) {
      project = await Project.create({
        name: 'Demo Project',
        slug,
        ownerId: user.id,
      })
      console.log(`Created demo project: ${slug} (owner ${user.email})`)
    }

    // Ensure the owner is enrolled as a team member (idempotent).
    const existingOwnerMember = await TeamMember.query()
      .where('projectId', project.id)
      .where('email', user.email.toLowerCase())
      .first()
    if (!existingOwnerMember) {
      await TeamMember.create({
        projectId: project.id,
        userId: user.id,
        email: user.email.toLowerCase(),
        role: 'owner',
        acceptedAt: DateTime.now(),
      })
      console.log(`Enrolled ${user.email} as owner of ${slug}`)
    }

    // Ensure at least one allowed origin
    const origin = 'http://localhost:3000'
    const existingOrigin = await AllowedOrigin.query()
      .where('projectId', project.id)
      .where('origin', origin)
      .first()
    if (!existingOrigin) {
      await AllowedOrigin.create({ projectId: project.id, origin })
      console.log(`Added allowed origin ${origin} to project ${slug}`)
    }

    // Generate an API key if none exists
    const existingKey = await ApiKey.query()
      .where('projectId', project.id)
      .whereNull('revokedAt')
      .first()
    if (!existingKey) {
      const { rawKey } = await ApiKey.generate(project.id, 'Demo key (seed)')
      console.log(`\nAPI key for ${slug} (copy now, hashed in DB):`)
      console.log(rawKey)
      console.log('')
    } else {
      console.log(
        `Demo project already has an API key (id ${existingKey.id}) — generate a new one with: node ace tinker`
      )
    }

    // Seed default report template if none exists (per DESIGN.md §5: new projects get one)
    const existingTemplate = await ReportTemplate.query().where('projectId', project.id).first()
    if (!existingTemplate) {
      const template = await ReportTemplate.create({
        projectId: project.id,
        name: 'Bug Report',
        isDefault: true,
      })
      const defaultFields = [
        {
          key: 'steps',
          label: 'Steps to reproduce',
          type: 'textarea',
          isRequired: true,
          sortOrder: 0,
        },
        {
          key: 'expected',
          label: 'Expected behavior',
          type: 'textarea',
          isRequired: true,
          sortOrder: 1,
        },
        {
          key: 'actual',
          label: 'Actual behavior',
          type: 'textarea',
          isRequired: true,
          sortOrder: 2,
        },
        {
          key: 'severity',
          label: 'Severity',
          type: 'select',
          isRequired: true,
          sortOrder: 3,
          options: { choices: ['low', 'medium', 'high', 'critical'] },
        },
      ]
      for (const f of defaultFields) {
        await TemplateField.create({
          reportTemplateId: template.id,
          key: f.key,
          label: f.label,
          type: f.type,
          isRequired: f.isRequired,
          options: (f as any).options ?? null,
          sortOrder: f.sortOrder,
        })
      }
      console.log(
        `Created default template "${template.name}" with ${defaultFields.length} fields for ${slug}`
      )
    } else {
      console.log(`Demo project already has a template (id ${existingTemplate.id})`)
    }
  }
}
