<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="['animate-pulse bg-hairline dark:bg-surface rounded', $props.class ?? 'h-4 w-full']"
  />
</template>
