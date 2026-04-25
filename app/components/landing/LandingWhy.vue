<script setup>
const copy = useLandingCopy()

// Why-items icon list (order matches copy.why.items)
const whyIcons = ['i-lucide-package-2', 'i-lucide-server', 'i-lucide-languages', 'i-lucide-shield-check', 'i-lucide-brain-circuit', 'i-lucide-smartphone']
</script>

<template>
  <section
    id="why"
    class="relative py-24 sm:py-32 overflow-hidden bg-gray-50 dark:bg-white/[0.02]"
  >
    <!-- Giant decorative numeral -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -top-16 -end-12 text-[28rem] leading-[0.8] font-black text-black/[0.025] dark:text-white/[0.03] select-none hidden lg:block tabular-nums"
    >
      01
    </div>

    <div class="max-w-6xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="1"
        :label="copy.why.eyebrow"
        :heading="`${copy.why.h2a} ${copy.why.h2b}`"
        :sub="copy.why.body"
      />

      <!-- Numbered list, hairline dividers, no cards -->
      <ol class="border-t border-black/10 dark:border-white/10">
        <li
          v-for="(d, i) in copy.why.items"
          :key="d.title"
          class="group grid grid-cols-12 gap-4 sm:gap-6 py-8 sm:py-12 border-b border-black/10 dark:border-white/10 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.015]"
        >
          <!-- Number -->
          <div class="col-span-2 sm:col-span-1">
            <p class="text-sm text-gray-400 tabular-nums">
              0{{ i + 1 }}
            </p>
          </div>
          <!-- Icon -->
          <div class="col-span-10 sm:col-span-2 lg:col-span-1 flex items-start">
            <UIcon
              :name="whyIcons[i] || 'i-lucide-star'"
              class="size-6 text-secondary-500 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"
            />
          </div>
          <!-- Title -->
          <div class="col-span-12 sm:col-span-4">
            <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              {{ d.title }}
            </h3>
          </div>
          <!-- Body -->
          <div class="col-span-12 sm:col-span-5 lg:col-span-6 flex items-center">
            <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ d.body }}
            </p>
          </div>
        </li>
      </ol>

      <div class="mt-12">
        <NuxtLink
          to="/portal/features"
          class="group inline-flex items-center gap-3 text-base font-bold"
        >
          <span class="size-12 rounded-full bg-primary dark:bg-white text-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <UIcon
              name="i-lucide-arrow-right"
              class="size-5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            />
          </span>
          <span class="relative">
            {{ copy.ui.allFeatureAreas }}
            <span
              aria-hidden="true"
              class="absolute -bottom-0.5 inset-x-0 h-px bg-current origin-start scale-x-100 group-hover:bg-secondary-500 transition-colors"
            />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
