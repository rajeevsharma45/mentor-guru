export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { handlers } from "~/server/auth";

// Wrapper function for better error logging
const wrap = (fn: typeof handlers.GET | typeof handlers.POST, name: string) => {
  return async (req: Request) => {
    try {
      console.debug(`[NextAuth] ${name} request:`, {
        method: req.method,
        url: req.url,
        hasCookie: !!req.headers.get("cookie"),
        contentType: req.headers.get("content-type") ?? null,
      });

      return await fn(req as any);
    } catch (err: any) {
      console.error(`[NextAuth] ${name} handler error:`, err?.stack ?? err);

      return new Response(
        JSON.stringify({
          message: "NextAuth handler error",
          error: err?.message ?? String(err),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
};

// Export wrapped handlers (remove the duplicate destructuring)
export const GET = wrap(handlers.GET, "GET");
export const POST = wrap(handlers.POST, "POST");