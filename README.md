# Momentfy Landing

Standalone marketing / landing site for Momentfy. Separate Nuxt 4 project, separate git repo, separate deployment. **No backend, no database, no auth.**

## Local dev

```sh
pnpm install
cp .env.example .env
pnpm dev
```

Opens on <http://localhost:3001> (port `3001` keeps it out of the way of the main app on `3000`).

## Required env vars

| Var | Purpose |
| --- | --- |
| `NUXT_PUBLIC_DEMO_URL` | Where "Try demo" / "Sign in" buttons send visitors (the live app instance, e.g. `https://demo.momentfy.com`). |
| `NUXT_PUBLIC_CHECKOUT_URL` | Hosted checkout for the "Buy / Get the code" CTA (Lemon Squeezy etc.). |

## Routes

- `/` — landing home
- `/portal/features`, `/portal/pricing`, `/portal/showcase`, `/portal/faq`, `/portal/docs`, `/portal/legal`, `/portal/download`
- `/portal/addons`, `/portal/addons/:key`
- `/portal/modules/:id`
- `/portal/solutions`, `/portal/solutions/:slug`

## Architecture

- **Framework**: Nuxt 4 (SPA mode, `ssr: false`)
- **i18n**: `@nuxtjs/i18n` — English + Arabic, default `ar`, `no_prefix` strategy
- **UI**: `@nuxt/ui` v4 + Tailwind v4
- **Icons**: Lucide, Hugeicons, Simple Icons (via Iconify)
- **Fonts**: IBM Plex Sans Arabic (Google Fonts) + custom Saudi Riyal symbol font

## Deployment

- Build: `pnpm build`
- Preview locally: `pnpm preview`
- Static generate (optional): `pnpm generate`
- Designed for Vercel / Netlify / any static host. Set the env vars in the platform's project settings.

## Copy storage

Bilingual marketing copy lives in `i18n/locales/{en,ar}/landing.json` under a top-level `landing` key. The composable `useLandingCopy()` (in `app/composables/useLandingCopy.ts`) imports both JSON files directly and returns the active-locale tree.

We bypass vue-i18n's message compiler for these files (they're not registered in the i18n module config) because the marketing copy contains literal `@` (email addresses) and `{...}` tokens that conflict with vue-i18n's linked-message / placeholder syntax. Locale state — active code, RTL direction, language switcher — still flows through `@nuxtjs/i18n`.

To edit copy, change the JSON file and the page updates on next reload.
