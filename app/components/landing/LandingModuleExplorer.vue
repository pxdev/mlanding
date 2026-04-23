<script setup lang="ts">
// Nine-modules section — auto-rotating explorer, editorial styling.
// Left rail: hairline-separated tab list.
// Right stage: flowing preview (no outer card frame), just a colored
// backdrop wash + a small accent stripe above the mock.
// Progress bar sits under the active tab and drives the auto-advance.
const copy = useLandingCopy()

type ModuleVisual = { icon: string; color: string; check: string }
const visuals: Record<string, ModuleVisual> = {
  calendar:   { icon: 'i-lucide-calendar-days', color: 'from-violet-500 to-fuchsia-500',  check: 'text-violet-500' },
  sales:      { icon: 'i-lucide-store',         color: 'from-amber-500 to-orange-600',    check: 'text-amber-500' },
  clients:    { icon: 'i-lucide-users-round',   color: 'from-sky-500 to-blue-600',        check: 'text-sky-500' },
  catalogue:  { icon: 'i-lucide-layers',        color: 'from-pink-500 to-rose-600',       check: 'text-pink-500' },
  inventory:  { icon: 'i-lucide-package',       color: 'from-teal-500 to-emerald-600',    check: 'text-teal-500' },
  team:       { icon: 'i-lucide-user-check',    color: 'from-indigo-500 to-purple-600',   check: 'text-indigo-500' },
  accounting: { icon: 'i-lucide-book-open',     color: 'from-stone-500 to-neutral-700',   check: 'text-stone-500' },
  reports:    { icon: 'i-lucide-bar-chart-3',   color: 'from-cyan-500 to-sky-600',        check: 'text-cyan-500' },
  portal:     { icon: 'i-lucide-smartphone',    color: 'from-lime-500 to-green-600',      check: 'text-lime-500' }
}

const modules = computed(() => copy.value.modules.items)
const activeIndex = ref(0)
const active = computed(() => modules.value[activeIndex.value])
const activeVisual = computed(() => active.value ? visuals[active.value.id] : undefined)

// Pull the first four bullets from the matching feature for the highlight list.
const activeHighlights = computed(() => {
  if (!active.value) return []
  const feature = copy.value.featuresPage.items.find(f => f.id === active.value.id)
  return feature?.bullets.slice(0, 4) ?? []
})

// Auto-rotate (rAF-driven so the progress bar stays visually in sync).
const DURATION = 6000
const paused = ref(false)
const progress = ref(0)
let rafId: number | null = null
let startedAt: number | null = null

function tick(now: number) {
  if (startedAt === null) startedAt = now
  const elapsed = now - startedAt
  if (!paused.value) {
    const p = Math.min(elapsed / DURATION, 1)
    progress.value = p
    if (p >= 1) {
      activeIndex.value = (activeIndex.value + 1) % modules.value.length
      startedAt = now
      progress.value = 0
    }
  } else {
    // Freeze the clock so progress doesn't jump when resuming.
    startedAt = now - progress.value * DURATION
  }
  rafId = requestAnimationFrame(tick)
}

function selectModule(i: number) {
  activeIndex.value = i
  startedAt = null
  progress.value = 0
}

onMounted(() => {
  if (typeof window !== 'undefined') rafId = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})

function padIndex(i: number) {
  return String(i + 1).padStart(2, '0')
}
const totalIndex = computed(() => String(modules.value.length).padStart(2, '0'))
</script>

<template>
  <section id="modules" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Top hairline (same language as other sections) -->
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />

    <div class="relative max-w-7xl mx-auto px-5 sm:px-8">

      <LandingSectionHeading
        number="2"
        :label="copy.modules.eyebrow"
        :heading="copy.modules.heading"
        :sub="copy.modules.sub"
      />

      <NuxtLink to="/portal/features" class="group inline-flex items-center gap-3 text-sm font-bold mb-16 lg:mb-20">
        <span class="size-10 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
          <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
        </span>
        <span class="relative">
          {{ copy.modules.linkAll }}
          <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover:bg-secondary-500 transition-colors" />
        </span>
      </NuxtLink>

      <!-- ═══ Explorer ═══ -->
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
      >

        <!-- Left rail: hairline-separated tab list -->
        <nav class="lg:col-span-5 border-t border-black/10 dark:border-white/10">
          <!-- Mobile: horizontal scrollable pill list -->
          <ul
            class="lg:hidden flex gap-2 py-4 overflow-x-auto scrollbar-none snap-x"
            role="tablist"
            aria-label="Modules"
          >
            <li v-for="(m, i) in modules" :key="m.id" class="shrink-0 snap-start">
              <button
                role="tab"
                :aria-selected="activeIndex === i"
                class="inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-semibold transition-colors"
                :class="activeIndex === i
                  ? 'bg-primary text-white dark:bg-white dark:text-primary'
                  : 'bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300'"
                @click="selectModule(i)"
              >
                <span aria-hidden="true" class="size-1.5 rounded-full bg-gradient-to-br" :class="visuals[m.id]?.color" />
                {{ m.label }}
              </button>
            </li>
          </ul>

          <!-- Desktop: big hairline list -->
          <ul class="hidden lg:block" role="tablist" aria-label="Modules">
            <li v-for="(m, i) in modules" :key="m.id"
              class="relative border-b border-black/10 dark:border-white/10"
            >
              <button
                role="tab"
                :aria-selected="activeIndex === i"
                class="group relative w-full grid grid-cols-12 gap-4 items-center py-4 text-start transition-colors"
                :class="activeIndex === i
                  ? 'bg-black/[0.02] dark:bg-white/[0.02]'
                  : 'hover:bg-black/[0.015] dark:hover:bg-white/[0.015]'"
                @click="selectModule(i)"
              >
                <!-- Index -->
                <span class="col-span-1 ps-1 text-xs tabular-nums text-gray-400">{{ padIndex(i) }}</span>

                <!-- Colored dot (indicator) -->
                <span class="col-span-1 flex">
                  <span
                    aria-hidden="true"
                    class="size-2.5 rounded-full transition-all"
                    :class="activeIndex === i
                      ? `bg-gradient-to-br shadow-sm ${visuals[m.id]?.color}`
                      : 'bg-black/15 dark:bg-white/20 group-hover:bg-black/30'"
                  />
                </span>

                <!-- Label — big editorial text that lights up when active -->
                <span class="col-span-9 min-w-0">
                  <p
                    class="text-lg xl:text-xl font-black tracking-tight truncate transition-colors"
                    :class="activeIndex === i
                      ? 'text-primary dark:text-white'
                      : 'text-black/30 dark:text-white/25 group-hover:text-black/60 dark:group-hover:text-white/50'"
                  >
                    {{ m.label }}
                  </p>
                </span>

                <!-- Trailing arrow -->
                <span class="col-span-1 flex justify-end pe-1">
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="size-4 rtl:rotate-180 transition-all"
                    :class="activeIndex === i
                      ? 'text-secondary-500 translate-x-0.5 rtl:-translate-x-0.5'
                      : 'text-gray-300 dark:text-gray-700'"
                  />
                </span>

                <!-- Progress bar along the bottom of the active tab -->
                <span
                  v-if="activeIndex === i"
                  aria-hidden="true"
                  class="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden"
                >
                  <span
                    class="block h-full bg-gradient-to-r transition-[width] duration-[80ms] ease-linear"
                    :class="visuals[m.id]?.color"
                    :style="{ width: `${progress * 100}%` }"
                  />
                </span>
              </button>
            </li>
          </ul>

          <!-- Status line: paused / auto-advance -->
          <div class="hidden lg:flex items-center gap-2 mt-6 text-[11px] uppercase tracking-[0.2em] text-gray-400">
            <UIcon :name="paused ? 'i-lucide-pause' : 'i-lucide-play'" class="size-3" />
            <span>{{ paused ? copy.ui.explorerPaused : `${copy.ui.explorerAutoPrefix}${Math.ceil((1 - progress) * DURATION / 1000)}s` }}</span>
          </div>
        </nav>

        <!-- Right stage: active module preview (no outer card frame) -->
        <div class="lg:col-span-7 relative" role="tabpanel" :aria-labelledby="`module-${active?.id}`">
          <!-- Backdrop tint (soft, matches active module color) -->
          <div aria-hidden="true"
            class="pointer-events-none absolute -inset-x-8 -inset-y-6 bg-gradient-to-br opacity-[0.07] blur-3xl transition-all duration-700"
            :class="activeVisual?.color"
          />
          <div aria-hidden="true"
            class="pointer-events-none absolute -top-10 -end-10 size-64 rounded-full bg-gradient-to-br opacity-25 blur-3xl transition-all duration-700"
            :class="activeVisual?.color"
          />

          <div class="relative">
            <!-- Header: index pair + included chip -->
            <div class="flex items-center justify-between mb-5">
              <span class="text-xs uppercase tracking-[0.25em] text-gray-400 tabular-nums">
                {{ padIndex(activeIndex) }} / {{ totalIndex }}
              </span>
              <span class="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-600 dark:text-emerald-400">
                <UIcon name="i-lucide-check-circle-2" class="size-3" />
                {{ copy.ui.includedInEveryPlan }}
              </span>
            </div>

            <!-- Title + blurb (transitions on module switch) -->
            <Transition
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
              mode="out-in"
            >
              <div :key="active?.id">
                <!-- Accent stripe — tied to module color -->
                <div aria-hidden="true" class="h-0.5 w-20 bg-gradient-to-r rounded-full mb-6" :class="activeVisual?.color" />

                <h3 :id="`module-${active?.id}`" class="font-black tracking-tight leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
                  {{ active?.label }}
                </h3>
                <p class="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                  {{ active?.blurb }}
                </p>
              </div>
            </Transition>

            <!-- Live mock — light-weight frame (no border), soft bg + hairline top -->
            <div class="mt-8 relative rounded-2xl bg-gray-50 dark:bg-white/[0.025] overflow-hidden">
              <div aria-hidden="true" class="h-0.5 bg-gradient-to-r opacity-80" :class="activeVisual?.color" />
              <div class="p-5 sm:p-6 transition-opacity duration-300" :key="active?.id">
                <LandingModuleMock :id="active?.id || 'calendar'" :color="activeVisual?.color" />
              </div>
            </div>

            <!-- Highlights — hairline above, 2-col checklist -->
            <ul class="mt-10 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-black/10 dark:border-white/10">
              <li v-for="h in activeHighlights" :key="h" class="flex items-start gap-2.5 text-sm">
                <UIcon name="i-lucide-check" class="size-4 shrink-0 mt-0.5" :class="activeVisual?.check || 'text-secondary-500'" />
                <span class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ h }}</span>
              </li>
            </ul>

            <!-- Footer: CTA + stepper -->
            <div class="mt-10 flex items-center justify-between gap-4 flex-wrap">
              <NuxtLink
                :to="`/portal/modules/${active?.id}`"
                class="group inline-flex items-center gap-3 text-sm font-bold"
              >
                <span class="size-10 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
                  <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
                </span>
                <span class="relative">
                  {{ copy.ui.exploreVerb }} {{ active?.label }}
                  <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover:bg-secondary-500 transition-colors" />
                </span>
              </NuxtLink>

              <!-- Stepper dots -->
              <div class="flex items-center gap-1.5">
                <button
                  v-for="(_, i) in modules" :key="i"
                  type="button"
                  class="h-1.5 rounded-full transition-all"
                  :class="activeIndex === i
                    ? `w-8 bg-gradient-to-r ${visuals[modules[i].id]?.color}`
                    : 'w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'"
                  :aria-label="`Go to module ${i + 1}`"
                  @click="selectModule(i)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
