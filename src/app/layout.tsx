import type { Metadata, Viewport } from "next";
import { Rye, Cinzel, EB_Garamond, Special_Elite } from "next/font/google";
import "./globals.css";

const rye = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-outlaw",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-type",
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
    "Software engineer building full-stack products, backend services, and computer-vision systems. Node.js, PostgreSQL, Next.js, YOLOv8. Three years shipping for startups.",
  keywords: [
    "Ashir Qureshi",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Engineer",
    "Computer Vision",
    "YOLOv8",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Pakistan Developer",
    "Islamabad",
    "Zomiccc",
  ],
  authors: [{ name: "Ashir Qureshi", url: "https://github.com/Zomiccc" }],
  creator: "Ashir Qureshi",
  openGraph: {
    title: "Ashir Qureshi — Software Engineer",
    description:
      "Full-stack products, backend services, and computer-vision systems. Three years shipping for startups.",
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Ashir Qureshi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashir Qureshi — Software Engineer",
    description:
      "Full-stack products, backend services, and computer-vision systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0C0A07",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashir Qureshi",
  jobTitle: "Software Engineer",
  url: SITE,
  email: "ashir.qureshi.aqq@gmail.com",
  sameAs: [
    "https://github.com/Zomiccc",
    "https://www.linkedin.com/in/ashirqureshiaq/",
  ],
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Capital University of Science and Technology",
  },
  knowsAbout: [
    "Full-Stack Development",
    "Backend Engineering",
    "Computer Vision",
    "Machine Learning",
    "Node.js",
    "PostgreSQL",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${rye.variable} ${cinzel.variable} ${garamond.variable} ${specialElite.variable}`}
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
