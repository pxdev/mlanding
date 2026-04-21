<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'Admin — Momentfy portal' })

interface Stats {
  users: { total: number; admins: number }
  licenses: { active: number; revoked: number; expired: number; total: number }
  activations: { total: number; active: number }
  orders: { total: number; paid: number; refunded: number }
  pendingInvites: number
  revenueByCurrency: Record<string, number>
  recentOrders: Array<{
    id: string
    createdAt: string
    status: string
    amountCents: number
    currency: string
    lsOrderNumber: string | null
    customerEmail: string
    customerName: string | null
    planName: string | null
  }>
}

const { data: stats } = await useFetch<Stats>('/api/portal/admin/stats')

function fmtMoney(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100)
}
function fmt(d: string) { return new Date(d).toLocaleString() }

const primaryRevenue = computed(() => {
  const entries = Object.entries(stats.value?.revenueByCurrency || {})
  if (!entries.length) return null
  // Pick the currency with the highest net revenue.
  entries.sort((a, b) => b[1] - a[1])
  const [currency, cents] = entries[0]!
  return { currency, label: fmtMoney(cents, currency), rest: entries.slice(1) }
})

const kpis = computed(() => {
  if (!stats.value) return []
  const s = stats.value
  return [
    { label: 'Active licenses', value: s.licenses.active.toLocaleString(), icon: 'i-lucide-shield-check', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Revoked licenses', value: s.licenses.revoked.toLocaleString(), icon: 'i-lucide-shield-off', color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Live installs', value: s.activations.active.toLocaleString(), icon: 'i-lucide-server', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { label: 'Customers', value: s.users.total.toLocaleString(), icon: 'i-lucide-users', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'Paid orders', value: s.orders.paid.toLocaleString(), icon: 'i-lucide-shopping-cart', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Refunded', value: s.orders.refunded.toLocaleString(), icon: 'i-lucide-undo-2', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Pending invites', value: s.pendingInvites.toLocaleString(), icon: 'i-lucide-mail-question', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { label: 'Revenue', value: primaryRevenue.value?.label || '—', icon: 'i-lucide-banknote', color: 'text-emerald-600', bg: 'bg-emerald-600/10' }
  ]
})

const statusColor: Record<string, 'success' | 'error' | 'warning' | 'neutral'> = {
  PAID: 'success',
  REFUNDED: 'error',
  PENDING: 'warning',
  FAILED: 'error'
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p class="text-sm text-gray-500 mt-1">Operator overview — licenses, customers, revenue.</p>
    </header>

    <!-- KPI grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard
        v-for="kpi in kpis"
        :key="kpi.label"
        class="!shadow-none"
      >
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center size-10 rounded-xl shrink-0" :class="kpi.bg">
            <UIcon :name="kpi.icon" class="size-5" :class="kpi.color" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-xl font-bold tabular-nums truncate">{{ kpi.value }}</p>
            <p class="text-[11px] text-muted truncate">{{ kpi.label }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Additional currency tallies -->
    <div v-if="primaryRevenue && primaryRevenue.rest.length" class="mt-4 text-xs text-gray-500 flex flex-wrap gap-3">
      <span v-for="[currency, cents] in primaryRevenue.rest" :key="currency">
        + {{ fmtMoney(cents, currency) }}
      </span>
    </div>

    <!-- Recent orders -->
    <section class="mt-8">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold">Recent purchases</h2>
        <NuxtLink to="/admin/orders" class="text-sm text-primary hover:underline inline-flex items-center gap-1">
          View all <UIcon name="i-lucide-arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
      <UCard class="!shadow-none">
        <div v-if="!stats?.recentOrders.length" class="py-8 text-center text-sm text-gray-500">
          <UIcon name="i-lucide-shopping-cart" class="size-8 mx-auto opacity-40" />
          <p class="mt-2">No purchases yet.</p>
        </div>
        <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
          <NuxtLink
            v-for="o in stats.recentOrders" :key="o.id"
            :to="`/admin/orders/${o.id}`"
            class="flex items-center gap-4 px-4 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition"
          >
            <UIcon name="i-lucide-receipt" class="size-5 text-gray-400 shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap text-sm">
                <span class="font-medium truncate">{{ o.customerName || o.customerEmail }}</span>
                <UBadge :color="statusColor[o.status] || 'neutral'" variant="soft" size="sm">{{ o.status }}</UBadge>
                <span v-if="o.planName" class="text-xs text-gray-500">{{ o.planName }}</span>
              </div>
              <div class="text-xs text-gray-500 mt-0.5">
                <span v-if="o.lsOrderNumber">#{{ o.lsOrderNumber }} · </span>{{ fmt(o.createdAt) }}
              </div>
            </div>
            <span class="text-sm font-bold tabular-nums shrink-0">{{ fmtMoney(o.amountCents, o.currency) }}</span>
            <UIcon name="i-lucide-chevron-right" class="size-4 text-gray-400 shrink-0" />
          </NuxtLink>
        </div>
      </UCard>
    </section>
  </div>
</template>
