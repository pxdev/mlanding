<script setup>
const copy = useLandingCopy()
const localePath = useLocalePath()

// Same flow as /portal/pricing — clicking a card jumps straight to the
// /portal/checkout/[slug] review page instead of bouncing through the
// pricing page first.
const checkoutLoading = ref(null)
async function goToReview(idx, plan) {
  const slug = plan?.slug
  if (!slug) return
  checkoutLoading.value = idx
  await navigateTo(localePath(`/portal/checkout/${slug}`))
  checkoutLoading.value = null
}
</script>

<template>
  <section
    id="pricing"
    class="relative py-24 sm:py-32 overflow-hidden"
  >
    <div
      aria-hidden="true"
      class="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10"
    />
    <div
      aria-hidden="true"
      class="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,90vw)] h-[min(400px,60vw)] sm:h-[400px] bg-secondary-500 blur-[150px] opacity-[0.08] dark:opacity-15 rounded-full"
    />

    <div class="relative max-w-7xl mx-auto px-5 sm:px-8">
      <LandingSectionHeading
        number="6"
        :label="copy.pricingPage.eyebrow"
        :heading="`${copy.pricingPage.h1a} ${copy.pricingPage.h1b}`"
        :sub="copy.pricingPage.sub"
      >
        <template #meta>
          <NuxtLink
            :to="localePath('/portal/pricing')"
            class="ms-auto group inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
          >
            <span class="relative">
              {{ copy.ui.fullPricingDetails }}
              <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <UIcon name="i-lucide-arrow-right" class="size-3 rtl:rotate-180" />
          </NuxtLink>
        </template>
      </LandingSectionHeading>

      <!-- Trust badges — horizontal row -->
      <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 mb-16 sm:mb-20">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-infinity"
            class="size-3.5 text-emerald-500"
          />
          {{ copy.ui.lifetimeUpdates }}
        </div>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-lock"
            class="size-3.5 text-emerald-500"
          />
          {{ copy.ui.secureCheckout }}
        </div>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-shield-check"
            class="size-3.5 text-emerald-500"
          />
          {{ copy.ui.lifetimeLicense }}
        </div>
      </div>

      <!-- A) What every plan includes — shown once, not repeated 3× -->
      <div class="mb-20">
        <div class="flex items-baseline gap-3 mb-8 pb-4 border-b border-black/10 dark:border-white/10">
          <span class="text-[11px] tabular-nums text-gray-400">A</span>
          <p class="text-[11px] uppercase tracking-[0.25em] text-gray-400">
            {{ copy.pricing.includedAllLabel }}
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-8">
          <div
            v-for="item in copy.pricing.includedAll"
            :key="item"
            class="flex items-start gap-3"
          >
            <UIcon
              name="i-lucide-check"
              class="size-5 shrink-0 mt-0.5 text-emerald-500"
            />
            <span class="text-sm sm:text-base font-semibold">{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- B) Pick your install path — premium plan cards (shared component) -->
      <div>
        <div class="flex items-baseline gap-3 mb-12 pb-4 border-b border-black/10 dark:border-white/10">
          <span class="text-[11px] tabular-nums text-gray-400">B</span>
          <p class="text-[11px] uppercase tracking-[0.25em] text-gray-400">
            {{ copy.pricing.windowLabel }}
          </p>
        </div>

        <LandingPricingPlans
          interactive
          show-features
          :loading-index="checkoutLoading"
          @select="goToReview"
        />
      </div>

      <!-- Footer -->
      <p class="mt-20 flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-[0.2em]">
        <UIcon
          name="i-simple-icons-lemonsqueezy"
          class="size-4"
        />
        {{ copy.pricing.footer }}
      </p>
    </div>
  </section>
</template>
