export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  features: string[];
  tier: "flagship" | "advanced" | "tools";
  note?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Tandoor",
    category: "Enterprise Software",
    description:
      "Full restaurant ecosystem with POS, delivery, CRM, inventory, analytics, AI forecasting, and multi-branch support.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    features: [
      "Multi-Branch Architecture",
      "POS System",
      "Delivery & Rider Mgmt",
      "CRM",
      "Inventory",
      "Analytics Dashboard",
      "Marketing Automation",
      "Customer Loyalty",
      "Reporting",
      "AI-Based Forecasting",
    ],
    tier: "flagship",
    note: "Flagship project — largest and most architecturally complex.",
  },
  {
    id: 2,
    title: "InDrive Clone",
    category: "Full Stack Mobile/Web",
    description:
      "Complete ride-hailing platform with real-time tracking, driver/rider apps, fare management, and trip management.",
    tech: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Socket.IO", "Maps API"],
    features: [
      "Rider App",
      "Driver App",
      "Real-Time Matching",
      "Location Tracking",
      "Trip Management",
      "Fare System",
      "Notifications",
    ],
    tier: "flagship",
  },
  {
    id: 3,
    title: "Helmet Detection System",
    category: "Computer Vision / AI",
    description:
      "Real-time AI system that detects helmet compliance of riders from live video streams.",
    tech: ["Python", "OpenCV", "Machine Learning"],
    features: [
      "Real-time Detection",
      "Video Stream Processing",
      "AI-Powered Classification",
      "Compliance Monitoring",
    ],
    tier: "flagship",
  },
  {
    id: 4,
    title: "License Plate Recognition",
    category: "Computer Vision / AI",
    description:
      "Automatic vehicle license plate detection and text recognition system.",
    tech: ["Python", "OpenCV", "OCR", "Machine Learning"],
    features: [
      "Plate Detection",
      "OCR Text Extraction",
      "Real-time Processing",
      "Multi-format Support",
    ],
    tier: "flagship",
  },
  {
    id: 5,
    title: "Sign Language Recognition",
    category: "AI / Deep Learning",
    description:
      "Real-time gesture recognition that translates sign language to text.",
    tech: ["Python", "TensorFlow", "OpenCV"],
    features: [
      "Real-time Gesture Recognition",
      "Deep Learning Model",
      "Text Translation",
      "Hand Tracking",
    ],
    tier: "flagship",
  },
  {
    id: 6,
    title: "Memory Pressure Service",
    category: "Systems / Infrastructure",
    description:
      "Production-grade memory pressure monitoring and auto-scaling service for containerized workloads. Dynamically adjusts resource allocation based on real-time memory metrics to prevent OOM failures.",
    tech: ["Go", "Docker", "Kubernetes", "Prometheus", "Grafana"],
    features: [
      "Real-Time Memory Monitoring",
      "Auto-Scaling Triggers",
      "Prometheus Metrics Export",
      "Grafana Dashboards",
      "OOM Prevention",
      "Multi-Container Support",
    ],
    tier: "advanced",
  },
  {
    id: 7,
    title: "Traffic Violation Detector",
    category: "Computer Vision / AI",
    description:
      "End-to-end AI system that detects traffic violations (red-light jumping, wrong-way driving, helmet non-compliance) from CCTV feeds with real-time alerting and plate recognition.",
    tech: ["Python", "YOLO", "OpenCV", "TensorFlow", "FastAPI"],
    features: [
      "Real-Time Violation Detection",
      "License Plate OCR",
      "Multi-Camera Support",
      "Alert & Notification System",
      "Evidence Logging",
      "Dashboard & Reporting",
    ],
    tier: "advanced",
  },
  {
    id: 8,
    title: "Distributed Web Crawler",
    category: "Distributed Systems",
    description:
      "Multi-threaded distributed web crawler with task queuing, rate limiting, and data extraction pipeline. Crawls millions of pages with fault tolerance and resume capability.",
    tech: ["Python", "Redis", "RabbitMQ", "PostgreSQL", "Docker"],
    features: [
      "Distributed Architecture",
      "Task Queuing (RabbitMQ)",
      "Rate Limiting & Politeness",
      "Fault Tolerance",
      "Checkpoint & Resume",
      "Structured Data Extraction",
    ],
    tier: "advanced",
  },
  {
    id: 9,
    title: "Cloud Storage Gateway",
    category: "Infrastructure / Backend",
    description:
      "Multi-cloud storage gateway providing a unified S3-compatible API across AWS, GCP, and Azure with intelligent caching, encryption, and file versioning.",
    tech: ["Go", "AWS S3", "GCP Storage", "Azure Blob", "Redis"],
    features: [
      "Unified Multi-Cloud API",
      "S3-Compatible Interface",
      "Intelligent Caching Layer",
      "At-Rest & In-Transit Encryption",
      "File Versioning",
      "Bandwidth Optimization",
    ],
    tier: "advanced",
  },
  {
    id: 10,
    title: "WhatsApp Bulk Sender",
    category: "Automation Tool",
    description:
      "Automated WhatsApp messaging tool for bulk communications with template support and delivery reporting.",
    tech: ["Python", "APIs", "Automation"],
    features: [
      "Bulk Messaging",
      "Template Support",
      "Contact Management",
      "Delivery Reports",
    ],
    tier: "tools",
  },
  {
    id: 11,
    title: "Telegram Bot Platform",
    category: "Automation Tool",
    description:
      "Custom Telegram bot for automated tasks, notifications, and integrations.",
    tech: ["Python", "APIs", "Async"],
    features: [
      "Custom Commands",
      "Automated Responses",
      "Notification System",
      "Integration Support",
    ],
    tier: "tools",
  },
  {
    id: 12,
    title: "CI/CD Pipeline Toolkit",
    category: "DevOps Tool",
    description:
      "Automated CI/CD pipeline configuration toolkit for GitHub Actions, Docker deployments, and multi-environment releases.",
    tech: ["Docker", "GitHub Actions", "Bash"],
    features: [
      "Automated Testing",
      "Docker Build & Push",
      "Multi-Environment Deploy",
      "Release Automation",
    ],
    tier: "tools",
  },
];
