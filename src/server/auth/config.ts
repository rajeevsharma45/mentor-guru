import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "~/server/db";

// Ensure process.env is used directly
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  console.warn("Google provider not configured: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
}

const providers = [];
if (googleClientId && googleClientSecret) {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  );
}

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

export const authConfig = {
  adapter: PrismaAdapter(db),

  session: {
    strategy: "jwt",
  },

  providers,

  callbacks: {
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub ?? "";
      return session;
    },

    redirect() {
      return "/";
    },
  },
} satisfies NextAuthConfig;
