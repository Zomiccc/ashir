"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/services";
import {
  Code2,
  Brain,
  Bot,
  Cloud,
  Webhook,
  Database,
  Server,
  Layers,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Brain,
  Bot,
  Cloud,
  Webhook,
  Database,
  Server,
  Layers,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">
            What I Build
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            End-to-end solutions for businesses that need software that works.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="glass glass-hover rounded-2xl p-6 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon size={24} className="text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
