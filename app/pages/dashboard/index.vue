<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Licenses — Momentfy portal' })

const { user, isAdmin, displayName } = useSession()
const route = useRoute()
const toast = useToast()

// ?purchased=<slug> → LS redirected here right after payment. The webhook
// usually lands within seconds; show a nudge so the customer doesn't think
// it got lost if the list still looks empty on first load.
const justPurchased = computed(() => route.query.purchased as string | undefined)

interface LicenseRow {
  id: string
  keyPrefix: string
  plan: { id: string, slug: string, name: string }
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

onMounted(() => {
  if (!justPurchased.value) return
  toast.add({
    title: 'Thanks for your purchase!',
    description: 'Your license is being provisioned — this takes a few seconds. We also emailed the key to you.',
    color: 'success',
    duration: 10000
  })
  let tries = 0
  const iv = setInterval(async () => {
    tries++
    await refresh()
    if ((licenses.value && licenses.value.length > 0) || tries >= 5) {
      clearInterval(iv)
      navigateTo({ path: route.path, query: {} }, { replace: true })
    }
  }, 3000)
})

function formatDate(d: string | null) {
  return d ? new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
}

const statusColor: Record<string, 'success' | 'error' | 'warning'> = {
  ACTIVE: 'success',
  REVOKED: 'error',
  EXPIRED: 'warning'
}

const stats = computed(() => {
  const list = licenses.value || []
  const active = list.filter(l => l.status === 'ACTIVE').length
  const installs = list.reduce((sum, l) => sum + l.activeActivations, 0)
  const capacity = list.reduce((sum, l) => sum + l.maxActivations, 0)
  return { total: list.length, active, installs, capacity }
})
</script>

<template>
  <div class="space-y-6 sm:space-y-8">
    <header class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div class="min-w-0">
        <h1 class="text-xl sm:text-2xl font-semibold">
          Welcome{{ displayName ? `, ${displayName}` : '' }}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your Momentfy licenses, source-code access and billing.
        </p>
      </div>
      <UButton
        to="/portal/pricing"
        icon="i-lucide-shopping-cart"
        size="lg"
        class="w-full sm:w-auto justify-center rounded-full shrink-0"
      >
        Buy a license
      </UButton>
    </header>

    <!-- KPI row -->
    <div v-if="licenses.length" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div class="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
        <div class="text-xs text-gray-500 uppercase tracking-wider">Licenses</div>
        <div class="text-2xl font-semibold mt-1">{{ stats.total }}</div>
      </div>
      <div class="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
        <div class="text-xs text-gray-500 uppercase tracking-wider">Active</div>
        <div class="text-2xl font-semibold mt-1 text-success">{{ stats.active }}</div>
      </div>
      <div class="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
        <div class="text-xs text-gray-500 uppercase tracking-wider">Installs</div>
        <div class="text-2xl font-semibold mt-1">{{ stats.installs }}<span class="text-sm text-gray-400 font-normal"> / {{ stats.capacity }}</span></div>
      </div>
      <div class="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
        <div class="text-xs text-gray-500 uppercase tracking-wider">Plans</div>
        <div class="text-2xl font-semibold mt-1">{{ new Set(licenses.map(l => l.plan.slug)).size }}</div>
      </div>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold">
            Your licenses
          </h2>
          <UButton
            size="xs"
            variant="ghost"
            icon="i-lucide-refresh-cw"
            :loading="status === 'pending'"
            aria-label="Refresh"
            @click="refresh"
          />
        </div>
      </template>

      <div
        v-if="!licenses.length"
        class="text-center py-12 px-4 text-gray-500 dark:text-gray-400"
      >
        <UIcon
          name="i-lucide-key"
          class="size-10 mx-auto opacity-40"
        />
        <p class="mt-3 text-sm">
          No licenses yet.
        </p>
        <p class="text-xs mt-1">
          After you complete checkout, your license and repo invite will show up here.
        </p>
        <UButton
          to="/portal/pricing"
          size="md"
          class="mt-4 rounded-full"
        >
          Buy a license
        </UButton>
      </div>

      <div
        v-else
        class="divide-y divide-black/5 dark:divide-white/10 -m-4"
      >
        <NuxtLink
          v-for="l in licenses"
          :key="l.id"
          :to="`/dashboard/licenses/${l.id}`"
          class="flex items-center gap-3 sm:gap-4 px-4 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition"
        >
          <div class="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <UIcon
              name="i-lucide-key"
              class="size-5"
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-mono text-sm font-semibold">{{ l.keyPrefix }}…</span>
              <UBadge
                :color="statusColor[l.status]"
                variant="soft"
                size="sm"
              >{{ l.status }}</UBadge>
              <span class="text-xs text-gray-500 truncate">{{ l.plan.name }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-1 truncate">
              {{ l.activeActivations }}/{{ l.maxActivations }} installs · issued {{ formatDate(l.issuedAt) }}
              <span v-if="l.expiresAt"> · expires {{ formatDate(l.expiresAt) }}</span>
            </div>
          </div>
          <UIcon
            name="i-lucide-chevron-right"
            class="size-4 text-gray-400 shrink-0"
          />
        </NuxtLink>
      </div>
    </UCard>

    <UCard v-if="isAdmin">
      <template #header>
        <h2 class="font-semibold">
          Operator
        </h2>
      </template>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <UButton to="/admin/users" variant="soft" color="neutral" icon="i-lucide-users" block>Customers</UButton>
        <UButton to="/admin/licenses" variant="soft" color="neutral" icon="i-lucide-shield" block>All licenses</UButton>
        <UButton to="/admin/audit" variant="soft" color="neutral" icon="i-lucide-list" block>Audit log</UButton>
      </div>
    </UCard>

    <p class="text-xs text-gray-400 text-center sm:text-start">
      Signed in as {{ user?.email }} · <NuxtLink
        to="/"
        class="hover:underline"
      >Visit marketing site</NuxtLink>
    </p>
  </div>
</template>
