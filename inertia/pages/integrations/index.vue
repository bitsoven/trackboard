<script setup lang="ts">
import { computed, ref } from 'vue'
import { Head, useForm, usePage } from '@inertiajs/vue3'
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
}>()

const WEBHOOK_EVENTS = ['report.created', 'report.updated']

const flash = computed(() => (usePage().flash as any) || {})
const shownRawKey = ref<string | null>(null)
if (flash.value.apiKeyRaw) shownRawKey.value = flash.value.apiKeyRaw

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
</script>

<template>
  <Head :title="`${props.project.name} — Integrations`" />

  <div style="max-width: 880px; margin: 0 auto; padding: 40px 30px">
    <div
      style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px"
    >
      <h1 style="font-size: 28px; font-weight: 600; letter-spacing: -0.5px">
        {{ props.project.name }} — Integrations
      </h1>
      <Link href="/" style="color: var(--gray-6); font-size: 14px">← Back</Link>
    </div>
    <p style="color: var(--gray-6); margin-bottom: 32px">
      Connect external services. All features ship in core — no license or paywall.
    </p>

    <!-- API Tokens -->
    <section style="margin-bottom: 40px">
      <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 4px">API Tokens</h2>
      <p style="color: var(--gray-6); font-size: 14px; margin-bottom: 16px">
        Tokens used by external clients (e.g. the embeddable widget) to ingest reports.
      </p>

      <div
        v-if="shownRawKey"
        style="
          background: #00a63e1a;
          border: 1px solid #00a63e;
          color: #00a63e;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-weight: 500;
        "
      >
        New token (copy now, it won't be shown again):
        <code style="display: block; margin-top: 6px; word-break: break-all">{{
          shownRawKey
        }}</code>
      </div>

      <div
        v-if="props.apiKeys.length"
        style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px"
      >
        <div
          v-for="key in props.apiKeys"
          :key="key.id"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid var(--gray-3);
            border-radius: 8px;
            padding: 10px 14px;
          "
        >
          <div>
            <div style="font-weight: 500">{{ key.label || 'Untitled key' }}</div>
            <div style="font-size: 12px; color: var(--gray-6)">{{ key.keyPreview }}</div>
          </div>
          <form
            :action="`/projects/${props.project.id}/integrations/api-keys/${key.id}/revoke`"
            method="POST"
          >
            <button
              type="submit"
              style="
                background: transparent;
                color: #fb2c36;
                border: 1px solid #fb2c36;
                padding: 6px 12px;
                border-radius: 6px;
                font-weight: 500;
              "
            >
              Revoke
            </button>
          </form>
        </div>
      </div>

      <form style="display: flex; gap: 8px; align-items: flex-end" @submit.prevent="createApiKey">
        <div style="flex: 1">
          <label>Label (optional)</label>
          <input v-model="apiKeyForm.label" type="text" placeholder="CI pipeline" />
        </div>
        <button type="submit" :disabled="apiKeyForm.processing">Create token</button>
      </form>
    </section>

    <!-- Webhooks -->
    <section style="margin-bottom: 40px">
      <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 4px">Outbound Webhooks</h2>
      <p style="color: var(--gray-6); font-size: 14px; margin-bottom: 16px">
        POST a JSON payload to your endpoint on report events. Signed with
        <code>X-Trackboard-Signature: sha256=HMAC</code>.
      </p>

      <div
        v-if="props.webhooks.length"
        style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px"
      >
        <div
          v-for="wh in props.webhooks"
          :key="wh.id"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid var(--gray-3);
            border-radius: 8px;
            padding: 10px 14px;
          "
        >
          <div>
            <div style="font-weight: 500; word-break: break-all">{{ wh.url }}</div>
            <div style="font-size: 12px; color: var(--gray-6)">{{ wh.events.join(', ') }}</div>
          </div>
          <form
            :action="`/projects/${props.project.id}/integrations/webhooks/${wh.id}/delete`"
            method="POST"
          >
            <button
              type="submit"
              style="
                background: transparent;
                color: #fb2c36;
                border: 1px solid #fb2c36;
                padding: 6px 12px;
                border-radius: 6px;
                font-weight: 500;
              "
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <form
        style="
          display: flex;
          flex-direction: column;
          gap: 12px;
          border: 1px solid var(--gray-3);
          border-radius: 8px;
          padding: 16px;
        "
        @submit.prevent="createWebhook"
      >
        <div>
          <label>Endpoint URL</label>
          <input v-model="webhookForm.url" type="url" placeholder="https://example.com/webhook" />
        </div>
        <div>
          <label>Events</label>
          <div style="display: flex; gap: 16px; margin-top: 4px">
            <label
              v-for="ev in WEBHOOK_EVENTS"
              :key="ev"
              style="display: flex; align-items: center; gap: 6px; font-weight: 400"
            >
              <input
                type="checkbox"
                :value="ev"
                :checked="webhookForm.events.includes(ev)"
                style="width: auto"
                @change="toggleEvent(ev, ($event.target as HTMLInputElement).checked)"
              />
              {{ ev }}
            </label>
          </div>
        </div>
        <div>
          <label>Signing secret (optional — generated if blank)</label>
          <input v-model="webhookForm.secret" type="text" placeholder="min 8 characters" />
        </div>
        <button type="submit" :disabled="webhookForm.processing" style="align-self: flex-start">
          Add webhook
        </button>
      </form>
    </section>
  </div>
</template>
