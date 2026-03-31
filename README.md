# 侍 Samurai Portfolio

> *"Forged in darkness. Tempered in code."*

A **Dark Samurai Creative Legend + Developer Portfolio** built with React, Tailwind CSS, and Framer Motion. Japanese ink aesthetic meets neon katana glow — ancient warrior soul with a cyberpunk edge.

---

## Preview

![Dark Samurai Portfolio](https://img.shields.io/badge/theme-Dark%20Samurai-ff0033?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff0033?style=for-the-badge&logo=framer&logoColor=white)

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 6 | Build tool |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 12 | Animations |
| JetBrains Mono | — | Body font |
| Cinzel | — | Heading font |

---

## Features

### Sections
- **Hero** — Full-screen with 28 animated falling cherry blossom petals, CSS glitch-slash on name, katana draw underline animation, neon red tagline
- **Image Breaks ×6** — Scroll-driven `useScroll + useTransform`, scale 0.82 → 1.0, red neon vignette that fades on reveal
- **About** — Japanese kanji watermark, bio, animated stat counters (count-up on scroll)
- **Skills / Weapon Arsenal** — Tech cards with weapon type labels and animated mastery bars
- **Projects / Quest Log** — Mission scroll cards with difficulty badges (Apprentice / Ronin / Master), stack tags, and "Enter Dungeon" buttons
- **Battle History** — Vertical timeline with dot markers, clan/rank/battles format
- **Songbook** — Horizontal scroll cards with red wax seals and play icons
- **Manuscripts** — Line-by-line ink-blur poem reveal animation
- **Gaming Achievements** — Scanline CRT overlay, XP bars, rank badges with colour hierarchy
- **Contact** — SVG torii gate divider, glowing red focus borders

### Global Effects
- Red neon cursor dot + smooth lagging trail ring
- CSS glitch animation on hero name
- Scroll-triggered fade + slide on every section
- Katana slash diagonal section dividers
- Sumi-e noise texture overlay
- Cinzel headings + JetBrains Mono body throughout
- Fully responsive (mobile-first)

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Tusharx1143/Samurai-Portfolio.git
cd Samurai-Portfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Customisation

All content lives in the data constants at the top of `src/App.jsx`:

```js
const STATS      = [...]   // Animated counters
const SKILLS     = [...]   // Weapon Arsenal cards
const PROJECTS   = [...]   // Quest Log cards
const EXPERIENCE = [...]   // Battle History timeline
const SONGS      = [...]   // Songbook scroll cards
const POEMS      = [...]   // Manuscript lines
const GAMES      = [...]   // Gaming achievements
```

### Swap in real images

Each `<ImageBreak>` accepts a `src` prop — just pass your image URL:

```jsx
<ImageBreak src="/images/hero-art.jpg" alt="The Warrior Awakens" />
```

Images use `object-fit: cover` with a dark fallback so layout never breaks.

### Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `dead-black` | `#0a0a0a` | Background |
| `katana-red` | `#ff0033` | Primary neon |
| `blood-red` | `#8b0000` | Accent / shadows |
| White | `#f5f5f5` | Body text |

---

## Project Structure

```
samurai-portfolio/
├── src/
│   ├── App.jsx        # Entire portfolio (single file)
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles + animations
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## License

MIT — use it, remix it, forge it into your own legend.

---

*武士道 · 名誉 · 侍*
