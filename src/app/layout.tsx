import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google";
import "./globals.css";

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
  keywords: ["2D Artist", "UI Designer", "Game Art", "Character Design", "Portfolio", "Vietnam"],
  authors: [{ name: "Bé Dương" }],
  openGraph: {
    title: "Bé Dương | 2D Artist & UI Designer",
    description: "Where dreams take shape under the moonlight",
    type: "website",
    locale: "vi_VN",
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
      </body>
    </html>
  );
}
