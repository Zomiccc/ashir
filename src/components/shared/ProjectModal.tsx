"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Check } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-t-2xl sm:rounded-2xl m-0 sm:m-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-border p-6 flex items-start justify-between z-10">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono mb-2">
                  {project.category}
                </span>
                <h2 className="font-display font-bold text-2xl text-text-primary">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X size={20} className="text-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Screenshot placeholder */}
              <div className="w-full h-48 rounded-xl bg-gradient-to-br from-accent/10 to-accent-light/5 border border-border flex items-center justify-center">
                <span className="font-display font-bold text-3xl text-gradient">{project.title}</span>
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed">{project.description}</p>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="font-mono text-sm text-accent uppercase tracking-wider mb-3">
                    Key Features
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-text-secondary text-sm">
                        <Check size={14} className="text-accent shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h3 className="font-mono text-sm text-accent uppercase tracking-wider mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md bg-background border border-border text-text-secondary text-sm font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Note */}
              {project.note && (
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <p className="text-accent text-sm font-medium">{project.note}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    project.githubUrl
                      ? "bg-white/5 text-text-primary hover:bg-white/10"
                      : "bg-white/5 text-text-secondary/50 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href={project.liveUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    project.liveUrl
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "bg-white/5 text-text-secondary/50 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
