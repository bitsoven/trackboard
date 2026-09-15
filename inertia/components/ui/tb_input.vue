<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    id?: string
    name?: string
    type?: string
    placeholder?: string
    error?: string | null
    hint?: string
    disabled?: boolean
    required?: boolean
    autocomplete?: string
    readonly?: boolean
    defaultValue?: string
  }>(),
  {
    modelValue: undefined,
    label: undefined,
    id: undefined,
    name: undefined,
    type: 'text',
    placeholder: undefined,
    error: undefined,
    hint: undefined,
    disabled: false,
    required: false,
    autocomplete: undefined,
    readonly: false,
    defaultValue: undefined,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputId = computed(() => props.id ?? props.label?.toLowerCase().replace(/\s+/g, '-'))

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const inputClasses = computed(() => [
  'w-full border rounded-md px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors',
  props.error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-teal-600',
  props.disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : '',
  props.readonly ? 'bg-slate-50 text-slate-500' : '',
])
</script>

<template>
  <div>
    <label v-if="props.label" :for="inputId" class="block text-xs font-medium text-slate-700 mb-1">
      {{ props.label }}<span v-if="props.required" class="text-red-500 ml-0.5">*</span>
    </label>
    <input
      :id="inputId"
      :name="props.name ?? inputId"
      :type="props.type"
      :value="props.modelValue ?? props.defaultValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
      :autocomplete="props.autocomplete"
      :readonly="props.readonly"
      :data-invalid="props.error ? 'true' : undefined"
      :aria-invalid="!!props.error"
      :aria-describedby="
        props.error ? `${inputId}-error` : props.hint ? `${inputId}-hint` : undefined
      "
      :class="inputClasses"
      @input="onInput"
    />
    <p v-if="props.error" :id="`${inputId}-error`" class="text-xs text-red-600 mt-1">
      {{ props.error }}
    </p>
    <p v-else-if="props.hint" :id="`${inputId}-hint`" class="text-xs text-slate-500 mt-1">
      {{ props.hint }}
    </p>
    <slot name="hint" />
  </div>
</template>
