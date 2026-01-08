export const runtime = "nodejs";

import { handlers } from "~/server/auth";

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

      return new Response(JSON.stringify({
        message: "NextAuth handler error",
        error: err?.message ?? String(err),
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
};

export const GET = wrap(handlers.GET, "GET");
export const POST = wrap(handlers.POST, "POST");
