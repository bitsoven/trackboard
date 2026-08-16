<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head, router, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { VueDraggableNext } from 'vue-draggable-next'

type TemplateFieldDraft = {
  key: string
  label: string
  type: string
  isRequired: boolean
  options: any
  sortOrder: number
  choicesText?: string
}

type TemplateProp = {
  id: number
  projectId: number
  name: string
  isDefault: boolean
  fields: Array<{
    id: number
    key: string
    label: string
    type: string
    isRequired: boolean
    options: any
    sortOrder: number
  }>
} | null

const props = defineProps<{
  project: { id: number; name: string; slug: string }
  template: TemplateProp
}>()

const isEditing = computed(() => !!props.template)

const fieldTypes = [
  'text',
  'textarea',
  'select',
  'radio',
  'checkbox',
  'number',
  'date',
  'file',
  'severity-scale',
] as const

const page = usePage<any>()
const formErrors = computed(() => page.props.errors ?? {})

const name = ref(props.template?.name ?? '')
const isDefault = ref(props.template?.isDefault ?? false)

const fields = ref<TemplateFieldDraft[]>(
  (props.template?.fields ?? []).map((f, idx) => ({
    key: f.key,
    label: f.label,
    type: f.type,
    isRequired: !!f.isRequired,
    options: f.options ?? {},
    sortOrder: f.sortOrder ?? idx,
    choicesText: Array.isArray(f.options?.choices) ? f.options.choices.join(', ') : '',
  }))
)

if (fields.value.length === 0) {
  fields.value.push({
    key: 'title',
    label: 'Title',
    type: 'text',
    isRequired: true,
    options: {},
    sortOrder: 0,
    choicesText: '',
  })
}

function addField() {
  fields.value.push({
    key: `field_${fields.value.length + 1}`,
    label: `Field ${fields.value.length + 1}`,
    type: 'text',
    isRequired: false,
    options: {},
    sortOrder: fields.value.length,
    choicesText: '',
  })
}

function removeField(index: number) {
  fields.value.splice(index, 1)
}

function syncSortOrder() {
  fields.value.forEach((f, idx) => (f.sortOrder = idx))
}

function onDragEnd() {
  syncSortOrder()
}

function buildPayload() {
  syncSortOrder()
  return {
    name: name.value,
    isDefault: isDefault.value,
    fields: fields.value.map((f) => {
      const opts: any = { ...(f.options ?? {}) }
      // Handle choices text for select/radio/checkbox
      if (['select', 'radio', 'checkbox'].includes(f.type)) {
        const text = (f.choicesText ?? '') as string
        if (text.trim()) {
          opts.choices = text
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean)
        } else if (opts.choices) {
          // keep existing
        } else {
          opts.choices = []
        }
      }
      // Cleanup temporary
      const { choicesText, ...rest } = f as any
      return {
        key: rest.key,
        label: rest.label,
        type: rest.type,
        isRequired: rest.isRequired,
        is_required: rest.isRequired,
        options: opts,
        sortOrder: rest.sortOrder,
        sort_order: rest.sortOrder,
        showIf: rest.showIf ?? null,
        show_if: rest.showIf ?? null,
      }
    }),
  }
}

function submit() {
  const payload = buildPayload()
  if (isEditing.value) {
    router.put(`/templates/${props.template!.id}`, payload as any)
  } else {
    router.post(`/projects/${props.project.id}/templates`, payload as any)
  }
}

const hasErrors = computed(() => Object.keys(formErrors.value).length > 0)
</script>

<template>
  <Head :title="isEditing ? `Edit ${props.template?.name}` : 'New template'" />

  <div class="max-w-5xl mx-auto p-6">
    <div class="mb-6">
      <Link
        :href="`/projects/${props.project.id}/templates`"
        class="text-sm text-gray-500 hover:underline"
        >← Back to templates</Link
      >
      <h1 class="text-2xl font-semibold mt-2">
        {{ isEditing ? 'Edit template' : 'New template' }} — {{ props.project.name }}
      </h1>
    </div>

    <div
      v-if="hasErrors"
      class="mb-4 p-3 border border-red-200 bg-red-50 rounded text-sm text-red-700"
    >
      <div v-for="(msg, key) in formErrors" :key="String(key)">{{ key }}: {{ msg }}</div>
    </div>

    <div class="bg-white border rounded p-4 space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Template name</label>
        <input v-model="name" class="w-full border rounded px-3 py-2" placeholder="Bug Report" />
      </div>

      <label class="flex items-center gap-2 text-sm">
        <input v-model="isDefault" type="checkbox" />
        Set as default template for this project
      </label>

      <div class="flex items-center justify-between mt-6">
        <h2 class="font-medium">Fields (drag to reorder)</h2>
        <button
          type="button"
          class="text-sm px-3 py-1 border rounded hover:bg-gray-50"
          @click="addField"
        >
          + Add field
        </button>
      </div>

      <VueDraggableNext
        :list="fields"
        handle=".drag-handle"
        ghost-class="opacity-50"
        class="space-y-3"
        @end="onDragEnd"
      >
        <div v-for="(field, idx) in fields" :key="idx" class="border rounded p-3 bg-gray-50">
          <div class="flex items-start gap-3">
            <span class="drag-handle cursor-move text-gray-400 mt-2 select-none">⋮⋮</span>
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium">Key (a-z, _, 0-9)</label>
                <input
                  v-model="field.key"
                  class="w-full border rounded px-2 py-1 text-sm"
                  placeholder="title"
                />
              </div>
              <div>
                <label class="block text-xs font-medium">Label</label>
                <input
                  v-model="field.label"
                  class="w-full border rounded px-2 py-1 text-sm"
                  placeholder="Title"
                />
              </div>
              <div>
                <label class="block text-xs font-medium">Type</label>
                <select v-model="field.type" class="w-full border rounded px-2 py-1 text-sm">
                  <option v-for="t in fieldTypes" :key="t" :value="t">{{ t }}</option>
                </select>
              </div>
              <div class="flex items-end gap-2">
                <label class="flex items-center gap-1 text-sm mt-4">
                  <input v-model="field.isRequired" type="checkbox" />
                  Required
                </label>
                <span class="text-xs text-gray-400">order: {{ field.sortOrder }}</span>
              </div>

              <div
                v-if="['select', 'radio', 'checkbox'].includes(field.type)"
                class="md:col-span-2"
              >
                <label class="block text-xs font-medium">Choices (comma-separated)</label>
                <input
                  v-model="(field as any).choicesText"
                  class="w-full border rounded px-2 py-1 text-sm"
                  placeholder="low, medium, high"
                />
                <p class="text-xs text-gray-400 mt-1">Used for select / radio / multi-checkbox</p>
              </div>

              <div v-if="field.type === 'number'" class="md:col-span-2 flex gap-3">
                <div class="flex-1">
                  <label class="block text-xs font-medium">Min</label>
                  <input
                    :value="field.options?.min ?? ''"
                    type="number"
                    class="w-full border rounded px-2 py-1 text-sm"
                    @input="
                      field.options = {
                        ...(field.options ?? {}),
                        min:
                          ($event.target as HTMLInputElement).value === ''
                            ? undefined
                            : Number(($event.target as HTMLInputElement).value),
                      }
                    "
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-xs font-medium">Max</label>
                  <input
                    :value="field.options?.max ?? ''"
                    type="number"
                    class="w-full border rounded px-2 py-1 text-sm"
                    @input="
                      field.options = {
                        ...(field.options ?? {}),
                        max:
                          ($event.target as HTMLInputElement).value === ''
                            ? undefined
                            : Number(($event.target as HTMLInputElement).value),
                      }
                    "
                  />
                </div>
              </div>

              <div v-if="field.type === 'severity-scale'" class="md:col-span-2 flex gap-3">
                <div class="flex-1">
                  <label class="block text-xs font-medium">Scale min</label>
                  <input
                    :value="field.options?.scaleMin ?? 1"
                    type="number"
                    class="w-full border rounded px-2 py-1 text-sm"
                    @input="
                      field.options = {
                        ...(field.options ?? {}),
                        scaleMin: Number(($event.target as HTMLInputElement).value),
                      }
                    "
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-xs font-medium">Scale max</label>
                  <input
                    :value="field.options?.scaleMax ?? 5"
                    type="number"
                    class="w-full border rounded px-2 py-1 text-sm"
                    @input="
                      field.options = {
                        ...(field.options ?? {}),
                        scaleMax: Number(($event.target as HTMLInputElement).value),
                      }
                    "
                  />
                </div>
              </div>

              <div v-if="['text', 'textarea'].includes(field.type)" class="md:col-span-2">
                <label class="block text-xs font-medium">Max length (optional)</label>
                <input
                  :value="field.options?.maxLength ?? ''"
                  type="number"
                  class="w-full border rounded px-2 py-1 text-sm"
                  placeholder="500"
                  @input="
                    field.options = {
                      ...(field.options ?? {}),
                      maxLength:
                        ($event.target as HTMLInputElement).value === ''
                          ? undefined
                          : Number(($event.target as HTMLInputElement).value),
                    }
                  "
                />
              </div>
            </div>
            <button
              type="button"
              class="text-sm text-red-600 hover:underline"
              @click="removeField(idx)"
            >
              Remove
            </button>
          </div>
        </div>
      </VueDraggableNext>

      <div class="flex gap-3 pt-4">
        <button
          type="button"
          class="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark text-sm"
          @click="submit"
        >
          {{ isEditing ? 'Update template' : 'Create template' }}
        </button>
        <Link
          :href="`/projects/${props.project.id}/templates`"
          class="px-4 py-2 border rounded text-sm hover:bg-gray-50"
          >Cancel</Link
        >
      </div>
    </div>

    <div class="mt-8 p-4 border rounded bg-gray-50 text-xs">
      <p class="font-medium mb-1">Preview payload</p>
      <pre class="whitespace-pre-wrap break-words">{{
        JSON.stringify(buildPayload(), null, 2)
      }}</pre>
    </div>
  </div>
</template>
