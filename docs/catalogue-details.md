# Catalogue detail pages

The arrow on every vehicle card links to `/catalog/:modelId`. One reusable React page serves Myvi, Bezza, Axia, Ativa and Alza. Routes work with keyboard navigation, browser Back/Forward, direct links and refreshes. Unknown models render a useful not-found page.

Variant selection is stored in the URL, for example `/catalog/myvi?variant=av`. It updates the displayed reference price, engine, transmission, dimensions, airbags, safety features, finance calculator and WhatsApp messages. Choosing a variant in the comparison grid preserves the reading position. Enquiry links always use URL-encoded Malay messages addressed to `60199569283`.

The landing-page catalogue, its monthly estimates and the main calculator also use the same starting-price data. Monthly estimates use the existing illustrative flat-rate calculation: 10% deposit, 9 years, 3.2% annually. The embedded detail calculator is tied to the selected variant and remains editable for deposit, term and rate.

## Data sources

Reference information was checked on **21 October 2026** against these primary sources:

| Model | Official model, price and specification page | Brochure |
| --- | --- | --- |
| Myvi | [Perodua Myvi](https://www.perodua.com.my/our-models/hatchback/myvi) | [Myvi brochure](https://www.perodua.com.my/files/Myvi_Brochure.pdf) |
| Bezza | [Perodua Bezza](https://www.perodua.com.my/our-models/sedan/bezza) | [Bezza brochure](https://www.perodua.com.my/files/Bezza_Brochure.pdf) |
| Axia | [Perodua Axia](https://www.perodua.com.my/our-models/hatchback/axia) | [D-CVT brochure](https://www.perodua.com.my/files/Axia_Brochure.pdf), [E brochure](https://www.perodua.com.my/files/Axia_E_Brochure.pdf) |
| Ativa | [Perodua Ativa](https://www.perodua.com.my/our-models/suv/ativa) | [Ativa brochure](https://www.perodua.com.my/files/Ativa_Brochure.pdf) |
| Alza | [Perodua Alza](https://www.perodua.com.my/our-models/mpv/new-alza) | [Alza brochure](https://www.perodua.com.my/files/Alza_Brochure.pdf) |

Prices are reference OTR prices for Peninsular Malaysia with sales tax and without insurance. Special paint, accessories, promotions and final dealer quotes can differ. Ativa H/AV entries show Metallic paint pricing, with the additional published paint prices explained beneath the comparison. No stock availability or finance approval is inferred from manufacturer data.

Axia E is kept separate from the newer D-CVT body: it has its own image, manual gearbox, dimensions, luggage capacity, tank capacity, safety list and brochure. Its image is from Perodua's official [Axia E specification image](https://www.perodua.com.my/img.php?a=images%2FCarSpec%2FAxia%2FAxia-E.webp&v=2&w=320), saved as `public/images/axia-e-front.webp`. Other vehicle images reuse existing local catalogue assets. Images illustrate models and can show a different trim/colour from the selected variant.

Maintain all reference prices, specs, feature lists and source URLs in `src/data/vehicles.js`. Common specs are merged with variant overrides; safety lists are combined only from the relevant model and selected variant. Avoid advertising optional safety equipment as standard on lower trims.

## Static hosting

The Vite development and preview servers handle application routes automatically. Production static hosts need an index fallback. `vercel.json` provides Vercel rewrites; `public/_redirects` is copied into `dist/` for Netlify/Cloudflare Pages. For other servers, configure the equivalent fallback, such as Nginx `try_files $uri $uri/ /index.html;`.

The page reuses the site's light/dark theme, Lucide icons and shared one-second Framer Motion reveals, with reduced-motion support. Landing and detail pages are separate lazy-loaded chunks so the lanyard and gallery are not required to view car specifications.
