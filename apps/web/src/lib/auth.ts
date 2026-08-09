import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "/api/v1" 
})

export const { useSession, signIn, signOut } = authClient;
