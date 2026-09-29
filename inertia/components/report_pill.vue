<script setup lang="ts">
/**
 * Small rounded label used for the report's status, priority and type. Colour
 * comes from the caller via class passthrough.
 */
</script>

<template>
  <span
    class="inline-flex items-center rounded-[20px] px-3 py-[5px] font-heading text-[12px] font-bold leading-none"
  >
    <slot />
  </span>
</template>
