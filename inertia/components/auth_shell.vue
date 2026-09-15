<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <div class="flex flex-1 items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center mb-6">
          <img :src="'/logo.svg'" alt="Trackboard" class="h-10 w-10 rounded-md" />
          <span class="font-heading font-bold tracking-[-0.01em] text-xl text-slate-900 mt-2"
            >Trackboard</span
          >
        </div>

        <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">
          <h1 class="text-xl font-semibold tracking-tight text-slate-900 font-heading">
            {{ title }}
          </h1>
          <p v-if="subtitle" class="text-sm text-slate-500 mt-1 mb-6">{{ subtitle }}</p>
          <div v-else class="mb-6" />
          <slot />
        </div>

        <div v-if="$slots.footer" class="text-center text-sm text-slate-500 mt-4">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
