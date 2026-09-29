<script setup lang="ts">
import { computed } from 'vue'
import { Form, Link } from '@adonisjs/inertia/vue'
import { Head, usePage } from '@inertiajs/vue3'
import AuthLayout from '~/layouts/auth.vue'
import AuthShell from '~/components/auth_shell.vue'
import TbButton from '~/components/ui/tb_button.vue'
import TbInput from '~/components/ui/tb_input.vue'
import TbAlert from '~/components/ui/tb_alert.vue'

defineOptions({ layout: AuthLayout })

const flash = computed(() => (usePage().flash as any) || {})
</script>

<template>
  <AuthShell
    title="Reset your password"
    subtitle="Enter your email and we'll send you a reset link."
  >
    <Head title="Reset password" />
    <Form v-slot="{ processing, errors }" route="password.email" class="flex flex-col gap-6">
      <TbAlert v-if="flash.success" variant="success">{{ flash.success }}</TbAlert>
      <TbAlert v-if="flash.error" variant="error">{{ flash.error }}</TbAlert>

      <TbInput
        id="email"
        name="email"
        variant="auth"
        label="Email"
        type="email"
        placeholder="you@company.com"
        autocomplete="email"
        :error="(errors as any).email"
      />

      <TbButton variant="accent" size="xl" type="submit" :disabled="processing" full-width>
        Send Reset Link
      </TbButton>
    </Form>

    <template #footer>
      <div class="flex items-center justify-center gap-1.5">
        <span>Remembered it?</span>
        <Link href="/login" class="font-bold text-accent hover:underline">Sign in</Link>
      </div>
    </template>
  </AuthShell>
</template>
