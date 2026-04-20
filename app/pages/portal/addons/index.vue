<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const copy = useLandingCopy()
const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'ar' ? 'الإضافات — Momentfy' : 'Add-ons — Momentfy',
  meta: [{
    name: 'description',
    content: locale.value === 'ar'
      ? 'ستة عشر إضافة قابلة للتفعيل: ZATCA, ETA, مساعد ذكي, مخطط أسنان, تصوير طبي, مختبرات, وصفات, سجلات طبية, ولاء وأكثر.'
      : 'Sixteen toggleable add-ons: ZATCA, ETA, AI assistant, dental chart, clinical imaging, lab orders, prescriptions, medical records, loyalty and more.'
  }]
}))

// Each add-on belongs to one of five category "chapters" (same taxonomy as home page)
type AddonCat = 'Compliance' | 'Clinical' | 'Intelligence' | 'Operations' | 'Growth'
type AddonMeta = { icon: string; cat: AddonCat }
const addonMeta: Record<string, AddonMeta> = {
  zatca:      { icon: 'i-lucide-shield-check',    cat: 'Compliance' },
  eta:        { icon: 'i-lucide-file-check',      cat: 'Compliance' },
  ai:         { icon: 'i-lucide-sparkles',        cat: 'Intelligence' },
  gcal:       { icon: 'i-lucide-calendar-check',  cat: 'Intelligence' },
  insurance:  { icon: 'i-lucide-heart-pulse',     cat: 'Clinical' },
  dental:     { icon: 'i-hugeicons-dental-tooth',           cat: 'Clinical' },
  imaging:    { icon: 'i-lucide-scan',            cat: 'Clinical' },
  labs:       { icon: 'i-lucide-flask-conical',   cat: 'Clinical' },
  rx:         { icon: 'i-lucide-pill',            cat: 'Clinical' },
  records:    { icon: 'i-lucide-folder-heart',    cat: 'Clinical' },
  resources:  { icon: 'i-lucide-armchair',        cat: 'Operations' },
  attendance: { icon: 'i-lucide-log-in',          cat: 'Operations' },
  boarding:   { icon: 'i-lucide-home',            cat: 'Operations' },
  loyalty:    { icon: 'i-lucide-award',           cat: 'Growth' },
  events:     { icon: 'i-lucide-calendar-heart',  cat: 'Growth' },
  followup:   { icon: 'i-lucide-list-checks',     cat: 'Growth' }
}

const catPalette: Record<AddonCat, { accent: string; iconBg: string; iconText: string; dot: string }> = {
  Compliance:   { accent: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-500/8',  iconText: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  Clinical:     { accent: 'text-sky-600 dark:text-sky-400',         iconBg: 'bg-sky-500/8',      iconText: 'text-sky-600 dark:text-sky-400',         dot: 'bg-sky-500' },
  Intelligence: { accent: 'text-violet-600 dark:text-violet-400',   iconBg: 'bg-violet-500/8',   iconText: 'text-violet-600 dark:text-violet-400',   dot: 'bg-violet-500' },
  Operations:   { accent: 'text-amber-600 dark:text-amber-400',     iconBg: 'bg-amber-500/8',    iconText: 'text-amber-600 dark:text-amber-400',     dot: 'bg-amber-500' },
  Growth:       { accent: 'text-rose-600 dark:text-rose-400',       iconBg: 'bg-rose-500/8',     iconText: 'text-rose-600 dark:text-rose-400',       dot: 'bg-rose-500' }
}

const order: AddonCat[] = ['Compliance', 'Clinical', 'Intelligence', 'Operations', 'Growth']
const addonCategories = computed(() =>
  order.map(cat => ({
    name: cat,
    items: copy.value.addons.items.filter(a => addonMeta[a.key]?.cat === cat)
  })).filter(c => c.items.length > 0)
)

function splitHeading(s: string) {
  if (!s) return { first: '', rest: '' }
  const idx = s.search(/[.،,]/)
  if (idx < 0 || idx === s.length - 1) return { first: s, rest: '' }
  return { first: s.slice(0, idx + 1).trim(), rest: s.slice(idx + 1).trim() }
}
const h1 = computed(() => splitHeading(copy.value.addonsPage.h1))
</script>

<template>
  <!-- ═══ Hero ═══ -->
  <section class="relative py-20 sm:py-28 overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30">
      <div class="absolute top-[10%] start-[-10rem] w-80 h-80 rounded-full bg-emerald-300 blur-[120px] opacity-30" />
      <div class="absolute top-[40%] end-[-10rem] w-80 h-80 rounded-full bg-sky-300 blur-[120px] opacity-30" />
      <div class="absolute bottom-[10%] start-1/3 w-80 h-80 rounded-full bg-rose-300 blur-[120px] opacity-20" />
    </div>

    <div class="relative max-w-7xl mx-auto px-5 sm:px-8">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.addonsPage.eyebrow }}</p>
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-500 max-w-[16rem]">{{ copy.addonsPage.sub }}</p>
          <!-- Chapter jump-nav -->
          <div class="mt-6 space-y-2 text-xs">
            <a v-for="(cat, ci) in addonCategories" :key="cat.name" :href="`#addons-${cat.name.toLowerCase()}`"
              class="group flex items-center gap-2 text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
            >
              <span class="size-1.5 rounded-full" :class="catPalette[cat.name].dot" />
              <span class="uppercase tracking-[0.2em]">{{ String(ci + 1).padStart(2, '0') }} · {{ cat.name }}</span>
              <span class="ms-auto tabular-nums text-gray-400">{{ String(cat.items.length).padStart(2, '0') }}</span>
            </a>
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

  <!-- ═══ Directory chapters ═══ -->
  <section class="py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 space-y-16 sm:space-y-24">
      <div v-for="(cat, ci) in addonCategories" :key="cat.name" :id="`addons-${cat.name.toLowerCase()}`">
        <!-- Chapter header: index + category name + count, hairline -->
        <div class="flex items-end justify-between pb-5 mb-10 border-b border-black/10 dark:border-white/10">
          <div class="flex items-baseline gap-4 sm:gap-6 min-w-0">
            <span class="shrink-0 text-sm tabular-nums text-gray-400">{{ String(ci + 1).padStart(2, '0') }}</span>
            <div class="flex items-baseline gap-3 min-w-0">
              <span aria-hidden="true" class="size-2.5 rounded-full shrink-0" :class="catPalette[cat.name].dot" />
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase truncate" :class="catPalette[cat.name].accent">
                {{ cat.name }}
              </h2>
            </div>
          </div>
          <span class="shrink-0 text-[10px] uppercase tracking-[0.25em] text-gray-400">
            {{ String(cat.items.length).padStart(2, '0') }} / {{ cat.items.length === 1 ? 'add-on' : 'add-ons' }}
          </span>
        </div>

        <!-- Addon grid inside chapter — each row links to the detail page -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          <NuxtLink v-for="a in cat.items" :key="a.key" :to="`/portal/addons/${a.key}`"
            class="group relative flex items-start gap-4"
          >
            <div class="shrink-0 size-12 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110" :class="catPalette[cat.name].iconBg">
              <UIcon :name="addonMeta[a.key]?.icon" class="size-5" :class="catPalette[cat.name].iconText" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base sm:text-lg font-bold leading-tight">
                <span class="relative inline-block align-baseline">
                  {{ a.label }}
                  <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-[1.5px] origin-start scale-x-0 group-hover:scale-x-100 transition-transform duration-300" :class="catPalette[cat.name].dot" />
                </span>
              </h3>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ a.desc }}</p>
              <span class="mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {{ copy.ui.readMore }}
                <UIcon name="i-lucide-arrow-right" class="size-3 rtl:rotate-180" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Closing tagline -->
  <p class="mt-8 mb-24 text-center text-xs text-gray-500 uppercase tracking-[0.25em] flex items-center justify-center gap-2">
    <span class="size-1.5 rounded-full bg-emerald-500" />
    {{ copy.ui.allSixteenShip }}
  </p>

  <LandingCTA />
</template>
