export const DEFAULT_CAR_MODELS = [
  { id: "myvi", name: "Myvi", price: 46500 },
  { id: "bezza", name: "Bezza", price: 35800 },
  { id: "axia", name: "Axia", price: 38600 },
  { id: "ativa", name: "Ativa", price: 62500 },
  { id: "alza", name: "Alza", price: 62500 },
];

export const formatRM = (value) =>
  `RM ${new Intl.NumberFormat("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}`;

/** Illustrative flat-rate calculation. annualRate is a percentage, e.g. 3.2. */
export function calculateLoan({ price, deposit, years, annualRate }) {
  if (
    ![price, deposit, years, annualRate].every(Number.isFinite) ||
    price <= 0 ||
    deposit < 0 ||
    deposit > price ||
    ![5, 7, 9].includes(years) ||
    annualRate < 0 ||
    annualRate > 100
  ) {
    throw new RangeError("Invalid loan inputs");
  }

  const principal = price - deposit;
  const totalInterest = principal * (annualRate / 100) * years;
  const totalRepayment = principal + totalInterest;
  return {
    principal,
    totalInterest,
    totalRepayment,
    months: years * 12,
    monthly: totalRepayment / (years * 12),
  };
}

export function buildLoanWhatsAppUrl({
  modelName,
  deposit,
  years,
  annualRate,
  principal,
  monthly,
  whatsappNumber = "60199569283",
}) {
  const message = [
    "Hi En Aniq, saya ingin mendapatkan sebut harga Perodua.",
    "",
    `Model: Perodua ${modelName}`,
    `Deposit: ${formatRM(deposit)}`,
    `Tempoh pinjaman: ${years} tahun`,
    `Kadar rata anggaran: ${annualRate}% setahun`,
    `Jumlah pinjaman: ${formatRM(principal)}`,
    `Anggaran ansuran bulanan: ${formatRM(monthly)}/bulan`,
    "",
    "Ini simulasi sahaja. Boleh bantu sahkan sebut harga dan semak kelayakan loan saya?",
  ].join("\n");
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
