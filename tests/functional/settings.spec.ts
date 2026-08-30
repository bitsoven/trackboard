import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import Project from '#models/project'
import ProjectService from '#services/project_service'

test.group('Settings', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  async function makeUser(email = 'owner@example.com', role = 'member') {
    return User.create({
      email,
      password: 'password123',
      fullName: 'Owner',
      role,
    })
  }

  test('updating email to an already-taken address is rejected', async ({ client, assert }) => {
    const a = await makeUser('a@example.com')
    await makeUser('b@example.com')

    await client.patch('/settings').loginAs(a).withCsrfToken().form({
      fullName: 'A',
      email: 'b@example.com',
      currentPassword: 'password123',
    })

    const reloaded = await User.findOrFail(a.id)
    assert.equal(reloaded.email, 'a@example.com')
  })

  test('changing password requires the correct current password', async ({ client, assert }) => {
    const a = await makeUser('a@example.com')

    await client.patch('/settings').loginAs(a).withCsrfToken().form({
      fullName: 'A',
      email: 'a@example.com',
      password: 'newpassword1',
      passwordConfirmation: 'newpassword1',
      currentPassword: 'wrong-pass',
    })

    const afterBad = await User.findOrFail(a.id)
    assert.isFalse(await hash.verify(afterBad.password, 'newpassword1'))

    await client.patch('/settings').loginAs(a).withCsrfToken().form({
      fullName: 'A',
      email: 'a@example.com',
      password: 'newpassword1',
      passwordConfirmation: 'newpassword1',
      currentPassword: 'password123',
    })

    const afterGood = await User.findOrFail(a.id)
    assert.isTrue(await hash.verify(afterGood.password, 'newpassword1'))
  })

  test('a project owner can rename and re-slug a project', async ({ client, assert }) => {
    const owner = await makeUser('owner@example.com')
    const project = await ProjectService.create({ name: 'Alpha', ownerId: owner.id })

    const res = await client
      .patch(`/projects/${project.id}/settings`)
      .loginAs(owner)
      .withCsrfToken()
      .form({ name: 'Beta', slug: 'beta-rev' })
    res.assertStatus(200)

    const reloaded = await Project.findOrFail(project.id)
    assert.equal(reloaded.name, 'Beta')
    assert.equal(reloaded.slug, 'beta-rev')
  })

  test('a non-owner cannot update or delete a project', async ({ client, assert }) => {
    const owner = await makeUser('owner@example.com')
    const stranger = await makeUser('stranger@example.com')
    const project = await ProjectService.create({ name: 'Alpha', ownerId: owner.id })

    await client
      .patch(`/projects/${project.id}/settings`)
      .loginAs(stranger)
      .withCsrfToken()
      .form({ name: 'Hacked', slug: 'hacked' })

    const afterUpdate = await Project.findOrFail(project.id)
    assert.equal(afterUpdate.name, 'Alpha')

    await client.delete(`/projects/${project.id}/settings`).loginAs(stranger).withCsrfToken()

    assert.isNotNull(await Project.find(project.id))
  })

  test('a project owner can delete their project', async ({ client, assert }) => {
    const owner = await makeUser('owner@example.com')
    const project = await ProjectService.create({ name: 'Alpha', ownerId: owner.id })

    const res = await client
      .delete(`/projects/${project.id}/settings`)
      .loginAs(owner)
      .withCsrfToken()
    res.assertStatus(200)

    assert.isNull(await Project.find(project.id))
  })
})
