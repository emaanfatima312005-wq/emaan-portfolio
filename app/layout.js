import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Emaan Fatima — Software Engineer & AI Explorer",
  description:
    "A whimsical, scroll-driven portfolio by Emaan Fatima. Ideas, code, and brighter tomorrows.",
  keywords: [
    "Emaan Fatima",
    "Software Engineer",
    "AI",
    "Next.js",
    "React",
    "Portfolio",
    "Web Developer",
    "Pakistan",
  ],
  authors: [{ name: "Emaan Fatima" }],
  openGraph: {
    title: "Emaan Fatima — Software Engineer & AI Explorer",
    description:
      "A whimsical, scroll-driven portfolio built with Next.js, Three.js, and a lot of curiosity.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          {children}
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
