<script setup lang="ts">
import { computed, ref } from 'vue'
import { Head, router, useForm } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'

type Project = {
  id: number
  name: string
  slug: string
  requireEmailVerification: boolean
}

const props = defineProps<{
  project: Project
}>()

const inputClass =
  'w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-600'

const form = useForm({
  name: props.project.name,
  slug: props.project.slug,
  requireEmailVerification: !!props.project.requireEmailVerification,
})

function submit() {
  form.patch(`/projects/${props.project.id}/settings`)
}

const confirmText = ref('')
const canDelete = computed(() => confirmText.value === props.project.name)

function destroy() {
  if (!canDelete.value) return
  if (!confirm(`Delete project "${props.project.name}"? This cannot be undone.`)) return
  router.delete(`/projects/${props.project.id}/settings`)
}
</script>

<template>
  <Head :title="`${props.project.name} — Settings`" />

  <div class="max-w-3xl mx-auto p-6">
    <div class="mb-6">
      <Link href="/" class="text-sm text-slate-500 hover:text-brand-indigo-700 hover:underline"
        >← Back to overview</Link
      >
      <h1 class="text-2xl font-semibold tracking-tight mt-2">
        {{ props.project.name }} — Settings
      </h1>
      <p class="text-sm text-slate-500 mt-1">Rename the project or remove it entirely.</p>
    </div>

    <form class="space-y-6" @submit.prevent="submit">
      <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200">
          <h2 class="text-sm font-semibold flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
            Project details
          </h2>
          <p class="text-xs text-slate-500 mt-1">The slug is used in widget and API URLs.</p>
        </div>

        <div class="p-5 space-y-4">
          <div>
            <label for="name" class="block text-xs font-medium text-slate-700 mb-1"
              >Project name</label
            >
            <input
              id="name"
              v-model="form.name"
              type="text"
              :data-invalid="form.errors.name ? 'true' : undefined"
              :class="inputClass"
            />
            <div v-if="form.errors.name" class="text-xs text-red-600 mt-1">
              {{ form.errors.name }}
            </div>
          </div>

          <div>
            <label for="slug" class="block text-xs font-medium text-slate-700 mb-1">Slug</label>
            <input
              id="slug"
              v-model="form.slug"
              type="text"
              :data-invalid="form.errors.slug ? 'true' : undefined"
              :class="inputClass"
            />
            <div v-if="form.errors.slug" class="text-xs text-red-600 mt-1">
              {{ form.errors.slug }}
            </div>
          </div>
        </div>
      </section>

      <!-- Reporting -->
      <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200">
          <h2 class="text-sm font-semibold flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
            Reporting
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            Control how reports are queued when they are submitted.
          </p>
        </div>

        <div class="p-5 space-y-4">
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="form.requireEmailVerification"
              type="checkbox"
              class="mt-0.5 rounded border-slate-300"
            />
            <span>
              <span class="block text-sm font-medium text-slate-700"
                >Require email verification</span
              >
              <span class="block text-xs text-slate-500 mt-0.5">
                When enabled, new reports start in a hidden "pending verification" state and the
                reporter is emailed a magic link to confirm before the report is shown to your team.
              </span>
            </span>
          </label>
        </div>
      </section>

      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="form.processing"
          class="px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500 disabled:opacity-50"
        >
          Save changes
        </button>
      </div>
    </form>

    <!-- Danger zone -->
    <section class="mt-6 bg-white border border-red-200 rounded-xl overflow-hidden">
      <div class="px-5 py-4 border-b border-red-100">
        <h2 class="text-sm font-semibold flex items-center gap-2 text-red-700">
          <span class="h-2 w-2 rounded-full bg-red-500"></span>
          Danger zone
        </h2>
        <p class="text-xs text-slate-500 mt-1">
          Deleting a project removes all reports, templates, API keys and team access.
        </p>
      </div>

      <div class="p-5 space-y-3">
        <p class="text-xs text-slate-600">
          Type <span class="font-medium">{{ props.project.name }}</span> to confirm deletion.
        </p>
        <input v-model="confirmText" type="text" placeholder="Project name" :class="inputClass" />
        <button
          type="button"
          :disabled="!canDelete"
          class="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="destroy"
        >
          Delete project
        </button>
      </div>
    </section>
  </div>
</template>
