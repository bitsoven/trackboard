<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Head, router, useForm } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { toast } from 'vue-sonner'
import AppShell from '~/layouts/app_shell.vue'
import ReportAvatar from '~/components/report_avatar.vue'
import TbButton from '~/components/ui/tb_button.vue'
import TbInput from '~/components/ui/tb_input.vue'
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

type TemplateField = {
  key: string
  label: string
  type: string
  isRequired: boolean
  options: Record<string, any> | null
  sortOrder: number
}

type ProjectWithTemplates = {
  id: number
  name: string
  slug: string
  templates: {
    id: number
    name: string
    isDefault: boolean
    fields: TemplateField[]
  }[]
}

defineOptions({ layout: AppShell })

const props = defineProps<{
  columns: BoardColumn[]
  projects: ProjectWithTemplates[]
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

// Manual report creation
const showCreateModal = ref(false)
const selectedProjectId = ref<number | null>(null)
const selectedTemplateId = ref<number | null>(null)

const createForm = useForm({
  projectId: null as number | null,
  templateId: null as number | null,
  title: '',
  priority: 'medium' as string,
  fieldValues: {} as Record<string, any>,
})

const selectedProject = computed(
  () => props.projects.find((p) => p.id === selectedProjectId.value) ?? null
)

const availableTemplates = computed(() => selectedProject.value?.templates ?? [])

const selectedTemplate = computed(
  () => availableTemplates.value.find((t) => t.id === selectedTemplateId.value) ?? null
)

const dynamicFields = computed(() => {
  if (!selectedTemplate.value) return []
  return [...selectedTemplate.value.fields].sort((a, b) => a.sortOrder - b.sortOrder)
})

function openCreateModal(prefillColumn: BoardColumn['key'] | null = null) {
  if (props.projects.length === 0) {
    toast.error('Create a project first to file reports')
    return
  }
  // Default to first project
  const firstProject = props.projects[0]
  selectedProjectId.value = firstProject.id
  const defaultTpl = firstProject.templates.find((t) => t.isDefault) ?? firstProject.templates[0]
  selectedTemplateId.value = defaultTpl ? defaultTpl.id : null
  createForm.reset()
  createForm.clearErrors()
  createForm.projectId = firstProject.id
  createForm.templateId = defaultTpl ? defaultTpl.id : null
  createForm.title = ''
  createForm.priority = 'medium'
  createForm.fieldValues = {}
  // PrefillColumn could set initial status, but modal always creates as open
  void prefillColumn
  showCreateModal.value = true
}

function closeCreateModal() {
  showCreateModal.value = false
}

function onProjectChange() {
  const proj = props.projects.find((p) => p.id === selectedProjectId.value)
  if (!proj) return
  createForm.projectId = proj.id
  const def = proj.templates.find((t) => t.isDefault) ?? proj.templates[0]
  selectedTemplateId.value = def ? def.id : null
  createForm.templateId = def ? def.id : null
  createForm.fieldValues = {}
  createForm.clearErrors()
}

function onTemplateChange() {
  createForm.templateId = selectedTemplateId.value
  createForm.fieldValues = {}
  createForm.clearErrors()
}

function fieldError(key: string) {
  return (createForm.errors as any)[`fieldValues.${key}`] ?? (createForm.errors as any)[key]
}

function submitCreate() {
  createForm.transform((data) => ({
    projectId: selectedProjectId.value,
    templateId: selectedTemplateId.value,
    title: data.title,
    priority: data.priority,
    fieldValues: data.fieldValues,
  }))
  createForm.post('/reports', {
    preserveScroll: true,
    onSuccess: () => {
      closeCreateModal()
      toast.success('Report created')
    },
  })
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
        @click="openCreateModal(null)"
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
            @click="openCreateModal(column.key)"
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
          @click="openCreateModal(column.key)"
        >
          + Add report
        </button>
      </div>
    </div>

    <!-- Create Report Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      @click.self="closeCreateModal"
    >
      <div class="max-h-[90vh] w-full max-w-xl overflow-auto rounded-2xl bg-white p-6 shadow-xl">
        <div class="flex items-center justify-between">
          <h2 class="font-heading text-[18px] font-bold text-ink-900">Fill a report</h2>
          <button
            type="button"
            class="flex size-8 items-center justify-center rounded-full bg-surface text-ink-600 hover:bg-hairline"
            @click="closeCreateModal"
          >
            ✕
          </button>
        </div>
        <p class="mt-1 font-heading text-[13px] text-ink-600">
          Choose a project and report type. Fields update per template.
        </p>

        <div
          v-if="props.projects.length === 0"
          class="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center"
        >
          <p class="font-heading text-[14px] font-medium text-ink-900">No projects yet</p>
          <p class="mt-1 font-heading text-[13px] text-ink-600">
            Create a project to start filing reports.
          </p>
          <Link
            href="/projects"
            class="mt-3 inline-flex rounded-[10px] bg-accent px-4 py-2 font-heading text-[13px] font-bold text-white hover:bg-accent-strong"
          >
            Go to Projects
          </Link>
        </div>

        <form v-else class="mt-6 flex flex-col gap-5" @submit.prevent="submitCreate">
          <!-- Project -->
          <div class="flex flex-col gap-1.5">
            <label class="font-heading text-[13px] font-bold text-ink-900">Project</label>
            <select
              v-model="selectedProjectId"
              class="h-11 w-full rounded-[10px] border border-hairline bg-white px-3 font-heading text-[14px] text-ink-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
              @change="onProjectChange"
            >
              <option v-for="p in props.projects" :key="p.id" :value="p.id">
                {{ p.name }} — /{{ p.slug }}
              </option>
            </select>
            <p v-if="createForm.errors.projectId" class="font-heading text-[12px] text-red-500">
              {{ createForm.errors.projectId }}
            </p>
          </div>

          <!-- Report type -->
          <div class="flex flex-col gap-1.5">
            <label class="font-heading text-[13px] font-bold text-ink-900">Report type</label>
            <select
              v-model="selectedTemplateId"
              class="h-11 w-full rounded-[10px] border border-hairline bg-white px-3 font-heading text-[14px] text-ink-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
              @change="onTemplateChange"
            >
              <option v-if="availableTemplates.length === 0" :value="null" disabled>
                No templates for this project
              </option>
              <option v-for="t in availableTemplates" :key="t.id" :value="t.id">
                {{ t.name }}
              </option>
            </select>
            <p v-if="createForm.errors.templateId" class="font-heading text-[12px] text-red-500">
              {{ createForm.errors.templateId }}
            </p>
            <p v-if="selectedTemplate" class="font-heading text-[12px] text-ink-300">
              {{ selectedTemplate.fields.length }} field(s) —
              {{ selectedTemplate.isDefault ? 'default' : 'custom' }}
            </p>
          </div>

          <!-- Title -->
          <TbInput
            id="create-title"
            v-model="createForm.title"
            label="Title"
            placeholder="Short summary"
            :error="(createForm.errors as any).title"
          />

          <!-- Priority -->
          <div class="flex flex-col gap-1.5">
            <label class="font-heading text-[13px] font-bold text-ink-900">Priority</label>
            <select
              v-model="createForm.priority"
              class="h-11 w-full rounded-[10px] border border-hairline bg-white px-3 font-heading text-[14px] text-ink-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <!-- Dynamic fields -->
          <div
            v-if="dynamicFields.length > 0"
            class="flex flex-col gap-4 rounded-xl border border-hairline bg-surface/50 p-4"
          >
            <p class="font-heading text-[12px] font-bold tracking-[0.44px] text-ink-300">DETAILS</p>
            <div v-for="field in dynamicFields" :key="field.key" class="flex flex-col gap-1.5">
              <label class="font-heading text-[13px] font-bold text-ink-900">
                {{ field.label }}
                <span v-if="field.isRequired" class="text-red-500">*</span>
              </label>

              <textarea
                v-if="field.type === 'textarea'"
                :value="createForm.fieldValues[field.key] ?? ''"
                :placeholder="field.label"
                rows="3"
                class="min-h-[80px] w-full rounded-[10px] border border-hairline bg-white px-3 py-2.5 font-heading text-[14px] text-ink-900 placeholder:text-ink-300 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                @input="
                  createForm.fieldValues[field.key] = ($event.target as HTMLTextAreaElement).value
                "
              />
              <select
                v-else-if="field.type === 'select' || field.type === 'radio'"
                :value="createForm.fieldValues[field.key] ?? ''"
                class="h-11 w-full rounded-[10px] border border-hairline bg-white px-3 font-heading text-[14px] text-ink-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                @change="
                  createForm.fieldValues[field.key] = ($event.target as HTMLSelectElement).value
                "
              >
                <option value="" disabled>Select {{ field.label }}</option>
                <option
                  v-for="choice in field.options?.choices ?? []"
                  :key="choice"
                  :value="choice"
                >
                  {{ choice }}
                </option>
              </select>
              <div v-else-if="field.type === 'checkbox'" class="flex flex-wrap gap-2">
                <label
                  v-for="choice in field.options?.choices ?? []"
                  :key="choice"
                  class="flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5 font-heading text-[13px] text-ink-900"
                >
                  <input
                    type="checkbox"
                    :checked="
                      Array.isArray(createForm.fieldValues[field.key]) &&
                      (createForm.fieldValues[field.key] as any[]).includes(choice)
                    "
                    class="rounded border-hairline text-accent focus:ring-accent"
                    @change="
                      (() => {
                        const arr = Array.isArray(createForm.fieldValues[field.key])
                          ? [...(createForm.fieldValues[field.key] as any[])]
                          : []
                        if (($event.target as HTMLInputElement).checked) arr.push(choice)
                        else {
                          const idx = arr.indexOf(choice)
                          if (idx > -1) arr.splice(idx, 1)
                        }
                        createForm.fieldValues[field.key] = arr
                      })()
                    "
                  />
                  {{ choice }}
                </label>
                <p
                  v-if="!field.options?.choices?.length"
                  class="font-heading text-[12px] text-ink-300"
                >
                  No choices configured
                </p>
              </div>
              <input
                v-else-if="field.type === 'number'"
                :value="createForm.fieldValues[field.key] ?? ''"
                type="number"
                :placeholder="field.label"
                class="h-11 w-full rounded-[10px] border border-hairline bg-white px-3 font-heading text-[14px] text-ink-900 placeholder:text-ink-300 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                @input="
                  createForm.fieldValues[field.key] = ($event.target as HTMLInputElement).value
                "
              />
              <input
                v-else-if="field.type === 'date'"
                :value="createForm.fieldValues[field.key] ?? ''"
                type="date"
                class="h-11 w-full rounded-[10px] border border-hairline bg-white px-3 font-heading text-[14px] text-ink-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                @input="
                  createForm.fieldValues[field.key] = ($event.target as HTMLInputElement).value
                "
              />
              <input
                v-else
                :value="createForm.fieldValues[field.key] ?? ''"
                type="text"
                :placeholder="field.label"
                class="h-11 w-full rounded-[10px] border border-hairline bg-white px-3 font-heading text-[14px] text-ink-900 placeholder:text-ink-300 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                @input="
                  createForm.fieldValues[field.key] = ($event.target as HTMLInputElement).value
                "
              />
              <p v-if="fieldError(field.key)" class="font-heading text-[12px] text-red-500">
                {{ fieldError(field.key) }}
              </p>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <TbButton variant="ghost" type="button" @click="closeCreateModal">Cancel</TbButton>
            <TbButton
              variant="accent"
              type="submit"
              :disabled="createForm.processing"
              :loading="createForm.processing"
            >
              Fill a report
            </TbButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
