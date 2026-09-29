<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import { Head } from '@inertiajs/vue3'
import AuthLayout from '~/layouts/auth.vue'
import AuthShell from '~/components/auth_shell.vue'
import TbButton from '~/components/ui/tb_button.vue'
import TbInput from '~/components/ui/tb_input.vue'
import TbAlert from '~/components/ui/tb_alert.vue'

defineOptions({ layout: AuthLayout })

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
    <Head title="Accept invitation" />
    <Form v-slot="{ processing, errors }" route="new_account.store" class="flex flex-col gap-6">
      <TbAlert v-if="props.error" variant="error">{{ props.error }}</TbAlert>

      <TbAlert v-if="(errors as any)._global || (errors as any).form" variant="error">
        {{ (errors as any)._global || (errors as any).form }}
      </TbAlert>

      <input type="hidden" name="inviteToken" :value="props.token ?? ''" />

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
          :default-value="props.email ?? ''"
          readonly
          hint="This email is tied to your invitation"
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
        Create account &amp; accept invite
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
