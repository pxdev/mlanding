<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const copy = useLandingCopy()
const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'ar' ? 'قانوني — Momentfy' : 'Legal — Momentfy',
  meta: [{
    name: 'description',
    content: locale.value === 'ar'
      ? 'الترخيص وشروط الخدمة والخصوصية وسياسة البيع ومعلومات الشركة — كلها في صفحة واحدة.'
      : 'License, Terms of Service, Privacy, Sales policy and company info — all on one page, plainly written.'
  }]
}))
</script>

<template>
  <!-- ═══ Hero ═══ -->
  <section class="relative py-20 sm:py-28 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-0 -z-10">
      <div class="absolute top-0 start-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-secondary-500 blur-[150px] opacity-[0.1] rounded-full" />
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.legalPage.eyebrow }}</p>
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-500 max-w-[16rem]">{{ copy.legalPage.sub }}</p>
          <p class="mt-4 text-[11px] uppercase tracking-[0.2em] text-gray-400">{{ copy.legalPage.lastUpdated }}</p>

          <!-- TOC -->
          <nav class="mt-6 space-y-2 text-xs">
            <a v-for="s in copy.legalPage.sections" :key="s.id" :href="`#${s.id}`"
              class="group flex items-center gap-2 text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
            >
              <span class="tabular-nums text-gray-400 shrink-0">{{ s.num }}</span>
              <span class="size-1.5 rounded-full bg-secondary-500/40 group-hover:bg-secondary-500 transition-colors shrink-0" />
              <span class="uppercase tracking-[0.2em] truncate">{{ s.title }}</span>
            </a>
          </nav>
        </div>
        <div class="col-span-12 sm:col-span-8 lg:col-span-9">
          <h1 class="font-black tracking-tight leading-[0.9] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            <span class="block">{{ copy.legalPage.h1 }}</span>
          </h1>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ Legal body — section per chapter ═══ -->
  <section class="py-8 sm:py-16">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div v-for="s in copy.legalPage.sections" :key="s.id" :id="s.id"
        class="grid grid-cols-12 gap-6 lg:gap-12 py-12 sm:py-16 border-t border-black/10 dark:border-white/10"
      >
        <div class="col-span-12 lg:col-span-3">
          <div class="lg:sticky lg:top-28">
            <p class="text-xs tabular-nums text-gray-400">{{ s.num }}</p>
            <h2 class="mt-2 text-2xl sm:text-3xl font-black tracking-tight uppercase">{{ s.title }}</h2>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-9 space-y-8">
          <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">{{ s.body }}</p>

          <!-- License can / cannot split columns (only shown if both arrays exist) -->
          <div v-if="s.can?.length || s.cannot?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl">
            <div v-if="s.can?.length">
              <p class="text-[11px] uppercase tracking-[0.25em] font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                You can
              </p>
              <ul>
                <li v-for="item in s.can" :key="item"
                  class="flex items-start gap-3 py-2.5 border-t border-emerald-500/20 first:border-t-emerald-500 last:border-b last:border-b-emerald-500/20"
                >
                  <UIcon name="i-lucide-check" class="size-4 shrink-0 mt-0.5 text-emerald-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{{ item }}</span>
                </li>
              </ul>
            </div>
            <div v-if="s.cannot?.length">
              <p class="text-[11px] uppercase tracking-[0.25em] font-bold text-red-600 dark:text-red-400 mb-4">
                You cannot
              </p>
              <ul>
                <li v-for="item in s.cannot" :key="item"
                  class="flex items-start gap-3 py-2.5 border-t border-red-500/20 first:border-t-red-500 last:border-b last:border-b-red-500/20"
                >
                  <UIcon name="i-lucide-x" class="size-4 shrink-0 mt-0.5 text-red-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- key/value rows for Terms, Privacy, Sales, Company -->
          <dl v-if="s.items?.length" class="max-w-3xl">
            <div v-for="row in s.items" :key="row.k"
              class="grid grid-cols-[8rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 py-4 border-t border-black/10 dark:border-white/10 last:border-b items-baseline"
            >
              <dt class="text-xs uppercase tracking-[0.2em] text-gray-400">{{ row.k }}</dt>
              <dd class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{{ row.v }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <LandingCTA />
</template>
