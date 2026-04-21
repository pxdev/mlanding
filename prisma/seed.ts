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
    priceUsdCents: 19900,           // $199 — must match the LS variant price
    defaultActivations: 1
  },
  {
    slug: 'we-install',
    name: 'Done-for-you',
    description: 'We install on your VPS. Lifetime updates.',
    priceUsdCents: 29900,           // $299 — must match the LS variant price
    defaultActivations: 1
  }
]

async function main() {
  for (const p of plans) {
    const existing = await prisma.plan.findUnique({ where: { slug: p.slug } })
    if (existing) {
      await prisma.plan.update({
        where: { slug: p.slug },
        data: {
          name: p.name,
          description: p.description,
          priceUsdCents: p.priceUsdCents,
          defaultActivations: p.defaultActivations
        }
      })
      console.log(`✓ plan updated: ${p.slug}`)
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
