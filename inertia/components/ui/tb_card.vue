<script setup lang="ts">
defineProps<{
  padded?: boolean
}>()
</script>

<template>
  <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
    <div v-if="$slots.header" class="px-5 py-4 border-b border-slate-200">
      <slot name="header" />
    </div>
    <div :class="padded === false ? '' : 'p-5'">
      <slot />
    </div>
  </section>
</template>
