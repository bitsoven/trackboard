<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head, router, useForm, usePage } from '@inertiajs/vue3'
import { initialsFromName } from '~/composables/use_report_display'
import AppShell from '~/layouts/app_shell.vue'
import SettingsShell from '~/layouts/settings_shell.vue'
import ReportAvatar from '~/components/report_avatar.vue'
import TbInput from '~/components/ui/tb_input.vue'
import TbButton from '~/components/ui/tb_button.vue'

type Member = {
  id: number
  projectId: number
  userId: number | null
  role: 'owner' | 'admin' | 'member'
  email: string
  name: string | null
  invitedAt: string | null
  acceptedAt: string | null
}
type Project = { id: number; name: string; slug: string }

defineOptions({ layout: AppShell })

const props = defineProps<{
  project: Project
  members: Member[]
  canManage: boolean
}>()

const TEAM_ROLES: Array<Member['role']> = ['owner', 'admin', 'member']
const flash = computed(() => (usePage().flash as any) || {})

const showModal = ref(false)

const inviteForm = useForm({ email: '', role: 'member' as Member['role'] })

function openInvite() {
  inviteForm.reset()
  showModal.value = true
}

function sendInvite() {
  inviteForm.post(`/projects/${props.project.id}/team/invite`, {
    preserveScroll: true,
    onSuccess: () => {
      showModal.value = false
      router.reload({ only: ['members'] })
    },
  })
}

/** Re-invite a pending member: same endpoint regenerates their token + email. */
function resendInvite(member: Member) {
  router.post(
    `/projects/${props.project.id}/team/invite`,
    { email: member.email, role: member.role },
    { preserveScroll: true }
  )
}

function removeMember(member: Member) {
  if (!confirm(`Remove ${member.email} from this project?`)) return
  router.post(
    `/projects/${props.project.id}/team/${member.id}/remove`,
    {},
    { preserveScroll: true }
  )
}

function changeRole(member: Member, role: Member['role']) {
  if (role === member.role) return
  router.patch(
    `/projects/${props.project.id}/team/${member.id}/role`,
    { role },
    { preserveScroll: true }
  )
}

const tones = ['indigo', 'teal', 'amber'] as const

/** Stable per-person avatar tone so rows feel distinct, matching the Figma. */
function toneFor(member: Member) {
  const seed = `${member.email}`.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return tones[seed % tones.length]
}

function displayNameFor(member: Member): string {
  if (member.name) return member.name
  const local = member.email.split('@')[0] ?? member.email
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
</script>

<template>
  <Head title="Team Members" />

  <SettingsShell active="team">
    <!-- Flash feedback -->
    <div
      v-if="flash.success"
      class="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
    >
      {{ flash.success }}
    </div>

    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <h1 class="font-heading text-[26px] font-bold tracking-[-0.26px] text-ink-900">
          Team Members
        </h1>
        <p class="font-heading text-[15px] text-ink-600">
          Manage who has access to this workspace.
        </p>
      </div>
      <TbButton v-if="props.canManage" variant="accent" size="lg" @click="openInvite">
        <span class="mr-1 text-[16px]">+</span> Invite Member
      </TbButton>
    </div>

    <!-- Members table -->
    <div class="mt-6 overflow-hidden rounded-2xl border border-hairline bg-white">
      <div
        class="flex items-center border-b border-hairline bg-surface px-5 py-3.5 font-heading text-[11px] font-bold tracking-[0.55px] text-label"
      >
        <p class="min-w-0 flex-1">MEMBER</p>
        <p class="w-40 shrink-0">ROLE</p>
        <p class="w-52 shrink-0">STATUS</p>
      </div>

      <p
        v-if="props.members.length === 0"
        class="px-5 py-10 text-center font-heading text-[14px] text-ink-600"
      >
        No members yet — invite a collaborator to get started.
      </p>

      <div
        v-for="(member, index) in props.members"
        :key="member.id"
        :class="[
          'flex flex-wrap items-center gap-y-2 px-5 py-3.5',
          index < props.members.length - 1 ? 'border-b border-hairline' : '',
        ]"
      >
        <!-- Member cell -->
        <div class="flex min-w-0 flex-1 items-center gap-2.5">
          <ReportAvatar
            :initials="initialsFromName(displayNameFor(member))"
            :tone="toneFor(member)"
            size="md"
          />
          <div class="min-w-0">
            <p class="truncate font-heading text-[13px] font-bold text-ink-900">
              {{ displayNameFor(member) }}
            </p>
            <p class="truncate font-heading text-[12px] text-ink-600">{{ member.email }}</p>
          </div>
        </div>

        <!-- Role -->
        <div class="w-40 shrink-0">
          <select
            v-if="props.canManage && member.role !== 'owner'"
            :value="member.role"
            class="w-fit cursor-pointer appearance-none rounded border-0 bg-none py-1 pl-0 pr-6 font-heading text-[13px] font-medium text-ink-600 focus:ring-2 focus:ring-accent focus:outline-none"
            :aria-label="`Role for ${displayNameFor(member)}`"
            @change="
              changeRole(member, ($event.target as HTMLSelectElement).value as Member['role'])
            "
          >
            <option v-for="role in TEAM_ROLES" :key="role" :value="role" class="capitalize">
              {{ role.charAt(0).toUpperCase() + role.slice(1) }}
            </option>
          </select>
          <p v-else class="font-heading text-[13px] font-medium capitalize text-ink-600">
            {{ member.role }}
          </p>
        </div>

        <!-- Status + actions -->
        <div class="flex w-52 shrink-0 items-center justify-between gap-2">
          <span
            class="inline-flex items-center rounded-md px-2.5 py-1 font-heading text-[11px] font-bold"
            :class="
              member.acceptedAt
                ? 'bg-avatar-teal/20 text-avatar-teal'
                : 'bg-avatar-amber/20 text-avatar-amber'
            "
          >
            {{ member.acceptedAt ? 'Active' : 'Pending' }}
          </span>
          <span v-if="props.canManage && member.role !== 'owner'" class="flex items-center gap-2">
            <button
              v-if="!member.acceptedAt"
              type="button"
              class="bg-transparent p-0 font-heading text-[12px] font-medium text-ink-600 hover:text-accent"
              @click="resendInvite(member)"
            >
              Resend
            </button>
            <button
              type="button"
              class="bg-transparent p-0 font-heading text-[12px] font-medium text-ink-600 hover:text-red-600"
              @click="removeMember(member)"
            >
              Remove
            </button>
          </span>
        </div>
      </div>
    </div>

    <!-- Invite modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-heading"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 class="text-[20px] font-bold text-ink-900">Invite member</h2>
        <p class="mt-1 text-[14px] text-ink-600">They'll receive an email with an accept link.</p>

        <form class="mt-5 flex flex-col gap-4" @submit.prevent="sendInvite">
          <TbInput
            id="invite-email"
            v-model="inviteForm.email"
            name="email"
            variant="auth"
            label="Work email"
            type="email"
            placeholder="teammate@example.com"
            :error="inviteForm.errors.email"
          >
            <template #hint>
              <select
                v-model="inviteForm.role"
                class="mt-4 h-12 w-full rounded-[10px] border border-hairline bg-white px-3.5 text-[14px] focus:ring-2 focus:ring-accent focus:outline-none"
                aria-label="Role"
              >
                <option v-for="role in TEAM_ROLES" :key="role" :value="role" class="capitalize">
                  {{ role.charAt(0).toUpperCase() + role.slice(1) }}
                </option>
              </select>
            </template>
          </TbInput>

          <TbButton
            variant="accent"
            size="xl"
            type="submit"
            full-width
            :disabled="inviteForm.processing"
          >
            Send invite
          </TbButton>
        </form>
      </div>
    </div>
  </SettingsShell>
</template>
