<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import AppShell from '~/layouts/app_shell.vue'

defineOptions({ layout: AppShell })
</script>

<template>
  <Head title="Page not found" />

  <div class="flex flex-col items-center justify-center py-16 text-center">
    <p class="font-heading text-[13px] font-bold tracking-[0.78px] text-accent">404</p>
    <h1 class="mt-2 font-heading text-[30px] font-bold tracking-[-0.3px] text-ink-900">
      Page not found
    </h1>
    <p class="mt-3 max-w-md font-heading text-[16px] leading-[1.5] text-ink-600">
      The page you're looking for doesn't exist or may have been moved.
    </p>
    <Link
      href="/"
      class="mt-7 rounded-[10px] bg-accent px-5 py-3 font-heading text-[15px] font-bold text-white transition-colors hover:bg-accent-strong"
    >
      Back to dashboard
    </Link>
  </div>
</template>
