import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import TeamMember from '#models/team_member'
import ProjectService from '#services/project_service'
import TeamService from '#services/team_service'

test.group('Team', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  async function makeUser(email: string, role = 'member') {
    return User.create({
      email,
      password: 'password123',
      fullName: 'User',
      role,
    })
  }

  test('owner can invite a member and only owners/admins can invite', async ({
    client,
    assert,
  }) => {
    const owner = await makeUser('owner@example.com', 'member')
    const project = await ProjectService.create({ name: 'Team Project', ownerId: owner.id })

    // Owner invites successfully
    const res = await client
      .post(`/projects/${project.id}/team/invite`)
      .loginAs(owner)
      .withCsrfToken()
      .form({ email: 'invitee@example.com', role: 'member' })
    res.assertStatus(200)

    const invited = await TeamMember.query()
      .where('projectId', project.id)
      .where('email', 'invitee@example.com')
      .firstOrFail()
    assert.equal(invited.role, 'member')

    // A non-member cannot invite
    const outsider = await makeUser('outsider@example.com', 'member')
    const forbidden = await client
      .post(`/projects/${project.id}/team/invite`)
      .loginAs(outsider)
      .withCsrfToken()
      .form({ email: 'another@example.com', role: 'member' })
    forbidden.assertStatus(403)
  })

  test('an unregistered invited user can accept the invite and create an account', async ({
    client,
    assert,
  }) => {
    const owner = await makeUser('owner2@example.com', 'member')
    const project = await ProjectService.create({ name: 'Invite Project', ownerId: owner.id })

    await TeamService.invite({
      projectId: project.id,
      email: 'newperson@example.com',
      role: 'member',
      actorId: owner.id,
      actorRole: owner.role,
    })
    const member = await TeamMember.query()
      .where('projectId', project.id)
      .where('email', 'newperson@example.com')
      .firstOrFail()
    assert.isNull(member.acceptedAt)

    // Landing page renders with the invited email prefilled
    const landing = await client.get(`/accept-invite?token=${member.inviteToken}`)
    landing.assertStatus(200)
    landing.assertTextIncludes('newperson@example.com')

    // The invitee signs up (and is auto-accepted)
    const signup = await client.post('/signup').withCsrfToken().form({
      fullName: 'New Person',
      email: 'newperson@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
      inviteToken: member.inviteToken,
    })
    signup.assertStatus(200)

    const accepted = await TeamMember.findOrFail(member.id)
    assert.isNotNull(accepted.acceptedAt)
    assert.isTrue(await TeamService.canAccess(project.id, accepted.userId!, 'member'))
  })

  test('a removed member immediately loses access to the project', async ({ client, assert }) => {
    const owner = await makeUser('owner3@example.com', 'member')
    const project = await ProjectService.create({ name: 'Remove Project', ownerId: owner.id })
    const memberUser = await makeUser('member3@example.com', 'member')

    await TeamService.invite({
      projectId: project.id,
      email: memberUser.email,
      role: 'member',
      actorId: owner.id,
      actorRole: owner.role,
    })
    await TeamService.acceptPendingForUser(memberUser.id)

    assert.isTrue(await TeamService.canAccess(project.id, memberUser.id, 'member'))

    const dbMember = await TeamMember.query()
      .where('projectId', project.id)
      .where('email', memberUser.email)
      .first()
    assert.equal(dbMember?.userId, memberUser.id)
    assert.isNotNull(dbMember?.acceptedAt)

    // Member can reach the integrations page while a member (not the not_found view)
    const before = await client.get(`/projects/${project.id}/integrations`).loginAs(memberUser)
    before.assertStatus(200)
    assert.notInclude(before.text(), 'not_found')

    // Owner removes the member
    const member = await TeamMember.query()
      .where('projectId', project.id)
      .where('email', memberUser.email)
      .firstOrFail()
    await TeamService.removeMember(member.id, owner.id, owner.role)

    assert.isFalse(await TeamService.canAccess(project.id, memberUser.id, 'member'))

    // Member can no longer reach the integrations page (renders the not_found view)
    const after = await client.get(`/projects/${project.id}/integrations`).loginAs(memberUser)
    after.assertStatus(200)
    assert.include(after.text(), 'not_found')
  })
})
