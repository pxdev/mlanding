<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const copy = useLandingCopy()
const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'ar'
    ? 'Momentfy — نظام التشغيل الكامل لأعمال الحجوزات'
    : 'Momentfy — The Operating System for Booking Businesses',
  meta: [{
    name: 'description',
    content: locale.value === 'ar'
      ? 'منصة متكاملة للحجز، نقاط البيع، المحاسبة، المخزون، الموارد البشرية، CRM وبوابة العميل. متعدد المستأجرين، ثنائي اللغة، جاهز لـ ZATCA و ETA.'
      : 'All-in-one booking, POS, accounting, inventory, HR, CRM and client portal platform. Multi-tenant. Bilingual. ZATCA & ETA e-invoicing ready.'
  }]
}))

// Each add-on belongs to one of five category "chapters".
type AddonMeta = { icon: string; cat: AddonCat }
type AddonCat = 'Compliance' | 'Clinical' | 'Intelligence' | 'Operations' | 'Growth'
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
// Back-compat shim — other sections still read this map.
const addonVisuals = Object.fromEntries(
  Object.entries(addonMeta).map(([k, v]) => [k, v.icon])
) as Record<string, string>

// Per-category accent palette for the directory chapters.
const catPalette: Record<AddonCat, { accent: string; iconBg: string; iconText: string; dot: string }> = {
  Compliance:   { accent: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-500/8',  iconText: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  Clinical:     { accent: 'text-sky-600 dark:text-sky-400',         iconBg: 'bg-sky-500/8',      iconText: 'text-sky-600 dark:text-sky-400',         dot: 'bg-sky-500' },
  Intelligence: { accent: 'text-violet-600 dark:text-violet-400',   iconBg: 'bg-violet-500/8',   iconText: 'text-violet-600 dark:text-violet-400',   dot: 'bg-violet-500' },
  Operations:   { accent: 'text-amber-600 dark:text-amber-400',     iconBg: 'bg-amber-500/8',    iconText: 'text-amber-600 dark:text-amber-400',     dot: 'bg-amber-500' },
  Growth:       { accent: 'text-rose-600 dark:text-rose-400',       iconBg: 'bg-rose-500/8',     iconText: 'text-rose-600 dark:text-rose-400',       dot: 'bg-rose-500' }
}

// Group the add-ons by category in display order.
const addonCategories = computed(() => {
  const order: AddonCat[] = ['Compliance', 'Clinical', 'Intelligence', 'Operations', 'Growth']
  return order.map(cat => ({
    name: cat,
    items: copy.value.addons.items.filter(a => addonMeta[a.key]?.cat === cat)
  })).filter(c => c.items.length > 0)
})

// Industry visuals
const industryVisuals: Record<string, { icon: string; tint: string }> = {
  salon: { icon: 'i-lucide-scissors', tint: 'from-pink-500/20 to-rose-500/20 text-rose-600 dark:text-rose-400' },
  dental: { icon: 'i-hugeicons-dental-tooth', tint: 'from-sky-500/20 to-blue-500/20 text-sky-600 dark:text-sky-400' },
  medical: { icon: 'i-lucide-heart-pulse', tint: 'from-red-500/20 to-orange-500/20 text-red-600 dark:text-red-400' },
  barber: { icon: 'i-lucide-user', tint: 'from-stone-500/20 to-neutral-500/20 text-stone-700 dark:text-stone-300' },
  fitness: { icon: 'i-lucide-dumbbell', tint: 'from-lime-500/20 to-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
  pet: { icon: 'i-lucide-paw-print', tint: 'from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400' },
  therapy: { icon: 'i-lucide-brain', tint: 'from-violet-500/20 to-purple-500/20 text-violet-600 dark:text-violet-400' },
  photo: { icon: 'i-lucide-camera', tint: 'from-cyan-500/20 to-teal-500/20 text-cyan-600 dark:text-cyan-400' }
}

// Why-items icon list (order matches copy.why.items)
const whyIcons = ['i-lucide-package-2', 'i-lucide-server', 'i-lucide-languages', 'i-lucide-shield-check', 'i-lucide-brain-circuit', 'i-lucide-wifi-off']

// Testimonial accents (order matches copy.testimonials.items)
const testimonialAccents = ['from-pink-500 to-rose-500', 'from-sky-500 to-indigo-500', 'from-emerald-500 to-teal-500']

const faqOpen = ref(0)

// Portal section — three tenant brands to demonstrate multi-tenancy
type TenantBrand = {
  slug: string; name: string; industry: string; logo: string
  grad: string            // gradient for hero card
  accent: string          // solid accent used for dots / accents
  apptIcon: string; apptTitle: string; apptMeta: string
  heroLabel: string; heroValue: string; heroUnit: string; heroProgress: number
  actions: { icon: string; label: string }[]
  pill: { icon: string; text: string }
}
const tenantBrands: TenantBrand[] = [
  {
    slug: 'lina-spa', name: "Lina's Spa", industry: 'Salon', logo: 'L',
    grad: 'from-pink-400 to-rose-600',
    accent: 'bg-rose-500',
    apptIcon: 'i-lucide-scissors', apptTitle: 'Color & Cut', apptMeta: 'Tue · 14:00',
    heroLabel: 'Loyalty balance', heroValue: '1,240', heroUnit: 'pts', heroProgress: 62,
    actions: [
      { icon: 'i-lucide-calendar-plus', label: 'Book' },
      { icon: 'i-lucide-receipt', label: 'Invoice' },
      { icon: 'i-lucide-star', label: 'Review' }
    ],
    pill: { icon: 'i-lucide-sparkles', text: 'Ask the AI…' }
  },
  {
    slug: 'smile-dental', name: 'Smile Dental', industry: 'Clinic', logo: 'S',
    grad: 'from-sky-400 to-blue-600',
    accent: 'bg-sky-500',
    apptIcon: 'i-hugeicons-dental-tooth', apptTitle: 'Root canal', apptMeta: 'Thu · 10:30',
    heroLabel: 'Treatment plan', heroValue: '3', heroUnit: 'visits', heroProgress: 33,
    actions: [
      { icon: 'i-lucide-calendar-plus', label: 'Book' },
      { icon: 'i-lucide-folder-heart', label: 'Records' },
      { icon: 'i-lucide-pill', label: 'Rx' }
    ],
    pill: { icon: 'i-lucide-shield-check', text: 'Invoice signed · ZATCA' }
  },
  {
    slug: 'flex-fitness', name: 'Flex Fitness', industry: 'Studio', logo: 'F',
    grad: 'from-lime-400 to-emerald-600',
    accent: 'bg-emerald-500',
    apptIcon: 'i-lucide-zap', apptTitle: 'HIIT Blast', apptMeta: 'Today · 18:30',
    heroLabel: 'Check-ins', heroValue: '18', heroUnit: 'month', heroProgress: 72,
    actions: [
      { icon: 'i-lucide-calendar-plus', label: 'Classes' },
      { icon: 'i-lucide-log-in', label: 'Check-in' },
      { icon: 'i-lucide-users-round', label: 'Roster' }
    ],
    pill: { icon: 'i-lucide-wifi-off', text: 'Works offline' }
  }
]

</script>

<template>
  <!-- ════════════════════════ HERO ════════════════════════ -->
  <LandingHero />

  <!-- ════════════════════════ PROOF BAND — marquee + big numbers ════════════════════════ -->
  <section class="relative py-16 overflow-hidden bg-white dark:bg-black">
    <!-- Marquee: huge uppercase industry sweep -->
    <div class="relative border-y border-black/5 dark:border-white/10 py-6 overflow-hidden mb-16" role="presentation">
      <div class="flex w-max animate-marquee gap-14">
        <div v-for="pass in 2" :key="pass" class="flex items-center gap-14 shrink-0">
          <template v-for="(ind, i) in ['Salons', 'Dental', 'Medical', 'Barber', 'Fitness', 'Pet care', 'Therapy', 'Photo studios']" :key="`${pass}-${ind}`">
            <span class="text-3xl sm:text-5xl font-black uppercase tracking-tight text-gray-300/80 dark:text-white/10 whitespace-nowrap">{{ ind }}</span>
            <UIcon name="i-lucide-asterisk" class="size-5 sm:size-6 text-secondary-500/60 shrink-0" :class="i === 0 && pass === 1 ? 'animate-spin [animation-duration:8s]' : ''" />
          </template>
        </div>
      </div>
    </div>

    <!-- Big borderless stats with vertical rules -->
    <div class="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-black/5 dark:divide-white/10 rtl:divide-x-reverse">
      <div v-for="(s, i) in copy.hero.statsStrip" :key="s.v" class="px-6 lg:px-10 py-4 lg:py-0">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-[10px] tabular-nums text-gray-400">0{{ i + 1 }}</span>
          <span v-if="i === 0" class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {{ copy.ui.liveLabel }}
          </span>
        </div>
        <p class="text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tight leading-none bg-gradient-to-br from-primary to-secondary-600 dark:from-white dark:to-secondary-400 bg-clip-text text-transparent">
          {{ s.k }}
        </p>
        <p class="mt-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] max-w-[12rem] leading-snug">{{ s.v }}</p>
      </div>
    </div>
  </section>

  <!-- ════════════════════════ WHY — editorial numbered list ════════════════════════ -->
  <section id="why" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Giant decorative numeral -->
    <div aria-hidden="true" class="pointer-events-none absolute -top-16 -end-12 text-[28rem] leading-[0.8] font-black text-black/[0.025] dark:text-white/[0.03] select-none hidden lg:block tabular-nums">01</div>

    <div class="max-w-6xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="1"
        :label="copy.why.eyebrow"
        :heading="`${copy.why.h2a} ${copy.why.h2b}`"
        :sub="copy.why.body"
      />

      <!-- Numbered list, hairline dividers, no cards -->
      <ol class="border-t border-black/10 dark:border-white/10">
        <li v-for="(d, i) in copy.why.items" :key="d.title"
          class="group grid grid-cols-12 gap-4 sm:gap-6 py-8 sm:py-12 border-b border-black/10 dark:border-white/10 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.015]"
        >
          <!-- Number -->
          <div class="col-span-2 sm:col-span-1">
            <p class="text-sm text-gray-400 tabular-nums">0{{ i + 1 }}</p>
          </div>
          <!-- Icon -->
          <div class="col-span-10 sm:col-span-2 lg:col-span-1 flex items-start">
            <UIcon :name="whyIcons[i] || 'i-lucide-star'" class="size-6 text-secondary-500 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
          </div>
          <!-- Title -->
          <div class="col-span-12 sm:col-span-4">
            <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">{{ d.title }}</h3>
          </div>
          <!-- Body -->
          <div class="col-span-12 sm:col-span-5 lg:col-span-6 flex items-center">
            <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{{ d.body }}</p>
          </div>
        </li>
      </ol>

      <div class="mt-12">
        <NuxtLink to="/portal/features" class="group inline-flex items-center gap-3 text-base font-bold">
          <span class="size-12 rounded-full bg-primary dark:bg-white text-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <UIcon name="i-lucide-arrow-right" class="size-5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
          <span class="relative">
            {{ copy.ui.allFeatureAreas }}
            <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current origin-start scale-x-100 group-hover:bg-secondary-500 transition-colors" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- ════════════════════════ MODULES — auto-rotating explorer ════════════════════════ -->
  <LandingModuleExplorer />

  <!-- ════════════════════════ INDUSTRIES — big type list ════════════════════════ -->
  <section class="relative py-24 sm:py-32 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />

    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="3"
        :label="copy.industries.eyebrow"
        :heading="copy.industries.heading"
        :sub="copy.industries.sub"
        :count="copy.industries.items.length"
      />

      <!-- Industry list: each row is a huge hoverable entry with stat -->
      <ul class="border-t border-black/10 dark:border-white/10">
        <li v-for="(ind, i) in copy.industries.items" :key="ind.id"
          class="group relative overflow-hidden border-b border-black/10 dark:border-white/10"
        >
          <NuxtLink :to="`/portal/showcase#${ind.id}`" class="relative block">
            <!-- Sliding tint from end to start on hover -->
            <div aria-hidden="true" class="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r transition-opacity duration-500" :class="industryVisuals[ind.id]?.tint" />

            <div class="relative z-10 grid grid-cols-12 gap-4 items-center py-6 sm:py-8 px-3 sm:px-6 transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
              <!-- Index -->
              <div class="col-span-2 sm:col-span-1">
                <span class="text-xs tabular-nums text-gray-400">0{{ i + 1 }}</span>
              </div>
              <!-- Icon (rotates in on hover) -->
              <div class="col-span-2 sm:col-span-1 flex">
                <UIcon
                  :name="industryVisuals[ind.id]?.icon"
                  class="size-6 text-gray-400 group-hover:text-primary dark:group-hover:text-white transition-all duration-300 group-hover:rotate-[-8deg]"
                  :class="industryVisuals[ind.id]?.tint?.split(' ')?.slice(-2)?.join(' ')"
                />
              </div>
              <!-- Huge label -->
              <div class="col-span-8 sm:col-span-7 lg:col-span-8">
                <h3 class="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-none">
                  <span class="relative inline-block">
                    <span class="text-black/30 dark:text-white/20 group-hover:text-primary dark:group-hover:text-white transition-colors duration-300">{{ ind.label }}</span>
                  </span>
                </h3>
              </div>
              <!-- Tagline (appears on hover) -->
              <div class="hidden sm:block sm:col-span-3 lg:col-span-2 text-end">
                <div class="inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-[-0.5rem] group-hover:translate-x-0 rtl:translate-x-[0.5rem] rtl:group-hover:translate-x-0 transition-all duration-300">
                  <span class="text-xs font-semibold text-primary dark:text-white">{{ ind.tagline }}</span>
                  <UIcon name="i-lucide-arrow-up-right" class="size-4 text-secondary-500" />
                </div>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>

  <!-- ════════════════════════ ADD-ONS — editorial directory by chapter ════════════════════════ -->
  <section id="addons" class="relative py-24 sm:py-32 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />
    <!-- Soft color bands behind the section, tied to the 5 category hues -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30">
      <div class="absolute top-[10%] start-[-10rem] w-80 h-80 rounded-full bg-emerald-300 blur-[120px] opacity-30" />
      <div class="absolute top-[40%] end-[-10rem] w-80 h-80 rounded-full bg-sky-300 blur-[120px] opacity-30" />
      <div class="absolute bottom-[10%] start-1/3 w-80 h-80 rounded-full bg-rose-300 blur-[120px] opacity-20" />
    </div>

    <div class="relative max-w-7xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="4"
        :label="copy.addons.eyebrow"
        :heading="copy.addons.heading"
        :sub="copy.addons.sub"
      />

      <!-- CTA + category jump-nav -->
      <div class="flex flex-wrap items-center gap-x-6 gap-y-3 mb-16 sm:mb-20">
        <NuxtLink to="/portal/addons" class="group inline-flex items-center gap-3 text-sm font-bold">
          <span class="size-10 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
          </span>
          <span class="relative">
            {{ copy.addons.linkAll }}
            <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover:bg-secondary-500 transition-colors" />
          </span>
        </NuxtLink>
        <span aria-hidden="true" class="h-8 w-px bg-black/10 dark:bg-white/10 mx-2" />
        <span class="text-xs uppercase tracking-[0.2em] text-gray-400">{{ copy.ui.chaptersLabel }}</span>
        <a v-for="(cat, ci) in addonCategories" :key="cat.name" :href="`#addons-${cat.name.toLowerCase()}`"
          class="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
        >
          <span class="size-1.5 rounded-full" :class="catPalette[cat.name].dot" />
          {{ String(ci + 1).padStart(2, '0') }} · {{ copy.ui.addonCategoryLabels[cat.name] }}
          <span class="text-gray-400 normal-case tracking-normal">({{ cat.items.length }})</span>
        </a>
      </div>

      <!-- Directory chapters -->
      <div class="space-y-16 sm:space-y-24">
        <div v-for="(cat, ci) in addonCategories" :key="cat.name" :id="`addons-${cat.name.toLowerCase()}`">
          <!-- Chapter header: big category name, count, hairline rule -->
          <div class="flex items-end justify-between pb-5 mb-10 border-b border-black/10 dark:border-white/10">
            <div class="flex items-baseline gap-4 sm:gap-6 min-w-0">
              <span class="shrink-0 text-sm tabular-nums text-gray-400">{{ String(ci + 1).padStart(2, '0') }}</span>
              <div class="flex items-baseline gap-3 min-w-0">
                <span aria-hidden="true" class="size-2.5 rounded-full shrink-0" :class="catPalette[cat.name].dot" />
                <h3 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase truncate" :class="catPalette[cat.name].accent">
                  {{ copy.ui.addonCategoryLabels[cat.name] }}
                </h3>
              </div>
            </div>
            <span class="shrink-0 text-[10px] uppercase tracking-[0.25em] text-gray-400">
              {{ String(cat.items.length).padStart(2, '0') }} / {{ cat.items.length === 1 ? 'add-on' : 'add-ons' }}
            </span>
          </div>

          <!-- Addon grid inside chapter -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            <NuxtLink v-for="a in cat.items" :key="a.key" :to="`/portal/addons/${a.key}`"
              class="group relative flex items-start gap-4"
            >
              <!-- Tinted icon square — no border, just a soft bg panel -->
              <div class="shrink-0 size-12 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110" :class="catPalette[cat.name].iconBg">
                <UIcon :name="addonMeta[a.key]?.icon" class="size-5" :class="catPalette[cat.name].iconText" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base sm:text-lg font-bold leading-tight">
                  <span class="relative inline-block align-baseline">
                    {{ a.label }}
                    <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-[1.5px] origin-start scale-x-0 group-hover:scale-x-100 transition-transform duration-300" :class="catPalette[cat.name].dot" />
                  </span>
                </h4>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ a.desc }}</p>
              </div>
              <!-- Arrow on hover — hints at navigation -->
              <UIcon aria-hidden="true" name="i-lucide-arrow-up-right" class="hidden sm:block shrink-0 mt-1.5 size-4 text-gray-300 dark:text-gray-700 group-hover:text-primary dark:group-hover:text-white transition-colors" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Closing tagline -->
      <p class="mt-20 flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-[0.25em]">
        <span class="size-1.5 rounded-full bg-emerald-500" />
        {{ copy.ui.allSixteenShip }}
      </p>
    </div>
  </section>

  <!-- ════════════════════════ PORTAL — 3 tenants, 1 source ════════════════════════ -->
  <section class="relative py-24 sm:py-32 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />
    <!-- Three color washes matching the three tenant brands -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20">
      <div class="absolute top-[10%] start-[-8rem] w-96 h-96 rounded-full bg-rose-300 blur-[140px]" />
      <div class="absolute top-[20%] start-1/2 w-96 h-96 rounded-full bg-sky-300 blur-[140px]" />
      <div class="absolute top-[10%] end-[-8rem] w-96 h-96 rounded-full bg-emerald-300 blur-[140px]" />
    </div>

    <div class="relative max-w-7xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="5"
        :label="copy.portal.eyebrow"
        :heading="copy.portal.heading"
        :sub="copy.portal.sub"
      />

      <!-- Metrics row + CTA -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-12 max-w-3xl">
        <div>
          <div class="flex items-center gap-0.5 text-amber-500 mb-1.5">
            <UIcon v-for="n in 5" :key="n" name="i-lucide-star" class="size-3" />
          </div>
          <p class="text-4xl font-black leading-none">4.9</p>
          <p class="mt-1 text-[10px] text-gray-500 uppercase tracking-[0.2em]">{{ copy.ui.appRatingLabel }}</p>
        </div>
        <div>
          <UIcon name="i-lucide-zap" class="size-5 text-secondary-500 mb-1.5" />
          <p class="text-4xl font-black leading-none">&lt; 1s</p>
          <p class="mt-1 text-[10px] text-gray-500 uppercase tracking-[0.2em]">{{ copy.ui.timeToBookLabel }}</p>
        </div>
        <div>
          <UIcon name="i-lucide-wifi-off" class="size-5 text-emerald-500 mb-1.5" />
          <p class="text-4xl font-black leading-none">{{ copy.ui.offlineLabel }}</p>
          <p class="mt-1 text-[10px] text-gray-500 uppercase tracking-[0.2em]">{{ copy.ui.pwaReadyLabel }}</p>
        </div>
      </div>

      <NuxtLink to="/portal/features#portal" class="group inline-flex items-center gap-3 text-sm font-bold mb-16">
        <span class="size-10 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
          <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
        </span>
        <span class="relative">
          {{ copy.portal.cta }}
          <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover:bg-secondary-500 transition-colors" />
        </span>
      </NuxtLink>

      <!-- Feature bullets — hairline list -->
      <ul class="border-t border-black/10 dark:border-white/10 max-w-2xl">
        <li v-for="(f, i) in copy.portal.bullets" :key="f"
          class="group flex items-center gap-4 py-3 border-b border-black/10 dark:border-white/10"
        >
          <span class="text-[10px] text-gray-400 tabular-nums w-6 shrink-0">0{{ i + 1 }}</span>
          <span aria-hidden="true" class="h-px w-4 bg-black/20 dark:bg-white/20 group-hover:w-10 group-hover:bg-secondary-500 transition-all duration-300" />
          <span class="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">{{ f }}</span>
        </li>
      </ul>

      <!-- ═══ Tenant showcase — clean editorial grid ═══ -->
      <div class="mt-20 pt-16 border-t border-black/10 dark:border-white/10">
        <!-- Section sub-header -->
        <div class="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <div>
            <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.ui.threeTenantsLabel }}</p>
            <h3 class="mt-3 text-2xl sm:text-3xl font-black tracking-tight">{{ copy.ui.oneSourceThreeBrands }}</h3>
          </div>
          <p class="text-sm text-gray-500 max-w-xs">{{ copy.ui.threeBrandsTagline }}</p>
        </div>

        <!-- Phones row — horizontal scroll on mobile, 3-col grid on desktop -->
        <div class="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-visible scrollbar-none snap-x lg:snap-none pb-4 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0">
          <figure
            v-for="(t, i) in tenantBrands" :key="t.slug"
            class="group shrink-0 lg:shrink snap-center w-[78%] sm:w-[55%] lg:w-auto"
          >
            <!-- Phone stage -->
            <div class="relative mx-auto w-[240px] flex justify-center">
              <!-- Brand color wash behind phone -->
              <div aria-hidden="true" class="absolute -inset-6 bg-gradient-to-br opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40" :class="t.grad" />

              <!-- Phone -->
              <div
                class="relative w-full aspect-[9/19] rounded-[2.5rem] p-2.5 bg-primary shadow-2xl shadow-black/20 transition-transform duration-500 group-hover:-translate-y-2"
              >
                <div class="w-full h-full rounded-[2rem] bg-white dark:bg-[#0c0c0c] overflow-hidden relative">
                  <!-- Notch -->
                  <div class="absolute top-1.5 start-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-primary z-10" />

                  <div class="pt-9 px-3.5 pb-5 h-full">
                    <!-- Tenant header inside phone -->
                    <div class="flex items-center gap-2 mb-4">
                      <div class="size-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-white font-black text-[10px]" :class="t.grad">{{ t.logo }}</div>
                      <div class="min-w-0">
                        <p class="text-[9px] text-gray-400">{{ copy.portal.welcomeBack }}</p>
                        <p class="text-[11px] font-bold truncate">{{ t.name }}</p>
                      </div>
                      <UIcon name="i-lucide-bell" class="size-3.5 text-gray-400 ms-auto" />
                    </div>

                    <!-- Brand-colored hero card -->
                    <div class="p-2.5 rounded-2xl text-white mb-2.5 bg-gradient-to-br" :class="t.grad">
                      <p class="text-[9px] opacity-80">{{ t.heroLabel }}</p>
                      <p class="text-xl font-black leading-tight">
                        {{ t.heroValue }}
                        <span class="text-[9px] font-medium opacity-80">{{ t.heroUnit }}</span>
                      </p>
                      <div class="mt-2 h-1 rounded-full bg-white/20 overflow-hidden">
                        <div class="h-full bg-white/80 rounded-full" :style="{ width: `${t.heroProgress}%` }" />
                      </div>
                    </div>

                    <!-- Next -->
                    <p class="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{{ copy.portal.nextAppt }}</p>
                    <div class="p-2 rounded-lg bg-gray-50 dark:bg-white/5 mb-3">
                      <div class="flex items-center gap-2">
                        <UIcon :name="t.apptIcon" class="size-3.5" :class="t.accent.replace('bg-', 'text-')" />
                        <div class="flex-1 min-w-0">
                          <p class="text-[11px] font-bold truncate">{{ t.apptTitle }}</p>
                          <p class="text-[9px] text-gray-500">{{ t.apptMeta }}</p>
                        </div>
                        <span class="size-1.5 rounded-full animate-pulse" :class="t.accent" />
                      </div>
                    </div>

                    <!-- Quick actions -->
                    <div class="grid grid-cols-3 gap-1.5">
                      <div v-for="q in t.actions" :key="q.label"
                        class="aspect-square rounded-lg bg-gray-50 dark:bg-white/5 flex flex-col items-center justify-center gap-0.5"
                      >
                        <UIcon :name="q.icon" class="size-3.5" :class="t.accent.replace('bg-', 'text-')" />
                        <p class="text-[8px] font-semibold">{{ q.label }}</p>
                      </div>
                    </div>

                    <!-- Bottom pill — tenant-specific -->
                    <div class="absolute bottom-3 inset-x-3 p-2 rounded-full bg-primary text-white flex items-center gap-2">
                      <div class="size-5 rounded-full bg-gradient-to-br flex items-center justify-center" :class="t.grad">
                        <UIcon :name="t.pill.icon" class="size-2.5 text-white" />
                      </div>
                      <p class="text-[10px] font-medium flex-1 truncate">{{ t.pill.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Caption below the phone -->
            <figcaption class="mt-10 text-center">
              <div class="flex items-center justify-center gap-2 mb-3">
                <span class="text-xs tabular-nums text-gray-400">0{{ i + 1 }} / 03</span>
                <span aria-hidden="true" class="h-px w-6 bg-black/15 dark:bg-white/15" />
                <span class="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                  <span aria-hidden="true" class="size-1.5 rounded-full" :class="t.accent" />
                  {{ t.industry }}
                </span>
              </div>
              <h4 class="text-xl sm:text-2xl font-black tracking-tight">{{ t.name }}</h4>
              <p class="mt-1 text-xs text-gray-400 tracking-wide">{{ t.slug }}.momentfy.io</p>
            </figcaption>
          </figure>
        </div>

        <!-- Mobile scroll hint -->
        <p class="mt-6 lg:hidden text-center text-[10px] uppercase tracking-[0.25em] text-gray-400">
          {{ copy.ui.swipeHint }}
        </p>
      </div>
    </div>
  </section>

  <!-- ════════════════════════ TRUST & SECURITY — 4 pillars ════════════════════════ -->
  <section id="trust" class="relative py-24 sm:py-32 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />

    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="6"
        :label="copy.trust.eyebrow"
        :heading="copy.trust.heading"
        :sub="copy.trust.sub"
      />

      <NuxtLink to="/portal/legal" class="group inline-flex items-center gap-3 text-sm font-bold mb-16">
        <span class="size-10 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
          <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
        </span>
        <span class="relative">
          {{ copy.ui.readLicense }}
          <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover:bg-secondary-500 transition-colors" />
        </span>
      </NuxtLink>

      <!-- 4 pillars in a hairline-separated grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-black/10 dark:border-white/10 lg:divide-x lg:divide-black/10 lg:dark:divide-white/10 rtl:lg:divide-x-reverse">
        <div v-for="(p, i) in copy.trust.pillars" :key="p.title"
          class="group py-8 lg:py-10 lg:px-8 first:lg:ps-0 last:lg:pe-0 border-b md:border-b-0 border-black/10 dark:border-white/10 md:[&:nth-child(2)]:border-b lg:[&:nth-child(2)]:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
        >
          <div class="flex items-center gap-3 mb-5">
            <span class="text-xs tabular-nums text-gray-400">{{ String(i + 1).padStart(2, '0') }}</span>
            <span aria-hidden="true" class="h-px w-6 bg-black/20 dark:bg-white/20" />
            <UIcon :name="p.icon" class="size-5 text-secondary-500 transition-transform group-hover:scale-110 group-hover:-rotate-[6deg]" />
          </div>
          <h3 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-3">{{ p.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ p.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ════════════════════════ PRICING — "pick your update window" ════════════════════════ -->
  <section id="pricing" class="relative py-24 sm:py-32 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />
    <div aria-hidden="true" class="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-secondary-500 blur-[150px] opacity-[0.08] dark:opacity-15 rounded-full" />

    <div class="relative max-w-7xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="7"
        :label="copy.pricing.eyebrow"
        :heading="copy.pricing.heading"
        :sub="copy.pricing.sub"
      />

      <!-- Trust badges — horizontal row -->
      <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 mb-16 sm:mb-20">
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

      <!-- A) What every plan includes — shown once, not repeated 3× -->
      <div class="mb-20">
        <div class="flex items-baseline gap-3 mb-8 pb-4 border-b border-black/10 dark:border-white/10">
          <span class="text-[11px] tabular-nums text-gray-400">A</span>
          <p class="text-[11px] uppercase tracking-[0.25em] text-gray-400">{{ copy.pricing.includedAllLabel }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-8">
          <div v-for="item in copy.pricing.includedAll" :key="item" class="flex items-start gap-3">
            <UIcon name="i-lucide-check" class="size-5 shrink-0 mt-0.5 text-emerald-500" />
            <span class="text-sm sm:text-base font-semibold">{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- B) Pick your update window — the ONLY difference -->
      <div>
        <div class="flex items-baseline gap-3 mb-12 pb-4 border-b border-black/10 dark:border-white/10">
          <span class="text-[11px] tabular-nums text-gray-400">B</span>
          <p class="text-[11px] uppercase tracking-[0.25em] text-gray-400">{{ copy.pricing.windowLabel }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-black/10 lg:dark:divide-white/10 rtl:lg:divide-x-reverse">
          <div v-for="(p, idx) in copy.pricing.plans" :key="p.name"
            class="relative group py-10 lg:py-0 lg:px-10 first:lg:ps-0 last:lg:pe-0 flex flex-col"
            :class="{ 'lg:pt-0': true }"
          >
            <!-- Featured vertical accent -->
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

              <!-- BIG duration — this is the hero of the plan -->
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

              <!-- Coverage bar — visualizes the update window length -->
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
                  <!-- Marker at the end of the bar -->
                  <div
                    v-if="p.durationProgress < 100"
                    aria-hidden="true"
                    class="absolute top-1/2 -translate-y-1/2 size-2 rounded-full ring-2 ring-white dark:ring-black"
                    :class="p.featured ? 'bg-secondary-500' : 'bg-gray-500'"
                    :style="{ insetInlineStart: `calc(${p.durationProgress}% - 0.25rem)` }"
                  />
                </div>
                <!-- Axis labels -->
                <div class="mt-2 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                  <span>{{ copy.pricing.durationAxisStart }}</span>
                  <span
                    v-if="p.durationProgress === 100"
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

              <!-- Price — cleanly paired with the duration above -->
              <div class="mb-8 flex items-baseline gap-2">
                <span class="text-4xl font-black tracking-tight">{{ p.price }}</span>
                <span class="text-xs text-gray-500">{{ p.priceSuffix }}</span>
              </div>

              <!-- CTA -->
              <NuxtLink to="/portal/pricing" class="group/cta inline-flex items-center gap-3 text-sm font-bold mt-auto">
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

      <!-- Footer -->
      <p class="mt-20 flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-[0.2em]">
        <UIcon name="i-simple-icons-lemonsqueezy" class="size-4" />
        {{ copy.pricing.footer }}
      </p>
    </div>
  </section>

  <!-- ════════════════════════ TESTIMONIALS — magazine pull quotes, no cards ════════════════════════ -->
  <section class="relative py-24 sm:py-32 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />
    <div aria-hidden="true" class="absolute top-20 end-[-10rem] w-96 h-96 rounded-full bg-secondary-400 blur-[120px] opacity-10" />

    <div class="max-w-6xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="8"
        :label="copy.testimonials.eyebrow"
        :heading="copy.testimonials.heading"
      >
        <template #meta>
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            <UIcon name="i-lucide-info" class="size-3" />
            {{ copy.ui.illustrative }}
          </span>
        </template>
      </LandingSectionHeading>

      <!-- Full disclaimer row beneath header -->
      <p class="text-sm text-gray-500 dark:text-gray-500 mb-12 max-w-3xl border-t border-black/10 dark:border-white/10 pt-4 flex items-start gap-3">
        <UIcon name="i-lucide-quote" class="size-4 shrink-0 mt-1 text-amber-500" />
        <span>{{ copy.testimonials.disclaimer }}</span>
      </p>

      <!-- Big pull quotes, sequential, hairline dividers -->
      <div class="border-t border-black/10 dark:border-white/10">
        <figure
          v-for="(t, i) in copy.testimonials.items" :key="t.name"
          class="group relative grid grid-cols-12 gap-6 py-10 sm:py-14 border-b border-black/10 dark:border-white/10 transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.01]"
        >
          <!-- Index + giant quote mark -->
          <div class="col-span-12 sm:col-span-2 lg:col-span-1">
            <UIcon name="i-lucide-quote" class="size-10 text-secondary-500/60" />
            <p class="mt-2 text-[10px] tabular-nums text-gray-400">0{{ i + 1 }}</p>
          </div>

          <!-- Big quotation -->
          <blockquote class="col-span-12 sm:col-span-10 lg:col-span-8 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.2] text-primary dark:text-white">
            "{{ t.quote }}"
          </blockquote>

          <!-- Author + metrics for featured -->
          <figcaption class="col-span-12 lg:col-span-3 flex flex-col gap-3 lg:items-end lg:text-end">
            <div class="flex lg:flex-col-reverse lg:items-end gap-3 lg:gap-1">
              <div class="size-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-black text-base" :class="testimonialAccents[i]">{{ t.name.charAt(0) }}</div>
              <div>
                <p class="text-sm font-bold">{{ t.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ t.role }}</p>
              </div>
            </div>
            <!-- Big number for featured -->
            <div v-if="i === 0" class="mt-2 flex lg:flex-col gap-6 lg:gap-1 lg:items-end">
              <div>
                <p class="text-3xl font-black leading-none">3×</p>
                <p class="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{{ copy.ui.revenueLabel }}</p>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- ════════════════════════ FAQ — bare accordion ════════════════════════ -->
  <section class="relative py-24 sm:py-32 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />

    <div class="max-w-6xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="9"
        :label="copy.faq.eyebrow"
        :heading="copy.faq.heading"
        :sub="copy.ui.cantFindFaq"
      />

      <NuxtLink to="/portal/faq" class="group inline-flex items-center gap-3 text-sm font-bold mb-14">
        <span class="size-10 rounded-full bg-primary dark:bg-white text-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
          <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
        </span>
        <span class="relative">
          {{ copy.faq.linkAll }}
          <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover:bg-secondary-500 transition-colors" />
        </span>
      </NuxtLink>

      <!-- Bare accordion — just horizontal rules -->
      <div class="border-t border-black/10 dark:border-white/10">
        <div v-for="(f, i) in copy.faq.items" :key="i"
          class="group border-b border-black/10 dark:border-white/10"
          :class="faqOpen === i ? 'bg-black/[0.02] dark:bg-white/[0.02]' : 'hover:bg-black/[0.015] dark:hover:bg-white/[0.01]'"
        >
          <button class="w-full grid grid-cols-12 gap-4 items-center py-6 sm:py-7 px-3 sm:px-6 text-start transition-colors" @click="faqOpen = faqOpen === i ? -1 : i">
            <span class="col-span-2 sm:col-span-1 text-xs tabular-nums text-gray-400">0{{ i + 1 }}</span>
            <span class="col-span-8 sm:col-span-10 text-lg sm:text-xl lg:text-2xl font-bold tracking-tight leading-tight">{{ f.q }}</span>
            <span class="col-span-2 sm:col-span-1 flex justify-end">
              <span class="size-9 rounded-full flex items-center justify-center transition-all border border-black/10 dark:border-white/15"
                :class="faqOpen === i ? 'bg-primary text-white border-primary rotate-180' : 'group-hover:border-secondary-500/40'"
              >
                <UIcon :name="faqOpen === i ? 'i-lucide-minus' : 'i-lucide-plus'" class="size-4" />
              </span>
            </span>
          </button>
          <Transition
            enter-active-class="transition-all duration-300 ease-out overflow-hidden"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-200 ease-in overflow-hidden"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="faqOpen === i" class="grid grid-cols-12 gap-4 pb-6 sm:pb-8 px-3 sm:px-6">
              <div class="col-span-2 sm:col-span-1" />
              <p class="col-span-10 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">{{ f.a }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>

  <!-- ════════════════════════ FINAL CTA ════════════════════════ -->
  <LandingCTA />
</template>
