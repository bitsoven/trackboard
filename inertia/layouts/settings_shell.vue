<script setup lang="ts">
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { toast } from 'vue-sonner'

const props = defineProps<{
  /** Currently active nav key, e.g. "general" or "team". */
  active: 'general' | 'team'
}>()

const page = usePage<any>()
/** Team members are per-project; the nav link needs a project to target. */
const firstProject = computed(() => (page.props.projects ?? [])[0] ?? null)

function comingSoon() {
  toast.info('Coming soon')
}
</script>

<template>
  <div class="flex flex-col items-start gap-10 md:flex-row">
    <!-- Settings nav -->
    <nav class="flex w-full shrink-0 flex-col gap-1 md:w-[220px]" aria-label="Settings sections">
      <Link
        href="/settings"
        class="rounded-lg px-3.5 py-2.5 font-heading text-[14px] leading-none transition-colors"
        :class="
          props.active === 'general'
            ? 'bg-status-bg font-bold text-accent'
            : 'font-medium text-ink-600 hover:bg-surface'
        "
      >
        General
      </Link>

      <component
        :is="firstProject ? 'a' : 'button'"
        v-bind="firstProject ? { href: `/settings/team` } : { type: 'button' }"
        class="rounded-lg px-3.5 py-2.5 text-left font-heading text-[14px] leading-none transition-colors"
        :class="
          props.active === 'team'
            ? 'bg-status-bg font-bold text-accent'
            : 'font-medium text-ink-600 hover:bg-surface'
        "
        @click="!firstProject && comingSoon()"
      >
        Team Members
      </component>

      <button
        v-for="item in ['Roles & Permissions', 'Notifications', 'Billing']"
        :key="item"
        type="button"
        class="rounded-lg bg-transparent px-3.5 py-2.5 text-left font-heading text-[14px] font-medium leading-none text-ink-600 hover:bg-surface"
        @click="comingSoon"
      >
        {{ item }}
      </button>
    </nav>

    <!-- Right content -->
    <div class="min-w-0 flex-1">
      <slot />
    </div>
  </div>
</template>
