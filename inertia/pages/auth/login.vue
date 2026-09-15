<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import AuthShell from '~/components/auth_shell.vue'
import TbButton from '~/components/ui/tb_button.vue'
import TbInput from '~/components/ui/tb_input.vue'
import TbAlert from '~/components/ui/tb_alert.vue'
</script>

<template>
  <AuthShell title="Login" subtitle="Enter your details below to login to your account">
    <Form v-slot="{ processing, errors }" route="session.store" class="space-y-4">
      <TbAlert v-if="(errors as any)._global || (errors as any).form" variant="error">
        {{ (errors as any)._global || (errors as any).form }}
      </TbAlert>

      <TbInput
        id="email"
        name="email"
        label="Email"
        type="email"
        autocomplete="username"
        :error="(errors as any).email"
      />

      <TbInput
        id="password"
        name="password"
        label="Password"
        type="password"
        autocomplete="current-password"
        :error="(errors as any).password"
      />

      <TbButton type="submit" :disabled="processing" full-width>Login</TbButton>
    </Form>

    <template #footer>
      Need an account?
      <Link href="/signup" class="text-brand-indigo-700 font-medium hover:underline">Sign up</Link>
    </template>
  </AuthShell>
</template>
