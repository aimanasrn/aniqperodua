import { Instagram, Phone, ArrowUp } from "lucide-react";
import { advisor } from "../data";
import { Reveal, TikTokIcon, WhatsAppButton } from "./UI";
import { Link } from "react-router";

export default function Footer({ whatsappMessage }) {
  return (
    <>
      <footer className="site-footer">
        <Reveal className="container">
          <div className="footer-main">
            <Link to="/" className="brand footer-brand">
              EN <span>ANIQ.</span>
            </Link>
            <p>Perjalanan baharu anda bermula di sini.</p>
            <div className="footer-socials">
              <a
                href={advisor.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @AniqPeroduaKotaBharu1"
              >
                <Instagram size={19} />
              </a>
              <a
                href={advisor.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok @el_aniq"
              >
                <TikTokIcon size={19} />
              </a>
              <a href="#main" className="back-top" aria-label="Kembali ke atas">
                <ArrowUp size={18} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EN ANIQ. Semua hak terpelihara.</p>
            <span>Senior Sales Advisor · PSSB Kota Bharu 1, Kelantan</span>
          </div>
        </Reveal>
      </footer>
      <Reveal className="mobile-action-bar" offset={14}>
        <a href={`tel:+6${advisor.phone}`} className="mobile-call">
          <Phone size={19} />
          Call Now
        </a>
        <WhatsAppButton message={whatsappMessage}>
          WhatsApp En Aniq
        </WhatsAppButton>
      </Reveal>
    </>
  );
}
