import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Project from '#models/project'
import ApiKey from '#models/api_key'
import AllowedOrigin from '#models/allowed_origin'

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
  }
}
