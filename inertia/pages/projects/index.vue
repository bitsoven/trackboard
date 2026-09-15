<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Head, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { LayoutGrid, List } from '@lucide/vue'

type Project = {
  id: number
  name: string
  slug: string
  ownerId: number
  createdAt: string | null
}

const props = defineProps<{
  projects: Project[]
}>()

const flash = computed(() => (usePage().flash as any) || {})

const showModal = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')

onMounted(() => {
  const saved = localStorage.getItem('trackboard:projects-view')
  if (saved === 'list' || saved === 'grid') viewMode.value = saved
})

function setView(mode: 'grid' | 'list') {
  viewMode.value = mode
  localStorage.setItem('trackboard:projects-view', mode)
}

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

  <div class="max-w-6xl p-6">
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Projects</h1>
        <p class="text-sm text-slate-500 mt-1">Workspaces that collect and organize bug reports.</p>
      </div>
      <div class="flex items-center gap-2">
        <div v-if="sorted.length > 0" class="flex items-center border border-slate-200 rounded-md overflow-hidden mr-2">
          <button
            type="button"
            class="p-1.5 transition-colors"
            :class="viewMode === 'grid' ? 'bg-brand-indigo-700 text-white' : 'bg-white text-slate-400'"
            title="Grid view"
            @click="setView('grid')"
          >
            <LayoutGrid class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="p-1.5 transition-colors"
            :class="viewMode === 'list' ? 'bg-brand-indigo-700 text-white' : 'bg-white text-slate-400'"
            title="List view"
            @click="setView('list')"
          >
            <List class="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          class="px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500"
          @click="openModal"
        >
          New project
        </button>
      </div>
    </div>

    <div
      v-if="flash.success"
      class="mb-4 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg p-3 text-sm"
    >
      {{ flash.success }}
    </div>

    <div
      v-if="sorted.length === 0"
      class="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center"
    >
      <p class="text-sm text-slate-600 mb-3">You don't have any projects yet.</p>
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500"
        @click="openModal"
      >
        Create your first project
      </button>
    </div>

    <!-- Grid view -->
    <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Link
        v-for="p in sorted"
        :key="p.id"
        :href="`/projects/${p.id}`"
        class="block bg-white border border-slate-200 rounded-xl p-6 hover:border-brand-indigo-400 hover:shadow-sm transition-all"
      >
        <div
          class="h-10 w-10 rounded-lg bg-brand-indigo-100 text-brand-indigo-700 flex items-center justify-center font-semibold mb-4"
        >
          {{ p.name.slice(0, 1).toUpperCase() }}
        </div>
        <div class="text-base font-semibold truncate">{{ p.name }}</div>
        <div class="text-xs text-slate-400 font-mono mt-1 truncate">/{{ p.slug }}</div>
        <div class="text-xs text-slate-500 mt-3">
          Created {{ p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '' }}
        </div>
      </Link>
    </div>

    <!-- List view -->
    <div v-else class="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div class="flex items-center gap-4 px-5 py-3 border-b border-slate-200 text-xs font-medium text-slate-500 uppercase tracking-wider">
        <span class="flex-1 min-w-0">Name</span>
        <span class="w-64 shrink-0">Slug</span>
        <span class="w-28 shrink-0 text-right">Created</span>
      </div>
      <Link
        v-for="p in sorted"
        :key="p.id"
        :href="`/projects/${p.id}`"
        class="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
      >
        <div class="flex-1 min-w-0 flex items-center gap-3">
          <div
            class="h-8 w-8 rounded-md bg-brand-indigo-100 text-brand-indigo-700 flex items-center justify-center text-sm font-semibold shrink-0"
          >
            {{ p.name.slice(0, 1).toUpperCase() }}
          </div>
          <span class="text-sm font-medium truncate">{{ p.name }}</span>
        </div>
        <div class="w-64 shrink-0 text-xs text-slate-400 font-mono truncate">/{{ p.slug }}</div>
        <div class="w-28 shrink-0 text-xs text-slate-500 text-right">
          {{ p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '' }}
        </div>
      </Link>
    </div>
  </div>

  <!-- New project modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    @click.self="closeModal"
  >
    <div class="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">New project</h2>
        <button type="button" class="text-slate-400 hover:text-slate-700" @click="closeModal">
          ✕
        </button>
      </div>

      <form class="space-y-4" @submit.prevent="createProject">
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Acme Web App"
            class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
            :class="{ 'border-red-400': form.errors.name }"
          />
          <p v-if="form.errors.name" class="text-xs text-red-600 mt-1">{{ form.errors.name }}</p>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1">
            Slug <span class="text-slate-400">(optional — auto-generated)</span>
          </label>
          <input
            v-model="form.slug"
            type="text"
            placeholder="acme-web-app"
            class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm font-mono"
            :class="{ 'border-red-400': form.errors.slug }"
          />
          <p v-if="form.errors.slug" class="text-xs text-red-600 mt-1">{{ form.errors.slug }}</p>
        </div>

        <label class="flex items-start gap-3 cursor-pointer">
          <input
            v-model="form.requireEmailVerification"
            type="checkbox"
            class="mt-0.5 rounded border-slate-300"
          />
          <span>
            <span class="block text-sm font-medium text-slate-700">Require email verification</span>
            <span class="block text-xs text-slate-500 mt-0.5">
              Reporters must confirm via a magic link before reports appear in your queue.
            </span>
          </span>
        </label>

        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            class="px-4 py-2 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="form.processing"
            class="px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500 disabled:opacity-50"
          >
            Create project
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
