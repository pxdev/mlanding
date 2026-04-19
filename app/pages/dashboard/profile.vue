<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Profile — Momentfy portal' })

const toast = useToast()
const { fetch: fetchSession } = useUserSession()

interface Profile {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  githubUsername: string | null
  createdAt: string
  lastLoginAt: string | null
  repoInvite: {
    status: 'PENDING' | 'SENT' | 'ACCEPTED' | 'FAILED'
    attempts: number
    lastError: string | null
    sentAt: string | null
    acceptedAt: string | null
  } | null
}

const { data: profile, refresh } = await useFetch<Profile>('/api/portal/profile')

const profileSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  githubUsername: z.string().regex(/^[a-zA-Z0-9-]{1,39}$/, 'Letters, numbers and dashes only').optional().or(z.literal(''))
})
type ProfileSchema = z.output<typeof profileSchema>

const state = reactive<Partial<ProfileSchema>>({
  firstName: '',
  lastName: '',
  githubUsername: ''
})

watch(profile, (p) => {
  if (!p) return
  state.firstName = p.firstName || ''
  state.lastName = p.lastName || ''
  state.githubUsername = p.githubUsername || ''
}, { immediate: true })

const profileLoading = ref(false)
async function saveProfile(event: FormSubmitEvent<ProfileSchema>) {
  profileLoading.value = true
  try {
    const res = await $fetch<{ invite: { status: string; error?: string } | null }>('/api/portal/profile', {
      method: 'PATCH',
      body: {
        firstName: event.data.firstName,
        lastName: event.data.lastName,
        githubUsername: event.data.githubUsername || null
      }
    })
    await fetchSession()
    await refresh()
    if (res.invite) {
      const ok = res.invite.status === 'SENT' || res.invite.status === 'ACCEPTED'
      toast.add({
        title: ok ? 'Profile saved · GitHub invite sent' : 'Profile saved · GitHub invite issue',
        description: ok ? `We've added you to the customers team.` : (res.invite.error || 'See profile for details.'),
        color: ok ? 'success' : 'warning'
      })
    } else {
      toast.add({ title: 'Profile saved', color: 'success' })
    }
  } catch (err: any) {
    toast.add({ title: 'Save failed', description: err.statusMessage || err.message, color: 'error' })
  } finally {
    profileLoading.value = false
  }
}

// ─── Change password ──
const pwdSchema = z.object({
  currentPassword: z.string().min(1, 'Required'),
  newPassword: z.string().min(8, 'At least 8 characters'),
  confirm: z.string()
}).refine(d => d.newPassword === d.confirm, { message: 'Passwords do not match', path: ['confirm'] })
type PwdSchema = z.output<typeof pwdSchema>

const pwdState = reactive<Partial<PwdSchema>>({ currentPassword: '', newPassword: '', confirm: '' })
const pwdLoading = ref(false)
async function changePassword(event: FormSubmitEvent<PwdSchema>) {
  pwdLoading.value = true
  try {
    await $fetch('/api/auth/change-password', {
      method: 'POST',
      body: { currentPassword: event.data.currentPassword, newPassword: event.data.newPassword }
    })
    pwdState.currentPassword = ''
    pwdState.newPassword = ''
    pwdState.confirm = ''
    toast.add({ title: 'Password updated', color: 'success' })
  } catch (err: any) {
    toast.add({ title: 'Update failed', description: err.statusMessage || err.message, color: 'error' })
  } finally {
    pwdLoading.value = false
  }
}

const inviteColor: Record<string, 'success' | 'error' | 'warning' | 'neutral'> = {
  ACCEPTED: 'success', SENT: 'success', PENDING: 'neutral', FAILED: 'error'
}
function fmt(d: string | null) { return d ? new Date(d).toLocaleString() : '—' }
</script>

<template>
  <div v-if="profile" class="space-y-8 max-w-2xl">
    <header>
      <h1 class="text-2xl font-semibold">Profile</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">Your name, GitHub username, and password.</p>
    </header>

    <UCard>
      <template #header>
        <h2 class="font-semibold">Account</h2>
      </template>

      <UForm :schema="profileSchema" :state="state" class="space-y-4" @submit="saveProfile">
        <div class="grid grid-cols-2 gap-3">
          <UFormField label="First name" name="firstName" required>
            <UInput v-model="state.firstName" size="lg" class="w-full" />
          </UFormField>
          <UFormField label="Last name" name="lastName" required>
            <UInput v-model="state.lastName" size="lg" class="w-full" />
          </UFormField>
        </div>

        <UFormField label="Email">
          <UInput :model-value="profile.email" disabled size="lg" class="w-full" />
        </UFormField>

        <UFormField label="GitHub username" name="githubUsername" hint="Required for source-repo access. We'll invite you to the customers team automatically.">
          <UInput v-model="state.githubUsername" icon="i-simple-icons-github" size="lg" class="w-full" placeholder="octocat" />
        </UFormField>

        <UButton type="submit" :loading="profileLoading" size="lg">Save</UButton>
      </UForm>
    </UCard>

    <UCard v-if="profile.githubUsername">
      <template #header>
        <h2 class="font-semibold">Source-code access</h2>
      </template>

      <div v-if="profile.repoInvite" class="space-y-2 text-sm">
        <div class="flex items-center gap-2">
          <UBadge :color="inviteColor[profile.repoInvite.status]" variant="soft">{{ profile.repoInvite.status }}</UBadge>
          <span class="text-gray-500">for <code>{{ profile.githubUsername }}</code></span>
        </div>
        <dl class="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-500">
          <div><dt class="inline">Sent: </dt><dd class="inline">{{ fmt(profile.repoInvite.sentAt) }}</dd></div>
          <div><dt class="inline">Accepted: </dt><dd class="inline">{{ fmt(profile.repoInvite.acceptedAt) }}</dd></div>
          <div v-if="profile.repoInvite.attempts"><dt class="inline">Attempts: </dt><dd class="inline">{{ profile.repoInvite.attempts }}</dd></div>
        </dl>
        <p v-if="profile.repoInvite.lastError" class="text-xs text-error mt-2">{{ profile.repoInvite.lastError }}</p>
        <p v-if="profile.repoInvite.status === 'SENT'" class="text-xs text-gray-500 mt-2">
          Check your GitHub notifications and accept the team invite. We'll mark this as <code>ACCEPTED</code> on the next poll.
        </p>
      </div>
      <p v-else class="text-sm text-gray-500">
        No invite yet. We'll send one automatically once you have an active license.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="font-semibold">Change password</h2>
      </template>
      <UForm :schema="pwdSchema" :state="pwdState" class="space-y-4" @submit="changePassword">
        <UFormField label="Current password" name="currentPassword" required>
          <UInput v-model="pwdState.currentPassword" type="password" size="lg" class="w-full" autocomplete="current-password" />
        </UFormField>
        <UFormField label="New password" name="newPassword" required hint="At least 8 characters">
          <UInput v-model="pwdState.newPassword" type="password" size="lg" class="w-full" autocomplete="new-password" />
        </UFormField>
        <UFormField label="Confirm new password" name="confirm" required>
          <UInput v-model="pwdState.confirm" type="password" size="lg" class="w-full" autocomplete="new-password" />
        </UFormField>
        <UButton type="submit" :loading="pwdLoading" size="lg">Update password</UButton>
      </UForm>
    </UCard>

    <p class="text-xs text-gray-400">
      Joined {{ fmt(profile.createdAt) }} · last sign-in {{ fmt(profile.lastLoginAt) }}
    </p>
  </div>

  <div v-else class="text-center py-12 text-gray-500">
    <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin mx-auto" />
  </div>
</template>
