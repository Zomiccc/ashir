"use client";

import { motion } from "framer-motion";
import { Download, ArrowDown } from "lucide-react";
import { HeroScene } from "@/components/three/HeroScene";
import { useMagneticButton } from "@/hooks/useMagneticButton";

function MagneticCTA({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticButton(0.3);
  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-60">
        <HeroScene />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow" />
            <span className="text-sm font-mono text-text-secondary">Available for Freelance Work</span>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[96px] leading-[1.05] tracking-[-0.03em] text-text-primary mb-6">
            Building Systems<br />
            That <span className="text-gradient">Scale.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-accent-light font-medium mb-4">
            Full Stack Developer &middot; AI Engineer &middot; Software Architect
          </p>

          {/* Body */}
          <p className="text-text-secondary text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            I design and build enterprise-grade web platforms, AI-powered solutions, automation systems, and scalable products for startups and businesses worldwide.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticCTA className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors">
              <a href="#projects" className="flex items-center gap-2">
                View Projects
              </a>
            </MagneticCTA>

            <MagneticCTA className="glass glass-hover text-text-primary px-6 py-3 rounded-lg font-medium transition-all">
              <a href="https://wa.me/923259105688" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Hire Me
              </a>
            </MagneticCTA>

            <a
              href="/Ashir_Qureshi_CV.docx"
              download
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right: 3D scene placeholder for mobile */}
        <div className="hidden lg:block" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-text-secondary hover:text-accent transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono">Scroll</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
