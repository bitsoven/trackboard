<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { computed } from 'vue'

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

  <!-- Guest: original hero -->
  <template v-if="!isAuthed">
    <div class="hero">
      <div
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-medium mb-4"
      >
        Trackboard · Self-hosted bug reporting
      </div>
      <h1>It works — welcome to the power of a full-stack Vue app</h1>
      <p>
        Powered by Inertia and Vue, this setup blends server-driven routing with rich client-side
        interactivity — seamless, fast, and cohesive.
      </p>
    </div>

    <div class="cards">
      <a href="https://insiders.adonisjs.com/docs/v7-alpha/introduction" target="_blank">
        <h3>Official Docs &nbsp;›</h3>
        <p>Comprehensive reference for building with AdonisJS</p>
      </a>

      <a href="https://adocasts.com/" target="_blank">
        <h3>Adocasts &nbsp;›</h3>
        <p>Guided video tutorials for everyday development</p>
      </a>

      <a href="https://discord.gg/vDcEjq6" target="_blank">
        <h3>Discord &nbsp;›</h3>
        <p>Connect with developers building with AdonisJS every day</p>
      </a>
    </div>
  </template>

  <!-- Authenticated: Overview dashboard -->
  <template v-else>
    <div class="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Overview</h1>
        <p class="text-sm text-slate-500 mt-1">
          Status at a glance — what needs your attention now
        </p>
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
            v-if="worklist.length === 0"
            href="/projects/1/templates"
            class="inline-flex items-center px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500"
          >
            Copy embed snippet
          </Link>
        </div>
      </div>

      <!-- KPIs -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white border border-slate-200 rounded-xl p-5">
          <div class="text-xs font-medium tracking-widest uppercase text-slate-500">Open</div>
          <div class="mt-1 text-3xl font-semibold text-brand-indigo-700">
            {{ stats?.open ?? 0 }}
          </div>
          <div class="text-xs text-slate-500 mt-1">Needs triage</div>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-5">
          <div class="text-xs font-medium tracking-widest uppercase text-slate-500">
            In Progress
          </div>
          <div class="mt-1 text-3xl font-semibold text-amber-500">{{ stats?.inProgress ?? 0 }}</div>
          <div class="text-xs text-slate-500 mt-1">Active work</div>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-5">
          <div class="text-xs font-medium tracking-widest uppercase text-slate-500">
            Pending Verification
          </div>
          <div class="mt-1 text-3xl font-semibold text-slate-700">
            {{ stats?.pendingVerification ?? 0 }}
          </div>
          <div class="text-xs text-slate-500 mt-1">Unverified</div>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-5">
          <div class="text-xs font-medium tracking-widest uppercase text-slate-500">
            Resolved this week
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
