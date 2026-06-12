"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Cloud, Bot, Database, Server, Layers, Webhook } from "lucide-react";

const stats = [
  { value: "12+", label: "Projects" },
  { value: "3+", label: "Years" },
  { value: "Enterprise", label: "Focus" },
];

const specializations = [
  { icon: Code2, label: "Full Stack Dev" },
  { icon: Brain, label: "AI & ML" },
  { icon: Cloud, label: "SaaS Platforms" },
  { icon: Bot, label: "Business Automation" },
  { icon: Webhook, label: "REST APIs" },
  { icon: Database, label: "Database Design" },
  { icon: Server, label: "Cloud Deployment" },
  { icon: Layers, label: "Enterprise Architecture" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Avatar + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Avatar placeholder */}
            <div className="relative w-64 h-64 mx-auto lg:mx-0 mb-8">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 to-accent-light/10 border border-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display font-bold text-6xl text-gradient">AQ</div>
                  <div className="font-mono text-sm text-text-secondary mt-2">Ashir Qureshi</div>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 rounded-2xl bg-accent/5 blur-2xl -z-10" />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display font-bold text-3xl text-text-primary">{stat.value}</div>
                  <div className="text-sm text-text-secondary font-mono mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio + Specializations */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-6 tracking-tight">
              About Me
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              I&apos;m a Computer Science student and freelance software engineer who builds full-stack applications, AI systems, and enterprise platforms. I care about architecture, performance, and delivering software that businesses can actually rely on.
            </p>

            <h3 className="font-mono text-sm text-accent uppercase tracking-wider mb-4">
              Specializations
            </h3>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {specializations.map((spec) => (
                <motion.div
                  key={spec.label}
                  variants={itemVariants}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-sm font-mono text-text-secondary hover:text-text-primary transition-all cursor-default"
                >
                  <spec.icon size={16} className="text-accent" />
                  {spec.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
