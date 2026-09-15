<script setup lang="ts">
import { computed } from 'vue'
import { Head, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'

const page = usePage<Data.SharedProps>()
const user = computed(() => page.props.user!)
const projects = computed<any[]>(() => (page.props as any).projects ?? [])
const currentProject = computed(() => projects.value[0] ?? null)
const flash = computed(() => (page.flash as any) || {})

const form = useForm({
  fullName: user.value?.fullName ?? '',
  email: user.value?.email ?? '',
  password: '',
  passwordConfirmation: '',
  currentPassword: '',
})

function submit() {
  form.patch('/settings')
}

const inputClass =
  'w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-600'
</script>

<template>
  <Head title="Settings" />

  <div class="max-w-5xl mx-auto p-6">
    <div class="mb-6">
      <Link href="/" class="text-sm text-slate-500 hover:text-brand-indigo-700 hover:underline"
        >← Back to overview</Link
      >
      <h1 class="text-2xl font-semibold tracking-tight mt-2 font-heading">Settings</h1>
      <p class="text-sm text-slate-500 mt-1">
        Manage your account details, password and project preferences.
      </p>
    </div>

    <div
      v-if="flash.success"
      class="mb-4 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg p-3 text-sm"
    >
      {{ flash.success }}
    </div>
    <div
      v-if="flash.error"
      class="mb-4 border border-red-200 bg-red-50 text-red-700 rounded-lg p-3 text-sm"
    >
      {{ flash.error }}
    </div>
    <div
      v-if="(form.errors as any)._global"
      class="mb-4 border border-red-200 bg-red-50 text-red-700 rounded-lg p-3 text-sm"
    >
      {{ (form.errors as any)._global }}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Account -->
      <form class="space-y-6" @submit.prevent="submit">
        <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-200">
            <h2 class="text-sm font-semibold flex items-center gap-2 font-heading">
              <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
              Account settings
            </h2>
            <p class="text-xs text-slate-500 mt-1">
              Your name and email are shown across Trackboard.
            </p>
          </div>

          <div class="p-5 space-y-4">
            <div>
              <label for="fullName" class="block text-xs font-medium text-slate-700 mb-1"
                >Full name</label
              >
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                :data-invalid="form.errors.fullName ? 'true' : undefined"
                :class="inputClass"
              />
              <div v-if="form.errors.fullName" class="text-xs text-red-600 mt-1">
                {{ form.errors.fullName }}
              </div>
            </div>

            <div>
              <label for="email" class="block text-xs font-medium text-slate-700 mb-1">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                :data-invalid="form.errors.email ? 'true' : undefined"
                :class="inputClass"
              />
              <div v-if="form.errors.email" class="text-xs text-red-600 mt-1">
                {{ form.errors.email }}
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-200">
            <h2 class="text-sm font-semibold flex items-center gap-2 font-heading">
              <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
              Change password
            </h2>
            <p class="text-xs text-slate-500 mt-1">Leave blank to keep your current password.</p>
          </div>

          <div class="p-5 space-y-4">
            <div>
              <label for="currentPassword" class="block text-xs font-medium text-slate-700 mb-1"
                >Current password</label
              >
              <input
                id="currentPassword"
                v-model="form.currentPassword"
                type="password"
                autocomplete="current-password"
                :data-invalid="form.errors.currentPassword ? 'true' : undefined"
                :class="inputClass"
              />
              <div v-if="form.errors.currentPassword" class="text-xs text-red-600 mt-1">
                {{ form.errors.currentPassword }}
              </div>
            </div>

            <div>
              <label for="password" class="block text-xs font-medium text-slate-700 mb-1"
                >New password</label
              >
              <input
                id="password"
                v-model="form.password"
                type="password"
                autocomplete="new-password"
                :data-invalid="form.errors.password ? 'true' : undefined"
                :class="inputClass"
              />
              <div v-if="form.errors.password" class="text-xs text-red-600 mt-1">
                {{ form.errors.password }}
              </div>
            </div>

            <div>
              <label
                for="passwordConfirmation"
                class="block text-xs font-medium text-slate-700 mb-1"
                >Confirm new password</label
              >
              <input
                id="passwordConfirmation"
                v-model="form.passwordConfirmation"
                type="password"
                autocomplete="new-password"
                :class="inputClass"
              />
            </div>
          </div>
        </section>

        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="form.processing"
            class="px-4 py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500 disabled:opacity-50"
          >
            Save account changes
          </button>
        </div>
      </form>

      <!-- Project settings -->
      <div class="space-y-6">
        <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-200">
            <h2 class="text-sm font-semibold flex items-center gap-2 font-heading">
              <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
              Project settings
            </h2>
            <p class="text-xs text-slate-500 mt-1">
              Name, slug and verification for your current project.
            </p>
          </div>

          <div class="p-5">
            <div
              v-if="!currentProject"
              class="text-sm text-slate-500 py-4 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50"
            >
              No projects yet —
              <Link href="/projects" class="text-brand-indigo-700 hover:underline">create one</Link>
              to configure project settings.
            </div>
            <div v-else class="space-y-3">
              <div
                class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50"
              >
                <span
                  class="h-9 w-9 rounded-md bg-brand-indigo-100 text-brand-indigo-700 flex items-center justify-center text-sm font-semibold shrink-0"
                  >{{ currentProject.name.slice(0, 1).toUpperCase() }}</span
                >
                <span class="flex-1 min-w-0">
                  <span class="block text-sm font-medium truncate">{{ currentProject.name }}</span>
                  <span class="block text-xs text-slate-400 font-mono truncate"
                    >/{{ currentProject.slug }}</span
                  >
                </span>
              </div>
              <p class="text-xs text-slate-600">
                Project-level settings like name, slug and
                <span class="font-medium">require email verification</span> are managed on the
                dedicated project settings page.
              </p>
              <div class="flex gap-2">
                <Link
                  :href="`/projects/${currentProject.id}/settings`"
                  class="inline-flex items-center px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50"
                >
                  Open project settings
                </Link>
                <Link
                  :href="`/projects/${currentProject.id}`"
                  class="inline-flex items-center px-3 py-1.5 rounded-md bg-brand-indigo-700 text-white text-xs font-medium hover:bg-brand-indigo-500"
                >
                  View project
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-slate-500">Tips</h3>
          <ul class="text-sm text-slate-600 mt-2 space-y-1 list-disc list-inside">
            <li>Email verification helps filter spam when you embed the widget publicly.</li>
            <li>Use a short slug — it appears in widget URLs.</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
