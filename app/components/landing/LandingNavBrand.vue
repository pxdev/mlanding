<script setup lang="ts">
withDefaults(defineProps<{
  to?: string
  hideTextBelow?: 'sm' | 'md' | 'lg'
}>(), {
  to: '/',
  hideTextBelow: undefined
})
</script>

<template>
  <NuxtLink :to="to" class="flex items-center gap-2 shrink-0 group" aria-label="Momentfy — Home">
    <div class="size-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
      M
    </div>
    <span
      class="font-black text-lg tracking-tight text-primary dark:text-white"
      :class="{
        'hidden sm:inline': hideTextBelow === 'sm',
        'hidden md:inline': hideTextBelow === 'md',
        'hidden lg:inline': hideTextBelow === 'lg'
      }"
    >
      Momentfy
    </span>
  </NuxtLink>
</template>
