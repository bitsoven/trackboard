<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import AuthShell from '~/components/auth_shell.vue'
import TbButton from '~/components/ui/tb_button.vue'
import TbInput from '~/components/ui/tb_input.vue'
import TbAlert from '~/components/ui/tb_alert.vue'
</script>

<template>
  <AuthShell title="Sign up" subtitle="Enter your details below to create your account">
    <Form v-slot="{ processing, errors }" route="new_account.store" class="space-y-4">
      <TbAlert v-if="(errors as any)._global || (errors as any).form" variant="error">
        {{ (errors as any)._global || (errors as any).form }}
      </TbAlert>

      <TbInput
        id="fullName"
        name="fullName"
        label="Full name"
        type="text"
        :error="(errors as any).fullName"
      />

      <TbInput
        id="email"
        name="email"
        label="Email"
        type="email"
        autocomplete="email"
        :error="(errors as any).email"
      />

      <TbInput
        id="password"
        name="password"
        label="Password"
        type="password"
        autocomplete="new-password"
        :error="(errors as any).password"
      />

      <TbInput
        id="passwordConfirmation"
        name="passwordConfirmation"
        label="Confirm password"
        type="password"
        autocomplete="new-password"
        :error="(errors as any).passwordConfirmation"
      />

      <TbButton type="submit" :disabled="processing" full-width>Sign up</TbButton>
    </Form>

    <template #footer>
      Already have an account?
      <Link href="/login" class="text-brand-indigo-700 font-medium hover:underline">Log in</Link>
    </template>
  </AuthShell>
</template>
