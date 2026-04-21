<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'Audit log — Momentfy admin' })

interface AuditRow {
  id: string
  actorId: string | null
  actor: { id: string; email: string; firstName: string | null; lastName: string | null } | null
  action: string
  targetType: string | null
  targetId: string | null
  metadata: any
  createdAt: string
}

const { data: logs, refresh, status } = await useFetch<AuditRow[]>('/api/portal/admin/audit', {
  default: () => []
})

function fmt(d: string) { return new Date(d).toLocaleString() }
function actorName(l: AuditRow) {
  if (!l.actor) return 'system'
  return `${l.actor.firstName || ''} ${l.actor.lastName || ''}`.trim() || l.actor.email
}
const actionColor: Record<string, 'success' | 'error' | 'warning' | 'neutral' | 'primary'> = {
  'license.issued.manual': 'success',
  'license.issued.via.webhook': 'success',
  'license.rotated': 'warning',
  'license.updated': 'primary',
  'activation.reset': 'warning',
  'account.updated': 'primary'
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <header class="flex items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">Audit log</h1>
        <p class="text-gray-500 text-sm mt-1">Newest first. Last 100 events.</p>
      </div>
      <UButton size="sm" variant="ghost" icon="i-lucide-refresh-cw" :loading="status === 'pending'" @click="refresh">Refresh</UButton>
    </header>

    <UCard class="!shadow-none">
      <div v-if="!logs.length" class="text-center py-10 text-gray-500">
        <UIcon name="i-lucide-list" class="size-8 mx-auto opacity-40" />
        <p class="mt-3 text-sm">No audit events yet.</p>
      </div>
      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <div v-for="l in logs" :key="l.id" class="px-4 py-3">
          <div class="flex items-center gap-3 text-sm">
            <UBadge :color="actionColor[l.action] || 'neutral'" variant="soft">{{ l.action }}</UBadge>
            <span class="text-gray-500">by</span>
            <span class="font-medium">{{ actorName(l) }}</span>
            <span class="ms-auto text-xs text-gray-500">{{ fmt(l.createdAt) }}</span>
          </div>
          <div v-if="l.targetType" class="text-xs text-gray-500 mt-1">
            target: {{ l.targetType }} · <span class="font-mono">{{ l.targetId }}</span>
          </div>
          <pre v-if="l.metadata" class="mt-2 text-xs bg-black/5 dark:bg-white/5 rounded p-2 overflow-x-auto"><code>{{ JSON.stringify(l.metadata, null, 2) }}</code></pre>
        </div>
      </div>
    </UCard>
  </div>
</template>
