export interface Role {
  id: string;
  role: string;
  org: string;
  period: string;
  /** Sorting key — most recent first. */
  order: number;
  location?: string;
  context?: string;
  kind: "work" | "internship" | "study";
  bullets: string[];
  tags: string[];
}

export const experience: Role[] = [
  {
    id: "protonsoft",
    role: "Full Stack Engineer",
    org: "Proton Soft Tech",
    period: "Aug 2026 — Present",
    order: 6,
    location: "Islamabad · Hybrid",
    kind: "internship",
    context: "Internship",
    bullets: [
      "Developing and maintaining modern web applications across the front end and back end, working in the MERN stack with MongoDB.",
      "Building responsive interfaces with a focus on performance, usability, and clean structure.",
      "Working with databases and APIs to develop scalable application features.",
      "Collaborating on troubleshooting, functional testing, and overall software quality.",
    ],
    tags: ["MERN", "MongoDB", "React", "Node.js", "APIs"],
  },
  {
    id: "webdeed",
    role: "Software Developer",
    org: "WebDeed",
    period: "2025 — Present",
    order: 5,
    context: "E-commerce platform",
    kind: "work",
    bullets: [
      "Architected and built core e-commerce platform components — product catalog, order workflows, and seller dashboards — on Node.js, Express, and PostgreSQL, with Redis caching applied to the query patterns that needed it.",
      "Developed full-stack buyer and seller interfaces in React, owning major components from design through production deployment, including live debugging and hotfix delivery.",
      "Integrated Stripe, WhatsApp, Twilio, and email marketing platforms, implementing webhook-driven workflows for order processing, customer communication, and billing automation.",
    ],
    tags: ["Node.js", "Express", "PostgreSQL", "Redis", "React", "Stripe", "Webhooks"],
  },
  {
    id: "arch",
    role: "Software Engineering Intern",
    org: "Arch Technologies",
    period: "Mar — Apr 2026",
    order: 4,
    kind: "internship",
    context: "Internship",
    bullets: [
      "Software engineering internship focused on applied development practice and delivery workflow.",
    ],
    tags: ["Software Engineering"],
  },
  {
    id: "funkymonkey",
    role: "Contract Software Engineer",
    org: "Funky Monkey",
    period: "May — Dec 2024",
    order: 3,
    location: "United States · Remote",
    kind: "work",
    bullets: [
      "Improved software efficiency by troubleshooting and resolving coding issues across desktop and mobile targets.",
      "Optimised application performance through regular code review and targeted refactoring.",
      "Designed customised solutions for client proposals and participated in field testing to verify delivered performance.",
      "Identified and fixed defects ahead of deployment, reducing rework after release.",
    ],
    tags: ["Software Engineering", "Code Review", "Performance", "Databases"],
  },
  {
    id: "grand",
    role: "Web Developer",
    org: "Grand Productum",
    period: "Jan 2024 — May 2025",
    order: 2,
    kind: "work",
    bullets: [
      "Built and deployed full-stack web applications integrating third-party APIs and payment gateways, translating business requirements into technical solutions through direct stakeholder collaboration.",
      "Optimised front-end performance through code splitting, lazy loading, and asset optimisation, improving responsiveness and cross-browser consistency across React and TypeScript interfaces.",
      "Maintained organised repositories with Git and handled technical troubleshooting to resolve user-facing issues.",
    ],
    tags: ["React", "TypeScript", "APIs", "Payments", "Performance", "Git"],
  },
  {
    id: "fmkc",
    role: "Software Developer",
    org: "FMKC",
    period: "2023 — 2024",
    order: 1,
    context: "Telegram-based crypto rewards platform",
    kind: "work",
    bullets: [
      "Architected an event-driven backend on Node.js and PostgreSQL for automated crypto reward distribution, designing idempotent transaction processing to hold consistency across concurrent reward triggers.",
      "Engineered token reward systems with role-based access control and automated workflows for onboarding, notifications, and reward lifecycle management.",
      "Optimised database schema and indexing for transaction-heavy workloads, and implemented production monitoring and performance tuning.",
    ],
    tags: ["Node.js", "PostgreSQL", "Event-Driven", "Idempotency", "RBAC"],
  },
];

export const education = {
  degree: "BS Computer Science",
  school: "Capital University of Science & Technology (CUST)",
  location: "Islamabad, Pakistan",
  period: "Expected 2027",
  coursework: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Database Management Systems",
    "Computer Networks",
    "Software Engineering",
    "Object-Oriented Programming",
    "Graph Theory",
  ],
};

export interface Award {
  title: string;
  org: string;
  date: string;
  detail: string;
  tags: string[];
}

export const awards: Award[] = [
  {
    title: "YMF × Bilt Mobile App Hackathon",
    org: "Young Minds Forum × Bilt · Islamabad",
    date: "29 August 2026",
    detail:
      "Built UniFlow, an AI-powered university guidance app, with the Null Pointers Club team — idea to working mobile app inside a single day.",
    tags: ["AI", "EdTech", "Mobile", "Team of 4"],
  },
];

export interface Certification {
  name: string;
  issuer: string;
  kind: "simulation" | "course";
}

export const certifications: Certification[] = [
  { name: "Advanced Software Engineering Job Simulation", issuer: "Walmart · Forage", kind: "simulation" },
  { name: "Software Engineering Virtual Experience", issuer: "Electronic Arts · Forage", kind: "simulation" },
  { name: "Cybersecurity Virtual Experience", issuer: "Deloitte · Forage", kind: "simulation" },
  { name: "Cloud Platform Virtual Experience", issuer: "Verizon · Forage", kind: "simulation" },
  { name: "Data Analytics Virtual Experience", issuer: "Quantium · Forage", kind: "simulation" },
  { name: "Operating Systems", issuer: "Coursera", kind: "course" },
  { name: "Artificial Intelligence", issuer: "Coursera", kind: "course" },
];
