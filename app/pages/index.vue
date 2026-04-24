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
      ? 'كل ما يحتاجه عملك في منصة واحدة: حجوزات، نقاط بيع، محاسبة، مخزون، موارد بشرية، عملاء، وبوابة بهويتك — ثنائية اللغة وجاهزة لمتطلبات ZATCA و ETA.'
      : 'All-in-one platform for bookings, POS, accounting, inventory, HR, CRM, and a branded client portal. Multi-tenant, bilingual, and ZATCA & ETA e-invoicing ready.'
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
