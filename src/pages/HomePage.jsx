import { lazy, Suspense } from "react";
import Hero from "../components/Hero";
import TrustHighlights from "../components/TrustHighlights";
import About from "../components/About";
import CarCatalogue from "../components/CarCatalogue";
import LoanCalculator from "../components/LoanCalculator";
import Promotions from "../components/Promotions";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import usePageNavigation from "../lib/usePageNavigation";

const DeliveryGallery = lazy(() => import("../components/DeliveryGallery"));

export default function HomePage() {
  usePageNavigation(
    "EN ANIQ | Perodua Kota Bharu 1",
    "Kenali En Aniq, Senior Sales Advisor Perodua PSSB Kota Bharu 1 dengan 14 tahun pengalaman. Terokai Myvi, Axia, Bezza, Ativa dan Alza.",
  );
  return (
    <>
      <main id="main" tabIndex={-1}>
        <Hero />
        <TrustHighlights />
        <About />
        <CarCatalogue />
        <LoanCalculator />
        <Promotions />
        <Suspense
          fallback={
            <div className="container py-16 text-sm" role="status">
              Memuatkan galeri…
            </div>
          }
        >
          <DeliveryGallery />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
