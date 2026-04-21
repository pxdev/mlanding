<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'Integrations — Momentfy admin' })

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

const { data: cfg, refresh, status } = await useFetch<IntegrationsStatus>('/api/portal/admin/settings/integrations')

function statusFor(enabled: boolean | null): { color: 'success' | 'error' | 'warning' | 'neutral'; label: string } {
  if (enabled === true) return { color: 'success', label: 'Active' }
  if (enabled === false) return { color: 'error', label: 'Misconfigured' }
  return { color: 'neutral', label: 'Not configured' }
}
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <header class="flex items-start justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold">Integrations</h1>
        <p class="text-sm text-gray-500 mt-1">External services the Portal talks to. All configured via environment variables.</p>
      </div>
      <UButton size="sm" variant="ghost" icon="i-lucide-refresh-cw" :loading="status === 'pending'" @click="refresh">Refresh</UButton>
    </header>

    <!-- Lemon Squeezy -->
    <UCard class="!shadow-none">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-shopping-cart" class="size-5 text-primary" />
            <h3 class="font-semibold">Lemon Squeezy</h3>
          </div>
          <UBadge
            v-if="cfg?.lemonSqueezy.apiKeySet && cfg?.lemonSqueezy.storeId"
            :color="statusFor(true).color" variant="soft" size="sm"
          >
            {{ cfg.lemonSqueezy.testMode ? 'Active (test mode)' : 'Active' }}
          </UBadge>
          <UBadge v-else color="neutral" variant="soft" size="sm">Not configured</UBadge>
        </div>
      </template>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">API key</dt>
          <dd>
            <UBadge :color="cfg?.lemonSqueezy.apiKeySet ? 'success' : 'error'" variant="soft" size="sm">
              {{ cfg?.lemonSqueezy.apiKeySet ? 'Set' : 'Missing' }}
            </UBadge>
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Webhook secret</dt>
          <dd>
            <UBadge :color="cfg?.lemonSqueezy.webhookSecretSet ? 'success' : 'error'" variant="soft" size="sm">
              {{ cfg?.lemonSqueezy.webhookSecretSet ? 'Set' : 'Missing' }}
            </UBadge>
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Store ID</dt>
          <dd class="font-mono text-xs">{{ cfg?.lemonSqueezy.storeId || '—' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Store domain</dt>
          <dd class="font-mono text-xs">{{ cfg?.lemonSqueezy.storeDomain || '—' }}</dd>
        </div>
      </dl>
      <details class="mt-4">
        <summary class="text-xs text-gray-500 cursor-pointer">How to configure</summary>
        <div class="mt-2 text-xs text-gray-500 space-y-1">
          <p>Set these in your Portal <code>.env</code>:</p>
          <ul class="list-disc ps-5 font-mono">
            <li>LEMON_SQUEEZY_API_KEY</li>
            <li>LEMON_SQUEEZY_STORE_ID</li>
            <li>LEMON_SQUEEZY_STORE_DOMAIN</li>
            <li>LEMON_SQUEEZY_WEBHOOK_SECRET</li>
          </ul>
        </div>
      </details>
    </UCard>

    <!-- GitHub -->
    <UCard class="!shadow-none">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-simple-icons-github" class="size-5" />
            <h3 class="font-semibold">GitHub</h3>
          </div>
          <UBadge :color="statusFor(cfg?.github.tokenSet ? cfg?.github.tokenValid : null).color" variant="soft" size="sm">
            {{ statusFor(cfg?.github.tokenSet ? cfg?.github.tokenValid : null).label }}
          </UBadge>
        </div>
      </template>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">Token</dt>
          <dd>
            <UBadge :color="cfg?.github.tokenSet ? 'success' : 'neutral'" variant="soft" size="sm">
              {{ cfg?.github.tokenSet ? 'Set' : 'Not set' }}
            </UBadge>
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Token valid</dt>
          <dd>
            <UBadge
              v-if="cfg?.github.tokenSet"
              :color="cfg.github.tokenValid ? 'success' : 'error'" variant="soft" size="sm"
            >{{ cfg.github.tokenValid ? 'Verified' : 'Rejected' }}</UBadge>
            <span v-else class="text-gray-500 text-xs">—</span>
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Organisation</dt>
          <dd>{{ cfg?.github.org || '—' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Team slug</dt>
          <dd>{{ cfg?.github.teamSlug || '—' }}</dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-gray-500">Repository</dt>
          <dd class="font-mono text-xs">{{ cfg?.github.repo || '—' }}</dd>
        </div>
      </dl>
      <details class="mt-4">
        <summary class="text-xs text-gray-500 cursor-pointer">How to configure</summary>
        <div class="mt-2 text-xs text-gray-500 space-y-1">
          <p>Generate a PAT with <code>admin:org</code> (or fine-grained with Members write) and set:</p>
          <ul class="list-disc ps-5 font-mono">
            <li>GITHUB_TOKEN</li>
            <li>GITHUB_ORG</li>
            <li>GITHUB_TEAM_SLUG</li>
            <li>GITHUB_REPO</li>
          </ul>
        </div>
      </details>
    </UCard>

    <!-- SMTP -->
    <UCard class="!shadow-none">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-mail" class="size-5 text-primary" />
            <h3 class="font-semibold">Transactional email (SMTP)</h3>
          </div>
          <UBadge :color="cfg?.smtp.configured ? 'success' : 'neutral'" variant="soft" size="sm">
            {{ cfg?.smtp.configured ? 'Active' : 'Disabled' }}
          </UBadge>
        </div>
      </template>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">Host</dt>
          <dd class="font-mono text-xs">{{ cfg?.smtp.host || '—' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Port</dt>
          <dd>{{ cfg?.smtp.port || '—' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">From</dt>
          <dd class="font-mono text-xs">{{ cfg?.smtp.from || '—' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Authentication</dt>
          <dd>
            <UBadge :color="cfg?.smtp.userSet ? 'success' : 'neutral'" variant="soft" size="sm">
              {{ cfg?.smtp.userSet ? 'With SMTP user' : 'Relay (no auth)' }}
            </UBadge>
          </dd>
        </div>
      </dl>
      <details class="mt-4">
        <summary class="text-xs text-gray-500 cursor-pointer">How to configure</summary>
        <div class="mt-2 text-xs text-gray-500 space-y-1">
          <p>Set these in your Portal <code>.env</code>:</p>
          <ul class="list-disc ps-5 font-mono">
            <li>SMTP_HOST</li>
            <li>SMTP_PORT (465 for SMTPS, 587 for STARTTLS)</li>
            <li>SMTP_USER / SMTP_PASS (optional for open relay)</li>
            <li>SMTP_FROM</li>
          </ul>
          <p>Leaving SMTP unset disables password-reset and post-purchase "your license is ready" emails.</p>
        </div>
      </details>
    </UCard>

    <!-- License hashing pepper -->
    <UCard class="!shadow-none">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-key" class="size-5 text-primary" />
            <h3 class="font-semibold">License key pepper</h3>
          </div>
          <UBadge :color="cfg?.licensePepperSet ? 'success' : 'warning'" variant="soft" size="sm">
            {{ cfg?.licensePepperSet ? 'Set' : 'Missing' }}
          </UBadge>
        </div>
      </template>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Extra secret folded into the SHA-256 hash of every issued key. Treat it like an encryption key:
        rotating makes every existing key unrecognisable. Required in production.
      </p>
      <details class="mt-4">
        <summary class="text-xs text-gray-500 cursor-pointer">How to configure</summary>
        <pre class="mt-2 text-xs font-mono bg-black/[0.03] dark:bg-white/[0.03] p-2 rounded">LICENSE_PEPPER=$(openssl rand -hex 32)</pre>
      </details>
    </UCard>
  </div>
</template>
