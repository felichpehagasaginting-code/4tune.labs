# 4tune.labs — Studio Rekayasa Software & Servis Hardware PC

> **"Dari kode web hingga hardware, beres tanpa perantara."**

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-orange?style=flat-square)](https://lenis.darkroom.engineering/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

Platform resmi **4tune.labs**, studio rekayasa teknologi independen yang didirikan dan dioperasikan langsung oleh empat mahasiswa rekayasa. Mengintegrasikan pengembangan website modern & solusi AI terapan dengan layanan servis laptop/PC, upgrade performa (SSD & RAM), deep cleaning, dan perbaikan perangkat keras bergaransi tanpa perantara non-teknis.

---

## 🌟 Nilai Utama & Filosofi Studio

1. **Zero Middleman (Nol Perantara):** Klien berbicara dan berdiskusi langsung dengan teknisi dan engineer yang mengeksekusi kode atau membongkar motherboard perangkat.
2. **Dual-Discipline Synergy:** Memadukan rekayasa perangkat lunak tingkat tinggi (*web applications, agent AI, design systems*) dengan keahlian sirkuit fisik (*hardware repair, component-level soldering, thermal management*).
3. **Kejujuran & Transparansi Biaya:** Diagnosa transparan sebelum pengerjaan, estimasi biaya terbuka via kalkulator interaktif, dan garansi pengerjaan nyata.
4. **Ramah Mahasiswa & UMKM:** Solusi yang dirancang efisien dan terjangkau, dilengkapi promo diskon reguler setiap hari Jum'at.

---

## 🚀 Fitur & Modul Interaktif

* **Kinetic Hero & Master Vector Mark:**
  - Animasi perakitan (*assembly*) logo 4tune.labs menggunakan GSAP timeline terpadu.
  - Orbit kinetik ganda (`orbit-a` & `orbit-b`) dengan simulasi rotasi inersial dan efek *breathing idle*.
  - Geometri vektor presisi tinggi yang memadukan 4 pita ribbon interlocking (Amber `#E4A932` & Green `#369966`), prisma rumah arsitektural (`#424449`), dan heksagon inti.
* **SolutionFinder (Pencari Solusi Kendala):**
  - Modul diagnostik interaktif berbasis gejala keluhan nyata (laptop panas, boot lemot, tugas akhir, website UMKM, serta kendala smartphone/HP).
  - **Quick Symptom Chips Khusus HP & Laptop:** chip diagnosa instan (`📱 LCD Retak / Bergaris`, `⚡ HP Mati Total (Matot)`, `🔌 Tidak Bisa Di-Cas`, `📷 Kamera Blur & Bergetar`, `🔊 Speaker Suara Pelan/Kresek`, `🔋 Baterai HP Kembung / Drop`, `🔥 Laptop Panas`, `⚡ Booting Lemot`) yang otomatis mengisi query pencarian dan membuka solusi terkait (*auto-expand*).
  - Filter pills kategori interaktif: *Semua Masalah*, *Kendala Laptop & PC*, *Kendala Smartphone & HP*, *Kebutuhan Usaha & UMKM*, dan *Tugas Akhir & Portofolio*.
  - Tautan WhatsApp langsung ke spesialis terkait (Zulkifli untuk HP, Sukron untuk PC, Felich untuk Web).
* **CuratedBundles (Paket Pilihan Terkurasi):**
  - Paket siap pakai terstruktur: **Paket Skripsi Anti-Panik**, **Paket Laptop Segar Kembali**, **Paket HP Segar & Normal Kembali**, **Paket UMKM Go-Online**, dan **Paket Portofolio Personal**.
  - Rincian checklist pekerjaan terstandardisasi dan badge verifikasi teknisi penanggung jawab.
* **CostEstimator (Kalkulator Biaya Interaktif):**
  - Kalkulator real-time dengan 3 tab kategori dinamis:
    1. **Servis Laptop & PC:** SSD (PCIe Gen 3 & Gen 4), RAM (DDR4 & DDR5), deep cleaning, thermal repasta, OS install, dan baterai laptop.
    2. **Servis Smartphone / HP:** Penggantian layar LCD (Incell ekonomis, OLED tajam, hingga Original OEM), penggantian baterai kembung/drop, perbaikan port cas Type-C/Lightning longgar, ganti modul kamera & kaca lensa, perbaikan HP mati total korslet jalur VPH_PWR, penanganan bootloop/flashing, hingga deep cleaning internal & pembersihan mesh speaker/port.
    3. **Divisi Web & Software:** Landing page, portofolio personal, web apps AI, custom domain, Google Maps SEO, dan bot asisten.
  - Multi-select add-on pengerjaan hardware/gadget dan toggle promo otomatis hari Jum'at (10% OFF).
  - Visualisasi harga coret (*strike-through pricing*) proporsional saat diskon Jum'at aktif.
  - **Swipeable Bottom Sheet (Vaul):** Rekapitulasi rincian biaya mobile terpadu tanpa scroll-jump, terkoordinasi dengan scroll engine Lenis (`data-lenis-prevent`).
  - Format pesan WhatsApp otomatis sekali klik ke teknisi spesialis (Sukron untuk PC, Zulkifli untuk HP, Felich untuk Web) dan tombol salin ringkasan estimasi ke clipboard.
* **BeforeAfterSlider (Komparasi Thermal & Radiator):**
  - Slider komparasi interaktif sebelum vs sesudah servis dengan dukungan tap instan dan touch target 44px (`touch-action: pan-y`).
* **LabLocation & Peta Interaktif OpenFreeMap:**
  - Basis fisik di **Asrama Sarana Citra Widya Edukasi (SCWE) Gedung 2 Lantai 3 Kamar 304**.
  - Peta interaktif live ditenagai **OpenFreeMap** via **MapLibre GL JS** dengan worker lokal same-origin, bebas API key.
  - Mode switcher antara Peta Interaktif Live dan Skema Radius Konsentris.
  - Kebijakan antar-jemput transparan: **Gratis (Rp 0)** untuk jarak jalan kaki (lingkungan asrama & kampus CWE); **Berbayar** sesuai jarak tempuh untuk kosan luar atau area sekitarnya.
  - Tombol instan salin alamat lengkap & patokan lab dengan fallback clipboard.
* **Portfolio Showcase & Lab Notes (Catatan Teknis Ringkas):**
  - Galeri proyek rekayasa nyata (Felys AI Companion, Nettas PB AI, Sistem Pembelajaran TRPL 2026, dll.) dengan modal detail interaktif.
  - **Lab Notes Edukasi & Studi Kasus:**
    * 5 Tanda Harddisk Mulai Sekarat (Sukron)
    * Kenapa Pasta Pendingin Kering Bikin Laptop Drop Separuh (Zulkifli)
    * Membangun Web Portofolio Hemat Nol Biaya Bulanan (Felich)
    * Prinsip Desain Antarmuka Ramah Pengguna Awam (Dika)
    * **SOP Diagnosa HP Mati Total: Melacak Jalur Short VPH_PWR dengan DC Power Supply & Thermal Cam (Zulkifli)**
    * **Pertolongan Pertama HP Kemasukan Air & Panduan Cerdas Memilih Panel Layar LCD (Zulkifli)**
  - Modal Reader Lab Notes full-screen di mobile dengan sticky header (`env(safe-area-inset-top)`) dan routing konsultasi WhatsApp dinamis berdasarkan penulis artikel.
* **Command Palette (`Ctrl+K` / `Cmd+K`):**
  - Antarmuka pencarian cepat bergaya keyboard-first untuk navigasi instan antar section dan modul.
* **Responsive Multi-Device Design:**
  - Fluid typography clamp dan zero horizontal scroll pada layar smartphone (320px–430px), tablet (768px–1024px), laptop, hingga layar desktop lebar.
  - Menu drawer mobile dengan tombol tutup eksplisit `[✕ Tutup]` (44×44px), penutupan via `Escape`, dan pelepasan scroll lock Lenis deterministik.
  - Dukungan penuh iOS *safe area insets* (notch & Dynamic Island).

---

## 🛠️ Tech Stack & Arsitektur

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) dengan React 19 Server & Client Components
* **Bahasa:** [TypeScript 5.8](https://www.typescriptlang.org/) dengan konfigurasi strict
* **Styling & Design Tokens:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom properties (*Warm Cream & Charcoal Editorial*)
* **Motion & Kinestetik:** [GSAP 3.12](https://greensock.com/gsap/) (Core, ScrollTrigger)
* **Smooth Scroll:** [@studio-freight/lenis](https://lenis.darkroom.engineering/) (Inertial physics scroll)
* **Tipografi:** Plus Jakarta Sans (UI Sans), Instrument Serif (Display Editorial), JetBrains Mono (Technical Monospace)
* **Testing & QA:** [Playwright](https://playwright.dev/) Headless Multi-Viewport Suite

---

## 👥 Tim Engineer & Principal Builders

| Nama | Disiplin & Peran | Fokus Utama |
| :--- | :--- | :--- |
| **Felich** | Full-Stack & AI Engineer | Arsitektur web modern, integrasi AI/LLM, Next.js, dan antarmuka interaktif |
| **Zulkifli ("Mamad")** | Electronics & Repair Specialist | Reparasi level komponen, micro-soldering, jalur PCB, dan diagnosa gadget |
| **Sukron** | PC Hardware & OS Specialist | Optimalisasi sistem operasi, perakitan PC kustom, ekspansi SSD/RAM, pendinginan |
| **Aris** | Embedded Systems & IoT Engineer | Integrasi mikrokontroler, sirkuit mikrotik/jaringan, dan otomasi perangkat keras |

---

## 📁 Struktur Direktori

```
4tune.labs/
├── app/
│   ├── api/
│   │   └── inquiry/route.ts      # API endpoint validasi dan penerimaan konsultasi
│   ├── globals.css               # Design tokens, tema editorial, dan responsive rules
│   ├── layout.tsx                # Root layout dengan Viewport, font injection, & SEO metadata
│   └── page.tsx                  # Master page yang merakit seluruh modul interaktif
├── components/
│   ├── interactive/
│   │   ├── command-palette.client.tsx # Modal navigasi keyboard Ctrl+K
│   │   └── cost-estimator.client.tsx  # Kalkulator estimasi biaya hardware & web
│   └── modules/
│       ├── curated-bundles.tsx   # Komponen kartu paket siap pakai
│       ├── lab-notes.tsx         # Komponen catatan teknis & studi kasus
│       └── solution-finder.tsx   # Komponen pencari solusi gejala masalah
├── data/
│   ├── bundles-data.ts           # Dataset paket pilihan terkurasi
│   ├── pricing-matrix.ts         # Matriks harga hardware, upgrade, dan software
│   ├── solutions-data.ts         # Dataset gejala kendala teknis dan diagnosa
│   └── team-data.ts              # Dataset profil engineer dan spesialisasi
├── providers/
│   └── smooth-scroll.client.tsx  # Integrasi Lenis Smooth Scroll dan sinkronisasi GSAP
├── public/
│   └── icon.svg                  # Vektor favicon master 4tune.labs
├── ARCHITECTURE.md               # Spesifikasi arsitektur teknis lengkap
├── CONTENT_SPEC.md               # Spesifikasi konten dan copywriting
├── DESIGN_SYSTEM.md              # Panduan sistem desain dan token visual
├── DEVELOPMENT.md                # Panduan alur kerja rekayasa dan development
├── PRD.md                        # Product Requirement Document
├── UIUX.md                       # Spesifikasi antarmuka dan interaksi UX
└── package.json                  # Konfigurasi dependensi dan skrip proyek
```

---

## 💻 Panduan Instalasi & Menjalankan Proyek

### Prasyarat
- **Node.js:** `>= 20.0.0`
- **Package Manager:** `pnpm >= 9.0.0`

### 1. Kloning Repositori
```bash
git clone https://github.com/felichpehagasaginting-code/4tune.labs.git
cd 4tune.labs
```

### 2. Pasang Dependensi
```bash
pnpm install
```

### 3. Jalankan Development Server
```bash
pnpm dev
```
Buka browser dan akses `http://localhost:3000`.

### 4. Build untuk Produksi
```bash
pnpm build
pnpm start
```

---

## 📞 Konsultasi & Kontak Resmi

* **WhatsApp Divisi Servis Laptop & PC (Sukron):** [+62 838-9449-6994](https://wa.me/6283894496994)
* **WhatsApp Divisi Reparasi Smartphone & HP (Zulkifli):** [+62 831-5939-2826](https://wa.me/6283159392826)
* **WhatsApp Divisi Web, Software & AI (Felich):** [+62 823-8652-6982](https://wa.me/6282386526982)
* **Email Resmi:** [4tune.labs@gmail.com](mailto:4tune.labs@gmail.com)
* **Portofolio Developer:** [felich-dev.vercel.app](https://felich-dev.vercel.app/)

---

© 2026 **4tune.labs**. Seluruh hak cipta dilindungi undang-undang. Dibuat dengan transparansi teknis tinggi.
