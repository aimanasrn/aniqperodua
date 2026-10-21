import { MotionConfig } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header";

const HomePage = lazy(() => import("./pages/HomePage"));
const CarDetailPage = lazy(() => import("./pages/CarDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Langkau ke kandungan
      </a>
      <Header />
      <Suspense
        fallback={
          <main id="main" className="container page-loading" role="status">
            Memuatkan halaman…
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog/:modelId" element={<CarDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}
