<script setup lang="ts">
// Dedicated "Issue new license" page. Same POST endpoint as the
// per-customer flow on the user detail page — this one adds a customer
// search-picker so operators don't have to navigate to the user first.

definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'Issue license — Momentfy admin' })

const toast = useToast()

interface Plan { id: string; slug: string; name: string; defaultActivations: number }
interface Customer { id: string; email: string; firstName: string | null; lastName: string | null }

const { data: plans } = await useFetch<Plan[]>('/api/portal/admin/plans', { default: () => [] })

const search = ref('')
const searchDebounced = ref('')
let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(search, (v) => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { searchDebounced.value = v }, 200)
})

const { data: candidates, status: searchStatus, refresh: refreshCandidates } = await useFetch<Customer[]>(
  '/api/portal/admin/users',
  {
    query: computed(() => ({ q: searchDebounced.value || undefined, limit: 10 })),
    default: () => [],
    immediate: false
  }
)
watch(searchDebounced, (v) => {
  if (v && v.trim().length >= 2) refreshCandidates()
})

const selectedCustomer = ref<Customer | null>(null)
const planId = ref('')
const maxActivations = ref<number | undefined>(undefined)
const expiresAt = ref<string>('')
const notes = ref('')

watch(plans, (p) => {
  if (p.length && !planId.value) planId.value = p[0]!.id
}, { immediate: true })

const selectedPlan = computed(() => plans.value?.find(p => p.id === planId.value) || null)

const issuing = ref(false)
const issuedKey = ref<string | null>(null)

async function issue() {
  if (!selectedCustomer.value || !planId.value) return
  issuing.value = true
  try {
    const res = await $fetch<{ key: string; license: { id: string; keyPrefix: string } }>(
      '/api/portal/admin/licenses',
      {
        method: 'POST',
        body: {
          accountId: selectedCustomer.value.id,
          planId: planId.value,
          maxActivations: maxActivations.value,
          expiresAt: expiresAt.value ? new Date(expiresAt.value).toISOString() : null,
          notes: notes.value || null
        }
      }
    )
    issuedKey.value = res.key
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

function done() {
  const keyPrefix = issuedKey.value?.slice(0, 8) || ''
  issuedKey.value = null
  navigateTo(keyPrefix ? `/admin/licenses?q=${encodeURIComponent(keyPrefix)}` : '/admin/licenses')
}

function customerName(c: Customer) {
  return [c.firstName, c.lastName].filter(Boolean).join(' ') || c.email
}
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto space-y-6">
    <div>
      <NuxtLink to="/admin/licenses" class="text-sm text-gray-500 hover:text-primary inline-flex items-center gap-1.5">
        <UIcon name="i-lucide-chevron-left" class="size-4" /> All licenses
      </NuxtLink>
      <h1 class="text-2xl font-bold mt-2">Issue new license</h1>
      <p class="text-sm text-gray-500 mt-1">Manual issuance. Generates a plaintext key shown once.</p>
    </div>

    <!-- Success / post-issue -->
    <UCard v-if="issuedKey" class="!shadow-none border-warning/30 bg-warning/5">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-key-round" class="size-5 text-warning" />
          <h2 class="font-semibold">License issued</h2>
        </div>
      </template>
      <p class="text-sm mb-3">
        This is the only time the plaintext key is shown. Copy it now and send it to the customer.
      </p>
      <div class="flex flex-col sm:flex-row gap-2">
        <code class="flex-1 px-3 py-2 rounded bg-black/10 dark:bg-white/10 font-mono text-sm select-all break-all">{{ issuedKey }}</code>
        <UButton icon="i-lucide-copy" @click="copyKey">Copy</UButton>
      </div>
      <template #footer>
        <UButton variant="soft" @click="done">Done</UButton>
      </template>
    </UCard>

    <!-- Form -->
    <template v-else>
      <UCard class="!shadow-none">
        <template #header>
          <h3 class="font-semibold">Customer</h3>
        </template>

        <div v-if="selectedCustomer" class="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div class="size-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold">
            {{ (selectedCustomer.firstName?.[0] || selectedCustomer.email[0] || '?').toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium">{{ customerName(selectedCustomer) }}</p>
            <p class="text-sm text-gray-500">{{ selectedCustomer.email }}</p>
          </div>
          <UButton size="xs" variant="ghost" icon="i-lucide-x" @click="selectedCustomer = null">Change</UButton>
        </div>

        <template v-else>
          <UInput
            v-model="search"
            placeholder="Search customers by email, name, or GitHub username"
            icon="i-lucide-search"
            size="lg"
            autofocus
          />
          <div v-if="(candidates?.length ?? 0) && search.length >= 2" class="mt-3 divide-y divide-black/5 dark:divide-white/10 rounded-lg border border-black/5 dark:border-white/10 overflow-hidden">
            <button
              v-for="c in candidates" :key="c.id"
              type="button"
              class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition text-start"
              @click="selectedCustomer = c"
            >
              <div class="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                {{ (c.firstName?.[0] || c.email[0] || '?').toUpperCase() }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{{ customerName(c) }}</p>
                <p class="text-xs text-gray-500 truncate">{{ c.email }}</p>
              </div>
            </button>
          </div>
          <p v-else-if="search.length >= 2 && searchStatus !== 'pending'" class="mt-3 text-sm text-gray-500">
            No matches.
          </p>
        </template>
      </UCard>

      <UCard v-if="selectedCustomer" class="!shadow-none">
        <template #header>
          <h3 class="font-semibold">License details</h3>
        </template>
        <div class="space-y-4">
          <UFormField label="Plan">
            <USelectMenu
              v-model="planId"
              :items="plans.map(p => ({ label: p.name, value: p.id }))"
              value-key="value"
            />
          </UFormField>
          <UFormField
            label="Max activations"
            :hint="selectedPlan ? `Default for ${selectedPlan.name}: ${selectedPlan.defaultActivations}` : 'Leave blank to use the plan default'"
          >
            <UInput
              v-model.number="maxActivations"
              type="number"
              min="1"
              max="100"
              :placeholder="selectedPlan?.defaultActivations?.toString() || 'default'"
            />
          </UFormField>
          <UFormField label="Expires at" hint="Leave blank for a perpetual license (standard for one-time purchases)">
            <UInput v-model="expiresAt" type="date" />
          </UFormField>
          <UFormField label="Notes (admin-only)">
            <UTextarea v-model="notes" :rows="2" placeholder="VIP customer, comp, bundled with order #X, etc." />
          </UFormField>
        </div>
        <template #footer>
          <div class="flex gap-2">
            <UButton :loading="issuing" :disabled="!planId" icon="i-lucide-key-round" @click="issue">
              Issue license
            </UButton>
            <UButton variant="ghost" to="/admin/licenses">Cancel</UButton>
          </div>
        </template>
      </UCard>
    </template>
  </div>
</template>
