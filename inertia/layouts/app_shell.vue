<script setup lang="ts">
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import AppSidebar from '~/components/app_sidebar.vue'

type Crumb = { label: string; href?: string }

/**
 * App shell from the Figma design: sidebar + top bar (breadcrumb + user
 * avatar). Pages opt in with `defineOptions({ layout: AppShell })` and supply
 * `breadcrumb` from their controller.
 */
const page = usePage<any>()
const crumbs = computed<Crumb[]>(() => page.props.breadcrumb ?? [])
const initials = computed(() => page.props.user?.initials ?? '')
const isAuthed = computed(() => !!page.props.user)
</script>

<template>
  <div class="flex min-h-screen bg-canvas">
    <AppSidebar v-if="isAuthed" />

    <div class="flex min-w-0 flex-1 flex-col">
      <div
        class="sticky top-0 z-20 flex items-center justify-between border-b border-hairline bg-white px-10 py-4"
      >
        <div class="flex items-center gap-2.5">
          <template v-for="(crumb, index) in crumbs" :key="index">
            <span v-if="index > 0" class="font-heading text-[16px] text-ink-600">/</span>
            <Link
              v-if="crumb.href"
              :href="crumb.href"
              class="font-heading text-[16px] text-ink-600 hover:text-ink-900"
            >
              {{ crumb.label }}
            </Link>
            <span v-else class="font-heading text-[16px] text-ink-600">{{ crumb.label }}</span>
          </template>
        </div>

        <div
          v-if="initials"
          class="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-white"
        >
          {{ initials }}
        </div>
      </div>

      <main class="!m-0 !max-w-none !border-0 px-10 pt-10 pb-15">
        <slot />
      </main>
    </div>
  </div>
</template>
