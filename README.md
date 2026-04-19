# Momentfy Portal

Standalone Nuxt 4 site that serves as both the **public marketing pages** for Momentfy and the **customer portal** (license manager, source-code access, billing). Separate git repo, separate deployment, isolated `portal` Postgres database. The only runtime touchpoint with the main Momentfy app is the license-validation HTTP API that self-hosted instances call back to.

## Local dev

```sh
pnpm install
cp .env.example .env

# Once Postgres is running and DATABASE_URL is set:
pnpm db:migrate           # applies Prisma migrations to the `portal` database

pnpm dev                  # http://localhost:5173
```

Mailpit is convenient for catching transactional email locally — point `SMTP_HOST=localhost`, `SMTP_PORT=1025`.

## Required env vars

See `.env.example` for the canonical list. Phase-by-phase:

| Phase | Variables |
| --- | --- |
| 1 (foundation) | `DATABASE_URL`, `NUXT_SESSION_PASSWORD`, `SMTP_*` |
| 2 (licenses) | `LICENSE_PEPPER` |
| 3 (Lemon Squeezy) | `LEMON_SQUEEZY_*` |
| 4 (GitHub invites) | `GITHUB_TOKEN`, `GITHUB_ORG`, `GITHUB_TEAM_SLUG`, `GITHUB_REPO` |
| 5 (license API) | `NUXT_PUBLIC_PORTAL_URL` |
| Marketing | `NUXT_PUBLIC_DEMO_URL`, `NUXT_PUBLIC_CHECKOUT_URL` |

## Routes

**Marketing (prerendered)**
- `/` — landing home
- `/portal/{features,pricing,showcase,faq,docs,legal,download}`
- `/portal/addons`, `/portal/addons/:key`
- `/portal/modules/:id`
- `/portal/solutions`, `/portal/solutions/:slug`

**Portal (server-rendered, auth required for `/dashboard/**` and `/admin/**`)**
- `/auth/{login,register,forgot-password,reset-password}`
- `/dashboard` — license listing
- `/dashboard/billing`, `/dashboard/profile` *(coming Phase 2+)*
- `/admin/{users,licenses,audit}` *(coming Phase 2)*

**API**
- `/api/auth/{login,register,logout,forgot-password,reset-password,change-password}`
- `/api/portal/**` *(Phase 2+: customer-facing license endpoints)*
- `/api/portal/admin/**` *(Phase 2+: operator endpoints)*
- `/api/webhooks/lemon-squeezy` *(Phase 3)*
- `/api/v1/license/{activate,heartbeat,deactivate}` *(Phase 5)*

## Architecture

- **Framework**: Nuxt 4 (SSR with prerender for marketing pages)
- **i18n**: `@nuxtjs/i18n` — English + Arabic, default `ar`, `no_prefix` strategy
- **UI**: `@nuxt/ui` v4 + Tailwind v4
- **Icons**: Lucide, Hugeicons, Simple Icons (via Iconify)
- **Fonts**: IBM Plex Sans Arabic (Google Fonts) + custom Saudi Riyal symbol font
- **Auth**: `nuxt-auth-utils` — sessions in encrypted cookie, `hashPassword`/`verifyPassword` use scrypt
- **DB**: Prisma 7 + `@prisma/adapter-pg` against an isolated Postgres database (`portal`)
- **Email**: nodemailer over SMTP

## Database

Phase 1 schema (in `prisma/schema.prisma`):

```
Account         — email, passwordHash, firstName/lastName, githubUsername, isAdmin, isActive
PasswordReset   — accountId, token (SHA-256 hash), expiresAt, usedAt
```

Phases 2–5 add: `Plan`, `Order`, `License`, `Activation`, `RepoInvite`, `AuditLog`. See `/Users/aamin/.claude/plans/landing-license-portal.md` for the full schema.

The portal DB is **completely isolated** from the main Momentfy app's DB. They share Postgres credentials but nothing else; the only runtime seam is the license validation HTTP API.

## Copy storage

Bilingual marketing copy lives in `i18n/locales/{en,ar}/landing.json` under a top-level `landing` key. The composable `useLandingCopy()` (in `app/composables/useLandingCopy.ts`) imports both JSON files directly and returns the active-locale tree.

We bypass vue-i18n's message compiler for these files (they're not registered in the i18n module config) because the marketing copy contains literal `@` (email addresses) and `{...}` tokens that conflict with vue-i18n's linked-message / placeholder syntax. Locale state — active code, RTL direction, language switcher — still flows through `@nuxtjs/i18n`.

To edit copy, change the JSON file and the page updates on next reload.

## Promoting a user to admin

There's no UI for this yet. After registering, set the flag manually:

```sh
pnpm db:studio
# Account → toggle isAdmin
```

Or via SQL:

```sql
UPDATE "Account" SET "isAdmin" = true WHERE email = 'you@momentfy.io';
```

## Deployment

- Build: `pnpm build`
- Preview locally: `pnpm preview`
- The portal needs a Node runtime (it has SSR + an API). Static-only hosts won't work.
- Recommended: Vercel (Node functions), Railway, Fly.io, or any Node host with Postgres available.
- Run `pnpm db:migrate deploy` on each release.

## Phase roadmap

See `/Users/aamin/.claude/plans/landing-license-portal.md` for the full plan.

| Phase | Status | What |
| --- | --- | --- |
| 1 | ✅ shipped | Prisma + auth + SSR foundation |
| 2 | ⏳ planned | License model + admin CRUD |
| 3 | ⏳ planned | Lemon Squeezy webhook + auto-issuance |
| 4 | ⏳ planned | GitHub `customers` team invite |
| 5 | ⏳ planned | License validation API for self-hosted instances |
| 6 | ⏳ planned | Polish (emails, search, billing portal link, 2FA) |
