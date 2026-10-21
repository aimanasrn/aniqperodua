import { Trophy, Zap, CarFront, MapPin, Gift } from "lucide-react";
import { Reveal } from "./UI";

const highlights = [
  [Trophy, "14+ Tahun Pengalaman", "Khidmat yang dipercayai"],
  [Zap, "Loan Cepat & Mudah", "Dibantu dari A hingga Z"],
  [CarFront, "Ready Stock", "Sedia untuk dimiliki"],
  [MapPin, "PSSB Kota Bharu 1", "Dealer rasmi Perodua"],
  [Gift, "Hadiah & Diskaun", "Lebih nilai untuk anda"],
];

export default function TrustHighlights() {
  return (
    <div className="container">
      <div className="trust-strip">
        {highlights.map(([Icon, title, description], index) => (
          <Reveal className="trust-item" key={title} delay={index * 0.06}>
            <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
