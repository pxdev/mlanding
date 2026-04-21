<script setup lang="ts">
// Operator console layout. Three panels:
//   1. Dark icon sidebar on the left (primary section jump)
//   2. Collapsible submenu in the middle (sub-pages within a section)
//   3. Content on the right, with a top bar for brand/language/profile
//
// Visual language mirrors the main Momentfy app's admin layout so
// operators feel at home. Uses Portal tokens (primary colour) rather
// than the main app's exact palette, which is fine — the shape is the
// familiar part.

const route = useRoute()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const { user, displayName, clear } = useSession()

const isSubMenuOpen = ref(true)
const mobileMenuOpen = ref(false)
watch(() => route.fullPath, () => { mobileMenuOpen.value = false })

defineShortcuts({
  c: {
    handler: () => { isSubMenuOpen.value = !isSubMenuOpen.value },
    usingInput: false
  }
})

interface NavItem { icon: string; to: string; label: string }

// Primary nav: shows in the narrow left rail.
const mainNavItems = computed<NavItem[]>(() => [
  { icon: 'i-lucide-layout-dashboard', to: '/admin', label: 'Dashboard' },
  { icon: 'i-lucide-shield', to: '/admin/licenses', label: 'Licenses' },
  { icon: 'i-lucide-users', to: '/admin/users', label: 'Customers' },
  { icon: 'i-lucide-shopping-cart', to: '/admin/orders', label: 'Purchases' },
  { icon: 'i-lucide-package', to: '/admin/plans', label: 'Plans' },
  { icon: 'i-simple-icons-github', to: '/admin/invites', label: 'GitHub invites' },
  { icon: 'i-lucide-list', to: '/admin/audit', label: 'Audit log' },
  { icon: 'i-lucide-settings', to: '/admin/settings', label: 'Settings' }
])

// Submenu: only populated for sections that have sub-pages. Leaving a
// section out means no middle panel is rendered.
const subMenuConfig = computed<Record<string, { title: string; items: { label: string; to: string }[] }>>(() => ({
  '/admin/licenses': {
    title: 'Licenses',
    items: [
      { label: 'All licenses', to: '/admin/licenses' },
      { label: 'Issue new', to: '/admin/licenses/new' }
    ]
  },
  '/admin/orders': {
    title: 'Purchases',
    items: [
      { label: 'All orders', to: '/admin/orders' }
    ]
  },
  '/admin/settings': {
    title: 'Settings',
    items: [
      { label: 'General', to: '/admin/settings' },
      { label: 'Integrations', to: '/admin/settings/integrations' }
    ]
  }
}))

const currentSubMenu = computed(() => {
  const path = route.path
  for (const [prefix, config] of Object.entries(subMenuConfig.value)) {
    if (path === prefix || path.startsWith(prefix + '/')) return config
  }
  return null
})
const hasSubMenu = computed(() => currentSubMenu.value !== null)

function isActive(to: string) {
  if (to === '/admin') return route.path === '/admin'
  return route.path === to || route.path.startsWith(to + '/')
}

function isSubActive(to: string) {
  return route.path === to
}

const userMenuItems = computed(() => [
  [{ label: displayName.value || user.value?.email || 'Account', icon: 'i-lucide-user', disabled: true }],
  [
    { label: 'Portal dashboard', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
    { label: 'Profile', icon: 'i-lucide-user', to: '/dashboard/profile' },
    { label: isDark.value ? 'Light mode' : 'Dark mode', icon: isDark.value ? 'i-lucide-sun' : 'i-lucide-moon', onSelect: () => { colorMode.preference = isDark.value ? 'light' : 'dark' } }
  ],
  [{ label: 'Sign out', icon: 'i-lucide-log-out', onSelect: onLogout }]
])

async function onLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/auth/login')
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
    <!-- LEFT: Dark icon rail -->
    <aside class="w-16 hidden lg:flex flex-col bg-primary-900 flex-shrink-0 z-20">
      <div class="h-14 flex items-center justify-center border-b border-white/10 flex-shrink-0">
        <div class="size-8 rounded-lg bg-primary flex items-center justify-center">
          <UIcon name="i-lucide-shield" class="size-4 text-white" />
        </div>
      </div>
      <nav class="flex-1 py-4 flex flex-col items-center gap-2 overflow-y-auto">
        <UPopover
          v-for="item in mainNavItems"
          :key="item.to"
          mode="hover"
          arrow
          :content="{ side: 'right', align: 'center' }"
        >
          <NuxtLink
            :to="item.to"
            class="relative w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-200 group"
            :class="[
              isActive(item.to)
                ? 'bg-secondary text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            ]"
          >
            <span
              v-if="isActive(item.to)"
              class="absolute top-1/2 -translate-y-1/2 -left-2 w-1 h-5 bg-primary rounded-r-full"
            />
            <UIcon :name="item.icon" class="size-5" />
          </NuxtLink>
          <template #content>
            <div class="px-2 py-1 text-sm font-medium whitespace-nowrap">
              {{ item.label }}
            </div>
          </template>
        </UPopover>
      </nav>
      <div class="py-4 flex flex-col items-center gap-2 border-t border-white/10 flex-shrink-0">
        <UPopover mode="hover" arrow :content="{ side: 'right', align: 'center' }">
          <NuxtLink
            to="/dashboard"
            class="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <UIcon name="i-lucide-arrow-left" class="size-5" />
          </NuxtLink>
          <template #content>
            <div class="px-2 py-1 text-sm font-medium whitespace-nowrap">Back to portal</div>
          </template>
        </UPopover>
      </div>
    </aside>

    <!-- MIDDLE: Submenu panel (collapsible) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="-ms-64 opacity-0"
      enter-to-class="ms-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="ms-0 opacity-100"
      leave-to-class="-ms-64 opacity-0"
    >
      <aside
        v-if="hasSubMenu && isSubMenuOpen"
        class="w-64 hidden lg:flex flex-col bg-white dark:bg-neutral-900 border-e border-black/5 dark:border-white/10 flex-shrink-0"
      >
        <div class="h-14 px-4 flex items-center justify-between border-b border-black/5 dark:border-white/10 flex-shrink-0">
          <span class="font-semibold">{{ currentSubMenu?.title }}</span>
          <UButton
            icon="i-lucide-x"
            variant="ghost"
            size="xs"
            class="text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="isSubMenuOpen = false"
          />
        </div>
        <nav class="flex-1 py-2 overflow-y-auto px-2">
          <NuxtLink
            v-for="(item, idx) in currentSubMenu?.items"
            :key="idx"
            :to="item.to"
            class="block px-3 py-2 rounded text-sm font-medium mb-1 transition-colors"
            :class="isSubActive(item.to)
              ? 'bg-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </aside>
    </Transition>

    <!-- RIGHT: main column -->
    <div class="flex-1 flex flex-col min-w-0 bg-neutral-50 dark:bg-neutral-950">
      <header class="h-14 px-4 flex items-center justify-between bg-white dark:bg-neutral-900 border-b border-black/5 dark:border-white/10 flex-shrink-0">
        <div class="flex items-center gap-3">
          <button class="lg:hidden p-2 -ms-2" @click="mobileMenuOpen = true">
            <UIcon name="i-lucide-menu" class="size-5" />
          </button>
          <UButton
            v-if="hasSubMenu && !isSubMenuOpen"
            icon="i-lucide-menu"
            variant="ghost"
            size="sm"
            class="hidden lg:flex text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="isSubMenuOpen = true"
          />
          <span class="text-xl font-bold tracking-tight">Admin</span>
        </div>

        <div class="flex items-center gap-1">
          <ClientOnly>
            <button
              class="hidden sm:flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-black/5 dark:hover:bg-white/10 transition"
              :aria-label="isDark ? 'Light mode' : 'Dark mode'"
              @click="colorMode.preference = isDark ? 'light' : 'dark'"
            >
              <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
            </button>
          </ClientOnly>
          <ClientOnly>
            <UDropdownMenu :items="userMenuItems" :ui="{ content: 'w-56' }">
              <button class="ms-1 flex items-center gap-2 ps-1 pe-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <div class="size-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">
                  {{ (displayName || user?.email || '?').charAt(0).toUpperCase() }}
                </div>
                <span class="hidden sm:block text-sm font-medium max-w-[160px] truncate">{{ displayName || user?.email }}</span>
              </button>
            </UDropdownMenu>
            <template #fallback>
              <div class="size-9 rounded-full bg-black/5 dark:bg-white/10" />
            </template>
          </ClientOnly>
        </div>
      </header>

      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>

    <!-- Mobile drawer -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 lg:hidden">
          <div class="absolute inset-0 bg-black/50" @click="mobileMenuOpen = false" />
          <aside class="absolute inset-y-0 start-0 w-72 bg-white dark:bg-neutral-900 shadow-xl flex flex-col overflow-y-auto">
            <div class="h-14 px-4 flex items-center justify-between border-b border-black/5 dark:border-white/10 flex-shrink-0">
              <span class="text-lg font-bold">Admin</span>
              <button class="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10" @click="mobileMenuOpen = false">
                <UIcon name="i-lucide-x" class="size-5" />
              </button>
            </div>
            <nav class="flex-1 py-3 px-3 overflow-y-auto">
              <NuxtLink
                v-for="item in mainNavItems" :key="item.to" :to="item.to"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors"
                :class="isActive(item.to) ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'"
              >
                <UIcon :name="item.icon" class="size-5 shrink-0" />
                {{ item.label }}
              </NuxtLink>
              <template v-if="currentSubMenu">
                <div class="mt-4 pt-4 border-t border-black/5 dark:border-white/10">
                  <p class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{{ currentSubMenu.title }}</p>
                  <NuxtLink
                    v-for="(item, idx) in currentSubMenu.items" :key="idx" :to="item.to"
                    class="block px-3 py-2 rounded text-sm font-medium mb-0.5 transition-colors"
                    :class="isSubActive(item.to) ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10'"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </div>
              </template>
            </nav>
          </aside>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
