import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bé Dương | 2D Artist & UI Designer",
  description: "Portfolio of Bé Dương - 2D Artist & UI/UX Designer specializing in Game Art, Character Design, and UI Design. Where dreams take shape under the moonlight.",
  keywords: ["2D Artist", "UI Designer", "Game Art", "Character Design", "Portfolio", "Vietnam", "Graphic Designer", "Bé Dương"],
  authors: [{ name: "Bé Dương" }],
  creator: "Bé Dương",
  metadataBase: new URL("https://beduong.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Bé Dương | 2D Artist & UI Designer",
    description: "Where dreams take shape under the moonlight. Portfolio showcasing Game Art, Character Design, Brand Identity, and UI Design works.",
    type: "website",
    locale: "vi_VN",
    url: "https://beduong.vercel.app",
    siteName: "Bé Dương Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bé Dương - 2D Artist & UI Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bé Dương | 2D Artist & UI Designer",
    description: "Where dreams take shape under the moonlight",
    images: ["/og-image.png"],
    creator: "@beduong",
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className={`${quicksand.variable} ${inter.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
