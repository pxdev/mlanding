<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth', 'admin'] })
useHead({ title: 'Customer — Momentfy admin' })

const route = useRoute()
const id = route.params.id as string
const toast = useToast()

interface UserDetail {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  githubUsername: string | null
  isAdmin: boolean
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  licenses: Array<{
    id: string
    keyPrefix: string
    status: string
    maxActivations: number
    activeActivations: number
    plan: { slug: string; name: string }
    issuedAt: string
    notes: string | null
  }>
  orders: Array<{
    id: string
    lsOrderNumber: string | null
    amountCents: number
    currency: string
    status: string
    plan: { slug: string; name: string } | null
    createdAt: string
  }>
}

const { data: user, refresh } = await useFetch<UserDetail>(`/api/portal/admin/users/${id}`)
const { data: plans } = await useFetch<Array<{ id: string; slug: string; name: string; defaultActivations: number }>>('/api/portal/admin/plans', { default: () => [] })

const issuing = ref(false)
const issuedKey = ref<string | null>(null)
const showIssue = ref(false)
const newPlanId = ref('')
const newMaxActivations = ref<number | undefined>(undefined)
const newNotes = ref('')

watch(plans, (p) => {
  if (p && p.length && !newPlanId.value) newPlanId.value = p[0]!.id
}, { immediate: true })

async function issueLicense() {
  if (!user.value || !newPlanId.value) return
  issuing.value = true
  try {
    const res = await $fetch<{ key: string; license: { id: string; keyPrefix: string } }>('/api/portal/admin/licenses', {
      method: 'POST',
      body: {
        accountId: user.value.id,
        planId: newPlanId.value,
        maxActivations: newMaxActivations.value,
        notes: newNotes.value || null
      }
    })
    issuedKey.value = res.key
    showIssue.value = false
    newNotes.value = ''
    newMaxActivations.value = undefined
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Issue failed', description: err.statusMessage || err.message, color: 'error' })
  } finally {
    issuing.value = false
  }
}

async function copyKey() {
  if (!issuedKey.value) return
  await navigator.clipboard.writeText(issuedKey.value)
  toast.add({ title: 'Key copied', color: 'success' })
}

async function toggleActive() {
  if (!user.value) return
  await $fetch(`/api/portal/admin/users/${user.value.id}`, {
    method: 'PATCH',
    body: { isActive: !user.value.isActive }
  })
  await refresh()
}

async function toggleAdmin() {
  if (!user.value) return
  try {
    await $fetch(`/api/portal/admin/users/${user.value.id}`, {
      method: 'PATCH',
      body: { isAdmin: !user.value.isAdmin }
    })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Update failed', description: err.statusMessage || err.message, color: 'error' })
  }
}

function fmt(d: string | null) { return d ? new Date(d).toLocaleString() : '—' }
function money(cents: number, ccy: string) {
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: ccy }).format(cents / 100) } catch { return `${(cents / 100).toFixed(2)} ${ccy}` }
}
const statusColor: Record<string, 'success' | 'error' | 'warning' | 'neutral'> = {
  ACTIVE: 'success', REVOKED: 'error', EXPIRED: 'warning',
  PAID: 'success', REFUNDED: 'error', PARTIAL_REFUND: 'warning', PENDING: 'neutral'
}
</script>

<template>
  <div v-if="user" class="space-y-8">
    <div>
      <NuxtLink to="/admin/users" class="text-sm text-gray-500 hover:text-primary inline-flex items-center gap-1.5">
        <UIcon name="i-lucide-chevron-left" class="size-4" /> Customers
      </NuxtLink>
      <h1 class="text-2xl font-semibold mt-2">{{ (user.firstName || '') + ' ' + (user.lastName || '') }}</h1>
      <p class="text-gray-500 text-sm mt-1">{{ user.email }}</p>
    </div>

    <UAlert
      v-if="issuedKey"
      color="warning"
      variant="soft"
      icon="i-lucide-key-round"
      title="License key — copy now and share with the customer"
      description="This is the only time we'll show the plaintext key. The customer will see the prefix in their dashboard."
    >
      <template #actions>
        <div class="flex flex-col sm:flex-row gap-2 mt-2">
          <code class="flex-1 px-3 py-2 rounded bg-black/10 dark:bg-white/10 font-mono text-sm select-all">{{ issuedKey }}</code>
          <UButton icon="i-lucide-copy" size="sm" @click="copyKey">Copy</UButton>
          <UButton variant="soft" size="sm" @click="issuedKey = null">Done</UButton>
        </div>
      </template>
    </UAlert>

    <UCard>
      <template #header>
        <h2 class="font-semibold">Account</h2>
      </template>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">GitHub</dt>
          <dd>{{ user.githubUsername || '—' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Joined</dt>
          <dd>{{ fmt(user.createdAt) }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Last login</dt>
          <dd>{{ fmt(user.lastLoginAt) }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Status</dt>
          <dd>
            <UBadge :color="user.isActive ? 'success' : 'error'" variant="soft">{{ user.isActive ? 'Active' : 'Disabled' }}</UBadge>
            <UBadge v-if="user.isAdmin" color="primary" variant="soft" class="ms-1">admin</UBadge>
          </dd>
        </div>
      </dl>
      <template #footer>
        <div class="flex flex-wrap gap-2">
          <UButton variant="soft" :color="user.isActive ? 'error' : 'success'" size="sm" @click="toggleActive">
            {{ user.isActive ? 'Deactivate' : 'Reactivate' }} account
          </UButton>
          <UButton variant="soft" :color="user.isAdmin ? 'neutral' : 'primary'" size="sm" @click="toggleAdmin">
            {{ user.isAdmin ? 'Revoke admin' : 'Grant admin' }}
          </UButton>
        </div>
      </template>
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold">Licenses</h2>
          <UButton v-if="!showIssue" icon="i-lucide-plus" size="sm" @click="showIssue = true">Issue license</UButton>
        </div>
      </template>

      <div v-if="showIssue" class="mb-4 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] space-y-3">
        <UFormField label="Plan">
          <USelectMenu v-model="newPlanId" :items="plans.map(p => ({ label: p.name, value: p.id }))" value-key="value" />
        </UFormField>
        <UFormField label="Max activations" hint="Leave blank to use the plan's default">
          <UInput v-model.number="newMaxActivations" type="number" min="1" max="100" placeholder="default" />
        </UFormField>
        <UFormField label="Notes (admin-only)">
          <UTextarea v-model="newNotes" :rows="2" placeholder="VIP customer, comp, etc." />
        </UFormField>
        <div class="flex gap-2">
          <UButton :loading="issuing" :disabled="!newPlanId" @click="issueLicense">Issue</UButton>
          <UButton variant="ghost" :disabled="issuing" @click="showIssue = false">Cancel</UButton>
        </div>
      </div>

      <div v-if="!user.licenses.length" class="text-center py-8 text-gray-500 text-sm">
        No licenses issued.
      </div>
      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <NuxtLink
          v-for="l in user.licenses" :key="l.id" :to="`/admin/licenses?q=${l.keyPrefix}`"
          class="flex items-center gap-4 px-4 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition"
        >
          <UIcon name="i-lucide-key" class="size-5 text-primary" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-mono text-sm font-semibold">{{ l.keyPrefix }}…</span>
              <UBadge :color="statusColor[l.status]" variant="soft" size="sm">{{ l.status }}</UBadge>
              <span class="text-xs text-gray-500">{{ l.plan.name }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-0.5">
              {{ l.activeActivations }}/{{ l.maxActivations }} installs · issued {{ fmt(l.issuedAt) }}
              <span v-if="l.notes"> · "{{ l.notes }}"</span>
            </div>
          </div>
          <UIcon name="i-lucide-chevron-right" class="size-4 text-gray-400" />
        </NuxtLink>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="font-semibold">Orders</h2>
      </template>
      <div v-if="!user.orders.length" class="text-center py-8 text-gray-500 text-sm">
        No orders yet.
      </div>
      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <div v-for="o in user.orders" :key="o.id" class="flex items-center gap-4 px-4 py-3">
          <UIcon name="i-lucide-receipt" class="size-5 text-primary" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap text-sm">
              <span class="font-medium">{{ money(o.amountCents, o.currency) }}</span>
              <UBadge :color="statusColor[o.status]" variant="soft" size="sm">{{ o.status }}</UBadge>
              <span v-if="o.plan" class="text-xs text-gray-500">{{ o.plan.name }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-0.5">
              <span v-if="o.lsOrderNumber">#{{ o.lsOrderNumber }} · </span>
              {{ fmt(o.createdAt) }}
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>

  <div v-else class="text-center py-12 text-gray-500">
    <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin mx-auto" />
  </div>
</template>
