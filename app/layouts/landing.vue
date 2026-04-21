<script setup lang="ts">
import * as uiLocales from '@nuxt/ui/locale'

// Landing marketing layout — shared nav + footer for the home page and /portal/* marketing sub-pages.
const copy = useLandingCopy()
const { locale } = useI18n()

const uiLocale = computed(
  () => (uiLocales as Record<string, { code: string; dir: 'rtl' | 'ltr' }>)[locale.value]
)

useHead({
  htmlAttrs: {
    lang: computed(() => uiLocale.value?.code ?? locale.value),
    dir: computed(() => uiLocale.value?.dir ?? 'ltr')
  }
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased">
    <!-- Accessibility: keyboard skip link (hidden until focused) -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:inline-flex focus:items-center focus:gap-2 focus:px-4 focus:h-10 focus:rounded-full focus:bg-primary focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg"
    >
      {{ copy.ui.skipToMain }}
    </a>
    <LandingNav />
    <main id="main-content" tabindex="-1" class="pt-16">
      <slot />
    </main>
    <LandingFooter />
  </div>
</template>
