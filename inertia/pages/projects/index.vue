<script setup lang="ts">
import { computed, ref } from 'vue'
import { Head, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { LayoutGrid, List } from '@lucide/vue'
import AppShell from '~/layouts/app_shell.vue'
import TbButton from '~/components/ui/tb_button.vue'
import TbInput from '~/components/ui/tb_input.vue'

type Project = {
  id: number
  name: string
  slug: string
  ownerId: number
  createdAt: string | null
}

defineOptions({ layout: AppShell })

const props = defineProps<{
  projects: Project[]
}>()

const flash = computed(() => (usePage().flash as any) || {})

const viewMode = ref<'grid' | 'list'>('grid')
const showModal = ref(false)
const form = useForm({
  name: '',
  slug: '',
  requireEmailVerification: false,
})

function openModal() {
  form.reset()
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function createProject() {
  form.post('/projects', {
    onSuccess: () => {
      showModal.value = false
    },
  })
}

const sorted = computed(() =>
  [...props.projects].sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? ''))
)
</script>

<template>
  <Head title="Projects" />

  <div class="flex flex-col gap-7">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <h1 class="font-heading text-[28px] font-bold tracking-[-0.28px] text-ink-900">Projects</h1>
        <p class="font-heading text-[15px] text-ink-600">
          Workspaces that collect and organize bug reports.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <div
          v-if="sorted.length > 0"
          class="mr-2 flex items-center overflow-hidden rounded-md border border-hairline"
        >
          <button
            type="button"
            class="p-1.5 transition-colors"
            :class="
              viewMode === 'grid'
                ? 'bg-accent text-white'
                : 'bg-white text-ink-300 hover:text-ink-600'
            "
            title="Grid view"
            @click="viewMode = 'grid'"
          >
            <LayoutGrid class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="p-1.5 transition-colors"
            :class="
              viewMode === 'list'
                ? 'bg-accent text-white'
                : 'bg-white text-ink-300 hover:text-ink-600'
            "
            title="List view"
            @click="viewMode = 'list'"
          >
            <List class="h-4 w-4" />
          </button>
        </div>
        <TbButton variant="accent" size="lg" @click="openModal"> + New Project </TbButton>
      </div>
    </div>

    <div
      v-if="flash.success"
      class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
    >
      {{ flash.success }}
    </div>

    <div
      v-if="sorted.length === 0"
      class="rounded-2xl border border-dashed border-hairline bg-white/60 p-10 text-center"
    >
      <p class="font-heading text-[14px] text-ink-600">You don't have any projects yet.</p>
      <TbButton variant="accent" class="mt-4" @click="openModal">
        Create your first project
      </TbButton>
    </div>

    <!-- Grid view -->
    <div
      v-else-if="viewMode === 'grid'"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <Link
        v-for="p in sorted"
        :key="p.id"
        :href="`/projects/${p.id}`"
        class="block rounded-2xl border border-hairline bg-white p-6 transition-all hover:border-accent/40 hover:shadow-sm"
      >
        <span
          class="mb-4 flex size-10 items-center justify-center rounded-[10px] bg-status-bg font-heading font-bold text-status-fg"
        >
          {{ p.name.slice(0, 1).toUpperCase() }}
        </span>
        <span class="block truncate font-heading text-base font-semibold text-ink-900">
          {{ p.name }}
        </span>
        <span class="mt-1 block truncate font-mono text-xs text-ink-300">/{{ p.slug }}</span>
        <span class="mt-3 block text-xs text-ink-600">
          Created {{ p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '' }}
        </span>
      </Link>
    </div>

    <!-- List view -->
    <div v-else class="overflow-hidden rounded-2xl border border-hairline bg-white">
      <Link
        v-for="p in sorted"
        :key="p.id"
        :href="`/projects/${p.id}`"
        class="flex items-center gap-3 border-b border-hairline px-5 py-4 transition-colors last:border-b-0 hover:bg-surface"
      >
        <span
          class="flex size-8 shrink-0 items-center justify-center rounded-md bg-status-bg font-heading text-sm font-bold text-status-fg"
        >
          {{ p.name.slice(0, 1).toUpperCase() }}
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate font-heading text-sm font-medium text-ink-900">{{
            p.name
          }}</span>
        </span>
        <span class="hidden w-52 shrink-0 truncate font-mono text-xs text-ink-300 sm:block">
          /{{ p.slug }}
        </span>
        <span class="w-28 shrink-0 text-right text-xs text-ink-600">
          {{ p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '' }}
        </span>
      </Link>
    </div>
  </div>

  <!-- New project modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-heading"
    @click.self="closeModal"
  >
    <div class="w-full max-w-md rounded-2xl bg-white p-6">
      <h2 class="text-lg font-bold text-ink-900">New project</h2>
      <form class="mt-5 flex flex-col gap-4" @submit.prevent="createProject">
        <TbInput
          id="project-name"
          v-model="form.name"
          name="name"
          variant="auth"
          label="Name"
          type="text"
          placeholder="Acme Web App"
          :error="form.errors.name"
        />
        <TbInput
          id="project-slug"
          v-model="form.slug"
          name="slug"
          variant="auth"
          label="Slug"
          type="text"
          placeholder="acme-web-app"
          hint="Optional — auto-generated from the name."
          :error="form.errors.slug"
        />
        <label class="flex cursor-pointer items-start gap-3">
          <input v-model="form.requireEmailVerification" type="checkbox" class="mt-1 rounded" />
          <span>
            <span class="block text-sm font-medium text-ink-900">Require email verification</span>
            <span class="block text-xs text-ink-600">
              Reporters must confirm via a magic link before reports appear in your queue.
            </span>
          </span>
        </label>
        <div class="flex justify-end gap-2 pt-2">
          <TbButton variant="ghost" @click="closeModal">Cancel</TbButton>
          <TbButton variant="accent" type="submit" :disabled="form.processing"
            >Create project</TbButton
          >
        </div>
      </form>
    </div>
  </div>
</template>
