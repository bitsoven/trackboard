<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { computed } from 'vue'
import { Inbox, Loader, ShieldAlert, CheckCircle2, Plug, Users } from '@lucide/vue'

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
  id: number
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
const stats = computed(() => props.stats)
const trend = computed(() => props.trend ?? [])
const worklist = computed(() => props.worklist ?? [])
const projects = computed<any[]>(() => page.props.projects ?? [])
const firstProject = computed(() => projects.value[0] ?? null)

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

function statusBadge(status: string): string {
  const map: Record<string, string> = {
    open: 'bg-brand-indigo-500 text-white',
    in_progress: 'bg-amber-100 text-amber-700',
    pending_verification: 'bg-slate-100 text-slate-600 border border-dashed border-slate-300',
    resolved: 'bg-brand-teal-600 text-white',
    closed: 'bg-slate-200 text-slate-600',
  }
  return map[status] ?? 'bg-slate-100 text-slate-700'
}

// Chart helpers: simple line chart
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
const chartMax = computed(() => Math.max(1, ...trend.value.map((d) => d.count)))
</script>

<template>
  <Head title="Overview" />

  <!-- Guest: marketing landing -->
  <template v-if="!isAuthed">
    <section class="max-w-6xl mx-auto px-6 py-16 sm:py-24">
      <div class="text-center max-w-3xl mx-auto">
        <div
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-indigo-700 text-xs font-medium mb-6"
        >
          <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
          Self-hosted bug reporting
        </div>
        <h1
          class="font-heading font-bold tracking-[-0.01em] text-4xl sm:text-5xl text-slate-900 leading-tight"
        >
          Bug reports that live where your users do.
        </h1>
        <p class="mt-5 text-lg text-slate-600">
          Trackboard turns any page into a feedback channel. Drop in a widget, triage reports in a
          clean inbox, and ship fixes faster — no third-party SaaS required.
        </p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/signup"
            class="inline-flex items-center px-5 py-2.5 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500"
          >
            Start free
          </Link>
          <Link
            href="/login"
            class="inline-flex items-center px-5 py-2.5 rounded-md border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
          >
            Log in
          </Link>
        </div>
      </div>

      <div class="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          v-for="f in features"
          :key="f.title"
          class="bg-white border border-slate-200 rounded-xl p-6"
        >
          <div
            class="h-10 w-10 rounded-lg bg-brand-indigo-100 text-brand-indigo-700 flex items-center justify-center mb-4"
          >
            <component :is="f.icon" class="h-5 w-5" />
          </div>
          <h3 class="text-sm font-semibold text-slate-900">{{ f.title }}</h3>
          <p class="mt-1.5 text-sm text-slate-600">{{ f.desc }}</p>
        </div>
      </div>
    </section>
  </template>

  <!-- Authenticated: Overview dashboard -->
  <template v-else>
    <div class="max-w-6xl mx-auto p-6 space-y-6">
      <div class="flex items-center gap-3">
        <img :src="'/logo.svg'" alt="Trackboard" class="h-8 w-8 rounded-md" />
        <span class="font-heading font-bold tracking-[-0.01em] text-slate-900">Trackboard</span>
      </div>
      <div>
        <h1 class="text-2xl font-semibold tracking-tight font-heading">Overview</h1>
        <p class="text-sm text-slate-500 mt-1">
          Status at a glance — what needs your attention now
        </p>
      </div>

      <!-- Projects -->
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 class="text-sm font-semibold">Your projects</h2>
          <Link
            href="/projects"
            class="text-xs font-medium text-brand-indigo-700 hover:text-brand-indigo-500"
            >Manage →</Link
          >
        </div>
        <div v-if="projects.length === 0" class="p-8 text-center text-sm text-slate-500">
          No projects yet —
          <Link href="/projects" class="text-brand-indigo-700 hover:underline">create one</Link>
          to start collecting reports.
        </div>
        <div v-else class="divide-y divide-slate-100">
          <Link
            v-for="p in projects"
            :key="p.id"
            :href="`/projects/${p.id}/templates`"
            class="flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition-colors"
          >
            <span
              class="h-9 w-9 rounded-md bg-brand-indigo-100 text-brand-indigo-700 flex items-center justify-center text-sm font-semibold shrink-0"
              >{{ p.name.slice(0, 1).toUpperCase() }}</span
            >
            <span class="flex-1 min-w-0">
              <span class="block text-sm font-medium truncate">{{ p.name }}</span>
              <span class="block text-xs text-slate-400 font-mono truncate">/{{ p.slug }}</span>
            </span>
            <span class="text-xs text-slate-400 shrink-0">Open →</span>
          </Link>
        </div>
      </div>

      <!-- Empty state: no reports yet -->
      <div
        v-if="stats && stats.total === 0"
        class="rounded-xl border border-slate-200 overflow-hidden"
      >
        <div
          class="h-32 flex items-center justify-center"
          style="background: linear-gradient(135deg, #4338ca 0%, #0d9488 100%)"
        >
          <span class="text-white/90 text-sm font-medium"
            >No reports yet — your widget will populate this dashboard</span
          >
        </div>
        <div class="bg-white p-6 text-center">
          <p class="text-sm text-slate-600 mb-3">
            Bug reports from your widget will land here the moment someone submits one.
          </p>
          <Link
            v-if="firstProject"
            :href="`/projects/${firstProject.id}/integrations`"
            class="inline-flex items-center px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500"
          >
            Copy embed snippet
          </Link>
          <Link
            v-else
            href="/projects"
            class="inline-flex items-center px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500"
          >
            Create your first project
          </Link>
        </div>
      </div>

      <!-- KPIs -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white border border-slate-200 rounded-xl p-5">
          <div class="flex items-center justify-between">
            <div class="text-xs font-medium tracking-widest uppercase text-slate-500">Open</div>
            <span
              class="h-8 w-8 rounded-lg bg-brand-indigo-100 text-brand-indigo-700 flex items-center justify-center"
            >
              <Inbox class="h-4 w-4" />
            </span>
          </div>
          <div class="mt-1 text-3xl font-semibold text-brand-indigo-700">
            {{ stats?.open ?? 0 }}
          </div>
          <div class="text-xs text-slate-500 mt-1">Needs triage</div>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-5">
          <div class="flex items-center justify-between">
            <div class="text-xs font-medium tracking-widest uppercase text-slate-500">
              In Progress
            </div>
            <span
              class="h-8 w-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center"
            >
              <Loader class="h-4 w-4" />
            </span>
          </div>
          <div class="mt-1 text-3xl font-semibold text-amber-500">{{ stats?.inProgress ?? 0 }}</div>
          <div class="text-xs text-slate-500 mt-1">Active work</div>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-5">
          <div class="flex items-center justify-between">
            <div class="text-xs font-medium tracking-widest uppercase text-slate-500">
              Pending Verification
            </div>
            <span
              class="h-8 w-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center"
            >
              <ShieldAlert class="h-4 w-4" />
            </span>
          </div>
          <div class="mt-1 text-3xl font-semibold text-slate-700">
            {{ stats?.pendingVerification ?? 0 }}
          </div>
          <div class="text-xs text-slate-500 mt-1">Unverified</div>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-5">
          <div class="flex items-center justify-between">
            <div class="text-xs font-medium tracking-widest uppercase text-slate-500">
              Resolved this week
            </div>
            <span
              class="h-8 w-8 rounded-lg bg-brand-teal-600/10 text-brand-teal-600 flex items-center justify-center"
            >
              <CheckCircle2 class="h-4 w-4" />
            </span>
          </div>
          <div class="mt-1 text-3xl font-semibold text-brand-teal-600">
            {{ stats?.resolvedThisWeek ?? 0 }}
          </div>
          <div
            v-if="stats?.avgTimeToFirstResponseHours !== null"
            class="text-xs text-slate-500 mt-1"
          >
            Avg first response: {{ stats?.avgTimeToFirstResponseHours }}h
          </div>
          <div v-else class="text-xs text-slate-500 mt-1">Avg first response: —</div>
        </div>
      </div>

      <!-- Trend chart -->
      <div v-if="stats && stats.total > 0" class="bg-white border border-slate-200 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold">Reports over time</h2>
          <span class="text-xs text-slate-500">Last 7 days</span>
        </div>
        <div v-if="trend.length && chartMax > 0" class="overflow-x-auto">
          <svg viewBox="0 0 640 130" class="w-full h-32">
            <defs>
              <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#4338CA" />
                <stop offset="100%" stop-color="#0D9488" />
              </linearGradient>
            </defs>
            <!-- grid lines -->
            <line x1="0" y1="110" x2="640" y2="110" stroke="#E2E8F0" stroke-width="1" />
            <polyline
              :points="chartPoints"
              fill="none"
              stroke="url(#brandGradient)"
              stroke-width="2.5"
              stroke-linejoin="round"
              stroke-linecap="round"
            />
            <circle
              v-for="(p, i) in trend"
              :key="p.date"
              :cx="(i * 640) / Math.max(1, trend.length - 1)"
              :cy="120 - (p.count / chartMax) * 100 - 10"
              r="3.5"
              fill="#4338CA"
              stroke="white"
              stroke-width="1.5"
            />
          </svg>
          <div class="flex justify-between text-[10px] text-slate-400 mt-1">
            <span v-for="p in trend" :key="p.date">{{ p.date.slice(5) }}</span>
          </div>
        </div>
        <div v-else class="text-sm text-slate-500 py-8 text-center">No trend data yet</div>
      </div>

      <!-- Worklist preview -->
      <div
        v-if="stats && stats.total > 0"
        class="bg-white border border-slate-200 rounded-xl overflow-hidden"
      >
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 class="text-sm font-semibold">Most urgent — 5 reports</h2>
          <Link
            href="/reports"
            class="text-xs font-medium text-brand-indigo-700 hover:text-brand-indigo-500"
            >View inbox →</Link
          >
        </div>
        <div v-if="worklist.length === 0" class="p-8 text-center text-sm text-slate-500">
          No open reports — inbox is clear
        </div>
        <div v-else class="divide-y divide-slate-100">
          <Link
            v-for="r in worklist"
            :key="r.id"
            :href="`/reports/${r.id}`"
            class="flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition-colors"
          >
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0"
              :class="statusBadge(r.status)"
              >{{ r.status }}</span
            >
            <span class="flex-1 min-w-0 truncate text-sm font-medium">{{ r.title }}</span>
            <span class="hidden sm:inline text-xs text-slate-500 truncate">{{
              r.reporterEmail
            }}</span>
            <span class="text-xs text-slate-400 shrink-0">{{
              r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''
            }}</span>
          </Link>
        </div>
      </div>
    </div>
  </template>
</template>
