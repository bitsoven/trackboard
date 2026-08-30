<script setup lang="ts">
import { computed, ref } from 'vue'
import { Head, router, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'

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

const props = defineProps<{
  project: Project
  members: Member[]
  canManage: boolean
}>()

const TEAM_ROLES: Array<Member['role']> = ['owner', 'admin', 'member']
const flash = computed(() => (usePage().flash as any) || {})

const inviteForm = useForm({ email: '', role: 'member' as Member['role'] })

function sendInvite() {
  inviteForm.post(`/projects/${props.project.id}/team/invite`)
}

const roleForms = ref<Record<number, { role: Member['role'] }>>({})
function roleFor(member: Member): Member['role'] {
  return roleForms.value[member.id]?.role ?? member.role
}

function updateRole(member: Member) {
  router.patch(`/projects/${props.project.id}/team/${member.id}/role`, {
    role: roleFor(member),
  })
}

function onRoleChange(member: Member, event: Event) {
  const value = (event.target as HTMLSelectElement).value
  roleForms.value[member.id] = { role: value as Member['role'] }
  updateRole(member)
}

function removeMember(member: Member) {
  if (!confirm(`Remove ${member.email} from this project?`)) return
  router.post(`/projects/${props.project.id}/team/${member.id}/remove`)
}
</script>

<template>
  <Head :title="`${props.project.name} — Team`" />

  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-6">
      <Link
        :href="`/projects/${props.project.id}/integrations`"
        class="text-sm text-slate-500 hover:text-brand-indigo-700 hover:underline"
        >← Back to integrations</Link
      >
      <h1 class="text-2xl font-semibold tracking-tight mt-2">{{ props.project.name }} — Team</h1>
      <p class="text-sm text-slate-500 mt-1">
        Collaborators who can access this project's reports and settings.
      </p>
    </div>

    <div
      v-if="flash.success"
      class="mb-4 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg p-3 text-sm"
    >
      {{ flash.success }}
    </div>

    <!-- Members -->
    <section class="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
      <div class="px-5 py-4 border-b border-slate-200">
        <h2 class="text-sm font-semibold">Members</h2>
        <p class="text-xs text-slate-500 mt-1">{{ props.members.length }} people</p>
      </div>
      <div class="divide-y divide-slate-100">
        <div v-for="m in props.members" :key="m.id" class="flex items-center gap-3 px-5 py-3">
          <span
            class="h-9 w-9 rounded-full bg-brand-indigo-100 text-brand-indigo-700 flex items-center justify-center text-sm font-semibold shrink-0"
          >
            {{ (m.name || m.email).slice(0, 1).toUpperCase() }}
          </span>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium truncate">{{ m.name || m.email }}</div>
            <div class="text-xs text-slate-500 truncate">{{ m.email }}</div>
            <div class="text-xs mt-0.5">
              <span v-if="m.acceptedAt" class="text-brand-teal-600">Accepted</span>
              <span v-else class="text-amber-600">Pending invite</span>
            </div>
          </div>

          <div v-if="props.canManage" class="flex items-center gap-2">
            <select
              :value="roleFor(m)"
              class="border border-slate-300 rounded-md px-2.5 py-1.5 text-sm bg-white"
              @change="onRoleChange(m, $event)"
            >
              <option v-for="r in TEAM_ROLES" :key="r" :value="r">{{ r }}</option>
            </select>
            <button
              type="button"
              class="text-xs px-3 py-1.5 border border-red-200 rounded-md bg-white text-red-600 hover:bg-red-50 font-medium"
              @click="removeMember(m)"
            >
              Remove
            </button>
          </div>
          <span v-else class="text-xs uppercase tracking-wide text-slate-400">{{ m.role }}</span>
        </div>
      </div>
    </section>

    <!-- Invite -->
    <section
      v-if="props.canManage"
      class="bg-white border border-slate-200 rounded-xl overflow-hidden"
    >
      <div class="px-5 py-4 border-b border-slate-200">
        <h2 class="text-sm font-semibold">Invite a collaborator</h2>
        <p class="text-xs text-slate-500 mt-1">They'll receive an email with an accept link.</p>
      </div>
      <form class="p-5 space-y-3" @submit.prevent="sendInvite">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Email</label>
            <input
              v-model="inviteForm.email"
              type="email"
              placeholder="teammate@example.com"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
              :class="{ 'border-red-400': inviteForm.errors.email }"
            />
            <p v-if="inviteForm.errors.email" class="text-xs text-red-600 mt-1">
              {{ inviteForm.errors.email }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Role</label>
            <select
              v-model="inviteForm.role"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
            >
              <option v-for="r in TEAM_ROLES" :key="r" :value="r">{{ r }}</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          :disabled="inviteForm.processing"
          class="w-full py-2 rounded-md bg-brand-indigo-700 text-white text-sm font-medium hover:bg-brand-indigo-500 disabled:opacity-50"
        >
          Send invite
        </button>
      </form>
    </section>
  </div>
</template>
