<script setup lang="ts">
import { computed } from 'vue'
import { Head } from '@inertiajs/vue3'

const props = defineProps<{
  status: 'success' | 'error'
  title?: string | null
  message?: string | null
}>()

const isSuccess = computed(() => props.status === 'success')
</script>

<template>
  <Head title="Report verification" />

  <div class="flex flex-1 items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="flex flex-col items-center mb-6">
        <img :src="'/logo.svg'" alt="Trackboard" class="h-10 w-10 rounded-md" />
        <span class="font-display font-bold tracking-[-0.01em] text-xl text-slate-900 mt-2"
          >Trackboard</span
        >
      </div>

      <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center">
        <template v-if="isSuccess">
          <div
            class="mx-auto mb-4 h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-xl font-semibold tracking-tight text-slate-900">You're all set</h1>
          <p class="text-sm text-slate-500 mt-2">
            Your email has been verified and your report is now visible to the team.
          </p>
          <p v-if="props.title" class="text-sm text-slate-700 font-medium mt-3">
            {{ props.title }}
          </p>
        </template>

        <template v-else>
          <div
            class="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 class="text-xl font-semibold tracking-tight text-slate-900">Link not available</h1>
          <p class="text-sm text-slate-500 mt-2">
            {{ props.message || 'This verification link is invalid or has expired.' }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
