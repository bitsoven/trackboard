<script setup lang="ts">
import { ref } from 'vue'
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
  projectFilter.value = ''
  applyFilters()
}

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
      <h1 class="text-2xl font-semibold">Reports</h1>
      <Link href="/" class="text-sm text-gray-500 hover:underline">← Home</Link>
    </div>

    <div class="flex flex-wrap gap-3 mb-4 p-3 border rounded bg-white">
      <select v-model="projectFilter" class="border rounded px-2 py-1 text-sm">
        <option value="">All projects</option>
        <option v-for="p in props.projects" :key="p.id" :value="String(p.id)">{{ p.name }}</option>
      </select>
      <select v-model="statusFilter" class="border rounded px-2 py-1 text-sm">
        <option value="">All statuses</option>
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="resolved">resolved</option>
        <option value="closed">closed</option>
      </select>
      <select v-model="priorityFilter" class="border rounded px-2 py-1 text-sm">
        <option value="">All priorities</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
        <option value="critical">critical</option>
      </select>
      <button class="text-sm px-3 py-1 bg-black text-white rounded" @click="applyFilters">
        Apply
      </button>
      <button class="text-sm px-3 py-1 border rounded" @click="clearFilters">Clear</button>
    </div>

    <div class="border rounded bg-white overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="text-left px-3 py-2 font-medium"
            >
              <FlexRender v-if="!header.isPlaceholder" :header="header" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-t hover:bg-gray-50"
          >
            <td v-for="cell in row.getAllCells()" :key="cell.id" class="px-3 py-2">
              <template v-if="cell.column.id === 'actions'">
                <Link
                  :href="`/reports/${(row.original as any).id}`"
                  class="text-blue-600 hover:underline"
                  >View</Link
                >
              </template>
              <template v-else>
                <FlexRender :cell="cell" />
              </template>
            </td>
          </tr>
          <tr v-if="table.getRowModel().rows.length === 0">
            <td colspan="8" class="text-center py-8 text-gray-500">No reports found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="props.meta" class="mt-4 text-sm text-gray-500">
      Page {{ props.meta.current_page }} of {{ props.meta.last_page }} —
      {{ props.meta.total }} total
    </div>
  </div>
</template>
