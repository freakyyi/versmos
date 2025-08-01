import type { Metadata } from "next";
import { Manrope, Caveat } from "next/font/google";
import "./globals.css";
import "./custom.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Versmos - A Video Production Company",
  description: "Digital Agency That Thrives on Your Success. Video Editing, VFX & Compositing, Motion Graphics, and Social Media Designs.",
  keywords: "video production, video editing, VFX, motion graphics, social media designs, animation",
  authors: [{ name: "Versmos" }],
  openGraph: {
    title: "Versmos - A Video Production Company",
    description: "Digital Agency That Thrives on Your Success",
    type: "website",
    locale: "en_US",
    siteName: "Versmos",
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${caveat.variable} antialiased`} suppressHydrationWarning>
        <Header />
        {/* Spacer for fixed header */}
        <div className="h-[84px] w-full" aria-hidden="true" />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
