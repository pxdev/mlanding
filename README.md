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

## Pending work

The bilingual marketing copy lives in `app/composables/useLandingCopy.ts` (~3,500 lines, hardcoded `en` / `ar` objects). The plan is to migrate this into proper `@nuxtjs/i18n` JSON locale files at `i18n/locales/{en,ar}/landing.json` so the codebase follows the same i18n pattern as the main app. The Nuxt config already points to those JSON files — currently empty stubs. Until migration completes, the composable provides the strings.

See `/Users/aamin/.claude/plans/warm-painting-widget.md` for the full extraction plan and migration instructions.
