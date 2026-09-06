# Ashir Qureshi — Portfolio

A GTA VI / Vice City–inspired personal site: neon on night, Florida sunset, a
perspective grid horizon — built as a working portfolio rather than a theme demo.
Loud where it earns it, quiet everywhere the content has to be read.

**Live:** [ashir-qureshi.vercel.app](https://ashir-qureshi.vercel.app)

---

## Sections

| Section | What's in it |
|---|---|
| **Home** | Parallax dusk hero — banded sun on the horizon, city skyline, palms, perspective grid floor, and a marquee of the stack |
| **About** | An ID-card profile with pointer tilt, depth meters, and a counted stat row |
| **Work** | 17 projects, six of them flagship, filterable by tier — each opens a full case-study panel |
| **Skills** | A radial six-segment selector; the centre shows the lead tool for the active area |
| **Experience** | Six roles on an interactive spine, plus education and the YMF × Bilt hackathon |
| **Services** | What I take on, alongside live GitHub language stats and certifications |
| **Contact** | A message form that composes a real email, plus every direct channel |

### Signature interactions

- **Radio (colour grades)** — three stations in the top bar swap the whole palette:
  `98.3 Vice` (magenta/cyan), `104.7 Sunset` (orange/gold), `88.1 Midnight`
  (violet/cyan). Press `R` to cycle. The choice persists per visitor.
- **Neon cursor** — a leading dot with a trailing ring that opens over anything
  actionable, on fine-pointer devices only.
- **Scroll HUD** — a section label and progress bar that steps aside at the footer.
- **Intro** — the name resolves out of a gradient wash, then the panel splits. Under
  two and a half seconds; nobody should wait to read a CV.

---

## Stack

- **Next.js 16** (App Router, static export)
- **React 19** · **TypeScript**
- **Tailwind CSS** for layout, hand-written CSS custom properties for the palette
- **Framer Motion** for every transition
- Canvas particles and inline SVG for the hero — no image assets, no 3D library

Type is `Archivo` (display), `Inter` (body), and `JetBrains Mono` (labels), all
self-hosted through `next/font`.

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
│   ├── globals.css           # palette, grades, surfaces
│   └── opengraph-image.tsx   # generated share card
├── components/vice/          # every section and effect
└── lib/data/                 # profile, projects, experience, skills
```

All content lives in `src/lib/data/` — adding a project or a role means editing one
data file, never a component.

---

## Accessibility

Respects `prefers-reduced-motion` (transitions collapse, canvas draws a single
static frame), keeps a visible focus ring, keeps the skills wheel and radio tuner
keyboard-operable, and falls back to the native pointer on touch devices.

---

## Contact

**Ashir Qureshi** — Islamabad, Pakistan

[Email](mailto:ashir.qureshi.aqq@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/ashirqureshiaq/) ·
[GitHub](https://github.com/Zomiccc)
