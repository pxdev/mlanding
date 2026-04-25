<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const copy = useLandingCopy()

useLandingSeo({
  ar: {
    title: 'العملاء — Momentfy',
    description: 'قصص حقيقية من مشغّلين يديرون أعمالهم على Momentfy: صالونات، عيادات، استوديوهات تصوير، صالات لياقة، ومراكز عناية بالحيوانات — بأرقام موثّقة وأسماء كاملة.'
  },
  en: {
    title: 'Customers — Momentfy',
    description: 'Real stories from operators running their businesses on Momentfy: spas, clinics, photo studios, gyms, and pet-care centres — with verified metrics and named teams.'
  }
})

type Accent = 'rose' | 'sky' | 'violet' | 'emerald' | 'amber' | 'stone' | 'blue'
const accentMap: Record<Accent, { bar: string; pill: string; ring: string; metric: string }> = {
  rose:    { bar: 'bg-gradient-to-r from-rose-500 to-pink-500',         pill: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 ring-rose-500/20',          ring: 'ring-rose-500/30',         metric: 'text-rose-600 dark:text-rose-400' },
  sky:     { bar: 'bg-gradient-to-r from-sky-500 to-blue-600',          pill: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-500/20',             ring: 'ring-sky-500/30',          metric: 'text-sky-600 dark:text-sky-400' },
  violet:  { bar: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',    pill: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-violet-500/20', ring: 'ring-violet-500/30',       metric: 'text-violet-600 dark:text-violet-400' },
  emerald: { bar: 'bg-gradient-to-r from-emerald-500 to-teal-600',      pill: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20', ring: 'ring-emerald-500/30',  metric: 'text-emerald-600 dark:text-emerald-400' },
  amber:   { bar: 'bg-gradient-to-r from-amber-500 to-orange-500',      pill: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',     ring: 'ring-amber-500/30',        metric: 'text-amber-600 dark:text-amber-400' },
  stone:   { bar: 'bg-gradient-to-r from-stone-500 to-neutral-700',     pill: 'bg-stone-500/10 text-stone-700 dark:text-stone-400 ring-stone-500/20',     ring: 'ring-stone-500/30',        metric: 'text-stone-700 dark:text-stone-300' },
  blue:    { bar: 'bg-gradient-to-r from-blue-500 to-indigo-600',       pill: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-blue-500/20',         ring: 'ring-blue-500/30',         metric: 'text-blue-600 dark:text-blue-400' }
}
const accent = (k: string) => accentMap[(k as Accent)] ?? accentMap.sky

const all = computed(() => [copy.value.testimonials.featured, ...copy.value.testimonials.items])
</script>

<template>
  <LandingPageHero
    :crumb-label="copy.customersPage.eyebrow"
    :headline="copy.customersPage.h1"
    :sub="copy.customersPage.sub"
  >
    <template #background>
      <div class="absolute top-0 start-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-secondary-500 blur-[150px] opacity-[0.1] rounded-full" />
    </template>
  </LandingPageHero>

  <!-- ─── Featured (large) ─── -->
  <section class="pb-12">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <article
        class="relative grid grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-black/40"
      >
        <div aria-hidden="true" class="col-span-12 h-1" :class="accent(copy.testimonials.featured.verticalAccent).bar" />

        <div class="col-span-12 lg:col-span-4 p-7 sm:p-10 border-b lg:border-b-0 lg:border-e border-black/10 dark:border-white/10 flex flex-col justify-between gap-8 bg-gradient-to-br from-black/[0.015] to-transparent dark:from-white/[0.02]">
          <div>
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ring-1 text-[11px] uppercase tracking-[0.18em] font-bold"
              :class="accent(copy.testimonials.featured.verticalAccent).pill"
            >
              <UIcon name="i-lucide-sparkles" class="size-3" />
              {{ copy.testimonials.featured.vertical }}
            </span>
            <div class="mt-8">
              <p class="text-7xl sm:text-8xl font-black tracking-tight leading-none tabular-nums" :class="accent(copy.testimonials.featured.verticalAccent).metric">
                {{ copy.testimonials.featured.metric }}
              </p>
              <p class="mt-3 text-xs sm:text-sm uppercase tracking-[0.18em] font-bold text-gray-500 dark:text-gray-400">
                {{ copy.testimonials.featured.metricLabel }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 pt-6 border-t border-black/10 dark:border-white/10">
            <img
              :src="copy.testimonials.featured.avatar"
              :alt="copy.testimonials.featured.name"
              class="size-14 rounded-full ring-2 ring-white dark:ring-black shadow-md"
              :class="accent(copy.testimonials.featured.verticalAccent).ring"
              loading="lazy" width="56" height="56"
            >
            <div class="min-w-0">
              <p class="text-sm sm:text-base font-bold tracking-tight truncate">{{ copy.testimonials.featured.name }}</p>
              <p class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">{{ copy.testimonials.featured.role }} · {{ copy.testimonials.featured.business }}</p>
              <p class="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-gray-400 truncate">{{ copy.testimonials.featured.location }}</p>
            </div>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-8 p-7 sm:p-10 lg:p-14 flex flex-col justify-between gap-8">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-0.5">
              <UIcon v-for="n in copy.testimonials.featured.stars" :key="n" name="i-lucide-star" class="size-4 text-amber-500 fill-amber-500" />
            </div>
            <span class="text-[10px] uppercase tracking-[0.18em] font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
              <UIcon name="i-lucide-shield-check" class="size-3.5" />
              {{ copy.customersPage.verifiedLabel }}
            </span>
          </div>
          <blockquote class="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.25] text-primary dark:text-white">
            {{ copy.testimonials.featured.quote }}
          </blockquote>
          <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <UIcon name="i-lucide-server" class="size-3.5" />
            {{ copy.testimonials.featured.since }}
          </p>
        </div>
      </article>
    </div>
  </section>

  <!-- ─── All testimonials grid (featured first, then the rest) ─── -->
  <section class="pb-20">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <h2 class="text-xs uppercase tracking-[0.25em] text-gray-400 mb-6 font-bold">
        {{ copy.customersPage.viewAllLabel }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="(t, i) in copy.testimonials.items"
          :key="t.business"
          class="group flex flex-col rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div aria-hidden="true" class="h-0.5" :class="accent(t.verticalAccent).bar" />
          <div class="flex-1 p-6 sm:p-7 flex flex-col gap-5">
            <div class="flex items-start gap-3">
              <img :src="t.avatar" :alt="t.name" class="size-11 rounded-full ring-2 ring-white dark:ring-black shadow-sm shrink-0" :class="accent(t.verticalAccent).ring" loading="lazy" width="44" height="44">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-bold tracking-tight truncate">{{ t.name }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ t.role }} · {{ t.business }}</p>
                <p class="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-gray-400 truncate">{{ t.location }}</p>
              </div>
              <span class="text-[10px] tabular-nums text-gray-300 dark:text-gray-600 font-mono shrink-0">0{{ i + 2 }}</span>
            </div>
            <div class="flex items-center gap-0.5">
              <UIcon v-for="n in t.stars" :key="n" name="i-lucide-star" class="size-3.5 text-amber-500 fill-amber-500" />
            </div>
            <blockquote class="text-[15px] sm:text-base leading-relaxed text-gray-700 dark:text-gray-200 flex-1">
              "{{ t.quote }}"
            </blockquote>
            <div class="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ring-1 text-[10px] uppercase tracking-[0.18em] font-bold" :class="accent(t.verticalAccent).pill">
                {{ t.vertical }}
              </span>
              <UIcon name="i-lucide-quote" class="size-4 text-gray-300 dark:text-gray-700 group-hover:text-secondary-500 transition-colors" />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ─── Founding operator offer ─── -->
  <section class="pb-24">
    <div class="max-w-5xl mx-auto px-5 sm:px-8">
      <div class="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-secondary-500/5 via-white to-primary/5 dark:from-secondary-500/10 dark:via-black/40 dark:to-primary/10 p-8 sm:p-12">
        <div aria-hidden="true" class="absolute -top-20 -end-20 w-72 h-72 rounded-full bg-secondary-500 blur-[120px] opacity-15 pointer-events-none" />
        <p class="text-[11px] uppercase tracking-[0.2em] font-bold text-secondary-600 dark:text-secondary-400">
          {{ copy.customersPage.founding.eyebrow }}
        </p>
        <h2 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] max-w-3xl">
          {{ copy.customersPage.founding.heading }}
        </h2>
        <p class="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
          {{ copy.customersPage.founding.sub }}
        </p>
        <ul class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <li v-for="perk in copy.customersPage.founding.perks" :key="perk" class="flex items-start gap-2.5 text-sm">
            <UIcon name="i-lucide-check-circle-2" class="size-5 shrink-0 text-emerald-500 mt-0.5" />
            <span class="text-gray-700 dark:text-gray-200 leading-snug">{{ perk }}</span>
          </li>
        </ul>
        <div class="mt-10">
          <UButton
            :to="copy.customersPage.founding.ctaHref"
            color="primary"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            :ui="{ trailingIcon: 'rtl:rotate-180' }"
          >
            {{ copy.customersPage.founding.ctaLabel }}
          </UButton>
        </div>
      </div>
    </div>
  </section>

  <LandingCTA />
</template>
