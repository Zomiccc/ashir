# Ashir Qureshi — Portfolio

A Red Dead Redemption 2–inspired personal site. Dusk over the frontier, a wanted
poster, a weapon wheel, a bounty board, and a trail map — built as a real portfolio,
not a theme demo.

**Live:** [ashir-qureshi.vercel.app](https://ashir-qureshi.vercel.app)

---

## What's in it

| Section | What it is |
|---|---|
| **Camp** | Cinematic parallax hero — layered SVG ridges, a lone rider, drifting dust, a sun setting behind the mesas |
| **Wanted** | The About section as an aged wanted poster with a 3D pointer tilt, wax seal, and RDR2-style core meters |
| **Arsenal** | An interactive weapon wheel — six wedges, one per discipline, hover or tab to open the satchel |
| **Bounties** | Every project as a bounty notice, filterable by tier, each opening a full briefing on parchment |
| **The Trail** | Career history plotted as waypoints on a hand-drawn parchment map |
| **Ledger** | Services, certifications, and live GitHub language stats pulled from the API |
| **Telegram** | A Western Union telegram form that composes a real email |

### Signature interactions

- **Dead Eye mode** — press `E` (or hit the HUD button). The page drains to crimson,
  a scanline crawls, and the meter drains and refills exactly like the game.
- **Honor meter** — the fixed HUD bar fills as you ride down the page, and steps
  aside when the footer arrives.
- **Aiming reticle** — replaces the pointer on fine-pointer devices, snapping wider
  and turning red over anything actionable.
- **Boot sequence** — name burn-in, chapter card, then the curtain lifts.

---

## Stack

- **Next.js 16** (App Router, static export)
- **React 19** · **TypeScript**
- **Tailwind CSS** for layout, hand-written CSS for the design system
- **Framer Motion** for every transition
- Canvas particles and inline SVG for the landscape — no image assets, no 3D library

Type is `Rye` (outlaw display), `Cinzel` (headings), `EB Garamond` (body), and
`Special Elite` (typewriter UI), all self-hosted via `next/font`.

---

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build   # static export to ./out
```

---

## Structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, metadata, JSON-LD
│   ├── page.tsx              # section composition
│   ├── globals.css           # the RDR2 design system
│   └── opengraph-image.tsx   # generated share card
├── components/rdr/           # every section and effect
└── lib/data/                 # profile, bounties, trail, arsenal
```

All content lives in `src/lib/data/` — editing a project or a job means touching one
data file, never a component.

---

## Accessibility

Respects `prefers-reduced-motion` (animations collapse, canvas draws one static
frame), keeps a visible focus ring, keeps the weapon wheel keyboard-navigable, and
falls back to the native pointer on touch devices.

---

## Contact

**Ashir Qureshi** — Islamabad, Pakistan

[Email](mailto:ashir.qureshi.aqq@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/ashirqureshiaq/) ·
[GitHub](https://github.com/Zomiccc)
