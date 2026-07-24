/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

// Public widget template endpoint (no auth, key via query)
router
  .get('/api/public/widget/templates', [
    () => import('#controllers/widget_templates_controller'),
    'show',
  ])
  .as('api.public.widget.templates')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())

// Admin template management (requires session auth) — JSON API
router
  .group(() => {
    router
      .get('/api/projects/:id/templates', [
        () => import('#controllers/report_templates_controller'),
        'index',
      ])
      .as('api.projects.templates.index')
    router
      .post('/api/projects/:id/templates', [
        () => import('#controllers/report_templates_controller'),
        'store',
      ])
      .as('api.projects.templates.store')
    router
      .put('/api/templates/:id', [
        () => import('#controllers/report_templates_controller'),
        'update',
      ])
      .as('api.templates.update')
    router
      .delete('/api/templates/:id', [
        () => import('#controllers/report_templates_controller'),
        'destroy',
      ])
      .as('api.templates.destroy')
  })
  .use(middleware.auth())

// Admin template UI (Inertia pages)
router
  .group(() => {
    router
      .get('/projects/:projectId/templates', [
        () => import('#controllers/template_pages_controller'),
        'index',
      ])
      .as('templates.index')
    router
      .get('/projects/:projectId/templates/create', [
        () => import('#controllers/template_pages_controller'),
        'create',
      ])
      .as('templates.create')
    router
      .get('/projects/:projectId/create', [
        () => import('#controllers/template_pages_controller'),
        'create',
      ])
      .as('templates.create.alias')
    router
      .post('/projects/:projectId/templates', [
        () => import('#controllers/template_pages_controller'),
        'store',
      ])
      .as('templates.store')
    router
      .get('/templates/:id/edit', [() => import('#controllers/template_pages_controller'), 'edit'])
      .as('templates.edit')
    router
      .put('/templates/:id', [() => import('#controllers/template_pages_controller'), 'update'])
      .as('templates.update')
    router
      .delete('/templates/:id', [() => import('#controllers/template_pages_controller'), 'destroy'])
      .as('templates.destroy')
  })
  .use(middleware.auth())

// Reports — public ingest + proxy + presign
router
  .post('/api/public/reports', [() => import('#controllers/public_reports_controller'), 'store'])
  .use([middleware.rateLimit(), middleware.originCheck()])
router.get('/api/public/reports/presign', [
  () => import('#controllers/public_reports_controller'),
  'presign',
])
router.get('/api/public/proxy-image', [
  () => import('#controllers/public_reports_controller'),
  'proxyImage',
])

// Reports — admin (requires session auth)
router
  .group(() => {
    router
      .get('/api/reports', [() => import('#controllers/admin_reports_controller'), 'index'])
      .as('api.reports.index')
    router
      .get('/api/reports/:id', [() => import('#controllers/admin_reports_controller'), 'show'])
      .as('api.reports.show')
    router
      .patch('/api/reports/:id', [() => import('#controllers/admin_reports_controller'), 'update'])
      .as('api.reports.update')
  })
  .use(middleware.auth())

// Reports — UI (Inertia)
router
  .group(() => {
    router
      .get('/reports', [() => import('#controllers/report_pages_controller'), 'index'])
      .as('reports.index')
    router
      .get('/reports/:id', [() => import('#controllers/report_pages_controller'), 'show'])
      .as('reports.show')
    router
      .patch('/reports/:id', [() => import('#controllers/report_pages_controller'), 'update'])
      .as('reports.update')
  })
  .use(middleware.auth())
