import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Mail,
  Phone,
  Navigation,
} from "lucide-react";
import { advisor, whatsappUrl } from "../data";
import { Reveal, SectionLabel, WhatsAppButton } from "./UI";

export default function Contact() {
  return (
    <section
      className="contact section-space container"
      id="lokasi"
      aria-labelledby="contact-heading"
    >
      <Reveal className="contact-intro">
        <SectionLabel>HUBUNGI & LOKASI</SectionLabel>
        <h2 id="contact-heading" className="section-heading">
          Langkah pertama.
          <br />
          <span>Jom jumpa saya.</span>
        </h2>
        <p className="section-description">
          Singgah showroom, kenali kereta pilihan anda.
          <br />
          Saya bantu dari pertanyaan pertama hingga kunci di tangan.
        </p>
        <div className="contact-buttons">
          <WhatsAppButton message="Hi En Aniq, saya nak buat janji temu di showroom PSSB Kota Bharu 1. Bila masa yang sesuai?">
            Atur janji temu
          </WhatsAppButton>
          <a className="contact-call" href={`tel:+6${advisor.phone}`}>
            <Phone size={17} />
            {advisor.displayPhone}
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="contact-advisor">
          <span className="mini-avatar">EA</span>
          <div>
            <strong>{advisor.brand}</strong>
            <span>{advisor.name}</span>
          </div>
        </div>
      </Reveal>
      <Reveal className="contact-details" delay={0.08}>
        <div className="contact-detail">
          <MapPin />
          <div>
            <h3>{advisor.showroom}</h3>
            <p>{advisor.address}</p>
          </div>
        </div>
        <div className="contact-detail">
          <Clock3 />
          <div>
            <h3>Waktu operasi</h3>
            <p>Hubungi untuk pengesahan waktu showroom.</p>
            <a
              href={whatsappUrl(
                "Hi En Aniq, showroom PSSB Kota Bharu 1 buka pukul berapa? Saya ingin datang melawat.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Rancang lawatan anda
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="contact-detail">
          <Mail />
          <div>
            <h3>Terus ke inbox</h3>
            <a className="email-link" href={`mailto:${advisor.email}`}>
              {advisor.email}
            </a>
          </div>
        </div>
      </Reveal>
      <Reveal className="map-card" delay={0.16}>
        <div className="location-card-main">
          <div className="location-topline">
            <span>PERODUA SHOWROOM</span>
            <span>KELANTAN</span>
          </div>
          <div className="location-pin">
            <MapPin size={36} strokeWidth={1.4} aria-hidden="true" />
          </div>
          <h3>Kota Bharu 1.</h3>
          <p>Jalan Kuala Krai, Kota Bharu</p>
        </div>
        <a href={advisor.mapsUrl} target="_blank" rel="noopener noreferrer">
          <span>
            <Navigation size={17} />
            Buka Google Maps
          </span>
          <ArrowUpRight size={17} />
        </a>
      </Reveal>
    </section>
  );
}
