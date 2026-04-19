// Seed the portal DB with the two plans the marketing site advertises.
// Idempotent — safe to re-run.
//
//   pnpm tsx prisma/seed.ts
//
// Or hook it into prisma.config.ts when you're ready (see main app's
// prisma.config.ts for the migrations.seed pattern).

import { PrismaClient } from '../generated/client'

const prisma = new PrismaClient()

const plans = [
  {
    slug: 'self-install',
    name: 'Self-install',
    description: 'You install. Lifetime updates.',
    priceUsdCents: 49900,           // $499 — adjust to actual pricing
    defaultActivations: 1
  },
  {
    slug: 'we-install',
    name: 'We install',
    description: 'We install on your VPS. Lifetime updates.',
    priceUsdCents: 99900,           // $999 — adjust to actual pricing
    defaultActivations: 1
  }
]

async function main() {
  for (const p of plans) {
    const existing = await prisma.plan.findUnique({ where: { slug: p.slug } })
    if (existing) {
      console.log(`✓ plan exists: ${p.slug}`)
    } else {
      await prisma.plan.create({ data: p })
      console.log(`+ plan created: ${p.slug}`)
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
