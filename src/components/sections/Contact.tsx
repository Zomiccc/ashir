"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Linkedin, Github } from "lucide-react";
const contactLinks = [
  {
    icon: Mail,
    label: "ashir.qureshi.aqq@gmail.com",
    href: "mailto:ashir.qureshi.aqq@gmail.com",
  },
  {
    icon: Phone,
    label: "+92 325 9105688",
    href: "tel:+923259105688",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/923259105688",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ashirqureshiaq",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Zomiccc",
  },
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

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">
            Let&apos;s Build Something
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Available for freelance projects, contracts, and remote roles.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <p className="text-text-secondary mb-8 leading-relaxed text-center">
            I&apos;m always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, I&apos;ll do my best to get back to you.
          </p>

          <div className="space-y-4">
            {contactLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                className="flex items-center gap-4 p-4 rounded-xl glass glass-hover transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <link.icon size={18} className="text-accent" />
                </div>
                <span className="text-text-primary font-medium">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
