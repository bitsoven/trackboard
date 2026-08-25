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
const selectedIndex = ref<number | null>(null)

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

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div class="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Template name</label>
          <input
            v-model="name"
            class="w-full border border-slate-300 rounded-md px-3 py-2"
            placeholder="Bug Report"
          />
        </div>

        <label class="flex items-center gap-2.5 text-sm text-slate-700">
          <input
            v-model="isDefault"
            type="checkbox"
            class="h-4 w-4 rounded border-slate-300 text-brand-indigo-700 focus:ring-brand-indigo-500 focus:ring-2"
          />
          Set as default template for this project
        </label>

        <div class="flex items-center justify-between mt-6">
          <h2 class="font-medium">Fields (drag to reorder)</h2>
          <button
            type="button"
            class="text-sm px-3 py-1 border border-slate-300 rounded-md bg-white hover:bg-slate-50 text-slate-700"
            @click="addField"
          >
            + Add field
          </button>
        </div>

        <VueDraggableNext
          :list="fields"
          handle=".drag-handle"
          ghost-class="opacity-50"
          chosen-class="ring-2 ring-brand-indigo-500 !border-brand-indigo-500 bg-indigo-50"
          drag-class="opacity-80 rotate-1 shadow-lg"
          class="space-y-3"
          @end="onDragEnd"
        >
          <div
            v-for="(field, idx) in fields"
            :key="idx"
            class="border rounded-lg p-3 bg-slate-50 cursor-pointer transition-all"
            :class="
              selectedIndex === idx
                ? 'ring-2 ring-brand-indigo-500 border-brand-indigo-500 bg-indigo-50'
                : 'border-slate-200 hover:border-slate-300'
            "
            @click="selectedIndex = idx"
          >
            <div class="flex items-start gap-3">
              <span
                class="flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 shrink-0 mt-6"
                >{{ idx + 1 }}</span
              >
              <span class="drag-handle cursor-move text-slate-400 mt-7 select-none">⋮⋮</span>
              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-700">Key (a-z, _, 0-9)</label>
                  <input
                    v-model="field.key"
                    class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
                    placeholder="title"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-700">Label</label>
                  <input
                    v-model="field.label"
                    class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
                    placeholder="Title"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-700">Type</label>
                  <select
                    v-model="field.type"
                    class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
                  >
                    <option v-for="t in fieldTypes" :key="t" :value="t">{{ t }}</option>
                  </select>
                </div>
                <div class="flex items-end gap-2">
                  <label class="flex items-center gap-1.5 text-sm text-slate-700 mt-4">
                    <input
                      v-model="field.isRequired"
                      type="checkbox"
                      class="h-4 w-4 rounded border-slate-300 text-brand-indigo-700 focus:ring-brand-indigo-500 focus:ring-2"
                    />
                    Required
                  </label>
                </div>

                <div
                  v-if="['select', 'radio', 'checkbox'].includes(field.type)"
                  class="md:col-span-2"
                >
                  <label class="block text-xs font-medium text-slate-700">Choices (comma-separated)</label>
                  <input
                    v-model="(field as any).choicesText"
                    class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
                    placeholder="low, medium, high"
                  />
                  <p class="text-xs text-slate-500 mt-1">Used for select / radio / multi-checkbox</p>
                </div>

                <div v-if="field.type === 'number'" class="md:col-span-2 flex gap-3">
                  <div class="flex-1">
                    <label class="block text-xs font-medium text-slate-700">Min</label>
                    <input
                      :value="field.options?.min ?? ''"
                      type="number"
                      class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
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
                    <label class="block text-xs font-medium text-slate-700">Max</label>
                    <input
                      :value="field.options?.max ?? ''"
                      type="number"
                      class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
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
                    <label class="block text-xs font-medium text-slate-700">Scale min</label>
                    <input
                      :value="field.options?.scaleMin ?? 1"
                      type="number"
                      class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
                      @input="
                        field.options = {
                          ...(field.options ?? {}),
                          scaleMin: Number(($event.target as HTMLInputElement).value),
                        }
                      "
                    />
                  </div>
                  <div class="flex-1">
                    <label class="block text-xs font-medium text-slate-700">Scale max</label>
                    <input
                      :value="field.options?.scaleMax ?? 5"
                      type="number"
                      class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
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
                  <label class="block text-xs font-medium text-slate-700">Max length (optional)</label>
                  <input
                    :value="field.options?.maxLength ?? ''"
                    type="number"
                    class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
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
                class="text-sm text-red-600 hover:underline bg-transparent"
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
            class="px-4 py-2 bg-brand-indigo-700 text-white rounded-md hover:bg-brand-indigo-500 text-sm"
            @click="submit"
          >
            {{ isEditing ? 'Update template' : 'Create template' }}
          </button>
          <Link
            :href="`/projects/${props.project.id}/templates`"
            class="px-4 py-2 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 text-sm"
            >Cancel</Link
          >
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden lg:sticky lg:top-6">
          <div class="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <h3 class="text-sm font-semibold">Live preview</h3>
            <p class="text-xs text-slate-500 mt-0.5">How reporters will see this template</p>
          </div>
          <div class="p-4 space-y-4">
            <div v-if="fields.length === 0" class="text-sm text-slate-500 py-8 text-center">
              No fields — add one to preview
            </div>
            <div v-else class="space-y-4">
              <div v-for="(field, i) in fields" :key="field.key || String(i)" class="space-y-1">
                <label class="block text-xs font-medium text-slate-700"
                  >{{ field.label }}
                  <span v-if="field.isRequired" class="text-red-500">*</span></label
                >
                <input
                  v-if="field.type === 'text'"
                  disabled
                  :placeholder="field.label"
                  class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-slate-50 text-slate-500"
                />
                <textarea
                  v-else-if="field.type === 'textarea'"
                  disabled
                  :placeholder="field.label"
                  rows="2"
                  class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-slate-50 text-slate-500"
                ></textarea>
                <select
                  v-else-if="field.type === 'select'"
                  disabled
                  class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-slate-50 text-slate-500"
                >
                  <option>{{ (field as any).choicesText || '— Select —' }}</option>
                </select>
                <div v-else-if="field.type === 'radio'" class="space-y-1">
                  <label
                    v-for="c in ((field as any).choicesText || '').split(',').filter(Boolean)"
                    :key="c"
                    class="flex items-center gap-2 text-sm text-slate-700"
                    ><input type="radio" disabled /> {{ c.trim() }}</label
                  >
                  <span v-if="!(field as any).choicesText" class="text-xs text-slate-400"
                    >No choices</span
                  >
                </div>
                <div v-else-if="field.type === 'checkbox'" class="space-y-1">
                  <label
                    v-for="c in ((field as any).choicesText || '').split(',').filter(Boolean)"
                    :key="c"
                    class="flex items-center gap-2 text-sm text-slate-700"
                    ><input type="checkbox" disabled /> {{ c.trim() }}</label
                  >
                  <span v-if="!(field as any).choicesText" class="text-xs text-slate-400"
                    >No choices</span
                  >
                </div>
                <input
                  v-else-if="field.type === 'number'"
                  disabled
                  type="number"
                  :placeholder="`Min ${field.options?.min ?? ''} — Max ${field.options?.max ?? ''}`"
                  class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-slate-50"
                />
                <input
                  v-else-if="field.type === 'date'"
                  disabled
                  type="date"
                  class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-slate-50"
                />
                <input
                  v-else-if="field.type === 'file'"
                  disabled
                  type="file"
                  class="w-full text-sm"
                />
                <div v-else-if="field.type === 'severity-scale'" class="flex gap-1">
                  <span
                    v-for="n in (field.options?.scaleMax ?? 5) - (field.options?.scaleMin ?? 1) + 1"
                    :key="n"
                    class="flex-1 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-xs"
                    >{{ (field.options?.scaleMin ?? 1) + n - 1 }}</span
                  >
                </div>
                <span v-else class="text-xs text-slate-400"
                  >Preview for {{ field.type }} — {{ field.key }}</span
                >
              </div>
              <div class="pt-2">
                <button
                  disabled
                  class="w-full py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium opacity-60"
                >
                  Submit report
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 p-3 border border-slate-200 rounded-lg bg-slate-50">
          <p class="text-xs font-medium mb-1">Payload preview</p>
          <pre class="whitespace-pre-wrap break-words text-[11px] leading-relaxed">{{
            JSON.stringify(buildPayload(), null, 2)
          }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
