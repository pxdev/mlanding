<script setup>
definePageMeta({ layout: 'landing' })

const { locale } = useI18n()
useHead(() => ({
  title: locale.value === 'ar'
    ? 'Momentfy — منصة واحدة لإدارة أعمالك كاملةً'
    : 'Momentfy — The Operating System for Booking Businesses',
  meta: [{
    name: 'description',
    content: locale.value === 'ar'
      ? 'كل ما يحتاجه عملك في منصة واحدة: حجوزات، نقاط بيع، محاسبة، مخزون، موارد بشرية، عملاء، وبوابة بشعارك — ثنائية اللغة، وجاهزة لهيئة الزكاة و ETA.'
      : 'All-in-one booking, POS, accounting, inventory, HR, CRM and client portal platform. Multi-tenant. Bilingual. ZATCA & ETA e-invoicing ready.'
  }]
}))
</script>

<template>
  <div>
    <LandingHero />
    <LandingProofBand />
    <LandingWhy />
    <LandingModuleExplorer />
    <LandingIndustries />
    <LandingAddons />
    <LandingPortalShowcase />
    <LandingTrust />
    <LandingPricing />
    <LandingTestimonials />
    <LandingFaq />
    <LandingCTA />
  </div>
</template>
