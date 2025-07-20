import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./custom.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
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
      <body className={`${poppins.variable} ${plusJakartaSans.variable} antialiased`} suppressHydrationWarning>
        <Header />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
