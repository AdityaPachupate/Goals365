import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/client.js";
import dotenv from "dotenv";

dotenv.config();

export const auth = betterAuth({
    baseURL: (process.env.BETTER_AUTH_URL || "http://localhost:3000").replace(/\/api\/v1\/auth\/?$/, '').replace(/\/$/, '') + '/api/v1/auth',
    trustedOrigins: ["http://localhost:5173", process.env.FRONTEND_URL].filter(Boolean) as string[],
    database: drizzleAdapter(db, {
        provider: "pg"
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    user: {
        additionalFields: {
            timezone: {
                type: "string",
                required: false,
            }
        }
    }
});
