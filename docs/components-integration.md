# Loan calculator and delivery gallery

Both components are integrated into `src/App.jsx`. They use the installed React, Tailwind CSS 4 and Lucide React packages. No extra packages or API keys are required.

## Placement

```jsx
import LoanCalculator from "./components/LoanCalculator";
import DeliveryGallery from "./components/DeliveryGallery";

// Inside your existing <main>, preserving the other components:
<Hero />
<TrustHighlights />
<CarCatalogue />
<LoanCalculator />
<Promotions />
<DeliveryGallery />
<Contact />
```

The sections can be linked with `#loan-calculator` and `#delivery-gallery`. Keep your existing `<MotionConfig>`, header and footer. Both components use Tailwind's `dark:` variant and respond to the existing `dark` class on `<html>`.

## LoanCalculator

Full source: `src/components/LoanCalculator.jsx`.

The component imports `src/lib/loan.js`, which provides the default five reference model prices, money formatting, the pure calculation function and the encoded WhatsApp quote builder. Defaults follow the catalogue data in `src/data.js` and `src/data/vehicles.js`; copy those files too if moving the component to another app, or replace the default-model import with your own data.

Defaults: Myvi, 10% deposit, 9 years, 3.2% annual flat rate. Percent presets track the model price when the model changes; manually entered deposits remain the same RM amount and are validated against the new price.

Optional props:

```jsx
import { cars } from "./data";

<LoanCalculator
  models={cars} // Optional: reuse the existing catalogue's id/name/price data.
  whatsappNumber="60199569283"
  id="loan-calculator"
  className=""
/>;
```

`models` uses `{ id, name, price }` objects, with unprefixed names such as `Myvi`. An empty array uses the defaults. If rendering multiple calculators, pass a different `id` to each; input and heading IDs are already unique through `useId`.

Calculation:

```text
Principal = Car price − Deposit
Total interest = Principal × (Annual flat rate / 100) × Years
Monthly instalment = (Principal + Total interest) / (Years × 12)
```

For Myvi at RM46,500, deposit RM4,650, 9 years and 3.2%, the principal is RM41,850, interest RM12,052.80 and monthly estimate RM499.10. Calculations retain precision internally and display two decimal places. Deposits accept up to two decimal places. Invalid or blank inputs hide the estimate and remove the quote link's destination. Zero interest and full-price deposits are handled explicitly.

This is an illustrative **flat-rate** calculator using reference prices and a sample rate, not a bank quote or effective-rate calculation. Actual financing methods, fees, rates and approvals may differ. This is labelled in the UI; no insurance or additional fees are included. [Maybank's calculator guidance](https://www.maybank2u.com.my/maybank2u/malaysia/en/personal/loans/hire_purchase_loan_listing.page?componentID=1505849728033&submit=true) likewise distinguishes indicative estimates from offers of finance.

## DeliveryGallery — Galeri Kenangan

Full source: `src/components/DeliveryGallery.jsx`. It imports `FlexCarousel.jsx` and `src/data/gallery.js`. The existing `delivery-gallery` anchor is preserved. `App.jsx` uses React `lazy` and `Suspense` to keep the carousel in a separate bundle.

The section now displays six random, locally hosted temporary photos in a FlexCarousel instead of testimonial cards. The UI labels these as sample images, not actual customer photos. Arrow buttons, dragging/swiping and keyboard arrows navigate the carousel; clicking a photo opens its focus view. Vertical wheel scrolling continues through the page.

To use real, authorised memory photos, replace the WebP files in `public/images/memories/` and update `src/data/gallery.js`, or pass an `items` array:

```jsx
const items = [
  {
    src: "/images/memories/myvi-handover.webp",
    alt: "Customer receiving a Perodua Myvi from En Aniq",
    title: "Penyerahan Perodua Myvi",
    subtitle: "Kota Bharu",
  },
];

<DeliveryGallery
  items={items}
  isDemo={false} // Use after replacing the sample photos with actual client photos.
  whatsappNumber="60199569283"
  id="delivery-gallery"
/>;
```

The gallery also supports `className`. Its WhatsApp CTA contains an encoded Malay eligibility enquiry. Use photos roughly 960×720 or larger and keep key faces near the middle for the landscape crop. `FlexCarousel` exposes `next()` and `previous()` through its ref and accepts an `ariaLabel` prop.

## Verification

```sh
npm test
npm run build
npm run dev
```

The test suite checks known monthly estimates, terms, model prices, zero-interest/full-payment cases, decimal deposits, invalid numeric inputs and WhatsApp quote encoding.
