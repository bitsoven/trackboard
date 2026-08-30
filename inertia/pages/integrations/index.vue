<script setup lang="ts">
import { computed, ref } from 'vue'
import { Head, router, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'

type ApiKey = {
  id: number
  label: string | null
  keyPreview: string | null
  createdAt: string | null
  revokedAt: string | null
}
type Webhook = {
  id: number
  url: string
  events: string[]
  active: boolean
  createdAt: string | null
}
type Project = { id: number; name: string; slug: string }

const props = defineProps<{
  project: Project
  apiKeys: ApiKey[]
  webhooks: Webhook[]
  appUrl: string
  apiKeyRaw: string | null
}>()

const WEBHOOK_EVENTS = ['report.created', 'report.updated']

const flash = computed(() => (usePage().flash as any) || {})
const shownRawKey = ref<string | null>(null)
if (flash.value.apiKeyRaw) shownRawKey.value = flash.value.apiKeyRaw

const effectiveKey = computed(() => props.apiKeyRaw ?? shownRawKey.value)

const embedSnippet = computed(() => {
  const key = effectiveKey.value
  if (!key) return ''
  const base = props.appUrl.replace(/\/$/, '')
  return `<script\n  async\n  src="${base}/widget/v1/widget.js"\n  data-project-key="${key}"\n><\/script>`
})

const hasActiveKey = computed(() => props.apiKeys.length > 0)
const placeholderSnippet = computed(() => {
  const base = props.appUrl.replace(/\/$/, '')
  return `<script\n  async\n  src="${base}/widget/v1/widget.js"\n  data-project-key="YOUR_PROJECT_KEY"\n><\/script>`
})
const snippetCopied = ref(false)

async function copyEmbedSnippet() {
  if (!embedSnippet.value) return
  try {
    await navigator.clipboard.writeText(embedSnippet.value)
    snippetCopied.value = true
    setTimeout(() => (snippetCopied.value = false), 2000)
  } catch {
    snippetCopied.value = false
  }
}

const apiKeyForm = useForm({ label: '' })

function createApiKey() {
  apiKeyForm.post(`/projects/${props.project.id}/integrations/api-keys`)
}

const webhookForm = useForm({ url: '', events: [] as string[], secret: '' })

function toggleEvent(event: string, checked: boolean) {
  if (checked) {
    if (!webhookForm.events.includes(event)) webhookForm.events.push(event)
  } else {
    webhookForm.events = webhookForm.events.filter((e) => e !== event)
  }
}

function createWebhook() {
  webhookForm.post(`/projects/${props.project.id}/integrations/webhooks`)
}

function revokeKey(id: number) {
  if (!confirm('Revoke this API token? This cannot be undone.')) return
  router.post(`/projects/${props.project.id}/integrations/api-keys/${id}/revoke`)
}

function deleteWebhook(id: number) {
  if (!confirm('Delete this webhook?')) return
  router.post(`/projects/${props.project.id}/integrations/webhooks/${id}/delete`)
}
</script>

<template>
  <Head :title="`${props.project.name} — Integrations`" />

  <div class="max-w-5xl mx-auto p-6">
    <div class="mb-6">
      <Link href="/" class="text-sm text-slate-500 hover:text-brand-indigo-700 hover:underline"
        >← Back to overview</Link
      >
      <h1 class="text-2xl font-semibold tracking-tight mt-2">
        {{ props.project.name }} — Integrations
      </h1>
      <p class="text-sm text-slate-500 mt-1">
        Connect external services. All integrations ship unlocked in core — no license or paywall.
      </p>
    </div>

    <div
      v-if="shownRawKey"
      class="mb-6 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg p-4"
    >
      <p class="text-sm font-medium">New token — copy now, it won't be shown again:</p>
      <code
        class="block mt-2 text-xs bg-white border border-emerald-200 rounded px-2 py-1.5 break-all"
        >{{ shownRawKey }}</code
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- API Tokens -->
      <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200">
          <h2 class="text-sm font-semibold flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
            API Tokens
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            Tokens for the embeddable widget and external API access.
          </p>
        </div>

        <div class="p-5 space-y-4">
          <div
            v-if="props.apiKeys.length === 0"
            class="text-sm text-slate-500 py-4 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50"
          >
            No tokens yet — create one below.
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="key in props.apiKeys"
              :key="key.id"
              class="flex items-center gap-3 border border-slate-200 rounded-lg p-3 bg-white hover:border-slate-300 transition-colors"
            >
              <span
                class="h-2 w-2 rounded-full shrink-0"
                :class="key.revokedAt ? 'bg-slate-300' : 'bg-brand-teal-600'"
              ></span>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium truncate">{{ key.label || 'Untitled key' }}</div>
                <div class="text-xs text-slate-500 font-mono truncate">{{ key.keyPreview }}</div>
                <div class="text-xs text-slate-400 mt-0.5">
                  {{ key.createdAt ? new Date(key.createdAt).toLocaleDateString() : '' }}
                </div>
              </div>
              <button
                type="button"
                class="text-xs px-3 py-1.5 border border-red-200 rounded-md bg-white text-red-600 hover:bg-red-50 font-medium"
                @click="revokeKey(key.id)"
              >
                Revoke
              </button>
            </div>
          </div>

          <form class="pt-2 border-t border-slate-100 space-y-3" @submit.prevent="createApiKey">
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Label (optional)</label>
              <input
                v-model="apiKeyForm.label"
                type="text"
                placeholder="CI pipeline"
                class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              :disabled="apiKeyForm.processing"
              class="w-full py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500 disabled:opacity-50"
            >
              Create token
            </button>
          </form>
        </div>
      </section>

      <!-- Webhooks -->
      <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200">
          <h2 class="text-sm font-semibold flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
            Outbound Webhooks
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            POST a JSON payload on report events. Signed with
            <code class="bg-slate-100 px-1 rounded text-xs">X-Trackboard-Signature</code>.
          </p>
        </div>

        <div class="p-5 space-y-4">
          <div
            v-if="props.webhooks.length === 0"
            class="text-sm text-slate-500 py-4 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50"
          >
            No webhooks yet — add one below.
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="wh in props.webhooks"
              :key="wh.id"
              class="border border-slate-200 rounded-lg p-3 bg-white hover:border-slate-300 transition-colors"
            >
              <div class="flex items-start gap-3">
                <span
                  class="mt-1.5 h-2 w-2 rounded-full shrink-0"
                  :class="wh.active ? 'bg-brand-teal-600' : 'bg-slate-300'"
                ></span>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium break-all">{{ wh.url }}</div>
                  <div class="flex flex-wrap gap-1 mt-1.5">
                    <span
                      v-for="ev in wh.events"
                      :key="ev"
                      class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {{ ev }}
                    </span>
                  </div>
                  <div
                    class="text-xs mt-1"
                    :class="wh.active ? 'text-brand-teal-600' : 'text-slate-400'"
                  >
                    {{ wh.active ? '● Active' : '○ Inactive' }}
                  </div>
                </div>
                <button
                  type="button"
                  class="text-xs px-3 py-1.5 border border-red-200 rounded-md bg-white text-red-600 hover:bg-red-50 font-medium"
                  @click="deleteWebhook(wh.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <form class="pt-2 border-t border-slate-100 space-y-3" @submit.prevent="createWebhook">
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Endpoint URL</label>
              <input
                v-model="webhookForm.url"
                type="url"
                placeholder="https://example.com/webhook"
                class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Events</label>
              <div class="flex flex-wrap gap-3 mt-1">
                <label
                  v-for="ev in WEBHOOK_EVENTS"
                  :key="ev"
                  class="flex items-center gap-1.5 text-sm"
                >
                  <input
                    type="checkbox"
                    :value="ev"
                    :checked="webhookForm.events.includes(ev)"
                    class="rounded border-slate-300"
                    @change="toggleEvent(ev, ($event.target as HTMLInputElement).checked)"
                  />
                  {{ ev }}
                </label>
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1"
                >Signing secret (optional — generated if blank)</label
              >
              <input
                v-model="webhookForm.secret"
                type="text"
                placeholder="min 8 characters"
                class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              :disabled="webhookForm.processing"
              class="w-full py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500 disabled:opacity-50"
            >
              Add webhook
            </button>
          </form>
        </div>
      </section>
    </div>

    <!-- Embed code -->
    <section class="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-200">
        <h2 class="text-sm font-semibold flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
          Embed code
        </h2>
        <p class="text-xs text-slate-500 mt-1">
          Paste this snippet on any site to mount the bug-report widget.
        </p>
      </div>

      <div class="p-5 space-y-4">
        <div
          v-if="!hasActiveKey"
          class="text-sm text-slate-600 py-4 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50"
        >
          Create an API token first (above) — its key is used to tie widget submissions to this
          project.
        </div>

        <div v-else-if="!effectiveKey" class="space-y-3">
          <p class="text-sm text-slate-600">
            Your token's secret key is shown once at creation. Copy it from the
            <span class="font-medium">API Tokens</span> card above, or create a new token to surface
            it, then use it in the snippet below.
          </p>
          <pre
            class="text-xs bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto"
          ><code>{{ placeholderSnippet }}</code></pre>
        </div>

        <div v-else class="space-y-3">
          <pre
            class="text-xs bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto"
          ><code>{{ embedSnippet }}</code></pre>
          <button
            type="button"
            class="text-xs px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium"
            @click="copyEmbedSnippet"
          >
            {{ snippetCopied ? 'Copied!' : 'Copy to clipboard' }}
          </button>
        </div>
      </div>
    </section>

    <div class="mt-6 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4">
      <h3 class="text-xs font-semibold tracking-widest uppercase text-slate-500">
        GitHub (coming soon)
      </h3>
      <p class="text-sm text-slate-600 mt-1">
        Connect GitHub to turn reports into issues automatically. The card will show a teal dot when
        connected.
      </p>
      <div class="mt-3 flex items-center gap-2 text-xs">
        <span class="h-2 w-2 rounded-full bg-slate-300"></span>
        <span class="text-slate-500">Not connected — configure in a future release</span>
      </div>
    </div>
  </div>
</template>
