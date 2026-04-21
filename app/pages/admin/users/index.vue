<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
useHead({ title: 'Customers — Momentfy admin' })

interface UserRow {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  githubUsername: string | null
  isAdmin: boolean
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  _count: { licenses: number; orders: number }
}

const q = ref('')
const { data: users, refresh } = await useFetch<UserRow[]>('/api/portal/admin/users', {
  query: computed(() => ({ q: q.value || undefined })),
  default: () => []
})

function fmt(d: string | null) {
  return d ? new Date(d).toLocaleDateString() : '—'
}
function name(u: UserRow) {
  return `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <header>
      <h1 class="text-2xl font-bold">Customers</h1>
      <p class="text-sm text-gray-500 mt-1">Search and manage portal accounts.</p>
    </header>

    <div class="flex gap-2">
      <UInput v-model="q" placeholder="Search by email, name, GitHub username" icon="i-lucide-search" class="flex-1" @keyup.enter="refresh" />
      <UButton icon="i-lucide-search" @click="refresh">Search</UButton>
    </div>

    <UCard class="!shadow-none">
      <div v-if="!users.length" class="text-center py-10 text-gray-500">
        <UIcon name="i-lucide-users-round" class="size-8 mx-auto opacity-40" />
        <p class="mt-3 text-sm">No customers found.</p>
      </div>
      <div v-else class="divide-y divide-black/5 dark:divide-white/10 -m-4">
        <NuxtLink
          v-for="u in users" :key="u.id" :to="`/admin/users/${u.id}`"
          class="flex items-center gap-4 px-4 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition"
        >
          <div class="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
            {{ (u.firstName?.[0] || u.email[0] || '?').toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap text-sm">
              <span class="font-medium truncate">{{ name(u) }}</span>
              <UBadge v-if="u.isAdmin" color="primary" variant="soft" size="sm">admin</UBadge>
              <UBadge v-if="!u.isActive" color="error" variant="soft" size="sm">inactive</UBadge>
            </div>
            <div class="text-xs text-gray-500 mt-0.5">
              {{ u.email }}
              <span v-if="u.githubUsername"> · gh:{{ u.githubUsername }}</span>
              · joined {{ fmt(u.createdAt) }}
            </div>
          </div>
          <div class="text-xs text-gray-500 text-right">
            <div>{{ u._count.licenses }} license{{ u._count.licenses === 1 ? '' : 's' }}</div>
            <div>{{ u._count.orders }} order{{ u._count.orders === 1 ? '' : 's' }}</div>
          </div>
          <UIcon name="i-lucide-chevron-right" class="size-4 text-gray-400" />
        </NuxtLink>
      </div>
    </UCard>
  </div>
</template>
