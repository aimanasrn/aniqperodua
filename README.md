# EN ANIQ — Perodua Sales Advisor

A responsive Malay-language personal branding page, built with React 19, Vite 7, Tailwind CSS 4, Lucide React and Framer Motion.

## Run

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static host. No API keys or backend are needed.

## Structure

- `src/data.js`: advisor details, vehicle data and encoded WhatsApp link helper.
- `src/components/Header.jsx`: responsive navigation and persistent theme toggle.
- `src/components/Hero.jsx`: rotating headline, reflective advisor portrait card and quick contact links. The card uses `ReflectiveCard.jsx` with custom content, a subtle reflection overlay and reduced-motion-aware hover tilt.
- `src/components/TrustHighlights.jsx`: experience and service highlights.
- `src/components/About.jsx`: Tentang Saya, with an interactive lanyard on the left and advisor bio on the right. The 3D component loads near the viewport; a portrait remains visible while it loads or if WebGL is unavailable. Includes a keyboard-accessible flip button and the shared one-second scroll reveals.
- `src/components/Lanyard.jsx`: draggable, reversible Three.js card. Assets live in `public/images/lanyard/`: `about1.png` is the front, `about2.png` is the back and `about3.png` is the band. An imperative `flip()` method supports the section's button.
- `src/components/LoanCalculator.jsx`: interactive flat-rate loan estimates and WhatsApp quotes.
- `src/components/DeliveryGallery.jsx`: Galeri Kenangan using `FlexCarousel.jsx`, with drag, keyboard and arrow-button navigation.
- `src/data/gallery.js`: six temporary memory photos and captions; replace these with client images later. The gallery is loaded in a separate code chunk from `App.jsx`.
- `src/components/CarCatalogue.jsx`: animated model category filters and vehicle enquiries.
- `src/components/Promotions.jsx`: promotion and trade-in enquiries.
- `src/components/Contact.jsx`: contact details, linked location card and appointments.
- `src/components/Footer.jsx`: social links and mobile sticky contact bar.
- `src/components/UI.jsx`: shared CTA, section label, social icon and Framer Motion `Reveal` component. Every page section uses the same one-time fade and rise, including individual trust badges, gift cards, calculator panels and supporting text. Header and mobile contact controls also animate in; reduced-motion preferences keep content immediately visible. Section links use native smooth scrolling, also disabled for reduced motion.
- `src/lib/motion.js`: shared one-second reveal timing, easing and viewport settings used by `Reveal`, vehicle cards and the mobile menu. Use `<Reveal>` around a new content block; `as="p"` and `as="a"` preserve paragraph and link semantics without extra wrappers.
- `src/index.css`: Tailwind entry, theme tokens and responsive component styles.
- `src/components/DotGridBackground.jsx`: hero-only DotGrid layer with theme synchronization and non-blocking pointer behavior. It scrolls with the hero rather than covering the rest of the page. Adjust dot size, spacing and colors here; the dots respond to pointer movement while respecting reduced-motion preferences.

See [component integration instructions](docs/components-integration.md) for placement, reusable props, real delivery photos and the calculation method. Run `npm test` to verify the financing calculations.

## Content to confirm before public launch

The supplied prices, monthly instalments, stock statuses and promotion packages are mock data, explicitly labelled on the page. Update `src/data.js` after confirming actual offers. No financing approval is guaranteed. Official showroom hours were not provided, so the contact section directs visitors to confirm hours with the advisor.

The hero and profile thumbnail use an AI-enhanced professional portrait based on the supplied photograph of En Aniq. The showroom background is generated, not a photograph of this specific showroom. Vehicle catalogue images were downloaded from Perodua's official website; confirm permission for public use. This is the advisor's personal site, not Perodua's corporate website.

## Assets

Catalogue vehicle images: `https://www.perodua.com.my/assets/images/landing-page/cars/without-emblem/{model}-no-emblem.webp`, downloaded locally to `public/images/{model}-front.webp`.

Temporary Galeri Kenangan photos: random images from `https://picsum.photos/seed/aniq-memory-{01..06}/960/720`, stored locally as WebP in `public/images/memories/`. They are labelled as sample images, not actual client photos.

Current hero portrait: built-in Image Gen edit of the supplied `aniq.jpeg`, saved locally as `public/images/aniq-professional.webp`. Professional lighting, a pressed gray Perodua shirt, a confident standing pose and an uncluttered showroom background. The full generation prompt is in [docs/portrait-generation.md](docs/portrait-generation.md). The original photograph is unchanged.

The previous generated car hero is retained as `public/images/hero-showroom.webp` for optional reuse.

Fonts are served by Google Fonts with local sans-serif fallbacks. The location card links to Google Maps with the verified showroom address. WhatsApp, phone, email and social links work without client-side service integrations.

Showroom address verified against [Perodua's outlet list](https://www.perodua.com.my/promotions/preserv-outlets): Lot 2309, Batu 4, Jalan Kuala Krai, 15150 Kota Bharu, Kelantan.

The default theme is light, with localStorage-backed dark mode. Reduced-motion preferences are respected by CSS and Framer Motion. Layouts include visible keyboard focus and a skip link.
