"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { ProjectModal } from "@/components/shared/ProjectModal";

function ProjectCard({
  project,
  onClick,
  className = "",
}: {
  project: Project;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`glass glass-hover rounded-2xl p-6 cursor-pointer transition-all group ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono">
          {project.category}
        </span>
        <ArrowUpRight
          size={20}
          className="text-text-secondary group-hover:text-accent transition-colors"
        />
      </div>

      <h3 className="font-display font-semibold text-xl text-text-primary mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="px-2 py-1 rounded-md bg-background border border-border text-text-secondary text-xs font-mono"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-1 rounded-md bg-background border border-border text-text-secondary text-xs font-mono">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {project.note && (
        <p className="mt-4 text-xs text-accent/70 font-mono">{project.note}</p>
      )}
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const flagship = projects.filter((p) => p.tier === "flagship");
  const advanced = projects.filter((p) => p.tier === "advanced");
  const tools = projects.filter((p) => p.tier === "tools");

  return (
    <section id="projects" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">
            Selected Work
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Enterprise platforms, AI systems, and automation tools — built to production standards.
          </p>
        </motion.div>

        {/* Tier 1 - Flagship */}
        <div className="mb-12">
          <motion.h3
            className="font-mono text-sm text-accent uppercase tracking-wider mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Flagship Projects
          </motion.h3>
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {flagship.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tier 2 - Advanced */}
        <div className="mb-12">
          <motion.h3
            className="font-mono text-sm text-accent uppercase tracking-wider mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Advanced Projects
          </motion.h3>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {advanced.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tier 3 - Tools */}
        <div>
          <motion.h3
            className="font-mono text-sm text-accent uppercase tracking-wider mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Automation & Tools
          </motion.h3>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {tools.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <div
                  className="glass glass-hover rounded-xl p-4 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => setSelectedProject(project)}
                >
                  <span className="inline-block px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-mono mb-2">
                    {project.category}
                  </span>
                  <h4 className="font-display font-medium text-sm text-text-primary mb-1">
                    {project.title}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-text-secondary/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
