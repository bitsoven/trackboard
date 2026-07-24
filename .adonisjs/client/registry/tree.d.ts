/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  api: {
    public: {
      widget: {
        templates: typeof routes['api.public.widget.templates']
      }
    }
    projects: {
      templates: {
        index: typeof routes['api.projects.templates.index']
        store: typeof routes['api.projects.templates.store']
      }
    }
    templates: {
      update: typeof routes['api.templates.update']
      destroy: typeof routes['api.templates.destroy']
    }
    reports: {
      index: typeof routes['api.reports.index']
      show: typeof routes['api.reports.show']
      update: typeof routes['api.reports.update']
    }
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  templates: {
    index: typeof routes['templates.index']
    create: typeof routes['templates.create'] & {
      alias: typeof routes['templates.create.alias']
    }
    store: typeof routes['templates.store']
    edit: typeof routes['templates.edit']
    update: typeof routes['templates.update']
    destroy: typeof routes['templates.destroy']
  }
  publicReports: {
    store: typeof routes['public_reports.store']
    presign: typeof routes['public_reports.presign']
    proxyImage: typeof routes['public_reports.proxy_image']
  }
  reports: {
    index: typeof routes['reports.index']
    show: typeof routes['reports.show']
    update: typeof routes['reports.update']
  }
}
