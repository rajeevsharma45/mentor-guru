import NextAuth from "next-auth";

import { authConfig } from "./config";

// Initialize NextAuth without caching for now (to see if that's the issue)
const nextAuth = NextAuth(authConfig);

export const { auth, handlers, signIn, signOut } = nextAuth;

// Also export authConfig
export { authConfig } from "./config";