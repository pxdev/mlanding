// Operator-only guard. Used in addition to `auth` middleware on /admin/** pages.
export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession()
  if (!user.value?.isAdmin) {
    return navigateTo('/dashboard')
  }
})
