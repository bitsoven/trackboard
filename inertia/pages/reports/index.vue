<script setup lang="ts">
import { ref, watch } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { toast } from 'vue-sonner'
import AppShell from '~/layouts/app_shell.vue'
import ReportAvatar from '~/components/report_avatar.vue'
import {
  displayNameFromEmail,
  initialsFromName,
  priorityDotClasses,
  priorityLabel,
  relativeTime,
  toneForEmail,
  typeTag,
  typeTagClasses,
} from '~/composables/use_report_display'

type BoardReport = {
  id: string
  number: number | null
  title: string
  status: string
  priority: string
  reporterEmail: string | null
  templateName: string | null
  createdAt: string | null
  updatedAt: string | null
}

type BoardColumn = {
  key: 'new' | 'in_progress' | 'resolved' | 'canceled' | 'not_now'
  label: string
  reports: BoardReport[]
}

defineOptions({ layout: AppShell })

const props = defineProps<{
  columns: BoardColumn[]
}>()

/** Canonical status applied when a card lands in each column. */
const COLUMN_STATUS: Record<BoardColumn['key'], string> = {
  new: 'open',
  in_progress: 'in_progress',
  resolved: 'resolved',
  canceled: 'canceled',
  not_now: 'not_now',
}

const columnDots: Record<BoardColumn['key'], string> = {
  new: 'bg-mark-dot',
  in_progress: 'bg-accent',
  resolved: 'bg-avatar-teal',
  canceled: 'bg-ink-300',
  not_now: 'bg-avatar-amber',
}

/**
 * Local board state so cards move optimistically while the PATCH request is in
 * flight; resynced whenever Inertia delivers fresh columns.
 */
const board = ref<BoardColumn[]>(
  props.columns.map((column) => ({ ...column, reports: [...column.reports] }))
)

watch(
  () => props.columns,
  (next) => {
    board.value = next.map((column) => ({ ...column, reports: [...column.reports] }))
  }
)

const draggingId = ref<string | null>(null)
const dragOverKey = ref<BoardColumn['key'] | null>(null)

function onDragStart(report: BoardReport, event: DragEvent) {
  draggingId.value = report.id
  event.dataTransfer?.setData('text/plain', report.id)
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}

function onDragOver(column: BoardColumn) {
  if (draggingId.value) dragOverKey.value = column.key
}

function onDrop(column: BoardColumn) {
  const id = draggingId.value
  dragOverKey.value = null
  draggingId.value = null
  if (!id) return

  const source = board.value.find((c) => c.reports.some((r) => r.id === id))
  if (!source) return

  const status = COLUMN_STATUS[column.key]
  const report = source.reports.find((r) => r.id === id)
  if (!report) return

  if (source.key === column.key) return

  source.reports = source.reports.filter((r) => r.id !== id)
  column.reports = [...column.reports, { ...report, status }]

  router.patch(
    `/reports/${id}`,
    { status },
    {
      preserveScroll: true,
      preserveState: true,
      onError: () => {
        toast.error('Could not move the report — please try again')
        board.value = props.columns.map((c) => ({ ...c, reports: [...c.reports] }))
      },
    }
  )
}

function onDragEnd() {
  draggingId.value = null
  dragOverKey.value = null
}

function metaText(column: BoardColumn, report: BoardReport): string {
  if (column.key === 'in_progress') return `assigned · ${relativeTime(report.updatedAt)}`
  if (column.key === 'resolved') {
    return `${report.status === 'closed' ? 'closed' : 'resolved'} · ${relativeTime(report.updatedAt)}`
  }
  if (column.key === 'canceled') return `canceled · ${relativeTime(report.updatedAt)}`
  if (column.key === 'not_now') return `parked · ${relativeTime(report.updatedAt)}`
  return relativeTime(report.createdAt)
}

function comingSoon() {
  toast.info('Reports arrive from the widget — manual creation is coming soon')
}
</script>

<template>
  <Head title="Reports" />

  <div class="flex flex-col gap-7">
    <!-- Board header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <h1 class="font-heading text-[28px] font-bold tracking-[-0.28px] text-ink-900">Reports</h1>
        <p class="font-heading text-[15px] text-ink-600">
          Every bug, issue and support case your team is tracking right now.
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-[10px] bg-accent px-[22px] py-[13px] font-heading text-[15px] font-bold text-white transition-colors hover:bg-accent-strong"
        @click="comingSoon"
      >
        <span class="text-[16px]">+</span> New Report
      </button>
    </div>

    <!-- Columns -->
    <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
      <div
        v-for="column in board"
        :key="column.key"
        class="flex min-w-0 flex-col gap-4 rounded-2xl transition-shadow"
        :class="dragOverKey === column.key ? 'ring-2 ring-accent/50' : ''"
        @dragover.prevent="onDragOver(column)"
        @drop.prevent="onDrop(column)"
      >
        <!-- Column header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full" :class="columnDots[column.key]" />
            <p class="font-heading text-[13px] font-bold tracking-[0.65px] text-ink-900">
              {{ column.label.toUpperCase() }}
            </p>
            <span
              class="rounded-[10px] bg-hairline px-2 py-0.5 font-heading text-[11px] font-bold text-ink-600"
            >
              {{ column.reports.length }}
            </span>
          </div>
          <button
            type="button"
            class="flex size-[26px] items-center justify-center rounded-[13px] border border-hairline bg-transparent font-heading text-[14px] font-bold leading-none text-label hover:bg-surface"
            :aria-label="`Add report to ${column.label}`"
            @click="comingSoon"
          >
            +
          </button>
        </div>

        <!-- Cards -->
        <p
          v-if="column.reports.length === 0"
          class="rounded-xl border border-dashed border-hairline bg-white/60 py-8 text-center font-heading text-[13px] text-ink-300"
        >
          Nothing here
        </p>
        <div
          v-for="report in column.reports"
          :key="report.id"
          role="link"
          tabindex="0"
          draggable="true"
          class="flex cursor-pointer flex-col gap-3 rounded-xl border border-hairline bg-white p-4 transition-colors hover:border-accent/40 active:cursor-grabbing"
          :class="draggingId === report.id ? 'opacity-50' : ''"
          @click="router.visit(`/reports/${report.id}`)"
          @keydown.enter.prevent="router.visit(`/reports/${report.id}`)"
          @dragstart="onDragStart(report, $event)"
          @dragend="onDragEnd"
        >
          <div class="flex w-full items-center justify-between">
            <span
              class="inline-flex items-center rounded-md px-2.5 py-1 font-heading text-[11px] font-bold leading-none"
              :class="typeTagClasses(report.templateName)"
            >
              {{ typeTag(report.templateName) }}
            </span>
            <span
              v-if="column.key === 'resolved'"
              class="flex size-[18px] items-center justify-center rounded-full bg-avatar-teal font-heading text-[10px] font-bold text-white"
              title="Resolved"
            >
              ✓
            </span>
            <span
              v-else
              class="size-2 shrink-0 rounded-full"
              :class="priorityDotClasses(report.priority)"
              :title="`${priorityLabel(report.priority)} priority`"
            />
          </div>

          <p class="font-heading text-[14px] font-medium leading-[1.38] text-ink-900">
            {{ report.title }}
          </p>

          <div class="flex w-full items-center justify-between">
            <span class="flex min-w-0 items-center gap-1.5">
              <ReportAvatar
                :initials="initialsFromName(displayNameFromEmail(report.reporterEmail))"
                :tone="toneForEmail(report.reporterEmail)"
                size="xs"
              />
              <span class="truncate font-heading text-[12px] text-label">
                {{ displayNameFromEmail(report.reporterEmail) }}
              </span>
            </span>
            <span class="shrink-0 font-heading text-[12px] text-ink-300">
              {{ metaText(column, report) }}
            </span>
          </div>
        </div>

        <!-- Add ghost -->
        <button
          type="button"
          class="flex w-full items-center justify-center rounded-xl border border-dashed border-hairline bg-transparent p-0 py-3.5 font-heading text-[14px] font-medium text-label transition-colors hover:bg-surface"
          :aria-label="`Add report to ${column.label}`"
          @click="comingSoon"
        >
          + Add report
        </button>
      </div>
    </div>
  </div>
</template>
