<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Head, router, useForm, usePage } from '@inertiajs/vue3'
import { ChevronDown, Download, X } from '@lucide/vue'
import AppShell from '~/layouts/app_shell.vue'
import ReportPill from '~/components/report_pill.vue'
import ReportCard from '~/components/report_card.vue'
import ReportAvatar from '~/components/report_avatar.vue'
import {
  initialsFromName,
  priorityLabel,
  priorityPillClasses,
  relativeTime,
  statusLabel,
  statusPillClasses,
  useReportDisplay,
  type ReportView,
} from '~/composables/use_report_display'

type ThreadMessage = {
  id: number
  direction: string
  authorType: string
  authorName: string
  authorInitials: string | null
  body: string
  createdAt: string
}

type AssignableUser = {
  id: number
  name: string
  initials: string
  email: string
}

defineOptions({ layout: AppShell })

const props = defineProps<{
  report: ReportView
  thread: ThreadMessage[]
  assignableUsers: AssignableUser[]
}>()

const page = usePage<any>()

const {
  reporterName,
  reporterInitials,
  reference,
  environmentRows,
  descriptionFields,
  extraFields,
} = useReportDisplay(() => props.report)

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'not_now', label: 'Not Now' },
]

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

const pillSelectClasses =
  'h-auto appearance-none border-0 bg-none rounded-[20px] py-[5px] pl-3 pr-8 font-heading text-[12px] font-bold focus:outline-none focus:ring-2 focus:ring-accent'

function patchReport(payload: Record<string, string | number | null>) {
  router.patch(`/reports/${props.report.id}`, payload, { preserveScroll: true })
}

const status = computed({
  get: () => props.report.status,
  set: (value: string) => patchReport({ status: value }),
})

const priority = computed({
  get: () => props.report.priority,
  set: (value: string) => patchReport({ priority: value }),
})

const assignee = computed({
  get: () => props.report.assigneeId ?? '',
  set: (value: string | number) => patchReport({ assigneeId: value === '' ? null : value }),
})

const selectedAssignable = computed(() =>
  props.assignableUsers.find((user) => user.id === props.report.assigneeId)
)

const hasScreenshot = computed(() => {
  const url = props.report.screenshotUrl
  return !!url && (url.startsWith('data:image') || url.startsWith('http'))
})

const screenshotSrc = computed(() => `/reports/${props.report.id}/screenshot`)
const screenshotOpen = ref(false)

function openScreenshot() {
  screenshotOpen.value = true
}

function closeScreenshot() {
  screenshotOpen.value = false
}

function onWindowKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && screenshotOpen.value) closeScreenshot()
}

onMounted(() => window.addEventListener('keydown', onWindowKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onWindowKeydown))

function formatDate(iso?: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function prettyJson(value: unknown): string {
  if (value === null || value === undefined) return 'None recorded'
  if (Array.isArray(value) && value.length === 0) return 'None recorded'
  return JSON.stringify(value, null, 2)
}

const replyForm = useForm({ body: '' })

function sendReply() {
  replyForm.post(`/api/reports/${props.report.id}/messages`, {
    preserveScroll: true,
    onSuccess: () => {
      replyForm.reset()
      router.reload({ only: ['thread'] })
    },
  })
}
</script>

<template>
  <Head :title="props.report.title" />

  <div class="flex items-start gap-8">
    <!-- Main column -->
    <div class="flex min-w-0 flex-1 flex-col gap-6">
      <!-- Header -->
      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <ReportPill :class="statusPillClasses(props.report.status)">
            {{ statusLabel(props.report.status) }}
          </ReportPill>
          <ReportPill :class="priorityPillClasses(props.report.priority)">
            {{ priorityLabel(props.report.priority) }} Priority
          </ReportPill>
          <ReportPill v-if="props.report.template" class="bg-type-bg text-type-fg">
            {{ props.report.template.name }}
          </ReportPill>
        </div>

        <h1
          class="font-heading text-[26px] font-bold leading-[1.25] tracking-[-0.26px] text-ink-900"
        >
          {{ props.report.title }}
        </h1>

        <p class="font-heading text-[14px] text-ink-600">
          Reported by {{ reporterName }} · {{ relativeTime(props.report.createdAt) }} ·
          {{ reference }}
        </p>
      </div>

      <!-- Description -->
      <ReportCard label="DESCRIPTION">
        <div v-if="descriptionFields.length === 0" class="font-heading text-[14px] text-ink-600">
          No description provided.
        </div>
        <div v-else class="flex flex-col gap-4">
          <p
            v-for="field in descriptionFields"
            :key="field.fieldKey"
            class="whitespace-pre-wrap font-heading text-[14px] leading-[1.65] text-ink-900"
          >
            {{ field.value }}
          </p>
        </div>
      </ReportCard>

      <!-- Attachments -->
      <ReportCard label="ATTACHMENTS">
        <div
          v-if="hasScreenshot"
          class="flex items-center gap-3 rounded-[10px] bg-surface py-2.5 pr-3.5 pl-2.5"
        >
          <button
            type="button"
            class="flex min-w-0 flex-1 cursor-pointer items-center gap-3 bg-transparent p-0 text-left"
            aria-label="View screenshot"
            @click="openScreenshot"
          >
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-status-bg"
            >
              <span class="size-[18px] rounded-[4px] bg-accent" />
            </span>
            <span class="flex min-w-0 flex-1 flex-col gap-0.5">
              <span class="truncate font-heading text-[13px] font-bold text-ink-900">
                screenshot.png
              </span>
              <span class="font-heading text-[12px] text-ink-600">Screenshot</span>
            </span>
          </button>
          <button
            type="button"
            class="shrink-0 cursor-pointer bg-transparent p-0 font-heading text-[13px] font-bold text-accent hover:underline"
            @click="openScreenshot"
          >
            View
          </button>
        </div>
        <p v-else class="font-heading text-[14px] text-ink-600">No attachments.</p>
      </ReportCard>

      <!-- Environment -->
      <ReportCard label="ENVIRONMENT">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div v-for="row in environmentRows" :key="row.label" class="flex flex-col gap-1">
            <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">
              {{ row.label }}
            </p>
            <p class="break-all font-heading text-[14px] font-medium text-ink-900">
              {{ row.value }}
            </p>
          </div>
        </div>
      </ReportCard>

      <!-- Activity -->
      <ReportCard label="ACTIVITY">
        <p v-if="props.thread.length === 0" class="font-heading text-[14px] text-ink-600">
          No comments yet — start the conversation below.
        </p>
        <div v-else class="flex flex-col gap-5">
          <div v-for="message in props.thread" :key="message.id" class="flex items-start gap-3">
            <ReportAvatar
              :initials="message.authorInitials ?? initialsFromName(message.authorName)"
              :tone="message.authorType === 'team' ? 'indigo' : 'amber'"
            />
            <div class="flex min-w-0 flex-1 flex-col gap-1">
              <div class="flex flex-wrap items-center gap-2">
                <p class="font-heading text-[13px] font-bold text-ink-900">
                  {{ message.authorName }}
                </p>
                <p class="font-heading text-[12px] text-ink-300">
                  {{ relativeTime(message.createdAt) }}
                </p>
              </div>
              <p class="whitespace-pre-wrap font-heading text-[14px] leading-[1.5] text-ink-600">
                {{ message.body }}
              </p>
            </div>
          </div>
        </div>

        <div class="h-px w-full bg-hairline" />

        <form class="flex flex-row items-center gap-3" @submit.prevent="sendReply">
          <ReportAvatar :initials="page.props.user?.initials ?? ''" tone="indigo" />
          <input
            v-model="replyForm.body"
            type="text"
            placeholder="Write a reply..."
            class="h-11 min-w-0 flex-1 rounded-[10px] border-0 bg-surface px-3.5 font-heading text-[14px] text-ink-900 placeholder:text-ink-300 focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <button
            type="submit"
            :disabled="replyForm.processing || !replyForm.body"
            class="shrink-0 rounded-[10px] bg-accent px-5 py-3 font-heading text-[14px] font-bold text-white transition-colors hover:bg-accent-strong disabled:pointer-events-none disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </ReportCard>

      <!-- Diagnostics -->
      <details class="rounded-2xl border border-hairline bg-white">
        <summary
          class="cursor-pointer px-6 py-4 font-heading text-[12px] font-bold tracking-[0.6px] text-label"
        >
          DIAGNOSTICS
        </summary>
        <div class="flex flex-col gap-5 px-6 pb-6">
          <div class="flex flex-col gap-2">
            <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">
              CONSOLE ERRORS
            </p>
            <pre
              class="max-h-56 overflow-auto rounded-[10px] bg-surface p-3 font-mono text-xs text-ink-900"
              >{{ prettyJson(props.report.consoleErrors) }}</pre>
          </div>
          <div class="flex flex-col gap-2">
            <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">
              NETWORK ERRORS
            </p>
            <pre
              class="max-h-56 overflow-auto rounded-[10px] bg-surface p-3 font-mono text-xs text-ink-900"
              >{{ prettyJson(props.report.networkErrors) }}</pre>
          </div>
        </div>
      </details>
    </div>

    <!-- Details sidebar -->
    <aside class="w-[340px] shrink-0">
      <div class="flex flex-col gap-[18px] rounded-2xl border border-hairline bg-white p-5">
        <!-- Status -->
        <div class="flex flex-col gap-2">
          <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">STATUS</p>
          <div class="relative inline-flex w-fit">
            <select
              v-model="status"
              :class="[pillSelectClasses, statusPillClasses(status)]"
              aria-label="Status"
            >
              <option v-for="option in STATUS_OPTIONS" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <ChevronDown
              class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 opacity-60"
            />
          </div>
        </div>

        <div class="h-px w-full bg-hairline" />

        <!-- Priority -->
        <div class="flex flex-col gap-2">
          <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">PRIORITY</p>
          <div class="relative inline-flex w-fit">
            <select
              v-model="priority"
              :class="[pillSelectClasses, priorityPillClasses(priority)]"
              aria-label="Priority"
            >
              <option v-for="option in PRIORITY_OPTIONS" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <ChevronDown
              class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 opacity-60"
            />
          </div>
        </div>

        <div class="h-px w-full bg-hairline" />

        <!-- Assignee -->
        <div class="flex flex-col gap-2">
          <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">ASSIGNEE</p>
          <div class="relative inline-flex w-fit">
            <ReportAvatar
              v-if="selectedAssignable"
              :initials="selectedAssignable.initials"
              tone="indigo"
              size="xs"
              class="pointer-events-none absolute top-1/2 left-1.5 z-10 -translate-y-1/2"
            />
            <select
              v-model="assignee"
              aria-label="Assignee"
              :class="[
                pillSelectClasses,
                selectedAssignable ? 'bg-surface text-ink-900 pl-8' : 'bg-type-bg text-ink-600',
              ]"
            >
              <option value="">Unassigned</option>
              <option v-for="user in props.assignableUsers" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
            <ChevronDown
              class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 opacity-60"
            />
          </div>
        </div>

        <div class="h-px w-full bg-hairline" />

        <!-- Reporter -->
        <div class="flex flex-col gap-2">
          <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">REPORTER</p>
          <div class="flex items-center gap-2">
            <ReportAvatar :initials="reporterInitials" tone="teal" size="sm" />
            <div class="min-w-0">
              <p class="font-heading text-[14px] font-medium text-ink-900">{{ reporterName }}</p>
              <p class="truncate font-heading text-[12px] text-ink-600">
                {{ props.report.reporterEmail ?? '—' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Extra template fields -->
        <template v-for="field in extraFields" :key="field.fieldKey">
          <div class="h-px w-full bg-hairline" />
          <div class="flex flex-col gap-2">
            <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300 uppercase">
              {{ field.label }}
            </p>
            <p class="font-heading text-[14px] font-medium whitespace-pre-wrap text-ink-900">
              {{ field.value ?? '—' }}
            </p>
          </div>
        </template>

        <div class="h-px w-full bg-hairline" />

        <!-- Created -->
        <div class="flex flex-col gap-2">
          <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">CREATED</p>
          <p class="font-heading text-[14px] font-medium text-ink-900">
            {{ formatDate(props.report.createdAt) }}
          </p>
        </div>

        <div class="h-px w-full bg-hairline" />

        <!-- Updated -->
        <div class="flex flex-col gap-2">
          <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">UPDATED</p>
          <p class="font-heading text-[14px] font-medium text-ink-900">
            {{ relativeTime(props.report.updatedAt) }}
          </p>
        </div>
      </div>
    </aside>
  </div>

  <!-- Screenshot preview lightbox -->
  <Teleport to="body">
    <div
      v-if="screenshotOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/75 p-6"
      @click.self="closeScreenshot"
    >
      <div
        class="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div class="flex items-center justify-between border-b border-hairline px-5 py-3.5">
          <p class="font-heading text-[13px] font-bold text-ink-900">screenshot.png</p>
          <div class="flex items-center gap-2">
            <a
              :href="screenshotSrc"
              :download="true"
              class="inline-flex cursor-pointer items-center gap-1.5 rounded-[10px] bg-surface px-3.5 py-2 font-heading text-[13px] font-bold text-ink-900 transition-colors hover:bg-hairline/60"
            >
              <Download class="size-4" /> Download
            </a>
            <button
              type="button"
              class="flex size-8 cursor-pointer items-center justify-center rounded-full bg-surface text-ink-600 transition-colors hover:bg-hairline/60 hover:text-ink-900"
              aria-label="Close preview"
              @click="closeScreenshot"
            >
              <X class="size-4" />
            </button>
          </div>
        </div>
        <div class="flex min-h-0 flex-1 items-center justify-center bg-ink-900/95 p-4">
          <img
            :src="screenshotSrc"
            alt="Report screenshot"
            class="max-h-[calc(90vh-6rem)] max-w-full rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
