<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Licenses — Momentfy portal' })

const { user, isAdmin, displayName } = useSession()
const config = useRuntimeConfig()

interface LicenseRow {
  id: string
  keyPrefix: string
  plan: { id: string; slug: string; name: string }
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED'
  maxActivations: number
  activeActivations: number
  expiresAt: string | null
  issuedAt: string
  revokedAt: string | null
}

const { data: licenses, refresh, status } = await useFetch<LicenseRow[]>('/api/portal/licenses', {
  default: () => []
})

function formatDate(d: string | null) {
  return d ? new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
}

const statusColor: Record<string, 'success' | 'error' | 'warning'> = {
  ACTIVE: 'success',
  REVOKED: 'error',
  EXPIRED: 'warning'
}
</script>

<template>
  <div class="space-y-8">
    <header class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold">Welcome{{ displayName ? `, ${displayName}` : '' }}</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Manage your Momentfy licenses, source-code access and billing.</p>
      </div>
      <a :href="config.public.checkoutUrl" target="_blank" rel="noopener" class="hidden sm:inline-flex items-center gap-2 px-4 h-10 rounded-full bg-primary text-white text-sm font-semibold shrink-0">
        <UIcon name="i-lucide-shopping-cart" class="size-4" />
        Buy a license
      </a>
    </header>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold">Your licenses</h2>
          <UButton size="xs" variant="ghost" icon="i-lucide-refresh-cw" :loading="status === 'pending'" @click="refresh" />
        </div>
      </template>

      <div v-if="!licenses.length" class="text-center py-12 text-gray-500 dark:text-gray-400">
        <UIcon name="i-lucide-key" class="size-10 mx-auto opacity-40" />
        <p class="mt-3 text-sm">No licenses yet.</p>
        <p class="text-xs mt-1">After you complete checkout, your license and repo invite will show up here.</p>
        <a :href="config.public.checkoutUrl" target="_blank" rel="noopener" class="inline-flex items-center gap-2 mt-4 px-4 h-9 rounded-full bg-primary text-white text-sm font-semibold">
          Buy a license
        </a>
      </div>

      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <NuxtLink
          v-for="l in licenses" :key="l.id" :to="`/dashboard/licenses/${l.id}`"
          class="flex items-center gap-4 px-4 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition"
        >
          <div class="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <UIcon name="i-lucide-key" class="size-5" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-mono text-sm font-semibold">{{ l.keyPrefix }}…</span>
              <UBadge :color="statusColor[l.status]" variant="soft" size="sm">{{ l.status }}</UBadge>
              <span class="text-xs text-gray-500">{{ l.plan.name }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-1">
              {{ l.activeActivations }}/{{ l.maxActivations }} installs · issued {{ formatDate(l.issuedAt) }}
              <span v-if="l.expiresAt"> · expires {{ formatDate(l.expiresAt) }}</span>
            </div>
          </div>
          <UIcon name="i-lucide-chevron-right" class="size-4 text-gray-400" />
        </NuxtLink>
      </div>
    </UCard>

    <UCard v-if="isAdmin">
      <template #header>
        <h2 class="font-semibold">Operator</h2>
      </template>
      <div class="space-y-2 text-sm">
        <NuxtLink to="/admin/users" class="block text-primary hover:underline">→ Manage customers</NuxtLink>
        <NuxtLink to="/admin/licenses" class="block text-primary hover:underline">→ Browse all licenses</NuxtLink>
        <NuxtLink to="/admin/audit" class="block text-primary hover:underline">→ Audit log</NuxtLink>
      </div>
    </UCard>

    <p class="text-xs text-gray-400">
      Signed in as {{ user?.email }} · <NuxtLink to="/" class="hover:underline">Visit marketing site</NuxtLink>
    </p>
  </div>
</template>
