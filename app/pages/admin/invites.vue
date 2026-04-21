<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'GitHub invites — Momentfy admin' })

const toast = useToast()

interface InviteRow {
  id: string
  githubUsername: string
  status: 'PENDING' | 'SENT' | 'ACCEPTED' | 'FAILED'
  attempts: number
  lastError: string | null
  sentAt: string | null
  acceptedAt: string | null
  createdAt: string
  updatedAt: string
  account: { id: string; email: string; firstName: string | null; lastName: string | null }
}

const statusFilter = ref<string>('')
const { data: invites, refresh, status } = await useFetch<InviteRow[]>('/api/portal/admin/invites', {
  query: computed(() => ({ status: statusFilter.value || undefined })),
  default: () => []
})

const retrying = ref<string | null>(null)
async function retry(id: string) {
  retrying.value = id
  try {
    const r = await $fetch<{ status: string; error?: string }>(`/api/portal/admin/invites/${id}/retry`, { method: 'POST' })
    toast.add({
      title: r.status === 'SENT' || r.status === 'ACCEPTED' ? 'Invite sent' : 'Retry completed',
      description: r.error,
      color: r.status === 'FAILED' ? 'error' : 'success'
    })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Retry failed', description: err.statusMessage || err.message, color: 'error' })
  } finally {
    retrying.value = null
  }
}

function fmt(d: string | null) { return d ? new Date(d).toLocaleString() : '—' }
const statusColor: Record<string, 'success' | 'error' | 'warning' | 'neutral'> = {
  ACCEPTED: 'success', SENT: 'success', FAILED: 'error', PENDING: 'neutral'
}
const statusFilters = [
  { label: 'All statuses', value: '' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Sent', value: 'SENT' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Failed', value: 'FAILED' }
]
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <header>
      <h1 class="text-2xl font-bold">GitHub invites</h1>
      <p class="text-gray-500 text-sm mt-1">Customer memberships on the source-repo team. Retry failed sends after fixing a typo'd username.</p>
    </header>

    <div class="flex flex-wrap gap-2">
      <USelectMenu v-model="statusFilter" :items="statusFilters" value-key="value" class="w-44" />
      <UButton icon="i-lucide-refresh-cw" :loading="status === 'pending'" @click="refresh">Refresh</UButton>
    </div>

    <UCard class="!shadow-none">
      <div v-if="!invites.length" class="text-center py-10 text-gray-500">
        <UIcon name="i-simple-icons-github" class="size-8 mx-auto opacity-40" />
        <p class="mt-3 text-sm">No invites.</p>
      </div>
      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <div v-for="i in invites" :key="i.id" class="px-4 py-3">
          <div class="flex items-center gap-4">
            <UIcon name="i-simple-icons-github" class="size-5" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap text-sm">
                <code class="font-semibold">{{ i.githubUsername }}</code>
                <UBadge :color="statusColor[i.status]" variant="soft" size="sm">{{ i.status }}</UBadge>
                <span v-if="i.attempts > 1" class="text-xs text-gray-500">{{ i.attempts }} attempts</span>
              </div>
              <div class="text-xs text-gray-500 mt-0.5">
                <NuxtLink :to="`/admin/users/${i.account.id}`" class="hover:text-primary">{{ i.account.email }}</NuxtLink>
                · sent {{ fmt(i.sentAt) }}
                <span v-if="i.acceptedAt"> · accepted {{ fmt(i.acceptedAt) }}</span>
              </div>
              <p v-if="i.lastError" class="text-xs text-error mt-1 font-mono truncate">{{ i.lastError }}</p>
            </div>
            <UButton
              v-if="i.status === 'FAILED' || i.status === 'PENDING'"
              size="xs" variant="soft" icon="i-lucide-refresh-cw"
              :loading="retrying === i.id"
              @click="retry(i.id)"
            >Retry</UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
