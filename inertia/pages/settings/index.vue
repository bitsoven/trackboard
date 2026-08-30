<script setup lang="ts">
import { computed } from 'vue'
import { Head, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'

const page = usePage<Data.SharedProps>()
const user = computed(() => page.props.user!)

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

  <div class="max-w-3xl mx-auto p-6">
    <div class="mb-6">
      <Link href="/" class="text-sm text-slate-500 hover:text-brand-indigo-700 hover:underline"
        >← Back to overview</Link
      >
      <h1 class="text-2xl font-semibold tracking-tight mt-2">Settings</h1>
      <p class="text-sm text-slate-500 mt-1">Manage your account details and password.</p>
    </div>

    <form class="space-y-6" @submit.prevent="submit">
      <!-- Account -->
      <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200">
          <h2 class="text-sm font-semibold flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-brand-teal-600"></span>
            Account
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

      <!-- Change password -->
      <section class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200">
          <h2 class="text-sm font-semibold flex items-center gap-2">
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
            <label for="passwordConfirmation" class="block text-xs font-medium text-slate-700 mb-1"
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
          Save changes
        </button>
      </div>
    </form>
  </div>
</template>
