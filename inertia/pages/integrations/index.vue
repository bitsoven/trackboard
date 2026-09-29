<script setup lang="ts">
import { computed, ref } from 'vue'
import { Head, router, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import AppShell from '~/layouts/app_shell.vue'
import ReportCard from '~/components/report_card.vue'
import TbInput from '~/components/ui/tb_input.vue'
import TbButton from '~/components/ui/tb_button.vue'

type ApiKey = {
  id: number
  label: string | null
  keyPreview: string | null
  rawKey: string | null
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

defineOptions({ layout: AppShell })

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

const apiKeyForm = useForm({ label: '' })

function createApiKey() {
  apiKeyForm.post(`/projects/${props.project.id}/integrations/api-keys`, { preserveScroll: true })
}

function revokeKey(id: number) {
  if (!confirm('Revoke this API token? This cannot be undone.')) return
  router.post(
    `/projects/${props.project.id}/integrations/api-keys/${id}/revoke`,
    {},
    { preserveScroll: true }
  )
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
  webhookForm.post(`/projects/${props.project.id}/integrations/webhooks`, { preserveScroll: true })
}

function deleteWebhook(id: number) {
  if (!confirm('Delete this webhook?')) return
  router.post(
    `/projects/${props.project.id}/integrations/webhooks/${id}/delete`,
    {},
    { preserveScroll: true }
  )
}
</script>

<template>
  <Head :title="`${props.project.name} — Integrations`" />

  <div class="flex flex-col gap-6">
    <div
      v-if="shownRawKey"
      class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
    >
      <p class="font-medium">New token — copy now, it won't be shown again:</p>
      <code class="mt-2 block break-all rounded bg-white px-2 py-1.5 text-xs">{{
        shownRawKey
      }}</code>
    </div>

    <!-- API Tokens -->
    <ReportCard label="API TOKENS">
      <p class="-mt-1 text-[13px] text-ink-600">
        Tokens for the embeddable widget and external API access.
      </p>

      <p
        v-if="props.apiKeys.length === 0"
        class="rounded-[10px] border border-dashed border-hairline bg-surface px-4 py-4 text-center text-[13px] text-ink-600"
      >
        No tokens yet — create one below.
      </p>

      <div v-else class="flex flex-col gap-3">
        <div
          v-for="key in props.apiKeys"
          :key="key.id"
          class="flex items-center gap-3 rounded-[10px] bg-surface p-3.5"
        >
          <span
            class="size-2 shrink-0 rounded-full"
            :class="key.revokedAt ? 'bg-ink-300' : 'bg-avatar-teal'"
          />
          <div class="min-w-0 flex-1">
            <p class="truncate font-heading text-[13px] font-bold text-ink-900">
              {{ key.label || 'Untitled key' }}
            </p>
            <p class="truncate font-mono text-xs text-ink-600">{{ key.keyPreview }}</p>
            <p class="mt-0.5 text-xs text-ink-300">
              {{ key.createdAt ? new Date(key.createdAt).toLocaleDateString() : '' }}
            </p>
          </div>
          <button
            type="button"
            class="shrink-0 rounded-md border border-hairline bg-white px-3 py-1.5 font-heading text-[12px] font-medium text-red-600 hover:bg-red-50"
            @click="revokeKey(key.id)"
          >
            Revoke
          </button>
        </div>
      </div>

      <form
        class="flex flex-col gap-3 border-t border-hairline pt-4 sm:flex-row sm:items-end"
        @submit.prevent="createApiKey"
      >
        <TbInput
          id="token-label"
          v-model="apiKeyForm.label"
          name="label"
          class="flex-1"
          label="Label (optional)"
          type="text"
          placeholder="CI pipeline"
        />
        <TbButton variant="accent" type="submit" :disabled="apiKeyForm.processing">
          Create token
        </TbButton>
      </form>
    </ReportCard>

    <!-- Widget install pointer -->
    <ReportCard label="WIDGET INSTALL">
      <p class="-mt-1 text-[13px] text-ink-600">
        Copy the embed snippet and see setup steps with a live preview.
      </p>
      <Link
        href="/settings/widget"
        class="flex items-center justify-between rounded-[10px] bg-surface px-4 py-3.5 transition-colors hover:bg-hairline/60"
      >
        <span>
          <span class="block font-heading text-[13px] font-bold text-ink-900">
            Install the Trackboard widget
          </span>
          <span class="block font-heading text-[12px] text-ink-600">
            Snippet, setup steps and a live preview for this workspace.
          </span>
        </span>
        <span class="font-heading text-[13px] font-bold text-accent">Open →</span>
      </Link>
    </ReportCard>

    <!-- Webhooks -->
    <ReportCard label="OUTBOUND WEBHOOKS">
      <p class="-mt-1 text-[13px] text-ink-600">
        POST a JSON payload on report events. Signed with
        <code class="rounded bg-surface px-1 text-xs">X-Trackboard-Signature</code>.
      </p>

      <p
        v-if="props.webhooks.length === 0"
        class="rounded-[10px] border border-dashed border-hairline bg-surface px-4 py-4 text-center text-[13px] text-ink-600"
      >
        No webhooks yet — add one below.
      </p>

      <div v-else class="flex flex-col gap-3">
        <div
          v-for="webhook in props.webhooks"
          :key="webhook.id"
          class="rounded-[10px] bg-surface p-3.5"
        >
          <div class="flex items-start gap-3">
            <span
              class="mt-1.5 size-2 shrink-0 rounded-full"
              :class="webhook.active ? 'bg-avatar-teal' : 'bg-ink-300'"
            />
            <div class="min-w-0 flex-1">
              <p class="break-all font-heading text-[13px] font-bold text-ink-900">
                {{ webhook.url }}
              </p>
              <div class="mt-1.5 flex flex-wrap gap-1">
                <span
                  v-for="event in webhook.events"
                  :key="event"
                  class="rounded border border-hairline bg-white px-1.5 py-0.5 font-heading text-[11px] font-medium text-ink-600"
                >
                  {{ event }}
                </span>
              </div>
              <p class="mt-1 text-xs" :class="webhook.active ? 'text-avatar-teal' : 'text-ink-300'">
                {{ webhook.active ? '● Active' : '○ Inactive' }}
              </p>
            </div>
            <button
              type="button"
              class="shrink-0 rounded-md border border-hairline bg-white px-3 py-1.5 font-heading text-[12px] font-medium text-red-600 hover:bg-red-50"
              @click="deleteWebhook(webhook.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <form
        class="flex flex-col gap-3 border-t border-hairline pt-4"
        @submit.prevent="createWebhook"
      >
        <TbInput
          id="webhook-url"
          v-model="webhookForm.url"
          name="url"
          variant="auth"
          label="Endpoint URL"
          type="url"
          placeholder="https://example.com/webhook"
          :error="(webhookForm.errors as any).url"
        />
        <div>
          <p class="mb-1 font-heading text-[13px] font-bold text-ink-900">Events</p>
          <div class="flex flex-wrap gap-4">
            <label
              v-for="event in WEBHOOK_EVENTS"
              :key="event"
              class="flex items-center gap-1.5 text-sm text-ink-600"
            >
              <input
                type="checkbox"
                :value="event"
                :checked="webhookForm.events.includes(event)"
                class="rounded"
                @change="toggleEvent(event, ($event.target as HTMLInputElement).checked)"
              />
              {{ event }}
            </label>
          </div>
        </div>
        <TbInput
          id="webhook-secret"
          v-model="webhookForm.secret"
          name="secret"
          variant="auth"
          label="Signing secret"
          type="text"
          hint="Optional — generated if blank (min 8 characters)."
        />
        <div class="flex justify-end">
          <TbButton variant="accent" type="submit" :disabled="webhookForm.processing">
            Add webhook
          </TbButton>
        </div>
      </form>
    </ReportCard>

    <!-- GitHub placeholder -->
    <div class="rounded-2xl border border-dashed border-hairline bg-white/60 p-5">
      <h3 class="font-heading text-[12px] font-bold tracking-[0.6px] text-label">
        GITHUB (COMING SOON)
      </h3>
      <p class="mt-1 font-heading text-[14px] text-ink-600">
        Connect GitHub to turn reports into issues automatically.
      </p>
      <div class="mt-3 flex items-center gap-2 text-xs">
        <span class="size-2 rounded-full bg-ink-300" />
        <span class="text-ink-600">Not connected — configure in a future release</span>
      </div>
    </div>
  </div>
</template>
