import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const commentsRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      // Retry wrapper to handle transient Prisma 'Closed' connection errors
      async function runWithRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
        let attempt = 0;
        while (true) {
          try {
            return await fn();
          } catch (err) {
            const message = (err as any)?.message ?? "";
            console.error("❌ Prisma query failed:", err);
            attempt++;
            // Only retry for transient closed-connection errors
            if (attempt > retries || !message.includes("Closed")) {
              throw err;
            }
            console.warn(
              `⚠ Prisma closed connection detected; attempt ${attempt} of ${retries}. Reconnecting...`
            );
            try {
              await ctx.db.$connect();
            } catch (e) {
              console.error("❌ Prisma reconnect failed:", e);
            }
            // wait a bit before retrying
            await new Promise((r) => setTimeout(r, 500 * attempt));
          }
        }
      }

      return runWithRetry(() =>
        ctx.db.comment.findMany({
          where: { blogSlug: input.slug },
          include: {
            author: {
              select: { id: true, name: true, image: true },
            },
          },
          orderBy: { createdAt: "desc" },
        })
      );
    }),

  add: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
        content: z.string().min(2),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Retry wrapper for transient Prisma errors on mutations as well
      async function runWithRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
        let attempt = 0;
        while (true) {
          try {
            return await fn();
          } catch (err) {
            const message = (err as any)?.message ?? "";
            console.error("❌ Prisma mutation failed:", err);
            attempt++;
            if (attempt > retries || !message.includes("Closed")) {
              throw err;
            }
            console.warn(
              `⚠ Prisma closed connection detected during mutation; attempt ${attempt} of ${retries}. Reconnecting...`
            );
            try {
              await ctx.db.$connect();
            } catch (e) {
              console.error("❌ Prisma reconnect failed:", e);
            }
            await new Promise((r) => setTimeout(r, 500 * attempt));
          }
        }
      }

      return runWithRetry(() =>
        ctx.db.comment.create({
          data: {
            content: input.content,
            blogSlug: input.slug,
            authorId: ctx.session.user.id,
          },
        })
      );
    }),
});
