"use client";

import { GradeProvider } from "@/components/vice/Grade";
import { Intro } from "@/components/vice/Intro";
import { Atmosphere } from "@/components/vice/Atmosphere";
import { Cursor } from "@/components/vice/Cursor";
import { Nav } from "@/components/vice/Nav";
import { Hero } from "@/components/vice/Hero";
import { About } from "@/components/vice/About";
import { Work } from "@/components/vice/Work";
import { Skills } from "@/components/vice/Skills";
import { Experience } from "@/components/vice/Experience";
import { Services } from "@/components/vice/Services";
import { Contact } from "@/components/vice/Contact";
import { Footer } from "@/components/vice/Footer";

export default function Home() {
  return (
    <GradeProvider>
      <Intro />
      <Atmosphere />
      <Cursor />
      <Nav />

      <main className="relative">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Services />
        <Contact />
      </main>

      <Footer />
    </GradeProvider>
  );
}
