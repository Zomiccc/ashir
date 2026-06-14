"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/skills";

const deviconMap: Record<string, { devicon: string; variant: string }> = {
  react: { devicon: "react", variant: "original" },
  nextjs: { devicon: "nextjs", variant: "original" },
  typescript: { devicon: "typescript", variant: "original" },
  javascript: { devicon: "javascript", variant: "original" },
  tailwindcss: { devicon: "tailwindcss", variant: "original" },
  html5: { devicon: "html5", variant: "original" },
  nodejs: { devicon: "nodejs", variant: "original" },
  express: { devicon: "express", variant: "original" },
  nestjs: { devicon: "nestjs", variant: "original" },
  api: { devicon: "graphql", variant: "plain" },
  postgresql: { devicon: "postgresql", variant: "original" },
  mysql: { devicon: "mysql", variant: "original" },
  mongodb: { devicon: "mongodb", variant: "original" },
  prisma: { devicon: "prisma", variant: "original" },
  python: { devicon: "python", variant: "original" },
  tensorflow: { devicon: "tensorflow", variant: "original" },
  opencv: { devicon: "opencv", variant: "original" },
  git: { devicon: "git", variant: "original" },
  github: { devicon: "github", variant: "original" },
  docker: { devicon: "docker", variant: "original" },
  vercel: { devicon: "vercel", variant: "original" },
  render: { devicon: "webflow", variant: "original" },
  postman: { devicon: "postman", variant: "original" },
};

// Simple inline SVG icons as fallbacks for when CDN icons fail to load
const fallbackIcons: Record<string, string> = {
  react: `<svg viewBox="0 0 256 228" xmlns="http://www.w3.org/2000/svg" fill="#61DAFB"><path d="M210.483 73.824a222 222 0 0 0-7.56-1.336 69.4 69.4 0 0 0 2.953-15.94c5.244-31.706-9.388-54.773-30.584-61.027-21.196-6.254-47.084 3.067-67.754 27.976a161.5 161.5 0 0 0-9.292 12.11 157.4 157.4 0 0 0-9.291-12.11C90.156-1.195 64.268-10.516 43.072-4.262 21.876 1.992 7.244 25.083 12.488 56.788a69.4 69.4 0 0 0 2.953 15.94A222 222 0 0 0 7.88 74.11C-13.44 80.41-23.52 105.7-23.52 128c0 22.3 10.08 47.59 31.4 53.89a222 222 0 0 0 7.56 1.336 69.4 69.4 0 0 0-2.953 15.94c-5.244 31.706 9.388 54.773 30.584 61.027 21.196 6.254 47.084-3.067 67.754-27.976a161.5 161.5 0 0 0 9.292-12.11 157.4 157.4 0 0 0 9.291 12.11c20.67 24.909 46.558 34.23 67.754 27.976 21.196-6.254 35.828-29.321 30.584-61.027a69.4 69.4 0 0 0-2.953-15.94 222 222 0 0 0 7.56-1.336c21.32-6.3 31.4-31.59 31.4-53.89 0-22.3-10.08-47.59-31.4-53.89z"/></svg>`,
  nextjs: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect width="256" height="256" fill="none"/><path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm0 224c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z" fill="currentColor"/><path d="M192 128c0 35.3-28.7 64-64 64V64c35.3 0 64 28.7 64 64z" fill="currentColor"/></svg>`,
};

function SkillIcon({ name }: { name: string }) {
  const key = name.toLowerCase().replace(/\s+/g, "");
  const iconData = deviconMap[key] || { devicon: "github", variant: "original" };

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconData.devicon}/${iconData.devicon}-${iconData.variant}.svg`}
      alt={name}
      className="w-8 h-8 object-contain"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        const fallbackKey = name.toLowerCase().replace(/\s+/g, "");
        if (fallbackIcons[fallbackKey]) {
          // Replace img src with inline SVG data URI
          target.src = `data:image/svg+xml;utf8,${encodeURIComponent(fallbackIcons[fallbackKey])}`;
          target.onerror = null; // prevent infinite loop
        } else {
          target.style.display = "none";
        }
      }}
    />
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">
            Technical Arsenal
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Technologies and tools I use to build scalable, high-performance systems.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <h3 className="font-mono text-sm text-accent uppercase tracking-wider mb-4">
                {group.label}
              </h3>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05 }}
                    className="glass glass-hover rounded-xl p-4 flex flex-col items-center gap-3 text-center transition-all"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <SkillIcon name={skill.icon} />
                    </div>
                    <span className="font-mono text-sm text-text-secondary">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
