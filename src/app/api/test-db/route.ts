// src/app/api/test-db/route.ts
export const runtime = "nodejs";

import { db } from "~/server/db";

export async function GET() {
  const logs: string[] = [];
  
  try {
    logs.push("🔍 Testing database connection...");
    logs.push(`Environment: ${process.env.NODE_ENV}`);
    logs.push(`Has DATABASE_URL: ${!!process.env.DATABASE_URL}`);
    logs.push(`Has NEXTAUTH_SECRET: ${!!process.env.NEXTAUTH_SECRET}`);
    logs.push(`Has NEXTAUTH_URL: ${!!process.env.NEXTAUTH_URL}`);
    logs.push(`NEXTAUTH_URL value: ${process.env.NEXTAUTH_URL}`);
    logs.push(`Has GOOGLE_CLIENT_ID: ${!!process.env.GOOGLE_CLIENT_ID}`);
    logs.push(`Has GOOGLE_CLIENT_SECRET: ${!!process.env.GOOGLE_CLIENT_SECRET}`);
    
    // Test Prisma
    const result = await db.$queryRaw`SELECT 1 as test, version() as pg_version`;
    logs.push("✅ Prisma query successful!");
    
    // Test Prisma client generation
    logs.push(`Prisma client exists: ${!!db}`);
    
    return Response.json({ 
      status: "success",
      message: "Database and environment working!",
      result,
      logs
    });
  } catch (error: any) {
    logs.push(`❌ Error: ${error.message}`);
    logs.push(`Error name: ${error.name}`);
    logs.push(`Error code: ${error.code}`);
    
    return Response.json({ 
      status: "error",
      error: error.message,
      name: error.name,
      code: error.code,
      logs,
      stack: error.stack
    }, { status: 500 });
  }
}