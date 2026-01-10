import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

// Cache the auth function for React Server Components
const auth = cache(uncachedAuth);

// Re-export everything
export { auth, handlers, signIn, signOut };

// Also export authConfig in case needed elsewhere
export { authConfig } from "./config";