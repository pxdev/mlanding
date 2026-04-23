<script setup>
import { z } from 'zod';
definePageMeta({ layout: 'auth', middleware: 'guest' });
const chrome = useChromeCopy();
useHead({ title: () => chrome.value.auth.forgot.docTitle });
const toast = useToast();
const schema = z.object({
    email: z.string().email('Invalid email address')
});
const state = reactive({ email: '' });
const loading = ref(false);
const sent = ref(false);
async function onSubmit(event) {
    loading.value = true;
    try {
        await $fetch('/api/auth/forgot-password', { method: 'POST', body: event.data });
        sent.value = true;
    }
    catch (err) {
        toast.add({ title: chrome.value.auth.forgot.failedToast, description: err.statusMessage || err.message, color: 'error' });
    }
    finally {
        loading.value = false;
    }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">{{ chrome.auth.forgot.title }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ chrome.auth.forgot.subtitle }}</p>
    </template>

    <div v-if="sent" class="text-center py-6">
      <UIcon name="i-lucide-mail-check" class="size-10 mx-auto text-primary" />
      <p class="mt-3 text-sm">{{ chrome.auth.forgot.sentBody }}</p>
      <NuxtLink to="/auth/login" class="text-primary font-medium text-sm mt-4 inline-block">{{ chrome.auth.forgot.backToSignIn }}</NuxtLink>
    </div>

    <UForm v-else :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
      <UFormField :label="chrome.auth.forgot.email" name="email" required>
        <UInput v-model="state.email" type="email" icon="i-lucide-mail" size="lg" class="w-full" autocomplete="email" />
      </UFormField>
      <UButton type="submit" block :loading="loading" size="lg">{{ chrome.auth.forgot.submit }}</UButton>
    </UForm>

    <template v-if="!sent" #footer>
      <p class="text-sm text-center">
        <NuxtLink to="/auth/login" class="text-gray-500 hover:text-primary">{{ chrome.auth.forgot.backToSignIn }}</NuxtLink>
      </p>
    </template>
  </UCard>
</template>
