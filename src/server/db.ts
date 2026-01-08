import { PrismaClient } from "@prisma/client";
import { env } from "~/env";

const createPrismaClient = () =>
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

// reuse prisma in dev to avoid hot-reload leaks
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// warm connection for serverless (Netlify + Neon fix)
void db.$connect().catch((err) => {
  console.error("❌ Prisma warm start failed:", err);
});
