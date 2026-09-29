<script setup lang="ts">
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { router } from '@inertiajs/vue3'
import {
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Plug,
  Settings,
  Users,
} from '@lucide/vue'
import BrandMark from '~/components/brand_mark.vue'

const page = usePage<any>()

const firstProject = computed(() => (page.props.projects ?? [])[0] ?? null)

const items = computed(() => {
  const pid = firstProject.value?.id ?? null
  return [
    { label: 'Overview', icon: LayoutDashboard, href: '/', active: page.url === '/' },
    {
      label: 'Projects',
      icon: FolderKanban,
      href: '/projects',
      active: page.url.startsWith('/projects') && !page.url.includes('/settings'),
    },
    {
      label: 'All Reports',
      icon: ClipboardList,
      href: '/reports',
      active: page.url.startsWith('/reports'),
    },
    {
      label: 'Integrations',
      icon: Plug,
      href: pid ? `/projects/${pid}/integrations` : '/projects/1/integrations',
      active: page.url.includes('/integrations'),
    },
    {
      label: 'Team',
      icon: Users,
      href: pid ? `/projects/${pid}/team` : '/settings/team',
      active: page.url.includes('/team'),
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      active: page.url.startsWith('/settings'),
    },
  ]
})

const name = computed(() => page.props.user?.fullName ?? page.props.user?.email ?? '')
const role = computed(() =>
  page.props.user?.role
    ? page.props.user.role.charAt(0).toUpperCase() + page.props.user.role.slice(1)
    : ''
)
const initials = computed(() => page.props.user?.initials ?? '')

function logout() {
  router.post('/logout')
}
</script>

<template>
  <aside
    class="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col justify-between border-r border-hairline bg-white lg:flex"
  >
    <div class="flex w-full flex-col">
      <!-- Brand -->
      <div class="flex items-center gap-2.5 px-5 pb-4 pt-5">
        <BrandMark :size="26" />
        <span class="font-heading text-[18px] font-bold leading-none text-ink-900">Trackboard</span>
      </div>

      <!-- Nav -->
      <nav class="flex w-full flex-col gap-1 px-3 pb-3 pt-4" aria-label="Main">
        <p class="px-2.5 pb-1 font-heading text-[11px] font-bold tracking-[0.55px] text-ink-300">
          WORKSPACE
        </p>
        <Link
          v-for="item in items"
          :key="item.label"
          :href="item.href"
          class="flex items-center gap-2.5 rounded-lg px-2.5 py-[9px] transition-colors"
          :class="
            item.active
              ? 'bg-[#edecfb] font-bold text-accent'
              : 'font-medium text-ink-900 hover:bg-surface'
          "
        >
          <component :is="item.icon" class="size-4 shrink-0" />
          <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
        </Link>
      </nav>
    </div>

    <!-- Profile -->
    <div class="flex w-full flex-col">
      <div class="h-px w-full bg-hairline" />
      <div class="flex items-center gap-2.5 px-4 py-3.5">
        <span
          class="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-accent font-heading text-[12px] font-bold text-white"
        >
          {{ initials }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate font-heading text-[13px] font-bold text-ink-900">{{ name }}</p>
          <p class="truncate font-heading text-[11px] text-label">{{ role }}</p>
        </div>
        <button
          type="button"
          class="shrink-0 text-ink-300 transition-colors hover:text-red-600"
          title="Log out"
          aria-label="Log out"
          @click="logout"
        >
          <LogOut class="size-4" />
        </button>
      </div>
    </div>
  </aside>
</template>
