<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
</script>

<template>
  <div class="flex flex-1 items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="flex flex-col items-center mb-6">
        <img :src="'/logo.svg'" alt="Trackboard" class="h-10 w-10 rounded-md" />
        <span class="font-display font-bold tracking-[-0.01em] text-xl text-slate-900 mt-2"
          >Trackboard</span
        >
      </div>

      <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <h1 class="text-xl font-semibold tracking-tight text-slate-900">Sign up</h1>
        <p class="text-sm text-slate-500 mt-1 mb-6">
          Enter your details below to create your account
        </p>

        <Form v-slot="{ processing, errors }" route="new_account.store" class="space-y-4">
          <div>
            <label for="fullName" class="block text-xs font-medium text-slate-700 mb-1"
              >Full name</label
            >
            <input
              id="fullName"
              type="text"
              name="fullName"
              :data-invalid="errors.fullName ? 'true' : undefined"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-600"
            />
            <div v-if="errors.fullName" class="text-xs text-red-600 mt-1">
              {{ errors.fullName }}
            </div>
          </div>

          <div>
            <label for="email" class="block text-xs font-medium text-slate-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              autocomplete="email"
              :data-invalid="errors.email ? 'true' : undefined"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-600"
            />
            <div v-if="errors.email" class="text-xs text-red-600 mt-1">{{ errors.email }}</div>
          </div>

          <div>
            <label for="password" class="block text-xs font-medium text-slate-700 mb-1"
              >Password</label
            >
            <input
              id="password"
              type="password"
              name="password"
              autocomplete="new-password"
              :data-invalid="errors.password ? 'true' : undefined"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-600"
            />
            <div v-if="errors.password" class="text-xs text-red-600 mt-1">
              {{ errors.password }}
            </div>
          </div>

          <div>
            <label for="passwordConfirmation" class="block text-xs font-medium text-slate-700 mb-1"
              >Confirm password</label
            >
            <input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              autocomplete="new-password"
              :data-invalid="errors.passwordConfirmation ? 'true' : undefined"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-600"
            />
            <div v-if="errors.passwordConfirmation" class="text-xs text-red-600 mt-1">
              {{ errors.passwordConfirmation }}
            </div>
          </div>

          <button
            type="submit"
            :disabled="processing"
            class="w-full py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500 disabled:opacity-50"
          >
            Sign up
          </button>
        </Form>
      </div>

      <p class="text-center text-sm text-slate-500 mt-4">
        Already have an account?
        <Link href="/login" class="text-brand-indigo-700 font-medium hover:underline">Log in</Link>
      </p>
    </div>
  </div>
</template>
