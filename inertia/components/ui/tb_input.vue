<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'default' | 'auth'

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
    variant?: Variant
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
    variant: 'default',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputId = computed(() => props.id ?? props.label?.toLowerCase().replace(/\s+/g, '-'))
const isAuth = computed(() => props.variant === 'auth')

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const inputClasses = computed(() => {
  if (isAuth.value) {
    return [
      'w-full border bg-white transition-colors focus:outline-none focus:ring-2 focus:border-transparent',
      'h-12 rounded-[10px] px-[14px] text-[14px] placeholder:text-ink-300',
      props.error ? 'border-red-300 focus:ring-red-500' : 'border-hairline focus:ring-accent',
      props.disabled || props.readonly ? 'bg-slate-50 text-slate-500' : '',
      props.disabled ? 'cursor-not-allowed' : '',
    ]
  }
  return [
    'w-full border rounded-md px-3 py-2 text-sm bg-white placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:border-transparent',
    props.error
      ? 'border-red-300 focus:ring-red-500'
      : 'border-slate-300 focus:ring-brand-teal-600',
    props.disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : '',
    props.readonly ? 'bg-slate-50 text-slate-500' : '',
  ]
})

const labelClasses = computed(() =>
  isAuth.value
    ? 'block text-[13px] font-bold text-ink-900 mb-1.5'
    : 'block text-xs font-medium text-slate-700 mb-1'
)
</script>

<template>
  <div>
    <label v-if="props.label" :for="inputId" :class="labelClasses">
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
