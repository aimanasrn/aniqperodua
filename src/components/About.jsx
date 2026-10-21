import { lazy, Suspense, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, Move, RotateCw } from "lucide-react";
import { advisor } from "../data";
import { Reveal, SectionLabel, WhatsAppButton } from "./UI";

const Lanyard = lazy(() => import("./Lanyard"));
const images = {
  front: "/images/lanyard/about1.png",
  back: "/images/lanyard/about2.png",
  band: "/images/lanyard/about3.png",
};

export default function About() {
  const stageRef = useRef(null);
  const lanyardRef = useRef(null);
  const nearViewport = useInView(stageRef, { once: true, margin: "240px 0px" });
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <section
      id="tentang-saya"
      className="about section-space container"
      aria-labelledby="about-heading"
    >
      <Reveal className="about-lanyard-frame">
        <div
          ref={stageRef}
          className="about-lanyard-stage"
          role="img"
          aria-label="Kad En Aniq: potret di hadapan, logo Perodua di belakang dan tali berjenama Perodua."
        >
          {!ready && (
            <img
              src={images.front}
              alt=""
              width="1086"
              height="1448"
              loading="lazy"
              className="about-lanyard-poster"
            />
          )}
          {nearViewport && (
            <Suspense fallback={null}>
              <Lanyard
                ref={lanyardRef}
                frontImage={images.front}
                backImage={images.back}
                strapImage={images.band}
                imageFit="contain"
                orientation="portrait"
                cardColor="#ffffff"
                strapColor="#ffffff"
                finish="glossy"
                metal="silver"
                size={0.62}
                strapLength={0.4}
                strapWidth={0.85}
                damping={0.75}
                breeze={reducedMotion ? 0 : 0.08}
                intro={false}
                dpr={1.25}
                onReady={() => setReady(true)}
              />
            </Suspense>
          )}
        </div>
        <div className="about-lanyard-controls">
          <span>
            <Move size={14} aria-hidden="true" />
            Seret kad untuk bermain
          </span>
          <button
            type="button"
            disabled={!ready}
            onClick={() => lanyardRef.current?.flip()}
            aria-label="Pusing kad En Aniq untuk melihat bahagian lain"
          >
            <RotateCw size={15} aria-hidden="true" />
            Pusing kad
          </button>
        </div>
      </Reveal>

      <div className="about-copy">
        <Reveal>
          <SectionLabel>TENTANG SAYA</SectionLabel>
          <h2 id="about-heading" className="section-heading">
            Kenali insan di sebalik <span>kunci impian anda.</span>
          </h2>
          <div className="about-identity">
            <h3>{advisor.brand}</h3>
            <p>{advisor.name}</p>
            <span>Senior Sales Advisor · {advisor.showroom}</span>
          </div>
          <p className="section-description">
            Salam, saya En Aniq. Dengan 14 tahun pengalaman bersama Perodua,
            saya membantu pelanggan di Kota Bharu dan seluruh Malaysia memilih
            kereta yang sesuai dengan keperluan dan bajet mereka.
          </p>
          <p className="section-description">
            Dari pertanyaan pertama, semakan dokumen dan kelayakan pinjaman,
            sehinggalah hari penyerahan kunci — saya sedia membimbing anda
            supaya setiap langkah lebih jelas, mudah dan meyakinkan.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="about-services">
            {[
              "Panduan memilih model mengikut bajet",
              "Bantuan dokumen & semakan kelayakan",
              "Urusan trade-in hingga penyerahan kunci",
            ].map((service) => (
              <li key={service}>
                <Check size={15} aria-hidden="true" />
                {service}
              </li>
            ))}
          </ul>
          <WhatsAppButton message="Hi En Aniq, saya ingin mengenali servis En Aniq dan mendapatkan panduan memilih Perodua yang sesuai dengan bajet saya.">
            Bincang dengan saya
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}
