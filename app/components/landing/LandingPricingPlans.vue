<script setup>
// Shared "Pick your installation path" plans grid. Used both on the landing
// home (read-only, links to /portal/pricing) and on the dedicated pricing
// page (interactive — emits `select` so the page can trigger checkout).
//
// Data source: merges `/api/portal/plans` (DB — name, price, features)
// with i18n metadata (durationValue, tagline, tag, cta, mostPopular, etc.)
// by matching `slug`. i18n is the fallback if the API fails — keeps the
// site up even without a reachable database.
//
// Behaviors:
//   - to="/somewhere"        → cards render as <NuxtLink>s to that URL
//   - @select               → cards render as <button>s and emit (idx, plan)
//   - showFeatures          → renders the per-plan feature list above the CTA
//   - loadingIndex          → shows a spinner on the matching card's CTA
//   - discountPercent       → reduces displayed prices by this percent
const props = defineProps({
  to: { type: String, default: '/portal/pricing' },
  interactive: { type: Boolean, default: false },
  showFeatures: { type: Boolean, default: false },
  loadingIndex: { type: [Number, null], default: null },
  discountPercent: { type: Number, default: 0 }
})
const emit = defineEmits(['select'])

const copy = useLandingCopy()
const { locale } = useI18n()
// NuxtLink isn't a string component name, so for <component :is> we need
// a resolved reference rather than the literal `'NuxtLink'`.
const NuxtLinkRef = resolveComponent('NuxtLink')

// Pull live plans + features from the DB. `default: () => []` lets us
// degrade gracefully when the endpoint is unavailable (prerender, offline).
const { data: dbPlans } = await useFetch('/api/portal/plans', {
  default: () => [],
  server: true
})

// i18n plans carry the UI-only bits that the DB doesn't store (duration
// slider, tagline, mostPopular ribbon, etc). We match by slug if available
// — the landing.json is ordered to mirror the DB's sortOrder so falling
// back to index lookup is safe.
const I18N_SLUGS = ['self-install', 'we-install']

function formatPrice(cents, discountPercent) {
  const discounted = Math.round(cents * (1 - (discountPercent || 0) / 100))
  const dollars = discounted / 100
  const rounded = Math.abs(dollars - Math.round(dollars)) < 0.005
    ? Math.round(dollars).toString()
    : dollars.toFixed(2)
  return `$${rounded}`
}

const plans = computed(() => {
  const i18nPlans = copy.value.pricing?.plans ?? []
  const ar = locale.value === 'ar'
  // If the DB returned nothing (dev/offline/first run), pass through the
  // i18n list unchanged so the page never looks empty.
  if (!dbPlans.value?.length) return i18nPlans

  return dbPlans.value.map((dbPlan, apiIndex) => {
    // Prefer slug-based merge so re-ordering in admin doesn't break the
    // mapping; fall back to ordinal when the i18n list doesn't know the slug.
    const i18nIndex = I18N_SLUGS.indexOf(dbPlan.slug)
    const i18n = (i18nIndex >= 0 ? i18nPlans[i18nIndex] : null) ?? i18nPlans[apiIndex] ?? {}

    const name = ar && dbPlan.nameAr ? dbPlan.nameAr : dbPlan.name
    const price = formatPrice(dbPlan.priceUsdCents, props.discountPercent)
    const features = dbPlan.features?.length
      ? dbPlan.features.map(f => (ar && f.labelAr ? f.labelAr : f.label))
      : i18n.features

    return {
      // UI-only fields from i18n (tag, duration visuals, mostPopular, CTA)
      ...i18n,
      // DB-sourced fields override
      slug: dbPlan.slug,
      name,
      price,
      features
    }
  })
})

function onClick(idx, p) {
  if (props.interactive) emit('select', idx, p)
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
    <component
      :is="interactive ? 'button' : NuxtLinkRef"
      v-for="(p, idx) in plans"
      :key="p.slug || p.name"
      :to="interactive ? undefined : to"
      :type="interactive ? 'button' : undefined"
      :disabled="interactive && loadingIndex !== null"
      :class="[
        'group block text-start w-full overflow-hidden rounded-3xl transition-all',
        p.featured
          ? 'relative bg-gradient-to-br from-secondary-500 via-secondary-600 to-primary text-white ring-1 ring-white/10 shadow-2xl shadow-secondary-500/30 md:scale-[1.02]'
          : 'relative bg-white dark:bg-white/[0.02] text-primary dark:text-white ring-1 ring-black/10 dark:ring-white/10 shadow-xl shadow-black/5',
        interactive && loadingIndex !== null ? 'cursor-wait' : ''
      ]"
      @click="onClick(idx, p)"
    >
      <!-- Decorative grid pattern on featured card -->
      <div
        v-if="p.featured"
        aria-hidden="true"
        class="absolute inset-0 opacity-[0.18] pointer-events-none"
        style="background-image:linear-gradient(to right,rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.4) 1px,transparent 1px);background-size:40px 40px"
      />
      <!-- Soft top-end glow on featured -->
      <div
        v-if="p.featured"
        aria-hidden="true"
        class="absolute -top-24 -end-24 size-80 rounded-full bg-white/15 blur-3xl pointer-events-none"
      />

      <!-- "Most popular" ribbon -->
      <div
        v-if="p.featured && p.mostPopular"
        class="absolute top-5 end-5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-secondary-700 text-[10px] font-black uppercase tracking-[0.18em] shadow-lg shadow-black/20"
      >
        <UIcon name="i-lucide-sparkles" class="size-3" />
        {{ p.mostPopular }}
      </div>

      <div class="relative p-8 sm:p-10 flex flex-col h-full">
        <!-- Top row: index + plan name -->
        <div class="flex items-center justify-between mb-6">
          <span
            class="text-xs tabular-nums"
            :class="p.featured ? 'text-white/60' : 'text-gray-400'"
          >0{{ idx + 1 }} / 0{{ plans.length }}</span>
          <h3
            class="text-xs font-black uppercase tracking-[0.25em]"
            :class="p.featured ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'"
          >{{ p.name }}</h3>
        </div>

        <!-- Hero duration -->
        <div class="flex items-baseline gap-3 leading-none mb-2">
          <span
            class="font-black tracking-tight tabular-nums"
            :class="[
              p.durationValue === '∞' ? 'text-7xl sm:text-8xl lg:text-9xl' : 'text-6xl sm:text-7xl lg:text-8xl',
              p.featured ? 'text-white' : 'text-primary dark:text-white'
            ]"
          >{{ p.durationValue }}</span>
          <span
            class="text-sm sm:text-base font-black uppercase tracking-[0.25em]"
            :class="p.featured ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'"
          >{{ p.durationLabel }}</span>
        </div>

        <!-- Coverage bar -->
        <div class="mt-6 mb-8">
          <div
            class="relative h-1 rounded-full overflow-hidden"
            :class="p.featured ? 'bg-white/20' : 'bg-black/10 dark:bg-white/10'"
          >
            <div
              class="absolute inset-y-0 start-0 rounded-full transition-all duration-1000"
              :class="p.featured
                ? 'bg-white'
                : p.durationProgress === 100
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                  : 'bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-400 dark:to-gray-300'"
              :style="{ width: p.durationProgress + '%' }"
            />
            <div
              v-if="p.durationProgress < 100"
              aria-hidden="true"
              class="absolute top-1/2 -translate-y-1/2 size-2 rounded-full ring-2"
              :class="p.featured
                ? 'bg-white ring-secondary-600'
                : 'bg-gray-500 ring-white dark:ring-black'"
              :style="{ insetInlineStart: `calc(${p.durationProgress}% - 0.25rem)` }"
            />
          </div>
          <div
            class="mt-2 flex justify-between items-center text-[10px] uppercase tracking-[0.2em]"
            :class="p.featured ? 'text-white/60' : 'text-gray-400'"
          >
            <span>{{ copy.pricing.durationAxisStart }}</span>
            <span
              v-if="p.durationProgress === 100"
              class="inline-flex items-center gap-1 font-bold"
              :class="p.featured ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'"
            >
              <UIcon name="i-lucide-infinity" class="size-3" />
              {{ copy.pricing.durationAxisEndForever }}
            </span>
          </div>
        </div>

        <!-- Tagline -->
        <p
          class="text-sm sm:text-base leading-relaxed mb-6"
          :class="p.featured ? 'text-white/85' : 'text-gray-600 dark:text-gray-400'"
        >{{ p.tagline }}</p>

        <!-- Per-plan features list (only on the dedicated pricing page) -->
        <ul
          v-if="showFeatures && p.features?.length"
          class="mb-8 space-y-2.5 text-sm"
        >
          <li v-for="f in p.features" :key="f" class="flex items-start gap-2.5">
            <UIcon
              name="i-lucide-check"
              class="size-4 shrink-0 mt-0.5"
              :class="p.featured ? 'text-white' : 'text-emerald-500'"
            />
            <span :class="p.featured ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'">{{ f }}</span>
          </li>
        </ul>

        <!-- Spacer pushes price + CTA to the bottom -->
        <div class="mt-auto">
          <!-- Price -->
          <div class="flex items-baseline gap-2 mb-6">
            <span
              class="text-5xl font-black tracking-tight"
              :class="p.featured ? 'text-white' : 'text-primary dark:text-white'"
            >{{ p.price }}</span>
            <span
              class="text-xs"
              :class="p.featured ? 'text-white/70' : 'text-gray-500'"
            >{{ p.priceSuffix }}</span>
          </div>

          <!-- Big full-width CTA — visual only; the wrapping element handles
               the click (NuxtLink for static, button for interactive). -->
          <span
            class="flex items-center justify-center gap-3 w-full h-14 rounded-2xl text-sm font-bold transition-all"
            :class="p.featured
              ? 'bg-white text-secondary-700 group-hover:shadow-xl group-hover:shadow-white/20 group-hover:-translate-y-0.5'
              : 'bg-primary text-white dark:bg-white dark:text-primary group-hover:opacity-90 group-hover:-translate-y-0.5'"
          >
            {{ p.cta }}
            <UIcon
              :name="loadingIndex === idx ? 'i-lucide-loader-circle' : 'i-lucide-arrow-right'"
              class="size-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              :class="{ 'animate-spin': loadingIndex === idx }"
            />
          </span>
        </div>
      </div>
    </component>
  </div>
</template>
