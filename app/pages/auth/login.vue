<script setup>
import { z } from 'zod';
definePageMeta({ layout: 'auth', middleware: 'guest' });
const chrome = useChromeCopy();
useHead({ title: () => chrome.value.auth.signIn.docTitle });
const { fetch: fetchSession } = useUserSession();
const toast = useToast();
const route = useRoute();
const localePath = useLocalePath();
const redirectTo = computed(() => {
    const r = route.query.redirect;
    return r && r.startsWith('/') && !r.startsWith('//') ? r : localePath('/dashboard');
});
const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});
const state = reactive({ email: '', password: '' });
const loading = ref(false);
async function onSubmit(event) {
    loading.value = true;
    try {
        await $fetch('/api/auth/login', { method: 'POST', body: event.data });
        await fetchSession();
        await navigateTo(redirectTo.value);
    }
    catch (err) {
        toast.add({ title: chrome.value.auth.signIn.failedToast, description: err.statusMessage || err.message, color: 'error' });
    }
    finally {
        loading.value = false;
    }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">{{ chrome.auth.signIn.title }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ chrome.auth.signIn.subtitle }}</p>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
      <UFormField :label="chrome.auth.signIn.email" name="email" required>
        <UInput v-model="state.email" type="email" :placeholder="chrome.auth.signIn.emailPlaceholder" icon="i-lucide-mail" size="lg" class="w-full" autocomplete="email" />
      </UFormField>

      <UFormField :label="chrome.auth.signIn.password" name="password" required>
        <UInput v-model="state.password" type="password" :placeholder="chrome.auth.signIn.passwordPlaceholder" icon="i-lucide-lock" size="lg" class="w-full" autocomplete="current-password" />
      </UFormField>

      <div class="flex justify-end">
        <NuxtLink to="/auth/forgot-password" class="text-sm text-primary font-medium hover:underline">
          {{ chrome.auth.signIn.forgotPassword }}
        </NuxtLink>
      </div>

      <UButton type="submit" block :loading="loading" size="lg">{{ chrome.auth.signIn.submit }}</UButton>
    </UForm>

    <template #footer>
      <p class="text-sm text-center text-gray-500 dark:text-gray-400">
        {{ chrome.auth.signIn.newHerePrompt }}
        <NuxtLink :to="{ path: '/auth/register', query: route.query.redirect ? { redirect: route.query.redirect } : undefined }" class="text-primary font-medium">{{ chrome.auth.signIn.newHereCta }}</NuxtLink>
      </p>
    </template>
  </UCard>
</template>
