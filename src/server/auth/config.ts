import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { db } from "~/server/db";

// Validate required environment variables
if (!process.env.GOOGLE_CLIENT_ID) throw new Error("Missing GOOGLE_CLIENT_ID in environment variables");
if (!process.env.GOOGLE_CLIENT_SECRET) throw new Error("Missing GOOGLE_CLIENT_SECRET in environment variables");
if (!process.env.FACEBOOK_CLIENT_ID) throw new Error("Missing FACEBOOK_CLIENT_ID in environment variables");
if (!process.env.FACEBOOK_CLIENT_SECRET) throw new Error("Missing FACEBOOK_CLIENT_SECRET in environment variables");

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the session object and keep type safety.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface JWT {
    sub?: string;
  }
}

/**
 * NextAuth configuration
 */
export const authConfig = {
  adapter: PrismaAdapter(db),

  // JWT-based sessions are fine for scaling
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? (() => { throw new Error("Missing GOOGLE_CLIENT_ID in environment variables"); })(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? (() => { throw new Error("Missing GOOGLE_CLIENT_SECRET in environment variables"); })(),
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      // Attach user ID from token to session
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
