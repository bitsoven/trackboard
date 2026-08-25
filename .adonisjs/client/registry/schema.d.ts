/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/overview_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/overview_controller').default['index']>>>
    }
  }
  'api.public.widget.templates': {
    methods: ["GET","HEAD"]
    pattern: '/api/public/widget/templates'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/widget_templates_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/widget_templates_controller').default['show']>>>
    }
  }
  'api.public.widget.config': {
    methods: ["GET","HEAD"]
    pattern: '/api/public/widget/config'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/widget_config_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/widget_config_controller').default['show']>>>
    }
  }
  'new_account.create': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
    }
  }
  'new_account.store': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
    }
  }
  'session.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
    }
  }
  'api.projects.templates.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/projects/:id/templates'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/report_templates_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/report_templates_controller').default['index']>>>
    }
  }
  'api.projects.templates.store': {
    methods: ["POST"]
    pattern: '/api/projects/:id/templates'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/template').createTemplateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/template').createTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/report_templates_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/report_templates_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.templates.update': {
    methods: ["PUT"]
    pattern: '/api/templates/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/template').updateTemplateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/template').updateTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/report_templates_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/report_templates_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.templates.destroy': {
    methods: ["DELETE"]
    pattern: '/api/templates/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/report_templates_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/report_templates_controller').default['destroy']>>>
    }
  }
  'templates.index': {
    methods: ["GET","HEAD"]
    pattern: '/projects/:projectId/templates'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['index']>>>
    }
  }
  'templates.create': {
    methods: ["GET","HEAD"]
    pattern: '/projects/:projectId/templates/create'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['create']>>>
    }
  }
  'templates.create.alias': {
    methods: ["GET","HEAD"]
    pattern: '/projects/:projectId/create'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['create']>>>
    }
  }
  'templates.store': {
    methods: ["POST"]
    pattern: '/projects/:projectId/templates'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['store']>>>
    }
  }
  'templates.edit': {
    methods: ["GET","HEAD"]
    pattern: '/templates/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['edit']>>>
    }
  }
  'templates.update': {
    methods: ["PUT"]
    pattern: '/templates/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['update']>>>
    }
  }
  'templates.destroy': {
    methods: ["DELETE"]
    pattern: '/templates/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/template_pages_controller').default['destroy']>>>
    }
  }
  'public_reports.store': {
    methods: ["POST"]
    pattern: '/api/public/reports'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/public_reports_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/public_reports_controller').default['store']>>>
    }
  }
  'public_reports.presign': {
    methods: ["GET","HEAD"]
    pattern: '/api/public/reports/presign'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/public_reports_controller').default['presign']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/public_reports_controller').default['presign']>>>
    }
  }
  'public_reports.proxy_image': {
    methods: ["GET","HEAD"]
    pattern: '/api/public/proxy-image'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/public_reports_controller').default['proxyImage']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/public_reports_controller').default['proxyImage']>>>
    }
  }
  'public_reports.verify': {
    methods: ["GET","HEAD"]
    pattern: '/api/public/reports/verify/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/public_reports_controller').default['verify']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/public_reports_controller').default['verify']>>>
    }
  }
  'api.reports.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/reports'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_reports_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_reports_controller').default['index']>>>
    }
  }
  'api.reports.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/reports/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_reports_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_reports_controller').default['show']>>>
    }
  }
  'api.reports.update': {
    methods: ["PATCH"]
    pattern: '/api/reports/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_reports_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_reports_controller').default['update']>>>
    }
  }
  'api.reports.messages.store': {
    methods: ["POST"]
    pattern: '/api/reports/:id/messages'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/message').sendMessageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/message').sendMessageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/messages_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/messages_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.webhooks.inbound-email': {
    methods: ["POST"]
    pattern: '/api/webhooks/inbound-email'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/webhook_controller').default['inboundEmail']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/webhook_controller').default['inboundEmail']>>>
    }
  }
  'portal.show': {
    methods: ["GET","HEAD"]
    pattern: '/portal/:reply_to_token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { reply_to_token: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/portal_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/portal_controller').default['show']>>>
    }
  }
  'portal.messages.store': {
    methods: ["POST"]
    pattern: '/portal/:reply_to_token/messages'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/message').portalMessageValidator)>>
      paramsTuple: [ParamValue]
      params: { reply_to_token: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/message').portalMessageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/portal_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/portal_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inbox.index': {
    methods: ["GET","HEAD"]
    pattern: '/inbox'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inbox_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inbox_controller').default['index']>>>
    }
  }
  'reports.index': {
    methods: ["GET","HEAD"]
    pattern: '/reports'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/report_pages_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/report_pages_controller').default['index']>>>
    }
  }
  'reports.show': {
    methods: ["GET","HEAD"]
    pattern: '/reports/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/report_pages_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/report_pages_controller').default['show']>>>
    }
  }
  'reports.update': {
    methods: ["PATCH"]
    pattern: '/reports/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/report_pages_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/report_pages_controller').default['update']>>>
    }
  }
  'integrations.index': {
    methods: ["GET","HEAD"]
    pattern: '/projects/:projectId/integrations'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/integration_pages_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/integration_pages_controller').default['index']>>>
    }
  }
  'integrations.store_api_key': {
    methods: ["POST"]
    pattern: '/projects/:projectId/integrations/api-keys'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api_key').createApiKeyValidator)>>
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/api_key').createApiKeyValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/integrations_controller').default['storeApiKey']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/integrations_controller').default['storeApiKey']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'integrations.revoke_api_key': {
    methods: ["POST"]
    pattern: '/projects/:projectId/integrations/api-keys/:id/revoke'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { projectId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/integrations_controller').default['revokeApiKey']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/integrations_controller').default['revokeApiKey']>>>
    }
  }
  'integrations.store_webhook': {
    methods: ["POST"]
    pattern: '/projects/:projectId/integrations/webhooks'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/webhook').createWebhookValidator)>>
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/webhook').createWebhookValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/integrations_controller').default['storeWebhook']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/integrations_controller').default['storeWebhook']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'integrations.destroy_webhook': {
    methods: ["POST"]
    pattern: '/projects/:projectId/integrations/webhooks/:id/delete'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { projectId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/integrations_controller').default['destroyWebhook']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/integrations_controller').default['destroyWebhook']>>>
    }
  }
}
