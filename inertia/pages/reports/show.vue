<script setup lang="ts">
import { ref } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'

type FieldValue = { fieldKey: string; value: string | null }

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

const props = defineProps<{ report: Report }>()

const status = ref(props.report.status)
const priority = ref(props.report.priority)

function updateReport() {
  router.patch(
    `/reports/${props.report.id}`,
    { status: status.value, priority: priority.value },
    { preserveScroll: true }
  )
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
            <a :href="props.report.pageUrl" target="_blank" class="text-blue-600 hover:underline">{{
              props.report.pageUrl
            }}</a>
          </p>
        </div>
        <span class="text-xs border px-2 py-1 rounded bg-gray-50"
          >{{ props.report.status }} / {{ props.report.priority }}</span
        >
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
        <button class="text-sm px-3 py-1 bg-black text-white rounded" @click="updateReport">
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
  </div>
</template>
