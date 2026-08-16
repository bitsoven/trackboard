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
    open: 'bg-green-100 text-green-700',
    in_progress: 'bg-amber-100 text-amber-700',
    pending_verification: 'bg-purple-100 text-purple-700',
    resolved: 'bg-blue-100 text-blue-700',
    closed: 'bg-gray-200 text-gray-600',
  }
  return map[statusValue] ?? 'bg-gray-100 text-gray-700'
}

function priorityBadge(priorityValue: string): string {
  const map: Record<string, string> = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
  }
  return map[priorityValue] ?? 'bg-gray-100 text-gray-700'
}
</script>

<template>
  <Head :title="props.report.title" />

  <div class="max-w-5xl mx-auto p-6">
    <Link href="/reports" class="text-sm text-gray-500 hover:underline">← Back to reports</Link>

    <div class="mt-4 bg-white border rounded p-4">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-xl font-semibold">{{ props.report.title }}</h1>
          <p class="text-sm text-gray-500">
            #{{ props.report.id }} · {{ props.report.project?.name ?? 'Unknown project' }} ·
            {{ props.report.createdAt ? new Date(props.report.createdAt).toLocaleString() : '' }}
          </p>
          <p class="text-sm mt-1">Reporter: {{ props.report.reporterEmail }}</p>
          <p v-if="props.report.pageUrl" class="text-sm">
            Page:
            <a :href="props.report.pageUrl" target="_blank" class="text-brand hover:underline">{{
              props.report.pageUrl
            }}</a>
          </p>
        </div>
        <div class="flex gap-2">
          <span
            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            :class="statusBadge(props.report.status)"
            >{{ props.report.status }}</span
          >
          <span
            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            :class="priorityBadge(props.report.priority)"
            >{{ props.report.priority }}</span
          >
        </div>
      </div>

      <div class="mt-4 flex gap-3">
        <select v-model="status" class="border rounded px-2 py-1 text-sm">
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="resolved">resolved</option>
          <option value="closed">closed</option>
        </select>
        <select v-model="priority" class="border rounded px-2 py-1 text-sm">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
          <option value="critical">critical</option>
        </select>
        <button
          class="text-sm px-3 py-1 bg-brand text-white rounded-md hover:bg-brand-dark"
          @click="updateReport"
        >
          Update
        </button>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-white border rounded p-4">
        <h2 class="font-medium mb-2">Custom fields</h2>
        <div v-if="props.report.fieldValues.length === 0" class="text-sm text-gray-500">
          No custom fields
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="fv in props.report.fieldValues"
            :key="fv.fieldKey"
            class="flex justify-between text-sm border-b py-1"
          >
            <span class="font-medium">{{ fv.fieldKey }}</span>
            <span class="text-gray-600">{{ fv.value }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white border rounded p-4">
        <h2 class="font-medium mb-2">Screenshot</h2>
        <div v-if="props.report.screenshotUrl">
          <img
            :src="props.report.screenshotUrl"
            alt="screenshot"
            class="max-w-full border rounded"
          />
          <p class="text-xs text-gray-500 mt-1 break-all">{{ props.report.screenshotUrl }}</p>
        </div>
        <p v-else class="text-sm text-gray-500">No screenshot</p>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-white border rounded p-4">
        <h3 class="font-medium mb-2">Browser info</h3>
        <pre class="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-64">{{
          JSON.stringify(props.report.browserInfo, null, 2)
        }}</pre>
      </div>
      <div class="bg-white border rounded p-4">
        <h3 class="font-medium mb-2">Console errors</h3>
        <pre class="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-64">{{
          JSON.stringify(props.report.consoleErrors, null, 2)
        }}</pre>
      </div>
      <div class="bg-white border rounded p-4">
        <h3 class="font-medium mb-2">Network errors</h3>
        <pre class="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-64">{{
          JSON.stringify(props.report.networkErrors, null, 2)
        }}</pre>
      </div>
    </div>

    <div class="mt-6 bg-white border rounded p-4">
      <h2 class="font-medium mb-3">Conversation</h2>
      <div v-if="props.thread.length === 0" class="text-sm text-gray-500">No messages yet.</div>
      <div v-else class="space-y-3">
        <div
          v-for="message in props.thread"
          :key="message.id"
          class="flex"
          :class="message.direction === 'outbound' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[80%] rounded p-3 text-sm"
            :class="
              message.direction === 'outbound' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-900'
            "
          >
            <p class="text-xs opacity-70 mb-1">
              {{ message.authorName }} ·
              {{ message.createdAt ? new Date(message.createdAt).toLocaleString() : '' }}
            </p>
            <p class="whitespace-pre-wrap">{{ message.body }}</p>
          </div>
        </div>
      </div>

      <form class="mt-4" @submit.prevent="sendReply">
        <textarea
          v-model="replyForm.body"
          rows="3"
          class="w-full border rounded p-2 text-sm"
          placeholder="Write a reply to the reporter…"
        ></textarea>
        <button
          type="submit"
          class="mt-2 text-sm px-3 py-1 bg-brand text-white rounded-md disabled:opacity-50"
          :disabled="replyForm.processing || !replyForm.body"
        >
          Send reply
        </button>
      </form>
    </div>
  </div>
</template>
