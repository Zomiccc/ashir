export interface TrailStop {
  id: string;
  /** Map-style place name for the RDR2 trail. */
  place: string;
  chapter: string;
  role: string;
  org: string;
  period: string;
  context?: string;
  bullets: string[];
  tags: string[];
  kind: "work" | "study" | "start";
  /** Position on the parchment map, in percent. */
  x: number;
  y: number;
}

export const trail: TrailStop[] = [
  {
    id: "start",
    place: "First Light",
    chapter: "Prologue",
    role: "Started Writing Code",
    org: "Self-Taught",
    period: "2022",
    bullets: [
      "Started with Python and C++, then followed the problem wherever it went — algorithms, then the web, then machine learning.",
      "Built the habit that still runs everything: ship something small, break it, understand why, ship it again.",
    ],
    tags: ["Python", "C++", "Algorithms"],
    kind: "start",
    x: 8,
    y: 72,
  },
  {
    id: "fmkc",
    place: "Fort Mercer",
    chapter: "Chapter I",
    role: "Software Developer",
    org: "FMKC",
    period: "2023 — 2024",
    context: "Telegram-based crypto rewards platform",
    bullets: [
      "Architected a Telegram bot platform distributing automated crypto rewards to thousands of users on an event-driven Node.js and PostgreSQL backend.",
      "Designed the token reward and transaction system with idempotent processing — consistency held and duplicate payouts were impossible under high concurrency.",
      "Implemented secure authentication and role-based access controls protecting platform integrity and user assets.",
      "Built automation for reward triggers, onboarding, and notification pipelines, cutting manual operations work sharply.",
      "Tuned schema and indexing to hold sub-100ms query performance on real-time transaction throughput at peak load.",
    ],
    tags: ["Node.js", "PostgreSQL", "Redis", "Telegram API", "Auth"],
    kind: "work",
    x: 30,
    y: 44,
  },
  {
    id: "grand",
    place: "Valentine",
    chapter: "Chapter II",
    role: "Web Developer",
    org: "Grand Productum",
    period: "2024 — 2025",
    bullets: [
      "Architected and delivered full-stack web applications supporting the company's digital presence, with measurable gains in performance and engagement.",
      "Integrated third-party APIs and payment gateways, extending platform capability and opening new revenue paths.",
      "Improved core web vitals by 35%+ through code splitting, asset optimisation, and lazy loading.",
      "Developed responsive, accessible UI components in React and TypeScript, lifting the mobile experience across all major devices.",
      "Worked directly with the business team to turn requirements into scalable technical solutions, contributing to 40% growth in online customer acquisition.",
    ],
    tags: ["React", "TypeScript", "Payments", "Web Vitals", "APIs"],
    kind: "work",
    x: 54,
    y: 62,
  },
  {
    id: "cust",
    place: "Saint Denis",
    chapter: "Ongoing",
    role: "BS Computer Science",
    org: "Capital University of Science & Technology",
    period: "Expected 2027",
    context: "Islamabad, Pakistan",
    bullets: [
      "Coursework in Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering, OOP, and Graph Theory.",
      "Systems-leaning focus — memory management, process scheduling, and performance work carried straight into side projects.",
    ],
    tags: ["DSA", "Operating Systems", "DBMS", "Networks", "Graph Theory"],
    kind: "study",
    x: 72,
    y: 30,
  },
  {
    id: "webdeed",
    place: "Blackwater",
    chapter: "Chapter III",
    role: "Software Developer",
    org: "Web Deed",
    period: "2025 — Present",
    context: "Shopify-style e-commerce platform startup",
    bullets: [
      "Spearheaded core platform features — product catalog management, order workflows, and seller dashboards — feeding directly into the go-to-market timeline.",
      "Designed scalable backend services in Node.js and PostgreSQL, improving API response times through query optimisation and Redis-based caching.",
      "Owned major platform components end to end, from architecture decisions through deployment, working directly with founders.",
      "Led front-end development of dynamic React interfaces across buyer and seller surfaces with consistent UI/UX and cross-browser support.",
      "Resolved critical production incidents through proactive monitoring, hotfix deployment, and written incident response.",
      "Worked in Agile sprints — planning, code review, retrospectives — to keep velocity and quality both high.",
    ],
    tags: ["Node.js", "PostgreSQL", "Redis", "React", "Agile", "Production"],
    kind: "work",
    x: 91,
    y: 52,
  },
];

export interface Certification {
  name: string;
  issuer: string;
  kind: "virtual-experience" | "course";
}

export const certifications: Certification[] = [
  { name: "Software Engineering Virtual Experience", issuer: "Electronic Arts — Forage", kind: "virtual-experience" },
  { name: "Software Engineering Virtual Experience", issuer: "Walmart — Forage", kind: "virtual-experience" },
  { name: "Cybersecurity Virtual Experience", issuer: "Deloitte — Forage", kind: "virtual-experience" },
  { name: "Cloud Platform Virtual Experience", issuer: "Verizon — Forage", kind: "virtual-experience" },
  { name: "Data Analytics Virtual Experience", issuer: "Quantium — Forage", kind: "virtual-experience" },
  { name: "Operating Systems", issuer: "Coursera", kind: "course" },
  { name: "Artificial Intelligence", issuer: "Coursera", kind: "course" },
];
