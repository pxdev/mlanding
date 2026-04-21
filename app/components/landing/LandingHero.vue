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
        <LandingHeroProduct />

        <!-- ─── Floating overlay cards ─── -->

        <!-- TL: ZATCA signed invoice -->
        <LandingHeroFloatCard class="-top-10 -start-8 w-72" :rotation="-5">
          <div class="rounded-2xl bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
            <div class="px-3 py-2 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center gap-1.5">
              <UIcon name="i-lucide-shield-check" class="size-3.5 text-emerald-600" />
              <span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{{ copy.ui.mockZatcaCleared }}</span>
              <span class="ms-auto text-[9px] text-gray-400">a8f2…</span>
            </div>
            <div class="p-3 flex gap-3">
              <div class="flex-1 space-y-0.5 text-[10px]">
                <p class="font-bold">{{ copy.ui.mockInvoicePrefix }}INV-00128</p>
                <p class="text-gray-500">300012345600003</p>
                <p class="text-gray-500">{{ copy.ui.mockVat }} <span class="font-bold text-primary dark:text-white">65.00</span></p>
                <p class="text-gray-500">{{ copy.ui.mockTotal }} <span class="font-bold text-primary dark:text-white">500.00</span></p>
                <div class="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 text-[9px] font-bold">
                  <UIcon name="i-lucide-check" class="size-2.5" /> {{ copy.ui.mockSigned }}
                </div>
              </div>
              <!-- QR mock -->
              <div class="size-14 rounded grid grid-cols-6 grid-rows-6 gap-px bg-primary p-1 shrink-0">
                <div v-for="n in 36" :key="n" class="rounded-[1px]" :class="[0,2,4,5,7,10,12,15,17,18,20,22,25,27,29,31,33,35].includes(n) ? 'bg-white' : 'bg-primary'" />
              </div>
            </div>
          </div>
        </LandingHeroFloatCard>

        <!-- TR: AI assistant -->
        <LandingHeroFloatCard class="-top-6 -end-12 w-80" :rotation="4" :delay="-2">
          <div class="rounded-2xl bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/40 p-4">
            <div class="flex items-center gap-2 mb-3">
              <div class="size-8 rounded-xl bg-gradient-to-br from-secondary-500 via-secondary-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-secondary-500/40">
                <UIcon name="i-lucide-sparkles" class="size-4" />
              </div>
              <div>
                <p class="text-[11px] font-bold">{{ copy.hero.chips.ai.tag }}</p>
                <p class="text-[9px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span class="size-1 rounded-full bg-emerald-500 animate-pulse" />{{ copy.ui.mockAiActive }}
                </p>
              </div>
            </div>
            <div class="rounded-lg rounded-ss-sm bg-secondary-500/10 border border-secondary-500/20 p-2.5 text-[11px] leading-relaxed">
              <p>{{ copy.hero.chips.ai.msg }}. {{ copy.ui.mockAiDraft }}</p>
              <div class="mt-2 flex gap-1.5">
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-secondary-500 text-white font-semibold">{{ copy.ui.mockAiSendAll }}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-semibold">{{ copy.ui.mockAiReview }}</span>
              </div>
            </div>
          </div>
        </LandingHeroFloatCard>

        <!-- BL: Portal phone mini -->
        <LandingHeroFloatCard class="-bottom-8 -start-16" :rotation="-3" :delay="-4" hide-below="xl">
          <div class="w-40 aspect-[9/19] rounded-[1.5rem] p-1.5 bg-primary shadow-2xl shadow-black/30 border border-white/10">
            <div class="w-full h-full rounded-[1.2rem] bg-gradient-to-br from-white to-gray-50 dark:from-[#0c0c0c] dark:to-black overflow-hidden relative">
              <div class="absolute top-1.5 start-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-primary z-10" />
              <div class="pt-7 px-3 pb-3 h-full">
                <div class="flex items-center gap-1.5 mb-2">
                  <div class="size-4 rounded bg-gradient-to-br from-secondary-400 to-secondary-600" />
                  <span class="text-[8px] font-bold">{{ copy.portal.cardTag }}</span>
                </div>
                <div class="rounded-md bg-gradient-to-br from-secondary-500 to-secondary-700 text-white p-1.5 mb-1.5">
                  <p class="text-[7px] opacity-80">{{ copy.portal.loyalty }}</p>
                  <p class="text-xs font-black">1,240</p>
                  <div class="mt-0.5 h-0.5 rounded-full bg-white/20"><div class="h-full w-[62%] bg-white/80 rounded-full" /></div>
                </div>
                <div class="p-1.5 rounded-sm border border-black/5 dark:border-white/10 mb-1">
                  <p class="text-[7px] font-bold">{{ copy.portal.apptTitle }}</p>
                  <p class="text-[7px] text-gray-500">{{ copy.portal.apptMeta }}</p>
                </div>
                <div class="grid grid-cols-3 gap-0.5">
                  <div v-for="n in 3" :key="n" class="aspect-square rounded-sm bg-gray-100 dark:bg-white/5" />
                </div>
              </div>
            </div>
          </div>
        </LandingHeroFloatCard>

        <!-- BR: Revenue trend -->
        <LandingHeroFloatCard class="-bottom-6 -end-10 w-64" :rotation="3" :delay="-5">
          <div class="rounded-2xl bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/40 p-4">
            <div class="flex items-center justify-between mb-2">
              <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">{{ copy.ui.mockThisMonth }}</p>
              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold">
                <UIcon name="i-lucide-trending-up" class="size-2.5" />
                +24%
              </span>
            </div>
            <p class="text-2xl font-black tracking-tight">SAR <span class="bg-gradient-to-br from-secondary-500 to-secondary-700 bg-clip-text text-transparent">48,230</span></p>
            <p class="text-[10px] text-gray-500 mt-0.5">{{ copy.ui.mockNetRevenue }}</p>
            <!-- Mini sparkline -->
            <div class="mt-3 flex items-end gap-1 h-12">
              <div v-for="(b, i) in [38, 52, 46, 68, 58, 74, 66, 82, 76, 88, 92, 100]" :key="i"
                class="flex-1 rounded-sm bg-gradient-to-t from-secondary-500 to-secondary-300 relative"
                :style="{ height: `${b}%` }"
                :class="i === 11 ? 'ring-2 ring-secondary-500 ring-offset-1 dark:ring-offset-[#0c0c0c]' : ''"
              />
            </div>
          </div>
        </LandingHeroFloatCard>
      </div>
    </div>
  </section>
</template>
