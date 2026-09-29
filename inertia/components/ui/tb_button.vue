<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'accent' | 'accent-outline'
type Size = 'sm' | 'md' | 'lg' | 'xl'

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
  'primary':
    'bg-accent text-white hover:bg-accent-strong focus-visible:ring-accent border border-transparent font-medium',
  'secondary':
    'bg-white text-ink-900 border border-hairline hover:bg-surface focus-visible:ring-accent font-medium',
  'ghost':
    'bg-transparent text-ink-600 hover:bg-surface hover:text-ink-900 border border-transparent focus-visible:ring-hairline font-medium',
  'destructive':
    'bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-600 border border-transparent font-medium',
  'accent':
    'bg-accent text-white hover:bg-accent-strong focus-visible:ring-accent border border-transparent font-bold',
  'accent-outline':
    'bg-white text-ink-900 border border-hairline hover:bg-surface focus-visible:ring-accent font-bold',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-5 py-2.5 text-sm rounded-md',
  xl: 'px-5 py-3.5 text-[15px] rounded-[10px]',
}

const classes = computed(() => [
  'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
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
