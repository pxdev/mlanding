<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const copy = useLandingCopy()
const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'ar' ? 'التوثيق — Momentfy' : 'Docs — Momentfy',
  meta: [{
    name: 'description',
    content: locale.value === 'ar'
      ? 'متطلبات النظام، تكلفة الاستضافة، النشر، المستودع والتحديثات، النسخ الاحتياطي، والمتغيرات.'
      : 'System requirements, hosting cost, deployment, repo access, backups, environment variables and license.'
  }]
}))
</script>

<template>
  <!-- ═══ Hero ═══ -->
  <section class="relative py-20 sm:py-28 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-0 -z-10">
      <div class="absolute top-0 start-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-secondary-500 blur-[150px] opacity-[0.1] rounded-full" />
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <p class="text-xs uppercase tracking-[0.25em] text-gray-400">—— {{ copy.docsPage.eyebrow }}</p>
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-500 max-w-[16rem]">{{ copy.docsPage.sub }}</p>

          <!-- Sticky TOC -->
          <nav class="mt-6 space-y-2 text-xs">
            <a v-for="s in copy.docsPage.sections" :key="s.id" :href="`#${s.id}`"
              class="group flex items-center gap-2 text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
            >
              <span class="tabular-nums text-gray-400 shrink-0">{{ s.num }}</span>
              <span class="size-1.5 rounded-full bg-secondary-500/40 group-hover:bg-secondary-500 transition-colors shrink-0" />
              <span class="uppercase tracking-[0.2em] truncate">{{ s.title }}</span>
            </a>
          </nav>
        </div>
        <div class="col-span-12 sm:col-span-8 lg:col-span-9">
          <h1 class="font-black tracking-tight leading-[0.9] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            <span class="block">{{ copy.docsPage.h1 }}</span>
          </h1>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ Docs body — editorial chapters ═══ -->
  <section class="py-8 sm:py-16">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div v-for="s in copy.docsPage.sections" :key="s.id" :id="s.id"
        class="grid grid-cols-12 gap-6 lg:gap-12 py-12 sm:py-16 border-t border-black/10 dark:border-white/10"
      >
        <!-- Left: chapter label -->
        <div class="col-span-12 lg:col-span-3">
          <div class="lg:sticky lg:top-28">
            <p class="text-xs tabular-nums text-gray-400">{{ s.num }}</p>
            <h2 class="mt-2 text-2xl sm:text-3xl font-black tracking-tight uppercase">{{ s.title }}</h2>
          </div>
        </div>

        <!-- Right: body -->
        <div class="col-span-12 lg:col-span-9 space-y-6">
          <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">{{ s.body }}</p>

          <!-- key/value spec table -->
          <dl v-if="s.kv?.length" class="max-w-3xl">
            <div v-for="row in s.kv" :key="row.k"
              class="grid grid-cols-[9rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 py-3 border-t border-black/10 dark:border-white/10 last:border-b items-baseline"
            >
              <dt class="text-xs uppercase tracking-[0.2em] text-gray-400">{{ row.k }}</dt>
              <dd class="text-sm sm:text-base text-gray-800 dark:text-gray-200">{{ row.v }}</dd>
            </div>
          </dl>

          <!-- bullet list -->
          <ul v-if="s.items?.length" class="max-w-3xl">
            <li v-for="item in s.items" :key="item"
              class="flex items-start gap-3 py-3 border-t border-black/10 dark:border-white/10 last:border-b"
            >
              <UIcon name="i-lucide-check" class="size-4 shrink-0 mt-1 text-emerald-500" />
              <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Bottom hand-off: legal + download -->
  <section class="py-12 border-t border-black/10 dark:border-white/10">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-6">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-gray-400">{{ copy.ui.readyKicker }}</p>
        <p class="mt-2 text-2xl sm:text-3xl font-black tracking-tight">{{ copy.ui.buyCloneTagline }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-6">
        <NuxtLink to="/portal/legal" class="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary dark:hover:text-white transition-colors">
          <UIcon name="i-lucide-scale" class="size-3.5" />
          <span class="relative">
            {{ copy.ui.readLicense }}
            <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        </NuxtLink>
        <NuxtLink to="/portal/pricing" class="group inline-flex items-center gap-3 text-sm font-bold">
          <span class="size-11 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <UIcon name="i-lucide-arrow-right" class="size-4 rtl:rotate-180" />
          </span>
          <span class="relative">
            {{ copy.downloadPage.buy }}
            <span aria-hidden="true" class="absolute -bottom-0.5 inset-x-0 h-px bg-current group-hover:bg-secondary-500 transition-colors" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>

  <LandingCTA />
</template>
