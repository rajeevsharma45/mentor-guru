// src/app/api/submit-form/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, attempts, course } = body;

    // Validate required fields
    if (!name || !email || !mobile || !attempts || !course) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Get Google Sheets Web App URL from environment variable
    const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!GOOGLE_SHEET_URL) {
      console.error("Google Sheets URL not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Send data to Google Sheets
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        attempts,
        course,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit to Google Sheets");
    }

    return NextResponse.json(
      { message: "Form submitted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}