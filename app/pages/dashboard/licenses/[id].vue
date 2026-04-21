<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'License — Momentfy portal' })

const route = useRoute()
const id = route.params.id as string
const toast = useToast()

interface Activation {
  id: string
  fingerprint: string
  hostname: string | null
  ipAddress: string | null
  appVersion: string | null
  lastSeenAt: string
  deactivatedAt: string | null
  createdAt: string
}
interface LicenseDetail {
  id: string
  keyPrefix: string
  plan: { id: string; slug: string; name: string }
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED'
  maxActivations: number
  expiresAt: string | null
  issuedAt: string
  revokedAt: string | null
  revokedReason: string | null
  activations: Activation[]
}

const { data: license, refresh, status } = await useFetch<LicenseDetail>(`/api/portal/licenses/${id}`)

const rotating = ref(false)
const rotatedKey = ref<string | null>(null)
const showRotateConfirm = ref(false)

async function rotateKey() {
  rotating.value = true
  try {
    const res = await $fetch<{ key: string; keyPrefix: string }>(`/api/portal/licenses/${id}/rotate`, {
      method: 'POST'
    })
    rotatedKey.value = res.key
    showRotateConfirm.value = false
    await refresh()
  } catch (err: any) {
    toast.add({ title: 'Rotate failed', description: err.statusMessage || err.message, color: 'error' })
  } finally {
    rotating.value = false
  }
}

async function copyKey() {
  if (!rotatedKey.value) return
  await navigator.clipboard.writeText(rotatedKey.value)
  toast.add({ title: 'Key copied', color: 'success' })
}

function fmt(d: string | null) {
  return d ? new Date(d).toLocaleString() : '—'
}
const statusColor: Record<string, 'success' | 'error' | 'warning'> = {
  ACTIVE: 'success',
  REVOKED: 'error',
  EXPIRED: 'warning'
}
</script>

<template>
  <div v-if="license" class="space-y-6 sm:space-y-8">
    <div>
      <NuxtLink to="/dashboard" class="text-sm text-gray-500 hover:text-primary inline-flex items-center gap-1.5">
        <UIcon name="i-lucide-chevron-left" class="size-4" /> Back to licenses
      </NuxtLink>
      <h1 class="text-xl sm:text-2xl font-semibold mt-3 font-mono break-all">{{ license.keyPrefix }}…</h1>
      <div class="flex items-center gap-2 flex-wrap mt-2">
        <UBadge :color="statusColor[license.status]" variant="soft">{{ license.status }}</UBadge>
        <span class="text-sm text-gray-500">{{ license.plan.name }}</span>
        <span v-if="license.revokedReason" class="text-xs text-error">— {{ license.revokedReason }}</span>
      </div>
    </div>

    <!-- Rotate key — at the top so the revealed key appears inline -->
    <UCard v-if="license.status === 'ACTIVE'">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-key-round" class="size-5 text-secondary" />
          <h2 class="font-semibold">Rotate key</h2>
        </div>
      </template>

      <!-- State 1: freshly rotated — show the new plaintext key once -->
      <div v-if="rotatedKey">
        <div class="rounded-lg border border-secondary/30 bg-secondary/5 p-4 space-y-3">
          <div class="flex items-center gap-2 text-sm font-medium text-secondary">
            <UIcon name="i-lucide-circle-check" class="size-5" />
            Your new license key — copy it now
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            This is the only time we'll show it. Store it somewhere safe. The
            previous key has stopped working; every existing install must
            re-activate with this new key.
          </p>
          <code class="block w-full px-3 py-2.5 rounded bg-black/10 dark:bg-white/10 font-mono text-sm select-all break-all">{{ rotatedKey }}</code>
          <div class="flex flex-col sm:flex-row gap-2">
            <UButton icon="i-lucide-copy" color="secondary" @click="copyKey">Copy key</UButton>
            <UButton variant="soft" color="neutral" @click="rotatedKey = null">Done</UButton>
          </div>
        </div>
      </div>

      <!-- State 2: pre-rotate prompt -->
      <div v-else class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div class="text-sm min-w-0">
          <p class="font-medium">Generate a new key</p>
          <p class="text-gray-500 mt-1">
            Use this if you lost your key or believe it has leaked. The new key
            is shown once — copy it immediately. The old key stops working at
            once, and every existing install must re-activate with the new key.
          </p>
        </div>
        <UButton v-if="!showRotateConfirm" color="secondary" variant="soft" icon="i-lucide-refresh-cw" class="w-full sm:w-auto justify-center shrink-0" @click="showRotateConfirm = true">
          Rotate key
        </UButton>
        <div v-else class="flex flex-col sm:flex-row gap-2 shrink-0">
          <UButton color="secondary" :loading="rotating" class="justify-center" @click="rotateKey">Confirm rotate</UButton>
          <UButton variant="ghost" color="neutral" :disabled="rotating" class="justify-center" @click="showRotateConfirm = false">Cancel</UButton>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="font-semibold">Details</h2>
      </template>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">Plan</dt>
          <dd>{{ license.plan.name }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Activations</dt>
          <dd>{{ license.activations.filter(a => !a.deactivatedAt).length }} / {{ license.maxActivations }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Issued</dt>
          <dd>{{ fmt(license.issuedAt) }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Expires</dt>
          <dd>{{ license.expiresAt ? fmt(license.expiresAt) : 'Never (perpetual)' }}</dd>
        </div>
      </dl>
    </UCard>

    <!-- Where is my full key? -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-key-round" class="size-5 text-primary" />
          <h2 class="font-semibold">Where is my full license key?</h2>
        </div>
      </template>
      <div class="text-sm space-y-3">
        <p>
          For security, we only ever show the full key
          <strong>once — at purchase time</strong>. After that, the portal only
          stores a one-way hash, so nobody (not even us) can recover the
          original plaintext.
        </p>
        <p>You can find your key in:</p>
        <ul class="list-disc ps-5 space-y-1 text-gray-600 dark:text-gray-400">
          <li>The <strong>purchase confirmation email</strong> sent when your order was completed (subject: <em>"Your license is ready"</em>). Search your inbox for <code class="font-mono bg-black/5 dark:bg-white/10 px-1 rounded">{{ license.keyPrefix }}</code>.</li>
          <li>The password manager you saved it to at checkout.</li>
          <li>The <strong>installer screen</strong> where you originally pasted it — the saved certificate file on that machine proves activation, even without the key.</li>
        </ul>
        <p class="text-gray-600 dark:text-gray-400">
          If you genuinely lost the key and need to install on a new machine,
          use <strong>Rotate key</strong> above. It generates a fresh key and
          invalidates the old one.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold">Active installs</h2>
          <UButton size="xs" variant="ghost" icon="i-lucide-refresh-cw" :loading="status === 'pending'" @click="refresh" />
        </div>
      </template>

      <div v-if="!license.activations.length" class="text-center py-10 text-gray-500 dark:text-gray-400">
        <UIcon name="i-lucide-server-off" class="size-8 mx-auto opacity-40" />
        <p class="mt-3 text-sm">No installs yet.</p>
        <p class="text-xs mt-1">Activate this key on a Momentfy instance to see it here.</p>
      </div>

      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <div v-for="a in license.activations" :key="a.id" class="flex items-center gap-4 px-4 py-3">
          <UIcon :name="a.deactivatedAt ? 'i-lucide-server-off' : 'i-lucide-server'" class="size-5" :class="a.deactivatedAt ? 'text-gray-400' : 'text-success'" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 text-sm">
              <span class="font-medium">{{ a.hostname || a.fingerprint.slice(0, 12) + '…' }}</span>
              <span v-if="a.appVersion" class="text-xs text-gray-500">v{{ a.appVersion }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-0.5">
              <span v-if="!a.deactivatedAt">last seen {{ fmt(a.lastSeenAt) }}</span>
              <span v-else>deactivated {{ fmt(a.deactivatedAt) }}</span>
              <span v-if="a.ipAddress"> · {{ a.ipAddress }}</span>
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
