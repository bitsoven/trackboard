<script setup lang="ts">
import { computed, ref } from 'vue'
import { Head, router, useForm } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { FileText, Plug, Users, ShieldCheck, LayoutTemplate } from '@lucide/vue'
import AppShell from '~/layouts/app_shell.vue'
import ReportCard from '~/components/report_card.vue'
import TbButton from '~/components/ui/tb_button.vue'
import TbInput from '~/components/ui/tb_input.vue'

type TemplateField = {
  id: number
  key: string
  label: string
  type: string
  isRequired: boolean
  sortOrder: number
}

type Template = {
  id: number
  projectId: number
  name: string
  isDefault: boolean
  createdAt: string | null
  fields: TemplateField[]
}

type Project = {
  id: number
  name: string
  slug: string
  requireEmailVerification: boolean
}

defineOptions({ layout: AppShell })

const props = defineProps<{
  project: Project
  templates: Template[]
}>()

const settingsForm = useForm({
  name: props.project.name,
  slug: props.project.slug,
  requireEmailVerification: !!props.project.requireEmailVerification,
})

function saveSettings() {
  settingsForm.patch(`/projects/${props.project.id}/settings`)
}

const confirmText = ref('')
const canDelete = computed(() => confirmText.value === props.project.name)

function destroyProject() {
  if (!canDelete.value) return
  if (!confirm(`Delete project "${props.project.name}"? This cannot be undone.`)) return
  router.delete(`/projects/${props.project.id}/settings`)
}

function destroyTemplate(id: number) {
  if (!confirm('Delete this template and all its fields?')) return
  router.delete(`/templates/${id}`)
}

function useDefaultTemplate() {
  router.post(`/projects/${props.project.id}/templates`, {
    name: 'Bug Report',
    isDefault: true,
    fields: [
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        isRequired: true,
        is_required: true,
        options: {},
        sortOrder: 0,
        sort_order: 0,
        showIf: null,
        show_if: null,
      },
      {
        key: 'steps',
        label: 'Steps to reproduce',
        type: 'textarea',
        isRequired: true,
        is_required: true,
        options: {},
        sortOrder: 1,
        sort_order: 1,
        showIf: null,
        show_if: null,
      },
      {
        key: 'expected',
        label: 'Expected behavior',
        type: 'textarea',
        isRequired: true,
        is_required: true,
        options: {},
        sortOrder: 2,
        sort_order: 2,
        showIf: null,
        show_if: null,
      },
      {
        key: 'actual',
        label: 'Actual behavior',
        type: 'textarea',
        isRequired: true,
        is_required: true,
        options: {},
        sortOrder: 3,
        sort_order: 3,
        showIf: null,
        show_if: null,
      },
      {
        key: 'severity',
        label: 'Severity',
        type: 'select',
        isRequired: true,
        is_required: true,
        options: { choices: ['low', 'medium', 'high', 'critical'] },
        sortOrder: 4,
        sort_order: 4,
        showIf: null,
        show_if: null,
      },
    ],
  } as any)
}

const quickLinks = [
  {
    label: 'Integrations',
    desc: 'API tokens, webhooks & widget',
    icon: Plug,
    href: `/projects/${props.project.id}/integrations`,
  },
  {
    label: 'Team',
    desc: 'Invite & manage collaborators',
    icon: Users,
    href: `/projects/${props.project.id}/team`,
  },
  {
    label: 'Widget install',
    desc: 'Embed snippet & live preview',
    icon: LayoutTemplate,
    href: '/settings/widget',
  },
]

const inputClass =
  'w-full rounded-[10px] border border-hairline bg-white px-3.5 py-2.5 font-heading text-[14px] text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-accent'
</script>

<template>
  <Head :title="`${props.project.name} — Project`" />

  <div class="flex items-start gap-8">
    <!-- Main column -->
    <div class="flex min-w-0 flex-1 flex-col gap-6">
      <!-- Templates -->
      <ReportCard label="REPORT TEMPLATES">
        <div class="flex flex-col gap-3">
          <div
            v-for="tpl in props.templates"
            :key="tpl.id"
            class="flex items-start justify-between rounded-[10px] bg-surface p-4"
          >
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <h3
                  class="flex items-center gap-1.5 font-heading text-[13px] font-bold text-ink-900"
                >
                  <FileText class="size-4 text-ink-300" />
                  {{ tpl.name }}
                </h3>
                <span
                  v-if="tpl.isDefault"
                  class="rounded-md bg-status-bg px-2 py-0.5 font-heading text-[11px] font-bold text-status-fg"
                >
                  default
                </span>
              </div>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span
                  v-for="field in tpl.fields"
                  :key="field.key"
                  class="rounded-md border border-hairline bg-white px-2 py-1 font-heading text-[11px] text-ink-600"
                >
                  {{ field.key }} · {{ field.type }}
                  <span v-if="field.isRequired" class="text-red-500">*</span>
                </span>
              </div>
            </div>
            <div class="ml-4 flex shrink-0 gap-2">
              <Link
                :href="`/templates/${tpl.id}/edit`"
                class="rounded-md border border-hairline bg-white px-3 py-1.5 font-heading text-[12px] font-medium text-ink-900 hover:bg-white/60"
              >
                Edit
              </Link>
              <button
                type="button"
                class="rounded-md border border-hairline bg-white px-3 py-1.5 font-heading text-[12px] font-medium text-red-600 hover:bg-red-50"
                @click="destroyTemplate(tpl.id)"
              >
                Delete
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-1">
            <button
              type="button"
              class="font-heading text-[13px] font-bold text-accent hover:underline"
              @click="useDefaultTemplate"
            >
              + Use default template
            </button>
            <Link
              :href="`/projects/${props.project.id}/templates/create`"
              class="font-heading text-[13px] font-bold text-accent hover:underline"
            >
              Create custom →
            </Link>
          </div>
        </div>
      </ReportCard>

      <!-- Settings -->
      <form @submit.prevent="saveSettings">
        <ReportCard label="PROJECT SETTINGS">
          <div class="flex flex-col gap-4">
            <TbInput
              id="settings-name"
              v-model="settingsForm.name"
              name="name"
              variant="auth"
              label="Project name"
              type="text"
              :error="(settingsForm.errors as any).name"
            />
            <TbInput
              id="settings-slug"
              v-model="settingsForm.slug"
              name="slug"
              variant="auth"
              label="Slug"
              type="text"
              hint="Used in widget and API URLs."
              :error="(settingsForm.errors as any).slug"
            />
            <label class="flex cursor-pointer items-start gap-3">
              <input
                v-model="settingsForm.requireEmailVerification"
                type="checkbox"
                class="mt-1 rounded"
              />
              <span>
                <span class="block text-sm font-medium text-ink-900">
                  Require email verification
                </span>
                <span class="block text-xs text-ink-600">
                  New reports start hidden in a "pending verification" state until the reporter
                  confirms via a magic link.
                </span>
              </span>
            </label>
          </div>
          <div class="flex justify-end">
            <TbButton variant="accent" type="submit" :disabled="settingsForm.processing">
              Save changes
            </TbButton>
          </div>
        </ReportCard>
      </form>

      <!-- Danger zone -->
      <details class="rounded-2xl border border-red-200 bg-white">
        <summary
          class="cursor-pointer px-6 py-4 font-heading text-[12px] font-bold tracking-[0.6px] text-red-600"
        >
          DANGER ZONE
        </summary>
        <div class="flex flex-col gap-3 px-6 pb-6">
          <p class="text-xs text-ink-600">
            Deleting <span class="font-medium">{{ props.project.name }}</span> removes all reports,
            templates, API keys and team access.
          </p>
          <input
            v-model="confirmText"
            type="text"
            placeholder="Type the project name to confirm"
            :class="inputClass"
          />
          <TbButton variant="destructive" :disabled="!canDelete" @click="destroyProject">
            Delete project
          </TbButton>
        </div>
      </details>
    </div>

    <!-- Sidebar -->
    <aside class="w-[340px] shrink-0">
      <div class="flex flex-col gap-[18px] rounded-2xl border border-hairline bg-white p-5">
        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="truncate font-heading text-[14px] font-medium text-ink-900">
              {{ props.project.name }}
            </p>
            <p class="truncate font-mono text-xs text-ink-300">/{{ props.project.slug }}</p>
          </div>
          <span
            v-if="props.project.requireEmailVerification"
            class="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#fff2d9] px-2 py-1 font-heading text-[11px] font-bold text-[#a47912]"
          >
            <ShieldCheck class="size-3" /> Verified
          </span>
        </div>

        <div class="h-px w-full bg-hairline" />

        <Link
          v-for="link in quickLinks"
          :key="link.label"
          :href="link.href"
          class="group flex items-center gap-3 rounded-[10px] p-2 transition-colors hover:bg-surface"
        >
          <span
            class="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-status-bg text-status-fg transition-colors group-hover:bg-accent group-hover:text-white"
          >
            <component :is="link.icon" class="size-4" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block font-heading text-[14px] font-medium text-ink-900">
              {{ link.label }}
            </span>
            <span class="block truncate font-heading text-[12px] text-ink-600">
              {{ link.desc }}
            </span>
          </span>
          <span class="text-ink-300 group-hover:text-accent">→</span>
        </Link>

        <div class="h-px w-full bg-hairline" />

        <div class="flex flex-col gap-2">
          <p class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300">TEMPLATE</p>
          <p class="font-heading text-[14px] font-medium text-ink-900">
            {{ props.templates.length }} template{{ props.templates.length === 1 ? '' : 's' }}
          </p>
        </div>
      </div>
    </aside>
  </div>
</template>
