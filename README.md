# 🏋️ gym-website

A modern, fully responsive single-page gym website built with **Next.js 14**, featuring dark/light mode, smooth animations.

🌐 **Live Site:** [https://gihan302.github.io/gym-website/](https://gihan302.github.io/gym-website/)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org/) — App Router, static export |
| Language | [TypeScript](https://www.typescriptlang.org/) — strict mode |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + inline CSS variables |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) — dark / light toggle |
| Forms | [React Hook Form](https://react-hook-form.com/) — validation + submission |
| Icons | [@heroicons/react](https://heroicons.com/) — nav icons |
| Font | [Oswald](https://fonts.google.com/specimen/Oswald) via `next/font/google` |
| Deployment | [GitHub Pages](https://pages.github.com/) — static export via `gh-pages` |

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--gold` | `#D5A310` | Accent, CTAs, highlights |
| `--black` | `#040304` | Hero bg, deep surfaces |
| `--brown` | `#292113` | Cards, footer |
| `--charcoal` | `#2C2C2C` | Secondary surfaces |
| `--cream` | `#F1F0EB` | Light mode bg, text on dark |

### Sections

- **Hero** — fullscreen with animated word highlight
- **About** — auto-playing image slideshow with alternating layouts
- **Services** — sliding carousel (3 visible, 5 total)
- **Gallery** — auto-slideshow + lightbox with thumbnail strip
- **Why Choose Us** — 4-feature grid with image icons
- **Testimonials** — sliding quotes with auto-advance
- **Pricing** — 3-tier cards with feature lists
- **Diet** — 7-day meal filter with macro summary
- **Contact** — validated form with react-hook-form

---

## 🚀 Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher

### 1. Clone the repository

```bash
git clone https://github.com/gihan302/gym-website.git
cd gym-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
```

This generates the `/out` static export folder.

### 5. Preview the production build locally

```bash
npx serve out
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, ThemeProvider
│   ├── page.tsx            # Single page — all sections assembled
│   └── globals.css         # Design tokens, animations, resets
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Sticky nav, mobile menu, theme toggle
│   │   └── Footer.tsx      # Links, contact info, social icons
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── WhyChooseUsSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── DietSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       └── Button.tsx
├── lib/
│   ├── constants.ts        # NAV_LINKS, site config
│   └── utils.ts            # getAssetPath helper
├── styles/
│   └── tokens.css          # CSS custom properties
└── types/
    └── index.ts            # TypeScript interfaces
```

---

## 🌙 Dark / Light Mode

The site defaults to **dark mode**. Toggle using the sun/moon icon in the header.

Powered by `next-themes` with `attribute="class"` — the `.dark` class is applied to `<html>`, and all colors switch via CSS custom properties defined in `globals.css`.

```css
:root       { --bg-page: #F1F0EB; --text-primary: #040304; }
.dark       { --bg-page: #040304; --text-primary: #F1F0EB; }
```

---

## 🚢 Deployment

The site is deployed to GitHub Pages using the `gh-pages` package.

### Manual deploy

```bash
npm run build
npx gh-pages -d out
```

### Automatic deploy (GitHub Actions)

Every push to `main` triggers `.github/workflows/deploy.yml` which builds and deploys automatically.

### Base path

The `next.config.ts` sets `basePath: '/gym-website'` in production so all assets resolve correctly on GitHub Pages.

```ts
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS ? '/gym-website' : '',
  images: { unoptimized: true },
};
```

---

## 📦 Key Dependencies

```json
{
  "next": "16.1.7",
  "react": "19.2.3",
  "next-themes": "^0.4.6",
  "react-hook-form": "^7.71.2",
  "@heroicons/react": "^2.2.0",
  "tailwindcss": "^4"
}
```

---

## 📄 License

This project is for personal/portfolio use. All gym imagery used is either original or licensed for use.

---

<div align="center">
  Built with ❤️ using Next.js · Deployed on GitHub Pages
</div>
