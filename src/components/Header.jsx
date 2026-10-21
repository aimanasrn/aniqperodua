import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sun, Moon, Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { advisor } from "../data";
import { Reveal, WhatsAppButton } from "./UI";
import { REVEAL_TRANSITION } from "../lib/motion";

export default function Header() {
  const reducedMotion = useReducedMotion();
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingSection = useRef(null);

  function closeMenuAndNavigate(event, href) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    pendingSection.current = href;
    setMenuOpen(false);
  }

  function finishMenuNavigation() {
    const href = pendingSection.current;
    pendingSection.current = null;
    if (!href) return;
    // Scroll after the exiting menu and its focused link leave the DOM.
    requestAnimationFrame(() => {
      const section = document.getElementById(href.slice(1));
      if (!section) return;
      if (window.location.hash !== href)
        window.history.pushState(null, "", href);
      section.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
    });
  }
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("en-aniq-theme", next ? "dark" : "light");
    } catch {
      /* Theme still works if storage is unavailable. */
    }
  }
  const links = [
    ["Tentang Saya", "#tentang-saya"],
    ["Model Perodua", "#model"],
    ["Promosi", "#promosi"],
    ["Hubungi & Lokasi", "#lokasi"],
  ];
  return (
    <header className="site-header">
      <Reveal className="container header-inner" offset={8}>
        <a href="#" className="brand" aria-label="En Aniq, kembali ke atas">
          EN{" "}
          <span>
            ANIQ<span className="brand-dot">.</span>
          </span>
          <small>14 TAHUN PENGALAMAN</small>
        </a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-toggle dark:bg-white/5"
            onClick={toggleTheme}
            aria-label={dark ? "Tukar ke mod cerah" : "Tukar ke mod gelap"}
            aria-pressed={dark}
          >
            {dark ? <Sun size={20} /> : <Moon size={19} />}
          </button>
          <a
            className="icon-button header-phone"
            href={`tel:+6${advisor.phone}`}
            aria-label={`Telefon En Aniq ${advisor.displayPhone}`}
          >
            <Phone size={18} />
          </a>
          <WhatsAppButton className="header-whatsapp">
            Jom WhatsApp
          </WhatsAppButton>
          <button
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </Reveal>
      <AnimatePresence initial={false} onExitComplete={finishMenuNavigation}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="mobile-menu-panel"
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: reducedMotion ? 0 : 0.2 },
            }}
            transition={{
              ...REVEAL_TRANSITION,
              duration: reducedMotion ? 0 : REVEAL_TRANSITION.duration,
              height: { duration: reducedMotion ? 0 : 0.3 },
            }}
            style={{ overflow: "hidden" }}
          >
            <nav
              id="mobile-navigation"
              className="mobile-nav container"
              aria-label="Navigasi mudah alih"
            >
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={(event) => closeMenuAndNavigate(event, href)}
                >
                  {label}
                  <ArrowUpRight size={17} />
                </a>
              ))}
              <WhatsAppButton />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
