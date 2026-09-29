<script setup lang="ts">
/**
 * Brand mark from the Figma design: three overlapping "board cards" with an
 * accent status dot. Renders at any size from the same 28x28 viewbox.
 */
withDefaults(defineProps<{ size?: number }>(), { size: 28 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Trackboard"
  >
    <rect x="3" y="3" width="14" height="14" rx="4" fill="#2A2650" />
    <rect x="7" y="7" width="14" height="14" rx="4" fill="#5B52A8" />
    <rect x="11" y="11" width="14" height="14" rx="4" fill="#EFEBFF" />
    <circle cx="23.5" cy="14.5" r="1.75" fill="#FF6B4A" stroke="#0F0D1A" stroke-width="1.5" />
  </svg>
</template>
