import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import Project from '#models/project'
import ApiKey from '#models/api_key'
import ReportTemplate from '#models/report_template'
import TemplateField from '#models/template_field'
import Report from '#models/report'

test.group('Widget | embeddable (browser)', (group) => {
  group.setup(() => testUtils.db().truncate())

  test('mounts on a page with cross-origin assets and submits a report', async ({
    visit,
    assert,
  }) => {
    const user = await User.create({
      email: 'widget-browser@example.com',
      password: 'password123',
      fullName: 'WidgetBrowser',
      role: 'admin',
    })
    const project = await Project.create({
      name: 'Widget Browser Project',
      slug: 'widget-browser',
      ownerId: user.id,
    })
    const { rawKey } = await ApiKey.generate(project.id, 'widget-browser')

    // No allowed_origins configured → origin check allows all (dev ease), which
    // also keeps this test independent of the dynamic test-server port.
    const tmpl = await ReportTemplate.create({
      projectId: project.id,
      name: 'Widget Tmpl',
      isDefault: true,
    })
    await TemplateField.create({
      reportTemplateId: tmpl.id,
      key: 'description',
      label: 'Description',
      type: 'textarea',
      isRequired: true,
      sortOrder: 0,
    })

    const page = await visit(`/widget-fixture.html?key=${rawKey}&shadow=open`)

    let submitStatus: number | null = null
    page.on('response', (res) => {
      if (res.url().includes('/api/public/reports')) {
        submitStatus = res.status()
      }
    })

    // No uncaught errors while loading a page full of cross-origin assets.
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    await page.waitForTimeout(400)
    assert.isFalse(errors.length > 0, `page errors: ${errors.join(', ')}`)

    // Open the panel and submit a report.
    await page.click('#trackboard-widget .tb-fab')
    // The dynamic form (driven by the runtime config) must have rendered.
    await page.waitForSelector('#tb-description', { timeout: 10000 })
    await page.fill('#tb-title', 'Broken checkout button')
    await page.fill('#tb-email', 'reporter@example.com')
    await page.fill('#tb-description', 'It does not respond to clicks')
    await page.click('#tb-submit-btn')

    await page.waitForSelector('#trackboard-widget .tb-success', { timeout: 10000 })
    assert.equal(submitStatus, 201)

    const reports = await Report.query()
    assert.isTrue(reports.length >= 1)
  })
})
