# 🥣 Crunchbox

**The bowl-free breakfast box.** Crunchy cereal up top, cold milk below, kept separate until the
exact second you eat. This repo is a fully animated, production-ready marketing + simulated-commerce
single-page site for the (fictional) Crunchbox brand.

Built as a polished MVP storefront: no backend, no paid APIs, no external image assets — every
product visual is rendered with CSS/SVG.

---

## ✨ Highlights

- **Cinematic hero** with mouse parallax, floating cereal, and a custom CSS/SVG product mockup
- **Dual-compartment Crunchbox mockup** (cereal window + milk chamber + activation drop animation),
  themeable per flavor and reused across the site
- **How it works** scroll-reveal steps showing cereal dropping into milk
- **Six flavor product cards** with tilt, hover lift, and add-to-cart → cart drawer
- **Build Your Box** bundle builder: multi-flavor select, pack size, subscribe & save 15%, animated
  live price
- **Simulated commerce**: cart drawer, quantity controls, animated subtotal, and a "checkout coming
  soon" modal
- **Waitlist / pre-order** capture with success states (stored in local component state only)
- **FAQ accordion**, social proof, use cases, marquee tickers, and a full footer
- Fully **responsive** (mobile / tablet / desktop) and **reduced-motion** aware

---

## 🧰 Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for all animation
- [lucide-react](https://lucide.dev/) for icons
- Google Fonts: **Unbounded** (display) + **Manrope** (body)

---

## 🚀 Getting started

Requires **Node.js 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Create a production build (outputs to /dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

Optional type-check (the production build uses esbuild and does not block on types):

```bash
npm run typecheck
```

---

## ☁️ Deploying to Netlify

This project includes a `netlify.toml` that's ready to go.

### Option A — Connect the Git repo (recommended)

1. Push this project to GitHub/GitLab/Bitbucket.
2. In Netlify: **Add new site → Import an existing project** and pick the repo.
3. Netlify will auto-detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy**. Done.

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

The included SPA redirect (`/* → /index.html`) is handled in `netlify.toml`, so deep links and
refreshes work correctly.

> Works the same on Vercel, Cloudflare Pages, GitHub Pages, etc. — it's a static SPA. Just use build
> command `npm run build` and publish the `dist` folder.

---

## 📁 Project structure

```
crunchbox/
├── index.html                 # HTML entry, fonts, meta tags
├── netlify.toml               # Netlify build + SPA redirect config
├── package.json
├── tailwind.config.js         # Design tokens (colors, fonts, shadows, keyframes)
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx               # React entry
    ├── App.tsx                # Page composition + providers
    ├── index.css              # Tailwind layers + global styles/utilities
    ├── context/
    │   ├── CartContext.tsx    # Cart state (add/remove/qty/subtotal/drawer)
    │   └── ModalContext.tsx   # Waitlist/checkout modal state
    ├── data/
    │   ├── products.ts        # Flavors, packs, themes, pricing
    │   └── content.ts         # Copy: steps, benefits, testimonials, FAQ, etc.
    └── components/
        ├── ui/
        │   ├── Cereal.tsx          # CSS/SVG cereal pieces + field generator
        │   ├── CrunchboxMockup.tsx # Signature dual-compartment box mockup
        │   ├── Button.tsx
        │   └── Reveal.tsx          # Scroll-reveal helpers
        ├── ScrollProgress.tsx
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── HowItWorks.tsx
        ├── Marquee.tsx
        ├── Flavors.tsx
        ├── BuildYourBox.tsx
        ├── WhyCrunchbox.tsx
        ├── Innovation.tsx
        ├── SocialProof.tsx
        ├── UseCases.tsx
        ├── Waitlist.tsx
        ├── FAQ.tsx
        ├── Footer.tsx
        ├── CartDrawer.tsx
        └── WaitlistModal.tsx
```

---

## 📝 Notes

- **This is a demo.** Checkout is intentionally simulated — adding to cart and "checkout" open a
  waitlist modal. Email captures live in component state and are not sent anywhere.
- All product imagery is generated with CSS/SVG, so there are **no external asset dependencies** that
  could break a deploy.
- Colors, type, shadows, and animation keyframes are centralized in `tailwind.config.js` and
  `src/index.css` if you want to re-theme.

© Crunchbox — built for a pitch/demo.
