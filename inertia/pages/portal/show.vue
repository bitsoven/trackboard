<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3'

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
</script>

<template>
  <Head :title="`Report #${report.id} — ${report.title}`" />

  <div class="max-w-2xl mx-auto p-6">
    <div class="bg-white border rounded p-4">
      <h1 class="text-xl font-semibold">{{ report.title }}</h1>
      <p class="text-sm text-gray-500">
        #{{ report.id }} · {{ report.status }} / {{ report.priority }}
      </p>
    </div>

    <div class="mt-6 bg-white border rounded p-4">
      <h2 class="font-medium mb-3">Conversation</h2>
      <div v-if="thread.length === 0" class="text-sm text-gray-500">No messages yet.</div>
      <div v-else class="space-y-3">
        <div
          v-for="message in thread"
          :key="message.id"
          class="flex"
          :class="message.direction === 'outbound' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[80%] rounded p-3 text-sm"
            :class="
              message.direction === 'outbound' ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
            "
          >
            <p class="text-xs opacity-70 mb-1">
              {{ message.authorName }} ·
              {{ message.createdAt ? new Date(message.createdAt).toLocaleString() : '' }}
            </p>
            <p class="whitespace-pre-wrap">{{ message.body }}</p>
          </div>
        </div>
      </div>

      <form class="mt-4" @submit.prevent="sendReply">
        <textarea
          v-model="replyForm.body"
          rows="3"
          class="w-full border rounded p-2 text-sm"
          placeholder="Write a reply…"
        ></textarea>
        <button
          type="submit"
          class="mt-2 text-sm px-3 py-1 bg-black text-white rounded disabled:opacity-50"
          :disabled="replyForm.processing || !replyForm.body"
        >
          Send reply
        </button>
      </form>
    </div>
  </div>
</template>
