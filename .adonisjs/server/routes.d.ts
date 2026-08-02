import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'api.public.widget.templates': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'api.projects.templates.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.projects.templates.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.templates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.templates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templates.index': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.create': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.create.alias': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.store': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.reports.index': { paramsTuple?: []; params?: {} }
    'api.reports.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.reports.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.reports.messages.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.webhooks.inbound-email': { paramsTuple?: []; params?: {} }
    'portal.show': { paramsTuple: [ParamValue]; params: {'reply_to_token': ParamValue} }
    'portal.messages.store': { paramsTuple: [ParamValue]; params: {'reply_to_token': ParamValue} }
    'reports.index': { paramsTuple?: []; params?: {} }
    'reports.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'api.public.widget.templates': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'api.projects.templates.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templates.index': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.create': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.create.alias': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.reports.index': { paramsTuple?: []; params?: {} }
    'api.reports.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'portal.show': { paramsTuple: [ParamValue]; params: {'reply_to_token': ParamValue} }
    'reports.index': { paramsTuple?: []; params?: {} }
    'reports.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'api.public.widget.templates': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'api.projects.templates.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templates.index': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.create': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.create.alias': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'templates.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.reports.index': { paramsTuple?: []; params?: {} }
    'api.reports.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'portal.show': { paramsTuple: [ParamValue]; params: {'reply_to_token': ParamValue} }
    'reports.index': { paramsTuple?: []; params?: {} }
    'reports.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'api.projects.templates.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templates.store': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'api.reports.messages.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.webhooks.inbound-email': { paramsTuple?: []; params?: {} }
    'portal.messages.store': { paramsTuple: [ParamValue]; params: {'reply_to_token': ParamValue} }
  }
  PUT: {
    'api.templates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'api.templates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'api.reports.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}