"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center md:text-left">
            <p className="font-display font-semibold text-lg text-text-primary">Ashir Qureshi</p>
            <p className="text-text-secondary text-sm mt-1">
              Full Stack Developer | AI Engineer | Software Architect
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Zomiccc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/ashirqureshiaq"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:ashir.qureshi.aqq@gmail.com"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="tel:+923259105688"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
              aria-label="Phone"
            >
              <Phone size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-text-secondary text-sm">
            Ashir Qureshi &copy; {new Date().getFullYear()} — Built with Next.js
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
