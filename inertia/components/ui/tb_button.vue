<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    fullWidth?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    type: 'button',
    fullWidth: false,
  }
)

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-indigo-700 text-white hover:bg-brand-indigo-500 focus-visible:ring-brand-indigo-700 border border-transparent',
  secondary:
    'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:ring-brand-teal-600',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent focus-visible:ring-slate-300',
  destructive:
    'bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-600 border border-transparent',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-5 py-2.5 text-sm rounded-md',
}

const classes = computed(() => [
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.fullWidth ? 'w-full' : '',
])
</script>

<template>
  <button :type="props.type" :disabled="props.disabled || props.loading" :class="classes">
    <slot />
  </button>
</template>
