<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'Settings — Momentfy admin' })

interface IntegrationsStatus {
  licenseSigning: { privateKeySet: boolean; publicKeyMasked: string | null; keypairMatches: boolean }
  lemonSqueezy: { apiKeySet: boolean; storeId: string | null; storeDomain: string | null; webhookSecretSet: boolean; testMode: boolean }
  github: { tokenSet: boolean; org: string | null; teamSlug: string | null; repo: string | null; tokenValid: boolean | null }
  smtp: { configured: boolean; host: string | null; port: number | null; from: string | null; userSet: boolean }
  licensePepperSet: boolean
  portalUrl: string | null
  nodeEnv: string
  sessionCookieSecure: boolean
}

const { data: cfg } = await useFetch<IntegrationsStatus>('/api/portal/admin/settings/integrations')

const prodWarnings = computed(() => {
  if (!cfg.value || cfg.value.nodeEnv !== 'production') return []
  const w: string[] = []
  if (!cfg.value.licensePepperSet) w.push('LICENSE_PEPPER is not set — license-key hashing is weakened.')
  if (!cfg.value.licenseSigning.privateKeySet) w.push('LICENSE_SIGNING_PRIVATE_KEY is not set — no certificates can be issued.')
  if (!cfg.value.licenseSigning.keypairMatches) w.push('Public and private license signing keys do not pair — activations will fail verification on the main app.')
  if (!cfg.value.sessionCookieSecure) w.push('NUXT_SESSION_COOKIE_SECURE is not "true" — session cookies missing the Secure flag in production.')
  return w
})
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <header>
      <h1 class="text-2xl font-bold">Settings</h1>
      <p class="text-sm text-gray-500 mt-1">Runtime configuration and environment status. Most values are env-driven and require a redeploy to change.</p>
    </header>

    <UAlert
      v-if="prodWarnings.length"
      color="error"
      variant="soft"
      icon="i-lucide-alert-triangle"
      title="Production misconfiguration"
    >
      <ul class="mt-2 list-disc ps-5 text-sm space-y-1">
        <li v-for="(w, i) in prodWarnings" :key="i">{{ w }}</li>
      </ul>
    </UAlert>

    <!-- License signing -->
    <UCard class="!shadow-none">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-shield-check" class="size-5 text-primary" />
          <h3 class="font-semibold">License signing keypair</h3>
        </div>
      </template>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">Private seed</dt>
          <dd>
            <UBadge :color="cfg?.licenseSigning.privateKeySet ? 'success' : 'error'" variant="soft" size="sm">
              {{ cfg?.licenseSigning.privateKeySet ? 'Configured' : 'Missing' }}
            </UBadge>
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Keypair valid</dt>
          <dd>
            <UBadge :color="cfg?.licenseSigning.keypairMatches ? 'success' : 'error'" variant="soft" size="sm">
              {{ cfg?.licenseSigning.keypairMatches ? 'Round-trip OK' : 'Mismatch or missing' }}
            </UBadge>
          </dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-gray-500">Public key (masked)</dt>
          <dd class="font-mono text-xs">{{ cfg?.licenseSigning.publicKeyMasked || '—' }}</dd>
        </div>
      </dl>
      <p class="mt-4 text-xs text-gray-500">
        The public key is also embedded in every shipped Momentfy app as an XOR-shared constant.
        Regenerating forces every existing customer to re-activate — do not rotate unless absolutely necessary.
      </p>
      <div class="mt-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] p-3 text-xs">
        <p class="font-semibold mb-1">To regenerate (do not run unless rotating):</p>
        <pre class="font-mono overflow-x-auto">npx tsx scripts/generate-license-keypair.ts</pre>
      </div>
    </UCard>

    <!-- Runtime -->
    <UCard class="!shadow-none">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-server" class="size-5 text-primary" />
          <h3 class="font-semibold">Runtime</h3>
        </div>
      </template>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">NODE_ENV</dt>
          <dd>
            <UBadge :color="cfg?.nodeEnv === 'production' ? 'primary' : 'neutral'" variant="soft" size="sm">
              {{ cfg?.nodeEnv }}
            </UBadge>
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Portal URL</dt>
          <dd class="font-mono text-xs break-all">{{ cfg?.portalUrl || '—' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Session cookie Secure flag</dt>
          <dd>
            <UBadge :color="cfg?.sessionCookieSecure ? 'success' : 'warning'" variant="soft" size="sm">
              {{ cfg?.sessionCookieSecure ? 'Enabled' : 'Disabled' }}
            </UBadge>
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">LICENSE_PEPPER</dt>
          <dd>
            <UBadge :color="cfg?.licensePepperSet ? 'success' : 'warning'" variant="soft" size="sm">
              {{ cfg?.licensePepperSet ? 'Set' : 'Not set' }}
            </UBadge>
          </dd>
        </div>
      </dl>
    </UCard>

    <div class="flex items-center justify-between p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03]">
      <div>
        <p class="font-semibold text-sm">Integrations</p>
        <p class="text-xs text-gray-500 mt-0.5">Lemon Squeezy, GitHub, SMTP — view status and test tokens.</p>
      </div>
      <UButton to="/admin/settings/integrations" trailing-icon="i-lucide-arrow-right" variant="soft" size="sm">Open</UButton>
    </div>
  </div>
</template>
