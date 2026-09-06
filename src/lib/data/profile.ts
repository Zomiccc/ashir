export const profile = {
  name: "Ashir Qureshi",
  firstName: "Ashir",
  lastName: "Qureshi",
  alias: "Zomiccc",
  role: "Software Engineer",
  title: "Software Engineer — Backend & AI-Integrated Systems",
  roles: [
    "Backend Engineer",
    "Full-Stack Developer",
    "AI & Computer Vision",
    "Systems Integration",
  ],
  location: "Islamabad, Pakistan",
  timezone: "UTC +05:00",
  email: "ashir.qureshi.aqq@gmail.com",
  phone: "+92 325 9105688",
  phoneHref: "+923259105688",
  cv: "/Ashir_Qureshi_Resume.pdf",
  cvDocx: "/Ashir_Qureshi_Resume.docx",
  openTo: "Backend & full-stack engineering roles",
  links: {
    github: "https://github.com/Zomiccc",
    linkedin: "https://www.linkedin.com/in/ashirqureshiaq/",
    whatsapp: "https://wa.me/923259105688",
    email: "mailto:ashir.qureshi.aqq@gmail.com",
  },
  summary:
    "Backend and full-stack software engineer with production experience designing REST APIs, event-driven architectures, and third-party system integrations — Stripe, WhatsApp, Twilio, WooCommerce, Shopify — using Node.js, NestJS, TypeScript, and PostgreSQL.",
  summaryLong:
    "I build the parts of a product that have to be right: the API surface, the data model, the payment and messaging integrations, and the webhook flows that keep everything in sync when a dozen systems are talking at once. Alongside that I have shipped a computer-vision pipeline end to end — fine-tuning YOLOv8, running real-time inference, and wiring OCR into the same pass. The common thread is orchestrating services that were never designed to talk to each other, and making the result hold up in production.",
  short:
    "Backend and full-stack engineer. REST APIs, event-driven systems, payment and messaging integrations, and computer vision.",
} as const;

export const stats = [
  { label: "Years Building", value: 3, suffix: "+", note: "Shipping since 2023" },
  { label: "Live Products", value: 4, suffix: "", note: "In production today" },
  { label: "Repositories", value: 25, suffix: "", note: "Public on GitHub" },
  { label: "Integrations", value: 10, suffix: "+", note: "Payments, messaging, data" },
] as const;

/** Self-assessed depth by discipline — drives the radial meters in the profile block. */
export const meters = [
  { name: "Backend & APIs", value: 92 },
  { name: "Full-Stack", value: 86 },
  { name: "AI / Vision", value: 78 },
] as const;

/** Short, checkable credibility markers shown under the hero. */
export const marquee = [
  "Node.js",
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "Next.js",
  "React Native",
  "Prisma",
  "Stripe",
  "WhatsApp API",
  "YOLOv8",
  "OpenCV",
  "Docker",
  "Supabase",
] as const;
