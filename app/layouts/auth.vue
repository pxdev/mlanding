<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-neutral-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
    <header class="px-5 sm:px-8 h-16 flex items-center">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="size-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">M</div>
        <span class="font-black text-lg tracking-tight">Momentfy</span>
      </NuxtLink>
      <div class="ms-auto flex items-center gap-2">
        <button
          class="size-9 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition"
          :aria-label="isDark ? 'Light mode' : 'Dark mode'"
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
