import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustHighlights from "./components/TrustHighlights";
import CarCatalogue from "./components/CarCatalogue";
import Promotions from "./components/Promotions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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
        <CarCatalogue />
        <Promotions />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
