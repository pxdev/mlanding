<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'Sign in — Momentfy' })

const { fetch: fetchSession } = useUserSession()
const toast = useToast()
const route = useRoute()
const redirectTo = computed(() => {
  const r = route.query.redirect as string | undefined
  return r && r.startsWith('/') && !r.startsWith('//') ? r : '/dashboard'
})

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({ email: '', password: '' })
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: event.data })
    await fetchSession()
    await navigateTo(redirectTo.value)
  } catch (err: any) {
    toast.add({ title: 'Sign-in failed', description: err.statusMessage || err.message, color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">Sign in</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Welcome back. Manage your licenses and source-code access.</p>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
      <UFormField label="Email" name="email" required>
        <UInput v-model="state.email" type="email" placeholder="you@company.com" icon="i-lucide-mail" size="lg" class="w-full" autocomplete="email" />
      </UFormField>

      <UFormField label="Password" name="password" required>
        <UInput v-model="state.password" type="password" placeholder="••••••••" icon="i-lucide-lock" size="lg" class="w-full" autocomplete="current-password" />
      </UFormField>

      <div class="flex justify-end">
        <NuxtLink to="/auth/forgot-password" class="text-sm text-primary font-medium hover:underline">
          Forgot password?
        </NuxtLink>
      </div>

      <UButton type="submit" block :loading="loading" size="lg">Sign in</UButton>
    </UForm>

    <template #footer>
      <p class="text-sm text-center text-gray-500 dark:text-gray-400">
        New here?
        <NuxtLink :to="{ path: '/auth/register', query: route.query.redirect ? { redirect: route.query.redirect as string } : undefined }" class="text-primary font-medium">Create an account</NuxtLink>
      </p>
    </template>
  </UCard>
</template>
