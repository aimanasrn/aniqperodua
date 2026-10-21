import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "../components/UI";
import Footer from "../components/Footer";
import usePageNavigation from "../lib/usePageNavigation";
import "./CarDetailPage.css";

export default function NotFoundPage() {
  usePageNavigation(
    "Halaman tidak dijumpai | EN ANIQ",
    "Kembali ke katalog Perodua En Aniq untuk melihat model yang tersedia.",
  );
  return (
    <>
      <main id="main" tabIndex={-1} className="container detail-not-found">
        <Reveal>
          <p className="section-label">404 · HALAMAN TIDAK DIJUMPAI</p>
          <h1>
            Jom kembali ke <span>jalan yang betul.</span>
          </h1>
          <p>
            Model atau halaman ini tidak tersedia. Terokai pilihan Perodua dalam
            katalog kami.
          </p>
          <Link to="/#model" className="button button-primary">
            <ArrowLeft size={18} />
            Kembali ke katalog
          </Link>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
