<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'All licenses — Momentfy admin' })

const route = useRoute()
const toast = useToast()

interface AdminLicenseRow {
  id: string
  keyPrefix: string
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED'
  maxActivations: number
  activeActivations: number
  issuedAt: string
  notes: string | null
  plan: { name: string; slug: string }
  account: { id: string; email: string; firstName: string | null; lastName: string | null }
}

const q = ref((route.query.q as string) || '')
const status = ref<string>((route.query.status as string) || '')

const { data: licenses, refresh, status: fetchStatus } = await useFetch<AdminLicenseRow[]>(
  '/api/portal/admin/licenses',
  {
    query: computed(() => ({
      q: q.value || undefined,
      status: status.value || undefined
    })),
    default: () => []
  }
)

const editing = ref<string | null>(null)
const editMax = ref<number>(1)
const editNotes = ref('')

async function startEdit(l: AdminLicenseRow) {
  editing.value = l.id
  editMax.value = l.maxActivations
  editNotes.value = l.notes || ''
}

async function saveEdit(id: string) {
  try {
    await $fetch(`/api/portal/admin/licenses/${id}`, {
      method: 'PATCH',
      body: { maxActivations: editMax.value, notes: editNotes.value || null }
    })
    editing.value = null
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Update failed', description: err.statusMessage || err.message, color: 'error' })
  }
}

async function revoke(id: string) {
  if (!confirm('Revoke this license? The customer\'s instance will stop validating on next heartbeat.')) return
  try {
    await $fetch(`/api/portal/admin/licenses/${id}`, {
      method: 'PATCH',
      body: { status: 'REVOKED', revokedReason: 'admin_action' }
    })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Revoke failed', description: err.statusMessage || err.message, color: 'error' })
  }
}

async function reinstate(id: string) {
  try {
    await $fetch(`/api/portal/admin/licenses/${id}`, {
      method: 'PATCH',
      body: { status: 'ACTIVE' }
    })
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Failed', description: err.statusMessage || err.message, color: 'error' })
  }
}

function fmt(d: string) { return new Date(d).toLocaleDateString() }
const statusColor: Record<string, 'success' | 'error' | 'warning'> = {
  ACTIVE: 'success', REVOKED: 'error', EXPIRED: 'warning'
}
const statusFilters = [
  { label: 'All statuses', value: '' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Revoked', value: 'REVOKED' },
  { label: 'Expired', value: 'EXPIRED' }
]
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <header class="flex items-start justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-2xl font-bold">All licenses</h1>
        <p class="text-sm text-gray-500 mt-1">Issue, revoke, and manage activation caps.</p>
      </div>
      <UButton
        to="/admin/licenses/new"
        icon="i-lucide-plus"
        size="sm"
      >
        Issue new
      </UButton>
    </header>

    <div class="flex flex-wrap gap-2">
      <UInput v-model="q" placeholder="Search by key prefix or email" icon="i-lucide-search" class="flex-1 min-w-[200px]" @keyup.enter="refresh" />
      <USelectMenu v-model="status" :items="statusFilters" value-key="value" class="w-44" />
      <UButton icon="i-lucide-search" :loading="fetchStatus === 'pending'" @click="refresh">Search</UButton>
    </div>

    <UCard class="!shadow-none">
      <div v-if="!licenses.length" class="text-center py-10 text-gray-500">
        <UIcon name="i-lucide-search-x" class="size-8 mx-auto opacity-40" />
        <p class="mt-3 text-sm">No licenses found.</p>
      </div>
      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <div v-for="l in licenses" :key="l.id" class="px-4 py-3">
          <div class="flex items-center gap-4">
            <UIcon name="i-lucide-key" class="size-5 text-primary" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-mono text-sm font-semibold">{{ l.keyPrefix }}…</span>
                <UBadge :color="statusColor[l.status]" variant="soft" size="sm">{{ l.status }}</UBadge>
                <span class="text-xs text-gray-500">{{ l.plan.name }}</span>
              </div>
              <div class="text-xs text-gray-500 mt-0.5">
                <NuxtLink :to="`/admin/users/${l.account.id}`" class="hover:text-primary">{{ l.account.email }}</NuxtLink>
                · {{ l.activeActivations }}/{{ l.maxActivations }} installs · {{ fmt(l.issuedAt) }}
                <span v-if="l.notes"> · "{{ l.notes }}"</span>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <UButton size="xs" variant="ghost" icon="i-lucide-pencil" @click="startEdit(l)" />
              <UButton v-if="l.status === 'ACTIVE'" size="xs" variant="ghost" color="error" icon="i-lucide-ban" @click="revoke(l.id)" />
              <UButton v-else-if="l.status === 'REVOKED'" size="xs" variant="ghost" color="success" icon="i-lucide-check" @click="reinstate(l.id)" />
            </div>
          </div>

          <div v-if="editing === l.id" class="mt-3 p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-2 items-end">
            <UFormField label="Max activations" size="sm">
              <UInput v-model.number="editMax" type="number" min="1" max="100" />
            </UFormField>
            <UFormField label="Notes" size="sm">
              <UInput v-model="editNotes" placeholder="Admin-only note" />
            </UFormField>
            <div class="flex gap-2">
              <UButton size="sm" @click="saveEdit(l.id)">Save</UButton>
              <UButton size="sm" variant="ghost" @click="editing = null">Cancel</UButton>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
