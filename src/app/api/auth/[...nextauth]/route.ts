export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { handlers } from "~/server/auth";

const wrap = (fn: typeof handlers.GET | typeof handlers.POST, name: string) => {
  return async (req: Request) => {
    try {
      console.log(`[NextAuth ${name}] Starting...`);
      console.log(`[NextAuth ${name}] URL:`, req.url);
      console.log(`[NextAuth ${name}] Method:`, req.method);
      
      const response = await fn(req as any);
      
      console.log(`[NextAuth ${name}] Success - Status:`, response.status);
      return response;
      
    } catch (err: any) {
      console.error(`[NextAuth ${name}] FATAL ERROR:`, {
        message: err?.message,
        name: err?.name,
        code: err?.code,
        stack: err?.stack,
      });

      // Return the actual error to the client for debugging
      return new Response(
        JSON.stringify({
          message: "NextAuth handler error",
          error: err?.message ?? String(err),
          name: err?.name,
          code: err?.code,
          stack: err?.stack?.split('\n').slice(0, 10), // First 10 lines
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
};

export const GET = wrap(handlers.GET, "GET");
export const POST = wrap(handlers.POST, "POST");