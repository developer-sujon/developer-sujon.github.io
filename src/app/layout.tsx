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
  metadataBase: new URL("https://developer-sujon.github.io"),
  title: {
    default: "Muhammad Sujon · Lead Software Engineer",
    template: "%s · Muhammad Sujon",
  },
  description:
    "Lead Software Engineer with 5+ years of experience building web platforms, Turborepo monorepos, Cloudflare edge microservices, and production SaaS systems.",
  keywords: [
    "Muhammad Sujon",
    "Lead Software Engineer",
    "Systems Architect",
    "Full Stack Developer",
    "NestJS",
    "React",
    "Next.js",
    "TypeScript",
    "Cloudflare Workers",
    "Turborepo",
    "MongoDB",
    "PostgreSQL",
    "Node.js",
    "MikroTik RouterOS",
    "Software Engineer Bangladesh",
    "Meherpur Software Engineer",
    "Rajshahi Software Engineer",
  ],
  authors: [{ name: "Muhammad Sujon", url: "https://github.com/developer-sujon" }],
  creator: "Muhammad Sujon",
  publisher: "Muhammad Sujon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://developer-sujon.github.io",
  },
  openGraph: {
    title: "Muhammad Sujon · Lead Software Engineer",
    description:
      "Lead Software Engineer building high-performance web platforms, edge microservices, and SaaS systems.",
    url: "https://developer-sujon.github.io",
    siteName: "Muhammad Sujon Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/sujon-avatar.png",
        width: 460,
        height: 460,
        alt: "Muhammad Sujon — Lead Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Muhammad Sujon · Lead Software Engineer",
    description:
      "Lead Software Engineer building high-performance web platforms, edge microservices, and SaaS systems.",
    creator: "@developer-sujon",
    images: ["/sujon-avatar.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Sujon",
  jobTitle: "Lead Software Engineer",
  url: "https://developer-sujon.github.io",
  image: "https://developer-sujon.github.io/sujon-avatar.png",
  sameAs: [
    "https://github.com/developer-sujon",
    "https://www.linkedin.com/in/developer-sujon",
    "https://twitter.com/developer-sujon",
    "https://www.facebook.com/sujon.developer",
    "https://leetcode.com/developer-sujon",
    "https://medium.com/@muhammad-sujon",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Sitgram",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Meherpur College of Engineering and Technology",
  },
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Development",
    "NestJS",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Cloudflare Workers",
    "MongoDB",
    "PostgreSQL",
    "Turborepo Monorepos",
    "MikroTik RouterOS",
    "Double-Entry Accounting",
  ],
  description:
    "Lead Software Engineer with 5+ years of experience building web platforms, type-safe APIs, and cloud infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('theme');
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved === 'dark' || (!saved && systemDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
