<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'Purchases — Momentfy admin' })

const route = useRoute()

interface OrderRow {
  id: string
  createdAt: string
  status: 'PAID' | 'REFUNDED' | 'PENDING' | 'FAILED'
  amountCents: number
  currency: string
  lsOrderNumber: string | null
  lsReceiptUrl: string | null
  refundedAt: string | null
  account: { id: string; email: string; firstName: string | null; lastName: string | null }
  plan: { name: string; slug: string } | null
  licenseCount: number
}

const q = ref((route.query.q as string) || '')
const status = ref<string>((route.query.status as string) || '')

const { data: orders, refresh, status: fetchStatus } = await useFetch<OrderRow[]>(
  '/api/portal/admin/orders',
  {
    query: computed(() => ({
      q: q.value || undefined,
      status: status.value || undefined
    })),
    default: () => []
  }
)

function fmt(d: string) { return new Date(d).toLocaleString() }
function fmtMoney(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100)
}
function name(o: OrderRow) {
  return [o.account.firstName, o.account.lastName].filter(Boolean).join(' ') || o.account.email
}

const statusColor: Record<string, 'success' | 'error' | 'warning' | 'neutral'> = {
  PAID: 'success', REFUNDED: 'error', PENDING: 'warning', FAILED: 'error'
}
const statusFilters = [
  { label: 'All statuses', value: '' },
  { label: 'Paid', value: 'PAID' },
  { label: 'Refunded', value: 'REFUNDED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Failed', value: 'FAILED' }
]
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <header>
      <h1 class="text-2xl font-bold">Purchases</h1>
      <p class="text-sm text-gray-500 mt-1">All orders, from Lemon Squeezy and manual issuance.</p>
    </header>

    <div class="flex flex-wrap gap-2">
      <UInput
        v-model="q"
        placeholder="Search by email, LS order number, plan"
        icon="i-lucide-search"
        class="flex-1 min-w-[240px]"
        @keyup.enter="refresh"
      />
      <USelectMenu v-model="status" :items="statusFilters" value-key="value" class="w-44" />
      <UButton icon="i-lucide-search" :loading="fetchStatus === 'pending'" @click="refresh">Search</UButton>
    </div>

    <UCard class="!shadow-none">
      <div v-if="!orders.length" class="text-center py-10 text-gray-500">
        <UIcon name="i-lucide-shopping-cart" class="size-8 mx-auto opacity-40" />
        <p class="mt-3 text-sm">No orders found.</p>
      </div>
      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <NuxtLink
          v-for="o in orders" :key="o.id"
          :to="`/admin/orders/${o.id}`"
          class="flex items-center gap-4 px-4 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition"
        >
          <UIcon name="i-lucide-receipt" class="size-5 text-gray-400 shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap text-sm">
              <span class="font-medium truncate">{{ name(o) }}</span>
              <UBadge :color="statusColor[o.status]" variant="soft" size="sm">{{ o.status }}</UBadge>
              <span v-if="o.plan" class="text-xs text-gray-500">{{ o.plan.name }}</span>
              <span v-if="o.licenseCount" class="text-xs text-gray-500">· {{ o.licenseCount }} license{{ o.licenseCount === 1 ? '' : 's' }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-0.5">
              {{ o.account.email }}
              <span v-if="o.lsOrderNumber"> · #{{ o.lsOrderNumber }}</span>
              · {{ fmt(o.createdAt) }}
            </div>
          </div>
          <span class="text-sm font-bold tabular-nums shrink-0">{{ fmtMoney(o.amountCents, o.currency) }}</span>
          <UIcon name="i-lucide-chevron-right" class="size-4 text-gray-400 shrink-0" />
        </NuxtLink>
      </div>
    </UCard>
  </div>
</template>
