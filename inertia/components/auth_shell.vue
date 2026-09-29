<script setup lang="ts">
import BrandMark from '~/components/brand_mark.vue'

defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="flex min-h-screen w-full bg-white">
    <!-- Brand panel -->
    <aside class="hidden w-[480px] shrink-0 flex-col justify-between bg-ink-panel p-14 lg:flex">
      <div class="flex items-center gap-2.5">
        <BrandMark :size="28" />
        <span class="font-heading text-[19px] font-bold leading-none text-white">Trackboard</span>
      </div>

      <div class="flex flex-col items-start gap-7">
        <BrandMark :size="84" />
        <p
          class="w-[360px] font-heading text-[26px] font-bold leading-[1.3] tracking-[-0.26px] text-white"
        >
          Bugs, issues &amp; support — tracked like cards on a board.
        </p>
        <p class="w-[320px] font-heading text-[15px] leading-[1.5] text-ink-400">
          Free, open source, and self-hosted on your own infrastructure.
        </p>
      </div>

      <p class="font-heading text-[12px] text-ink-500">© 2026 Bitsoven — MIT licensed</p>
    </aside>

    <!-- Form panel -->
    <main class="flex flex-1 items-center justify-center bg-white px-4 py-12">
      <div class="flex w-full max-w-[360px] flex-col gap-6">
        <div class="flex items-center gap-2.5 lg:hidden">
          <BrandMark :size="28" />
          <span class="font-heading text-[19px] font-bold leading-none text-ink-900"
            >Trackboard</span
          >
        </div>

        <h1 class="font-heading text-[28px] font-bold tracking-[-0.28px] text-ink-900">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="font-heading text-[15px] text-ink-600">{{ subtitle }}</p>

        <slot />

        <div v-if="$slots.footer" class="text-center font-heading text-[14px] text-ink-600">
          <slot name="footer" />
        </div>
      </div>
    </main>
  </div>
</template>
