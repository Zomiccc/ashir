export const profile = {
  name: "Ashir Qureshi",
  firstName: "Ashir",
  lastName: "Qureshi",
  alias: "Zomiccc",
  role: "Software Engineer",
  roles: [
    "Full-Stack Engineer",
    "Backend & Systems",
    "Computer Vision / ML",
    "Freelance Builder",
  ],
  tagline: "Building Systems That Scale",
  location: "Islamabad, Pakistan",
  timezone: "UTC +05:00",
  email: "ashir.qureshi.aqq@gmail.com",
  phone: "+92 325 9105688",
  phoneHref: "+923259105688",
  cv: "/Ashir_Qureshi_CV.pdf",
  cvDocx: "/Ashir_Qureshi_CV.docx",
  links: {
    github: "https://github.com/Zomiccc",
    linkedin: "https://www.linkedin.com/in/ashirqureshiaq/",
    whatsapp: "https://wa.me/923259105688",
    email: "mailto:ashir.qureshi.aqq@gmail.com",
  },
  summary:
    "Results-driven software engineer with hands-on experience across full-stack development, backend systems, and machine learning. I design and ship scalable REST APIs, real-time applications, and computer-vision pipelines in production startup environments — from YOLOv8 inference pipelines to Redis-backed Node services and responsive React front-ends.",
  short:
    "CS undergrad building full-stack products, backend services, and ML systems. Three years shipping for startups.",
} as const;

export const stats = [
  { label: "Years Riding", value: 3, suffix: "+", note: "Startup delivery since 2023" },
  { label: "Repositories", value: 25, suffix: "", note: "Public work on GitHub" },
  { label: "Projects Shipped", value: 22, suffix: "+", note: "Live, deployed, or delivered" },
  { label: "Companies Served", value: 3, suffix: "", note: "Web Deed · Grand Productum · FMKC" },
] as const;

/** RDR2 "core" meters — playful but honest self-assessment. */
export const cores = [
  { name: "Backend", value: 92, icon: "health" },
  { name: "Frontend", value: 86, icon: "stamina" },
  { name: "ML / Vision", value: 78, icon: "deadeye" },
] as const;
