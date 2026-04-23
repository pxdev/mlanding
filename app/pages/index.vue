<script setup>
definePageMeta({ layout: 'landing' })

const { locale } = useI18n()
useHead(() => ({
  title: locale.value === 'ar'
    ? 'Momentfy — نظام التشغيل الكامل لأعمال الحجوزات'
    : 'Momentfy — The Operating System for Booking Businesses',
  meta: [{
    name: 'description',
    content: locale.value === 'ar'
      ? 'منصة متكاملة للحجز، نقاط البيع، المحاسبة، المخزون، الموارد البشرية، CRM وبوابة العميل. متعدد المستأجرين، ثنائي اللغة، جاهز لـ ZATCA و ETA.'
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
