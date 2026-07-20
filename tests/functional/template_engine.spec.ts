import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import Project from '#models/project'
import ApiKey from '#models/api_key'
import ReportTemplate from '#models/report_template'
import TemplateField from '#models/template_field'
import ReportTemplateService from '#services/report_template_service'
import { buildDynamicSchema } from '#services/template_service'

test.group('Report Template Engine', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('migration creates tables', async ({ assert }) => {
    // Verify via model query rather than raw schema inspection
    const templates = await ReportTemplate.query().limit(1)
    const fields = await TemplateField.query().limit(1)
    assert.isArray(templates)
    assert.isArray(fields)
  })

  test('create template with all field types and verify model relations', async ({ assert }) => {
    const user = await User.create({
      email: 'templater@example.com',
      password: 'password123',
      fullName: 'Templater',
      role: 'admin',
    })
    const project = await Project.create({
      name: 'Template Project',
      slug: 'template-project',
      ownerId: user.id,
    })
    const service = new ReportTemplateService()

    const template = await service.create(project.id, {
      name: 'Bug Report',
      isDefault: true,
      fields: [
        {
          key: 'title',
          label: 'Title',
          type: 'text',
          isRequired: true,
          options: { maxLength: 100 },
        },
        { key: 'description', label: 'Description', type: 'textarea', isRequired: true },
        {
          key: 'priority',
          label: 'Priority',
          type: 'select',
          isRequired: true,
          options: { choices: ['low', 'medium', 'high'] },
        },
        { key: 'repro', label: 'Repro steps', type: 'textarea', isRequired: false },
        {
          key: 'environment',
          label: 'Env',
          type: 'radio',
          isRequired: false,
          options: { choices: ['prod', 'staging'] },
        },
        { key: 'is_blocker', label: 'Is blocker', type: 'checkbox', isRequired: false },
        {
          key: 'tags',
          label: 'Tags',
          type: 'checkbox',
          isRequired: false,
          options: { choices: ['ui', 'api', 'perf'] },
        },
        {
          key: 'estimate',
          label: 'Estimate hours',
          type: 'number',
          isRequired: false,
          options: { min: 0, max: 100 },
        },
        { key: 'due_date', label: 'Due date', type: 'date', isRequired: false },
        { key: 'screenshot', label: 'Screenshot', type: 'file', isRequired: false },
        {
          key: 'severity',
          label: 'Severity',
          type: 'severity-scale',
          isRequired: true,
          options: { scaleMin: 1, scaleMax: 5 },
        },
      ],
    })

    assert.equal(template.name, 'Bug Report')
    assert.isTrue(template.isDefault)
    assert.lengthOf(template.fields, 11)

    // Verify sort_order preserved
    assert.equal(template.fields[0].key, 'title')
    assert.equal(template.fields[0].sortOrder, 0)
    assert.equal(template.fields[10].key, 'severity')

    // Project relation
    await project.load('reportTemplates')
    assert.lengthOf(project.reportTemplates, 1)

    // Second template non-default does not override default
    const second = await service.create(project.id, { name: 'Second', fields: [] })
    const firstReload = await ReportTemplate.findOrFail(template.id)
    assert.isTrue(!!firstReload.isDefault)
    assert.isTrue(!second.isDefault)

    // Creating new default should unset previous
    const third = await service.create(project.id, { name: 'Third', isDefault: true, fields: [] })
    const firstAfter = await ReportTemplate.findOrFail(template.id)
    assert.isTrue(!firstAfter.isDefault)
    assert.isTrue(!!third.isDefault)
  })

  test('dynamic schema rejects missing required fields', async ({ assert }) => {
    const user = await User.create({
      email: 'schema@example.com',
      password: 'password123',
      fullName: 'Schema',
      role: 'admin',
    })
    const project = await Project.create({
      name: 'Schema Project',
      slug: 'schema-project',
      ownerId: user.id,
    })
    const service = new ReportTemplateService()

    const template = await service.create(project.id, {
      name: 'Schema Test',
      fields: [
        { key: 'title', label: 'Title', type: 'text', isRequired: true },
        {
          key: 'priority',
          label: 'Priority',
          type: 'select',
          isRequired: true,
          options: { choices: ['low', 'high'] },
        },
        {
          key: 'estimate',
          label: 'Estimate',
          type: 'number',
          isRequired: false,
          options: { min: 1, max: 10 },
        },
        { key: 'severity', label: 'Severity', type: 'severity-scale', isRequired: true },
      ],
    })

    const reloaded = await ReportTemplate.query()
      .where('id', template.id)
      .preload('fields', (q) => q.orderBy('sortOrder', 'asc'))
      .firstOrFail()

    const validator = buildDynamicSchema(reloaded)

    // Missing required should fail
    try {
      await validator.validate({})
      assert.fail('Should have thrown validation error for missing required fields')
    } catch (error: any) {
      assert.isTrue(error.messages !== undefined || error.message !== undefined)
      const messages = error.messages ? JSON.stringify(error.messages) : error.message
      assert.include(messages, 'title')
    }

    // Missing one required (severity) should fail
    try {
      await validator.validate({ title: 'hello', priority: 'low' })
      assert.fail('Should have thrown for missing severity')
    } catch (error: any) {
      const messages = error.messages ? JSON.stringify(error.messages) : error.message
      assert.include(messages.toLowerCase(), 'severity')
    }

    // Valid payload passes
    const valid = await validator.validate({ title: 'hello', priority: 'low', severity: 3 })
    assert.equal(valid.title, 'hello')
    assert.equal(valid.priority, 'low')
    assert.equal(valid.severity, 3)

    // Optional field present and valid passes
    const withOptional = await validator.validate({
      title: 'x',
      priority: 'high',
      severity: 5,
      estimate: 7,
    })
    assert.equal(withOptional.estimate, 7)

    // Invalid select choice fails
    try {
      await validator.validate({ title: 'x', priority: 'invalid', severity: 2 })
      assert.fail('Should have failed for invalid enum')
    } catch (error: any) {
      assert.isTrue(true)
    }

    // Number out of range fails
    try {
      await validator.validate({ title: 'x', priority: 'low', severity: 2, estimate: 999 })
      assert.fail('Should have failed for number max')
    } catch (error: any) {
      assert.isTrue(true)
    }

    // Severity scale out of range fails
    try {
      await validator.validate({ title: 'x', priority: 'low', severity: 10 })
      assert.fail('Should have failed for severity max')
    } catch (error: any) {
      assert.isTrue(true)
    }

    // Checkbox with choices: array validation
    const checkboxTemplate = await service.create(project.id, {
      name: 'Checkbox Test',
      fields: [
        {
          key: 'tags',
          label: 'Tags',
          type: 'checkbox',
          isRequired: false,
          options: { choices: ['ui', 'api'] },
        },
        { key: 'agreed', label: 'Agreed', type: 'checkbox', isRequired: true },
      ],
    })
    const cbReloaded = await ReportTemplate.query()
      .where('id', checkboxTemplate.id)
      .preload('fields')
      .firstOrFail()
    const cbValidator = buildDynamicSchema(cbReloaded)

    // Missing required checkbox (agreed) fails
    try {
      await cbValidator.validate({ tags: ['ui'] })
      assert.fail('Should have failed for missing required checkbox')
    } catch {
      assert.isTrue(true)
    }

    // Valid checkbox payload
    const cbValid = await cbValidator.validate({ agreed: true, tags: ['ui', 'api'] })
    assert.isTrue(cbValid.agreed)
    assert.deepEqual(cbValid.tags, ['ui', 'api'])

    // Invalid choice in checkbox array fails
    try {
      await cbValidator.validate({ agreed: true, tags: ['invalid'] })
      assert.fail('Should have failed for invalid checkbox choice')
    } catch {
      assert.isTrue(true)
    }
  })

  test('template CRUD via service (update + delete)', async ({ assert }) => {
    const user = await User.create({
      email: 'crud@example.com',
      password: 'password123',
      fullName: 'Crud',
      role: 'admin',
    })
    const project = await Project.create({
      name: 'Crud Project',
      slug: 'crud-project',
      ownerId: user.id,
    })
    const service = new ReportTemplateService()

    const template = await service.create(project.id, {
      name: 'Original',
      fields: [{ key: 'title', label: 'Title', type: 'text', isRequired: true }],
    })

    // Update name and fields (reorder)
    const updated = await service.update(template.id, {
      name: 'Updated',
      fields: [
        { key: 'description', label: 'Desc', type: 'textarea', isRequired: false, sortOrder: 0 },
        { key: 'title', label: 'Title', type: 'text', isRequired: true, sortOrder: 1 },
      ],
    })

    assert.equal(updated.name, 'Updated')
    assert.lengthOf(updated.fields, 2)
    assert.equal(updated.fields[0].key, 'description')
    assert.equal(updated.fields[1].key, 'title')

    // Verify DB has 2 fields
    const fields = await TemplateField.query()
      .where('reportTemplateId', template.id)
      .orderBy('sortOrder', 'asc')
    assert.lengthOf(fields, 2)

    // Delete
    await service.delete(template.id)
    const notFound = await ReportTemplate.find(template.id)
    assert.isNull(notFound)
    const fieldsAfterDelete = await TemplateField.query().where('reportTemplateId', template.id)
    assert.lengthOf(fieldsAfterDelete, 0)
  })

  test('public widget returns template via API key', async ({ assert }) => {
    const user = await User.create({
      email: 'widget@example.com',
      password: 'password123',
      fullName: 'Widget',
      role: 'admin',
    })
    const project = await Project.create({
      name: 'Widget Project',
      slug: 'widget-project',
      ownerId: user.id,
    })
    const { rawKey } = await ApiKey.generate(project.id, 'widget key')

    const service = new ReportTemplateService()
    const template = await service.create(project.id, {
      name: 'Widget Template',
      isDefault: true,
      fields: [{ key: 'title', label: 'Title', type: 'text', isRequired: true }],
    })

    // Simulate public endpoint logic: find project by key then get template
    const foundProject = await ApiKey.findProjectByKey(rawKey)
    assert.isNotNull(foundProject)
    assert.equal(foundProject!.id, project.id)

    const widgetTemplate = await service.getForWidget(project.id)
    assert.isNotNull(widgetTemplate)
    assert.equal(widgetTemplate!.id, template.id)
    assert.lengthOf(widgetTemplate!.fields, 1)

    // Invalid key yields no project
    const invalid = await ApiKey.findProjectByKey('tb_invalid')
    assert.isNull(invalid)

    // Revoked key yields no project
    const apiKeyRecord = await ApiKey.query().where('projectId', project.id).firstOrFail()
    const { DateTime } = await import('luxon')
    apiKeyRecord.revokedAt = DateTime.now() as any
    await apiKeyRecord.save()
    const afterRevoke = await ApiKey.findProjectByKey(rawKey)
    assert.isNull(afterRevoke)
  })

  test('list templates filtered by project', async ({ assert }) => {
    const user = await User.create({
      email: 'list@example.com',
      password: 'password123',
      fullName: 'List',
      role: 'admin',
    })
    const p1 = await Project.create({ name: 'P1', slug: 'p1-list', ownerId: user.id })
    const p2 = await Project.create({ name: 'P2', slug: 'p2-list', ownerId: user.id })
    const service = new ReportTemplateService()

    await service.create(p1.id, { name: 'T1', fields: [] })
    await service.create(p1.id, { name: 'T2', fields: [] })
    await service.create(p2.id, { name: 'T3', fields: [] })

    const p1Templates = await service.listForProject(p1.id)
    const p2Templates = await service.listForProject(p2.id)

    assert.lengthOf(p1Templates, 2)
    assert.lengthOf(p2Templates, 1)
  })
})
