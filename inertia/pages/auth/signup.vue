<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import { Head } from '@inertiajs/vue3'
import { toast } from 'vue-sonner'
import AuthLayout from '~/layouts/auth.vue'
import AuthShell from '~/components/auth_shell.vue'
import TbButton from '~/components/ui/tb_button.vue'
import TbInput from '~/components/ui/tb_input.vue'
import TbAlert from '~/components/ui/tb_alert.vue'

defineOptions({ layout: AuthLayout })

function githubComingSoon() {
  toast.info('GitHub sign-in is coming soon')
}
</script>

<template>
  <AuthShell title="Create your workspace" subtitle="Free forever. Self-host in minutes.">
    <Head title="Create account" />
    <Form v-slot="{ processing, errors }" route="new_account.store" class="flex flex-col gap-6">
      <TbAlert v-if="(errors as any)._global || (errors as any).form" variant="error">
        {{ (errors as any)._global || (errors as any).form }}
      </TbAlert>

      <div class="flex flex-col gap-4">
        <TbInput
          id="fullName"
          name="fullName"
          variant="auth"
          label="Full name"
          type="text"
          placeholder="Ada Lovelace"
          autocomplete="name"
          :error="(errors as any).fullName"
        />

        <TbInput
          id="email"
          name="email"
          variant="auth"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          autocomplete="email"
          :error="(errors as any).email"
        />

        <TbInput
          id="password"
          name="password"
          variant="auth"
          label="Password"
          type="password"
          placeholder="Create a password"
          autocomplete="new-password"
          :error="(errors as any).password"
        />
      </div>

      <TbButton variant="accent" size="xl" type="submit" :disabled="processing" full-width>
        Create Account
      </TbButton>

      <div class="flex items-center gap-3">
        <span class="h-px flex-1 bg-hairline" />
        <span class="text-[12px] text-ink-300">or</span>
        <span class="h-px flex-1 bg-hairline" />
      </div>

      <TbButton
        variant="accent-outline"
        size="xl"
        type="button"
        full-width
        @click="githubComingSoon"
      >
        Continue with GitHub
      </TbButton>
    </Form>

    <template #footer>
      <div class="flex items-center justify-center gap-1.5">
        <span>Already have an account?</span>
        <Link href="/login" class="font-bold text-accent hover:underline">Sign in</Link>
      </div>
    </template>
  </AuthShell>
</template>
