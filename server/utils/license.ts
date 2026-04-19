// License key generation + hashing.
//
// Key format: MFY-XXXX-XXXX-XXXX-XXXX-XXXX
//   - 5 groups of 4 chars from a Crockford-style base32 alphabet (no I/L/O/U)
//   - 100 bits of entropy (20 chars × 5 bits)
//   - Stable in chat, email, terminals — no ambiguous glyphs
//
// Storage: only the SHA-256 hash (mixed with LICENSE_PEPPER from env) lives
// in the database. The plaintext key is shown to the customer ONCE at issue
// time; thereafter only the prefix ("MFY-XXXX") is recoverable.
//
// We pepper the hash so a stolen DB dump alone can't be brute-forced offline
// without the env secret. Pepper rotation invalidates all keys — design the
// rollout accordingly.

import { createHash, randomBytes } from 'node:crypto'

const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
const GROUP_LEN = 4
const GROUP_COUNT = 5
const TOTAL_CHARS = GROUP_LEN * GROUP_COUNT // 20

export function generateLicenseKey(): { key: string; prefix: string; hash: string } {
  // 20 chars × 5 bits = 100 bits. randomBytes(13) gives 104 bits which we
  // truncate to 100; plenty of entropy.
  const bytes = randomBytes(13)
  let acc = 0n
  for (const b of bytes) acc = (acc << 8n) | BigInt(b)

  // Take the top 100 bits (drop the bottom 4)
  acc = acc >> 4n

  const chars: string[] = []
  for (let i = 0; i < TOTAL_CHARS; i++) {
    const idx = Number(acc & 31n)
    chars.unshift(ALPHABET[idx]!)
    acc = acc >> 5n
  }

  const groups: string[] = []
  for (let i = 0; i < TOTAL_CHARS; i += GROUP_LEN) {
    groups.push(chars.slice(i, i + GROUP_LEN).join(''))
  }
  const key = `MFY-${groups.join('-')}`
  return { key, prefix: key.slice(0, 8), hash: hashLicenseKey(key) }
}

export function hashLicenseKey(key: string): string {
  const pepper = process.env.LICENSE_PEPPER || ''
  if (!pepper && process.env.NODE_ENV === 'production') {
    // Refuse to operate without a pepper in prod — silent fallback would
    // weaken every key issued during the lapse.
    throw new Error('LICENSE_PEPPER must be set in production')
  }
  return createHash('sha256').update(key + pepper).digest('hex')
}

export function isLicenseKeyShape(s: unknown): s is string {
  if (typeof s !== 'string') return false
  // MFY- followed by 5 groups of 4 chars from the alphabet
  return /^MFY-[0-9A-HJKMNP-TV-Z]{4}(-[0-9A-HJKMNP-TV-Z]{4}){4}$/.test(s)
}
