<script setup lang="ts">
const route = useRoute()
const { user, isAdmin, displayName, clear } = useSession()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const mobileNavOpen = ref(false)

const navItems = computed(() => {
  const base = [
    { label: 'Licenses', to: '/dashboard', icon: 'i-lucide-key' },
    { label: 'Profile', to: '/dashboard/profile', icon: 'i-lucide-user' }
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

// Close the mobile drawer when the route changes.
watch(() => route.fullPath, () => { mobileNavOpen.value = false })

async function onLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/auth/login')
}

const pageTitle = computed(() => {
  if (route.path === '/dashboard') return 'Licenses'
  if (route.path.startsWith('/dashboard/licenses/')) return 'License'
  if (route.path === '/dashboard/profile') return 'Profile'
  if (route.path.startsWith('/admin/users')) return 'Customers'
  if (route.path.startsWith('/admin/licenses')) return 'All licenses'
  if (route.path.startsWith('/admin/invites')) return 'GitHub invites'
  if (route.path.startsWith('/admin/audit')) return 'Audit log'
  return 'Portal'
})

const userMenuItems = computed(() => [
  [{ label: displayName.value || user.value?.email || 'Account', icon: 'i-lucide-user', disabled: true }],
  [
    { label: 'Profile', icon: 'i-lucide-user', to: '/dashboard/profile' },
    { label: isDark.value ? 'Light mode' : 'Dark mode', icon: isDark.value ? 'i-lucide-sun' : 'i-lucide-moon', onSelect: () => { colorMode.preference = isDark.value ? 'light' : 'dark' } }
  ],
  [{ label: 'Sign out', icon: 'i-lucide-log-out', onSelect: onLogout }]
])
</script>

<template>
  <div class="min-h-dvh bg-neutral-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
    <div class="grid grid-cols-1 lg:grid-cols-[260px_1fr] min-h-dvh">
      <!-- Desktop sidebar -->
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
      <div class="flex flex-col min-w-0">
        <header class="sticky top-0 z-20 h-16 px-4 sm:px-6 lg:px-8 flex items-center gap-3 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
          <!-- Mobile: hamburger -->
          <button
            class="lg:hidden size-9 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Open menu"
            @click="mobileNavOpen = true"
          >
            <UIcon name="i-lucide-menu" class="size-5" />
          </button>
          <!-- Mobile: brand (sidebar hidden) -->
          <NuxtLink to="/dashboard" class="lg:hidden flex items-center gap-2">
            <div class="size-7 rounded-lg bg-primary text-white flex items-center justify-center font-black text-sm">M</div>
          </NuxtLink>

          <h1 class="font-semibold text-base truncate">{{ pageTitle }}</h1>

          <div class="ms-auto flex items-center gap-2">
            <button
              class="hidden sm:flex size-9 items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition"
              :aria-label="isDark ? 'Light mode' : 'Dark mode'"
              @click="colorMode.preference = isDark ? 'light' : 'dark'"
            >
              <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
            </button>
            <ClientOnly>
              <UDropdownMenu :items="userMenuItems" :ui="{ content: 'w-56' }">
                <button class="flex items-center gap-2 px-2 sm:px-3 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition">
                  <div class="size-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[11px] font-bold">
                    {{ (displayName || user?.email || '?').charAt(0).toUpperCase() }}
                  </div>
                  <span class="hidden sm:inline text-sm font-medium max-w-[160px] truncate">{{ displayName || user?.email }}</span>
                  <UIcon name="i-lucide-chevron-down" class="size-3 opacity-60 hidden sm:inline" />
                </button>
              </UDropdownMenu>
              <template #fallback>
                <div class="size-9 rounded-full bg-black/5 dark:bg-white/10" />
              </template>
            </ClientOnly>
          </div>
        </header>

        <main class="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl w-full mx-auto">
          <slot />
        </main>
      </div>
    </div>

    <!-- Mobile navigation drawer -->
    <USlideover v-model:open="mobileNavOpen" side="left" :ui="{ content: 'max-w-[280px]' }">
      <template #content>
        <div class="flex flex-col h-full bg-white dark:bg-neutral-900">
          <div class="px-5 h-16 flex items-center justify-between border-b border-black/5 dark:border-white/10">
            <NuxtLink to="/dashboard" class="flex items-center gap-2" @click="mobileNavOpen = false">
              <div class="size-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg">M</div>
              <span class="font-black text-lg tracking-tight">Momentfy</span>
            </NuxtLink>
            <button
              class="size-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Close menu"
              @click="mobileNavOpen = false"
            >
              <UIcon name="i-lucide-x" class="size-4" />
            </button>
          </div>
          <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
            <NuxtLink
              v-for="item in navItems" :key="item.to" :to="item.to"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              :class="isActive(item.to)
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10'"
            >
              <UIcon :name="item.icon" class="size-4" />
              {{ item.label }}
            </NuxtLink>
          </nav>
          <div class="p-3 border-t border-black/5 dark:border-white/10 space-y-1">
            <button
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"
              @click="colorMode.preference = isDark ? 'light' : 'dark'"
            >
              <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
              {{ isDark ? 'Light mode' : 'Dark mode' }}
            </button>
            <button
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"
              @click="onLogout"
            >
              <UIcon name="i-lucide-log-out" class="size-4" />
              Sign out
            </button>
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>
