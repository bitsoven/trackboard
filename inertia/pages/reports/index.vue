<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { tableFeatures, useTable, FlexRender } from '@tanstack/vue-table'

type Report = {
  id: number
  projectId: number
  title: string
  status: string
  priority: string
  reporterEmail: string
  pageUrl: string | null
  screenshotUrl: string | null
  createdAt: string | null
  project: { id: number; name: string; slug: string } | null
}

const props = defineProps<{
  reports: Report[]
  meta: any | null
  filters: {
    projectId?: number
    status?: string
    priority?: string
    page?: number
    perPage?: number
  }
  projects: Array<{ id: number; name: string; slug: string }>
}>()

const statusFilter = ref(props.filters.status ?? '')
const priorityFilter = ref(props.filters.priority ?? '')
const projectFilter = ref(props.filters.projectId ? String(props.filters.projectId) : '')

function applyFilters() {
  router.get(
    '/reports',
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
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
  }
  return map[priority] ?? 'bg-gray-100 text-gray-700'
}

const isFiltered = computed(
  () => !!(props.filters.status || props.filters.priority || props.filters.projectId)
)

const features = tableFeatures({})

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'title', header: 'Title' },
  {
    accessorKey: 'project',
    header: 'Project',
    cell: (info: any) => info.getValue()?.name ?? '—',
  },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'priority', header: 'Priority' },
  { accessorKey: 'reporterEmail', header: 'Reporter' },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: (info: any) =>
      info.getValue() ? new Date(info.getValue() as string).toLocaleString() : '—',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: (info: any) => info.row.original.id,
  },
]

const data = ref(props.reports)

const table = useTable({
  features,
  columns: columns as any,
  data,
})
</script>

<template>
  <Head title="Reports" />

  <div class="max-w-6xl mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">All Reports</h1>
        <p class="text-sm text-slate-500 mt-1">Searchable archive — every report across your projects</p>
      </div>
      <Link href="/" class="text-sm font-medium text-slate-500 hover:text-brand-indigo-700 hover:underline">← Overview</Link>
    </div>

    <div class="flex flex-wrap gap-3 mb-4 p-3 border border-slate-200 rounded-lg bg-white">
      <select v-model="projectFilter" class="border border-slate-300 rounded-md px-2.5 py-1.5 text-sm bg-white">
        <option value="">All projects</option>
        <option v-for="p in props.projects" :key="p.id" :value="String(p.id)">{{ p.name }}</option>
      </select>
      <select v-model="statusFilter" class="border border-slate-300 rounded-md px-2.5 py-1.5 text-sm bg-white">
        <option value="">All statuses</option>
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="resolved">resolved</option>
        <option value="closed">closed</option>
      </select>
      <select v-model="priorityFilter" class="border border-slate-300 rounded-md px-2.5 py-1.5 text-sm bg-white">
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

    <div class="border border-slate-200 rounded-xl bg-white overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50">
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="text-left px-3 py-2 font-medium text-slate-700"
            >
              <FlexRender v-if="!header.isPlaceholder" :header="header" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-t border-slate-200 hover:bg-slate-50"
          >
            <td v-for="cell in row.getAllCells()" :key="cell.id" class="px-3 py-2">
              <template v-if="cell.column.id === 'actions'">
                <Link
                  :href="`/reports/${(row.original as any).id}`"
                  class="text-brand-indigo-700 hover:text-brand-indigo-500 hover:underline font-medium"
                  >View</Link
                >
              </template>
              <template v-else-if="cell.column.id === 'status'">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="statusBadge(cell.getValue() as string)"
                  >{{ cell.getValue() }}</span
                >
              </template>
              <template v-else-if="cell.column.id === 'priority'">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="priorityBadge(cell.getValue() as string)"
                  >{{ cell.getValue() }}</span
                >
              </template>
              <template v-else>
                <FlexRender :cell="cell" />
              </template>
            </td>
          </tr>
          <tr v-if="table.getRowModel().rows.length === 0">
            <td colspan="8" class="text-center py-8">
              <div v-if="isFiltered" class="text-sm text-slate-600">
                No reports match your filters.
                <button
                  class="ml-2 text-sm font-medium text-brand-indigo-700 hover:text-brand-indigo-500"
                  @click="clearFilters"
                >
                  Clear filters
                </button>
              </div>
              <div v-else class="flex flex-col items-center gap-3">
                <div
                  class="h-20 w-full max-w-md mx-auto rounded-lg flex items-center justify-center"
                  style="background: linear-gradient(135deg, #4338ca 0%, #0d9488 100%)"
                >
                  <span class="text-white/90 text-sm font-medium">No reports yet</span>
                </div>
                <p class="text-sm text-slate-600">
                  Your widget will populate this table once reports arrive.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="props.meta" class="mt-4 text-sm text-slate-500">
      Page {{ props.meta.current_page }} of {{ props.meta.last_page }} —
      {{ props.meta.total }} total
    </div>
  </div>
</template>
