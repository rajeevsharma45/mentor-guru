import { handlers } from "~/server/auth";

// Wrap NextAuth handlers to add robust logging and safer error responses.
// This makes it easier to capture server-side issues in deploy logs and
// returns a minimal JSON error when something goes wrong during auth flows.
const wrap = (fn: typeof handlers.GET | typeof handlers.POST, name: string) => {
  return async (req: Request) => {
    try {
      // Log basic request metadata without exposing sensitive values
      console.debug(`[NextAuth] ${name} request:`, {
        method: req.method,
        url: req.url,
        hasCookie: !!req.headers.get("cookie"),
        contentType: req.headers.get("content-type") ?? null,
      });

      return await fn(req as any);
    } catch (err: any) {
      // Log the full error to server logs (Netlify deploy logs)
      console.error(`[NextAuth] ${name} handler error:`, err?.stack ?? err);

      // Return a safe JSON payload for debugging from the client side
      // without exposing secrets. This helps diagnose 500s in production.
      const body = {
        message: "NextAuth handler error",
        error: err?.message ?? String(err),
      };

      return new Response(JSON.stringify(body), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
};

export const GET = wrap(handlers.GET, "GET");
export const POST = wrap(handlers.POST, "POST");
