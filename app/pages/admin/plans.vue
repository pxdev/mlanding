<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'Plans — Momentfy admin' })

interface PlanRow {
  id: string
  slug: string
  name: string
  description: string | null
  priceUsdCents: number
  defaultActivations: number
  lsVariantId: string | null
  isActive: boolean
  createdAt: string
  _count: { licenses: number; orders: number }
}

const toast = useToast()
const { data: plans, refresh } = await useFetch<PlanRow[]>('/api/portal/admin/plans', { default: () => [] })

const editing = ref<string | null>(null)
const form = reactive({
  name: '',
  description: '',
  priceUsdCents: 0,
  defaultActivations: 1,
  lsVariantId: '',
  isActive: true
})
const priceUsd = ref(0)

function startEdit(p: PlanRow) {
  editing.value = p.id
  form.name = p.name
  form.description = p.description ?? ''
  form.priceUsdCents = p.priceUsdCents
  priceUsd.value = p.priceUsdCents / 100
  form.defaultActivations = p.defaultActivations
  form.lsVariantId = p.lsVariantId ?? ''
  form.isActive = p.isActive
}

async function save(id: string) {
  try {
    await $fetch(`/api/portal/admin/plans/${id}`, {
      method: 'PATCH',
      body: {
        name: form.name,
        description: form.description || null,
        priceUsdCents: Math.round(priceUsd.value * 100),
        defaultActivations: form.defaultActivations,
        lsVariantId: form.lsVariantId || null,
        isActive: form.isActive
      }
    })
    editing.value = null
    await refresh()
    toast.add({ title: 'Plan updated', color: 'success' })
  } catch (err: any) {
    toast.add({ title: 'Update failed', description: err.statusMessage || err.message, color: 'error' })
  }
}

function fmtPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <header>
      <h1 class="text-2xl font-bold">Plans</h1>
      <p class="text-sm text-gray-500 mt-1">Pricing tiers used for manual license issuance and Lemon Squeezy checkouts.</p>
    </header>

    <UCard class="!shadow-none">
      <div v-if="!plans.length" class="text-center py-10 text-gray-500">
        <UIcon name="i-lucide-package" class="size-8 mx-auto opacity-40" />
        <p class="mt-3 text-sm">No plans seeded yet. Run <code>npm run db:seed</code>.</p>
      </div>
      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <div v-for="p in plans" :key="p.id" class="px-4 py-3">
          <div class="flex items-center gap-4">
            <UIcon name="i-lucide-package" class="size-5 text-primary" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-semibold">{{ p.name }}</span>
                <UBadge variant="soft" size="sm">{{ p.slug }}</UBadge>
                <UBadge v-if="!p.isActive" color="error" variant="soft" size="sm">inactive</UBadge>
                <span class="text-sm font-bold tabular-nums ms-auto">{{ fmtPrice(p.priceUsdCents) }}</span>
              </div>
              <div class="text-xs text-gray-500 mt-0.5">
                <span>Default activations: <strong class="text-gray-700 dark:text-gray-300">{{ p.defaultActivations }}</strong></span>
                <span class="mx-2">·</span>
                <span>{{ p._count.licenses }} license{{ p._count.licenses === 1 ? '' : 's' }}</span>
                <span class="mx-2">·</span>
                <span>{{ p._count.orders }} order{{ p._count.orders === 1 ? '' : 's' }}</span>
                <span v-if="p.lsVariantId"><span class="mx-2">·</span>LS variant <code class="text-[10px]">{{ p.lsVariantId }}</code></span>
              </div>
              <p v-if="p.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ p.description }}</p>
            </div>
            <UButton size="xs" variant="ghost" icon="i-lucide-pencil" @click="startEdit(p)" />
          </div>

          <div v-if="editing === p.id" class="mt-3 p-4 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] grid grid-cols-1 sm:grid-cols-2 gap-3">
            <UFormField label="Name" size="sm">
              <UInput v-model="form.name" />
            </UFormField>
            <UFormField label="Price (USD)" size="sm">
              <UInput v-model.number="priceUsd" type="number" min="0" step="1" />
            </UFormField>
            <UFormField label="Default activations" size="sm">
              <UInput v-model.number="form.defaultActivations" type="number" min="1" max="100" />
            </UFormField>
            <UFormField label="Lemon Squeezy variant ID" size="sm">
              <UInput v-model="form.lsVariantId" placeholder="e.g. 123456" />
            </UFormField>
            <UFormField label="Description" size="sm" class="sm:col-span-2">
              <UInput v-model="form.description" />
            </UFormField>
            <div class="sm:col-span-2 flex items-center justify-between">
              <label class="flex items-center gap-2 text-sm">
                <USwitch v-model="form.isActive" />
                <span>Active</span>
              </label>
              <div class="flex gap-2">
                <UButton size="sm" variant="ghost" @click="editing = null">Cancel</UButton>
                <UButton size="sm" @click="save(p.id)">Save</UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
