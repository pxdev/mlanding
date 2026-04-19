// Session shape augmentation for nuxt-auth-utils.
// Single declaration shared between server and client.

declare module '#auth-utils' {
  interface User {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    isAdmin: boolean
  }

  interface UserSession {
    user: User
    loggedInAt: number
  }
}

export {}
