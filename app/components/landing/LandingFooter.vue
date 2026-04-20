<script setup lang="ts">
const copy = useLandingCopy()
const year = new Date().getFullYear()
const bottomText = computed(() => copy.value.footer.bottom.replace('{year}', String(year)))

// Separate Solutions (index 1) from the rest — it gets a wider 2-column treatment
// while the other columns stay tight.
const solutionsCol = computed(() => copy.value.footer.columns[1])
const otherCols = computed(() => copy.value.footer.columns.filter((_, i) => i !== 1))

// Solution labels for the top ticker — doubled so the marquee loops seamlessly.
const tickerItems = computed(() => {
  const labels = (solutionsCol.value?.links || []).map(l => l.label)
  return [...labels, ...labels]
})

function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="relative mt-24 bg-white dark:bg-black">

    <!-- ═══ 01 · Top ribbon — scrolling sweep of every solution we cover ═══ -->
    <div class="group relative border-y border-black/10 dark:border-white/10 overflow-hidden bg-gray-50/60 dark:bg-white/[0.015]">
      <div aria-hidden="true" class="absolute inset-y-0 start-0 w-24 bg-gradient-to-e from-white dark:from-black to-transparent z-10 pointer-events-none" />
      <div aria-hidden="true" class="absolute inset-y-0 end-0 w-24 bg-gradient-to-w from-white dark:from-black to-transparent z-10 pointer-events-none" />

      <div class="flex whitespace-nowrap py-3 sm:py-4 animate-marquee-slow group-hover:[animation-play-state:paused]">
        <NuxtLink
          v-for="(label, i) in tickerItems" :key="`${label}-${i}`"
          :to="solutionsCol?.links[i % solutionsCol.links.length]?.to || '/portal/solutions'"
          class="inline-flex items-center gap-4 px-5 text-xs uppercase tracking-[0.28em] text-gray-500 hover:text-primary dark:hover:text-white transition-colors shrink-0"
        >
          <span aria-hidden="true" class="size-1 rounded-full bg-gray-300 dark:bg-white/20" />
          {{ label }}
        </NuxtLink>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8">

      <!-- ═══ 02 · Spine — brand block + tagline + status + CTAs ═══ -->
      <div class="grid grid-cols-12 gap-6 lg:gap-10 pt-16 sm:pt-20 pb-12">

        <!-- Left: chapter number + wordmark -->
        <div class="col-span-12 lg:col-span-3 flex items-start gap-5">
          <span aria-hidden="true" class="text-5xl sm:text-6xl font-black tracking-tighter leading-[0.8] text-black/[0.07] dark:text-white/[0.08] select-none tabular-nums">
            00
          </span>
          <div>
            <div class="flex items-center gap-2.5">
              <div class="size-9 rounded-xl bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center font-black text-lg">M</div>
              <span class="text-xl font-black tracking-tight">Momentfy</span>
            </div>
            <p class="mt-1 text-[10px] uppercase tracking-[0.28em] text-gray-400">
              v1.0 · {{ year }}
            </p>
          </div>
        </div>

        <!-- Middle: tagline -->
        <div class="col-span-12 lg:col-span-6">
          <p class="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light max-w-2xl">
            <span class="font-black tracking-tight text-gray-900 dark:text-white">{{ copy.footer.tag.split('.')[0] }}.</span>
            <span class="text-gray-500 dark:text-gray-500">{{ copy.footer.tag.split('.').slice(1).join('.').trim() }}</span>
          </p>
        </div>

        <!-- Right: status + CTA -->
        <div class="col-span-12 lg:col-span-3 flex flex-col gap-4 lg:items-end">
          <span class="inline-flex items-center gap-2 px-3 h-7 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase tracking-[0.25em] font-black">
            <span class="relative flex size-1.5">
              <span class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              <span class="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            {{ copy.footer.badge }}
          </span>
          <NuxtLink to="/portal/pricing" class="group inline-flex items-center gap-3 text-sm font-bold">
            <span class="size-10 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
            </span>
            <span class="relative">
              {{ copy.nav.getCode }}
              <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover:bg-secondary-500 transition-colors" />
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- ═══ 03 · Link grid — chapter-style columns with hairline dividers ═══ -->
      <div class="border-t border-black/10 dark:border-white/10 pt-12 pb-14">
        <div class="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-10">

          <!-- Solutions gets a double-width slot with its own 2-col item layout -->
          <div class="col-span-2 md:col-span-2 md:pe-8 md:border-e md:border-black/10 md:dark:border-white/10 rtl:md:border-e-0 rtl:md:border-s rtl:md:ps-8 rtl:md:pe-0">
            <div class="mb-6 flex items-baseline gap-3">
              <span aria-hidden="true" class="text-4xl font-black tracking-tighter leading-none text-black/[0.08] dark:text-white/[0.08] tabular-nums select-none">02</span>
              <h3 class="text-[11px] font-black uppercase tracking-[0.28em] text-gray-900 dark:text-white">
                {{ solutionsCol.title }}
              </h3>
            </div>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              <li v-for="l in solutionsCol.links" :key="l.label">
                <NuxtLink
                  :to="l.to"
                  class="group inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                >
                  <span aria-hidden="true" class="h-px w-0 bg-secondary-500 me-0 group-hover:w-3 group-hover:me-2 transition-all duration-300" />
                  {{ l.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- The other four columns, each with a big outline chapter numeral -->
          <div
            v-for="(col, ci) in otherCols"
            :key="col.title"
            class="col-span-1 md:pe-4 last:md:pe-0 md:border-e md:border-black/10 md:dark:border-white/10 last:md:border-e-0 rtl:md:border-e-0 rtl:md:ps-4 last:rtl:md:ps-0 rtl:md:border-s last:rtl:md:border-s-0 rtl:md:pe-0"
          >
            <div class="mb-6 flex items-baseline gap-3">
              <span aria-hidden="true" class="text-4xl font-black tracking-tighter leading-none text-black/[0.08] dark:text-white/[0.08] tabular-nums select-none">
                {{ String(ci >= 1 ? ci + 2 : ci + 1).padStart(2, '0') }}
              </span>
              <h3 class="text-[11px] font-black uppercase tracking-[0.28em] text-gray-900 dark:text-white">
                {{ col.title }}
              </h3>
            </div>
            <ul class="space-y-2.5">
              <li v-for="l in col.links" :key="l.label">
                <NuxtLink
                  :to="l.to"
                  class="group inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                >
                  <span aria-hidden="true" class="h-px w-0 bg-secondary-500 me-0 group-hover:w-3 group-hover:me-2 transition-all duration-300" />
                  {{ l.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ═══ 04 · Meta rail — single elegant line with spec tags + back-to-top ═══ -->
      <div class="py-5 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-500">
        <p class="truncate">{{ bottomText }}</p>

        <div class="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gray-500">
          <span class="inline-flex items-center gap-1.5">
            <span aria-hidden="true" class="size-1 rounded-full bg-gray-300 dark:bg-white/20" />
            {{ copy.footer.bottomLang }}
          </span>
          <span aria-hidden="true" class="h-3 w-px bg-black/10 dark:bg-white/10" />
          <span>{{ copy.footer.bottomHost }}</span>
        </div>

        <button
          type="button"
          class="group shrink-0 inline-flex items-center gap-2 uppercase tracking-[0.22em] text-[11px] hover:text-primary dark:hover:text-white transition-colors"
          @click="scrollToTop"
        >
          {{ copy.ui.backToTop }}
          <span aria-hidden="true" class="size-7 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center group-hover:border-primary dark:group-hover:border-white transition-colors">
            <UIcon name="i-lucide-arrow-up" class="size-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Tailwind JIT doesn't ship every gradient direction — define the two we need
   so the start/end fade edges on the solutions ticker render correctly. */
.bg-gradient-to-e {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.bg-gradient-to-w {
  background-image: linear-gradient(to left, var(--tw-gradient-stops));
}
[dir="rtl"] .bg-gradient-to-e {
  background-image: linear-gradient(to left, var(--tw-gradient-stops));
}
[dir="rtl"] .bg-gradient-to-w {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
</style>
