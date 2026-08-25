<script setup lang="ts">
import { ref } from 'vue'
import { Head, router, useForm } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'

type FieldValue = { fieldKey: string; value: string | null }

type Message = {
  id: number
  direction: string
  authorType: string
  authorName: string
  body: string
  createdAt: string
}

type Report = {
  id: number
  projectId: number
  templateId: number | null
  title: string
  status: string
  priority: string
  reporterEmail: string
  reporterVerifiedAt: string | null
  pageUrl: string | null
  browserInfo: any
  consoleErrors: any
  networkErrors: any
  screenshotUrl: string | null
  assigneeId: number | null
  createdAt: string | null
  updatedAt: string | null
  fieldValues: FieldValue[]
  project: { id: number; name: string; slug: string } | null
}

const props = defineProps<{ report: Report; thread: Message[] }>()

const status = ref(props.report.status)
const priority = ref(props.report.priority)

function updateReport() {
  router.patch(
    `/reports/${props.report.id}`,
    { status: status.value, priority: priority.value },
    { preserveScroll: true }
  )
}

const replyForm = useForm({
  body: '',
})

function sendReply() {
  replyForm.post(`/api/reports/${props.report.id}/messages`, {
    preserveScroll: true,
    onSuccess: () => {
      replyForm.reset()
      router.reload({ only: ['thread'] })
    },
  })
}

function statusBadge(statusValue: string): string {
  const map: Record<string, string> = {
    open: 'bg-brand-indigo-500 text-white',
    in_progress: 'bg-amber-100 text-amber-700',
    pending_verification: 'bg-slate-100 text-slate-600 border border-dashed border-slate-300',
    resolved: 'bg-brand-teal-600 text-white',
    closed: 'bg-slate-200 text-slate-600',
  }
  return map[statusValue] ?? 'bg-slate-100 text-slate-700'
}

function priorityBadge(priorityValue: string): string {
  const map: Record<string, string> = {
    low: 'bg-slate-100 text-slate-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
  }
  return map[priorityValue] ?? 'bg-slate-100 text-slate-700'
}
</script>

<template>
  <Head :title="props.report.title" />

  <div class="max-w-7xl mx-auto p-6">
    <Link href="/reports" class="text-sm text-slate-500 hover:text-brand-indigo-700 hover:underline"
      >← Back to reports</Link
    >

    <div class="mt-3 flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-xl font-semibold tracking-tight truncate">{{ props.report.title }}</h1>
        <p class="text-sm text-slate-500 mt-1">
          #{{ props.report.id }} · {{ props.report.project?.name ?? 'Unknown project' }} ·
          {{ props.report.createdAt ? new Date(props.report.createdAt).toLocaleString() : '' }}
        </p>
        <p class="text-sm mt-1">
          Reporter: <span class="font-medium">{{ props.report.reporterEmail }}</span>
          <span
            v-if="props.report.reporterVerifiedAt"
            class="ml-2 inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded bg-brand-teal-600/10 text-brand-teal-600"
          >
            ✓ verified
          </span>
        </p>
      </div>
      <div class="flex gap-2 shrink-0">
        <span
          class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
          :class="statusBadge(props.report.status)"
          >{{ props.report.status }}</span
        >
        <span
          class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
          :class="priorityBadge(props.report.priority)"
          >{{ props.report.priority }}</span
        >
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left: metadata -->
      <div class="lg:col-span-3 space-y-4">
        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div class="px-4 py-3 border-b border-slate-200">
            <h2 class="text-sm font-semibold">Screenshot</h2>
          </div>
          <div class="p-4">
            <div v-if="props.report.screenshotUrl">
              <img
                :src="props.report.screenshotUrl"
                alt="screenshot"
                class="w-full border border-slate-200 rounded-lg"
              />
              <p class="text-xs text-slate-500 mt-2 break-all">{{ props.report.screenshotUrl }}</p>
            </div>
            <p v-else class="text-sm text-slate-500 py-4 text-center">No screenshot</p>
          </div>
        </div>

        <div v-if="props.report.pageUrl" class="bg-white border border-slate-200 rounded-xl p-4">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
            Page URL
          </h3>
          <a
            :href="props.report.pageUrl"
            target="_blank"
            class="text-sm text-brand-indigo-700 hover:text-brand-indigo-500 break-all hover:underline"
            >{{ props.report.pageUrl }}</a
          >
        </div>

        <div class="bg-white border border-slate-200 rounded-xl p-4">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
            Browser info
          </h3>
          <pre
            class="text-xs bg-slate-50 border border-slate-200 p-3 rounded-lg overflow-auto max-h-48"
            >{{ JSON.stringify(props.report.browserInfo, null, 2) }}</pre>
        </div>

        <div class="bg-white border border-slate-200 rounded-xl p-4">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
            Console errors
          </h3>
          <pre
            class="text-xs bg-slate-50 border border-slate-200 p-3 rounded-lg overflow-auto max-h-48"
            >{{ JSON.stringify(props.report.consoleErrors, null, 2) }}</pre>
        </div>

        <div class="bg-white border border-slate-200 rounded-xl p-4">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
            Network errors
          </h3>
          <pre
            class="text-xs bg-slate-50 border border-slate-200 p-3 rounded-lg overflow-auto max-h-48"
            >{{ JSON.stringify(props.report.networkErrors, null, 2) }}</pre>
        </div>
      </div>

      <!-- Center: conversation -->
      <div class="lg:col-span-5">
        <div
          class="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col min-h-[480px]"
        >
          <div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h2 class="text-sm font-semibold">Conversation</h2>
            <span class="text-xs text-slate-500">{{ props.thread.length }} messages</span>
          </div>

          <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            <div v-if="props.thread.length === 0" class="text-sm text-slate-500 text-center py-12">
              No messages yet — reply to start the thread.
            </div>
            <div
              v-for="message in props.thread"
              :key="message.id"
              class="flex"
              :class="message.direction === 'outbound' ? 'justify-end' : 'justify-start'"
            >
              <div
                class="max-w-[82%] rounded-2xl px-4 py-3 text-sm shadow-sm"
                :class="
                  message.direction === 'outbound'
                    ? 'bg-indigo-50 text-brand-indigo-700 border border-indigo-200'
                    : 'bg-white text-slate-900 border border-slate-200'
                "
              >
                <p class="text-xs font-medium mb-1 opacity-70">
                  {{ message.authorName }} ·
                  {{ message.createdAt ? new Date(message.createdAt).toLocaleString() : '' }}
                </p>
                <p class="whitespace-pre-wrap leading-relaxed">{{ message.body }}</p>
              </div>
            </div>
          </div>

          <form class="p-4 border-t border-slate-200 bg-white" @submit.prevent="sendReply">
            <textarea
              v-model="replyForm.body"
              rows="3"
              class="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo-500 focus:border-brand-indigo-500"
              placeholder="Write a reply to the reporter…"
            ></textarea>
            <div class="mt-3 flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 bg-brand-indigo-700 text-white rounded-md text-sm font-medium hover:bg-brand-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="replyForm.processing || !replyForm.body"
              >
                Send reply
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right: action panel -->
      <div class="lg:col-span-4 space-y-4">
        <div class="bg-white border border-slate-200 rounded-xl p-4 lg:sticky lg:top-6">
          <h2 class="text-sm font-semibold mb-3">Actions</h2>
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Status</label>
              <select
                v-model="status"
                class="w-full border border-slate-300 rounded-md px-2.5 py-2 text-sm bg-white"
              >
                <option value="open">open</option>
                <option value="in_progress">in_progress</option>
                <option value="resolved">resolved</option>
                <option value="closed">closed</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Priority</label>
              <select
                v-model="priority"
                class="w-full border border-slate-300 rounded-md px-2.5 py-2 text-sm bg-white"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="critical">critical</option>
              </select>
            </div>
            <button
              class="w-full px-4 py-2 bg-brand-indigo-700 text-white rounded-md text-sm font-medium hover:bg-brand-indigo-500"
              @click="updateReport"
            >
              Update report
            </button>
          </div>

          <div class="mt-6 pt-6 border-t border-slate-200">
            <h3 class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
              Assignee
            </h3>
            <p class="text-sm">
              <span v-if="props.report.assigneeId" class="inline-flex items-center gap-2">
                <span
                  class="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium"
                  >{{ String(props.report.assigneeId).slice(0, 2) }}</span
                >
                #{{ props.report.assigneeId }}
              </span>
              <span v-else class="text-slate-500">Unassigned</span>
            </p>
          </div>

          <div class="mt-4">
            <h3 class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
              Template fields
            </h3>
            <div v-if="props.report.fieldValues.length === 0" class="text-sm text-slate-500">
              No custom fields
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="fv in props.report.fieldValues"
                :key="fv.fieldKey"
                class="flex justify-between gap-3 text-sm py-2 border-b border-slate-100 last:border-0"
              >
                <span class="font-medium text-slate-700 shrink-0">{{ fv.fieldKey }}</span>
                <span class="text-slate-600 text-right truncate">{{ fv.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-slate-500">
            Linked GitHub issue
          </h3>
          <p class="text-sm text-slate-500 mt-1">
            No issue linked. Connect via Integrations to create one.
          </p>
          <Link
            :href="`/projects/${props.report.projectId}/integrations`"
            class="inline-flex mt-3 text-xs font-medium text-brand-indigo-700 hover:text-brand-indigo-500"
            >Go to Integrations →</Link
          >
        </div>
      </div>
    </div>
  </div>
</template>
