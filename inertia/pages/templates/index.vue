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
</script>

<template>
  <Head :title="`${props.project.name} — Templates`" />

  <div class="max-w-5xl mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold">{{ props.project.name }} — Templates</h1>
        <p class="text-sm text-gray-500 mt-1">Manage bug report templates for this project</p>
      </div>
      <Link
        :href="`/projects/${props.project.id}/templates/create`"
        class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm"
      >
        New template
      </Link>
    </div>

    <div v-if="props.templates.length === 0" class="border rounded p-8 text-center text-gray-500">
      No templates yet. Create the first one to define your bug report form.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="tpl in props.templates"
        :key="tpl.id"
        class="border rounded p-4 flex items-start justify-between bg-white"
      >
        <div>
          <div class="flex items-center gap-2">
            <h2 class="font-medium">{{ tpl.name }}</h2>
            <span v-if="tpl.isDefault" class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
              >default</span
            >
            <span class="text-xs text-gray-400">#{{ tpl.id }}</span>
          </div>
          <p class="text-sm text-gray-500 mt-1">{{ tpl.fields.length }} fields</p>
          <div class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="f in tpl.fields"
              :key="f.key"
              class="text-xs border px-2 py-0.5 rounded bg-gray-50"
            >
              {{ f.key }} · {{ f.type }}<span v-if="f.isRequired" class="text-red-500">*</span>
            </span>
          </div>
        </div>
        <div class="flex gap-2 ml-4">
          <Link
            :href="`/templates/${tpl.id}/edit`"
            class="text-sm px-3 py-1 border rounded hover:bg-gray-50"
            >Edit</Link
          >
          <button
            class="text-sm px-3 py-1 border rounded hover:bg-red-50 text-red-600"
            @click="destroyTemplate(tpl.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6 text-sm">
      <Link href="/" class="text-gray-500 hover:underline">← Back to home</Link>
    </div>
  </div>
</template>
