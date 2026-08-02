import '@adonisjs/inertia/types'

import type { VNodeProps, AllowedComponentProps, ComponentInstance } from 'vue'

type ExtractProps<T> = Omit<
  ComponentInstance<T>['$props'],
  keyof VNodeProps | keyof AllowedComponentProps
>

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.vue'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.vue'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.vue'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.vue'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.vue'))['default']>
    'portal/show': ExtractProps<(typeof import('../../inertia/pages/portal/show.vue'))['default']>
    'reports/index': ExtractProps<(typeof import('../../inertia/pages/reports/index.vue'))['default']>
    'reports/show': ExtractProps<(typeof import('../../inertia/pages/reports/show.vue'))['default']>
    'templates/form': ExtractProps<(typeof import('../../inertia/pages/templates/form.vue'))['default']>
    'templates/index': ExtractProps<(typeof import('../../inertia/pages/templates/index.vue'))['default']>
  }
}
