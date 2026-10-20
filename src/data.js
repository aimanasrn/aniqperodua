export const advisor = {
  name: "MUHAMMAD ANIQ EL QAZWINY BIN MUHAMMAD ASHRI",
  brand: "EN ANIQ",
  phone: "0199569283",
  displayPhone: "019-956 9283",
  email: "aniqelqazwiny96@gmail.com",
  showroom: "PSSB Kota Bharu 1",
  location: "Perodua Sales Sdn Bhd (PSSB), Kota Bharu 1, Kelantan",
  address: "Lot 2309, Batu 4, Jalan Kuala Krai, 15150 Kota Bharu, Kelantan",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Perodua+Lot+2309+Batu+4+Jalan+Kuala+Krai+15150+Kota+Bharu",
  instagram: "https://www.instagram.com/AniqPeroduaKotaBharu1/",
  tiktok: "https://www.tiktok.com/@el_aniq",
};

export const whatsappUrl = (
  message = "Hi En Aniq, saya berminat untuk memiliki kereta Perodua. Boleh bantu saya?",
) => `https://wa.me/60199569283?text=${encodeURIComponent(message)}`;

export const loanMessage =
  "Hi En Aniq, saya nak semak kelayakan loan Perodua secara percuma. Boleh bantu saya dengan dokumen yang diperlukan?";

export const cars = [
  {
    id: "myvi",
    name: "Myvi",
    type: "Hatchback",
    price: 46500,
    monthly: 510,
    status: "Ready Stock Available",
    tone: "green",
    tagline: "Ikon jalan raya. Pilihan hati.",
    features: ["Praktikal", "Gaya sporty"],
    image: "/images/myvi-front.webp",
  },
  {
    id: "bezza",
    name: "Bezza",
    type: "Sedan",
    price: 35800,
    monthly: 390,
    status: "High Demand",
    tone: "amber",
    tagline: "Lebih ruang untuk impian anda.",
    features: ["Fast Loan Approval", "Ruang luas"],
    image: "/images/bezza-front.webp",
  },
  {
    id: "axia",
    name: "Axia",
    type: "Hatchback",
    price: 38600,
    monthly: 420,
    status: "Ready Stock",
    tone: "green",
    tagline: "Kecil saiznya. Besar potensinya.",
    features: ["Kompak", "Mesra bandar"],
    image: "/images/axia-front.webp",
  },
  {
    id: "ativa",
    name: "Ativa",
    type: "SUV",
    price: 62500,
    monthly: 680,
    status: "Special Rebate",
    tone: "red",
    tagline: "Keyakinan dalam setiap perjalanan.",
    features: ["SUV bergaya", "Pemanduan tinggi"],
    image: "/images/ativa-front.webp",
  },
  {
    id: "alza",
    name: "Alza",
    type: "MPV",
    price: 62500,
    monthly: 680,
    status: "Family Favorite",
    tone: "blue",
    tagline: "Setiap perjalanan, bersama keluarga.",
    features: ["Mesra keluarga", "Ruang fleksibel"],
    image: "/images/alza-front.webp",
  },
];

export const currency = (value) =>
  new Intl.NumberFormat("en-MY", { maximumFractionDigits: 0 }).format(value);
