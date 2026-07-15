import { test } from '@japa/runner'
import User from '#models/user'
import Project from '#models/project'
import ApiKey from '#models/api_key'
import AllowedOrigin from '#models/allowed_origin'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Core Data Model', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  // Ensure DB is migrated before tests — migrations run via test setup hook in bootstrap?
  // We'll rely on existing sqlite file already migrated; truncate clears data.

  test('create project, generate API key, verify key hash', async ({ assert }) => {
    const user = await User.create({
      email: 'alice@example.com',
      password: 'password123',
      fullName: 'Alice',
      role: 'admin',
    })

    const project = await Project.create({
      name: 'My Project',
      slug: 'my-project',
      ownerId: user.id,
    })

    assert.equal(project.ownerId, user.id)
    assert.equal(project.slug, 'my-project')

    // Generate API key
    const { rawKey, record } = await ApiKey.generate(project.id, 'CI key')
    assert.isTrue(rawKey.startsWith('tb_'))
    assert.equal(record.projectId, project.id)
    assert.isTrue(record.revokedAt === null || record.revokedAt === undefined)

    // Verify hash: correct key verifies, wrong key fails
    const verifyOk = await ApiKey.verify(rawKey, record.keyHash)
    assert.isTrue(verifyOk)

    const verifyBad = await ApiKey.verify('tb_badkey', record.keyHash)
    assert.isFalse(verifyBad)

    // findProjectByKey returns project for valid key
    const foundProject = await ApiKey.findProjectByKey(rawKey)
    assert.isNotNull(foundProject)
    assert.equal(foundProject!.id, project.id)

    const notFound = await ApiKey.findProjectByKey('tb_invalid')
    assert.isNull(notFound)

    // Revoked key should not be found
    const { DateTime } = await import('luxon')
    record.revokedAt = DateTime.now() as any
    await record.save()
    const afterRevoke = await ApiKey.findProjectByKey(rawKey)
    assert.isNull(afterRevoke)
  })

  test('origin allowlist enforcement', async ({ assert }) => {
    const user = await User.create({
      email: 'bob@example.com',
      password: 'password123',
      fullName: 'Bob',
      role: 'member',
    })

    const project = await Project.create({
      name: 'Origin Test',
      slug: 'origin-test',
      ownerId: user.id,
    })

    await AllowedOrigin.create({ projectId: project.id, origin: 'https://example.com' })
    await AllowedOrigin.create({ projectId: project.id, origin: 'https://app.example.com' })
    await AllowedOrigin.create({ projectId: project.id, origin: 'https://*.wildcard.com' })

    // Exact matches
    assert.isTrue(await AllowedOrigin.isAllowed(project.id, 'https://example.com'))
    assert.isTrue(await AllowedOrigin.isAllowed(project.id, 'https://example.com/'))
    assert.isTrue(await AllowedOrigin.isAllowed(project.id, 'https://example.com/some/page?x=1'))
    // Referer header with path
    assert.isTrue(await AllowedOrigin.isAllowed(project.id, 'https://app.example.com/dashboard'))
    assert.isFalse(await AllowedOrigin.isAllowed(project.id, 'https://evil.com'))
    assert.isFalse(await AllowedOrigin.isAllowed(project.id, null))
    assert.isFalse(await AllowedOrigin.isAllowed(project.id, ''))

    // Wildcard
    assert.isTrue(await AllowedOrigin.isAllowed(project.id, 'https://foo.wildcard.com'))
    assert.isTrue(await AllowedOrigin.isAllowed(project.id, 'https://bar.wildcard.com/page'))
    assert.isFalse(await AllowedOrigin.isAllowed(project.id, 'https://wildcard.com'))
    assert.isFalse(await AllowedOrigin.isAllowed(project.id, 'https://evilwildcard.com'))

    // Project with no origins → deny all
    const emptyProject = await Project.create({
      name: 'Empty',
      slug: 'empty-project',
      ownerId: user.id,
    })
    assert.isFalse(await AllowedOrigin.isAllowed(emptyProject.id, 'https://example.com'))

    // Case-insensitive and trailing slash normalization
    assert.isTrue(await AllowedOrigin.isAllowed(project.id, 'https://EXAMPLE.com'))
    assert.isTrue(await AllowedOrigin.isAllowed(project.id, 'https://example.com/'))
  })

  test('project relationships', async ({ assert }) => {
    const user = await User.create({
      email: 'carol@example.com',
      password: 'password123',
      fullName: 'Carol',
      role: 'member',
    })

    const project = await Project.create({
      name: 'Rel Test',
      slug: 'rel-test',
      ownerId: user.id,
    })

    await AllowedOrigin.create({ projectId: project.id, origin: 'https://a.com' })
    await AllowedOrigin.create({ projectId: project.id, origin: 'https://b.com' })
    await ApiKey.generate(project.id, 'key 1')
    await ApiKey.generate(project.id, 'key 2')

    const origins = await AllowedOrigin.query().where('projectId', project.id)
    const keys = await ApiKey.query().where('projectId', project.id)
    const owner = await User.findOrFail(project.ownerId)
    const userProjects = await Project.query().where('ownerId', user.id)

    assert.lengthOf(origins, 2)
    assert.lengthOf(keys, 2)
    assert.equal(owner.id, user.id)
    assert.lengthOf(userProjects, 1)

    // Verify relation preload works
    await project.load('allowedOrigins')
    assert.lengthOf(project.allowedOrigins, 2)
    await project.load('apiKeys')
    assert.lengthOf(project.apiKeys, 2)
    await project.load('owner')
    assert.equal(project.owner.id, user.id)
  })
})
