<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import AuthShell from '~/components/auth_shell.vue'
import TbButton from '~/components/ui/tb_button.vue'
import TbInput from '~/components/ui/tb_input.vue'
import TbAlert from '~/components/ui/tb_alert.vue'

const props = defineProps<{
  token: string | null
  email: string | null
  projectName: string | null
  error: string | null
}>()
</script>

<template>
  <AuthShell
    title="Accept your invitation"
    :subtitle="
      props.projectName
        ? `You've been invited to join ${props.projectName} on Trackboard.`
        : 'Create your account to continue.'
    "
  >
    <TbAlert v-if="props.error" variant="error" class="mb-4">
      {{ props.error }}
    </TbAlert>

    <Form v-slot="{ processing, errors }" route="new_account.store" class="space-y-4">
      <TbAlert v-if="(errors as any)._global || (errors as any).form" variant="error">
        {{ (errors as any)._global || (errors as any).form }}
      </TbAlert>

      <input type="hidden" name="inviteToken" :value="props.token ?? ''" />

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
        :default-value="props.email ?? ''"
        readonly
        hint="This email is tied to your invitation"
        :error="(errors as any).email"
      />

      <TbInput
        id="password"
        name="password"
        label="Password"
        type="password"
        :error="(errors as any).password"
      />

      <TbInput
        id="passwordConfirmation"
        name="passwordConfirmation"
        label="Confirm password"
        type="password"
        :error="(errors as any).passwordConfirmation"
      />

      <TbButton type="submit" :disabled="processing" full-width>
        Create account & accept invite
      </TbButton>
    </Form>

    <template #footer>
      Already have an account?
      <Link href="/login" class="text-brand-indigo-700 font-medium hover:underline">Log in</Link>
      — your invite will be accepted automatically.
    </template>
  </AuthShell>
</template>
