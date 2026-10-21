import { useId, useState } from "react";
import { Reveal } from "./UI";
import {
  ArrowUpRight,
  Calculator,
  CalendarDays,
  CarFront,
  ChevronDown,
  Info,
  MessageCircle,
  Percent,
  Wallet,
} from "lucide-react";
import {
  buildLoanWhatsAppUrl,
  calculateLoan,
  DEFAULT_CAR_MODELS,
  formatRM,
} from "../lib/loan";

const inputClassName =
  "min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 transition focus:border-[#ED1C24] focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-white/15 dark:bg-[#101114] dark:text-slate-100 dark:focus:ring-red-950";
const pillClassName =
  "min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold transition motion-reduce:transition-none";
const labelClassName =
  "mb-2.5 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200";

export default function LoanCalculator({
  models = DEFAULT_CAR_MODELS,
  whatsappNumber = "60199569283",
  id = "loan-calculator",
  className = "",
}) {
  const fieldId = useId();
  const availableModels = models.length ? models : DEFAULT_CAR_MODELS;
  const [selectedModelId, setSelectedModelId] = useState(
    () => availableModels[0].id,
  );
  const [deposit, setDeposit] = useState({ kind: "percentage", value: 10 });
  const [years, setYears] = useState(9);
  const [rate, setRate] = useState("3.2");

  const model =
    availableModels.find((item) => item.id === selectedModelId) ??
    availableModels[0];
  // Presets follow the selected model; a manually entered RM amount is preserved.
  const depositText =
    deposit.kind === "percentage"
      ? String(Number(((model.price * deposit.value) / 100).toFixed(2)))
      : deposit.value;
  const depositAmount = Number(depositText);
  const annualRate = Number(rate);
  const depositError =
    depositText.trim() === "" || !Number.isFinite(depositAmount)
      ? "Masukkan jumlah deposit."
      : depositAmount < 0 || depositAmount > model.price
        ? `Deposit mestilah antara RM 0 dan ${formatRM(model.price)}.`
        : Math.abs(depositAmount * 100 - Math.round(depositAmount * 100)) > 1e-6
          ? "Gunakan maksimum 2 tempat perpuluhan untuk deposit."
          : "";
  const rateError =
    rate.trim() === "" || !Number.isFinite(annualRate)
      ? "Masukkan kadar faedah."
      : annualRate < 0 || annualRate > 100
        ? "Kadar mestilah antara 0% dan 100% setahun."
        : "";
  const isValid = !depositError && !rateError;
  const estimate = isValid
    ? calculateLoan({
        price: model.price,
        deposit: depositAmount,
        years,
        annualRate,
      })
    : null;
  const quoteUrl = estimate
    ? buildLoanWhatsAppUrl({
        modelName: model.name,
        deposit: depositAmount,
        years,
        annualRate,
        ...estimate,
        whatsappNumber,
      })
    : undefined;

  function pillClass(active) {
    return `${pillClassName} ${
      active
        ? "border-[#ED1C24] bg-[#ED1C24] text-white shadow-sm"
        : "border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-[#ED1C24] dark:border-white/15 dark:bg-[#101114] dark:text-slate-300 dark:hover:border-red-500"
    }`;
  }

  return (
    <section
      id={id}
      aria-labelledby={`${fieldId}-heading`}
      className={`mx-auto max-w-[1336px] px-5 py-12 text-slate-900 sm:px-8 md:py-16 lg:px-12 dark:text-slate-100 ${className}`}
    >
      <Reveal>
        <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.16em] text-slate-500 dark:text-slate-400">
          <span className="h-0.5 w-7 bg-[#ED1C24]" aria-hidden="true" />
          KALKULATOR PINJAMAN
        </p>
        <h2
          id={`${fieldId}-heading`}
          className="text-3xl leading-tight font-extrabold tracking-tight md:text-4xl"
        >
          Rancang bajet. <span className="text-[#ED1C24]">Pandu impian.</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
          Anggarkan ansuran Perodua pilihan anda sebelum berbual dengan En Aniq.
        </p>
      </Reveal>

      <div className="mt-7 grid overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-[1.1fr_0.9fr] dark:border-white/10 dark:bg-[#191b20]">
        <Reveal className="grid content-start gap-7 p-5 sm:p-8">
          <div>
            <label htmlFor={`${fieldId}-model`} className={labelClassName}>
              <CarFront
                size={17}
                className="text-[#ED1C24]"
                aria-hidden="true"
              />
              Pilih model Perodua
            </label>
            <div className="relative">
              <select
                id={`${fieldId}-model`}
                value={model.id}
                onChange={(event) => setSelectedModelId(event.target.value)}
                className={`${inputClassName} appearance-none pr-10`}
              >
                {availableModels.map((item) => (
                  <option key={item.id} value={item.id}>
                    Perodua {item.name} — {formatRM(item.price)}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute top-4 right-4 text-slate-400"
                aria-hidden="true"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${fieldId}-deposit`} className={labelClassName}>
              <Wallet size={17} className="text-[#ED1C24]" aria-hidden="true" />
              Jumlah deposit / down payment
            </label>
            <div className="relative">
              <span
                className="pointer-events-none absolute top-3.5 left-4 text-sm text-slate-400"
                aria-hidden="true"
              >
                RM
              </span>
              <input
                id={`${fieldId}-deposit`}
                type="number"
                inputMode="decimal"
                min="0"
                max={model.price}
                step="0.01"
                value={depositText}
                onChange={(event) =>
                  setDeposit({ kind: "amount", value: event.target.value })
                }
                aria-invalid={Boolean(depositError)}
                aria-describedby={`${fieldId}-deposit-help ${depositError ? `${fieldId}-deposit-error` : ""}`.trim()}
                className={`${inputClassName} pl-12`}
              />
            </div>
            <div
              className="mt-3 flex gap-2"
              role="group"
              aria-label="Pilihan peratus deposit"
            >
              {[0, 10, 20].map((percentage) => (
                <button
                  key={percentage}
                  type="button"
                  aria-label={`Deposit ${percentage}%`}
                  aria-pressed={
                    deposit.kind === "percentage" &&
                    deposit.value === percentage
                  }
                  onClick={() =>
                    setDeposit({ kind: "percentage", value: percentage })
                  }
                  className={pillClass(
                    deposit.kind === "percentage" &&
                      deposit.value === percentage,
                  )}
                >
                  {percentage}%
                </button>
              ))}
            </div>
            <p
              id={`${fieldId}-deposit-help`}
              className="mt-2.5 text-xs leading-5 text-slate-500 dark:text-slate-400"
            >
              Pilih peratus atau masukkan jumlah sendiri dalam RM.
            </p>
            {depositError && (
              <p
                id={`${fieldId}-deposit-error`}
                role="alert"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                {depositError}
              </p>
            )}
          </div>

          <div className="grid gap-7 sm:grid-cols-[1.2fr_1fr]">
            <fieldset className="min-w-0">
              <legend className={labelClassName}>
                <CalendarDays
                  size={17}
                  className="text-[#ED1C24]"
                  aria-hidden="true"
                />
                Tempoh pinjaman
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {[5, 7, 9].map((period) => (
                  <button
                    key={period}
                    type="button"
                    aria-pressed={years === period}
                    onClick={() => setYears(period)}
                    className={`${pillClass(years === period)} px-2!`}
                  >
                    {period}{" "}
                    <span className="text-[10px] font-normal">tahun</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor={`${fieldId}-rate`} className={labelClassName}>
                <Percent
                  size={17}
                  className="text-[#ED1C24]"
                  aria-hidden="true"
                />
                Kadar rata (% setahun)
              </label>
              <input
                id={`${fieldId}-rate`}
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={rate}
                onChange={(event) => setRate(event.target.value)}
                aria-invalid={Boolean(rateError)}
                aria-describedby={
                  rateError ? `${fieldId}-rate-error` : undefined
                }
                className={inputClassName}
              />
              {rateError && (
                <p
                  id={`${fieldId}-rate-error`}
                  role="alert"
                  className="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  {rateError}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal className="flex flex-col bg-[#15171b] p-5 text-white sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-slate-400">
              ANGGARAN ANSURAN BULANAN
            </p>
            <Calculator
              size={23}
              className="text-[#ED1C24]"
              aria-hidden="true"
            />
          </div>
          <div className="mt-7 mb-6" aria-live="polite" aria-atomic="true">
            <output
              htmlFor={`${fieldId}-model ${fieldId}-deposit ${fieldId}-rate`}
              aria-label="Anggaran ansuran bulanan"
              className="block text-4xl leading-tight font-extrabold tracking-tight text-[#ED1C24] sm:text-5xl"
            >
              {estimate ? formatRM(estimate.monthly) : "—"}
            </output>
            <p className="mt-2 text-xs text-slate-400">
              sebulan · {years * 12} bulan · Perodua {model.name}
            </p>
          </div>

          <dl className="space-y-4 border-y border-white/10 py-5 text-xs">
            {[
              ["Harga kereta", formatRM(model.price)],
              ["Deposit", isValid ? formatRM(depositAmount) : "—"],
              [
                "Jumlah pinjaman",
                estimate ? formatRM(estimate.principal) : "—",
              ],
              [
                "Jumlah faedah",
                estimate ? formatRM(estimate.totalInterest) : "—",
              ],
              [
                "Jumlah bayaran balik loan",
                estimate ? formatRM(estimate.totalRepayment) : "—",
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4"
              >
                <dt className="text-slate-400">{label}</dt>
                <dd className="text-right font-semibold tabular-nums">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[11px] leading-5 text-slate-400">
            Faedah = pinjaman × (kadar % ÷ 100) × tahun. Ansuran = (pinjaman +
            faedah) ÷ jumlah bulan.
          </p>
          {estimate?.principal === 0 && (
            <p className="mt-2 text-xs text-emerald-400">
              Bayaran penuh — tiada pinjaman diperlukan.
            </p>
          )}
          <a
            href={quoteUrl}
            role="link"
            aria-disabled={!isValid}
            tabIndex={isValid ? 0 : -1}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-[#ED1C24] px-4 py-3.5 text-center text-xs leading-5 font-semibold text-white transition hover:bg-red-700 motion-reduce:transition-none ${!isValid ? "pointer-events-none opacity-40" : ""}`}
          >
            <MessageCircle size={20} className="shrink-0" aria-hidden="true" />
            <span>Hantar Sebut Harga Ke WhatsApp En Aniq</span>
            <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
          </a>
          <p className="mt-3 text-center text-[10px] text-slate-400">
            Anda semak mesej dahulu sebelum menghantarnya.
          </p>
        </Reveal>
      </div>
      <Reveal
        as="p"
        className="mt-4 flex items-start gap-2 text-[11px] leading-6 text-slate-500 dark:text-slate-400"
      >
        <Info size={15} className="mt-1 shrink-0" aria-hidden="true" />
        <span>
          Simulasi kadar rata berdasarkan harga rujukan. Bukan tawaran
          pembiayaan; kadar, kelulusan, caj dan kaedah pengiraan sebenar
          tertakluk kepada bank. Tidak termasuk insurans dan caj tambahan.
        </span>
      </Reveal>
    </section>
  );
}
