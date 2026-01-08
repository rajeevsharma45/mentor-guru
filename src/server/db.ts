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

// Listen for Prisma client errors and try to reconnect on transient "Closed" errors
// This helps in serverless environments (Netlify + Neon) when connections are dropped
// and query attempts can otherwise fail unexpectedly.
db.$on("error", (err) => {
  // Log the raw error for debugging
  console.error("❌ Prisma client error:", err);

  // Attempt a reconnect for transient closed-connection events
  const message = (err as any)?.message ?? "";
  const kind = (err as any)?.kind;
  const code = (err as any)?.code;
  if (
    (typeof message === "string" && message.includes("Closed")) ||
    kind === "Closed" ||
    code === "ECONNRESET"
  ) {
    console.warn("⚠️ Detected closed Postgres connection; attempting to reconnect...");
    setTimeout(() => {
      void db.$connect().catch((e) =>
        console.error("❌ Prisma reconnection attempt failed:", e)
      );
    }, 1000);
  }
});

// Graceful shutdown to ensure Prisma disconnects on process termination
if (typeof process !== "undefined") {
  process.on("SIGINT", async () => {
    await db.$disconnect().catch(() => void 0);
    process.exit(0);
  });
  process.on("SIGTERM", async () => {
    await db.$disconnect().catch(() => void 0);
    process.exit(0);
  });
}
