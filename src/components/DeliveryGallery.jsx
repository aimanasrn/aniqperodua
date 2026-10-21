import { useId, useRef } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MoveHorizontal,
} from "lucide-react";
import FlexCarousel from "./FlexCarousel";
import { MEMORY_ITEMS } from "../data/gallery";
import { Reveal } from "./UI";

export default function DeliveryGallery({
  items = MEMORY_ITEMS,
  isDemo = true,
  whatsappNumber = "60199569283",
  id = "delivery-gallery",
  className = "",
}) {
  const headingId = useId();
  const carouselId = useId();
  const carouselRef = useRef(null);
  const message =
    "Hi En Aniq, saya berminat untuk memiliki Perodua. Boleh bantu semak kelayakan loan saya?";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const arrowClass =
    "grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-[#ED1C24] hover:bg-[#ED1C24] hover:text-white motion-reduce:transition-none dark:border-white/15 dark:bg-[#191b20] dark:text-slate-200";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mx-auto max-w-[1336px] px-5 py-12 text-slate-900 sm:px-8 md:py-16 lg:px-12 dark:text-slate-100 ${className}`}
    >
      <Reveal>
        <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.16em] text-slate-500 dark:text-slate-400">
          <span className="h-0.5 w-7 bg-[#ED1C24]" aria-hidden="true" />
          GALERI KENANGAN
        </p>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2
              id={headingId}
              className="text-3xl leading-tight font-extrabold tracking-tight md:text-4xl"
            >
              Setiap perjalanan.{" "}
              <span className="text-[#ED1C24]">Ada kenangan.</span>
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Detik istimewa sepanjang perjalanan bersama En Aniq.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={arrowClass}
              aria-label="Kenangan sebelumnya"
              aria-controls={carouselId}
              onClick={() => carouselRef.current?.previous()}
            >
              <ChevronLeft size={19} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={arrowClass}
              aria-label="Kenangan seterusnya"
              aria-controls={carouselId}
              onClick={() => carouselRef.current?.next()}
            >
              <ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>
        {isDemo && (
          <p className="mt-4 text-xs leading-6 text-slate-500 dark:text-slate-400">
            Gambar contoh sementara, bukan foto pelanggan sebenar.
          </p>
        )}
      </Reveal>

      <Reveal
        id={carouselId}
        className="mt-7 h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-white sm:h-[500px] lg:h-[560px] dark:border-white/10 dark:bg-[#15171b]"
      >
        <FlexCarousel
          ref={carouselRef}
          items={items}
          preset="liquid"
          fit="landscape"
          cardHeight={0.58}
          gap={20}
          radius={14}
          bend={0.22}
          dispersion={0.18}
          intro="fade"
          captureWheel={false}
          ariaLabel="Galeri Kenangan En Aniq"
        />
      </Reveal>
      <Reveal
        as="p"
        className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400"
      >
        <MoveHorizontal size={15} aria-hidden="true" />
        Leret, seret atau guna anak panah untuk lihat kenangan.
      </Reveal>

      <Reveal className="mt-7 flex flex-col items-start justify-between gap-5 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:p-6 dark:border-white/10 dark:bg-[#191b20]">
        <div>
          <p className="text-sm font-bold">
            Jom cipta kenangan anda bersama Perodua.
          </p>
          <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
            En Aniq sedia bantu anda mengambil langkah seterusnya.
          </p>
        </div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-[#ED1C24] bg-white px-4 py-3 text-center text-xs leading-5 font-semibold text-[#ED1C24] transition hover:bg-[#ED1C24] hover:text-white motion-reduce:transition-none sm:w-auto sm:max-w-sm dark:bg-transparent dark:hover:bg-[#ED1C24]"
        >
          <MessageCircle size={18} className="shrink-0" aria-hidden="true" />
          <span>Semak Kelayakan Anda Bersama En Aniq</span>
          <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
