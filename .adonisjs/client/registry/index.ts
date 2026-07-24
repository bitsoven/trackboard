/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'api.public.widget.templates': {
    methods: ["GET","HEAD"],
    pattern: '/api/public/widget/templates',
    tokens: [{"old":"/api/public/widget/templates","type":0,"val":"api","end":""},{"old":"/api/public/widget/templates","type":0,"val":"public","end":""},{"old":"/api/public/widget/templates","type":0,"val":"widget","end":""},{"old":"/api/public/widget/templates","type":0,"val":"templates","end":""}],
    types: placeholder as Registry['api.public.widget.templates']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'api.projects.templates.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/projects/:id/templates',
    tokens: [{"old":"/api/projects/:id/templates","type":0,"val":"api","end":""},{"old":"/api/projects/:id/templates","type":0,"val":"projects","end":""},{"old":"/api/projects/:id/templates","type":1,"val":"id","end":""},{"old":"/api/projects/:id/templates","type":0,"val":"templates","end":""}],
    types: placeholder as Registry['api.projects.templates.index']['types'],
  },
  'api.projects.templates.store': {
    methods: ["POST"],
    pattern: '/api/projects/:id/templates',
    tokens: [{"old":"/api/projects/:id/templates","type":0,"val":"api","end":""},{"old":"/api/projects/:id/templates","type":0,"val":"projects","end":""},{"old":"/api/projects/:id/templates","type":1,"val":"id","end":""},{"old":"/api/projects/:id/templates","type":0,"val":"templates","end":""}],
    types: placeholder as Registry['api.projects.templates.store']['types'],
  },
  'api.templates.update': {
    methods: ["PUT"],
    pattern: '/api/templates/:id',
    tokens: [{"old":"/api/templates/:id","type":0,"val":"api","end":""},{"old":"/api/templates/:id","type":0,"val":"templates","end":""},{"old":"/api/templates/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['api.templates.update']['types'],
  },
  'api.templates.destroy': {
    methods: ["DELETE"],
    pattern: '/api/templates/:id',
    tokens: [{"old":"/api/templates/:id","type":0,"val":"api","end":""},{"old":"/api/templates/:id","type":0,"val":"templates","end":""},{"old":"/api/templates/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['api.templates.destroy']['types'],
  },
  'templates.index': {
    methods: ["GET","HEAD"],
    pattern: '/projects/:projectId/templates',
    tokens: [{"old":"/projects/:projectId/templates","type":0,"val":"projects","end":""},{"old":"/projects/:projectId/templates","type":1,"val":"projectId","end":""},{"old":"/projects/:projectId/templates","type":0,"val":"templates","end":""}],
    types: placeholder as Registry['templates.index']['types'],
  },
  'templates.create': {
    methods: ["GET","HEAD"],
    pattern: '/projects/:projectId/templates/create',
    tokens: [{"old":"/projects/:projectId/templates/create","type":0,"val":"projects","end":""},{"old":"/projects/:projectId/templates/create","type":1,"val":"projectId","end":""},{"old":"/projects/:projectId/templates/create","type":0,"val":"templates","end":""},{"old":"/projects/:projectId/templates/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['templates.create']['types'],
  },
  'templates.create.alias': {
    methods: ["GET","HEAD"],
    pattern: '/projects/:projectId/create',
    tokens: [{"old":"/projects/:projectId/create","type":0,"val":"projects","end":""},{"old":"/projects/:projectId/create","type":1,"val":"projectId","end":""},{"old":"/projects/:projectId/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['templates.create.alias']['types'],
  },
  'templates.store': {
    methods: ["POST"],
    pattern: '/projects/:projectId/templates',
    tokens: [{"old":"/projects/:projectId/templates","type":0,"val":"projects","end":""},{"old":"/projects/:projectId/templates","type":1,"val":"projectId","end":""},{"old":"/projects/:projectId/templates","type":0,"val":"templates","end":""}],
    types: placeholder as Registry['templates.store']['types'],
  },
  'templates.edit': {
    methods: ["GET","HEAD"],
    pattern: '/templates/:id/edit',
    tokens: [{"old":"/templates/:id/edit","type":0,"val":"templates","end":""},{"old":"/templates/:id/edit","type":1,"val":"id","end":""},{"old":"/templates/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['templates.edit']['types'],
  },
  'templates.update': {
    methods: ["PUT"],
    pattern: '/templates/:id',
    tokens: [{"old":"/templates/:id","type":0,"val":"templates","end":""},{"old":"/templates/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['templates.update']['types'],
  },
  'templates.destroy': {
    methods: ["DELETE"],
    pattern: '/templates/:id',
    tokens: [{"old":"/templates/:id","type":0,"val":"templates","end":""},{"old":"/templates/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['templates.destroy']['types'],
  },
  'public_reports.store': {
    methods: ["POST"],
    pattern: '/api/public/reports',
    tokens: [{"old":"/api/public/reports","type":0,"val":"api","end":""},{"old":"/api/public/reports","type":0,"val":"public","end":""},{"old":"/api/public/reports","type":0,"val":"reports","end":""}],
    types: placeholder as Registry['public_reports.store']['types'],
  },
  'public_reports.presign': {
    methods: ["GET","HEAD"],
    pattern: '/api/public/reports/presign',
    tokens: [{"old":"/api/public/reports/presign","type":0,"val":"api","end":""},{"old":"/api/public/reports/presign","type":0,"val":"public","end":""},{"old":"/api/public/reports/presign","type":0,"val":"reports","end":""},{"old":"/api/public/reports/presign","type":0,"val":"presign","end":""}],
    types: placeholder as Registry['public_reports.presign']['types'],
  },
  'public_reports.proxy_image': {
    methods: ["GET","HEAD"],
    pattern: '/api/public/proxy-image',
    tokens: [{"old":"/api/public/proxy-image","type":0,"val":"api","end":""},{"old":"/api/public/proxy-image","type":0,"val":"public","end":""},{"old":"/api/public/proxy-image","type":0,"val":"proxy-image","end":""}],
    types: placeholder as Registry['public_reports.proxy_image']['types'],
  },
  'api.reports.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/reports',
    tokens: [{"old":"/api/reports","type":0,"val":"api","end":""},{"old":"/api/reports","type":0,"val":"reports","end":""}],
    types: placeholder as Registry['api.reports.index']['types'],
  },
  'api.reports.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/reports/:id',
    tokens: [{"old":"/api/reports/:id","type":0,"val":"api","end":""},{"old":"/api/reports/:id","type":0,"val":"reports","end":""},{"old":"/api/reports/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['api.reports.show']['types'],
  },
  'api.reports.update': {
    methods: ["PATCH"],
    pattern: '/api/reports/:id',
    tokens: [{"old":"/api/reports/:id","type":0,"val":"api","end":""},{"old":"/api/reports/:id","type":0,"val":"reports","end":""},{"old":"/api/reports/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['api.reports.update']['types'],
  },
  'reports.index': {
    methods: ["GET","HEAD"],
    pattern: '/reports',
    tokens: [{"old":"/reports","type":0,"val":"reports","end":""}],
    types: placeholder as Registry['reports.index']['types'],
  },
  'reports.show': {
    methods: ["GET","HEAD"],
    pattern: '/reports/:id',
    tokens: [{"old":"/reports/:id","type":0,"val":"reports","end":""},{"old":"/reports/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reports.show']['types'],
  },
  'reports.update': {
    methods: ["PATCH"],
    pattern: '/reports/:id',
    tokens: [{"old":"/reports/:id","type":0,"val":"reports","end":""},{"old":"/reports/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reports.update']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
