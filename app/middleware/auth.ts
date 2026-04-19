// Route guard for authenticated portal pages.
// Used by /dashboard/** and /admin/** layouts via definePageMeta.
export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
