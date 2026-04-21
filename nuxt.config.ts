import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
// Standalone Momentfy customer portal:
//   - Marketing pages prerendered (SEO)
//   - /auth/**, /dashboard/**, /admin/** server-rendered, session via nuxt-auth-utils
//   - Own Postgres `portal` database via Prisma — fully isolated from the main app
export default defineNuxtConfig({

  ssr: true,

  // The payload cache conflicts when sibling routes share a path prefix
  // (e.g. /portal/addons is a page AND /portal/addons/:key is its children —
  // Nuxt tries to use `.../payload/portal/addons` as both a file and a
  // directory). Disabling payload extraction removes the `_payload.json`
  // side-files; the HTML still prerenders and client navigation still works,
  // just without the cached data fetch.
  experimental: {
    payloadExtraction: false
  },

  // Dev server host allowlist. Vite 5+ refuses requests whose Host header
  // isn't on this list (DNS-rebinding protection). Tunnels like cloudflared
  // and ngrok land here — whitelist their wildcard suffixes so LS webhook
  // dry-runs over a tunnel work against `npm run dev`.
  //
  // fs.allow: the portal lives in `Momentfy Portal/` but node_modules are
  // hoisted to the parent `/Volumes/HDD/Momentfy`. Vite's default fs.allow
  // only covers the project root, so iconify/@nuxt/ui modules imported
  // from the parent trip "outside of serving allow list". Adding `..`
  // authorises the parent repo.
  vite: {
    server: {
      allowedHosts: [
        'localhost',
        '.trycloudflare.com',
        '.ngrok.io',
        '.ngrok-free.app',
        '.loca.lt'
      ],
      fs: {
        allow: ['..']
      }
    }
  },

  app: {
    baseURL: '/',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'theme-color', content: '#000000' }
      ]
    }
  },

  runtimeConfig: {
    // Server-only secrets
    databaseUrl: process.env.DATABASE_URL || '',
    sessionPassword: process.env.NUXT_SESSION_PASSWORD || '',
    licensePepper: process.env.LICENSE_PEPPER || '',
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: Number(process.env.SMTP_PORT || 465),
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      from: process.env.SMTP_FROM || 'Momentfy <noreply@momentfy.io>'
    },
    lemonSqueezy: {
      apiKey: process.env.LEMON_SQUEEZY_API_KEY || '',
      storeId: process.env.LEMON_SQUEEZY_STORE_ID || '',
      webhookSecret: process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ''
    },
    github: {
      token: process.env.GITHUB_TOKEN || '',
      org: process.env.GITHUB_ORG || '',
      teamSlug: process.env.GITHUB_TEAM_SLUG || 'customers',
      repo: process.env.GITHUB_REPO || ''
    },
    public: {
      appVersion: pkg.version,
      // Where the "Try demo" CTA sends visitors. Hosted on a separate domain
      // running the Momentfy app.
      demoUrl: process.env.NUXT_PUBLIC_DEMO_URL || 'https://demo.momentfy.com',
      // Hosted checkout fallback (Phase 3 will replace with portal-mediated checkout).
      checkoutUrl: process.env.NUXT_PUBLIC_CHECKOUT_URL || 'https://momentfy.lemonsqueezy.com',
      // Public base URL self-hosted Momentfy instances POST to for license validation.
      portalUrl: process.env.NUXT_PUBLIC_PORTAL_URL || ''
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-auth-utils',
    'nuxt-authorization'
  ],

  // PWA was wired up while this was a marketing-only static site. The portal
  // now has SSR + auth and isn't an install target — the *main app* is what
  // gets installed as a PWA. @vite-pwa/nuxt 0.6 also doesn't support Nuxt 4
  // out of the box, so we drop the module here.

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

  // Default to light mode. Users can still toggle; once they pick a
  // preference it's stored in a cookie and respected. Without this
  // override @nuxtjs/color-mode defaults to `system`, which hands
  // dark-OS users dark on first visit.
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    // Default headers for everything
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)'
      }
    },
    // Marketing pages — prerender for speed + SEO. Public, no auth state.
    '/': { prerender: true },
    '/portal/**': { prerender: true },
    // Auth + portal pages — render client-side. SSR is incompatible with the
    // current @nuxt/ui v4 / reka-ui combo (PopperRoot + Label fail under SSR).
    // Auth pages don't need SEO and middleware redirects happen on the client.
    '/auth/**': { ssr: false },
    '/dashboard/**': { ssr: false },
    '/admin/**': { ssr: false }
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
