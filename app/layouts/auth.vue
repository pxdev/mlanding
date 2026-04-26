<script setup lang="ts">
const localePath = useLocalePath()
const chrome = useChromeCopy()
const { currentLocale, otherLocale, toggleLocale } = useLandingLocale()
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-neutral-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
    <header class="px-5 sm:px-8 h-16 flex items-center">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 group">
        <div class="size-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">M</div>
        <span class="font-black text-lg tracking-tight">Momentfy</span>
      </NuxtLink>
      <div class="ms-auto flex items-center gap-1">
        <ClientOnly>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition"
            :aria-label="chrome.common.language"
            :title="otherLocale?.name"
            @click="toggleLocale"
          >
            <UIcon name="i-lucide-globe" class="size-4" />
            <span class="text-sm font-bold">{{ otherLocale?.name }}</span>
          </button>
          <template #fallback>
            <span class="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400">
              <UIcon name="i-lucide-globe" class="size-4" />
              <span class="text-sm font-bold">{{ currentLocale?.name }}</span>
            </span>
          </template>
        </ClientOnly>
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
