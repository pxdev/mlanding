<script setup>
definePageMeta({ layout: 'landing' });
const copy = useLandingCopy();
const { locale } = useI18n();
useHead(() => ({
    title: locale.value === 'ar' ? 'أسئلة شائعة — Momentfy' : 'FAQ — Momentfy',
    meta: [{
            name: 'description',
            content: locale.value === 'ar'
                ? 'أسئلة متكررة حول Momentfy — الترخيص، النشر، التحديثات، الامتثال والدعم.'
                : 'Frequently asked questions about Momentfy — licensing, deployment, updates, compliance and support.'
        }]
}));
const sectionDots = ['bg-secondary-500', 'bg-amber-500', 'bg-violet-500', 'bg-emerald-500', 'bg-sky-500', 'bg-rose-500'];
const openSet = ref(new Set());
function toggle(key) {
    if (openSet.value.has(key))
        openSet.value.delete(key);
    else
        openSet.value.add(key);
    openSet.value = new Set(openSet.value);
}
function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/^-+|-+$/g, '');
}
const chapterNav = computed(() => copy.value.faqPage.sections.map((s, i) => ({
    id: slugify(s.title),
    label: s.title,
    dot: sectionDots[i % sectionDots.length],
    count: s.items.length
})));
</script>

<template>
  <!-- ═══ Hero ═══ -->
  <LandingPageHero
    :crumb-label="copy.faqPage.eyebrow"
    :headline="copy.faqPage.h1"
    :sub="copy.faqPage.sub"
  >
    <template #background>
      <div class="absolute top-0 start-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-secondary-500 blur-[150px] opacity-[0.1] rounded-full" />
    </template>

    <p class="mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
      <NuxtLink to="/portal/download#contact" class="text-primary dark:text-white font-semibold underline underline-offset-4 decoration-secondary-500 hover:decoration-2">{{ copy.faqPage.contactLink }}</NuxtLink>.
    </p>
  </LandingPageHero>

  <!-- Sticky chapter nav -->
  <LandingChapterNav :items="chapterNav" />

  <!-- ═══ FAQ chapters ═══ -->
  <section class="py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 space-y-16 sm:space-y-20">
      <div v-for="(section, si) in copy.faqPage.sections" :key="section.title" :id="slugify(section.title)">
        <!-- Chapter header -->
        <div class="flex items-end justify-between pb-5 mb-6 border-b border-black/10 dark:border-white/10">
          <div class="flex items-baseline gap-4 sm:gap-6 min-w-0">
            <span class="shrink-0 text-sm tabular-nums text-gray-400">{{ String(si + 1).padStart(2, '0') }}</span>
            <div class="flex items-baseline gap-3 min-w-0">
              <span aria-hidden="true" class="size-2.5 rounded-full shrink-0" :class="sectionDots[si % sectionDots.length]" />
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase truncate">
                {{ section.title }}
              </h2>
            </div>
          </div>
          <span class="shrink-0 text-[10px] uppercase tracking-[0.25em] text-gray-400">
            {{ String(section.items.length).padStart(2, '0') }} / questions
          </span>
        </div>

        <!-- Bare accordion — just hairline rules -->
        <div>
          <div v-for="(it, ii) in section.items" :key="it.q"
            class="group border-b border-black/10 dark:border-white/10"
            :class="openSet.has(section.title + '|' + it.q) ? 'bg-black/[0.02] dark:bg-white/[0.02]' : 'hover:bg-black/[0.015] dark:hover:bg-white/[0.01]'"
          >
            <button class="w-full grid grid-cols-12 gap-4 items-center py-6 sm:py-7 px-3 sm:px-6 text-start transition-colors" @click="toggle(section.title + '|' + it.q)">
              <span class="col-span-2 sm:col-span-1 text-xs tabular-nums text-gray-400">{{ String(ii + 1).padStart(2, '0') }}</span>
              <span class="col-span-8 sm:col-span-10 text-base sm:text-lg lg:text-xl font-bold tracking-tight leading-tight">{{ it.q }}</span>
              <span class="col-span-2 sm:col-span-1 flex justify-end">
                <span class="size-9 rounded-full flex items-center justify-center transition-all border border-black/10 dark:border-white/15"
                  :class="openSet.has(section.title + '|' + it.q) ? 'bg-primary text-white border-primary rotate-180' : 'group-hover:border-secondary-500/40'"
                >
                  <UIcon :name="openSet.has(section.title + '|' + it.q) ? 'i-lucide-minus' : 'i-lucide-plus'" class="size-4" />
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
              <div v-if="openSet.has(section.title + '|' + it.q)" class="grid grid-cols-12 gap-4 pb-6 sm:pb-8 px-3 sm:px-6">
                <div class="col-span-2 sm:col-span-1" />
                <p class="col-span-10 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">{{ it.a }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>

  <LandingCTA />
</template>
