import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashir Qureshi | Full Stack Developer · AI Engineer · Software Architect",
  description:
    "I design and build enterprise-grade web platforms, AI-powered solutions, automation systems, and scalable products for startups and businesses worldwide.",
  keywords: [
    "Ashir Qureshi",
    "Full Stack Developer",
    "AI Engineer",
    "Software Architect",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Machine Learning",
    "Freelance Developer",
  ],
  authors: [{ name: "Ashir Qureshi" }],
  openGraph: {
    title: "Ashir Qureshi | Full Stack Developer · AI Engineer",
    description:
      "I design and build enterprise-grade web platforms, AI-powered solutions, automation systems, and scalable products.",
    type: "website",
    locale: "en_US",
    url: "https://ashirqureshi.dev",
    siteName: "Ashir Qureshi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashir Qureshi | Full Stack Developer · AI Engineer",
    description:
      "I design and build enterprise-grade web platforms, AI-powered solutions, automation systems, and scalable products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
