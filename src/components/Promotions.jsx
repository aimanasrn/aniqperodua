import {
  Gift,
  Fuel,
  Video,
  ScanLine,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { Reveal, SectionLabel, WhatsAppButton } from "./UI";
import { whatsappUrl } from "../data";

const gifts = [
  [ScanLine, "Tinted voucher", "Lebih selesa"],
  [Fuel, "Baucar petrol", "Mulakan perjalanan"],
  [Video, "Dashcam", "Lebih ketenangan"],
  [Gift, "Hadiah istimewa", "Khas untuk anda"],
];

export default function Promotions() {
  return (
    <section
      id="promosi"
      className="container promotions"
      aria-labelledby="promotion-heading"
    >
      <div className="promotion-panel">
        <Reveal className="promotion-copy">
          <SectionLabel light>PROMOSI & REBAT</SectionLabel>
          <h2 id="promotion-heading">
            Lebih berbaloi.
            <br />
            <span>Lebih banyak ekstra.</span>
          </h2>
          <p>
            Kereta baharu, senyuman baharu. Tanya En Aniq tentang rebat, bonus
            trade-in dan pakej hadiah bulan ini.
          </p>
          <WhatsAppButton message="Hi En Aniq, boleh kongsikan promosi bulan ini, rebat, bonus trade-in dan pakej hadiah untuk Perodua?">
            Semak promosi bulan ini
          </WhatsAppButton>
        </Reveal>
        <div className="promotion-extras">
          <div className="gift-grid">
            {gifts.map(([Icon, title, subtitle], index) => (
              <Reveal className="gift-item" key={title} delay={index * 0.06}>
                <Icon size={27} strokeWidth={1.5} />
                <strong>{title}</strong>
                <span>{subtitle}</span>
              </Reveal>
            ))}
          </div>
          <Reveal
            as="a"
            className="trade-in"
            href={whatsappUrl(
              "Hi En Aniq, saya nak trade-in kereta lama untuk Perodua baharu. Boleh bantu buat penilaian?",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RefreshCw size={18} />
            <span>
              Ada kereta lama? <strong>Jom semak nilai trade-in.</strong>
            </span>
            <ArrowUpRight size={18} />
          </Reveal>
          <Reveal as="p" className="promotion-note">
            Contoh pakej hadiah. Ketersediaan dan terma tawaran perlu disahkan.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
