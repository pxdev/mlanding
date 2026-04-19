<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth', 'admin'] })
useHead({ title: 'Admin — Momentfy portal' })
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-semibold">Operator</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">Manage customers, licenses, and review the audit log.</p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <NuxtLink to="/admin/users" class="block p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 hover:border-primary transition">
        <UIcon name="i-lucide-users" class="size-6 text-primary" />
        <h3 class="mt-3 font-semibold">Customers</h3>
        <p class="text-sm text-gray-500 mt-1">Search accounts, manage flags.</p>
      </NuxtLink>
      <NuxtLink to="/admin/licenses" class="block p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 hover:border-primary transition">
        <UIcon name="i-lucide-shield" class="size-6 text-primary" />
        <h3 class="mt-3 font-semibold">Licenses</h3>
        <p class="text-sm text-gray-500 mt-1">Issue, revoke, raise install caps.</p>
      </NuxtLink>
      <NuxtLink to="/admin/audit" class="block p-5 rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 hover:border-primary transition">
        <UIcon name="i-lucide-list" class="size-6 text-primary" />
        <h3 class="mt-3 font-semibold">Audit log</h3>
        <p class="text-sm text-gray-500 mt-1">Every admin action, time-stamped.</p>
      </NuxtLink>
    </div>
  </div>
</template>
