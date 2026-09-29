import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://blogging.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BLOGGING — Technology Insights for Modern Businesses",
    template: "%s | BLOGGING",
  },
  description:
    "A knowledge hub from a regional IT consultancy. Insights on artificial intelligence, cybersecurity, cloud computing, software development, and digital transformation.",
  keywords: [
    "IT consultancy",
    "technology insights",
    "artificial intelligence",
    "cybersecurity",
    "cloud computing",
    "digital transformation",
    "software development",
  ],
  openGraph: {
    type: "website",
    siteName: "BLOGGING",
    title: "BLOGGING — Technology Insights for Modern Businesses",
    description:
      "Insights on AI, cybersecurity, cloud, software engineering, and digital transformation for modern businesses.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "BLOGGING — Technology Insights for Modern Businesses",
    description:
      "Insights on AI, cybersecurity, cloud, software engineering, and digital transformation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
