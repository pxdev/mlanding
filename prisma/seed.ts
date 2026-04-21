// Seed the portal DB with the two plans the marketing site advertises.
// Idempotent — safe to re-run.
//
//   npm run db:seed
//
// Prisma 7 requires an explicit driver adapter when instantiating
// PrismaClient — no more zero-arg constructor. We also load .env manually
// here since prisma.config.ts only runs for CLI commands, not scripts.

import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/client'

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set — check your .env')
  process.exit(1)
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

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
