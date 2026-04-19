import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
// Standalone landing site — no DB, no auth, no server APIs. Marketing only.
export default defineNuxtConfig({

  ssr: false,

  app: {
    baseURL: '/',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      appVersion: pkg.version,
      // Where the "Try demo" / "Sign in" CTAs send visitors. Hosted on a
      // separate domain that runs the Momentfy app.
      demoUrl: process.env.NUXT_PUBLIC_DEMO_URL || 'https://demo.momentfy.com',
      // Hosted checkout / "Buy" CTA target (Lemon Squeezy, etc.).
      checkoutUrl: process.env.NUXT_PUBLIC_CHECKOUT_URL || 'https://momentfy.lemonsqueezy.com'
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt' as any
  ],

  pwa: {
    registerType: 'prompt',
    manifest: {
      name: 'Momentfy',
      short_name: 'Momentfy',
      description: 'Booking & Business Management',
      theme_color: '#000000',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}']
    },
    devOptions: {
      enabled: false
    }
  },

  // @nuxtjs/i18n handles only the locale state (active language code, dir,
  // language switcher). Marketing copy is stored in `i18n/locales/{en,ar}/landing.json`
  // and imported directly by `useLandingCopy()` — bypassing vue-i18n's message
  // compiler, which trips on literal `@` in emails and `{...}` placeholders.
  i18n: {
    locales: [
      { code: 'ar', name: 'العربية', dir: 'rtl' },
      { code: 'en', name: 'English', dir: 'ltr' }
    ],
    defaultLocale: 'ar',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  icon: {
    mode: 'svg'
  },

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)'
      }
    }
  },

  fonts: {
    families: [
      {
        name: 'IBM Plex Sans Arabic',
        provider: 'google',
        weights: [400, 500, 600, 700],
        styles: ['normal']
      },
      {
        name: 'Saudi Riyal',
        provider: 'none'
      }
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: [
        'latin',
        'latin-ext',
        'arabic'
      ]
    }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
