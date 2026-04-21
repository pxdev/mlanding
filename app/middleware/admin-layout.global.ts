// Unify the chrome for admin users.
//
// Without this, admins see two different shells — dashboard.vue (white
// sidebar) on /dashboard/** and admin.vue (black rail) on /admin/**.
// We force the admin layout everywhere an admin lands so the nav never
// reshuffles under them. Non-admins keep the customer dashboard layout.

export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/dashboard')) return
  const { user } = useUserSession()
  if (user.value?.isAdmin) {
    setPageLayout('admin')
  }
})
