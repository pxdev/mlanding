<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Licenses — Momentfy portal' })

const { user, isAdmin, displayName } = useSession()
const config = useRuntimeConfig()
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-2xl font-semibold">Welcome{{ displayName ? `, ${displayName}` : '' }}</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">Manage your Momentfy licenses, source-code access and billing.</p>
    </header>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold">Your licenses</h2>
          <a :href="config.public.checkoutUrl" target="_blank" rel="noopener" class="text-sm text-primary font-medium hover:underline">
            Buy a license →
          </a>
        </div>
      </template>

      <div class="text-center py-12 text-gray-500 dark:text-gray-400">
        <UIcon name="i-lucide-key" class="size-10 mx-auto opacity-40" />
        <p class="mt-3 text-sm">No licenses yet.</p>
        <p class="text-xs mt-1">After you complete checkout, your license and repo invite will show up here.</p>
      </div>
    </UCard>

    <UCard v-if="isAdmin">
      <template #header>
        <h2 class="font-semibold">Operator tools</h2>
      </template>
      <div class="space-y-2 text-sm">
        <NuxtLink to="/admin/users" class="block text-primary hover:underline">→ Manage customers</NuxtLink>
        <NuxtLink to="/admin/licenses" class="block text-primary hover:underline">→ Browse all licenses</NuxtLink>
      </div>
    </UCard>

    <p class="text-xs text-gray-400">
      Signed in as {{ user?.email }} · <NuxtLink to="/" class="hover:underline">Visit marketing site</NuxtLink>
    </p>
  </div>
</template>
