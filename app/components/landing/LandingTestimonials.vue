<script setup lang="ts">
const copy = useLandingCopy()

// Map per-vertical accent strings (used in JSON) → concrete Tailwind class
// fragments. Done explicitly because Tailwind's JIT can't infer classes from
// dynamic template strings.
type Accent = 'rose' | 'sky' | 'violet' | 'emerald' | 'amber' | 'stone' | 'blue'
const accentMap: Record<Accent, {
  bar: string
  pill: string
  metric: string
  ring: string
  glow: string
}> = {
  rose:    { bar: 'bg-gradient-to-r from-rose-500 to-pink-500',         pill: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 ring-rose-500/20',          metric: 'text-rose-600 dark:text-rose-400',         ring: 'ring-rose-500/30',         glow: 'bg-rose-500' },
  sky:     { bar: 'bg-gradient-to-r from-sky-500 to-blue-600',          pill: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-500/20',             metric: 'text-sky-600 dark:text-sky-400',           ring: 'ring-sky-500/30',          glow: 'bg-sky-500' },
  violet:  { bar: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',    pill: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-violet-500/20', metric: 'text-violet-600 dark:text-violet-400',     ring: 'ring-violet-500/30',       glow: 'bg-violet-500' },
  emerald: { bar: 'bg-gradient-to-r from-emerald-500 to-teal-600',      pill: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20', metric: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-500/30',      glow: 'bg-emerald-500' },
  amber:   { bar: 'bg-gradient-to-r from-amber-500 to-orange-500',      pill: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',     metric: 'text-amber-600 dark:text-amber-400',       ring: 'ring-amber-500/30',        glow: 'bg-amber-500' },
  stone:   { bar: 'bg-gradient-to-r from-stone-500 to-neutral-700',     pill: 'bg-stone-500/10 text-stone-700 dark:text-stone-400 ring-stone-500/20',     metric: 'text-stone-700 dark:text-stone-300',       ring: 'ring-stone-500/30',        glow: 'bg-stone-500' },
  blue:    { bar: 'bg-gradient-to-r from-blue-500 to-indigo-600',       pill: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-blue-500/20',         metric: 'text-blue-600 dark:text-blue-400',         ring: 'ring-blue-500/30',         glow: 'bg-blue-500' }
}
const accent = (key: string) => accentMap[(key as Accent)] ?? accentMap.sky
</script>

<template>
  <section class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Hairline top divider -->
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />
    <!-- Soft background blob, accent of the featured testimonial -->
    <div
      aria-hidden="true"
      class="absolute -top-32 end-[-12rem] w-[32rem] h-[32rem] rounded-full blur-[140px] opacity-[0.08]"
      :class="accent(copy.testimonials.featured.verticalAccent).glow"
    />

    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <!-- ─── Header ─── -->
      <LandingSectionHeading
        number="8"
        :label="copy.testimonials.eyebrow"
        :heading="copy.testimonials.heading"
      />
      <p class="mt-6 max-w-2xl text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
        {{ copy.testimonials.sub }}
      </p>

      <!-- ─── Featured testimonial ─── -->
      <article
        class="mt-14 relative grid grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
      >
        <!-- Top accent bar -->
        <div
          aria-hidden="true"
          class="col-span-12 h-1"
          :class="accent(copy.testimonials.featured.verticalAccent).bar"
        />

        <!-- Left rail: identity + metric -->
        <div
          class="col-span-12 lg:col-span-4 p-7 sm:p-10 border-b lg:border-b-0 lg:border-e border-black/10 dark:border-white/10 flex flex-col justify-between gap-8 bg-gradient-to-br from-black/[0.015] to-transparent dark:from-white/[0.02]"
        >
          <div>
            <!-- Vertical pill -->
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ring-1 text-[11px] uppercase tracking-[0.18em] font-bold"
              :class="accent(copy.testimonials.featured.verticalAccent).pill"
            >
              <UIcon name="i-lucide-sparkles" class="size-3" />
              {{ copy.testimonials.featured.vertical }}
            </span>

            <!-- Big metric -->
            <div class="mt-8">
              <p class="text-7xl sm:text-8xl font-black tracking-tight leading-none tabular-nums" :class="accent(copy.testimonials.featured.verticalAccent).metric">
                {{ copy.testimonials.featured.metric }}
              </p>
              <p class="mt-3 text-xs sm:text-sm uppercase tracking-[0.18em] font-bold text-gray-500 dark:text-gray-400">
                {{ copy.testimonials.featured.metricLabel }}
              </p>
            </div>
          </div>

          <!-- Person card -->
          <div class="flex items-center gap-4 pt-6 border-t border-black/10 dark:border-white/10">
            <img
              :src="copy.testimonials.featured.avatar"
              :alt="copy.testimonials.featured.name"
              class="size-14 rounded-full ring-2 ring-white dark:ring-black shadow-md"
              :class="accent(copy.testimonials.featured.verticalAccent).ring"
              loading="lazy"
              width="56"
              height="56"
            >
            <div class="min-w-0">
              <p class="text-sm sm:text-base font-bold tracking-tight truncate">
                {{ copy.testimonials.featured.name }}
              </p>
              <p class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                {{ copy.testimonials.featured.role }} · {{ copy.testimonials.featured.business }}
              </p>
              <p class="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-gray-400 truncate">
                {{ copy.testimonials.featured.location }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: pull quote -->
        <div class="col-span-12 lg:col-span-8 p-7 sm:p-10 lg:p-14 flex flex-col justify-between gap-8">
          <!-- Stars + verified -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-0.5" :aria-label="`${copy.testimonials.featured.stars} / 5`">
              <UIcon
                v-for="n in copy.testimonials.featured.stars"
                :key="n"
                name="i-lucide-star"
                class="size-4 text-amber-500 fill-amber-500"
              />
            </div>
            <span class="text-[10px] uppercase tracking-[0.18em] font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
              <UIcon name="i-lucide-shield-check" class="size-3.5" />
              {{ copy.testimonials.starsLabel }}
            </span>
          </div>

          <!-- Quote -->
          <blockquote class="relative">
            <UIcon
              name="i-lucide-quote"
              aria-hidden="true"
              class="absolute -top-3 -start-2 size-12 text-black/[0.07] dark:text-white/[0.08] -z-10"
            />
            <p class="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.25] text-primary dark:text-white">
              {{ copy.testimonials.featured.quote }}
            </p>
          </blockquote>

          <!-- Footer meta -->
          <div class="flex items-center justify-between gap-4 pt-6 border-t border-black/10 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
            <p class="flex items-center gap-2">
              <UIcon name="i-lucide-server" class="size-3.5" />
              {{ copy.testimonials.featured.since }}
            </p>
            <p class="hidden sm:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em]">
              <span aria-hidden="true" class="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </p>
          </div>
        </div>
      </article>

      <!-- ─── Grid of secondary testimonials ─── -->
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="(t, i) in copy.testimonials.items"
          :key="t.business"
          class="group relative flex flex-col rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-black/20 dark:hover:border-white/20"
        >
          <!-- Accent bar -->
          <div aria-hidden="true" class="h-0.5" :class="accent(t.verticalAccent).bar" />

          <div class="flex-1 p-6 sm:p-7 flex flex-col gap-5">
            <!-- Top row: avatar + identity + index -->
            <div class="flex items-start gap-3">
              <img
                :src="t.avatar"
                :alt="t.name"
                class="size-11 rounded-full ring-2 ring-white dark:ring-black shadow-sm shrink-0"
                :class="accent(t.verticalAccent).ring"
                loading="lazy"
                width="44"
                height="44"
              >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-bold tracking-tight truncate">
                  {{ t.name }}
                </p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {{ t.role }} · {{ t.business }}
                </p>
                <p class="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-gray-400 truncate">
                  {{ t.location }}
                </p>
              </div>
              <span class="text-[10px] tabular-nums text-gray-300 dark:text-gray-600 font-mono shrink-0">
                0{{ i + 2 }}
              </span>
            </div>

            <!-- Stars -->
            <div class="flex items-center gap-0.5" :aria-label="`${t.stars} / 5`">
              <UIcon
                v-for="n in t.stars"
                :key="n"
                name="i-lucide-star"
                class="size-3.5 text-amber-500 fill-amber-500"
              />
            </div>

            <!-- Quote -->
            <blockquote class="text-[15px] sm:text-base leading-relaxed text-gray-700 dark:text-gray-200 flex-1">
              "{{ t.quote }}"
            </blockquote>

            <!-- Footer pill -->
            <div class="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <span
                class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ring-1 text-[10px] uppercase tracking-[0.18em] font-bold"
                :class="accent(t.verticalAccent).pill"
              >
                {{ t.vertical }}
              </span>
              <UIcon
                name="i-lucide-quote"
                aria-hidden="true"
                class="size-4 text-gray-300 dark:text-gray-700 group-hover:text-secondary-500 transition-colors"
              />
            </div>
          </div>
        </article>
      </div>

      <!-- ─── CTA: read all case studies ─── -->
      <div class="mt-12 text-center">
        <NuxtLink
          :to="copy.testimonials.ctaCasesHref"
          class="inline-flex items-center gap-2 text-sm font-bold tracking-tight text-primary dark:text-white hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors group"
        >
          <span class="border-b-2 border-secondary-500/40 group-hover:border-secondary-500 pb-0.5 transition-colors">
            {{ copy.testimonials.ctaCases }}
          </span>
          <UIcon
            name="i-lucide-arrow-right"
            class="size-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
