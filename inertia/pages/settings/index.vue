<script setup lang="ts">
import { computed } from 'vue'
import { Head, useForm, usePage } from '@inertiajs/vue3'
import AppShell from '~/layouts/app_shell.vue'
import SettingsShell from '~/layouts/settings_shell.vue'
import TbInput from '~/components/ui/tb_input.vue'
import TbButton from '~/components/ui/tb_button.vue'
import type { Data } from '@generated/data'

defineOptions({ layout: AppShell })

const page = usePage<Data.SharedProps>()
const user = computed(() => page.props.user!)
const flash = computed(() => (page.flash as any) || {})

const form = useForm({
  fullName: user.value?.fullName ?? '',
  email: user.value?.email ?? '',
  password: '',
  currentPassword: '',
})

function submit() {
  form.patch('/settings', {
    preserveScroll: true,
    onSuccess: () => {
      form.reset('password', 'currentPassword')
    },
  })
}
</script>

<template>
  <Head title="Settings" />

  <SettingsShell active="general">
    <div
      v-if="flash.success"
      class="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
    >
      {{ flash.success }}
    </div>

    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <h1 class="font-heading text-[26px] font-bold tracking-[-0.26px] text-ink-900">General</h1>
        <p class="font-heading text-[15px] text-ink-600">
          Your name and login details across Trackboard.
        </p>
      </div>
    </div>

    <form class="mt-6 max-w-xl" @submit.prevent="submit">
      <div class="overflow-hidden rounded-2xl border border-hairline bg-white">
        <div
          class="flex items-center border-b border-hairline bg-surface px-5 py-3.5 font-heading text-[11px] font-bold tracking-[0.55px] text-label"
        >
          ACCOUNT
        </div>
        <div class="flex flex-col gap-5 p-6">
          <TbInput
            id="fullName"
            v-model="form.fullName"
            name="fullName"
            variant="auth"
            label="Full name"
            type="text"
            placeholder="Ada Lovelace"
            autocomplete="name"
            :error="(form.errors as any).fullName"
          />

          <TbInput
            id="email"
            v-model="form.email"
            name="email"
            variant="auth"
            label="Work email"
            type="email"
            placeholder="you@company.com"
            autocomplete="email"
            :error="(form.errors as any).email"
          />

          <div class="h-px w-full bg-hairline" />

          <h2 class="font-heading text-[15px] font-bold text-ink-900">Change password</h2>
          <p class="-mt-3 text-[13px] text-ink-600">Leave blank to keep your current password.</p>

          <TbInput
            id="currentPassword"
            v-model="form.currentPassword"
            name="currentPassword"
            variant="auth"
            label="Current password"
            type="password"
            autocomplete="current-password"
            :error="(form.errors as any).currentPassword"
          />

          <TbInput
            id="password"
            v-model="form.password"
            name="password"
            variant="auth"
            label="New password"
            type="password"
            placeholder="Create a password"
            autocomplete="new-password"
            :error="(form.errors as any).password"
          />
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <TbButton variant="accent" size="xl" type="submit" :disabled="form.processing">
          Save changes
        </TbButton>
      </div>
    </form>
  </SettingsShell>
</template>
