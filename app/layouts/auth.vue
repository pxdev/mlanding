<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const chrome = useChromeCopy()
const { localeItems, currentLocale } = useLandingLocale()
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-neutral-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
    <header class="px-5 sm:px-8 h-16 flex items-center">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="size-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">M</div>
        <span class="font-black text-lg tracking-tight">Momentfy</span>
      </NuxtLink>
      <div class="ms-auto flex items-center gap-1">
        <ClientOnly>
          <UDropdownMenu :items="localeItems" :ui="{ content: 'w-40' }">
            <button
              class="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition"
              :aria-label="chrome.common.language"
            >
              <UIcon name="i-lucide-languages" class="size-4" />
              <span class="uppercase tracking-wider text-[11px] font-bold">{{ currentLocale?.code }}</span>
              <UIcon name="i-lucide-chevron-down" class="size-3 opacity-50" />
            </button>
          </UDropdownMenu>
          <template #fallback>
            <span class="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400">
              <UIcon name="i-lucide-languages" class="size-4" />
              <span class="uppercase tracking-wider text-[11px] font-bold">{{ currentLocale?.code }}</span>
            </span>
          </template>
        </ClientOnly>
        <button
          class="size-9 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition"
          :aria-label="isDark ? chrome.common.switchToLight : chrome.common.switchToDark"
          @click="colorMode.preference = isDark ? 'light' : 'dark'"
        >
          <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
        </button>
      </div>
    </header>
    <main class="flex-1 grid place-items-center px-5 py-10">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </main>
    <footer class="py-6 text-center text-xs text-gray-500 dark:text-gray-500">
      © Momentfy
    </footer>
  </div>
</template>
