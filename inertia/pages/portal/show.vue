<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3'
import BrandMark from '~/components/brand_mark.vue'
import ReportAvatar from '~/components/report_avatar.vue'
import ReportCard from '~/components/report_card.vue'
import ReportPill from '~/components/report_pill.vue'
import {
  initialsFromName,
  priorityLabel,
  priorityPillClasses,
  relativeTime,
  statusLabel,
  statusPillClasses,
} from '~/composables/use_report_display'

type Message = {
  id: number
  direction: string
  authorType: string
  authorName: string
  body: string
  createdAt: string
}

type Report = {
  id: number
  title: string
  status: string
  priority: string
}

const props = defineProps<{ report: Report; thread: Message[]; replyToToken: string }>()

const replyForm = useForm({
  body: '',
})

function sendReply() {
  replyForm.post(`/portal/${props.replyToToken}/messages`, {
    preserveScroll: true,
    onSuccess: () => {
      replyForm.reset()
      router.reload({ only: ['thread'] })
    },
  })
}

function isTeamMessage(message: Message): boolean {
  return message.authorType === 'team' || message.direction === 'inbound'
}
</script>

<template>
  <Head :title="`Report #${report.id} — ${report.title}`" />

  <div class="min-h-screen bg-canvas">
    <div class="mx-auto flex w-full max-w-[720px] flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      <div class="flex items-center gap-2.5">
        <BrandMark :size="28" />
        <span class="font-heading text-[19px] font-bold leading-none text-ink-900">Trackboard</span>
      </div>

      <ReportCard>
        <div class="flex flex-wrap items-center gap-2">
          <ReportPill :class="statusPillClasses(report.status)">
            {{ statusLabel(report.status) }}
          </ReportPill>
          <ReportPill :class="priorityPillClasses(report.priority)">
            {{ priorityLabel(report.priority) }} Priority
          </ReportPill>
          <span class="font-heading text-[12px] font-bold tracking-[0.44px] text-ink-300">
            #{{ report.id }}
          </span>
        </div>
        <h1
          class="font-heading text-[22px] font-bold leading-[1.25] tracking-[-0.22px] text-ink-900 sm:text-[26px] sm:tracking-[-0.26px]"
        >
          {{ report.title }}
        </h1>
        <p class="font-heading text-[13px] text-ink-600">
          This is your private portal — replies here are shared with the team handling your report.
        </p>
      </ReportCard>

      <ReportCard label="CONVERSATION">
        <div v-if="thread.length === 0" class="rounded-[10px] bg-surface px-4 py-6 text-center">
          <p class="font-heading text-[14px] text-ink-600">No messages yet.</p>
          <p class="mt-1 font-heading text-[13px] text-ink-300">
            Send a message below and the team will be notified.
          </p>
        </div>

        <div v-else class="flex flex-col gap-5">
          <div v-for="message in thread" :key="message.id" class="flex items-start gap-3">
            <ReportAvatar
              :initials="initialsFromName(message.authorName)"
              :tone="isTeamMessage(message) ? 'indigo' : 'amber'"
            />
            <div class="flex min-w-0 flex-1 flex-col gap-1">
              <div class="flex flex-wrap items-center gap-2">
                <p class="font-heading text-[13px] font-bold text-ink-900">
                  {{ message.authorName }}
                </p>
                <span
                  v-if="isTeamMessage(message)"
                  class="inline-flex rounded-full bg-surface px-2 py-0.5 font-heading text-[11px] font-bold tracking-[0.3px] text-ink-300"
                >
                  Team
                </span>
                <span
                  v-else
                  class="font-heading text-[11px] font-bold tracking-[0.3px] text-ink-300"
                >
                  You
                </span>
                <p class="font-heading text-[12px] text-ink-300">
                  {{ message.createdAt ? relativeTime(message.createdAt) : '' }}
                </p>
              </div>
              <div
                class="rounded-[10px] px-3.5 py-2.5"
                :class="isTeamMessage(message) ? 'border border-hairline bg-white' : 'bg-surface'"
              >
                <p class="whitespace-pre-wrap font-heading text-[14px] leading-[1.5] text-ink-900">
                  {{ message.body }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="h-px w-full bg-hairline" />

        <form class="flex flex-col gap-3" @submit.prevent="sendReply">
          <label
            for="portal-reply"
            class="font-heading text-[11px] font-bold tracking-[0.44px] text-ink-300"
          >
            YOUR REPLY
          </label>
          <textarea
            id="portal-reply"
            v-model="replyForm.body"
            rows="4"
            placeholder="Write a reply…"
            class="min-h-[96px] w-full rounded-[10px] border border-hairline bg-surface px-3.5 py-3 font-heading text-[14px] leading-[1.5] text-ink-900 placeholder:text-ink-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          ></textarea>
          <p v-if="replyForm.errors.body" class="font-heading text-[13px] text-red-600">
            {{ replyForm.errors.body }}
          </p>
          <div class="flex items-center justify-end">
            <button
              type="submit"
              :disabled="replyForm.processing || !replyForm.body.trim()"
              class="inline-flex shrink-0 items-center justify-center rounded-[10px] bg-accent px-5 py-3 font-heading text-[14px] font-bold text-white transition-colors hover:bg-accent-strong disabled:pointer-events-none disabled:opacity-50"
            >
              {{ replyForm.processing ? 'Sending…' : 'Send reply' }}
            </button>
          </div>
        </form>
      </ReportCard>

      <p class="text-center font-heading text-[12px] text-ink-300">
        © 2026 Trackboard — private portal link
      </p>
    </div>
  </div>
</template>
