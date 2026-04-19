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
- `/api/v1/license/{activate,heartbeat,deactivate}` — public, called by self-hosted Momentfy instances

## Architecture

- **Framework**: Nuxt 4 — marketing pages prerendered to static HTML; auth and dashboard pages render client-side (SPA-style). The `nuxt-auth-utils` session is fetched on hydration and the route middleware redirects unauthenticated visitors. SSR for the auth/dashboard pages is disabled because @nuxt/ui v4's reka-ui primitives (`UFormField`, `UDropdownMenu`) aren't SSR-safe in this version — revisit when reka-ui ships a fix.
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
| 2 | ✅ shipped | License model + admin CRUD + audit log |
| 3 | ✅ shipped | Lemon Squeezy webhook + portal-mediated checkout |
| 4 | ✅ shipped | GitHub `customers` team invite |
| 5 | ✅ shipped | License validation API for self-hosted instances |
| 6 | ⏳ planned | Polish (emails, search, billing portal link, 2FA) |

### Phase 3 setup

After running `pnpm db:migrate` and `pnpm tsx prisma/seed.ts` (which creates the two plans):

1. In Lemon Squeezy, create a one-time product with two variants matching the marketing site's plans (Self-install, Done-for-you).
2. Open Prisma Studio (`pnpm db:studio`) → `Plan` table → set `lsVariantId` on each row to the matching LS variant id.
3. In LS dashboard, configure the webhook endpoint: `https://YOUR_PORTAL/api/webhooks/lemon-squeezy`. Set the signing secret to the value of `LEMON_SQUEEZY_WEBHOOK_SECRET` in your env. Subscribe to `order_created` and `order_refunded` at minimum.
4. Set `LEMON_SQUEEZY_API_KEY` and `LEMON_SQUEEZY_STORE_ID` in `.env`.

When a logged-in visitor clicks Buy on `/portal/pricing`, the portal hits LS's `POST /v1/checkouts`, binds the order to their account via `custom_data.account_id`, and 302s to the hosted checkout. On payment, the webhook issues the License (returns plaintext key once via email) and records the Order. Refunds revoke any licenses on that order.

### Phase 5: license validation API

Self-hosted Momentfy instances call back to the portal via three endpoints. None require a session — they're authenticated by the license key (activate) or activation token (heartbeat / deactivate).

```
POST /api/v1/license/activate
  body:    { key, fingerprint, hostname?, version? }
  200:     { activationToken, license: { plan, status, maxActivations, expiresAt } }
  404:     license not found (or wrong format)
  403:     { reason: 'revoked' | 'expired' | 'max_activations_reached' }
  429:     too many activate calls in window (5/min/IP)

POST /api/v1/license/heartbeat
  body:    { activationToken, fingerprint, version? }
  200:     { valid: true, license: {...} }
  401:     activation token unknown / reset by admin
  403:     { reason: 'revoked' | 'expired' }

POST /api/v1/license/deactivate
  body:    { activationToken, fingerprint }
  200:     { ok: true }   (always — idempotent, no info-leak)
```

**Recommended client behaviour for the self-hosted instance**:
1. On first boot, prompt operator for the license key during install.
2. Call `activate` once — store the returned `activationToken` in `PlatformSetting.license.activationToken`.
3. Background task (hourly) calls `heartbeat`. On `403 revoked` → display banner, optionally degrade non-essential features. On network error → 7-day grace period before degrading.
4. On uninstall / migration to new server, call `deactivate` to free the slot.

Embedding this client into the main Momentfy app is a separate ticket.

### Phase 4 setup

GitHub team-invite uses Octokit and a single team in your org (default `customers`).

1. In your GitHub org, create a team called `customers` (or set `GITHUB_TEAM_SLUG` to your chosen name).
2. Give the team **read** access on the source repo.
3. Generate a PAT with `admin:org` scope (or a fine-grained token with **Members > Read & write** on the org). Set `GITHUB_TOKEN`, `GITHUB_ORG` (and optionally `GITHUB_REPO`) in `.env`.
4. After phase 3 issues a license, the webhook calls `inviteToCustomersTeam(githubUsername)` if the customer's GitHub username is on file. If not, the customer adds it on `/dashboard/profile` and the invite triggers from there. Failed invites surface in the audit log; admins can retry via `POST /api/portal/admin/invites/:id/retry`.
