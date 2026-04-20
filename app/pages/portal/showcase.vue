<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const copy = useLandingCopy()
const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'ar' ? 'القطاعات — Momentfy' : 'Showcase — Momentfy',
  meta: [{
    name: 'description',
    content: locale.value === 'ar'
      ? 'منصة واحدة لكل التخصصات. صالونات، سبا، عيادات أسنان وطبية، حلاقة، لياقة، بيطرة واستوديوهات تصوير.'
      : 'One platform, every vertical. Salons, spas, dental and medical clinics, barbers, gyms, pet care and photo studios.'
  }]
}))

const visuals: Record<string, { icon: string; accent: string; mockId: string; dot: string }> = {
  salon:   { icon: 'i-lucide-scissors',      accent: 'from-pink-500 to-rose-600',    mockId: 'calendar', dot: 'bg-rose-500' },
  dental:  { icon: 'i-hugeicons-dental-tooth',         accent: 'from-sky-500 to-blue-600',     mockId: 'dental',   dot: 'bg-sky-500' },
  medical: { icon: 'i-lucide-heart-pulse',   accent: 'from-red-500 to-orange-500',   mockId: 'medical',  dot: 'bg-red-500' },
  barber:  { icon: 'i-lucide-user',          accent: 'from-stone-500 to-neutral-700',mockId: 'barber',   dot: 'bg-stone-500' },
  fitness: { icon: 'i-lucide-dumbbell',      accent: 'from-lime-500 to-emerald-600', mockId: 'fitness',  dot: 'bg-emerald-500' },
  pet:     { icon: 'i-lucide-paw-print',     accent: 'from-amber-500 to-yellow-600', mockId: 'pet',      dot: 'bg-amber-500' }
}
</script>

<template>
  <!-- ═══ Hero ═══ -->
  <section class="relative py-20 sm:py-28 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-0 -z-10">
      <div class="absolute top-0 start-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-secondary-500 blur-[150px] opacity-[0.12] rounded-full" />
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.showcasePage.eyebrow }}</p>
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-500 max-w-[16rem]">{{ copy.showcasePage.sub }}</p>

          <!-- Quick nav -->
          <div class="mt-6 space-y-2 text-xs">
            <a v-for="(v, vi) in copy.showcasePage.verticals" :key="v.id" :href="`#${v.id}`"
              class="group flex items-center gap-2 text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
            >
              <span class="size-1.5 rounded-full" :class="visuals[v.id].dot" />
              <span class="uppercase tracking-[0.2em]">{{ String(vi + 1).padStart(2, '0') }} · {{ v.title }}</span>
            </a>
          </div>

          <!-- Illustrative caveat for the per-vertical stats -->
          <div class="mt-6 flex items-start gap-2 text-[11px] text-gray-500 dark:text-gray-500 leading-relaxed">
            <UIcon name="i-lucide-info" class="size-3.5 shrink-0 mt-0.5 text-amber-500" />
            <span>{{ copy.showcasePage.statsNote }}</span>
          </div>
        </div>
        <div class="col-span-12 sm:col-span-8 lg:col-span-9">
          <h1 class="font-black tracking-tight leading-[0.9] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            <span class="block">{{ copy.showcasePage.h1a }}</span>
            <span class="block italic text-black/20 dark:text-white/20">{{ copy.showcasePage.h1b }}</span>
          </h1>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ Vertical list ═══ -->
  <section class="py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 border-t border-black/10 dark:border-white/10">
      <article
        v-for="(v, i) in copy.showcasePage.verticals" :key="v.id" :id="v.id"
        class="group relative grid grid-cols-12 gap-6 lg:gap-12 py-14 sm:py-20 border-b border-black/10 dark:border-white/10"
      >
        <!-- Content side (flips on odd rows for magazine feel) -->
        <div class="col-span-12 lg:col-span-7 flex flex-col" :class="i % 2 === 1 ? 'lg:order-2' : ''">
          <div class="flex items-baseline gap-3 mb-6">
            <span class="text-xs tabular-nums text-gray-400">{{ String(i + 1).padStart(2, '0') }}</span>
            <span aria-hidden="true" class="h-px w-6 bg-black/20 dark:bg-white/20" />
            <span class="text-xs uppercase tracking-[0.2em] text-gray-500 inline-flex items-center gap-1.5">
              <span class="size-1.5 rounded-full" :class="visuals[v.id].dot" />
              {{ v.title }}
            </span>
          </div>

          <!-- Small gradient icon tile -->
          <div class="size-12 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center shadow-lg mb-6 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-[6deg]" :class="visuals[v.id].accent">
            <UIcon :name="visuals[v.id].icon" class="size-5" />
          </div>

          <!-- Big hero -->
          <h2 class="font-black tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl max-w-xl">{{ v.hero }}</h2>

          <!-- Stats row, inline, no cards. Values are industry-benchmark illustrative -->
          <div class="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
            <div class="flex items-center gap-2 mb-4">
              <UIcon name="i-lucide-info" class="size-3.5 text-amber-500" />
              <span class="text-[10px] uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 font-bold">{{ copy.ui.illustrativeBenchmarks }}</span>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div v-for="s in v.stats" :key="s.k">
                <p class="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-br bg-clip-text text-transparent leading-none" :class="visuals[v.id].accent">{{ s.v }}</p>
                <p class="mt-2 text-[10px] uppercase tracking-[0.2em] text-gray-500">{{ s.k }}</p>
              </div>
            </div>
          </div>

          <!-- Ships-with chips -->
          <div class="mt-8">
            <p class="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-3">{{ copy.showcasePage.shipsWith }}</p>
            <div class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <template v-for="(m, mi) in v.setup" :key="m">
                <span class="inline-flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                  <span class="size-1 rounded-full" :class="visuals[v.id].dot" />
                  {{ m }}
                </span>
                <span v-if="mi < v.setup.length - 1" aria-hidden="true" class="text-gray-300 dark:text-gray-700">·</span>
              </template>
            </div>
          </div>

          <!-- CTAs -->
          <div class="mt-10 flex flex-wrap gap-6 items-center">
            <NuxtLink to="/portal/features" class="group/cta inline-flex items-center gap-3 text-sm font-bold">
              <span class="size-10 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover/cta:scale-110">
                <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
              </span>
              <span class="relative">
                {{ copy.showcasePage.cta1 }}
                <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover/cta:bg-secondary-500 transition-colors" />
              </span>
            </NuxtLink>
            <NuxtLink to="/portal/addons" class="text-sm text-gray-500 hover:text-primary dark:hover:text-white transition-colors inline-flex items-center gap-1.5">
              {{ copy.showcasePage.cta2 }}
              <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Visual side: mock in soft frame -->
        <div class="col-span-12 lg:col-span-5 relative" :class="i % 2 === 1 ? 'lg:order-1' : ''">
          <div class="relative rounded-2xl bg-gray-50 dark:bg-white/[0.025] overflow-hidden">
            <div aria-hidden="true" class="h-0.5 bg-gradient-to-r opacity-80" :class="visuals[v.id].accent" />
            <div class="p-5 sm:p-6">
              <LandingModuleMock :id="visuals[v.id].mockId" :color="visuals[v.id].accent" />
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>

  <LandingCTA />
</template>
