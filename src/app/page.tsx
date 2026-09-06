"use client";

import { DeadEyeProvider } from "@/components/rdr/DeadEye";
import { Boot } from "@/components/rdr/Boot";
import { Atmosphere } from "@/components/rdr/Atmosphere";
import { Reticle } from "@/components/rdr/Reticle";
import { Hud } from "@/components/rdr/Hud";
import { Hero } from "@/components/rdr/Hero";
import { Wanted } from "@/components/rdr/Wanted";
import { Arsenal } from "@/components/rdr/Arsenal";
import { Bounties } from "@/components/rdr/Bounties";
import { Trail } from "@/components/rdr/Trail";
import { Ledger } from "@/components/rdr/Ledger";
import { Telegram } from "@/components/rdr/Telegram";
import { Footer } from "@/components/rdr/Footer";

export default function Home() {
  return (
    <DeadEyeProvider>
      <Boot />

      {/* Fixed overlays live outside the shell — a CSS filter on an ancestor
          would otherwise trap their `position: fixed` inside it. */}
      <Atmosphere />
      <Reticle />
      <Hud />

      <div id="page-shell" className="dead-eye-off relative">
        <main className="relative">
          <Hero />
          <Wanted />
          <Arsenal />
          <Bounties />
          <Trail />
          <Ledger />
          <Telegram />
        </main>
        <Footer />
      </div>
    </DeadEyeProvider>
  );
}
