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
  <AuthShell title="Welcome back" subtitle="Sign in to your Trackboard workspace.">
    <Head title="Sign in" />
    <Form v-slot="{ processing, errors }" route="session.store" class="flex flex-col gap-6">
      <TbAlert v-if="(errors as any)._global || (errors as any).form" variant="error">
        {{ (errors as any)._global || (errors as any).form }}
      </TbAlert>

      <div class="flex flex-col gap-4">
        <TbInput
          id="email"
          name="email"
          variant="auth"
          label="Email"
          type="email"
          placeholder="you@company.com"
          autocomplete="username"
          :error="(errors as any).email"
        />

        <TbInput
          id="password"
          name="password"
          variant="auth"
          label="Password"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
          :error="(errors as any).password"
        />
      </div>

      <div class="flex justify-end">
        <Link href="/forgot-password" class="text-[13px] font-medium text-accent hover:underline">
          Forgot password?
        </Link>
      </div>

      <TbButton variant="accent" size="xl" type="submit" :disabled="processing" full-width>
        Sign In
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
        <span>Don't have an account?</span>
        <Link href="/signup" class="font-bold text-accent hover:underline">Sign up</Link>
      </div>
    </template>
  </AuthShell>
</template>
