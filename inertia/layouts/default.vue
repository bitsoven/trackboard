<script setup lang="ts">
/**
 * Fallback layout — minimal passthrough.
 * Pages without an explicit `defineOptions({ layout: ... })` render here.
 * Keep this free of design tokens so unauthenticated pages don't inherit
 * stale chrome (former bg-slate-50 / brand-indigo bleed).
 */
</script>

<template>
  <slot />
</template>
