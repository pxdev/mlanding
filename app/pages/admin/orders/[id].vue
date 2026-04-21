<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })

const route = useRoute()
const id = route.params.id as string

interface OrderDetail {
  id: string
  accountId: string
  planId: string | null
  lsOrderId: string | null
  lsCustomerId: string | null
  lsOrderNumber: string | null
  lsReceiptUrl: string | null
  amountCents: number
  currency: string
  status: 'PAID' | 'REFUNDED' | 'PENDING' | 'FAILED'
  refundedAt: string | null
  refundReason: string | null
  rawPayload: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
  account: { id: string; email: string; firstName: string | null; lastName: string | null; githubUsername: string | null }
  plan: { id: string; name: string; slug: string } | null
  licenses: Array<{ id: string; keyPrefix: string; status: string; maxActivations: number; issuedAt: string }>
}

const { data: order } = await useFetch<OrderDetail>(`/api/portal/admin/orders/${id}`)

useHead({ title: () => order.value ? `Order #${order.value.lsOrderNumber || order.value.id.slice(-6)} — Momentfy admin` : 'Order — Momentfy admin' })

function fmt(d: string) { return new Date(d).toLocaleString() }
function fmtMoney(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100)
}

const statusColor: Record<string, 'success' | 'error' | 'warning'> = {
  PAID: 'success', REFUNDED: 'error', PENDING: 'warning', FAILED: 'error',
  ACTIVE: 'success', REVOKED: 'error', EXPIRED: 'warning'
}

const rawPayloadPretty = computed(() =>
  order.value?.rawPayload ? JSON.stringify(order.value.rawPayload, null, 2) : null
)
const showRaw = ref(false)
</script>

<template>
  <div v-if="!order" class="p-6 max-w-4xl mx-auto text-sm text-gray-500">Loading…</div>
  <div v-else class="p-6 max-w-4xl mx-auto space-y-6">
    <NuxtLink to="/admin/orders" class="text-sm text-gray-500 hover:text-primary inline-flex items-center gap-1.5">
      <UIcon name="i-lucide-chevron-left" class="size-4" /> Purchases
    </NuxtLink>

    <header class="flex items-start justify-between flex-wrap gap-3">
      <div>
        <h1 class="text-2xl font-bold">
          Order <span class="font-mono text-lg text-gray-500">#{{ order.lsOrderNumber || order.id.slice(-6) }}</span>
        </h1>
        <div class="mt-2 flex items-center gap-2 flex-wrap">
          <UBadge :color="statusColor[order.status]" variant="soft">{{ order.status }}</UBadge>
          <span class="text-sm text-gray-500">{{ fmt(order.createdAt) }}</span>
        </div>
      </div>
      <div class="text-end">
        <div class="text-2xl font-bold tabular-nums">{{ fmtMoney(order.amountCents, order.currency) }}</div>
        <UButton
          v-if="order.lsReceiptUrl"
          :to="order.lsReceiptUrl"
          target="_blank"
          variant="soft"
          size="xs"
          icon="i-lucide-external-link"
          class="mt-1"
        >
          View LS receipt
        </UButton>
      </div>
    </header>

    <!-- Customer -->
    <UCard class="!shadow-none">
      <template #header>
        <h3 class="font-semibold">Customer</h3>
      </template>
      <NuxtLink :to="`/admin/users/${order.account.id}`" class="flex items-center gap-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] -m-2 p-2 rounded-lg transition">
        <div class="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
          {{ (order.account.firstName?.[0] || order.account.email[0] || '?').toUpperCase() }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium">{{ [order.account.firstName, order.account.lastName].filter(Boolean).join(' ') || order.account.email }}</p>
          <p class="text-sm text-gray-500">{{ order.account.email }}<span v-if="order.account.githubUsername"> · gh:{{ order.account.githubUsername }}</span></p>
        </div>
        <UIcon name="i-lucide-chevron-right" class="size-4 text-gray-400" />
      </NuxtLink>
    </UCard>

    <!-- Plan & LS metadata -->
    <UCard class="!shadow-none">
      <template #header>
        <h3 class="font-semibold">Order details</h3>
      </template>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">Plan</dt>
          <dd class="font-medium">{{ order.plan?.name || '—' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Lemon Squeezy order ID</dt>
          <dd class="font-mono text-xs">{{ order.lsOrderId || '—' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Lemon Squeezy customer ID</dt>
          <dd class="font-mono text-xs">{{ order.lsCustomerId || '—' }}</dd>
        </div>
        <div v-if="order.refundedAt">
          <dt class="text-gray-500">Refunded</dt>
          <dd>{{ fmt(order.refundedAt) }}<span v-if="order.refundReason"> — {{ order.refundReason }}</span></dd>
        </div>
      </dl>
    </UCard>

    <!-- Issued licenses -->
    <UCard class="!shadow-none">
      <template #header>
        <h3 class="font-semibold">Licenses issued</h3>
      </template>
      <div v-if="!order.licenses.length" class="py-6 text-center text-sm text-gray-500">
        <UIcon name="i-lucide-shield" class="size-6 mx-auto opacity-40" />
        <p class="mt-2">No licenses issued for this order.</p>
      </div>
      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <NuxtLink
          v-for="l in order.licenses" :key="l.id"
          :to="`/admin/licenses?q=${l.keyPrefix}`"
          class="flex items-center gap-3 px-4 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition"
        >
          <UIcon name="i-lucide-key" class="size-4 text-primary" />
          <span class="font-mono text-sm font-semibold flex-1">{{ l.keyPrefix }}…</span>
          <UBadge :color="statusColor[l.status]" variant="soft" size="sm">{{ l.status }}</UBadge>
          <span class="text-xs text-gray-500">max {{ l.maxActivations }}</span>
          <span class="text-xs text-gray-500">{{ fmt(l.issuedAt) }}</span>
          <UIcon name="i-lucide-chevron-right" class="size-4 text-gray-400" />
        </NuxtLink>
      </div>
    </UCard>

    <!-- Raw payload toggle (debug) -->
    <UCard v-if="rawPayloadPretty" class="!shadow-none">
      <template #header>
        <button class="w-full flex items-center justify-between" @click="showRaw = !showRaw">
          <h3 class="font-semibold">Raw webhook payload</h3>
          <UIcon :name="showRaw ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="size-4 text-gray-400" />
        </button>
      </template>
      <pre v-if="showRaw" class="text-xs overflow-x-auto font-mono bg-black/[0.03] dark:bg-white/[0.03] p-3 rounded">{{ rawPayloadPretty }}</pre>
    </UCard>
  </div>
</template>
