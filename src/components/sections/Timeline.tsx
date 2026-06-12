"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Rocket, Code2 } from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    title: "Computer Science Student",
    org: "University",
    period: "2022 — Present",
    description:
      "Pursuing a degree in Computer Science while building real-world projects and freelancing.",
  },
  {
    icon: Code2,
    title: "Started Freelancing",
    org: "Self-Employed",
    period: "2022 — Present",
    description:
      "Began taking on freelance projects, building full-stack applications and AI systems for clients worldwide.",
  },
  {
    icon: Rocket,
    title: "First Enterprise Project",
    org: "Tandoor",
    period: "2023",
    description:
      "Built Tandoor — a full restaurant management ecosystem with POS, CRM, inventory, and AI forecasting.",
  },
  {
    icon: Brain,
    title: "AI & Computer Vision Focus",
    org: "Research & Projects",
    period: "2023 — Present",
    description:
      "Developed multiple AI systems including helmet detection, license plate recognition, and sign language translation.",
  },
  {
    icon: Briefcase,
    title: "Scaled Freelance Operations",
    org: "Global Clients",
    period: "2024 — Present",
    description:
      "Delivered 12+ projects spanning enterprise software, SaaS platforms, automation tools, and AI integrations.",
  },
];

function Brain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">
            Journey
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From student to engineer — the path so far.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center md:-translate-x-1/2 z-10">
                <item.icon size={14} className="text-accent" />
              </div>

              {/* Content */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                }`}
              >
                <span className="font-mono text-xs text-accent">{item.period}</span>
                <h3 className="font-display font-semibold text-lg text-text-primary mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary/70 font-mono mt-0.5">{item.org}</p>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
