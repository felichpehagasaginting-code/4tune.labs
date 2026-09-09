# SYSTEM ARCHITECTURE & TECHNICAL BLUEPRINT

**Document Identifier:** `4TL-ARCH-2026-V2.0`  
**System:** 4tune.labs Production Web Platform  
**Target Environment:** Vercel Edge Runtime / Cloudflare Pages + Node.js LTS  
**Framework Version:** Next.js 15.5+ (React 19, TypeScript 5.8, Server Components by Default)  
**Kinetic Engine:** GSAP 3.12+ (ScrollTrigger) & Lenis 1.1+ Smooth Momentum Scroll  
**Styling Framework:** Tailwind CSS v4.0 + Custom CSS Properties  

---

## 1. Architectural Philosophy

Arsitektur platform web **4tune.labs** mengadopsi prinsip **Hybrid Server-First Baseline with Reactive Kinetic Islands**:
1. **Server-First Delivery:** Struktur HTML dasar, font web self-hosted, metadata SEO, dan layout shell dikirim secara instan dari edge server untuk menjamin First Contentful Paint (FCP) yang sangat cepat.
2. **Hydration Terisolasi:** JavaScript sisi klien (*Client-side runtime*) dialokasikan secara modular pada pulau-pulau interaktif (*Kinetic Islands*):
   - **Hero Kinetic Island:** Animasi perakitan logo 4tune.labs, rotasi orbit inersial, dan breathing idle menggunakan GSAP.
   - **Diagnostic Island:** `SolutionFinder` (accordion kendala dengan swipeable horizontal filter pills).
   - **Calculation Island:** `CostEstimator` (kalkulator estimasi biaya hardware/software real-time dengan diskon hari Jum'at).
   - **Command Island:** `CommandPalette` (pencarian keyboard instan `Ctrl+K`).
3. **Zero Duplicate Asset Payload:** Logo vektor master didefinisikan satu kali sebagai simbol SVG (`#mark-full`) dan digunakan kembali di seluruh situs via `<use href="#mark-full" />`.

---

## 2. Component Boundaries & Hydration Flow

```
[Incoming HTTP Request]
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ RootLayout (Server Component - app/layout.tsx)         │
│ ├── Next.js Viewport & Metadata Configuration          │
│ ├── Font Variables (Plus Jakarta Sans & JetBrains Mono)│
│ └── SmoothScrollProvider ('use client' - Lenis Engine) │
│     │                                                  │
│     ▼                                                  │
│ ┌────────────────────────────────────────────────────┐ │
│ │ MasterPage (Client Assembly - app/page.tsx)        │ │
│ │ ├── Reading Progress Bar (Scroll-bound GSAP)       │ │
│ │ ├── SiteNav (Sticky Header with Blur Backdrop)     │ │
│ │ │   ├── Brand Wordmark (<BrandText />)             │ │
│ │ │   ├── Section Spy Active Links                   │ │
│ │ │   └── Burger Button (z-index: 130)               │ │
│ │ ├── Mobile Menu Drawer (z-index: 110, ESC Listener)│ │
│ │ ├── Hero Section (GSAP Timeline + Master SVG Mark) │ │
│ │ ├── Marquee Track (Infinite Hardware/Web Ribbons)  │ │
│ │ ├── Manifesto Section (Zero-Middleman Philosophy)  │ │
│ │ ├── SolutionFinder (Accordion + Filter Pills)      │ │
│ │ ├── Services Catalog (Hardware & Web Offerings)    │ │
│ │ ├── CuratedBundles (3-Tier Pre-Engineered Bundles) │ │
│ │ ├── CostEstimator (Interactive Price Calculator)   │ │
│ │ ├── Portfolio Works Showcase (Karya Terpilih)      │ │
│ │ ├── Principles Section (Cara Kerja Transparan)     │ │
│ │ ├── LabNotes (Technical Case Studies)              │ │
│ │ ├── Team Section (4 Student Engineers)             │ │
│ │ ├── Dual-Channel CTA (Web & Hardware WhatsApp)     │ │
│ │ ├── Footer (4-Column Nav + Brand & Copyright)      │ │
│ │ └── Shared SVG Symbol Repository (#mark-full)      │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ [Global Interactive Overlays]                          │
│ ├── Project Detail Modal (Reactive Portal)             │
│ └── CommandPalette (Ctrl+K Keyboard Interface)         │
└────────────────────────────────────────────────────────┘
```

---

## 3. Directory Structure

```
4tune.labs/
├── app/
│   ├── api/
│   │   └── inquiry/
│   │       └── route.ts               # Edge API Route: Konsultasi Validation & Dispatch
│   ├── globals.css                    # Design tokens, tema editorial, & responsive media queries
│   ├── layout.tsx                     # Root Layout: Viewport, font injection, SEO OpenGraph
│   ├── page.tsx                       # Master Page Assembly & interaksi GSAP
│   └── favicon.ico                    # Favicon fallback
├── components/
│   ├── interactive/
│   │   ├── command-palette.client.tsx # Modal navigasi cepat Ctrl+K
│   │   └── cost-estimator.client.tsx  # Kalkulator estimasi biaya hardware & software
│   └── modules/
│       ├── curated-bundles.tsx        # Modul kartu 3 paket pilihan terkurasi
│       ├── lab-notes.tsx              # Modul catatan laboratorium teknis
│       └── solution-finder.tsx        # Modul pencari solusi kendala berbasis gejala
├── data/
│   ├── bundles-data.ts                # Data paket pilihan siap pakai
│   ├── pricing-matrix.ts              # Matriks harga SSD, RAM, servis hardware & website
│   ├── solutions-data.ts              # Data gejala kendala, diagnosa, dan solusi
│   └── team-data.ts                   # Data profil 4 engineer dan portofolio
├── lib/
│   └── utils.ts                       # Helper classnames & sanitasi string
├── providers/
│   └── smooth-scroll.client.tsx       # Lenis smooth scroll provider + ScrollTrigger sync
├── public/
│   └── icon.svg                       # Vektor favicon master 4tune.labs
├── ARCHITECTURE.md                    # Dokumen cetak biru arsitektur sistem
├── CONTENT_SPEC.md                    # Spesifikasi konten dan copywriting
├── DESIGN_SYSTEM.md                   # Dokumen spesifikasi sistem desain
├── DEVELOPMENT.md                     # Panduan alur kerja rekayasa dan testing
├── PRD.md                             # Product Requirement Document
├── UIUX.md                            # Spesifikasi antarmuka dan interaksi UX
├── README.md                          # Dokumentasi utama repositori GitHub
├── next.config.ts                     # Konfigurasi Next.js (optimasi image & compiler)
├── package.json                       # Konfigurasi dependensi dan skrip proyek
└── tsconfig.json                      # Konfigurasi compiler TypeScript (strict mode)
```

---

## 4. Modul Interaktif & Pola Data

### 4.1 CostEstimator Engine (`components/interactive/cost-estimator.client.tsx`)
- **State Management:** Memelihara state tab (`hardware` vs `software`), opsi terpilih (`selectedSsd`, `selectedRam`, `selectedServices`, `selectedWebType`, `selectedAddons`), dan status promo (`isFridayPromo`).
- **Deteksi Hari Jum'at Otomatis:** Menggunakan `new Date().getDay() === 5` pada client mount untuk mengaktifkan diskon 10% secara cerdas.
- **WhatsApp Generator:** Membentuk URL WhatsApp `https://wa.me/6283894496994?text=...` dengan teks itemized yang memuat seluruh opsi yang dipilih.

### 4.2 SolutionFinder Engine (`components/modules/solution-finder.tsx`)
- **State Management:** Kategori aktif (`all`, `hardware`, `business`, `student`) dan ID item yang sedang terbuka (`expandedId`).
- **GSAP Sync:** Memanggil `ScrollTrigger.refresh()` dengan jeda 120ms setelah ekspansi accordion agar posisi trigger scroll halaman tetap sinkron dan tidak melompat.

### 4.3 Smooth Momentum Scroll Provider (`providers/smooth-scroll.client.tsx`)
- Menginisialisasi instance Lenis dengan parameter inersia halus:
  ```ts
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
  });
  ```
- Mengikat update scroll ke ticker GSAP:
  ```ts
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  ```

---

## 5. Strategi Deployment & Performa

* **Static Site Generation (SSG):** Seluruh halaman utama di-prerender saat proses build (`pnpm build`).
* **Bundle Budget:** First Load JS total hanya ~179 kB (termasuk GSAP dan Lenis).
* **Caching & Edge CDN:** Aset statis pada `/public` disajikan dengan header `Cache-Control: public, max-age=31536000, immutable`.
