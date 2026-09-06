/**
 * Skills grouped into six segments — rendered as a radial selector.
 * Each segment names the tool that leads it.
 */

export interface Segment {
  id: string;
  label: string;
  /** Short descriptor shown above the lead tool. */
  role: string;
  lead: string;
  blurb: string;
  skills: string[];
}

export const skillSegments: Segment[] = [
  {
    id: "backend",
    label: "Backend",
    role: "Primary",
    lead: "Node.js",
    blurb:
      "Where most of my work lives. REST surfaces, event-driven flows, and data models that stay correct when several systems write at once.",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "REST API Design",
      "Webhooks",
      "Event-Driven Architecture",
      "JWT Authentication",
      "Authorization / RBAC",
      "Rate Limiting",
      "Socket.IO",
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    role: "Specialty",
    lead: "Stripe",
    blurb:
      "Making services that were never designed to talk to each other agree on what happened — payments, messaging, commerce, and market data.",
    skills: [
      "Stripe",
      "PayPal",
      "NOWPayments",
      "WooCommerce",
      "Shopify",
      "WhatsApp / Meta APIs",
      "Twilio",
      "SendGrid",
      "Telegram Bot API",
      "Google Cloud Vision",
      "Twelve Data",
    ],
  },
  {
    id: "ai",
    label: "AI & Vision",
    role: "Applied",
    lead: "YOLOv8",
    blurb:
      "Detection and recognition pipelines built end to end — fine-tuned on custom data and tuned to run in near real time.",
    skills: [
      "YOLOv8",
      "OpenCV",
      "EasyOCR",
      "PyTorch",
      "TensorFlow",
      "Object Detection",
      "Model Training & Evaluation",
      "Computer Vision",
      "Deep Learning",
      "scikit-learn",
    ],
  },
  {
    id: "data",
    label: "Data",
    role: "Foundation",
    lead: "PostgreSQL",
    blurb:
      "Schema design, indexing, and query patterns. The difference between a product that works in a demo and one that holds in production.",
    skills: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "MongoDB",
      "SQLite",
      "Prisma ORM",
      "Supabase",
      "Schema Design",
      "Query Optimisation",
      "SQL",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    role: "Full-Stack",
    lead: "Next.js",
    blurb:
      "Interfaces that stay fast on a bad connection. Typed, responsive, and built from the same API contract as everything else.",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Angular",
      "Framer Motion",
      "Responsive UI",
    ],
  },
  {
    id: "platform",
    label: "Platform",
    role: "Delivery",
    lead: "Docker",
    blurb:
      "Ship it, run it, and know what it is doing — plus the languages and fundamentals underneath all of it.",
    skills: [
      "Docker",
      "Git & GitHub",
      "Linux",
      "Vercel",
      "Render",
      "Cloudflare R2",
      "Upstash Redis",
      "C++",
      "Python",
      "Java",
      "C#",
      "Bash",
    ],
  },
];

/** What I take on — presented without pricing; scope is a conversation. */
export interface Service {
  id: string;
  title: string;
  blurb: string;
  items: string[];
}

export const services: Service[] = [
  {
    id: "backend",
    title: "Backend & API Engineering",
    blurb:
      "The layer everything else depends on. REST APIs, authentication, event-driven workflows, and data models designed for correctness before speed.",
    items: [
      "REST API design & documentation",
      "Authentication, RBAC & multi-tenancy",
      "Event-driven & webhook workflows",
      "PostgreSQL schema and query tuning",
    ],
  },
  {
    id: "integrations",
    title: "Systems Integration",
    blurb:
      "Connecting your product to the services it needs — payments, messaging, and commerce platforms — so state stays consistent across all of them.",
    items: [
      "Stripe, PayPal & billing automation",
      "WhatsApp, Twilio & SendGrid messaging",
      "WooCommerce & Shopify order flows",
      "Third-party API orchestration",
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack Product Builds",
    blurb:
      "End-to-end delivery, from data model to deployment — SaaS platforms, dashboards, storefronts, and the mobile clients that go with them.",
    items: [
      "Next.js & React applications",
      "React Native mobile clients",
      "Admin dashboards & internal tools",
      "Deployment on Vercel and Render",
    ],
  },
  {
    id: "vision",
    title: "Computer Vision & ML",
    blurb:
      "Detection, tracking, and OCR pipelines trained on your data and tuned to run where you actually need them.",
    items: [
      "YOLOv8 custom model fine-tuning",
      "Object detection & tracking",
      "OCR and plate-recognition pipelines",
      "Real-time video processing",
    ],
  },
];
