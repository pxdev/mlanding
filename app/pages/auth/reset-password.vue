<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'Set new password — Momentfy' })

const route = useRoute()
const toast = useToast()
const token = computed(() => (route.query.token as string | undefined) || '')

const schema = z.object({
  password: z.string().min(8, 'At least 8 characters').max(200),
  confirm: z.string()
}).refine(d => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] })
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({ password: '', confirm: '' })
const loading = ref(false)
const done = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!token.value) {
    toast.add({ title: 'Missing token', description: 'Open the reset link from your email.', color: 'error' })
    return
  }
  loading.value = true
  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { token: token.value, password: event.data.password }
    })
    done.value = true
  } catch (err: any) {
    toast.add({ title: 'Reset failed', description: err.statusMessage || err.message, color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">Set a new password</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Choose something memorable but strong.</p>
    </template>

    <div v-if="done" class="text-center py-6">
      <UIcon name="i-lucide-check-circle-2" class="size-10 mx-auto text-primary" />
      <p class="mt-3 text-sm">Password updated. You can sign in now.</p>
      <NuxtLink to="/auth/login" class="text-primary font-medium text-sm mt-4 inline-block">Sign in</NuxtLink>
    </div>

    <UForm v-else :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
      <UFormField label="New password" name="password" required>
        <UInput v-model="state.password" type="password" icon="i-lucide-lock" size="lg" class="w-full" autocomplete="new-password" />
      </UFormField>
      <UFormField label="Confirm password" name="confirm" required>
        <UInput v-model="state.confirm" type="password" icon="i-lucide-lock" size="lg" class="w-full" autocomplete="new-password" />
      </UFormField>
      <UButton type="submit" block :loading="loading" size="lg" :disabled="!token">Update password</UButton>
      <p v-if="!token" class="text-xs text-center text-gray-500">
        This link is missing a token. Open the link from your reset email.
      </p>
    </UForm>
  </UCard>
</template>
