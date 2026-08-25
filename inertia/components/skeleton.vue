<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="['animate-pulse bg-slate-200 dark:bg-slate-700 rounded', $props.class ?? 'h-4 w-full']"
  />
</template>
