import { Instagram, Phone, ArrowUp } from "lucide-react";
import { advisor } from "../data";
import { TikTokIcon, WhatsAppButton } from "./UI";

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <a href="#" className="brand footer-brand">
              EN <span>ANIQ.</span>
            </a>
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
              <a href="#" className="back-top" aria-label="Kembali ke atas">
                <ArrowUp size={18} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EN ANIQ. Semua hak terpelihara.</p>
            <span>Senior Sales Advisor · PSSB Kota Bharu 1, Kelantan</span>
          </div>
        </div>
      </footer>
      <div className="mobile-action-bar">
        <a href={`tel:+6${advisor.phone}`} className="mobile-call">
          <Phone size={19} />
          Call Now
        </a>
        <WhatsAppButton>WhatsApp En Aniq</WhatsAppButton>
      </div>
    </>
  );
}
