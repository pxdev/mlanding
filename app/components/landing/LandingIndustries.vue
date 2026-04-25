<script setup>
const copy = useLandingCopy()

// Bento rhythm for all 15 industries. On md+ we tile a 4-col × 6-row grid
// (24 cells) with 2 heroes (2×2), 3 wides (2×1) and 10 regular (1×1) tiles:
//
//   ┌──────────┬──────┬──────┐
//   │          │dental│dental│   dental  = 2×1 wide
//   │  salon   ├──────┼──────┤
//   │   2×2    │medic.│barber│
//   ├──────────┼──────┼──────┤
//   │ therapy 2×1    │  pet   │
//   ├──────┬───┴──┬───┤  2×2  │
//   │ fit. │photo 2×1 │        │
//   ├──────┼──────┼───┴────────┤
//   │ edu. │prof. │auto│optic. │
//   ├──────┼──────┼────┼───────┤
//   │carw. │welln.│cowork.│    │
//   └──────┴──────┴────────────┘
//
// With grid-flow-dense the placement engine fills gaps automatically so the
// order above is the mental model, not a strict layout constraint.
// Mobile (<sm): 2-col, no spans, every tile 1×1.
function splash(seed) { return `https://picsum.photos/seed/${seed}/900/600` }

const industryVisuals = {
  salon:        { image: 'images/salon_spa.png',        icon: 'i-lucide-scissors',        tint: 'from-pink-500/45 to-rose-600/45',         span: 'sm:col-span-2 sm:row-span-2' },
  dental:       { image: 'images/dental.png',       icon: 'i-hugeicons-dental-tooth', tint: 'from-sky-500/45 to-blue-600/45',          span: 'sm:col-span-2 sm:row-span-1' },
  medical:      { image: 'images/medical_clinics.png',      icon: 'i-lucide-heart-pulse',     tint: 'from-red-500/45 to-orange-600/45',        span: '' },
  barber:       { image: 'images/barber.png',       icon: 'i-lucide-user',            tint: 'from-stone-500/45 to-neutral-700/50',     span: '' },
  fitness:      { image: 'images/training.png',      icon: 'i-lucide-dumbbell',        tint: 'from-lime-500/45 to-emerald-600/45',      span: '' },
  pet:          { image: 'images/pet.png',          icon: 'i-lucide-paw-print',       tint: 'from-amber-500/45 to-yellow-600/45',      span: 'sm:col-span-2 sm:row-span-2' },
  therapy:      { image: 'images/therapy.png',      icon: 'i-lucide-brain',           tint: 'from-violet-500/45 to-purple-600/45',     span: 'sm:col-span-2 sm:row-span-1' },
  photo:        { image: 'images/photo.png',        icon: 'i-lucide-camera',          tint: 'from-cyan-500/45 to-teal-600/45',         span: 'sm:col-span-2 sm:row-span-1' },
  education:    { image: 'images/education.png',    icon: 'i-lucide-graduation-cap',  tint: 'from-indigo-500/45 to-blue-600/45',       span: '' },
  professional: { image: 'images/prof.png', icon: 'i-lucide-briefcase',       tint: 'from-slate-500/45 to-gray-700/50',        span: '' },
  auto:         { image: 'images/auto.png',         icon: 'i-lucide-car',             tint: 'from-orange-500/45 to-red-600/45',        span: '' },
  optical:      { image: 'images/optical.png',      icon: 'i-lucide-glasses',         tint: 'from-emerald-500/45 to-teal-600/45',      span: '' },
  carwash:      { image: 'images/wash.png',      icon: 'i-lucide-droplets',        tint: 'from-blue-500/45 to-indigo-600/45',       span: '' },
  wellness:     { image: 'images/wellness.png',     icon: 'i-lucide-flower-2',        tint: 'from-fuchsia-500/45 to-pink-600/45',      span: '' },
  coworking:    { image: 'images/coworking.png',    icon: 'i-lucide-building-2',      tint: 'from-yellow-500/45 to-orange-600/45',     span: '' }
}

// Hide the <img> when its src 404s so the colored fallback (icon + tint) shows through.
function onIndustryImgError(e) {
  e.target.style.display = 'none'
}

function indexChip(i) {
  return String(i + 1).padStart(2, '0')
}

// Prefer the dedicated solution page when one exists, otherwise fall back to
// the showcase anchor. Keeps tiles landing on real content even when a
// vertical only lives in one of the two taxonomies (e.g. education has a
// showcase section but no solutions page; therapy is the reverse).
const solutionIds = computed(() => new Set(Object.keys(copy.value.solutionDetails)))
const showcaseIds = computed(() => new Set(copy.value.showcasePage.verticals.map(v => v.id)))
function industryTarget(id) {
  if (solutionIds.value.has(id)) return `/portal/solutions/${id}`
  if (showcaseIds.value.has(id)) return `/portal/showcase#${id}`
  return '/portal/solutions'
}
</script>

<template>
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

      <!-- Bento grid: 15 tiles over 4 cols × 6 rows on md+. -->
      <ul class="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 grid-flow-row-dense auto-rows-[180px] sm:auto-rows-[200px] lg:auto-rows-[220px] gap-3 sm:gap-4">
        <li
          v-for="(ind, i) in copy.industries.items"
          :key="ind.id"
          :class="industryVisuals[ind.id]?.span"
          class="group/tile"
        >
          <NuxtLink
            :to="industryTarget(ind.id)"
            class="group relative block w-full h-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 hover:ring-secondary-500/50 hover:shadow-2xl hover:shadow-secondary-500/10 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500"
          >
            <!-- Colored fallback (sits below the image; only visible when the image 404s). -->
            <div
              aria-hidden="true"
              class="absolute inset-0 bg-gradient-to-br"
              :class="industryVisuals[ind.id]?.tint"
            />
            <UIcon
              :name="industryVisuals[ind.id]?.icon"
              aria-hidden="true"
              class="absolute inset-0 m-auto size-12 sm:size-16 text-white/40"
            />

            <!-- Real photo on top of the fallback. -->
            <img
              :src="industryVisuals[ind.id]?.image"
              :alt="ind.label"
              loading="lazy"
              decoding="async"
              class="relative w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.08]"
              @error="onIndustryImgError"
            >

            <!-- Tint wash — strengthens on hover for brand color bleed. -->
            <div
              aria-hidden="true"
              class="absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-55 transition-opacity duration-500 mix-blend-multiply"
              :class="industryVisuals[ind.id]?.tint"
            />

            <!-- Bottom gradient to anchor the text. -->
            <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <!-- Index chip top-start. -->
            <span class="absolute top-3 start-3 z-10 inline-flex items-center justify-center min-w-7 h-7 px-2 rounded-full bg-white/10 backdrop-blur-sm text-[11px] font-bold tabular-nums text-white/90 ring-1 ring-white/15">
              {{ indexChip(i) }}
            </span>

            <!-- Icon pill top-end — always visible, brightens on hover. -->
            <span class="absolute top-3 end-3 z-10 size-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 ring-1 ring-white/15 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white group-hover:ring-white/30">
              <UIcon :name="industryVisuals[ind.id]?.icon" class="size-4" />
            </span>

            <!-- Arrow that slides up on hover. -->
            <span class="absolute bottom-3 end-3 z-10 inline-flex items-center justify-center size-9 rounded-full bg-secondary-500/90 text-white shadow-lg shadow-secondary-500/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <UIcon name="i-lucide-arrow-up-right" class="size-4 rtl:rotate-180" />
            </span>

            <!-- Label + tagline anchored to the bottom-start. -->
            <div class="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 pe-14 sm:pe-16">
              <h3 class="text-white font-black tracking-tight leading-none text-xl sm:text-2xl lg:text-3xl">
                {{ ind.label }}
              </h3>
              <p
                v-if="ind.tagline"
                class="mt-2 text-white/80 text-xs sm:text-sm line-clamp-2 max-w-prose"
              >
                {{ ind.tagline }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
