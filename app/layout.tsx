import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./motioncue.css";

const nohemi = localFont({
  src: [
    {
      path: "../public/fonts/nohemi/Nohemi-Thin-BF6438cc57e2011.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/nohemi/Nohemi-ExtraLight-BF6438cc581502c.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/nohemi/Nohemi-Light-BF6438cc5702321.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/nohemi/Nohemi-Regular-BF6438cc579d934.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nohemi/Nohemi-Medium-BF6438cc57ddecd.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/nohemi/Nohemi-SemiBold-BF6438cc57db2ff.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nohemi/Nohemi-Bold-BF6438cc577b524.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/nohemi/Nohemi-ExtraBold-BF6438cc5761ae2.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/nohemi/Nohemi-Black-BF6438cc565e67b.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
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
      <body className={`${nohemi.variable} antialiased`} suppressHydrationWarning>
        <Header />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
