<script setup lang="ts">
import { computed } from 'vue'

type Tone = 'indigo' | 'teal' | 'amber'
type Size = 'xs' | 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    initials: string
    tone?: Tone
    size?: Size
  }>(),
  {
    tone: 'indigo',
    size: 'md',
  }
)

const toneClasses: Record<Tone, string> = {
  indigo: 'bg-accent text-white',
  teal: 'bg-avatar-teal text-white',
  amber: 'bg-avatar-amber text-white',
}

const sizeClasses: Record<Size, string> = {
  xs: 'size-5 rounded-[10px] text-[8px]',
  sm: 'size-6 rounded-[12px] text-[9px]',
  md: 'size-8 rounded-[16px] text-[11px]',
  lg: 'size-9 rounded-[18px] text-[13px]',
}

const classes = computed(() => [
  'inline-flex shrink-0 items-center justify-center font-heading font-bold',
  toneClasses[props.tone],
  sizeClasses[props.size],
])
</script>

<template>
  <span :class="classes">{{ props.initials }}</span>
</template>
