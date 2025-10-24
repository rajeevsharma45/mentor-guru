import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { SessionProvider } from "next-auth/react"; // ✅ Import SessionProvider

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Mentor Guru",
  description: "Your learning platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// Load Google Geist font
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} bg-white text-gray-900 antialiased min-h-screen flex flex-col`}
      >
        {/* ✅ Wrap everything in SessionProvider for NextAuth session access */}
        <SessionProvider>
          <TRPCReactProvider>
            {/* Global Navbar */}
            <Navbar />

            {/* Main Page Wrapper */}
            <main className="flex-1 w-full flex justify-center">
              <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
