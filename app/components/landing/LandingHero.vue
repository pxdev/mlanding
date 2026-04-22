<script setup lang="ts">
// Hero section orchestrator.
// Composes: background → headline block → product mock → four floating overlay cards.
const copy = useLandingCopy()
const demoUrl = useRuntimeConfig().public.demoUrl
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <LandingHeroBackground />

    <div class="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
      <!-- ─── Eyebrow chip ─── -->
      <div class="flex justify-center mb-8">
        <NuxtLink
          to="/portal/features"
          class="group inline-flex items-center gap-2 ps-1 pe-3 py-1 rounded-full bg-white/80 dark:bg-white/[0.06] backdrop-blur border border-secondary-500/20 dark:border-secondary-400/20 text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm shadow-secondary-500/10 hover:scale-[1.02] transition-transform"
        >
          <span class="inline-flex items-center justify-center h-6 px-2 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-700 text-white text-[10px] font-black tracking-wide">v1.0</span>
          <span>{{ copy.hero.badge }}</span>
          <UIcon name="i-lucide-arrow-right" class="size-3 opacity-60 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 transition-transform" />
        </NuxtLink>
      </div>

      <!-- ─── Headline ─── -->
      <h1 class="text-center font-black tracking-tight text-5xl sm:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-5xl mx-auto text-primary dark:text-white">
        {{ copy.hero.h1a }}
        <span class="relative inline-block align-baseline">
          <span aria-hidden="true" class="absolute inset-x-[-0.3em] -inset-y-1 rounded-[1.5rem] bg-gradient-to-br from-secondary-500/10 via-secondary-400/5 to-sky-300/10 dark:from-secondary-400/15 dark:via-secondary-300/5 dark:to-sky-500/10 -rotate-1" />
          <span class="relative z-10 bg-gradient-to-br from-secondary-600 via-secondary-500 to-sky-500 dark:from-secondary-300 dark:via-secondary-400 dark:to-sky-400 bg-clip-text text-transparent">{{ copy.hero.highlight }}</span>
          <svg class="absolute -bottom-3 inset-x-0 w-full h-3" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
            <path d="M3 9 C 70 3, 160 14, 297 5" stroke="url(#hero-underline)" stroke-width="4" stroke-linecap="round" fill="none" />
            <defs>
              <linearGradient id="hero-underline" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="var(--color-secondary-500)" stop-opacity="0.9" />
                <stop offset="100%" stop-color="var(--color-secondary-400)" stop-opacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <br class="hidden sm:block" />
        {{ copy.hero.h1b }}
      </h1>

      <p class="mt-8 text-center text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {{ copy.hero.sub }}
        <span class="font-semibold text-primary dark:text-white">{{ copy.hero.subStrong }}</span>
      </p>

      <!-- ─── CTAs ─── -->
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <NuxtLink
          to="/portal/pricing"
          class="group inline-flex items-center gap-2 px-7 h-14 rounded-full text-base font-semibold bg-primary text-white shadow-xl shadow-primary/30 hover:shadow-secondary-500/40 hover:scale-[1.02] transition-all relative overflow-hidden"
        >
          <span aria-hidden="true" class="absolute inset-0 bg-gradient-to-r from-primary via-secondary-900 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <UIcon name="i-lucide-shopping-bag" class="size-4 relative" />
          <span class="relative">{{ copy.hero.primary }}</span>
          <UIcon name="i-lucide-arrow-right" class="size-4 relative group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 transition-transform" />
        </NuxtLink>
        <a
          :href="demoUrl"
          target="_blank"
          rel="noopener"
          class="group inline-flex items-center gap-2 px-7 h-14 rounded-full text-base font-semibold bg-white/80 dark:bg-white/[0.04] backdrop-blur text-primary dark:text-white border border-black/10 dark:border-white/15 hover:bg-white dark:hover:bg-white/[0.08] transition"
        >
          <UIcon name="i-lucide-play-circle" class="size-4 text-secondary-500" />
          <span>{{ copy.hero.secondary }}</span>
          <UIcon name="i-lucide-arrow-up-right" class="size-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <!-- ─── Trust bar ─── -->
      <div class="mt-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-500">
        <span v-for="t in copy.hero.trust" :key="t" class="inline-flex items-center gap-1.5">
          <UIcon name="i-lucide-check-circle-2" class="size-3.5 text-emerald-500" />
          {{ t }}
        </span>
      </div>

      <!-- ═══════════ Hero stage — product mock + floating cards ═══════════ -->
      <div class="mt-20 relative mx-auto max-w-6xl lg:px-16">
        <!-- Stage glow below -->
        <div aria-hidden="true" class="absolute inset-x-12 -bottom-10 h-24 bg-secondary-500 blur-3xl opacity-30 dark:opacity-40 rounded-[50%]" />
        <!-- Gradient frame around the product -->
        <div aria-hidden="true" class="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-secondary-400/40 via-secondary-500/20 to-sky-400/30 dark:from-secondary-400/50 dark:via-secondary-500/25 dark:to-sky-500/30 blur-xl opacity-80" />

        <!-- Main product mock -->
        <LandingHeroProduct src="/videos/general-1.mov" aspect-ratio="3454 / 1802" />
      </div>
    </div>
  </section>
</template>
