import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindMate AI | Student Wellness",
  description: "Your GenAI-powered mental wellness companion for exam prep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex text-gray-200 bg-[#0a0a0f] selection:bg-brand-500/30">
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full relative pb-16 md:pb-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/10 via-[#0a0a0f]/0 to-[#0a0a0f]/0 pointer-events-none" />
          <div className="max-w-6xl mx-auto p-4 md:p-8 relative">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
