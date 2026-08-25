<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { router } from '@inertiajs/vue3'

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

  <div class="max-w-5xl mx-auto p-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="min-w-0">
        <h1 class="text-2xl font-semibold tracking-tight">{{ props.project.name }} — Templates</h1>
        <p class="text-sm text-slate-500 mt-1">Manage bug report templates for this project</p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <Link
          :href="`/projects/${props.project.id}/templates/create`"
          class="px-4 py-2 bg-brand-indigo-700 text-white rounded-md hover:bg-brand-indigo-500 text-sm font-medium whitespace-nowrap"
        >
          New template
        </Link>
        <Link
          :href="`/projects/${props.project.id}/integrations`"
          class="px-4 py-2 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 text-sm font-medium whitespace-nowrap"
        >
          Integrations
        </Link>
      </div>
    </div>

    <div
      v-if="props.templates.length === 0"
      class="border border-slate-200 rounded-xl overflow-hidden bg-white"
    >
      <div
        class="h-28 flex flex-col items-center justify-center gap-2"
        style="background: linear-gradient(135deg, #4338ca 0%, #0d9488 100%)"
      >
        <span class="text-white text-2xl">📝</span>
        <span class="text-white/90 text-sm font-medium"
          >Every project needs at least one report template</span
        >
      </div>
      <div class="p-6 text-center">
        <p class="text-sm text-slate-600">
          Create a custom template or start from the default (title, steps, expected/actual,
          severity).
        </p>
        <div class="mt-4 flex items-center justify-center gap-3">
          <button
            class="px-4 py-2 bg-brand-indigo-700 text-white rounded-md hover:bg-brand-indigo-500 text-sm font-medium"
            @click="useDefaultTemplate"
          >
            Use default template
          </button>
          <Link
            :href="`/projects/${props.project.id}/templates/create`"
            class="px-4 py-2 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 text-sm font-medium"
          >
            Create custom
          </Link>
        </div>
      </div>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="tpl in props.templates"
        :key="tpl.id"
        class="border border-slate-200 rounded-xl p-4 flex items-start justify-between bg-white hover:border-slate-300 transition-colors"
      >
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h2 class="font-medium text-slate-900">{{ tpl.name }}</h2>
            <span
              v-if="tpl.isDefault"
              class="text-xs bg-brand-indigo-50 text-brand-indigo-700 border border-brand-indigo-200 px-2 py-0.5 rounded-full font-medium"
              >default</span
            >
            <span class="text-xs text-slate-400">#{{ tpl.id }}</span>
          </div>
          <p class="text-sm text-slate-500 mt-1">{{ tpl.fields.length }} fields</p>
          <div class="flex flex-wrap gap-1.5 mt-2">
            <span
              v-for="f in tpl.fields"
              :key="f.key"
              class="text-xs border border-slate-200 px-2 py-1 rounded-full bg-slate-50 text-slate-700"
            >
              {{ f.key }} · {{ f.type }}<span v-if="f.isRequired" class="text-red-500">*</span>
            </span>
          </div>
        </div>
        <div class="flex gap-2 ml-4 shrink-0">
          <Link
            :href="`/templates/${tpl.id}/edit`"
            class="text-sm px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium"
            >Edit</Link
          >
          <button
            class="text-sm px-3 py-1.5 border border-red-200 rounded-md bg-white text-red-600 hover:bg-red-50 font-medium"
            @click="destroyTemplate(tpl.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6 text-sm">
      <Link href="/" class="text-slate-500 hover:text-brand-indigo-700 hover:underline">← Back to overview</Link>
    </div>
  </div>
</template>
