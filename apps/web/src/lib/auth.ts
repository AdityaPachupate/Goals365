import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/auth` : (typeof window !== 'undefined' ? window.location.origin + '/api/v1/auth' : 'http://localhost:5173/api/v1/auth')
})

export const { useSession, signIn, signOut } = authClient;
