<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const copy = useLandingCopy()
const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'ar' ? 'الأسعار — Momentfy' : 'Pricing — Momentfy',
  meta: [{
    name: 'description',
    content: locale.value === 'ar'
      ? 'أسعار دفعة واحدة للكود المصدري، استضافة ذاتية، مستأجرون بلا حدود. الفرق الوحيد هو مدة التحديثات.'
      : 'One-time pricing for source code, self-hosted, unlimited tenants. The only thing that differs is the update window.'
  }]
}))

const includedIcons = ['i-lucide-code', 'i-lucide-globe', 'i-lucide-infinity', 'i-lucide-server', 'i-lucide-shield-check', 'i-lucide-smartphone', 'i-lucide-sparkles', 'i-lucide-book-open']

function splitHeading(s: string) {
  if (!s) return { first: '', rest: '' }
  const idx = s.search(/[.،,]/)
  if (idx < 0 || idx === s.length - 1) return { first: s, rest: '' }
  return { first: s.slice(0, idx + 1).trim(), rest: s.slice(idx + 1).trim() }
}
const h1 = computed(() => ({
  first: copy.value.pricingPage.h1a,
  rest: copy.value.pricingPage.h1b
}))
</script>

<template>
  <!-- ═══ Hero ═══ -->
  <section class="relative py-20 sm:py-28 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-0 -z-10">
      <div class="absolute top-0 start-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-secondary-500 blur-[150px] opacity-[0.15] rounded-full" />
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.pricingPage.eyebrow }}</p>
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-500 max-w-[16rem]">{{ copy.pricingPage.sub }}</p>
          <div class="mt-6 space-y-2 text-xs text-gray-500">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-infinity" class="size-3.5 text-emerald-500" />
              {{ copy.ui.lifetimeUpdates }}
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-lock" class="size-3.5 text-emerald-500" />
              {{ copy.ui.secureCheckout }}
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-shield-check" class="size-3.5 text-emerald-500" />
              {{ copy.ui.lifetimeLicense }}
            </div>
          </div>
        </div>
        <div class="col-span-12 sm:col-span-8 lg:col-span-9">
          <h1 class="font-black tracking-tight leading-[0.9] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            <span class="block">{{ h1.first }}</span>
            <span v-if="h1.rest" class="block italic text-black/20 dark:text-white/20">{{ h1.rest }}</span>
          </h1>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ A) What every plan includes ═══ -->
  <section class="py-16 sm:py-20 border-t border-black/10 dark:border-white/10">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="flex items-baseline gap-3 mb-10 pb-4 border-b border-black/10 dark:border-white/10">
        <span class="text-[11px] tabular-nums text-gray-400">A</span>
        <p class="text-[11px] uppercase tracking-[0.25em] text-gray-400">{{ copy.pricing.includedAllLabel }}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8">
        <div v-for="(label, i) in copy.pricing.includedAll" :key="label" class="flex items-start gap-3">
          <UIcon :name="includedIcons[i]" class="size-5 shrink-0 mt-0.5 text-secondary-500" />
          <div>
            <p class="text-sm sm:text-base font-bold">{{ label }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 uppercase tracking-wider">{{ copy.ui.includedInEveryPlan }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ B) Pick your update window ═══ -->
  <section class="py-16 sm:py-20 border-t border-black/10 dark:border-white/10">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="flex items-baseline gap-3 mb-12 pb-4 border-b border-black/10 dark:border-white/10">
        <span class="text-[11px] tabular-nums text-gray-400">B</span>
        <p class="text-[11px] uppercase tracking-[0.25em] text-gray-400">{{ copy.pricing.windowLabel }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-black/10 lg:dark:divide-white/10 rtl:lg:divide-x-reverse">
        <div v-for="(p, idx) in copy.pricing.plans" :key="p.name"
          class="relative py-10 lg:py-0 lg:px-10 first:lg:ps-0 last:lg:pe-0 flex flex-col"
        >
          <span v-if="p.featured" aria-hidden="true" class="hidden lg:block absolute start-10 top-4 bottom-4 w-0.5 bg-gradient-to-b from-secondary-400 via-secondary-500 to-sky-500" />
          <span v-if="p.featured" aria-hidden="true" class="lg:hidden absolute start-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary-400 via-secondary-500 to-sky-500" />

          <div :class="p.featured ? 'ps-5 lg:ps-5' : ''">
            <!-- Top: index + popular chip -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs tabular-nums text-gray-400">0{{ idx + 1 }} / 02</span>
              <span v-if="p.featured && p.mostPopular"
                class="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-secondary-600 dark:text-secondary-400"
              >
                <UIcon name="i-lucide-sparkles" class="size-3" />
                {{ p.mostPopular }}
              </span>
            </div>

            <!-- Big duration -->
            <div class="flex items-baseline gap-3 mb-3 leading-none">
              <span
                class="font-black tracking-tight tabular-nums transition-all"
                :class="[
                  p.durationValue === '∞' ? 'text-8xl sm:text-9xl' : 'text-7xl sm:text-8xl lg:text-9xl',
                  p.featured ? 'bg-gradient-to-br from-secondary-500 via-secondary-400 to-sky-500 bg-clip-text text-transparent' : 'text-primary dark:text-white'
                ]"
              >{{ p.durationValue }}</span>
              <span class="text-sm sm:text-base font-black uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">{{ p.durationLabel }}</span>
            </div>

            <!-- Coverage bar -->
            <div class="mt-6 mb-6 sm:mb-8">
              <div class="relative h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  class="absolute inset-y-0 start-0 rounded-full transition-all duration-1000"
                  :class="p.featured
                    ? 'bg-gradient-to-r from-secondary-500 via-secondary-400 to-sky-500'
                    : p.durationProgress === 100
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                      : 'bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-400 dark:to-gray-300'"
                  :style="{ width: p.durationProgress + '%' }"
                />
                <div
                  v-if="p.durationProgress < 100"
                  aria-hidden="true"
                  class="absolute top-1/2 -translate-y-1/2 size-2 rounded-full ring-2 ring-white dark:ring-black"
                  :class="p.featured ? 'bg-secondary-500' : 'bg-gray-500'"
                  :style="{ insetInlineStart: `calc(${p.durationProgress}% - 0.25rem)` }"
                />
              </div>
              <div class="mt-2 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                <span>{{ copy.pricing.durationAxisStart }}</span>
                <span v-if="p.durationProgress === 100"
                  class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold"
                >
                  <UIcon name="i-lucide-infinity" class="size-3" />
                  {{ copy.pricing.durationAxisEndForever }}
                </span>
              </div>
            </div>

            <!-- Plan name + tagline -->
            <div class="mb-6">
              <h3 class="text-lg font-black uppercase tracking-[0.15em]">{{ p.name }}</h3>
              <p class="mt-1.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ p.tagline }}</p>
            </div>

            <!-- Price -->
            <div class="mb-8 flex items-baseline gap-2">
              <span class="text-4xl sm:text-5xl font-black tracking-tight">{{ p.price }}</span>
              <span class="text-xs text-gray-500">{{ p.priceSuffix }}</span>
            </div>

            <!-- Full feature list for this plan -->
            <ul class="mb-8 space-y-2.5 text-sm">
              <li v-for="f in p.features" :key="f" class="flex items-start gap-2.5">
                <UIcon name="i-lucide-check" class="size-4 shrink-0 mt-0.5" :class="p.featured ? 'text-secondary-500' : 'text-emerald-500'" />
                <span class="text-gray-700 dark:text-gray-300">{{ f }}</span>
              </li>
            </ul>

            <!-- CTA -->
            <NuxtLink to="/portal/download" class="group/cta inline-flex items-center gap-3 text-sm font-bold mt-auto">
              <span
                class="size-11 rounded-full flex items-center justify-center transition-transform group-hover/cta:scale-110"
                :class="p.featured
                  ? 'bg-gradient-to-br from-secondary-500 to-secondary-700 text-white shadow-lg shadow-secondary-500/30'
                  : 'bg-primary text-white dark:bg-white dark:text-primary'"
              >
                <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
              </span>
              <span class="relative">
                {{ p.cta }}
                <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover/cta:bg-secondary-500 transition-colors" />
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ SaaS comparison ═══ -->
  <section class="py-16 sm:py-20 border-t border-black/10 dark:border-white/10">
    <div class="max-w-5xl mx-auto px-5 sm:px-8">
      <div class="grid grid-cols-12 gap-6 mb-12">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.pricingPage.compareEyebrow }}</p>
          <p class="mt-3 text-sm text-gray-500 max-w-[16rem]">{{ copy.pricingPage.compareBody }}</p>
        </div>
        <div class="col-span-12 sm:col-span-8 lg:col-span-9">
          <h2 class="font-black tracking-tight leading-[0.9] text-4xl sm:text-5xl lg:text-6xl">{{ copy.pricingPage.compareHeading }}</h2>
        </div>
      </div>

      <!-- Side-by-side comparison, no cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 border-t border-black/10 dark:border-white/10 pt-10">
        <div>
          <p class="text-xs uppercase tracking-[0.25em] text-red-500 font-bold">{{ copy.pricingPage.saasLabel }}</p>
          <p class="mt-4 text-6xl sm:text-7xl font-black tracking-tight text-red-600 dark:text-red-400 leading-none">{{ copy.pricingPage.saasValue }}</p>
          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">{{ copy.pricingPage.saasBody }}</p>
        </div>
        <div class="md:border-s md:border-black/10 md:dark:border-white/10 md:ps-10 sm:md:ps-16 rtl:md:border-s-0 rtl:md:border-e rtl:md:ps-0 rtl:md:pe-10 sm:rtl:md:pe-16">
          <p class="text-xs uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-bold">{{ copy.pricingPage.momentfyLabel }}</p>
          <p class="mt-4 text-6xl sm:text-7xl font-black tracking-tight bg-gradient-to-br from-emerald-500 to-emerald-600 bg-clip-text text-transparent leading-none">{{ copy.pricingPage.momentfyValue }}</p>
          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">{{ copy.pricingPage.momentfyBody }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ Payments & checkout ═══ -->
  <section class="py-16 sm:py-20 border-t border-black/10 dark:border-white/10">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="grid grid-cols-12 gap-6 mb-12">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.pricingPage.payments.eyebrow }}</p>
          <p class="mt-3 text-sm text-gray-500 max-w-[16rem]">{{ copy.pricingPage.payments.sub }}</p>
        </div>
        <div class="col-span-12 sm:col-span-8 lg:col-span-9">
          <h2 class="font-black tracking-tight leading-[0.9] text-4xl sm:text-5xl lg:text-6xl">{{ copy.pricingPage.payments.heading }}</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 border-t border-black/10 dark:border-white/10 pt-10">
        <div>
          <UIcon name="i-lucide-banknote" class="size-5 text-secondary-500 mb-3" />
          <p class="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">{{ copy.ui.currencyLabel }}</p>
          <p class="text-base sm:text-lg font-semibold leading-relaxed">{{ copy.pricingPage.payments.currency }}</p>
        </div>
        <div>
          <UIcon name="i-lucide-credit-card" class="size-5 text-secondary-500 mb-3" />
          <p class="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">{{ copy.ui.methodsLabel }}</p>
          <ul class="space-y-2">
            <li v-for="m in copy.pricingPage.payments.methods" :key="m" class="flex items-start gap-2 text-base font-semibold leading-relaxed">
              <UIcon name="i-lucide-check" class="size-4 shrink-0 mt-1 text-emerald-500" />
              <span>{{ m }}</span>
            </li>
          </ul>
        </div>
        <div>
          <UIcon name="i-lucide-shield-check" class="size-5 text-secondary-500 mb-3" />
          <p class="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">{{ copy.ui.processorLabel }}</p>
          <p class="text-base sm:text-lg font-semibold leading-relaxed">{{ copy.pricingPage.payments.processor }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ Pricing FAQ ═══ -->
  <section class="py-16 sm:py-20 border-t border-black/10 dark:border-white/10">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="grid grid-cols-12 gap-6 mb-12">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.pricingPage.faq.eyebrow }}</p>
          <NuxtLink to="/portal/faq" class="mt-4 group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary dark:hover:text-white transition-colors">
            <UIcon name="i-lucide-arrow-right" class="size-3.5 rtl:rotate-180" />
            <span class="relative">
              {{ copy.ui.fullFaq }}
              <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </NuxtLink>
        </div>
        <div class="col-span-12 sm:col-span-8 lg:col-span-9">
          <h2 class="font-black tracking-tight leading-[0.9] text-4xl sm:text-5xl lg:text-6xl">{{ copy.pricingPage.faq.heading }}</h2>
        </div>
      </div>

      <div class="max-w-4xl border-t border-black/10 dark:border-white/10">
        <details v-for="(f, i) in copy.pricingPage.faq.items" :key="f.q"
          class="group border-b border-black/10 dark:border-white/10 open:bg-black/[0.02] dark:open:bg-white/[0.02] transition-colors"
        >
          <summary class="list-none cursor-pointer grid grid-cols-12 gap-4 items-center py-5 px-3 sm:px-5">
            <span class="col-span-2 sm:col-span-1 text-xs tabular-nums text-gray-400">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="col-span-8 sm:col-span-10 text-base sm:text-lg font-bold tracking-tight leading-snug">{{ f.q }}</span>
            <span class="col-span-2 sm:col-span-1 flex justify-end">
              <span class="size-8 rounded-full flex items-center justify-center border border-black/10 dark:border-white/15 transition-all group-open:bg-primary group-open:text-white group-open:border-primary group-open:rotate-180">
                <UIcon name="i-lucide-plus" class="size-3.5 group-open:hidden" />
                <UIcon name="i-lucide-minus" class="size-3.5 hidden group-open:block" />
              </span>
            </span>
          </summary>
          <div class="grid grid-cols-12 gap-4 pb-5 px-3 sm:px-5">
            <div class="col-span-2 sm:col-span-1" />
            <p class="col-span-10 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">{{ f.a }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>

  <LandingCTA />
</template>
