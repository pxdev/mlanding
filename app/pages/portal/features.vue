<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const copy = useLandingCopy()
const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'ar' ? 'المميزات — Momentfy' : 'Features — Momentfy',
  meta: [{
    name: 'description',
    content: locale.value === 'ar'
      ? 'كل وحدة، كل شاشة. تقويم، مبيعات، مخزون، عملاء، محاسبة، موارد بشرية، تقارير، بوابة عميل وذكاء اصطناعي — في كود واحد.'
      : 'Every module, every screen. Calendar, sales, inventory, clients, accounting, HR, reports, client portal and AI — in one codebase.'
  }]
}))

// ── Icons + gradients per feature id
const visuals: Record<string, { icon: string; color: string }> = {
  calendar: { icon: 'i-lucide-calendar-days', color: 'from-violet-500 to-fuchsia-500' },
  sales: { icon: 'i-lucide-store', color: 'from-amber-500 to-orange-600' },
  clients: { icon: 'i-lucide-users-round', color: 'from-sky-500 to-blue-600' },
  catalogue: { icon: 'i-lucide-layers', color: 'from-pink-500 to-rose-600' },
  inventory: { icon: 'i-lucide-package', color: 'from-teal-500 to-emerald-600' },
  team: { icon: 'i-lucide-user-check', color: 'from-indigo-500 to-purple-600' },
  accounting: { icon: 'i-lucide-book-open', color: 'from-stone-500 to-neutral-700' },
  reports: { icon: 'i-lucide-bar-chart-3', color: 'from-cyan-500 to-sky-600' },
  portal: { icon: 'i-lucide-smartphone', color: 'from-lime-500 to-green-600' },
  'multi-tenant': { icon: 'i-lucide-building-2', color: 'from-fuchsia-500 to-pink-600' },
  i18n: { icon: 'i-lucide-languages', color: 'from-rose-500 to-red-500' },
  'self-hosted': { icon: 'i-lucide-server', color: 'from-slate-500 to-zinc-700' },
  zatca: { icon: 'i-lucide-shield-check', color: 'from-emerald-500 to-green-600' },
  eta: { icon: 'i-lucide-file-check', color: 'from-amber-500 to-yellow-600' },
  ai: { icon: 'i-lucide-sparkles', color: 'from-violet-500 to-indigo-600' },
  'reviews-loyalty': { icon: 'i-lucide-award', color: 'from-yellow-500 to-amber-600' }
}

function splitHeading(s: string) {
  if (!s) return { first: '', rest: '' }
  const idx = s.search(/[.،,]/)
  if (idx < 0 || idx === s.length - 1) return { first: s, rest: '' }
  return { first: s.slice(0, idx + 1).trim(), rest: s.slice(idx + 1).trim() }
}
const h1 = computed(() => splitHeading(copy.value.featuresPage.h1))

const activeGroup = ref<string>('all')
const filtered = computed(() => {
  if (activeGroup.value === 'all') return copy.value.featuresPage.items
  return copy.value.featuresPage.items.filter(f => f.group === activeGroup.value)
})

const chips = computed(() => {
  const set = new Set<string>()
  copy.value.featuresPage.items.forEach(f => set.add(f.group))
  return [{ key: 'all', label: copy.value.featuresPage.filterAll }, ...Array.from(set).map(g => ({
    key: g,
    label: copy.value.featuresPage.groups[g] || g
  }))]
})

// Return a detail-page path for a feature id if one exists, else null.
const moduleIds = computed(() => new Set(copy.value.modules.items.map(m => m.id)))
const addonKeys = computed(() => new Set(copy.value.addons.items.map(a => a.key)))
function detailLink(id: string) {
  if (moduleIds.value.has(id)) return `/portal/modules/${id}`
  if (addonKeys.value.has(id)) return `/portal/addons/${id}`
  return null
}
</script>

<template>
  <!-- ═══ Hero ═══ -->
  <section class="relative py-20 sm:py-28 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-0 -z-10">
      <div class="absolute -top-20 start-1/3 w-[32rem] h-[32rem] bg-secondary-500 blur-[140px] opacity-[0.12] rounded-full" />
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.featuresPage.eyebrow }}</p>
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-500 max-w-[16rem]">{{ copy.featuresPage.sub }}</p>
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

  <!-- ═══ Filter chips — sticky, editorial ═══ -->
  <section class="sticky top-16 z-20 bg-white/85 dark:bg-black/80 backdrop-blur-xl border-y border-black/10 dark:border-white/10">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center gap-1 overflow-x-auto scrollbar-none">
      <button
        v-for="c in chips" :key="c.key"
        type="button"
        class="group relative shrink-0 px-4 h-9 text-xs uppercase tracking-[0.2em] transition-colors"
        :class="activeGroup === c.key
          ? 'text-primary dark:text-white font-bold'
          : 'text-gray-400 hover:text-primary dark:hover:text-white'"
        @click="activeGroup = c.key"
      >
        {{ c.label }}
        <span v-if="activeGroup === c.key" aria-hidden="true" class="absolute inset-x-4 -bottom-px h-0.5 bg-primary dark:bg-white" />
      </button>
    </div>
  </section>

  <!-- ═══ Feature list — editorial rows, no cards ═══ -->
  <section class="py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 border-t border-black/10 dark:border-white/10">
      <article
        v-for="(f, i) in filtered" :key="f.id" :id="f.id"
        class="group relative grid grid-cols-12 gap-6 lg:gap-12 py-12 sm:py-16 border-b border-black/10 dark:border-white/10"
      >
        <!-- Left: index, icon, title, summary, bullets -->
        <div class="col-span-12 lg:col-span-7 flex flex-col">
          <div class="flex items-baseline gap-3 mb-6">
            <span class="text-xs tabular-nums text-gray-400">{{ String(i + 1).padStart(2, '0') }}</span>
            <span aria-hidden="true" class="h-px w-6 bg-black/20 dark:bg-white/20" />
            <span class="text-xs uppercase tracking-[0.2em] text-gray-500">{{ copy.featuresPage.groups[f.group] || f.group }}</span>
          </div>

          <!-- Small gradient icon tile above the title -->
          <div class="size-12 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center shadow-lg mb-5 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-[6deg]" :class="visuals[f.id]?.color">
            <UIcon :name="visuals[f.id]?.icon" class="size-5" />
          </div>

          <h2 class="font-black tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl">{{ f.title }}</h2>
          <p class="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">{{ f.summary }}</p>

          <!-- Hairline + bullet list -->
          <ul class="mt-8 pt-6 border-t border-black/10 dark:border-white/10 grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl">
            <li v-for="b in f.bullets" :key="b" class="flex items-start gap-2.5 text-sm">
              <UIcon name="i-lucide-check" class="size-4 shrink-0 mt-0.5 text-emerald-500" />
              <span class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ b }}</span>
            </li>
          </ul>

          <!-- "Read in detail" link to the dedicated module or add-on page (only when one exists) -->
          <NuxtLink v-if="detailLink(f.id)" :to="detailLink(f.id)!"
            class="group/read mt-8 inline-flex items-center gap-3 text-sm font-bold self-start"
          >
            <span class="size-10 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover/read:scale-110">
              <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
            </span>
            <span class="relative">
              {{ copy.ui.readAbout }} {{ f.title }}
              <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover/read:bg-secondary-500 transition-colors" />
            </span>
          </NuxtLink>
        </div>

        <!-- Right: mock, soft-bg frame + gradient accent stripe (no border) -->
        <div class="col-span-12 lg:col-span-5 relative">
          <div class="sticky top-32 rounded-2xl bg-gray-50 dark:bg-white/[0.025] overflow-hidden">
            <div aria-hidden="true" class="h-0.5 bg-gradient-to-r opacity-80" :class="visuals[f.id]?.color" />
            <div class="p-5 sm:p-6">
              <LandingModuleMock :id="f.id" :color="visuals[f.id]?.color" />
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>

  <LandingCTA />
</template>
