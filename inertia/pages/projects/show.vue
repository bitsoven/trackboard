<script setup lang="ts">
import { computed, ref } from 'vue'
import { Head, router, useForm } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'

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

const props = defineProps<{
  project: Project
  templates: Template[]
}>()

// ---- Settings ----
const inputClass =
  'w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-600'

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

// ---- Templates ----
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
  <Head :title="`${props.project.name} — Project`" />

  <div class="max-w-5xl mx-auto p-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="min-w-0">
        <h1 class="text-2xl font-semibold tracking-tight">{{ props.project.name }}</h1>
        <p class="text-sm text-slate-500 mt-1">
          <span class="font-mono">/{{ props.project.slug }}</span>
          — templates, settings and project-level configuration.
        </p>
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

    <!-- Templates -->
    <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-200">
        <h2 class="text-sm font-semibold flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
          Templates
        </h2>
        <p class="text-xs text-slate-500 mt-1">
          Report templates define the fields the widget collects.
        </p>
      </div>

      <div class="p-5">
        <div
          v-if="props.templates.length === 0"
          class="text-center border border-dashed border-slate-300 rounded-lg bg-slate-50 p-8"
        >
          <p class="text-sm text-slate-600 mb-3">
            Every project needs at least one report template.
          </p>
          <div class="mt-3 flex items-center justify-center gap-3">
            <button
              type="button"
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

        <div v-else class="space-y-3">
          <div
            v-for="tpl in props.templates"
            :key="tpl.id"
            class="border border-slate-200 rounded-xl p-4 flex items-start justify-between hover:border-slate-300 transition-colors"
          >
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-medium text-slate-900">{{ tpl.name }}</h3>
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
                type="button"
                class="text-sm px-3 py-1.5 border border-red-200 rounded-md bg-white text-red-600 hover:bg-red-50 font-medium"
                @click="destroyTemplate(tpl.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Settings -->
    <form class="mt-6" @submit.prevent="saveSettings">
      <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200">
          <h2 class="text-sm font-semibold flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
            Project settings
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            Rename the project or control how reports are queued.
          </p>
        </div>

        <div class="p-5 space-y-4">
          <div>
            <label for="name" class="block text-xs font-medium text-slate-700 mb-1"
              >Project name</label
            >
            <input
              id="name"
              v-model="settingsForm.name"
              type="text"
              :data-invalid="settingsForm.errors.name ? 'true' : undefined"
              :class="inputClass"
            />
            <div v-if="settingsForm.errors.name" class="text-xs text-red-600 mt-1">
              {{ settingsForm.errors.name }}
            </div>
          </div>

          <div>
            <label for="slug" class="block text-xs font-medium text-slate-700 mb-1">Slug</label>
            <input
              id="slug"
              v-model="settingsForm.slug"
              type="text"
              :data-invalid="settingsForm.errors.slug ? 'true' : undefined"
              :class="inputClass"
            />
            <div v-if="settingsForm.errors.slug" class="text-xs text-red-600 mt-1">
              {{ settingsForm.errors.slug }}
            </div>
          </div>

          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="settingsForm.requireEmailVerification"
              type="checkbox"
              class="mt-0.5 rounded border-slate-300"
            />
            <span>
              <span class="block text-sm font-medium text-slate-700"
                >Require email verification</span
              >
              <span class="block text-xs text-slate-500 mt-0.5">
                When enabled, new reports start hidden in a "pending verification" state and the
                reporter is emailed a magic link to confirm before the report is shown to your team.
              </span>
            </span>
          </label>

          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="settingsForm.processing"
              class="px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500 disabled:opacity-50"
            >
              Save changes
            </button>
          </div>
        </div>
      </section>
    </form>

    <!-- Danger zone -->
    <section class="mt-6 bg-white border border-red-200 rounded-xl overflow-hidden">
      <div class="px-5 py-4 border-b border-red-100">
        <h2 class="text-sm font-semibold flex items-center gap-2 text-red-700">
          <span class="h-2 w-2 rounded-full bg-red-500"></span>
          Danger zone
        </h2>
        <p class="text-xs text-slate-500 mt-1">
          Deleting a project removes all reports, templates, API keys and team access.
        </p>
      </div>

      <div class="p-5 space-y-3">
        <p class="text-xs text-slate-600">
          Type <span class="font-medium">{{ props.project.name }}</span> to confirm deletion.
        </p>
        <input v-model="confirmText" type="text" placeholder="Project name" :class="inputClass" />
        <button
          type="button"
          :disabled="!canDelete"
          class="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="destroyProject"
        >
          Delete project
        </button>
      </div>
    </section>

    <div class="mt-6 text-sm">
      <Link href="/projects" class="text-slate-500 hover:text-brand-indigo-700 hover:underline"
        >← Back to projects</Link
      >
    </div>
  </div>
</template>
