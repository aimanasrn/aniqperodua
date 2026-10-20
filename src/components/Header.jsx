import { useState } from "react";
import { Sun, Moon, Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { advisor } from "../data";
import { WhatsAppButton } from "./UI";

export default function Header() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [menuOpen, setMenuOpen] = useState(false);
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
    ["Model Perodua", "#model"],
    ["Promosi", "#promosi"],
    ["Hubungi & Lokasi", "#lokasi"],
  ];
  return (
    <header className="site-header">
      <div className="container header-inner">
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
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-nav container"
          aria-label="Navigasi mudah alih"
        >
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
              <ArrowUpRight size={17} />
            </a>
          ))}
          <WhatsAppButton />
        </nav>
      )}
    </header>
  );
}
