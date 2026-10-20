import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Instagram,
  MapPin,
  ShieldCheck,
  Check,
} from "lucide-react";
import { advisor, loanMessage, whatsappUrl } from "../data";
import { Reveal, SectionLabel, TikTokIcon, WhatsAppButton } from "./UI";

export default function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <Reveal className="hero-copy">
        <SectionLabel>PERODUA SALES ADVISOR · KOTA BHARU</SectionLabel>
        <h1 id="hero-heading">
          INGAT PERODUA.
          <br />
          <span>INGAT ANIQ.</span>
        </h1>
        <p className="hero-description">
          Kereta impian anda. Urusan saya.
          <br />
          <span>
            14 tahun membantu pelanggan di Kota Bharu & seluruh Malaysia
            memiliki Perodua dengan mudah dan yakin.
          </span>
        </p>
        <div className="hero-ctas">
          <WhatsAppButton className="glow-button">
            Hubungi En Aniq
          </WhatsAppButton>
          <a className="button button-secondary" href="#model">
            Terokai model
            <ArrowRight size={17} />
          </a>
        </div>
        <a
          className="loan-link"
          href={whatsappUrl(loanMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ShieldCheck size={16} />
          Semak kelayakan loan <strong>Percuma</strong>
          <ArrowUpRight size={15} />
        </a>
        <div className="hero-socials">
          <span>Jom kenali saya</span>
          <a
            href={advisor.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok @el_aniq"
          >
            <TikTokIcon /> <span>@el_aniq</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href={advisor.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @AniqPeroduaKotaBharu1"
            title="@AniqPeroduaKotaBharu1"
          >
            <Instagram size={17} />
            <span>Instagram</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </Reveal>
      <Reveal className="advisor-card" delay={0.1}>
        <img
          className="hero-advisor-image"
          src="/images/aniq-professional.webp"
          alt="Potret profesional En Aniq, Sales Advisor Perodua — dipertingkat dengan AI"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <div className="experience-badge">
          <strong>
            14<span>+</span>
          </strong>
          <span>
            TAHUN
            <br />
            PENGALAMAN
          </span>
        </div>
        <a
          href={advisor.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="showroom-chip"
        >
          <MapPin size={13} />
          PSSB Kota Bharu 1<ArrowUpRight size={12} />
        </a>
        <div className="advisor-info">
          <div className="avatar" role="img" aria-label="Potret En Aniq">
            <span className="avatar-photo">
              <img
                src="/images/aniq-professional.webp"
                alt=""
                width="57"
                height="57"
              />
            </span>
            <span className="avatar-check">
              <Check size={10} strokeWidth={3} />
            </span>
          </div>
          <div className="advisor-title">
            <h2>
              EN ANIQ <BadgeCheck size={19} />
            </h2>
            <p>Senior Sales Advisor</p>
            <small>Perodua Sales Sdn Bhd</small>
          </div>
          <div className="certified-badge">
            <ShieldCheck size={23} />
            <span>
              Certified Perodua
              <br />
              <strong>Sales Advisor</strong>
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
