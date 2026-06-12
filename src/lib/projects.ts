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
    title: "Crypto Arbitrage Bot",
    category: "Automation / Finance",
    description:
      "Automated trading bot that identifies and executes arbitrage opportunities across crypto exchanges.",
    tech: ["Python", "APIs", "Automation"],
    features: [
      "Multi-Exchange Monitoring",
      "Automated Execution",
      "Risk Management",
      "Profit Analytics",
    ],
    tier: "advanced",
  },
  {
    id: 7,
    title: "E-Commerce Platform",
    category: "Full Stack Web",
    description:
      "Complete e-commerce solution with product catalog, cart, checkout, and admin dashboard.",
    tech: ["React", "Node.js", "MySQL"],
    features: [
      "Product Catalog",
      "Shopping Cart",
      "Checkout Flow",
      "Admin Dashboard",
    ],
    tier: "advanced",
  },
  {
    id: 8,
    title: "Vehicle Rental Management",
    category: "Management System",
    description:
      "Complete vehicle rental system with booking, fleet management, and billing.",
    tech: ["Java", "MySQL"],
    features: [
      "Booking Management",
      "Fleet Tracking",
      "Billing System",
      "Customer Portal",
    ],
    tier: "advanced",
  },
  {
    id: 9,
    title: "Resume Analysis Tool",
    category: "AI Tool",
    description:
      "AI-powered tool that analyzes resumes and provides feedback and scoring.",
    tech: ["Python", "AI APIs", "React"],
    features: [
      "Resume Parsing",
      "AI Scoring",
      "Feedback Generation",
      "ATS Optimization",
    ],
    tier: "advanced",
  },
  {
    id: 10,
    title: "WhatsApp Bulk Sender",
    category: "Automation Tool",
    description:
      "Automated WhatsApp messaging tool for bulk communications.",
    tech: ["Python", "Automation"],
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
    title: "Telegram Bot",
    category: "Automation Tool",
    description:
      "Custom Telegram bot for automated tasks and notifications.",
    tech: ["Python", "APIs"],
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
    title: "Real-Time Weather CLI",
    category: "CLI Tool",
    description:
      "Command-line tool for real-time weather data fetching.",
    tech: ["C++"],
    features: [
      "Real-time Data",
      "Multi-city Support",
      "Formatted Output",
      "API Integration",
    ],
    tier: "tools",
  },
  {
    id: 13,
    title: "Real-Time Currency Converter",
    category: "CLI Tool",
    description:
      "Command-line tool for real-time currency conversion rates.",
    tech: ["C++"],
    features: [
      "Live Rates",
      "Multi-currency Support",
      "Historical Data",
      "Formatted Output",
    ],
    tier: "tools",
  },
];
