<script setup lang="ts">
import { computed } from 'vue'
import { Head, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { Inbox, Loader, ShieldAlert, CheckCircle2, Plug, Users } from '@lucide/vue'
import AppShell from '~/layouts/app_shell.vue'
import { statusLabel, statusPillClasses } from '~/composables/use_report_display'

defineOptions({ layout: AppShell })

type Stats = {
  open: number
  inProgress: number
  pendingVerification: number
  resolvedThisWeek: number
  total: number
  avgTimeToFirstResponseHours: number | null
}
type TrendPoint = { date: string; count: number }
type WorkItem = {
  id: string
  number: number | null
  title: string
  status: string
  priority: string
  reporterEmail: string
  createdAt: string | null
  project: { id: number; name: string; slug: string } | null
}

const props = defineProps<{
  stats?: Stats
  trend?: TrendPoint[]
  worklist?: WorkItem[]
}>()

const page = usePage<any>()
const isAuthed = computed(() => !!page.props.user)
const projects = computed<any[]>(() => page.props.projects ?? [])
const firstProject = computed(() => projects.value[0] ?? null)

const trend = computed(() => props.trend ?? [])
const worklist = computed(() => props.worklist ?? [])

const features = [
  {
    title: 'Embeddable widget',
    desc: 'Mount a floating report button on any site with a single <script> tag.',
    icon: Plug,
  },
  {
    title: 'Triage inbox',
    desc: 'Sort, assign, and verify reports without leaving your dashboard.',
    icon: Inbox,
  },
  {
    title: 'Team & integrations',
    desc: 'Invite collaborators and push reports to the tools you already use.',
    icon: Users,
  },
]

function statusPillClassesFor(status: string): string {
  return statusPillClasses(status)
}

const statCards = computed(() => [
  {
    label: 'Open',
    value: props.stats?.open ?? 0,
    hint: 'Needs triage',
    icon: Inbox,
    tone: 'bg-status-bg text-status-fg',
  },
  {
    label: 'In Progress',
    value: props.stats?.inProgress ?? 0,
    hint: 'Active work',
    icon: Loader,
    tone: 'bg-avatar-amber/20 text-[#a47912]',
  },
  {
    label: 'Pending Verification',
    value: props.stats?.pendingVerification ?? 0,
    hint: 'Unverified',
    icon: ShieldAlert,
    tone: 'bg-surface text-ink-600',
  },
  {
    label: 'Resolved this week',
    value: props.stats?.resolvedThisWeek ?? 0,
    hint:
      'Avg first response: ' +
      (props.stats?.avgTimeToFirstResponseHours !== null &&
      props.stats?.avgTimeToFirstResponseHours !== undefined
        ? `${props.stats.avgTimeToFirstResponseHours}h`
        : '—'),
    icon: CheckCircle2,
    tone: 'bg-brand-teal-600/10 text-brand-teal-600',
  },
])

const chartPoints = computed(() => {
  const data = trend.value
  if (!data.length) return ''
  const max = Math.max(1, ...data.map((d) => d.count))
  const width = 640
  const height = 120
  const stepX = width / Math.max(1, data.length - 1)
  return data
    .map((d, i) => {
      const x = i * stepX
      const y = height - (d.count / max) * (height - 20) - 10
      return `${x},${y}`
    })
    .join(' ')
})
</script>

<template>
  <Head :title="isAuthed ? 'Dashboard' : 'Trackboard'" />

  <!-- Guest: marketing landing -->
  <div v-if="!isAuthed" class="mx-auto max-w-3xl py-10 text-center">
    <span
      class="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 font-heading text-[12px] font-medium text-ink-600"
    >
      <span class="size-2 rounded-full bg-avatar-teal" />
      Self-hosted bug reporting
    </span>
    <h1
      class="mt-5 font-heading text-[40px] font-bold leading-[1.1] tracking-[-0.4px] text-ink-900"
    >
      Bug reports that live where your users do.
    </h1>
    <p class="mx-auto mt-4 max-w-xl font-heading text-[16px] leading-[1.5] text-ink-600">
      Trackboard turns any page into a feedback channel. Drop in a widget, triage reports in a clean
      inbox, and ship fixes faster — no third-party SaaS required.
    </p>
    <div class="mt-7 flex items-center justify-center gap-3">
      <Link
        href="/signup"
        class="rounded-[10px] bg-accent px-5 py-3 font-heading text-[15px] font-bold text-white transition-colors hover:bg-accent-strong"
      >
        Start free
      </Link>
      <Link
        href="/login"
        class="rounded-[10px] border border-hairline bg-white px-5 py-3 font-heading text-[15px] font-bold text-ink-900 transition-colors hover:bg-surface"
      >
        Sign in
      </Link>
    </div>

    <div class="mt-14 grid grid-cols-1 gap-5 text-left sm:grid-cols-3">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="rounded-2xl border border-hairline bg-white p-6"
      >
        <span
          class="mb-4 flex size-10 items-center justify-center rounded-xl bg-status-bg text-status-fg"
        >
          <component :is="feature.icon" class="size-5" />
        </span>
        <h3 class="font-heading text-[15px] font-bold text-ink-900">{{ feature.title }}</h3>
        <p class="mt-1.5 font-heading text-[14px] leading-[1.5] text-ink-600">
          {{ feature.desc }}
        </p>
      </div>
    </div>
  </div>

  <!-- Authenticated: overview -->
  <div v-else class="flex flex-col gap-6">
    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="card in statCards"
        :key="card.label"
        class="rounded-2xl border border-hairline bg-white p-5"
      >
        <div class="flex items-center justify-between">
          <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300 uppercase">
            {{ card.label }}
          </p>
          <span class="flex size-8 items-center justify-center rounded-[10px]" :class="card.tone">
            <component :is="card.icon" class="size-4" />
          </span>
        </div>
        <p class="mt-1 font-heading text-[30px] font-bold text-ink-900">{{ card.value }}</p>
        <p class="font-heading text-[12px] text-ink-600">{{ card.hint }}</p>
      </div>
    </div>

    <!-- Projects -->
    <div class="overflow-hidden rounded-2xl border border-hairline bg-white">
      <div class="flex items-center justify-between border-b border-hairline px-6 py-4">
        <h2 class="font-heading text-[13px] font-bold text-ink-900">Your projects</h2>
        <Link href="/projects" class="text-[13px] font-bold text-accent hover:underline"
          >Manage →</Link
        >
      </div>
      <p
        v-if="projects.length === 0"
        class="px-6 py-8 text-center font-heading text-[14px] text-ink-600"
      >
        No projects yet —
        <Link href="/projects" class="font-bold text-accent hover:underline">create one</Link>
        to start collecting reports.
      </p>
      <div v-else class="divide-y divide-hairline">
        <Link
          v-for="p in projects"
          :key="p.id"
          :href="`/projects/${p.id}`"
          class="flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-surface"
        >
          <span
            class="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-status-bg font-heading text-[14px] font-bold text-status-fg"
            >{{ p.name.slice(0, 1).toUpperCase() }}</span
          >
          <span class="min-w-0 flex-1">
            <span class="block truncate font-heading text-[14px] font-medium text-ink-900">{{
              p.name
            }}</span>
            <span class="block truncate font-mono text-xs text-ink-300">/{{ p.slug }}</span>
          </span>
          <span class="shrink-0 font-heading text-[12px] text-ink-300">Open →</span>
        </Link>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="stats && stats.total === 0"
      class="overflow-hidden rounded-2xl border border-hairline bg-white"
    >
      <div
        class="flex h-32 items-center justify-center"
        style="background: linear-gradient(135deg, #4c3fe0 0%, #00b8a9 100%)"
      >
        <span class="font-heading text-[14px] font-medium text-white">
          No reports yet — your widget will populate this dashboard
        </span>
      </div>
      <div class="p-6 text-center">
        <p class="font-heading text-[14px] text-ink-600">
          Bug reports from your widget will land here the moment someone submits one.
        </p>
        <Link
          v-if="firstProject"
          :href="`/projects/${firstProject.id}/settings/widget`"
          class="mt-4 inline-flex rounded-[10px] bg-accent px-4 py-2.5 font-heading text-[14px] font-bold text-white hover:bg-accent-strong"
        >
          Install the widget
        </Link>
        <Link
          v-else
          href="/projects"
          class="mt-4 inline-flex rounded-[10px] bg-accent px-4 py-2.5 font-heading text-[14px] font-bold text-white hover:bg-accent-strong"
        >
          Create your first project
        </Link>
      </div>
    </div>

    <!-- Trend -->
    <div v-if="stats && stats.total > 0" class="rounded-2xl border border-hairline bg-white p-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="font-heading text-[15px] font-bold text-ink-900">Reports over time</h2>
        <span class="font-heading text-[12px] text-ink-300">Last 7 days</span>
      </div>
      <div v-if="trend.length" class="overflow-x-auto">
        <svg viewBox="0 0 640 130" class="h-32 w-full">
          <defs>
            <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#4c3fe0" />
              <stop offset="100%" stop-color="#00b8a9" />
            </linearGradient>
          </defs>
          <line x1="0" y1="110" x2="640" y2="110" stroke="#e5e1f0" stroke-width="1" />
          <polyline
            :points="chartPoints"
            fill="none"
            stroke="url(#brandGradient)"
            stroke-width="2.5"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <p v-else class="py-8 text-center font-heading text-[14px] text-ink-600">No trend data yet</p>
    </div>

    <!-- Worklist -->
    <div
      v-if="stats && stats.total > 0"
      class="overflow-hidden rounded-2xl border border-hairline bg-white"
    >
      <div class="flex items-center justify-between border-b border-hairline px-6 py-4">
        <h2 class="font-heading text-[15px] font-bold text-ink-900">Most urgent</h2>
        <Link href="/reports" class="text-[13px] font-bold text-accent hover:underline"
          >View board →</Link
        >
      </div>
      <p
        v-if="worklist.length === 0"
        class="px-6 py-8 text-center font-heading text-[14px] text-ink-600"
      >
        No open reports — the board is clear.
      </p>
      <div v-else class="divide-y divide-hairline">
        <Link
          v-for="report in worklist"
          :key="report.id"
          :href="`/reports/${report.id}`"
          class="flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-surface"
        >
          <span
            class="inline-flex shrink-0 items-center rounded-md px-2.5 py-1 font-heading text-[11px] font-bold"
            :class="statusPillClassesFor(report.status)"
          >
            {{ statusLabel(report.status) }}
          </span>
          <span class="min-w-0 flex-1 truncate font-heading text-[14px] font-medium text-ink-900">
            {{ report.title }}
          </span>
          <span class="hidden shrink-0 font-heading text-[12px] text-ink-300 sm:inline">
            {{ report.number ? `#TB-${report.number}` : '' }}
          </span>
        </Link>
      </div>
    </div>
  </div>
</template>
