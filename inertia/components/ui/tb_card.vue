<script setup lang="ts">
defineProps<{
  padded?: boolean
}>()
</script>

<template>
  <section class="bg-white border border-hairline rounded-xl overflow-hidden">
    <div v-if="$slots.header" class="px-5 py-4 border-b border-hairline">
      <slot name="header" />
    </div>
    <div :class="padded === false ? '' : 'p-5'">
      <slot />
    </div>
  </section>
</template>
