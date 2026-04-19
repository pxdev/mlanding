<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'Create account — Momentfy' })

const { fetch: fetchSession } = useUserSession()
const toast = useToast()

const schema = z.object({
  firstName: z.string().min(1, 'First name is required').max(80),
  lastName: z.string().min(1, 'Last name is required').max(80),
  email: z.string().email('Invalid email address').max(160),
  password: z.string().min(8, 'At least 8 characters').max(200),
  githubUsername: z.string().regex(/^[a-zA-Z0-9-]{1,39}$/, 'Letters, numbers and dashes only').optional().or(z.literal(''))
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  githubUsername: ''
})
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        ...event.data,
        githubUsername: event.data.githubUsername || null
      }
    })
    await fetchSession()
    await navigateTo('/dashboard')
  } catch (err: any) {
    toast.add({ title: 'Registration failed', description: err.statusMessage || err.message, color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">Create your account</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">It's free to sign up. Buy a license whenever you're ready.</p>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="grid grid-cols-2 gap-3">
        <UFormField label="First name" name="firstName" required>
          <UInput v-model="state.firstName" size="lg" class="w-full" autocomplete="given-name" />
        </UFormField>
        <UFormField label="Last name" name="lastName" required>
          <UInput v-model="state.lastName" size="lg" class="w-full" autocomplete="family-name" />
        </UFormField>
      </div>

      <UFormField label="Email" name="email" required>
        <UInput v-model="state.email" type="email" icon="i-lucide-mail" size="lg" class="w-full" autocomplete="email" />
      </UFormField>

      <UFormField label="Password" name="password" required hint="At least 8 characters">
        <UInput v-model="state.password" type="password" icon="i-lucide-lock" size="lg" class="w-full" autocomplete="new-password" />
      </UFormField>

      <UFormField label="GitHub username" name="githubUsername" hint="Optional now — required before we can give you repo access">
        <UInput v-model="state.githubUsername" icon="i-simple-icons-github" size="lg" class="w-full" placeholder="octocat" />
      </UFormField>

      <UButton type="submit" block :loading="loading" size="lg">Create account</UButton>
    </UForm>

    <template #footer>
      <p class="text-sm text-center text-gray-500 dark:text-gray-400">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-primary font-medium">Sign in</NuxtLink>
      </p>
    </template>
  </UCard>
</template>
