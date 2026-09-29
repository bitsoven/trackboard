<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { router } from '@inertiajs/vue3'
import AppShell from '~/layouts/app_shell.vue'
import ReportCard from '~/components/report_card.vue'
import TbButton from '~/components/ui/tb_button.vue'

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

defineOptions({ layout: AppShell })

const props = defineProps<{
  project: { id: number; name: string; slug: string }
  templates: Template[]
}>()

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
</script>

<template>
  <Head :title="`${props.project.name} — Templates`" />

  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex min-w-0 flex-col gap-1.5">
        <h1 class="font-heading text-[28px] font-bold tracking-[-0.28px] text-ink-900">
          Templates
        </h1>
        <p class="font-heading text-[15px] text-ink-600">
          Report templates for {{ props.project.name }}.
        </p>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <TbButton variant="accent" size="lg">
          <Link :href="`/projects/${props.project.id}/templates/create`"> New template </Link>
        </TbButton>
      </div>
    </div>

    <div
      v-if="props.templates.length === 0"
      class="overflow-hidden rounded-2xl border border-hairline bg-white text-center"
    >
      <div
        class="flex h-28 flex-col items-center justify-center gap-2"
        style="background: linear-gradient(135deg, #4c3fe0 0%, #00b8a9 100%)"
      >
        <span class="font-heading text-sm font-medium text-white">
          Every project needs at least one report template
        </span>
      </div>
      <div class="p-6">
        <TbButton variant="accent" @click="useDefaultTemplate"> Use default template </TbButton>
      </div>
    </div>

    <ReportCard v-else label="TEMPLATES">
      <div class="flex flex-col gap-3">
        <div
          v-for="tpl in props.templates"
          :key="tpl.id"
          class="flex items-start justify-between rounded-[10px] bg-surface p-4"
        >
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-heading text-[13px] font-bold text-ink-900">{{ tpl.name }}</h3>
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
      </div>

      <div class="flex justify-between pt-1">
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
    </ReportCard>
  </div>
</template>
