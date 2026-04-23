<script setup>
definePageMeta({ layout: 'landing' });
const copy = useLandingCopy();
const { locale } = useI18n();
const route = useRoute();
const moduleId = computed(() => String(route.params.id || ''));
// Icon + gradient per module id
const visuals = {
    calendar: { icon: 'i-lucide-calendar-days', color: 'from-violet-500 to-fuchsia-500', dot: 'bg-violet-500' },
    sales: { icon: 'i-lucide-store', color: 'from-amber-500 to-orange-600', dot: 'bg-amber-500' },
    clients: { icon: 'i-lucide-users-round', color: 'from-sky-500 to-blue-600', dot: 'bg-sky-500' },
    catalogue: { icon: 'i-lucide-layers', color: 'from-pink-500 to-rose-600', dot: 'bg-pink-500' },
    inventory: { icon: 'i-lucide-package', color: 'from-teal-500 to-emerald-600', dot: 'bg-teal-500' },
    team: { icon: 'i-lucide-user-check', color: 'from-indigo-500 to-purple-600', dot: 'bg-indigo-500' },
    accounting: { icon: 'i-lucide-book-open', color: 'from-stone-500 to-neutral-700', dot: 'bg-stone-500' },
    reports: { icon: 'i-lucide-bar-chart-3', color: 'from-cyan-500 to-sky-600', dot: 'bg-cyan-500' },
    portal: { icon: 'i-lucide-smartphone', color: 'from-lime-500 to-green-600', dot: 'bg-lime-500' }
};
// Which other modules pair well with each one
const integrations = {
    calendar: ['clients', 'team', 'catalogue'],
    sales: ['clients', 'accounting', 'reports'],
    clients: ['calendar', 'sales', 'reports'],
    catalogue: ['sales', 'calendar', 'inventory'],
    inventory: ['catalogue', 'sales', 'accounting'],
    team: ['calendar', 'sales', 'reports'],
    accounting: ['sales', 'inventory', 'reports'],
    reports: ['accounting', 'sales', 'team'],
    portal: ['clients', 'calendar', 'sales']
};
// Video URL per module — accepts YouTube URLs (youtube.com/watch · youtu.be)
// or direct .mp4/.webm paths. Empty values render the "coming soon" state.
//
// Calendar has a sample YouTube URL wired up so the style can be reviewed.
// Swap in your own recordings once they're ready.
const moduleVideos = {
    calendar: { url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', poster: '' }, // sample · replace with the real calendar tour
    sales: { url: '', poster: '' },
    clients: { url: '', poster: '' },
    catalogue: { url: '', poster: '' },
    inventory: { url: '', poster: '' },
    team: { url: '', poster: '' },
    accounting: { url: '', poster: '' },
    reports: { url: '', poster: '' },
    portal: { url: '', poster: '' }
};
const moduleVideo = computed(() => moduleVideos[moduleId.value] || {});
// Look up the module in the list + fall back to featuresPage detail
const moduleEntry = computed(() => copy.value.modules.items.find(m => m.id === moduleId.value));
const feature = computed(() => copy.value.featuresPage.items.find(f => f.id === moduleId.value));
const modules = computed(() => copy.value.modules.items);
const moduleIndex = computed(() => modules.value.findIndex(m => m.id === moduleId.value));
const totalModules = computed(() => String(modules.value.length).padStart(2, '0'));
const visual = computed(() => visuals[moduleId.value]);
const relatedIds = computed(() => integrations[moduleId.value] || []);
const relatedModules = computed(() => relatedIds.value.map(id => modules.value.find(m => m.id === id)).filter(Boolean));
// prev / next navigation
const prevModule = computed(() => moduleIndex.value > 0 ? modules.value[moduleIndex.value - 1] : null);
const nextModule = computed(() => moduleIndex.value < modules.value.length - 1 ? modules.value[moduleIndex.value + 1] : null);
useHead(() => ({
    title: moduleEntry.value
        ? `${moduleEntry.value.label} — Momentfy`
        : 'Module — Momentfy',
    meta: [{
            name: 'description',
            content: feature.value?.summary || moduleEntry.value?.blurb || 'Momentfy module'
        }]
}));
// If the id is unknown, redirect to /portal/features
onMounted(() => {
    if (!moduleEntry.value && typeof window !== 'undefined') {
        navigateTo('/portal/features');
    }
});
</script>

<template>
  <template v-if="moduleEntry">
    <!-- ═══ Hero — compact title block followed by the autoplay video ═══ -->
    <section class="relative pt-10 sm:pt-14 pb-10 sm:pb-14 overflow-hidden">
      <div aria-hidden="true" class="absolute inset-0 -z-10">
        <div class="absolute top-0 start-1/2 -translate-x-1/2 w-[40rem] h-[30rem] blur-[160px] opacity-20 rounded-full bg-gradient-to-br" :class="visual?.color" />
      </div>

      <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs text-gray-500 mb-6" aria-label="Breadcrumb">
          <NuxtLink to="/portal/features" class="hover:text-primary dark:hover:text-white transition-colors uppercase tracking-[0.2em]">{{ copy.ui.breadcrumbFeatures }}</NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="size-3 rtl:rotate-180" />
          <span class="uppercase tracking-[0.2em]">{{ String(moduleIndex + 1).padStart(2, '0') }} / {{ totalModules }}</span>
        </nav>

        <!-- Compact title row: icon + title + blurb -->
        <div class="flex items-center gap-5 sm:gap-6 mb-3">
          <div class="shrink-0 size-14 sm:size-16 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center shadow-xl" :class="visual?.color">
            <UIcon :name="visual?.icon" class="size-7 sm:size-8" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-xs uppercase tracking-[0.25em] text-gray-400 mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>—— {{ copy.ui.coreModule }}</span>
              <span aria-hidden="true" class="hidden sm:inline h-px w-4 bg-black/15 dark:bg-white/15" />
              <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <UIcon name="i-lucide-check-circle-2" class="size-2.5" />
                {{ copy.ui.includedInEveryPlan }}
              </span>
            </p>
            <h1 class="font-black tracking-tight leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
              {{ moduleEntry.label }}
            </h1>
          </div>
        </div>
        <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-8 sm:mb-10">
          {{ moduleEntry.blurb }}
        </p>

        <!-- ═══ Video showcase — sits directly under the hero title, above the fold ═══ -->
        <LandingVideoShowcase
          :video-url="moduleVideo.url"
          :poster-url="moduleVideo.poster"
          :accent="visual?.color"
          :label="`${moduleEntry.label} product tour`"
        />
      </div>
    </section>

    <!-- ═══ Deep feature list ═══ -->
    <section v-if="feature" class="py-16 sm:py-20 border-t border-black/10 dark:border-white/10">
      <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <div class="grid grid-cols-12 gap-6 lg:gap-12">
          <div class="col-span-12 lg:col-span-5">
            <div class="lg:sticky lg:top-28">
              <LandingSectionEyebrow :label="copy.ui.whatItDoes" class="mb-4" />
              <h2 class="font-black tracking-tight leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">{{ feature.title }}</h2>
              <p class="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">{{ feature.summary }}</p>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-7">
            <ul class="border-t border-black/10 dark:border-white/10">
              <li v-for="(b, bi) in feature.bullets" :key="b"
                class="group flex items-start gap-4 py-5 border-b border-black/10 dark:border-white/10"
              >
                <span class="text-xs tabular-nums text-gray-400 w-6 shrink-0 mt-0.5">{{ String(bi + 1).padStart(2, '0') }}</span>
                <UIcon name="i-lucide-check" class="size-5 shrink-0 mt-0.5 text-emerald-500" />
                <span class="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed">{{ b }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Live module mock (static illustration) ═══ -->
    <section class="py-16 sm:py-20 border-t border-black/10 dark:border-white/10">
      <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <div class="grid grid-cols-12 gap-6 mb-10">
          <div class="col-span-12 sm:col-span-4 lg:col-span-3">
            <LandingSectionEyebrow :label="copy.ui.whatItLooksLike" />
          </div>
          <div class="col-span-12 sm:col-span-8 lg:col-span-9">
            <h2 class="font-black tracking-tight leading-[0.95] text-3xl sm:text-4xl lg:text-5xl">{{ copy.ui.livePreviewPrefix }}{{ moduleEntry.label }}{{ copy.ui.livePreviewSuffix }}</h2>
          </div>
        </div>

        <div class="relative rounded-2xl bg-gray-50 dark:bg-white/[0.025] overflow-hidden">
          <div aria-hidden="true" class="h-0.5 bg-gradient-to-r opacity-80" :class="visual?.color" />
          <div class="p-6 sm:p-10">
            <LandingModuleMock :id="moduleEntry.id" :color="visual?.color" />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Works best with ═══ -->
    <section v-if="relatedModules.length" class="py-16 sm:py-20 border-t border-black/10 dark:border-white/10">
      <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <div class="grid grid-cols-12 gap-6 mb-10">
          <div class="col-span-12 sm:col-span-4 lg:col-span-3">
            <LandingSectionEyebrow :label="copy.ui.worksBestWith" />
            <p class="mt-3 text-sm text-gray-500 max-w-[16rem]">{{ copy.ui.worksBestWithBody }}</p>
          </div>
          <div class="col-span-12 sm:col-span-8 lg:col-span-9">
            <h2 class="font-black tracking-tight leading-[0.9] text-4xl sm:text-5xl lg:text-6xl">{{ copy.ui.betterTogether }}</h2>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 border-t border-black/10 dark:border-white/10 pt-10">
          <NuxtLink v-for="m in relatedModules" :key="m.id" :to="`/portal/modules/${m.id}`"
            class="group flex items-start gap-4"
          >
            <div class="shrink-0 size-12 rounded-xl bg-gradient-to-br text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110 group-hover:-rotate-[6deg]" :class="visuals[m.id]?.color">
              <UIcon :name="visuals[m.id]?.icon" class="size-5" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-black tracking-tight">
                <span class="relative inline-block align-baseline">
                  {{ m.label }}
                  <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-[1.5px] origin-start scale-x-0 group-hover:scale-x-100 transition-transform duration-300" :class="visuals[m.id]?.dot" />
                </span>
              </h3>
              <p class="mt-1.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ m.blurb.split('.')[0] }}.</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ Prev / Next module pager ═══ -->
    <section class="py-14 border-t border-black/10 dark:border-white/10">
      <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-black/10 md:dark:divide-white/10 rtl:md:divide-x-reverse">
          <NuxtLink v-if="prevModule" :to="`/portal/modules/${prevModule.id}`"
            class="group flex items-center gap-4 md:pe-10"
          >
            <span class="size-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-colors group-hover:bg-primary group-hover:text-white">
              <UIcon name="i-lucide-arrow-left" class="size-4 rtl:rotate-180" />
            </span>
            <div class="text-start">
              <p class="text-[10px] uppercase tracking-[0.25em] text-gray-400">{{ copy.ui.previousModule }}</p>
              <p class="text-lg font-black tracking-tight">{{ prevModule.label }}</p>
            </div>
          </NuxtLink>
          <div v-else />

          <NuxtLink v-if="nextModule" :to="`/portal/modules/${nextModule.id}`"
            class="group flex items-center justify-end gap-4 md:ps-10"
          >
            <div class="text-end">
              <p class="text-[10px] uppercase tracking-[0.25em] text-gray-400">{{ copy.ui.nextModule }}</p>
              <p class="text-lg font-black tracking-tight">{{ nextModule.label }}</p>
            </div>
            <span class="size-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-colors group-hover:bg-primary group-hover:text-white">
              <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <LandingCTA />
  </template>

  <!-- Unknown id fallback -->
  <template v-else>
    <section class="py-28">
      <div class="max-w-2xl mx-auto px-5 text-center">
        <LandingSectionEyebrow :label="copy.ui.moduleNotFoundEyebrow" class="mb-4" />
        <h1 class="font-black tracking-tight text-4xl sm:text-5xl mb-4">{{ copy.ui.noModuleWithId }}</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">{{ copy.ui.checkUrlFeatures }}</p>
        <NuxtLink to="/portal/features" class="group inline-flex items-center gap-3 text-sm font-bold">
          <span class="size-11 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
          </span>
          <span class="relative">
            {{ copy.ui.browseAllFeatures }}
            <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover:bg-secondary-500 transition-colors" />
          </span>
        </NuxtLink>
      </div>
    </section>
  </template>
</template>
