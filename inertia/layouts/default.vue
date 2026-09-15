<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import { toast, Toaster } from 'vue-sonner'
import type { Data } from '@generated/data'
import { Link, Form } from '@adonisjs/inertia/vue'
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  ClipboardList,
  Plug,
  Users,
  Settings,
  ChevronRight,
  ChevronsLeft,
  Sun,
  Moon,
  Menu,
} from '@lucide/vue'

const page = usePage<
  Data.SharedProps & {
    projects?: { id: number; name: string; slug: string }[]
    project?: { id: number; name: string; slug: string }
  }
>()

watch(
  () => page.url,
  () => toast.dismiss()
)

watch(
  () => page.flash,
  (flashMessages) => {
    if (flashMessages.error) {
      toast.error(flashMessages.error)
    }
    if (flashMessages.success) {
      toast.success(flashMessages.success)
    }
  },
  { immediate: true }
)

const collapsed = ref(false)
const mobileOpen = ref(false)
const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('trackboard:sidebar-collapsed')
  if (saved) collapsed.value = saved === 'true'
  const savedTheme = localStorage.getItem('trackboard:theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
  }
  if (isDark.value) document.documentElement.classList.add('dark')
})

watch(collapsed, (val) => {
  localStorage.setItem('trackboard:sidebar-collapsed', String(val))
})

watch(isDark, (val) => {
  localStorage.setItem('trackboard:theme', val ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', val)
})

const projects = computed(() => (page.props as any).projects ?? [])
const currentProject = computed(() => (page.props as any).project ?? projects.value[0] ?? null)
const currentProjectId = computed(() => currentProject.value?.id ?? projects.value[0]?.id ?? null)

function onProjectChange(event: Event) {
  const id = (event.target as HTMLSelectElement).value
  if (!id) return
  router.visit(`/projects/${id}/templates`)
}

const navItems = computed(() => {
  const pid = currentProjectId.value
  return [
    { label: 'Overview', icon: LayoutDashboard, href: '/', active: page.url === '/' },
    {
      label: 'Projects',
      icon: FolderKanban,
      href: '/projects',
      active: page.url.startsWith('/projects') && !page.url.includes('/integrations') && !page.url.includes('/team') && !page.url.includes('/settings'),
    },
    { label: 'Inbox', icon: Inbox, href: '/inbox', active: page.url.startsWith('/inbox') },
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
      href: pid ? `/projects/${pid}/team` : '#',
      active: page.url.includes('/team'),
      disabled: !pid,
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      active: page.url === '/settings',
    },
  ]
})
</script>

<template>
  <!-- Authenticated: sidebar layout -->
  <div v-if="page.props.user" class="flex min-h-screen bg-slate-50">
    <!-- Mobile overlay -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-30 bg-black/40 lg:hidden"
      @click="mobileOpen = false"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        collapsed ? 'w-16' : 'w-64',
        'shrink-0 flex flex-col bg-brand-indigo-900 text-white transition-all duration-200',
        'lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden',
        mobileOpen ? 'fixed inset-y-0 left-0 z-40 w-64' : 'hidden lg:flex',
      ]"
    >
      <!-- Header: logo -->
      <div class="flex items-center gap-2.5 px-4 h-16 shrink-0 border-b border-white/10">
        <img :src="'/logo.svg'" alt="Trackboard" class="h-7 w-7 rounded-md shrink-0" />
        <span
          v-if="!collapsed || mobileOpen"
          class="font-heading font-bold tracking-[-0.01em] text-white whitespace-nowrap"
          >Trackboard</span
        >
        <button
          v-if="!collapsed || mobileOpen"
          class="ml-auto hidden lg:flex h-7 w-7 items-center justify-center rounded-md bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
          title="Collapse sidebar"
          @click="collapsed = true"
        >
          <ChevronsLeft class="h-4 w-4" />
        </button>
      </div>

      <!-- Project switcher -->
      <div class="px-3 py-3 border-b border-white/10">
        <div v-if="collapsed && !mobileOpen" class="flex justify-center">
          <button
            class="h-9 w-9 rounded-md bg-white/10 flex items-center justify-center text-sm font-medium hover:bg-white/15"
            :title="currentProject?.name ?? 'Select project'"
            @click="collapsed = false"
          >
            {{ (currentProject?.name ?? '?').slice(0, 1).toUpperCase() }}
          </button>
        </div>
        <div v-else>
          <label class="block text-[10px] font-medium tracking-widest uppercase text-white/50 mb-1"
            >Project</label
          >
          <select
            :value="currentProjectId ?? ''"
            class="w-full rounded-md bg-white/10 border border-white/15 text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-teal-600"
            @change="onProjectChange"
          >
            <option v-if="projects.length === 0" value="" class="text-slate-800">
              No projects
            </option>
            <option v-for="p in projects" :key="p.id" :value="p.id" class="text-slate-800">
              {{ p.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        <component
          :is="item.disabled ? 'button' : Link"
          v-for="item in navItems"
          :key="item.label"
          :href="item.disabled ? undefined : item.href"
          :disabled="item.disabled ? true : undefined"
          :class="[
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
            item.active
              ? 'bg-white/15 text-white border-l-[3px] border-brand-teal-600'
              : 'bg-transparent text-white/70 hover:bg-white/10 hover:text-white',
            item.disabled ? 'opacity-50 cursor-not-allowed' : '',
            collapsed && !mobileOpen ? 'justify-center px-2' : '',
          ]"
          :title="collapsed && !mobileOpen ? item.label : undefined"
          @click="
            () => {
              if (item.disabled) toast.info('Coming soon')
              else mobileOpen = false
            }
          "
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" aria-hidden="true" />
          <span v-if="!collapsed || mobileOpen" class="truncate">{{ item.label }}</span>
        </component>
      </nav>

      <!-- Footer: collapse + user -->
      <div class="border-t border-white/10 p-3 space-y-3">
        <button
          v-if="collapsed && !mobileOpen"
          class="w-full flex justify-center py-2 rounded-md bg-transparent hover:bg-white/10 text-white/60 hover:text-white"
          title="Expand sidebar"
          @click="collapsed = false"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
        <button
          v-else
          class="hidden lg:flex w-full items-center justify-center gap-2 py-2 rounded-md bg-transparent hover:bg-white/10 text-white/60 hover:text-white text-xs"
          @click="collapsed = true"
        >
          <ChevronsLeft class="h-4 w-4" /> <span>Collapse</span>
        </button>

        <button
          class="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-transparent hover:bg-white/10 text-white/60 hover:text-white text-xs"
          @click="isDark = !isDark"
        >
          <component :is="isDark ? Sun : Moon" class="h-4 w-4" />
          <span v-if="!collapsed || mobileOpen">{{ isDark ? 'Light' : 'Dark' }}</span>
        </button>

        <div
          :class="['flex items-center gap-2.5', collapsed && !mobileOpen ? 'justify-center' : '']"
        >
          <span
            class="h-8 w-8 rounded-full bg-brand-teal-600 flex items-center justify-center text-xs font-semibold shrink-0"
          >
            {{ page.props.user.initials }}
          </span>
          <span v-if="!collapsed || mobileOpen" class="text-sm truncate">{{
            page.props.user.email
          }}</span>
        </div>
        <Form v-if="!collapsed || mobileOpen" route="session.destroy">
          <button
            type="submit"
            class="w-full py-2 rounded-md bg-white/10 hover:bg-white/15 text-white text-sm font-medium"
          >
            Logout
          </button>
        </Form>
      </div>
    </aside>

    <!-- Main column -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Mobile top bar -->
      <div
        class="lg:hidden sticky top-0 z-20 flex items-center gap-3 px-4 h-14 bg-white border-b border-slate-200"
      >
        <button
          class="h-8 w-8 rounded-md bg-transparent hover:bg-slate-100 flex items-center justify-center"
          @click="mobileOpen = true"
        >
          <Menu class="h-5 w-5" />
        </button>
        <img :src="'/logo.svg'" alt="Trackboard" class="h-6 w-6 rounded" />
        <span class="font-heading font-bold tracking-[-0.01em] text-brand-indigo-700"
          >Trackboard</span
        >
        <span class="ml-auto text-xs text-slate-500 truncate">{{
          currentProject?.name ?? ''
        }}</span>
      </div>

      <main class="flex-1 !max-w-none !m-0 !border-0 !rounded-none bg-slate-50">
        <slot />
      </main>
    </div>
  </div>

  <!-- Guest: simple top bar + centered main (unchanged) -->
  <template v-else>
    <header>
      <div>
        <div>
          <Link route="home" class="flex items-center gap-2">
            <img :src="'/logo.svg'" alt="Trackboard" class="h-7 w-auto" />
            <span class="font-heading font-bold tracking-[-0.01em] text-brand text-lg"
              >Trackboard</span
            >
          </Link>
        </div>
        <div>
          <nav>
            <Link route="new_account.create">Signup</Link>
            <Link route="session.create">Login</Link>
          </nav>
        </div>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </template>

  <Toaster position="top-center" rich-colors />
</template>
