// GitHub team-membership wrapper. We add customers to a single team in our
// org (default `customers`) that has read access to the source repo.
// One team, many customers — easier to manage than per-customer collaborator
// invites.
//
// Auth: PAT with `admin:org` (Members > Read & write) or fine-grained token
// scoped to the org. See README phase-4 setup.
//
// API ref:
//   PUT  /orgs/{org}/teams/{team_slug}/memberships/{username}
//   DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}
//   GET  /orgs/{org}/teams/{team_slug}/memberships/{username}
//
// Octokit handles retries internally; we only catch + format errors.

import { Octokit } from '@octokit/rest'
import prisma from './prisma'
import { auditLog } from './audit'

let _octokit: Octokit | null = null
function octokit(): Octokit {
  if (_octokit) return _octokit
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN is not set')
  _octokit = new Octokit({ auth: token })
  return _octokit
}

function org() {
  const o = process.env.GITHUB_ORG
  if (!o) throw new Error('GITHUB_ORG is not set')
  return o
}
function team() {
  const t = process.env.GITHUB_TEAM_SLUG || 'customers'
  return t
}

// Send (or update) the team-invite. Idempotent on the GitHub side:
// repeating the call when the user is already a member is a no-op.
export async function inviteToCustomersTeam(githubUsername: string) {
  return octokit().teams.addOrUpdateMembershipForUserInOrg({
    org: org(),
    team_slug: team(),
    username: githubUsername,
    role: 'member'
  })
}

export async function removeFromCustomersTeam(githubUsername: string) {
  return octokit().teams.removeMembershipForUserInOrg({
    org: org(),
    team_slug: team(),
    username: githubUsername
  })
}

export async function checkMembership(githubUsername: string) {
  // 200 + state='active' → member; 404 → not a member; 200 + state='pending'
  // → invite sent but not accepted yet. Octokit throws on 404 — catch.
  try {
    const res = await octokit().teams.getMembershipForUserInOrg({
      org: org(),
      team_slug: team(),
      username: githubUsername
    })
    return res.data.state as 'active' | 'pending'
  } catch (err: any) {
    if (err.status === 404) return null
    throw err
  }
}

// Highest-level helper: ensure the customer has a RepoInvite row and try
// to send it. Used by the LS webhook (after issuing a license) and by the
// profile page (after the customer adds their GitHub username).
//
// Safe to call repeatedly; caller doesn't need to know if an invite is
// already pending. Errors are recorded on the RepoInvite row, not thrown.
export async function ensureRepoInvite(args: {
  accountId: string
  githubUsername: string
  actorId?: string | null
}): Promise<{ ok: boolean; status: 'SENT' | 'ACCEPTED' | 'FAILED' | 'PENDING'; error?: string }> {
  const { accountId, githubUsername } = args

  // Upsert the RepoInvite row.
  const invite = await prisma.repoInvite.upsert({
    where: { accountId_githubUsername: { accountId, githubUsername } },
    create: { accountId, githubUsername, status: 'PENDING', attempts: 0 },
    update: {}
  })
  if (invite.status === 'ACCEPTED') return { ok: true, status: 'ACCEPTED' }

  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_ORG) {
    // Not configured — leave row PENDING for an admin retry later.
    return { ok: false, status: 'PENDING', error: 'GitHub not configured' }
  }

  try {
    await inviteToCustomersTeam(githubUsername)
    const updated = await prisma.repoInvite.update({
      where: { id: invite.id },
      data: { status: 'SENT', sentAt: new Date(), attempts: invite.attempts + 1, lastError: null }
    })
    await auditLog({
      actorId: args.actorId ?? null,
      action: 'repo.invite.sent',
      targetType: 'RepoInvite',
      targetId: updated.id,
      metadata: { accountId, githubUsername }
    })
    return { ok: true, status: 'SENT' }
  } catch (err: any) {
    const msg = err?.message || String(err)
    await prisma.repoInvite.update({
      where: { id: invite.id },
      data: {
        status: 'FAILED',
        attempts: invite.attempts + 1,
        lastError: msg.slice(0, 500)
      }
    })
    await auditLog({
      actorId: args.actorId ?? null,
      action: 'repo.invite.failed',
      targetType: 'RepoInvite',
      targetId: invite.id,
      metadata: { accountId, githubUsername, error: msg.slice(0, 200) }
    })
    return { ok: false, status: 'FAILED', error: msg }
  }
}
