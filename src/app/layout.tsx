import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Sujon · Lead Systems Architect",
  description: "Systems Architect & Senior Full-Stack Engineer at Yupsis and Sitgram. Specializing in Cloudflare edge computing, million-row spreadsheet virtualization, and IoT command queues.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-400">
        {children}
      </body>
    </html>
  );
}
