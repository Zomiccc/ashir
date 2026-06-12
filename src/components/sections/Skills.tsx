"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/skills";

const deviconMap: Record<string, string> = {
  react: "react",
  nextjs: "nextjs",
  typescript: "typescript",
  javascript: "javascript",
  tailwindcss: "tailwindcss",
  html5: "html5",
  nodejs: "nodejs",
  express: "express",
  nestjs: "nestjs",
  api: "graphql",
  postgresql: "postgresql",
  mysql: "mysql",
  mongodb: "mongodb",
  prisma: "prisma",
  python: "python",
  tensorflow: "tensorflow",
  opencv: "opencv",
  git: "git",
  github: "github",
  docker: "docker",
  vercel: "vercel",
  render: "webflow",
  postman: "postman",
};

function SkillIcon({ name }: { name: string }) {
  const iconName = deviconMap[name.toLowerCase().replace(/\s+/g, "")] || "github";
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`}
      alt={name}
      className="w-8 h-8 object-contain"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
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
