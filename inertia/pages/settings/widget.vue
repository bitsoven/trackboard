<script setup lang="ts">
import { computed, ref } from 'vue'
import { Head } from '@inertiajs/vue3'
import AppShell from '~/layouts/app_shell.vue'
import { Link } from '@adonisjs/inertia/vue'

defineOptions({ layout: AppShell })

type ApiKey = {
  id: number
  label: string | null
  keyPreview: string | null
  rawKey: string | null
  revokedAt: string | null
}
type Project = { id: number; name: string; slug: string }

const props = defineProps<{
  project: Project
  apiKeys: ApiKey[]
  appUrl: string
  breadcrumb: Array<{ label: string; href?: string }>
}>()

const copied = ref(false)

const activeKey = computed(() => {
  const key = props.apiKeys.find((k) => !k.revokedAt)
  return key?.rawKey ?? key?.keyPreview ?? null
})

const keyIsMasked = computed(() => {
  const key = props.apiKeys.find((k) => !k.revokedAt)
  return !!key && !key.rawKey
})

const base = computed(() => props.appUrl.replace(/\/$/, ''))

const snippet = computed(() => {
  const key = activeKey.value ?? 'YOUR_PROJECT_KEY'
  return [
    `<script src="${base.value}/widget/v1/widget.js"`,
    `  data-project-key="${key}"`,
    `  data-locale="en"`,
    `  async><\/script>`,
  ]
})

const snippetText = computed(() => snippet.value.join('\n'))

async function copySnippet() {
  try {
    await navigator.clipboard.writeText(snippetText.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    copied.value = false
  }
}

const steps = [
  {
    title: 'Copy your embed snippet',
    body: "Grab the script above — it's unique to this workspace and already includes your project key.",
  },
  {
    title: 'Paste it before </body>',
    body: 'Add it near the end of your HTML, right before the closing body tag, on every page you want reports from.',
  },
  {
    title: 'Customize the widget',
    body: 'Set the locale, capture mode and other options via data attributes on the script tag.',
  },
]

const skeletonBars = ['w-[280px]', 'w-[200px]', 'w-[240px]', 'w-[160px]']
</script>

<template>
  <Head title="Widget — Settings" />

  <div class="flex flex-col items-center px-10 pb-20 pt-16">
    <div class="flex w-[760px] max-w-full flex-col gap-10">
      <!-- Header -->
      <div class="flex flex-col gap-3">
        <p class="font-heading text-[13px] font-bold tracking-[0.78px] text-accent">SETUP</p>
        <h1 class="font-heading text-[30px] font-bold tracking-[-0.3px] text-ink-900">
          Install the Trackboard widget
        </h1>
        <p class="font-heading text-[16px] leading-[1.5] text-ink-600">
          Add this snippet to your app so users can report bugs, issues and support requests without
          ever leaving it.
        </p>
      </div>

      <!-- Code card -->
      <div class="overflow-hidden rounded-2xl bg-ink-panel">
        <div
          class="flex items-center justify-between border-b border-[#221e3d] bg-[#1a172f] py-3 pl-5 pr-4"
        >
          <p class="font-heading text-[13px] font-medium text-ink-400">embed.html</p>
          <button
            type="button"
            class="rounded-md border border-[#221e3d] px-3 py-1 font-heading text-[12px] font-bold text-white transition-colors hover:bg-white/5"
            @click="copySnippet"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>

        <div class="flex flex-col gap-1 p-5">
          <p class="whitespace-nowrap font-heading text-[13px] leading-[1.6] text-[#9d95ee]">
            &lt;script src=<span class="text-avatar-teal">"{{ base }}/widget/v1/widget.js"</span>
          </p>
          <p class="whitespace-nowrap font-heading text-[13px] leading-[1.6] text-white">
            &nbsp;&nbsp;data-project-key=<span class="text-avatar-teal"
              >"{{ activeKey ?? 'YOUR_PROJECT_KEY' }}"</span
            >
          </p>
          <p class="whitespace-nowrap font-heading text-[13px] leading-[1.6] text-white">
            &nbsp;&nbsp;data-locale=<span class="text-avatar-teal">"en"</span>
          </p>
          <p class="whitespace-nowrap font-heading text-[13px] leading-[1.6] text-[#9d95ee]">
            &nbsp;&nbsp;async&gt;&lt;/script&gt;
          </p>
        </div>
      </div>

      <!-- Steps -->
      <div class="flex flex-col gap-4">
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="flex items-start gap-4 rounded-[14px] border border-hairline bg-white p-5"
        >
          <span
            class="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-status-bg font-heading text-[14px] font-bold text-status-fg"
          >
            {{ index + 1 }}
          </span>
          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <p class="font-heading text-[15px] font-bold text-ink-900">{{ step.title }}</p>
            <p class="font-heading text-[14px] leading-[1.5] text-ink-600">{{ step.body }}</p>
          </div>
        </div>
      </div>

      <!-- Live preview -->
      <p class="font-heading text-[12px] font-bold tracking-[0.6px] text-label">LIVE PREVIEW</p>
      <div class="overflow-hidden rounded-[20px] border border-hairline bg-white">
        <div
          class="flex items-center gap-2 border-b border-hairline bg-canvas px-4 py-3 font-heading text-[12px] text-label"
        >
          <span class="size-[9px] rounded-full bg-[#ff6b4a]" />
          <span class="size-[9px] rounded-full bg-avatar-amber" />
          <span class="size-[9px] rounded-full bg-avatar-teal" />
          <span class="ml-1">app.example.com</span>
        </div>
        <div class="relative h-[260px]">
          <div class="absolute left-7 top-7 flex flex-col gap-3">
            <span
              v-for="(bar, index) in skeletonBars"
              :key="index"
              class="h-2.5 rounded bg-surface"
              :class="bar"
            />
          </div>
          <div class="absolute bottom-6 right-7">
            <span class="relative flex size-14 items-center justify-center rounded-full bg-accent">
              <span class="size-4 rounded-[4px] bg-white" />
              <span class="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-mark-dot" />
            </span>
          </div>
        </div>
      </div>

      <p class="font-heading text-[13px] text-ink-600">
        <template v-if="keyIsMasked">
          This workspace's key predates reversible storage, so it can't be shown in full — create a
          new token under
          <Link
            :href="'/projects/' + props.project.id + '/integrations'"
            class="font-bold text-accent hover:underline"
          >
            Integrations → API Tokens
          </Link>
          and the snippet will include it automatically.
        </template>
        <template v-else>
          The snippet above is ready to paste — it already includes your project key.
        </template>
      </p>
    </div>
  </div>
</template>
