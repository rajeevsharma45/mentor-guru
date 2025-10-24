import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const commentsRouter = createTRPCRouter({
  // Fetch comments for a given blog post
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: { blogSlug: input.slug },
        orderBy: { createdAt: "desc" },
        include: { author: true },
      });
    }),

  // Post a new comment
  add: protectedProcedure
    .input(z.object({
      slug: z.string(),
      content: z.string().min(2),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.create({
        data: {
          content: input.content,
          blogSlug: input.slug,
          authorId: ctx.session.user.id,
        },
      });
    }),
});
