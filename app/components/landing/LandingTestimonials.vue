<script setup>
const copy = useLandingCopy()

// Testimonial accents (order matches copy.testimonials.items)
const testimonialAccents = ['from-pink-500 to-rose-500', 'from-sky-500 to-indigo-500', 'from-emerald-500 to-teal-500']
</script>

<template>
  <section class="relative py-24 sm:py-32 overflow-hidden">
    <div
      aria-hidden="true"
      class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10"
    />
    <div
      aria-hidden="true"
      class="absolute top-20 end-[-10rem] w-96 h-96 rounded-full bg-secondary-400 blur-[120px] opacity-10"
    />

    <div class="max-w-6xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="8"
        :label="copy.testimonials.eyebrow"
        :heading="copy.testimonials.heading"
      >
        <template #meta>
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            <UIcon
              name="i-lucide-info"
              class="size-3"
            />
            {{ copy.ui.illustrative }}
          </span>
        </template>
      </LandingSectionHeading>

      <!-- Full disclaimer row beneath header -->
      <p class="text-sm text-gray-500 dark:text-gray-500 mb-12 max-w-3xl border-t border-black/10 dark:border-white/10 pt-4 flex items-start gap-3">
        <UIcon
          name="i-lucide-quote"
          class="size-4 shrink-0 mt-1 text-amber-500"
        />
        <span>{{ copy.testimonials.disclaimer }}</span>
      </p>

      <!-- Big pull quotes, sequential, hairline dividers -->
      <div class="border-t border-black/10 dark:border-white/10">
        <figure
          v-for="(t, i) in copy.testimonials.items"
          :key="t.name"
          class="group relative grid grid-cols-12 gap-6 py-10 sm:py-14 border-b border-black/10 dark:border-white/10 transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.01]"
        >
          <!-- Index + giant quote mark -->
          <div class="col-span-12 sm:col-span-2 lg:col-span-1">
            <UIcon
              name="i-lucide-quote"
              class="size-10 text-secondary-500/60"
            />
            <p class="mt-2 text-[10px] tabular-nums text-gray-400">
              0{{ i + 1 }}
            </p>
          </div>

          <!-- Big quotation -->
          <blockquote class="col-span-12 sm:col-span-10 lg:col-span-8 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.2] text-primary dark:text-white">
            "{{ t.quote }}"
          </blockquote>

          <!-- Author + metrics for featured -->
          <figcaption class="col-span-12 lg:col-span-3 flex flex-col gap-3 lg:items-end lg:text-end">
            <div class="flex lg:flex-col-reverse lg:items-end gap-3 lg:gap-1">
              <div
                class="size-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-black text-base"
                :class="testimonialAccents[i]"
              >
                {{ t.name.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-bold">
                  {{ t.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ t.role }}
                </p>
              </div>
            </div>
            <!-- Big number for featured -->
            <div
              v-if="i === 0"
              class="mt-2 flex lg:flex-col gap-6 lg:gap-1 lg:items-end"
            >
              <div>
                <p class="text-3xl font-black leading-none">
                  3×
                </p>
                <p class="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                  {{ copy.ui.revenueLabel }}
                </p>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
