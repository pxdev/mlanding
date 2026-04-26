<script setup>
definePageMeta({ layout: 'landing' });
const copy = useLandingCopy();
const { locale } = useI18n();
useLandingSeo({
    ar: {
        title: 'المميزات — Momentfy',
        description: 'كل وحدة، كل شاشة، تحت سقف واحد: التقويم، المبيعات، المخزون، العملاء، المحاسبة، الموارد البشرية، التقارير، بوابة العميل، والمساعد الذكي — في كود واحد متماسك.'
    },
    en: {
        title: 'Features — Momentfy',
        description: 'Every module, every screen. Calendar, sales, inventory, clients, accounting, HR, reports, client portal and AI — in one codebase.'
    }
});
// ── Icons + gradients per feature id
const visuals = {
    calendar: { icon: 'i-lucide-calendar-days', color: 'from-violet-500 to-fuchsia-500' },
    sales: { icon: 'i-lucide-store', color: 'from-amber-500 to-orange-600' },
    clients: { icon: 'i-lucide-users-round', color: 'from-sky-500 to-blue-600' },
    marketing: { icon: 'i-lucide-megaphone', color: 'from-orange-500 to-red-500' },
    catalogue: { icon: 'i-lucide-layers', color: 'from-pink-500 to-rose-600' },
    inventory: { icon: 'i-lucide-package', color: 'from-teal-500 to-emerald-600' },
    events: { icon: 'i-lucide-ticket', color: 'from-purple-500 to-violet-600' },
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
    'reviews-loyalty': { icon: 'i-lucide-award', color: 'from-yellow-500 to-amber-600' },
    notifications: { icon: 'i-lucide-bell', color: 'from-sky-500 to-blue-600' },
    'workspace-control': { icon: 'i-lucide-settings', color: 'from-slate-500 to-zinc-700' },
    'activity-logs': { icon: 'i-lucide-history', color: 'from-rose-500 to-pink-600' }
};
// Official authority logos shown under the mock for compliance features
const featureLogos = {
    zatca: '/logos/zatca.png',
    eta: '/logos/eta.png'
};
// Spotlight feature shown in the hero teaser. Prefers `ai` (most marquee),
// falls back to `calendar` (the booking core), then to whatever's first
// in copy. Always returns a feature row from copy.featuresPage.items.
const spotlight = computed(() => {
    const items = copy.value.featuresPage.items;
    return items.find(f => f.id === 'ai')
        || items.find(f => f.id === 'calendar')
        || items[0]
        || null;
});

// Quick-credibility stats shown in the ribbon under the headline.
const heroStats = computed(() => [
    { value: copy.value.featuresPage.items.length, label: copy.value.featuresPage.eyebrow || 'features' },
    { value: copy.value.modules.items.length, label: copy.value.modules.eyebrow || 'modules' },
    { value: copy.value.addons.items.length, label: copy.value.addons.eyebrow || 'add-ons' }
]);

// Marquee track — every feature name doubled so the CSS animation loops
// seamlessly. We render it twice (aria-hidden on the duplicate) so the
// scroll has no gap at the wrap-around point.
const marqueeTrack = computed(() => copy.value.featuresPage.items.map(f => f.title));
const activeGroup = ref('all');
const filtered = computed(() => {
    if (activeGroup.value === 'all')
        return copy.value.featuresPage.items;
    return copy.value.featuresPage.items.filter(f => f.group === activeGroup.value);
});
const chips = computed(() => {
    const items = copy.value.featuresPage.items;
    const groups = new Map();
    for (const f of items) {
        groups.set(f.group, (groups.get(f.group) || 0) + 1);
    }
    return [
        { id: 'all', label: copy.value.featuresPage.filterAll, count: items.length },
        ...Array.from(groups.entries()).map(([g, count]) => ({
            id: g,
            label: copy.value.featuresPage.groups[g] || g,
            count
        }))
    ];
});
// Return a detail-page path for a feature id if one exists, else null.
const moduleIds = computed(() => new Set(copy.value.modules.items.map(m => m.id)));
const addonKeys = computed(() => new Set(copy.value.addons.items.map(a => a.key)));
function detailLink(id) {
    if (moduleIds.value.has(id))
        return `/portal/modules/${id}`;
    if (addonKeys.value.has(id))
        return `/portal/addons/${id}`;
    return null;
}
function manualLink(id) {
    return manualLinkForFeature(id);
}
</script>

<template>
  <!-- ═══ Hero — breadcrumb + tight headline + stats + spotlight + marquee ═══ -->
  <LandingPageHero
    :crumb-label="copy.featuresPage.eyebrow"
    :headline="copy.featuresPage.h1"
    :sub="copy.featuresPage.sub"
  >
    <template #background>
      <div class="absolute -top-20 start-1/4 w-[min(32rem,80vw)] h-[min(32rem,80vw)] bg-secondary-500 blur-[140px] opacity-[0.10] rounded-full" />
      <div class="absolute top-40 end-1/4 w-[min(28rem,80vw)] h-[min(28rem,80vw)] bg-sky-500 blur-[140px] opacity-[0.08] rounded-full" />
    </template>

    <!-- Stat ribbon -->
    <dl class="mt-8 grid grid-cols-3 sm:flex sm:flex-wrap sm:items-center gap-x-6 gap-y-4 sm:gap-y-3 text-sm">
      <template v-for="(s, i) in heroStats" :key="i">
        <span v-if="i > 0" aria-hidden="true" class="hidden sm:inline-block w-px h-6 bg-black/10 dark:bg-white/10" />
        <div class="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 min-w-0">
          <dt class="text-xl sm:text-2xl lg:text-3xl font-black tabular-nums tracking-tight">{{ s.value }}</dt>
          <dd class="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 truncate">{{ s.label }}</dd>
        </div>
      </template>
    </dl>

    <!-- Spotlight feature card -->
    <div v-if="spotlight" class="mt-12 sm:mt-14">
      <div class="flex items-center gap-3 mb-4">
        <span aria-hidden="true" class="h-px w-8 bg-secondary-500" />
        <p class="text-[10px] uppercase tracking-[0.25em] text-secondary-600 dark:text-secondary-400 font-bold">
          {{ copy.featuresPage.spotlightLabel || 'Spotlight' }}
        </p>
      </div>

      <component
        :is="detailLink(spotlight.id) ? 'NuxtLink' : 'div'"
        :to="detailLink(spotlight.id) || undefined"
        class="group relative block overflow-hidden rounded-3xl bg-white dark:bg-white/[0.03] ring-1 ring-black/10 dark:ring-white/10 hover:ring-secondary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary-500/15 hover:-translate-y-0.5"
      >
        <!-- Soft brand wash bleeding from the end -->
        <div
          aria-hidden="true"
          class="absolute inset-y-0 end-0 w-2/5 bg-gradient-to-l opacity-[0.10] pointer-events-none"
          :class="visuals[spotlight.id]?.color"
        />
        <!-- Floating "Featured" pulse pill, top-end -->
        <div class="absolute top-3 end-3 sm:top-4 sm:end-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-500/10 ring-1 ring-secondary-500/30 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-secondary-700 dark:text-secondary-300">
          <span aria-hidden="true" class="relative flex size-1.5">
            <span class="absolute inline-flex h-full w-full rounded-full bg-secondary-500 opacity-75 animate-ping" />
            <span class="relative inline-flex rounded-full size-1.5 bg-secondary-500" />
          </span>
          {{ copy.featuresPage.spotlightLabel || 'Spotlight' }}
        </div>

        <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-5 pt-12 sm:p-7 sm:pt-14 lg:p-8 lg:pt-8 items-center">
          <!-- Left: icon tile + content -->
          <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 sm:gap-6 items-start sm:items-center">
            <!-- Big gradient icon tile -->
            <div
              class="size-14 sm:size-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-xl shrink-0 transition-transform duration-500 group-hover:rotate-3"
              :class="visuals[spotlight.id]?.color"
            >
              <UIcon :name="visuals[spotlight.id]?.icon" class="size-6 sm:size-8" />
            </div>

            <div class="min-w-0">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">
                {{ copy.featuresPage.groups[spotlight.group] || spotlight.group }}
              </p>
              <h2 class="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight">
                {{ spotlight.title }}
              </h2>
              <p class="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ spotlight.summary }}
              </p>
              <ul v-if="spotlight.sections?.length" class="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <li
                  v-for="s in spotlight.sections.slice(0, 3)"
                  :key="s.heading"
                  class="inline-flex items-center gap-1.5"
                >
                  <UIcon name="i-lucide-check" class="size-3 text-emerald-500 shrink-0" />
                  <span class="truncate font-semibold">{{ s.heading }}</span>
                </li>
              </ul>
              <!-- Explicit CTA pill -->
              <div class="mt-5">
                <span class="inline-flex items-center gap-2 ps-4 pe-4 h-10 rounded-full bg-primary text-white dark:bg-white dark:text-primary text-sm font-bold transition-all">
                  {{ copy.featuresPage.spotlightCta || copy.featuresPage.readMore || 'Read in detail' }}
                  <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </span>
              </div>
            </div>
          </div>

          <!-- Right: themed mini-preview tile (md+ only — keeps mobile layout calm) -->
          <div class="lg:col-span-5 hidden md:block">
            <div
              class="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br"
              :class="visuals[spotlight.id]?.color"
            >
              <!-- Grid lines -->
              <div
                aria-hidden="true"
                class="absolute inset-0 opacity-25"
                style="background-image:linear-gradient(to right,rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.4) 1px,transparent 1px);background-size:32px 32px"
              />
              <!-- Soft white glow -->
              <div aria-hidden="true" class="absolute -top-12 -end-12 size-48 rounded-full bg-white/30 blur-3xl" />
              <!-- Centered icon (huge, low opacity) -->
              <UIcon
                :name="visuals[spotlight.id]?.icon"
                class="absolute inset-0 m-auto size-20 lg:size-28 text-white/40"
              />
              <!-- Mock "stats line" along the bottom -->
              <div class="absolute inset-x-4 bottom-4 lg:inset-x-5 lg:bottom-5 flex items-end gap-1.5">
                <span
                  v-for="(h, i) in [40, 65, 50, 80, 55, 90, 70, 100, 85]"
                  :key="i"
                  class="flex-1 rounded-t-sm bg-white/70"
                  :style="{ height: `${h * 0.35}px` }"
                />
              </div>
            </div>
          </div>
        </div>
      </component>
    </div>

    <!-- Marquee strip — every feature title cycling, sense-of-breadth -->
    <div
      v-if="marqueeTrack.length"
      class="relative mt-10 -mx-5 sm:-mx-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden="true"
    >
      <div class="flex gap-10 py-4 whitespace-nowrap animate-features-marquee">
        <span
          v-for="(t, i) in [...marqueeTrack, ...marqueeTrack]"
          :key="i"
          class="inline-flex items-center gap-3 text-base sm:text-lg font-black tracking-tight text-black/30 dark:text-white/25"
        >
          {{ t }}
          <span class="size-1.5 rounded-full bg-secondary-500/60" />
        </span>
      </div>
    </div>
  </LandingPageHero>

  <LandingChapterNav :items="chips" as-filter v-model:active="activeGroup" />

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

          <!-- Hairline + section list (submenu heading + description) -->
          <dl class="mt-8 pt-6 border-t border-black/10 dark:border-white/10 grid sm:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
            <div v-for="s in f.sections" :key="s.heading" class="flex flex-col gap-1.5">
              <dt class="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                <span aria-hidden="true" class="size-1.5 rounded-full bg-secondary-500 shrink-0" />
                <span>{{ s.heading }}</span>
              </dt>
              <dd class="ps-3.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ s.body }}</dd>
            </div>
          </dl>

          <!-- "Read in detail" + manual links — pill row, same height, vertically aligned -->
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <NuxtLink v-if="detailLink(f.id)" :to="detailLink(f.id)"
              class="group/read inline-flex items-center h-10 gap-2 ps-4 pe-4 rounded-full bg-primary text-white dark:bg-white dark:text-primary text-sm font-bold transition-transform hover:-translate-y-0.5"
            >
              <span>{{ copy.ui.readAbout }} {{ f.title }}</span>
              <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180 transition-transform group-hover/read:translate-x-0.5 rtl:group-hover/read:-translate-x-0.5" />
            </NuxtLink>
            <NuxtLink v-if="manualLink(f.id)" :to="manualLink(f.id)"
              class="group/manual inline-flex items-center h-10 gap-2 ps-3 pe-4 rounded-full bg-black/[0.04] dark:bg-white/[0.06] ring-1 ring-black/10 dark:ring-white/10 text-sm font-semibold hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-colors"
            >
              <UIcon name="i-lucide-book-open" class="size-4" />
              <span>{{ copy.ui.openInManual }}</span>
              <UIcon name="i-lucide-arrow-right" class="size-3.5 rtl:rotate-180 transition-transform group-hover/manual:translate-x-0.5 rtl:group-hover/manual:-translate-x-0.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Right: mock, soft-bg frame + gradient accent stripe (no border) -->
        <div class="col-span-12 lg:col-span-5 relative">
          <div class="sticky top-32 rounded-2xl bg-gray-50 dark:bg-white/[0.025] overflow-hidden">
            <div class="p-5 sm:p-6">
              <LandingModuleMock :id="f.id" :color="visuals[f.id]?.color" />
            </div>
            <!-- Official authority logo footer (ZATCA, ETA) -->
            <div v-if="featureLogos[f.id]" class="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-black/5 dark:border-white/10 mt-1 flex items-center justify-center gap-3">
              <span class="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{{ copy.ui.officiallyIntegratedWith || 'Officially integrated with' }}</span>
              <div class="h-10 px-3 rounded-lg bg-white ring-1 ring-black/5 shadow-sm flex items-center justify-center">
                <img :src="featureLogos[f.id]" :alt="`${f.title} official logo`" class="h-full max-h-8 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>

  <LandingCTA />
</template>

<style scoped>
/* Marquee for the hero feature-name ticker. The track holds each label
   twice; we shift exactly halfway so the wrap-around is invisible.
   `motion-reduce` users get a static, paused track. */
@keyframes features-marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
.animate-features-marquee {
  animation: features-marquee 40s linear infinite;
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .animate-features-marquee { animation: none; }
}
</style>
