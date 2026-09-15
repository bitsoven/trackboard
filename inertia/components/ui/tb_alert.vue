<script setup lang="ts">
type Variant = 'info' | 'success' | 'error' | 'warning'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    title?: string
  }>(),
  {
    variant: 'info',
    title: undefined,
  }
)

const variantClasses: Record<Variant, string> = {
  info: 'bg-slate-50 border-slate-200 text-slate-700',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  error: 'bg-red-50 border-red-200 text-red-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-700',
}
</script>

<template>
  <div :class="['border rounded-lg p-3 text-sm', variantClasses[props.variant]]" role="alert">
    <p v-if="props.title" class="font-medium mb-0.5">{{ props.title }}</p>
    <slot />
  </div>
</template>
