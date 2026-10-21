import { MotionConfig } from "framer-motion";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustHighlights from "./components/TrustHighlights";
import About from "./components/About";
import CarCatalogue from "./components/CarCatalogue";
import Promotions from "./components/Promotions";
import LoanCalculator from "./components/LoanCalculator";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const DeliveryGallery = lazy(() => import("./components/DeliveryGallery"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Langkau ke kandungan
      </a>
      <Header />
      <main id="main">
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
    </MotionConfig>
  );
}
