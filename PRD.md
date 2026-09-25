# PRODUCT REQUIREMENT DOCUMENT (PRD)

**Document Identifier:** `4TL-PRD-2026-V2.0`  
**Project:** 4tune.labs Production Web Platform  
**Document Version:** 2.0.0 (Production Release with Full Responsive & Interactive System)  
**Status:** Implemented & Verified in Production  
**Ownership:** 4tune.labs Core Engineering Team  
**Official Ingestion:** `4tune.labs@gmail.com`  
**Repository:** `https://github.com/felichpehagasaginting-code/4tune.labs`  

---

## 1. Executive Summary & Proposisi Nilai

### 1.1 Problem Statement
Klien mahasiswa, UMKM, dan kreator sering terjebak di antara dua masalah besar saat membutuhkan solusi teknologi:
1. **Dilema Agensi Web Konvensional:** Biaya jasa pembuatan website yang tinggi karena overhead manajemen dan *account manager*, proses birokrasi berbelit-belit, dan minimnya transparansi kode.
2. **Dilema Servis Komputer Konvensional:** Tempat servis fisik yang sering kali menutupi diagnosa kerusakan asli, mark-up harga sparepart yang tidak jelas, ketidakmampuan memahami kebutuhan software modern, dan waktu tunggu berhari-hari tanpa kepastian.

### 1.2 Solusi 4tune.labs
**4tune.labs** adalah studio rekayasa teknologi independen yang didirikan dan dijalankan langsung oleh empat mahasiswa rekayasa:
* **Felich** — AI & Product Engineer
* **Zulkifli ("Mamad")** — Electronics & Repair Specialist
* **Sukron** — PC Hardware & OS Specialist
* **Dika** — Product & UI/UX Design

Studio ini mengusung moto **"Dari kode web hingga hardware, beres tanpa perantara."** Klien berinteraksi langsung dengan engineer yang mengeksekusi proyeknya. Transparan, bergaransi, dan ramah kantong mahasiswa serta pelaku UMKM.

### 1.3 Target Pengguna & Persona
* **Persona A: Mahasiswa & Akademisi (Tugas Akhir, Riset, Performa Harian)**
  * *Kebutuhan:* Laptop lemot/panas yang butuh deep cleaning, upgrade SSD & RAM mendesak, atau pembuatan prototipe website/aplikasi tugas akhir bergaransi.
  * *Fitur Penjawab:* *SolutionFinder* kategori Mahasiswa, *Paket Mahasiswa Fresh & Kencang*, diskon servis setiap hari Jum'at.
* **Persona B: Pemilik Usaha & UMKM Lokal**
  * *Kebutuhan:* Landing page profesional, toko online, integrasi Google Maps & WhatsApp, serta pemeliharaan hardware komputer kasir/toko.
  * *Fitur Penjawab:* *Paket UMKM Go-Online*, estimasi biaya instan via *CostEstimator*, konsultasi web langsung via WhatsApp.
* **Persona C: Kreator Konten, Gamer & Profesional**
  * *Kebutuhan:* Rakit PC workstation kustom, tuning performa sistem operasi, perbaikan sirkuit elektronik gadget, dan aplikasi AI modern.
  * *Fitur Penjawab:* *Paket Kreator & AI Ready*, diagnosa hardware mendalam, artikel teknis pada *Lab Notes*.

---

## 2. Fitur Produk & Spesifikasi Fungsional

### 2.1 Hero Kinetic Stage & Master Vector Mark
* **Animasi Perakitan Vektor (GSAP):**
  - Timeline GSAP menyatukan pita ribbon interlocking (Amber `#E4A932` & Green `#369966`), prisma rumah arsitektural (`#424449`), dan heksagon inti.
  - Orbit kinetik ganda (`orbit-a` dan `orbit-b`) dengan rotasi berkelanjutan.
  - Efek *breathing idle* halus pada elemen tengah logo.
* **Tipografi Editorial & Branding:**
  - Headline 3-baris terstruktur: *"Dari kode web / hingga hardware, / beres tanpa perantara."*
  - Komponen wordmark `<BrandText />` dengan pewarnaan khas: `4` (Amber), `tune` (Green), `.labs` (Charcoal).
  - Trust badge penjamin: Dibalas < 24 jam, diagnosa transparan & bergaransi, ramah mahasiswa & UMKM.

### 2.2 SolutionFinder (Pencari Solusi Gejala Kendala)
* Filter pills interaktif dengan 4 kategori: *Semua Masalah*, *Kendala Laptop & Gadget*, *Kebutuhan Usaha & UMKM*, *Tugas Akhir & Portofolio*.
* Pada perangkat mobile, filter pills mendukung *horizontal swipe scrolling with momentum*.
* Accordion satu pintu (*single-expand mechanism*) dengan sinkronisasi `ScrollTrigger.refresh()`.
* Setiap item mencakup: badge kategori, kutipan keluhan umum, diagnosa akar masalah, solusi teknis 4tune.labs, estimasi pengerjaan, dan tombol WhatsApp pra-terformat.

### 2.3 CuratedBundles (Paket Siap Pakai Terkurasi)
* Tiga pilihan paket terstruktur:
  1. **Paket Mahasiswa Fresh & Kencang (Rp 120k – 170k):** Deep cleaning, pasta pendingin, optimasi startup, diskon hari Jum'at.
  2. **Paket UMKM Go-Online (Rp 450k – 850k):** Landing page Next.js, mobile friendly, integrasi WA & Maps, SEO lokal.
  3. **Paket Kreator & AI Ready (Rp 2.5jt – 6.5jt):** Rakit workstation/upgrade maksimal, integrasi agen AI/dashboard interaktif.
* Checklist pekerjaan transparan dan penanggung jawab teknisi tertera pada masing-masing paket.

### 2.4 CostEstimator (Kalkulator Biaya Interaktif)
* **Tab Switcher:** Beralih antara kategori *Hardware & Servis PC* dan *Pembuatan Website & AI*.
* **Opsi Hardware:**
  - **Penyimpanan (SSD):** Pemisahan generasi PCIe Gen 3 (hemat & standar ~2.400 - 3.500 MB/s, kapasitas 256GB - 1TB) dan PCIe Gen 4 (ultra-fast ~5.000 - 7.400 MB/s, kapasitas 512GB - 2TB) dilengkapi sub-filter pills (*Semua*, *PCIe Gen 3*, *PCIe Gen 4*) dan visual badge generasi pada kartu pilihan.
  - **Memori (RAM):** Pemisahan tipe DDR4 (3200 MHz, 8GB - 32GB Kit) dan DDR5 (4800 / 5600 MHz, 8GB - 32GB Kit) dilengkapi sub-filter pills (*Semua*, *DDR4*, *DDR5*) dan visual badge penanda generasi.
  - Multi-select add-ons: Deep Cleaning & Ganti Thermal Paste, Instalasi Bersih OS, Ganti Baterai, Backup & Penyelamatan Data.
  - **Diskon Hari Jum'at (10% OFF):** Otomatis aktif pada hari Jum'at atau dapat di-toggle manual.
* **Opsi Software:**
  - Tipe website: Landing Page UMKM, Web Portofolio/Tugas Akhir, Aplikasi Web Custom, Integrasi Agen AI & Otomasi.
  - Multi-select add-ons: Optimasi SEO, CMS Panel, Desain Responsif Premium, Integrasi Payment Gateway/API.
* **Action Output:**
  - Rentang harga total terhitung secara dinamis (*real-time reactive*).
  - Tombol WhatsApp otomatis menghasilkan teks konsultasi yang memuat rincian opsi yang dipilih.
  - Tombol *Salin Estimasi* ke clipboard dengan konfirmasi badge interaktif.

### 2.5 Showcase Karya & Lab Notes
* Galeri studi kasus proyek rekayasa nyata:
  - **Felys (AI Companion Platform)** — Next.js, LLM Streaming, Web Speech API.
  - **Nettas PB AI (Photobooth Cross-Platform)** — Electron, Next.js, OpenCV background removal.
  - **Platform Pembelajaran Interaktif TRPL 2026** — Full-stack LMS & sandbox penilaian otomatis.
* Modal detail interaktif dengan keyboard `ESC` dismiss dan backdrop lock.
* Catatan laboratorium dan panduan teknis berkala untuk edukasi pengguna.

### 2.6 Tim Rekayasa & Konsultasi Dual-Channel
* Profil mendalam untuk 4 engineer inti dengan keahlian teknis dan portofolio masing-masing.
* Tombol kontak WhatsApp terpisah sesuai divisi:
  - **WhatsApp Divisi Web & Software:** Felich (+62 823-8652-6982)
  - **WhatsApp Divisi Servis & Hardware:** Sukron (+62 838-9449-6994)
* Opsi salin nomor telepon instan untuk fleksibilitas pengguna.

### 2.7 Command Palette & Aksesibilitas
* Shortcut global `Ctrl+K` atau `Cmd+K` membuka antarmuka pencarian cepat.
* Dukungan penuh `prefers-reduced-motion` untuk aksesibilitas visual.
* Standar kontras WCAG 2.1 AA dan touch targets minimal 44x44px.

---

## 3. Persyaratan Non-Fungsional (NFR)

1. **Responsivitas Multi-Device:**
   - 100% bebas horizontal scroll di semua resolusi: 320px (iPhone SE), 360px (Android compact), 375px–430px (iPhone standard/pro), 768px–1024px (iPad portrait/landscape), dan 1280px+ (desktop).
   - Menu drawer mobile terisolasi aman dengan `z-index: 120` dan tombol burger silang 'X' kontras tinggi.
2. **Kinerja & Core Web Vitals:**
   - Next.js 15 Static Site Generation (SSG) menghasilkan First Load JS minimal (~102 kB shared).
   - Cumulative Layout Shift (CLS) = `0.000`.
   - Waktu kompilasi produksi `< 4` detik.
3. **Infrastruktur & Keamanan:**
   - Siap dideploy pada Vercel Edge Runtime atau Cloudflare Pages.
   - Tanpa ketergantungan database eksternal berat; data terpusat pada file skrip TypeScript tipe-ketat (*zero runtime DB latency*).
