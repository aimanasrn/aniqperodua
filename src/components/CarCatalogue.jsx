import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Info, MessageCircle } from "lucide-react";
import { cars, currency, whatsappUrl } from "../data";
import { Reveal, SectionLabel } from "./UI";

const filters = ["Semua", "Hatchback", "Sedan", "SUV", "MPV"];

function CarCard({ car, index, filtered }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, delay: index * 0.025 }}
      className={`car-card ${!filtered && index > 2 ? "car-card-wide" : ""}`}
    >
      <div className="car-visual">
        <span className={`stock-badge stock-${car.tone}`}>
          <span />
          {car.status}
        </span>
        <span className="car-number">
          0{cars.findIndex((c) => c.id === car.id) + 1}
        </span>
        <img
          src={car.image}
          alt={`Perodua ${car.name}`}
          width="640"
          height="320"
          loading="lazy"
        />
      </div>
      <div className="car-details">
        <div className="car-title-row">
          <div>
            <p className="car-category">{car.type}</p>
            <h3>Perodua {car.name}</h3>
          </div>
          <span className="model-arrow" aria-hidden="true">
            <ArrowRight size={20} />
          </span>
        </div>
        <p className="car-tagline">{car.tagline}</p>
        <div className="car-features">
          {car.features.map((feature) => (
            <span key={feature}>
              <Check size={12} />
              {feature}
            </span>
          ))}
        </div>
        <div className="car-pricing">
          <div>
            <span>Harga bermula</span>
            <strong>RM {currency(car.price)}</strong>
          </div>
          <div>
            <span>Anggaran ansuran</span>
            <strong>
              RM {car.monthly}
              <small>/bulan</small>
            </strong>
          </div>
        </div>
        <a
          className="car-whatsapp"
          href={whatsappUrl(
            `Hi En Aniq, saya berminat dengan Perodua ${car.name}. Boleh bantu semak kelayakan loan saya?`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask via WhatsApp tentang Perodua ${car.name}`}
        >
          <MessageCircle size={17} />
          <span>Ask via WhatsApp</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}

export default function CarCatalogue() {
  const [filter, setFilter] = useState("Semua");
  const visibleCars =
    filter === "Semua" ? cars : cars.filter((car) => car.type === filter);
  return (
    <section
      className="catalogue section-space container"
      id="model"
      aria-labelledby="catalogue-heading"
    >
      <Reveal>
        <div className="catalogue-heading-row">
          <div>
            <SectionLabel>MODEL PERODUA</SectionLabel>
            <h2 className="section-heading" id="catalogue-heading">
              Cari kereta.
              <br className="mobile-only" /> Jumpa yang <span>serasi.</span>
            </h2>
            <p className="section-description">
              Untuk kerja, keluarga, atau perjalanan seterusnya. Ada Perodua
              untuk anda.
            </p>
          </div>
          <a
            href={whatsappUrl(
              "Hi En Aniq, saya perlukan bantuan memilih model Perodua yang sesuai dengan bajet saya.",
            )}
            className="help-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bantu saya pilih
            <ArrowUpRightIcon />
          </a>
        </div>
        <div className="catalogue-toolbar">
          <div
            className="model-filters"
            role="group"
            aria-label="Tapis mengikut jenis kenderaan"
          >
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`filter-button ${filter === item ? "active" : ""}`}
                aria-pressed={filter === item}
              >
                {item}
                {item === "Semua" && <span>5</span>}
              </button>
            ))}
          </div>
          <span className="model-count" role="status" aria-live="polite">
            {visibleCars.length} model untuk anda
          </span>
        </div>
      </Reveal>
      <div className={`car-grid ${filter === "Semua" ? "show-all" : ""}`}>
        <AnimatePresence mode="popLayout">
          {visibleCars.map((car, index) => (
            <CarCard
              key={car.id}
              car={car}
              index={index}
              filtered={filter !== "Semua"}
            />
          ))}
        </AnimatePresence>
      </div>
      <p className="catalogue-note">
        <Info size={14} />
        <span>
          Harga, ansuran dan status stok ialah data contoh. Ansuran sebenar
          tertakluk kepada varian, deposit, tempoh pembiayaan dan kelulusan
          bank. Sahkan tawaran dengan En Aniq.
        </span>
      </p>
    </section>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={15} className="-rotate-45" />;
}
