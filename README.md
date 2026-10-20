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
- `src/components/Hero.jsx`: branding, advisor profile and quick contact links.
- `src/components/TrustHighlights.jsx`: experience and service highlights.
- `src/components/CarCatalogue.jsx`: animated model category filters and vehicle enquiries.
- `src/components/Promotions.jsx`: promotion and trade-in enquiries.
- `src/components/Contact.jsx`: contact details, linked location card and appointments.
- `src/components/Footer.jsx`: social links and mobile sticky contact bar.
- `src/components/UI.jsx`: shared CTA, section label, reveal and social icon.
- `src/index.css`: Tailwind entry, theme tokens and responsive component styles.

## Content to confirm before public launch

The supplied prices, monthly instalments, stock statuses and promotion packages are mock data, explicitly labelled on the page. Update `src/data.js` after confirming actual offers. No financing approval is guaranteed. Official showroom hours were not provided, so the contact section directs visitors to confirm hours with the advisor.

The profile uses an EA monogram because no advisor photo was supplied. Replace the `.avatar` content in `Hero.jsx` with an authorised portrait when available. The hero showroom image is an AI-generated illustration, not a photo of this specific showroom. Vehicle catalogue images were downloaded from Perodua's official website; confirm permission for public use. This is the advisor's personal site, not Perodua's corporate website.

## Assets

Catalogue vehicle images: `https://www.perodua.com.my/assets/images/landing-page/cars/without-emblem/{model}-no-emblem.webp`, downloaded locally to `public/images/{model}-front.webp`.

Hero image: built-in Image Gen, saved locally as `public/images/hero-showroom.webp`. Prompt: photorealistic cranberry-red Perodua Myvi, front three-quarter view in a modern Malaysian Perodua showroom, landscape, soft daylight, no people or advertising copy. The image's alt text identifies it as an illustration.

Fonts are served by Google Fonts with local sans-serif fallbacks. The location card links to Google Maps with the verified showroom address. WhatsApp, phone, email and social links work without client-side service integrations.

Showroom address verified against [Perodua's outlet list](https://www.perodua.com.my/promotions/preserv-outlets): Lot 2309, Batu 4, Jalan Kuala Krai, 15150 Kota Bharu, Kelantan.

The default theme is light, with localStorage-backed dark mode. Reduced-motion preferences are respected by CSS and Framer Motion. Layouts include visible keyboard focus and a skip link.
