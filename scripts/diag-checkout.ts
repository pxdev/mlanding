// Standalone LS checkout diagnostic.
//
//   pnpm tsx scripts/diag-checkout.ts
//
// Reads env + Plan rows, tries the same POST /v1/checkouts call the portal
// does, and dumps the raw LS response. Pinpoints the usual failure modes:
//   - Plan.lsVariantId not set       → skip the plan, print the gap
//   - Variant exists in wrong mode   → LS 404 with "Variant not found"
//   - API key wrong store            → LS 403 "not authorized"
//   - Store not activated            → LS 422 with a clear message

import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/client'

function bail(msg: string): never {
  console.error(msg)
  process.exit(1)
}

const apiKey = process.env.LEMON_SQUEEZY_API_KEY || bail('LEMON_SQUEEZY_API_KEY missing')
const storeId = process.env.LEMON_SQUEEZY_STORE_ID || bail('LEMON_SQUEEZY_STORE_ID missing')
if (!process.env.DATABASE_URL) bail('DATABASE_URL missing')

const rawFlag = (process.env.LEMON_SQUEEZY_TEST_MODE || '').toLowerCase().trim()
const testMode = rawFlag === 'true' ? true
  : rawFlag === 'false' ? false
  : process.env.NODE_ENV !== 'production'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! })
})

function redactKey(k: string) {
  if (k.length < 20) return k
  return `${k.slice(0, 10)}...${k.slice(-10)} (${k.length} chars)`
}

async function readVariant(variantId: string) {
  const res = await fetch(`https://api.lemonsqueezy.com/v1/variants/${variantId}?include=product`, {
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`
    }
  })
  const json: any = await res.json().catch(() => null)
  return { status: res.status, json }
}

async function tryCheckout(variantId: string) {
  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_data: {
          email: 'diag@momentfy.io',
          custom: { account_id: 'diag-run' }
        },
        test_mode: testMode
      },
      relationships: {
        store: { data: { type: 'stores', id: String(storeId) } },
        variant: { data: { type: 'variants', id: String(variantId) } }
      }
    }
  }

  const res = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  })
  const text = await res.text()
  let parsed: any
  try { parsed = JSON.parse(text) } catch { parsed = text }
  return { status: res.status, body: parsed }
}

async function listStores() {
  const res = await fetch('https://api.lemonsqueezy.com/v1/stores', {
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`
    }
  })
  const json: any = await res.json().catch(() => null)
  return { status: res.status, json }
}

async function main() {
  console.log('═══ Momentfy portal checkout diagnostic ═══\n')
  console.log(`API key     : ${redactKey(apiKey)}`)
  console.log(`Store ID    : ${storeId}`)
  console.log(`test_mode   : ${testMode}  (LEMON_SQUEEZY_TEST_MODE=${process.env.LEMON_SQUEEZY_TEST_MODE ?? '<unset>'}, NODE_ENV=${process.env.NODE_ENV ?? '<unset>'})`)
  console.log()

  console.log('── Stores visible to this API key ──')
  const stores = await listStores()
  if (stores.status >= 200 && stores.status < 300 && stores.json?.data) {
    const rows: any[] = stores.json.data
    if (rows.length === 0) {
      console.log('   (none — key has no accessible stores; generate a new key)')
    } else {
      for (const s of rows) {
        const a = s.attributes || {}
        const match = String(s.id) === String(storeId) ? ' ← matches .env' : ''
        console.log(`   id=${s.id}   "${a.name}"   ${a.domain ?? ''}   country=${a.country ?? '?'}${match}`)
      }
      if (!rows.some((s: any) => String(s.id) === String(storeId))) {
        console.log(`   ⚠ LEMON_SQUEEZY_STORE_ID=${storeId} is NOT in this list.`)
        console.log(`     Set it to one of the ids above. That's your checkout failure.`)
      }
    }
  } else {
    console.log(`   LS ${stores.status}: ${JSON.stringify(stores.json).slice(0, 300)}`)
  }
  console.log()

  const plans = await prisma.plan.findMany({ orderBy: { priceUsdCents: 'asc' } })
  if (plans.length === 0) {
    console.log('⚠ No Plan rows in DB. Run:  pnpm tsx prisma/seed.ts')
    return
  }

  for (const p of plans) {
    console.log(`── Plan: ${p.slug}  (${p.name})`)
    console.log(`   priceUsdCents=${p.priceUsdCents}  defaultActivations=${p.defaultActivations}`)
    console.log(`   lsVariantId=${p.lsVariantId ?? '<NULL>'}  isActive=${p.isActive}`)

    if (!p.lsVariantId) {
      console.log(`   → Skipped: set lsVariantId via  pnpm db:studio  first.`)
      console.log()
      continue
    }

    const vr = await readVariant(p.lsVariantId)
    if (vr.status === 200 && vr.json?.data?.attributes) {
      const va: any = vr.json.data.attributes
      const product = (vr.json.included || []).find((i: any) => i.type === 'products')
      const pa: any = product?.attributes || {}
      console.log(`   variant    : ${va.name} · $${(va.price ?? 0) / 100} · status=${va.status}`)
      console.log(`   product    : "${pa.name}" · status=${pa.status} · buy-now=${pa.buy_now} · store=${product?.relationships?.store?.data?.id ?? '?'}`)
      if (pa.status !== 'published') {
        console.log(`   ⚠ Product status is "${pa.status}" — not "published". Customers can't check out against drafts/archives.`)
      }
    } else {
      console.log(`   ⚠ variant read failed (${vr.status}): ${JSON.stringify(vr.json).slice(0, 300)}`)
    }

    const result = await tryCheckout(p.lsVariantId)
    console.log(`   LS status  : ${result.status}`)
    if (result.status >= 200 && result.status < 300) {
      const url = result.body?.data?.attributes?.url
      console.log(`   checkout URL: ${url}`)
      console.log(`   ✓ LS accepted the request. Open the URL above; if the page loads you're golden.`)
      console.log(`     If it shows "store not activated", your test-mode store still needs setup even for test checkouts.`)
    } else {
      const errors = result.body?.errors
      if (Array.isArray(errors)) {
        for (const e of errors) {
          console.log(`   ✗ ${e.status ?? ''} ${e.title ?? ''}`)
          if (e.detail) console.log(`     detail: ${e.detail}`)
          if (e.source) console.log(`     source: ${JSON.stringify(e.source)}`)
        }
      } else {
        console.log(`   raw: ${JSON.stringify(result.body).slice(0, 500)}`)
      }
    }
    console.log()
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error('diag failed:', err)
    await prisma.$disconnect()
    process.exit(1)
  })
