<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'Forgot password — Momentfy' })

const toast = useToast()

const schema = z.object({
  email: z.string().email('Invalid email address')
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({ email: '' })
const loading = ref(false)
const sent = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/auth/forgot-password', { method: 'POST', body: event.data })
    sent.value = true
  } catch (err: any) {
    toast.add({ title: 'Request failed', description: err.statusMessage || err.message, color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">Reset your password</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">We'll email you a link to set a new one.</p>
    </template>

    <div v-if="sent" class="text-center py-6">
      <UIcon name="i-lucide-mail-check" class="size-10 mx-auto text-primary" />
      <p class="mt-3 text-sm">If an account exists for that email, a reset link is on its way.</p>
      <NuxtLink to="/auth/login" class="text-primary font-medium text-sm mt-4 inline-block">Back to sign in</NuxtLink>
    </div>

    <UForm v-else :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
      <UFormField label="Email" name="email" required>
        <UInput v-model="state.email" type="email" icon="i-lucide-mail" size="lg" class="w-full" autocomplete="email" />
      </UFormField>
      <UButton type="submit" block :loading="loading" size="lg">Send reset link</UButton>
    </UForm>

    <template v-if="!sent" #footer>
      <p class="text-sm text-center">
        <NuxtLink to="/auth/login" class="text-gray-500 hover:text-primary">Back to sign in</NuxtLink>
      </p>
    </template>
  </UCard>
</template>
