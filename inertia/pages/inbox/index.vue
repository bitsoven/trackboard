<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { toast } from 'vue-sonner'

type Report = {
  id: number
  projectId: number
  title: string
  status: string
  priority: string
  reporterEmail: string
  reporterVerifiedAt: string | null
  assigneeId: number | null
  updatedAt: string | null
  createdAt: string | null
  project: { id: number; name: string; slug: string } | null
}

const props = defineProps<{
  reports: Report[]
  filters: { projectId?: number; status?: string; priority?: string }
  projects: Array<{ id: number; name: string; slug: string }>
}>()

const statusFilter = ref(props.filters.status ?? '')
const priorityFilter = ref(props.filters.priority ?? '')
const projectFilter = ref(props.filters.projectId ? String(props.filters.projectId) : '')

function applyFilters() {
  router.get(
    '/inbox',
    {
      status: statusFilter.value || undefined,
      priority: priorityFilter.value || undefined,
      projectId: projectFilter.value || undefined,
    },
    { preserveState: true, replace: true }
  )
}

function clearFilters() {
  statusFilter.value = ''
  priorityFilter.value = ''
  projectFilter.value = ''
  applyFilters()
}

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

function priorityBadge(priority: string): string {
  const map: Record<string, string> = {
    low: 'bg-slate-100 text-slate-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
  }
  return map[priority] ?? 'bg-slate-100 text-slate-700'
}

const isEmpty = computed(() => props.reports.length === 0)

function copySnippet() {
  const snippet = `<script async src="${window.location.origin}/widget/v1/widget.js" data-project-key="YOUR_PROJECT_KEY"><\/script>`
  navigator.clipboard.writeText(snippet).then(
    () => toast.success('Embed snippet copied'),
    () => toast.error('Could not copy — please copy manually')
  )
}
</script>

<template>
  <Head title="Inbox" />

  <div class="max-w-6xl mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Inbox</h1>
        <p class="text-sm text-slate-500 mt-1">
          Open, unassigned reports that still need a decision — sorted by urgency.
        </p>
      </div>
      <Link
        href="/reports"
        class="text-sm font-medium text-brand-indigo-700 hover:text-brand-indigo-500"
        >View all reports →</Link
      >
    </div>

    <div class="flex flex-wrap gap-3 mb-4 p-3 border border-slate-200 rounded-lg bg-white">
      <select
        v-model="projectFilter"
        class="border border-slate-300 rounded-md px-2.5 py-1.5 text-sm bg-white"
      >
        <option value="">All projects</option>
        <option v-for="p in props.projects" :key="p.id" :value="String(p.id)">{{ p.name }}</option>
      </select>
      <select
        v-model="statusFilter"
        class="border border-slate-300 rounded-md px-2.5 py-1.5 text-sm bg-white"
      >
        <option value="">Needs triage (open, unassigned)</option>
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
      </select>
      <select
        v-model="priorityFilter"
        class="border border-slate-300 rounded-md px-2.5 py-1.5 text-sm bg-white"
      >
        <option value="">All priorities</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
        <option value="critical">critical</option>
      </select>
      <button
        class="text-sm px-3 py-1.5 bg-brand-indigo-700 text-white rounded-md hover:bg-brand-indigo-500"
        @click="applyFilters"
      >
        Apply
      </button>
      <button
        class="text-sm px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50"
        @click="clearFilters"
      >
        Clear
      </button>
    </div>

    <!-- Empty: inbox clear -->
    <div v-if="isEmpty" class="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div
        class="h-28 flex flex-col items-center justify-center gap-2"
        style="background: linear-gradient(135deg, #4338ca 0%, #0d9488 100%)"
      >
        <span class="text-white text-2xl">📥</span>
        <span class="text-white/90 text-sm font-medium">Inbox clear — no reports need action</span>
      </div>
      <div class="p-6 text-center">
        <p class="text-sm text-slate-600">
          Bug reports from your widget will land here the moment someone submits one.
        </p>
        <button
          class="mt-4 inline-flex items-center px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500"
          @click="copySnippet"
        >
          Copy embed snippet
        </button>
      </div>
    </div>

    <!-- List -->
    <div
      v-else
      class="border border-slate-200 rounded-xl bg-white overflow-hidden divide-y divide-slate-100"
    >
      <div
        v-for="r in props.reports"
        :key="r.id"
        class="flex items-center gap-4 px-4 py-3 hover:bg-slate-50"
      >
        <span
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0"
          :class="statusBadge(r.status)"
          >{{ r.status }}</span
        >
        <div class="flex-1 min-w-0">
          <Link
            :href="`/reports/${r.id}`"
            class="text-sm font-medium text-slate-900 hover:text-brand-indigo-700 truncate block"
            >{{ r.title }}</Link
          >
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-xs text-slate-500 truncate">{{ r.reporterEmail }}</span>
            <span
              v-if="r.reporterVerifiedAt"
              class="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-brand-teal-600/10 text-brand-teal-600"
              title="Verified reporter"
            >
              ✓ verified
            </span>
            <span v-if="r.project" class="hidden sm:inline text-xs text-slate-400"
              >· {{ r.project.name }}</span
            >
          </div>
        </div>
        <span
          class="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0"
          :class="priorityBadge(r.priority)"
          >{{ r.priority }}</span
        >
        <span class="hidden md:inline text-xs text-slate-400 shrink-0">{{
          r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : ''
        }}</span>
        <span
          v-if="r.assigneeId"
          class="hidden sm:flex h-7 w-7 rounded-full bg-slate-200 items-center justify-center text-xs font-medium shrink-0"
          :title="`Assignee #${r.assigneeId}`"
        >
          {{ String(r.assigneeId).slice(0, 2) }}
        </span>
        <span v-else class="hidden sm:inline text-xs text-slate-400 shrink-0">Unassigned</span>
        <Link
          :href="`/reports/${r.id}`"
          class="shrink-0 text-xs font-medium text-brand-indigo-700 hover:text-brand-indigo-500"
          >View →</Link
        >
      </div>
    </div>
  </div>
</template>
