export type Tier = "flagship" | "production" | "lab";

export interface Project {
  slug: string;
  title: string;
  /** One-line positioning, shown under the title. */
  kicker: string;
  category: string;
  status: "Live" | "In Development" | "Shipped";
  year: string;
  summary: string;
  detail: string[];
  tech: string[];
  highlights: string[];
  tier: Tier;
  github?: string;
  live?: string;
  /** Label for the live link when it is not a public marketing site. */
  liveLabel?: string;
}

export const projects: Project[] = [
  /* ================================================================
     FLAGSHIP
     ================================================================ */
  {
    slug: "whatsapp-crm",
    title: "WhatsApp CRM",
    kicker: "SaaS lead management platform",
    category: "SaaS Platform",
    status: "Shipped",
    year: "2026",
    summary:
      "A full-stack SaaS CRM built on 52+ database tables, covering lead management, team collaboration, and multi-channel communication across WhatsApp, email, and SMS.",
    detail: [
      "Designed the data model from the ground up — 52+ tables covering leads, pipelines, teams, campaigns, conversations, and billing, with team-scoped access enforced at the query layer rather than bolted on at the UI.",
      "Architected the REST API with authentication, authorization, and team-based access control so one deployment safely serves many organisations.",
      "Integrated Stripe billing, the WhatsApp Business API, email marketing, and Twilio SMS behind a single messaging abstraction, so a campaign targets a lead rather than a channel.",
      "Built automation workflows, campaign management, and analytics dashboards across a React web client and a React Native mobile app sharing the same API.",
    ],
    tech: [
      "Node.js",
      "Express.js",
      "React",
      "React Native",
      "PostgreSQL",
      "Stripe",
      "WhatsApp API",
      "Twilio",
    ],
    highlights: [
      "52+ table schema",
      "Multi-tenant RBAC",
      "WhatsApp · Email · SMS",
      "Stripe billing",
      "Automation workflows",
      "Analytics dashboards",
    ],
    tier: "flagship",
  },
  {
    slug: "digital-code-vault",
    title: "Digital Code Vault",
    kicker: "E-commerce fulfilment platform",
    category: "E-Commerce Infrastructure",
    status: "Live",
    year: "2026",
    summary:
      "A webhook-driven fulfilment platform for digital code inventory, wiring WooCommerce and Shopify order events into automated code allocation and delivery.",
    detail: [
      "Designed the fulfilment architecture around webhooks: a store order event lands, the platform resolves it to the right product and denomination, allocates a code from inventory, and delivers it — without a human in the loop.",
      "Engineered SKU-to-product resolution with denomination-level logic so a single multi-product order fulfils correctly across different code types and face values.",
      "Integrated Stripe and PayPal with merchant isolation, keeping each seller's inventory, payouts, and order history strictly separated.",
      "Audited the existing fulfilment path and resolved a class of order-status and configuration faults that had been silently stalling deliveries.",
    ],
    tech: [
      "Node.js",
      "PostgreSQL",
      "Webhooks",
      "WooCommerce",
      "Shopify",
      "Stripe",
      "PayPal",
    ],
    highlights: [
      "Webhook-driven fulfilment",
      "SKU & denomination mapping",
      "Merchant isolation",
      "Automated code delivery",
      "AES-256-GCM at rest",
      "Argon2 credential hashing",
    ],
    tier: "flagship",
    live: "https://deliverapi.link/",
    liveLabel: "Admin portal",
    github: "https://github.com/Zomiccc/Digital-Code-Vault",
  },
  {
    slug: "algo-falcon",
    title: "Algo Falcon Solutions",
    kicker: "Corporate site for an international IT consultancy",
    category: "Client Work",
    status: "Live",
    year: "2026",
    summary:
      "The public site for an IT consultancy operating out of Riyadh and Atlanta, serving large enterprises and giga-projects across ten service lines.",
    detail: [
      "Built the full marketing site — services, talent, process, partners, and enquiry flow — for a consultancy selling to enterprise buyers who judge credibility in the first five seconds.",
      "Structured ten distinct service lines into a hierarchy that stays scannable, with flagship offerings given visual weight without burying the rest.",
      "Implemented live operational surfacing — SLA response, monitoring status, and regional presence — so the value proposition is shown rather than claimed.",
      "Tuned for performance and cross-device consistency, since a meaningful share of enterprise traffic arrives on mobile.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: [
      "Enterprise positioning",
      "Ten service lines",
      "Two-region presence",
      "Lead capture flow",
      "Performance tuned",
    ],
    tier: "flagship",
    live: "https://www.agfsc.com/",
  },
  {
    slug: "fxons",
    title: "FXONS Trading Platform",
    kicker: "Market data, payments, and auth in one stack",
    category: "FinTech Platform",
    status: "Live",
    year: "2026",
    summary:
      "A full-stack trading platform — Next.js front end, NestJS back end — integrating live market data, crypto payment processing, and cloud object storage.",
    detail: [
      "Built the NestJS backend and Next.js client, integrating Twelve Data for market feeds, NOWPayments for processing, and Cloudflare R2 for storage.",
      "Engineered JWT authentication and a Prisma data layer with query patterns tuned for the read-heavy access the platform actually sees.",
      "Debugged and resolved production faults spanning CORS, Redis integration, and database behaviour under real traffic.",
      "Maintained infrastructure across Vercel and Render, keeping front end and API deployable independently.",
    ],
    tech: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Twelve Data",
      "NOWPayments",
      "Cloudflare R2",
    ],
    highlights: [
      "Live market data",
      "Crypto payments",
      "JWT auth",
      "Prisma data layer",
      "Multi-host deployment",
    ],
    tier: "flagship",
    github: "https://github.com/Zomiccc/Fxons",
    live: "https://meta5-frontend.vercel.app",
  },
  {
    slug: "traffic-vision",
    title: "AI Traffic Violation Detection",
    kicker: "Real-time detection, tracking, and plate recognition",
    category: "Computer Vision",
    status: "Shipped",
    year: "2025",
    summary:
      "A real-time computer-vision system combining helmet detection, vehicle tracking, speed estimation, and automatic licence plate recognition in one pipeline.",
    detail: [
      "Fine-tuned YOLOv8 on custom data for helmet compliance and vehicle identification, then layered EasyOCR on the same pass to read plates without decoding frames twice.",
      "Built the video processing pipeline in OpenCV — detection, multi-object tracking, and speed estimation from frame-to-frame displacement.",
      "Flags overspeeding automatically: compliant vehicles annotate green, violations annotate red with the measured speed drawn in place.",
      "Outputs an annotated video alongside structured violation logs and evidence snapshots, so results are reviewable rather than just printed.",
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "EasyOCR", "PyTorch", "Flask"],
    highlights: [
      "YOLOv8 fine-tuning",
      "Multi-object tracking",
      "Speed estimation",
      "Plate recognition (OCR)",
      "Annotated video output",
      "Structured violation logs",
    ],
    tier: "flagship",
    github: "https://github.com/Zomiccc/Traffic-Violation-Detector",
  },
  {
    slug: "ride-hailing",
    title: "Real-Time Ride-Hailing Platform",
    kicker: "Live matching, tracking, and fare negotiation",
    category: "Real-Time Systems",
    status: "Shipped",
    year: "2025",
    summary:
      "An inDrive-style ride-hailing platform with real-time driver–passenger matching, live location tracking, fare negotiation, and vehicle-based driver selection.",
    detail: [
      "Engineered real-time matching over Redis Pub/Sub and Socket.IO, keeping driver location and ride state synchronised across concurrent clients.",
      "Implemented geospatial queries and indexing for efficient nearby-driver discovery, with vehicle-class filtering built into the match.",
      "Modelled the ride as an explicit lifecycle so cancellations, re-matches, and drop-off never leave a trip in an ambiguous state.",
      "Secured the API with JWT authentication and role-based authorization across three distinct views — driver, passenger, and admin.",
    ],
    tech: [
      "TypeScript",
      "NestJS",
      "React",
      "Prisma",
      "PostgreSQL",
      "Redis Pub/Sub",
      "Socket.IO",
      "Leaflet",
    ],
    highlights: [
      "Real-time matching",
      "Live location tracking",
      "Fare negotiation",
      "Geospatial indexing",
      "Ride state machine",
      "JWT + RBAC",
    ],
    tier: "flagship",
  },

  /* ================================================================
     PRODUCTION
     ================================================================ */
  {
    slug: "pbi",
    title: "Penya Blaugrana Islamabad",
    kicker: "Pakistan's first official FC Barcelona penya",
    category: "Client Work",
    status: "Live",
    year: "2026",
    summary:
      "The official platform for Pakistan's first FC Barcelona supporters' club — live fixture data, membership, match predictions, and club media.",
    detail: [
      "Built the full member-facing platform: club identity, statutes, media, and a membership flow that converts visitors into registered culers.",
      "Wired live fixture data into the front page — next match, opponent, venue, competition, and a countdown running against real kickoff time.",
      "Added dual-clock presence showing local time in both Barcelona and Islamabad, plus a live activity feed of new members joining.",
      "Shipped a match predictions feature so members engage between fixtures, not only on match day.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: [
      "Live fixture data",
      "Kickoff countdown",
      "Membership flow",
      "Match predictions",
      "Dual-timezone clocks",
      "Club media & statutes",
    ],
    tier: "production",
    live: "https://pbisb.com",
    github: "https://github.com/Zomiccc/Penya-Blaugrana-Islamabad",
  },
  {
    slug: "uniflow",
    title: "UniFlow",
    kicker: "One day, one working AI app — YMF × Bilt hackathon",
    category: "AI / EdTech",
    status: "Shipped",
    year: "2026",
    summary:
      "An AI-powered university guidance app built in a single day at the YMF × Bilt Mobile App Hackathon, helping students compare universities and understand what it actually takes to get in.",
    detail: [
      "Built with the Null Pointers Club team at the Young Minds Forum × Bilt hackathon in Islamabad, 29 August 2026 — idea to working mobile app inside one day.",
      "Lets students compare universities across admission requirements, entry tests, fees, programmes, and policy in one place, instead of across a dozen PDFs.",
      "Shipped on the Bilt platform under hard time constraints, which forced sharp product decisions and no room to over-engineer.",
    ],
    tech: ["AI / LLM", "Mobile", "Bilt Platform", "Rapid Prototyping"],
    highlights: [
      "Built in one day",
      "Team of four",
      "University comparison",
      "Admissions guidance",
      "Working demo shipped",
    ],
    tier: "production",
  },
  {
    slug: "kloozi",
    title: "Kloozi",
    kicker: "Commerce product and brand site",
    category: "E-Commerce",
    status: "In Development",
    year: "2026",
    summary:
      "A commerce product covering catalog, cart, checkout, and an operator-facing back office, split across a brand site and the application itself.",
    detail: [
      "Two-surface architecture so the public brand site ships independently of the application behind it.",
      "Order workflows modelled around real seller operations — product variants, order state, and fulfilment status — rather than a generic template.",
      "Route-level code splitting and asset optimisation keep the storefront fast on mobile connections.",
    ],
    tech: ["Next.js", "Node.js", "JavaScript", "Tailwind CSS", "Vercel"],
    highlights: [
      "Catalog & variants",
      "Checkout flow",
      "Seller back office",
      "Mobile-first storefront",
    ],
    tier: "production",
    github: "https://github.com/Zomiccc/Kloozi",
    live: "https://zomic-lyart.vercel.app",
  },
  {
    slug: "crypto-rewards",
    title: "Telegram Crypto Rewards Platform",
    kicker: "Idempotent payouts at scale",
    category: "Backend / Automation",
    status: "Shipped",
    year: "2024",
    summary:
      "An event-driven backend distributing automated crypto rewards to thousands of users, built at FMKC on Node.js and PostgreSQL.",
    detail: [
      "Designed idempotent transaction processing so concurrent reward triggers could never double-pay a user — the hard requirement when money moves automatically.",
      "Engineered the token reward system with role-based access control and automated lifecycle handling for onboarding, notifications, and payouts.",
      "Optimised schema and indexing for transaction-heavy workloads, and added production monitoring and performance tuning.",
    ],
    tech: ["Node.js", "PostgreSQL", "Redis", "Telegram Bot API"],
    highlights: [
      "Idempotent payouts",
      "Event-driven backend",
      "RBAC",
      "Reward lifecycle automation",
      "Transaction-heavy tuning",
    ],
    tier: "production",
  },
  {
    slug: "memory-pressure",
    title: "Memory Pressure Service",
    kicker: "Catches runaway processes before the machine does",
    category: "Systems",
    status: "Shipped",
    year: "2026",
    summary:
      "A Windows service that monitors system and per-process memory, detects runaway processes, and mitigates pressure before slowdowns or crashes.",
    detail: [
      "Continuously samples system-wide and per-process memory to catch runaway consumers before the machine starts thrashing.",
      "Mitigation is deliberately conservative — the service protects the system without aggressively killing real work.",
    ],
    tech: ["PowerShell", "Windows Services", "Systems Monitoring"],
    highlights: [
      "Per-process tracking",
      "Runaway detection",
      "Safe mitigation",
      "Crash prevention",
    ],
    tier: "production",
    github: "https://github.com/Zomiccc/MemoryPressureService",
  },

  /* ================================================================
     LAB
     ================================================================ */
  {
    slug: "resume-analyzer",
    title: "Resume–Job Match Analyzer",
    kicker: "Explainable scoring, not a black box",
    category: "NLP",
    status: "Shipped",
    year: "2025",
    summary:
      "Parses a resume, scores it against a job description with TF-IDF and cosine similarity, and highlights which terms drove the score.",
    detail: [
      "Extracts sections and skills from unstructured resume documents, then scores alignment against a target role.",
      "Surfaces matched and missing terms so the number is explainable and actionable.",
    ],
    tech: ["Python", "Flask", "NLP", "TF-IDF", "scikit-learn"],
    highlights: ["Resume parsing", "Skill extraction", "Explainable scoring"],
    tier: "lab",
    github: "https://github.com/Zomiccc/resume-job-match-analyzer",
  },
  {
    slug: "movie-engine",
    title: "Movie Recommendation Engine",
    kicker: "Content-based, fully offline",
    category: "Machine Learning",
    status: "Shipped",
    year: "2025",
    summary:
      "Netflix-style content-based recommendations from TF-IDF vectors and cosine similarity, with no third-party recommendation API.",
    detail: [
      "Vectorises movie metadata and ranks by cosine similarity — entirely offline, no external service.",
      "Flask backend with a browsable client so recommendations are explorable rather than returned as raw JSON.",
    ],
    tech: ["Python", "Flask", "scikit-learn", "TF-IDF"],
    highlights: ["Content-based filtering", "Fully offline", "Web interface"],
    tier: "lab",
    github: "https://github.com/Zomiccc/Smart-Movie-Reccomendation-Engine",
  },
  {
    slug: "crypto-arbitrage",
    title: "Crypto Arbitrage Bot",
    kicker: "Finds the spreads that clear the fees",
    category: "Automation / FinTech",
    status: "Shipped",
    year: "2026",
    summary:
      "Polls multiple exchange APIs and computes cross-exchange spreads in real time, surfacing only opportunities that survive fees.",
    detail: [
      "Continuous multi-exchange price monitoring with fee-aware filtering — finding a price difference is easy, finding a profitable one is not.",
    ],
    tech: ["Python", "Exchange APIs", "asyncio"],
    highlights: ["Multi-exchange feeds", "Spread detection", "Fee-aware filtering"],
    tier: "lab",
    github: "https://github.com/Zomiccc/Crypto-Arbitrage-Bot",
  },
  {
    slug: "job-tracker",
    title: "Job Tracker API",
    kicker: "CRUD over the application lifecycle",
    category: "Backend / REST",
    status: "Shipped",
    year: "2026",
    summary:
      "A REST API and lightweight client for tracking job applications through applied, interviewing, offered, and closed.",
    detail: ["Clean REST surface over an explicit status workflow, with a no-framework client talking straight to the API."],
    tech: ["Python", "Flask", "REST", "JavaScript"],
    highlights: ["CRUD operations", "Status workflow", "Lightweight client"],
    tier: "lab",
    github: "https://github.com/Zomiccc/Job-Tracker-API-MVP-",
  },
  {
    slug: "sign-language",
    title: "Sign Language Recognition",
    kicker: "Accessibility-focused gesture translation",
    category: "Computer Vision",
    status: "Shipped",
    year: "2024",
    summary:
      "Real-time American Sign Language recognition from live video, translating gestures to text as an accessibility tool.",
    detail: [
      "OpenCV landmark extraction feeding a trained classifier, tuned through dataset augmentation for robustness across varied lighting.",
    ],
    tech: ["Python", "OpenCV", "CMake", "Machine Learning"],
    highlights: ["Real-time recognition", "Gesture-to-text", "Lighting robustness"],
    tier: "lab",
  },
  {
    slug: "os-project",
    title: "OS Scheduling & Memory Project",
    kicker: "Core operating-systems mechanics, implemented",
    category: "Systems",
    status: "Shipped",
    year: "2026",
    summary:
      "Coursework implementation of process scheduling and memory management, built rather than described.",
    detail: ["Hands-on implementation of scheduling algorithms and memory allocation strategies with simulation output."],
    tech: ["Python", "Operating Systems", "Scheduling"],
    highlights: ["Process scheduling", "Memory management", "Simulation"],
    tier: "lab",
    github: "https://github.com/Zomiccc/Semester-Project-OS-",
  },
];

export const tierMeta: Record<Tier, { label: string; blurb: string }> = {
  flagship: {
    label: "Flagship",
    blurb:
      "The work I would want judged. Production platforms, real integrations, and systems that had to hold up under load.",
  },
  production: {
    label: "Production",
    blurb: "Shipped and running — client sites, live products, and services in daily use.",
  },
  lab: {
    label: "Lab",
    blurb: "Smaller builds and experiments where I was learning something specific.",
  },
};
