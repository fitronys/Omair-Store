import { Product } from "./types";
import imgPaketLengkap from "./assets/images/paket_seragam_lengkap_1783720164360.jpg";
import imgPutihAbu from "./assets/images/seragam_putih_abu_abu_fabric_1783720517202.jpg";
import imgPramuka from "./assets/images/seragam_pramuka_fabric_matched_1783720847826.jpg";
import imgBatik from "./assets/images/seragam_batik_fabric_matched_1783720977933.jpg";
import imgKhas from "./assets/images/seragam_khas_fabric_matched_1783721180363.jpg";
import imgKatelpak from "./assets/images/seragam_katelpak_practice_1783721318541.jpg";
import imgOlahraga from "./assets/images/seragam_olahraga_athletic_1783723453666.jpg";
import imgAtribut from "./assets/images/atribut_sekolah_sma_1783723647208.jpg";
import imgJilbab from "./assets/images/jilbab_sekolah_tiga_warna_1783723802198.jpg";

export const products: Product[] = [
  {
    id: "1Lengkap",
    name: "Paket Seragam lengkap",
    description: "Bahan Kain seragam setelan Putih abu-abu, pramuka, batik, baju khas, baju praktik, kaos olahraga, & atribut sekolah, * jilbab 4 warna (Putri)",
    price: 2070000,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    variants: ["Putra", "Putri"],
    optionPrices: {
      "S-Putra": 2070000,
      "S-Putri": 2305000,
      "M-Putra": 2070000,
      "M-Putri": 2305000,
      "L-Putra": 2070000,
      "L-Putri": 2305000,
      "XL-Putra": 2070000,
      "XL-Putri": 2305000,
      "XXL-Putra": 2410000,
      "XXL-Putri": 2645000,
      "XXXL-Putra": 2410000,
      "XXXL-Putri": 2645000,
    },
    image: imgPaketLengkap,
    category: "Seragam"
  },
  {
    id: "2putihabu",
    name: "Seragam 'Putih Abu-abu'",
    description: "Bahan kain setelan atasan dan bawahan seragam putih abu-abu.",
    price: 345000,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    variants: ["Putra", "Putri"],
    optionPrices: {
      "S-Putra": 345000,
      "S-Putri": 350000,
      "M-Putra": 345000,
      "M-Putri": 350000,
      "L-Putra": 345000,
      "L-Putri": 350000,
      "XL-Putra": 345000,
      "XL-Putri": 350000,
      "XXL-Putra": 430000,
      "XXL-Putri": 435000,
      "XXXL-Putra": 430000,
      "XXXL-Putri": 435000,
    },
    image: imgPutihAbu,
    category: "Seragam"
  },
  {
    id: "3pramuka",
    name: "Seragam 'Pramuka'",
    description: "Bahan kain setelan atasan dan bawahan seragam pramuka.",
    price: 345000,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    variants: ["Putra", "Putri"],
    optionPrices: {
      "S-Putra": 345000,
      "S-Putri": 350000,
      "M-Putra": 345000,
      "M-Putri": 350000,
      "L-Putra": 345000,
      "L-Putri": 350000,
      "XL-Putra": 345000,
      "XL-Putri": 350000,
      "XXL-Putra": 430000,
      "XXL-Putri": 435000,
      "XXXL-Putra": 430000,
      "XXXL-Putri": 435000,
    },
    image: imgPramuka,
    category: "Seragam"
  },
  {
    id: "4batik",
    name: "Seragam 'Batik'",
    description: "Bahan kain setelan atasan dan bawahan seragam batik.",
    price: 345000,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    variants: ["Putra", "Putri"],
    optionPrices: {
      "S-Putra": 345000,
      "S-Putri": 350000,
      "M-Putra": 345000,
      "M-Putri": 350000,
      "L-Putra": 345000,
      "L-Putri": 350000,
      "XL-Putra": 345000,
      "XL-Putri": 350000,
      "XXL-Putra": 430000,
      "XXL-Putri": 435000,
      "XXXL-Putra": 430000,
      "XXXL-Putri": 435000,
    },
    image: imgBatik,
    category: "Seragam"
  },
  {
    id: "5khas",
    name: "Seragam 'Khas'",
    description: "Bahan kain setelan atasan dan bawahan seragam khas.",
    price: 345000,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    variants: ["Putra", "Putri"],
    optionPrices: {
      "S-Putra": 345000,
      "S-Putri": 350000,
      "M-Putra": 345000,
      "M-Putri": 350000,
      "L-Putra": 345000,
      "L-Putri": 350000,
      "XL-Putra": 345000,
      "XL-Putri": 350000,
      "XXL-Putra": 430000,
      "XXL-Putri": 435000,
      "XXXL-Putra": 430000,
      "XXXL-Putri": 435000,
    },
    image: imgKhas,
    category: "Seragam"
  },
  {
    id: "6kerja",
    name: "Seragam 'katelpak'",
    description: "Seragam kerja / bengkel / lab / katelpak.",
    price: 285000,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    variants: ["Putra", "Putri"],
    optionPrices: {
      "S-Putra": 285000,
      "S-Putri": 285000,
      "M-Putra": 285000,
      "M-Putri": 285000,
      "L-Putra": 285000,
      "L-Putri": 285000,
      "XL-Putra": 285000,
      "XL-Putri": 285000,
      "XXL-Putra": 285000,
      "XXL-Putri": 285000,
      "XXXL-Putra": 285000,
      "XXXL-Putri": 285000,
    },
    image: imgKatelpak,
    category: "Praktik"
  },
  {
    id: "7olahraga",
    name: "Seragam 'olahraga'",
    description: "Seragam olahraga.",
    price: 185000,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    variants: ["Putra", "Putri"],
    optionPrices: {
      "S-Putra": 185000,
      "S-Putri": 185000,
      "M-Putra": 185000,
      "M-Putri": 185000,
      "L-Putra": 185000,
      "L-Putri": 185000,
      "XL-Putra": 185000,
      "XL-Putri": 185000,
      "XXL-Putra": 185000,
      "XXL-Putri": 185000,
      "XXXL-Putra": 185000,
      "XXXL-Putri": 185000,
    },
    image: imgOlahraga,
    category: "Olahraga"
  },
  {
    id: "8atribut",
    name: "Atribut sekolah",
    description: "Dasi, hasduk, ikat pinggang, kaoskaki, dan topi.",
    price: 220000,
    sizes: ["All Size"],
    variants: ["Unisex"],
    optionPrices: {
      "All Size-Unisex": 220000,
    },
    image: imgAtribut,
    category: "Atribut"
  },
  {
    id: "9jilbab",
    name: "Jilbab sekolah",
    description: "Jilbab warna putih, coklat muda, dan cream.",
    price: 210000,
    sizes: ["All Size"],
    optionPrices: {
      "All Size": 220000,
    },
    image: imgJilbab,
    category: "Atribut"
  }
];
