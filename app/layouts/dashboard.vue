<script setup lang="ts">
const route = useRoute()
const { user, isAdmin, displayName, clear } = useSession()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const navItems = computed(() => {
  const base = [
    { label: 'Licenses', to: '/dashboard', icon: 'i-lucide-key' },
    { label: 'Profile', to: '/dashboard/profile', icon: 'i-lucide-user' }
    // Billing arrives with phase 6 (LS customer portal link + invoices).
  ]
  if (isAdmin.value) {
    base.push(
      { label: 'Customers', to: '/admin/users', icon: 'i-lucide-users' },
      { label: 'All licenses', to: '/admin/licenses', icon: 'i-lucide-shield' },
      { label: 'GitHub invites', to: '/admin/invites', icon: 'i-simple-icons-github' },
      { label: 'Audit log', to: '/admin/audit', icon: 'i-lucide-list' }
    )
  }
  return base
})

function isActive(to: string) {
  return route.path === to || (to !== '/dashboard' && route.path.startsWith(to + '/'))
}

async function onLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/auth/login')
}
</script>

<template>
  <div class="min-h-dvh bg-neutral-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
    <div class="grid grid-cols-1 lg:grid-cols-[260px_1fr] min-h-dvh">
      <!-- Sidebar -->
      <aside class="hidden lg:flex flex-col border-e border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900">
        <div class="px-5 h-16 flex items-center border-b border-black/5 dark:border-white/10">
          <NuxtLink to="/dashboard" class="flex items-center gap-2 group">
            <div class="size-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg">M</div>
            <span class="font-black text-lg tracking-tight">Momentfy</span>
          </NuxtLink>
        </div>
        <nav class="flex-1 p-3 space-y-1">
          <NuxtLink
            v-for="item in navItems" :key="item.to" :to="item.to"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="isActive(item.to)
              ? 'bg-primary text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10'"
          >
            <UIcon :name="item.icon" class="size-4" />
            {{ item.label }}
          </NuxtLink>
        </nav>
        <div class="p-3 border-t border-black/5 dark:border-white/10">
          <button
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"
            @click="onLogout"
          >
            <UIcon name="i-lucide-log-out" class="size-4" />
            Sign out
          </button>
        </div>
      </aside>

      <!-- Main column -->
      <div class="flex flex-col">
        <header class="h-16 px-5 sm:px-8 flex items-center gap-4 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
          <h1 class="font-semibold text-base">Portal</h1>
          <div class="ms-auto flex items-center gap-2">
            <button
              class="size-9 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition"
              :aria-label="isDark ? 'Light mode' : 'Dark mode'"
              @click="colorMode.preference = isDark ? 'light' : 'dark'"
            >
              <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
            </button>
            <div class="hidden sm:flex items-center gap-2 px-3 h-9 rounded-full bg-black/5 dark:bg-white/10">
              <UIcon name="i-lucide-user" class="size-4" />
              <span class="text-sm font-medium">{{ displayName || user?.email }}</span>
            </div>
            <button class="lg:hidden size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10" @click="onLogout">
              <UIcon name="i-lucide-log-out" class="size-4" />
            </button>
          </div>
        </header>

        <main class="flex-1 px-5 sm:px-8 py-8 max-w-6xl w-full mx-auto">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
