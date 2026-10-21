import test from "node:test";
import assert from "node:assert/strict";
import {
  buildLoanWhatsAppUrl,
  calculateLoan,
  DEFAULT_CAR_MODELS,
} from "./loan.js";

const defaults = { price: 46500, deposit: 4650, years: 9, annualRate: 3.2 };

test("Myvi: 10% deposit, 9 years, 3.2% flat rate", () => {
  const result = calculateLoan(defaults);
  assert.equal(result.principal, 41850);
  assert.ok(Math.abs(result.totalInterest - 12052.8) < 1e-8);
  assert.equal(result.months, 108);
  assert.equal(result.monthly.toFixed(2), "499.10");
  assert.equal(result.totalRepayment.toFixed(2), "53902.80");
});

test("changing model and term recalculates principal and interest", () => {
  const result = calculateLoan({
    price: 35800,
    deposit: 7160,
    years: 5,
    annualRate: 3.2,
  });
  assert.equal(result.principal, 28640);
  assert.equal(result.monthly.toFixed(2), "553.71");
  const sevenYears = calculateLoan({ ...defaults, years: 7 });
  assert.equal(sevenYears.monthly.toFixed(2), "609.81");
});

test("zero deposit and zero interest are valid estimates", () => {
  const result = calculateLoan({ ...defaults, deposit: 0, annualRate: 0 });
  assert.equal(result.principal, 46500);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.monthly.toFixed(2), "430.56");
});

test("paying the entire price produces zero principal, interest and instalment", () => {
  const result = calculateLoan({ ...defaults, deposit: 46500 });
  assert.equal(result.principal, 0);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.monthly, 0);
});

test("fractional RM deposits retain precision until display formatting", () => {
  const result = calculateLoan({ ...defaults, deposit: 4650.55 });
  assert.equal(result.principal.toFixed(2), "41849.45");
  assert.equal(result.monthly.toFixed(2), "499.09");
});

test("invalid inputs are rejected instead of producing negative or NaN estimates", () => {
  for (const invalid of [
    { deposit: -1 },
    { deposit: 46501 },
    { deposit: NaN },
    { annualRate: -1 },
    { annualRate: Infinity },
    { annualRate: 101 },
    { years: 0 },
    { years: 6 },
    { price: 0 },
    { price: "46500" },
  ]) {
    assert.throws(() => calculateLoan({ ...defaults, ...invalid }), RangeError);
  }
});

test("all five models use the published reference starting prices", () => {
  assert.deepEqual(
    DEFAULT_CAR_MODELS.map(({ name, price }) => [name, price]),
    [
      ["Myvi", 46500],
      ["Bezza", 34580],
      ["Axia", 22000],
      ["Ativa", 62500],
      ["Alza", 62500],
    ],
  );
});

test("WhatsApp quote contains the actual selected values and URL-encoded Malay text", () => {
  const url = new URL(
    buildLoanWhatsAppUrl({
      ...defaults,
      modelName: "Myvi",
      ...calculateLoan(defaults),
    }),
  );
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/60199569283");
  assert.match(url.searchParams.get("text"), /Model: Perodua Myvi/);
  assert.match(url.searchParams.get("text"), /Deposit: RM 4,650\.00/);
  assert.match(url.searchParams.get("text"), /Tempoh pinjaman: 9 tahun/);
  assert.match(url.searchParams.get("text"), /RM 499\.10\/bulan/);
  assert.ok(url.href.includes("%0A"));
});
