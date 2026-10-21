import {
  useParams,
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  Gauge,
  MapPin,
  Settings2,
  ShieldCheck,
  Users,
  CarFront,
  Luggage,
  CalendarCheck,
} from "lucide-react";
import { cars, currency, advisor, whatsappUrl } from "../data";
import { getVariantDetails, VEHICLE_DATA_CHECKED } from "../data/vehicles";
import { calculateLoan, formatRM } from "../lib/loan";
import usePageNavigation from "../lib/usePageNavigation";
import { Reveal, SectionLabel, WhatsAppButton } from "../components/UI";
import LoanCalculator from "../components/LoanCalculator";
import Footer from "../components/Footer";
import NotFoundPage from "./NotFoundPage";
import "./CarDetailPage.css";

const benefitIcons = { city: CarFront, space: Luggage, drive: Gauge };
const sections = [
  ["varian", "Varian & harga"],
  ["spesifikasi", "Spesifikasi"],
  ["kelebihan", "Kelebihan"],
  ["detail-loan", "Kira ansuran"],
  ["soalan", "Soalan lazim"],
];

export default function CarDetailPage() {
  const { modelId } = useParams();
  const car = cars.find((item) => item.id === modelId);
  return car ? <VehicleDetail key={car.id} car={car} /> : <NotFoundPage />;
}

function SpecTable({ title, rows }) {
  return (
    <Reveal className="detail-spec-table">
      <h3>{title}</h3>
      <dl>
        {rows
          .filter(([, value]) => value != null)
          .map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
      </dl>
    </Reveal>
  );
}

function VehicleDetail({ car }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const { detail, variant, specs, safety } = getVariantDetails(
    car.id,
    searchParams.get("variant"),
  );
  const quoteMessage = `Hi En Aniq, saya berminat dengan Perodua ${car.name} ${variant.name}. Harga rujukan ${formatRM(variant.price)}. Boleh kongsikan sebut harga penuh, pilihan warna dan status stok?`;
  const estimate = calculateLoan({
    price: variant.price,
    deposit: variant.price * 0.1,
    years: 9,
    annualRate: 3.2,
  });
  usePageNavigation(
    `Perodua ${car.name} — Harga & Spesifikasi | EN ANIQ`,
    `Terokai Perodua ${car.name}: harga varian, spesifikasi, ciri keselamatan dan anggaran ansuran. Hubungi En Aniq di PSSB Kota Bharu 1.`,
  );

  function selectVariant(id) {
    const next = new URLSearchParams(searchParams);
    next.set("variant", id);
    navigate(
      { search: `?${next}`, hash },
      { replace: true, preventScrollReset: true },
    );
  }

  const faq = [
    [
      `Varian ${car.name} mana yang sesuai untuk saya?`,
      "Bandingkan harga, enjin dan ciri yang anda gunakan setiap hari. En Aniq boleh membantu memilih berdasarkan bajet, bilangan penumpang dan corak perjalanan anda.",
    ],
    [
      "Adakah harga termasuk insurans?",
      "Harga rujukan ialah harga atas jalan Semenanjung Malaysia dengan cukai jualan, tanpa insurans. Warna, aksesori dan perlindungan insurans boleh mengubah jumlah akhir. Minta sebut harga penuh sebelum membuat tempahan.",
    ],
    [
      "Boleh semak kelayakan pinjaman dahulu?",
      "Boleh. Hubungi En Aniq untuk panduan dokumen berdasarkan pekerjaan dan keperluan bank anda. Kalkulator di halaman ini memberi anggaran sahaja; kadar dan kelulusan ditentukan oleh bank.",
    ],
    [
      "Berapa lama menunggu untuk dapat kereta?",
      "Tempoh menunggu bergantung pada varian, warna, stok dan proses pembiayaan. Semak ketersediaan terkini dengan En Aniq sebelum menetapkan tarikh penyerahan.",
    ],
  ];

  return (
    <>
      <main id="main" tabIndex={-1} className="vehicle-detail">
        <div className="container detail-topbar">
          <Link to="/#model" className="detail-back">
            <ArrowLeft size={16} />
            Kembali ke katalog
          </Link>
          <nav className="detail-model-nav" aria-label="Pilih model Perodua">
            {cars.map((model) => (
              <Link
                key={model.id}
                to={`/catalog/${model.id}`}
                aria-current={model.id === car.id ? "page" : undefined}
              >
                {model.name}
              </Link>
            ))}
          </nav>
        </div>

        <section
          className="container detail-hero"
          aria-labelledby="detail-heading"
        >
          <Reveal className="detail-visual" offset={12}>
            <div className="detail-visual-top">
              <span>PERODUA {car.name.toUpperCase()}</span>
              <span>{car.type}</span>
            </div>
            <img
              key={variant.image ?? car.image}
              src={variant.image ?? car.image}
              alt={`Perodua ${car.name}${variant.image ? ` ${variant.name}` : " — gambar ilustrasi model"}`}
              width="800"
              height="440"
              fetchPriority="high"
            />
            <p>
              Gambar ilustrasi. Rupa, warna dan kelengkapan mengikut varian.
            </p>
          </Reveal>
          <Reveal className="detail-hero-copy" delay={0.08}>
            <SectionLabel>
              {car.type.toUpperCase()} · {specs.seats} TEMPAT DUDUK
            </SectionLabel>
            <h1 id="detail-heading">
              Perodua <span>{car.name}.</span>
            </h1>
            <p className="detail-intro">{detail.description}</p>
            <label className="detail-select-label" htmlFor="hero-variant">
              Pilih varian anda
            </label>
            <div className="detail-select-wrap">
              <select
                id="hero-variant"
                value={variant.id}
                onChange={(event) => selectVariant(event.target.value)}
              >
                {detail.variants.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={17} aria-hidden="true" />
            </div>
            <div className="detail-price" aria-live="polite" aria-atomic="true">
              <span>Harga rujukan varian</span>
              <strong>RM {currency(variant.price)}</strong>
              <small>Atas jalan · Semenanjung · Tanpa insurans</small>
            </div>
            <WhatsAppButton message={quoteMessage}>
              Minta sebut harga
            </WhatsAppButton>
            <div className="detail-secondary-actions">
              <a
                href={variant.brochure ?? detail.brochure}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={15} />
                Brosur rasmi
                <ArrowUpRight size={13} />
              </a>
              <a
                href={whatsappUrl(
                  `Hi En Aniq, saya nak buat janji temu pandu uji Perodua ${car.name} di PSSB Kota Bharu 1. Boleh bantu?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarCheck size={15} />
                Tempah pandu uji
              </a>
            </div>
          </Reveal>
        </section>

        <Reveal className="container detail-quick-specs">
          {[
            [Settings2, specs.transmission, "Transmisi"],
            [Users, `${specs.seats} tempat duduk`, "Kapasiti penumpang"],
            [
              ShieldCheck,
              `${variant.airbags} beg udara`,
              "Mengikut varian dipilih",
            ],
            [Gauge, formatRM(estimate.monthly), "Anggaran / bulan*"],
          ].map(([Icon, value, label]) => (
            <div key={label}>
              <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </Reveal>
        <p className="container detail-estimate-note">
          *Simulasi: deposit 10%, 9 tahun, kadar rata 3.2% setahun. Bukan
          tawaran pembiayaan.
        </p>

        <nav
          className="detail-section-nav"
          aria-label="Navigasi butiran kereta"
        >
          <div className="container">
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        <section
          id="varian"
          className="container detail-section"
          aria-labelledby="variants-heading"
        >
          <Reveal className="detail-section-heading">
            <div>
              <SectionLabel>VARIAN & HARGA</SectionLabel>
              <h2 id="variants-heading" className="section-heading">
                Pilihan yang ikut <span>cara anda.</span>
              </h2>
            </div>
            <p>
              Bandingkan kelengkapan utama, kemudian pilih varian untuk melihat
              butirannya.
            </p>
          </Reveal>
          <div className="detail-variant-grid">
            {detail.variants.map((item, index) => (
              <Reveal
                key={item.id}
                delay={index * 0.04}
                className={`detail-variant-card ${item.id === variant.id ? "is-selected" : ""}`}
              >
                <div className="detail-variant-top">
                  <h3>{item.name}</h3>
                  {item.id === variant.id && (
                    <Check size={17} aria-hidden="true" />
                  )}
                </div>
                <p className="detail-variant-price">
                  RM {currency(item.price)}
                  <small>Harga rujukan</small>
                </p>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <Check size={13} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  aria-pressed={item.id === variant.id}
                  onClick={() => selectVariant(item.id)}
                  aria-label={`Pilih varian ${car.name} ${item.name}`}
                >
                  {item.id === variant.id ? "Varian dipilih" : "Pilih varian"}
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </Reveal>
            ))}
          </div>
          <Reveal className="detail-price-note">
            <p>
              Harga rujukan Perodua, disemak {VEHICLE_DATA_CHECKED}. Harga dan
              spesifikasi boleh berubah. Insurans, pilihan cat, aksesori dan
              tawaran akhir perlu disahkan bersama En Aniq.
            </p>
            {detail.priceNote && <p>{detail.priceNote}</p>}
            <a href={detail.source} target="_blank" rel="noopener noreferrer">
              Rujukan model rasmi
              <ArrowUpRight size={13} />
            </a>
          </Reveal>
        </section>

        <section
          id="spesifikasi"
          className="detail-spec-section"
          aria-labelledby="specs-heading"
        >
          <div className="container detail-section">
            <Reveal className="detail-section-heading">
              <div>
                <SectionLabel>KENALI LEBIH DEKAT</SectionLabel>
                <h2 id="specs-heading" className="section-heading">
                  Butiran kecil. <span>Beza besar.</span>
                </h2>
              </div>
              <p>
                Spesifikasi yang dipaparkan:{" "}
                <strong>
                  {car.name} {variant.name}
                </strong>
                . Pilih varian lain untuk membandingkan.
              </p>
            </Reveal>
            {variant.note && (
              <Reveal as="p" className="detail-variant-note">
                {variant.note}
              </Reveal>
            )}
            <div className="detail-spec-grid">
              <SpecTable
                title="Enjin & prestasi"
                rows={[
                  ["Enjin", specs.engine],
                  ["Sesaran", specs.displacement],
                  ["Kuasa maksimum", specs.power],
                  ["Tork maksimum", specs.torque],
                  ["Transmisi", specs.transmission],
                  ["Penggunaan bahan api*", specs.fuel],
                ]}
              />
              <SpecTable
                title="Dimensi & ruang"
                rows={[
                  ["Panjang × lebar × tinggi", specs.dimensions],
                  ["Jarak roda", specs.wheelbase],
                  ["Tempat duduk", `${specs.seats} orang`],
                  ["Ruang bagasi", specs.boot],
                  ["Tangki bahan api", specs.tank],
                  ["Tayar & rim", specs.tyres],
                ]}
              />
            </div>
            <Reveal className="detail-safety">
              <div>
                <ShieldCheck size={27} strokeWidth={1.5} />
                <h3>Keselamatan {variant.name}</h3>
                <p>
                  {variant.airbags} beg udara. Ciri berikut mengikut varian yang
                  dipilih.
                </p>
              </div>
              <ul>
                {safety.map((feature) => (
                  <li key={feature}>
                    <Check size={14} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal as="p" className="detail-footnote">
              *Angka bahan api berdasarkan kaedah ujian yang dinyatakan oleh
              pengeluar. Keadaan jalan, beban dan gaya pemanduan mempengaruhi
              penggunaan sebenar. Semak brosur rasmi untuk senarai kelengkapan
              penuh.
            </Reveal>
          </div>
        </section>

        <section
          id="kelebihan"
          className="container detail-section"
          aria-labelledby="benefits-heading"
        >
          <Reveal>
            <SectionLabel>UNTUK KEHIDUPAN ANDA</SectionLabel>
            <h2 id="benefits-heading" className="section-heading">
              Mengapa pilih <span>{car.name}?</span>
            </h2>
          </Reveal>
          <div className="detail-benefit-grid">
            {detail.benefits.map(([icon, title, text], index) => {
              const Icon = benefitIcons[icon];
              return (
                <Reveal
                  className="detail-benefit"
                  key={title}
                  delay={index * 0.06}
                >
                  <Icon size={29} strokeWidth={1.4} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="detail-colors">
            <h3>Pilihan warna model</h3>
            <p>{detail.colors.join(" · ")}</p>
            <small>
              Pilihan warna bergantung pada varian dan stok. Semak pilihan cat
              serta caj tambahan dengan En Aniq.
            </small>
          </Reveal>
        </section>

        <LoanCalculator
          id="detail-loan"
          models={[
            {
              id: `${car.id}-${variant.id}`,
              name: `${car.name} ${variant.name}`,
              price: variant.price,
            },
          ]}
          className="detail-loan-section"
        />

        <section
          id="soalan"
          className="container detail-section detail-faq-section"
          aria-labelledby="faq-heading"
        >
          <Reveal>
            <SectionLabel>SEBELUM ANDA MEMILIH</SectionLabel>
            <h2 id="faq-heading" className="section-heading">
              Ada soalan? <span>Saya bantu.</span>
            </h2>
          </Reveal>
          <div className="detail-faq-list">
            {faq.map(([question, answer]) => (
              <Reveal key={question}>
                <details>
                  <summary>
                    {question}
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          className="container detail-advisor-section"
          aria-label="Bantuan En Aniq"
        >
          <Reveal className="detail-advisor-panel">
            <div className="detail-advisor-person">
              <img
                src="/images/aniq-professional.webp"
                alt="En Aniq, Sales Advisor Perodua"
                width="70"
                height="70"
                loading="lazy"
              />
              <div>
                <strong>EN ANIQ.</strong>
                <span>14 tahun pengalaman. Satu urusan yang lebih mudah.</span>
                <small>
                  <MapPin size={12} />
                  {advisor.showroom}
                </small>
              </div>
            </div>
            <WhatsAppButton message={quoteMessage}>
              Bincang {car.name} dengan saya
            </WhatsAppButton>
          </Reveal>
        </section>

        <section
          className="container detail-section"
          aria-labelledby="other-models-heading"
        >
          <Reveal className="detail-section-heading">
            <h2 id="other-models-heading" className="section-heading">
              Masih mencari <span>yang serasi?</span>
            </h2>
            <Link to="/#model" className="help-link">
              Semua model
              <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="detail-related-grid">
            {cars
              .filter((model) => model.id !== car.id)
              .map((model, index) => (
                <Reveal key={model.id} delay={index * 0.04}>
                  <Link
                    to={`/catalog/${model.id}`}
                    className="detail-related-card"
                  >
                    <img
                      src={model.image}
                      alt={`Perodua ${model.name}`}
                      width="320"
                      height="160"
                      loading="lazy"
                    />
                    <div>
                      <span>{model.type}</span>
                      <h3>
                        {model.name}
                        <ArrowUpRight size={18} />
                      </h3>
                      <p>Dari RM {currency(model.price)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </section>
      </main>
      <Footer whatsappMessage={quoteMessage} />
    </>
  );
}
