import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE = "https://ashir-qureshi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Ashir Qureshi — Software Engineer",
    template: "%s · Ashir Qureshi",
  },
  description:
    "Backend and full-stack software engineer. REST APIs, event-driven architectures, and third-party integrations with Node.js, NestJS, TypeScript and PostgreSQL — plus computer-vision pipelines in YOLOv8 and OpenCV.",
  keywords: [
    "Ashir Qureshi",
    "Software Engineer",
    "Backend Engineer",
    "Full Stack Developer",
    "Node.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Computer Vision",
    "YOLOv8",
    "Stripe Integration",
    "WhatsApp API",
    "Islamabad",
    "Pakistan",
  ],
  authors: [{ name: "Ashir Qureshi", url: "https://github.com/Zomiccc" }],
  creator: "Ashir Qureshi",
  openGraph: {
    title: "Ashir Qureshi — Software Engineer",
    description:
      "Backend & full-stack engineer. APIs, event-driven systems, payment and messaging integrations, and computer vision.",
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Ashir Qureshi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashir Qureshi — Software Engineer",
    description:
      "Backend & full-stack engineer. APIs, event-driven systems, and computer vision.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0616",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashir Qureshi",
  jobTitle: "Software Engineer",
  url: SITE,
  email: "ashir.qureshi.aqq@gmail.com",
  sameAs: ["https://github.com/Zomiccc", "https://www.linkedin.com/in/ashirqureshiaq/"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Capital University of Science and Technology",
  },
  knowsAbout: [
    "Backend Engineering",
    "REST API Design",
    "Event-Driven Architecture",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "Computer Vision",
    "Payment Integration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-grade="vice"
      className={`${archivo.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
