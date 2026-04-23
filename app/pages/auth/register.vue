<script setup>
import { z } from 'zod';
definePageMeta({ layout: 'auth', middleware: 'guest' });
const chrome = useChromeCopy();
useHead({ title: () => chrome.value.auth.register.docTitle });
const { fetch: fetchSession } = useUserSession();
const toast = useToast();
const route = useRoute();
const redirectTo = computed(() => {
    const r = route.query.redirect;
    return r && r.startsWith('/') && !r.startsWith('//') ? r : '/dashboard';
});
const schema = z.object({
    firstName: z.string().min(1, 'First name is required').max(80),
    lastName: z.string().min(1, 'Last name is required').max(80),
    email: z.string().email('Invalid email address').max(160),
    password: z.string().min(8, 'At least 8 characters').max(200),
    githubUsername: z.string().regex(/^[a-zA-Z0-9-]{1,39}$/, 'Letters, numbers and dashes only').optional().or(z.literal(''))
});
const state = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    githubUsername: ''
});
const loading = ref(false);
async function onSubmit(event) {
    loading.value = true;
    try {
        await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                ...event.data,
                githubUsername: event.data.githubUsername || null
            }
        });
        await fetchSession();
        await navigateTo(redirectTo.value);
    }
    catch (err) {
        toast.add({ title: chrome.value.auth.register.failedToast, description: err.statusMessage || err.message, color: 'error' });
    }
    finally {
        loading.value = false;
    }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">{{ chrome.auth.register.title }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ chrome.auth.register.subtitle }}</p>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="grid grid-cols-2 gap-3">
        <UFormField :label="chrome.auth.register.firstName" name="firstName" required>
          <UInput v-model="state.firstName" size="lg" class="w-full" autocomplete="given-name" />
        </UFormField>
        <UFormField :label="chrome.auth.register.lastName" name="lastName" required>
          <UInput v-model="state.lastName" size="lg" class="w-full" autocomplete="family-name" />
        </UFormField>
      </div>

      <UFormField :label="chrome.auth.register.email" name="email" required>
        <UInput v-model="state.email" type="email" icon="i-lucide-mail" size="lg" class="w-full" autocomplete="email" />
      </UFormField>

      <UFormField :label="chrome.auth.register.password" name="password" required :hint="chrome.auth.register.passwordHint">
        <UInput v-model="state.password" type="password" icon="i-lucide-lock" size="lg" class="w-full" autocomplete="new-password" />
      </UFormField>

      <UFormField :label="chrome.auth.register.github" name="githubUsername" :hint="chrome.auth.register.githubHint">
        <UInput v-model="state.githubUsername" icon="i-simple-icons-github" size="lg" class="w-full" :placeholder="chrome.auth.register.githubPlaceholder" />
      </UFormField>

      <UButton type="submit" block :loading="loading" size="lg">{{ chrome.auth.register.submit }}</UButton>
    </UForm>

    <template #footer>
      <p class="text-sm text-center text-gray-500 dark:text-gray-400">
        {{ chrome.auth.register.haveAccountPrompt }}
        <NuxtLink :to="{ path: '/auth/login', query: route.query.redirect ? { redirect: route.query.redirect } : undefined }" class="text-primary font-medium">{{ chrome.auth.register.haveAccountCta }}</NuxtLink>
      </p>
    </template>
  </UCard>
</template>
