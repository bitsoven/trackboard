<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <section class="flex flex-col gap-3.5 rounded-2xl border border-hairline bg-white p-6">
    <p v-if="label" class="font-heading text-[12px] font-bold tracking-[0.6px] text-label">
      {{ label }}
    </p>
    <slot />
  </section>
</template>
