<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
function toggleColorMode() { colorMode.preference = isDark.value ? 'light' : 'dark' }

const copy = useLandingCopy()
const { localeItems, currentLocale } = useLandingLocale()
// Logged-in visitors get "Dashboard" in place of "Sign in".
const { loggedIn } = useUserSession()

const mobileOpen = ref(false)
watch(() => route.fullPath, () => { mobileOpen.value = false })

const scrolled = ref(false)
const onScroll = () => { scrolled.value = typeof window !== 'undefined' && window.scrollY > 12 }
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('scroll', onScroll)
})

const navItems = computed(() => [
  { label: copy.value.nav.features, to: '/portal/features' },
  { label: copy.value.nav.addons, to: '/portal/addons' },
  { label: copy.value.nav.showcase, to: '/portal/showcase' },
  { label: copy.value.nav.pricing, to: '/portal/pricing' },
  { label: copy.value.nav.docs, to: '/portal/docs' },
  { label: copy.value.nav.faq, to: '/portal/faq' }
])

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-40 transition-all duration-300"
    :class="scrolled
      ? 'bg-white/70 dark:bg-black/60 backdrop-blur-xl border-b border-black/5 dark:border-white/10'
      : 'bg-transparent border-b border-transparent'"
  >
    <div class="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-8">
      <!-- Brand -->
      <NuxtLink to="/" class="flex items-center gap-2 shrink-0 group">
        <div class="size-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
          M
        </div>
        <span class="font-black text-lg tracking-tight text-primary dark:text-white">
          Momentfy
        </span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-1 flex-1">
        <NuxtLink
          v-for="item in navItems" :key="item.to"
          :to="item.to"
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          :class="isActive(item.to)
            ? 'text-primary dark:text-white bg-black/5 dark:bg-white/10'
            : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2 ms-auto">
        <!-- Language switcher (UDropdownMenu uses reka-ui Popper which isn't SSR-safe — render client-only) -->
        <ClientOnly>
          <UDropdownMenu :items="localeItems">
            <button
              class="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition"
              :aria-label="copy.nav.langLabel"
            >
              <UIcon name="i-lucide-languages" class="size-4" />
              <span class="uppercase tracking-wider text-[11px] font-bold">{{ currentLocale?.code }}</span>
              <UIcon name="i-lucide-chevron-down" class="size-3 opacity-50" />
            </button>
          </UDropdownMenu>
          <template #fallback>
            <span class="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400">
              <UIcon name="i-lucide-languages" class="size-4" />
              <span class="uppercase tracking-wider text-[11px] font-bold">{{ currentLocale?.code }}</span>
            </span>
          </template>
        </ClientOnly>

        <button
          class="hidden sm:flex size-9 items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition"
          :aria-label="isDark ? 'Light' : 'Dark'"
          @click="toggleColorMode"
        >
          <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
        </button>

        <ClientOnly>
          <NuxtLink
            :to="loggedIn ? '/dashboard' : '/auth/login'"
            class="hidden sm:inline-flex items-center px-4 h-9 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            {{ loggedIn ? 'Dashboard' : copy.nav.signIn }}
          </NuxtLink>
          <template #fallback>
            <NuxtLink
              to="/auth/login"
              class="hidden sm:inline-flex items-center px-4 h-9 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              {{ copy.nav.signIn }}
            </NuxtLink>
          </template>
        </ClientOnly>

        <NuxtLink
          to="/portal/pricing"
          class="inline-flex items-center gap-1.5 px-4 h-9 rounded-full text-sm font-semibold bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all"
        >
          {{ copy.nav.getCode }}
          <UIcon name="i-lucide-arrow-right" class="size-3.5 rtl:rotate-180" />
        </NuxtLink>

        <button
          class="lg:hidden size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Open menu"
          @click="mobileOpen = true"
        >
          <UIcon name="i-lucide-menu" class="size-5" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-200"
        leave-to-class="opacity-0"
      >
        <div v-if="mobileOpen" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden" @click="mobileOpen = false" />
      </Transition>
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full rtl:-translate-x-full"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-to-class="translate-x-full rtl:-translate-x-full"
      >
        <aside v-if="mobileOpen" class="fixed inset-y-0 end-0 z-50 w-80 bg-white dark:bg-black shadow-2xl lg:hidden flex flex-col">
          <div class="h-16 px-5 flex items-center justify-between border-b border-black/5 dark:border-white/10">
            <div class="flex items-center gap-2">
              <div class="size-8 rounded-xl bg-primary text-white flex items-center justify-center font-black">M</div>
              <span class="font-black text-lg">Momentfy</span>
            </div>
            <button class="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10" @click="mobileOpen = false">
              <UIcon name="i-lucide-x" class="size-5" />
            </button>
          </div>
          <nav class="flex-1 p-4 space-y-1">
            <NuxtLink
              v-for="item in navItems" :key="item.to" :to="item.to"
              class="block px-4 py-3 rounded-xl text-base font-medium transition-colors"
              :class="isActive(item.to)
                ? 'bg-primary text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'"
            >{{ item.label }}</NuxtLink>

            <!-- Mobile language switcher -->
            <div class="mt-4 pt-4 border-t border-black/5 dark:border-white/10">
              <p class="px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">{{ copy.nav.langLabel }}</p>
              <ClientOnly>
                <UDropdownMenu :items="localeItems" :ui="{ content: 'w-full' }">
                  <button class="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-black/5 dark:bg-white/10">
                    <UIcon name="i-lucide-languages" class="size-4" />
                    {{ currentLocale?.name }}
                    <UIcon name="i-lucide-chevron-down" class="size-3.5 ms-auto opacity-50" />
                  </button>
                </UDropdownMenu>
              </ClientOnly>
            </div>
          </nav>
          <div class="p-4 border-t border-black/5 dark:border-white/10 space-y-2">
            <ClientOnly>
              <NuxtLink :to="loggedIn ? '/dashboard' : '/auth/login'" class="block text-center px-4 py-3 rounded-xl text-sm font-medium bg-black/5 dark:bg-white/10">
                {{ loggedIn ? 'Dashboard' : copy.nav.signIn }}
              </NuxtLink>
              <template #fallback>
                <NuxtLink to="/auth/login" class="block text-center px-4 py-3 rounded-xl text-sm font-medium bg-black/5 dark:bg-white/10">{{ copy.nav.signIn }}</NuxtLink>
              </template>
            </ClientOnly>
            <NuxtLink to="/portal/pricing" class="block text-center px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-white">{{ copy.nav.getCode }}</NuxtLink>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </header>
</template>
