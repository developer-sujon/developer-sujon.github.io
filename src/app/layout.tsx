import type { Metadata } from "next";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Sujon · Lead Systems Architect & Distributed Cloud Engineer",
  description: "Independent systems chronicle and technical portfolio of Muhammad Sujon. Systems architecture at Yupsis and Sitgram covering sub-second Cloudflare edge pipelines, million-row spreadsheet virtualization, and IoT command queues.",
  keywords: [
    "Muhammad Sujon",
    "Systems Architect",
    "Yupsis",
    "Sitgram",
    "Zotlyx",
    "Elizn",
    "Eazlock",
    "Torongo",
    "Cloudflare Workers",
    "Durable Objects",
    "Handsontable Virtualization",
    "Next.js 15",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-[#378add]/20 selection:text-sky-300">
        {children}
      </body>
    </html>
  );
}
