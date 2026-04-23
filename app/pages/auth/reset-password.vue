<script setup>
import { z } from 'zod';
definePageMeta({ layout: 'auth', middleware: 'guest' });
const chrome = useChromeCopy();
useHead({ title: () => chrome.value.auth.reset.docTitle });
const route = useRoute();
const toast = useToast();
const token = computed(() => route.query.token || '');
const schema = z.object({
    password: z.string().min(8, 'At least 8 characters').max(200),
    confirm: z.string()
}).refine(d => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] });
const state = reactive({ password: '', confirm: '' });
const loading = ref(false);
const done = ref(false);
async function onSubmit(event) {
    if (!token.value) {
        toast.add({ title: chrome.value.auth.reset.missingTokenToast, description: chrome.value.auth.reset.missingTokenDesc, color: 'error' });
        return;
    }
    loading.value = true;
    try {
        await $fetch('/api/auth/reset-password', {
            method: 'POST',
            body: { token: token.value, password: event.data.password }
        });
        done.value = true;
    }
    catch (err) {
        toast.add({ title: chrome.value.auth.reset.failedToast, description: err.statusMessage || err.message, color: 'error' });
    }
    finally {
        loading.value = false;
    }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">{{ chrome.auth.reset.title }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ chrome.auth.reset.subtitle }}</p>
    </template>

    <div v-if="done" class="text-center py-6">
      <UIcon name="i-lucide-check-circle-2" class="size-10 mx-auto text-primary" />
      <p class="mt-3 text-sm">{{ chrome.auth.reset.doneBody }}</p>
      <NuxtLink to="/auth/login" class="text-primary font-medium text-sm mt-4 inline-block">{{ chrome.auth.reset.signIn }}</NuxtLink>
    </div>

    <UForm v-else :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
      <UFormField :label="chrome.auth.reset.newPassword" name="password" required>
        <UInput v-model="state.password" type="password" icon="i-lucide-lock" size="lg" class="w-full" autocomplete="new-password" />
      </UFormField>
      <UFormField :label="chrome.auth.reset.confirmPassword" name="confirm" required>
        <UInput v-model="state.confirm" type="password" icon="i-lucide-lock" size="lg" class="w-full" autocomplete="new-password" />
      </UFormField>
      <UButton type="submit" block :loading="loading" size="lg" :disabled="!token">{{ chrome.auth.reset.submit }}</UButton>
      <p v-if="!token" class="text-xs text-center text-gray-500">
        {{ chrome.auth.reset.tokenMissing }}
      </p>
    </UForm>
  </UCard>
</template>
