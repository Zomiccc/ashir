/**
 * The Weapon Wheel — skills grouped into six wedges, RDR2 style.
 * Each wedge is one discipline; the "sidearm" is the headline tool.
 */

export interface Wedge {
  id: string;
  /** Wheel label. */
  label: string;
  /** RDR2 weapon-slot flavour. */
  slot: string;
  sidearm: string;
  blurb: string;
  skills: string[];
}

export const arsenal: Wedge[] = [
  {
    id: "backend",
    label: "Backend",
    slot: "Repeater",
    sidearm: "Node.js",
    blurb:
      "Where most of the real work lives. Services, APIs, and data models that stay correct under concurrency.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Redis",
      "Authentication Systems",
      "Real-Time Systems",
      "Socket.IO",
      "Prisma ORM",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    slot: "Sidearm",
    sidearm: "Next.js",
    blurb:
      "Interfaces that feel fast on a bad connection. Typed, accessible, and responsive by default.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML / CSS",
      "Web Vitals",
    ],
  },
  {
    id: "ml",
    label: "ML & Vision",
    slot: "Rifle",
    sidearm: "YOLOv8",
    blurb:
      "Detection and recognition pipelines that run near real-time — trained on custom data, tuned for edge hardware.",
    skills: [
      "YOLOv8",
      "OpenCV",
      "EasyOCR",
      "PyTorch",
      "TensorFlow",
      "Deep Learning",
      "Model Training",
      "Image Processing",
      "scikit-learn",
    ],
  },
  {
    id: "data",
    label: "Databases",
    slot: "Provisions",
    sidearm: "PostgreSQL",
    blurb:
      "Schema design, indexing, and query patterns — the difference between an app that works and one that holds.",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "SQLite",
      "MariaDB",
      "Schema Design",
      "Query Optimisation",
    ],
  },
  {
    id: "languages",
    label: "Languages",
    slot: "Throwables",
    sidearm: "Python",
    blurb:
      "Reach for whatever the problem calls for. Python for speed of thought, C++ when it has to be fast.",
    skills: ["Python", "C++", "C", "C#", "TypeScript", "JavaScript", "Java", "Bash", "PowerShell"],
  },
  {
    id: "ops",
    label: "DevOps",
    slot: "Kit",
    sidearm: "Docker",
    blurb:
      "Ship it, run it, understand what it is doing. Plus the fundamentals underneath all of it.",
    skills: [
      "Git & GitHub",
      "Docker",
      "Linux",
      "CMake",
      "Vercel",
      "Render",
      "Heroku",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "OOP",
      "Graph Theory",
    ],
  },
];

/** Services offered — presented as the "Camp Ledger". */
export interface Service {
  id: string;
  title: string;
  price: string;
  blurb: string;
  items: string[];
}

export const services: Service[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Builds",
    price: "Project-based",
    blurb:
      "End-to-end product work — from schema to deployment. Storefronts, dashboards, internal tools, and platforms.",
    items: [
      "Next.js / React front-ends",
      "Node.js APIs & auth",
      "PostgreSQL schema design",
      "Deployment & CI",
    ],
  },
  {
    id: "backend",
    title: "Backend & API Engineering",
    price: "Hourly or retainer",
    blurb:
      "Services that hold under load. Real-time systems, caching layers, and APIs designed for correctness first.",
    items: [
      "REST API design",
      "Redis caching & pub/sub",
      "Real-time (WebSocket) systems",
      "Performance & query tuning",
    ],
  },
  {
    id: "cv",
    title: "Computer Vision & ML",
    price: "Project-based",
    blurb:
      "Detection, recognition, and OCR pipelines — trained on your data and tuned to run where you need them.",
    items: [
      "YOLOv8 custom training",
      "OCR / ALPR pipelines",
      "Video-stream processing",
      "Edge-ready inference",
    ],
  },
  {
    id: "automation",
    title: "Automation & Bots",
    price: "Fixed scope",
    blurb:
      "Take the repetitive work off your hands. Bots, scrapers, schedulers, and integration glue that just runs.",
    items: [
      "Telegram / Discord bots",
      "Scheduled jobs & pipelines",
      "Third-party API integration",
      "Notification systems",
    ],
  },
];
