# UI/UX ARCHITECTURE & INTERACTION DESIGN SPECIFICATION

**Document Identifier:** `4TL-UIUX-2026-V2.0`  
**System:** 4tune.labs Official Digital Surface  
**Discipline:** Interaction Design, User Experience Architecture & Kinetic Ergonomics  
**Kinetic Engine:** GSAP 3.12+ (ScrollTrigger) & Lenis Smooth Momentum Scroll  
**Compliance Target:** WCAG 2.1 Level AA / Zero Cognitive Overload  

---

## 1. UX Rationale & Alur Kognitif

4tune.labs melayani audiens yang mengutamakan kecepatan, kepastian solusi, dan kejujuran teknis: mahasiswa yang dikejar tenggat tugas akhir, pelaku usaha UMKM lokal, dan kreator/gamer yang membutuhkan performa hardware prima.

### 1.1 Model Mental Pengguna
* **Immediate Clarity (Kejelasan Langsung):** Begitu membuka halaman di ponsel atau laptop, pengunjung langsung disajikan proposisi nilai yang tegas: *"Dari kode web hingga hardware, beres tanpa perantara."*
* **Low-Friction Action:** Estimasi biaya dapat dihitung langsung tanpa harus mengisi formulir panjang atau registrasi akun.
* **Direct Human Touch:** Tombol WhatsApp langsung mengarahkan klien ke engineer spesialis yang tepat (Felich untuk Web/AI, Sukron untuk Hardware).

---

## 2. Alur Pengguna Utama (*User Journeys*)

### 2.1 Journey A: Mahasiswa dengan Laptop Panas / Lemot (Tugas Akhir)
1. **Entry:** Membuka web dari tautan media sosial atau rekomendasi teman di smartphone.
2. **First Fold:** Langsung membaca headline dan badge *"Ramah Mahasiswa & UMKM"*.
3. **Problem Matching:** Menelusuri bagian *Solusi Kendala*, memilih filter pill *"Kendala Laptop & Gadget"*. Menemukan gejala: *"Laptop cepat panas, kipas bising, dan suka mati tiba-tiba saat Zoom."*
4. **Diagnosis & Solution:** Membaca diagnosa pasta kering dan debu radiator, melihat estimasi pengerjaan 1–3 jam bisa ditunggu.
5. **Cost Verification:** Menggulir ke *Kalkulator Biaya*, memilih opsi Deep Cleaning (+ thermal paste) dan SSD 512GB, melihat diskon otomatis hari Jum'at.
6. **Conversion:** Mengetuk tombol *Mulai Percakapan* atau *Jadwalkan Deep Cleaning*, membawa teks detail opsi ke WhatsApp Sukron.

### 2.2 Journey B: Pemilik Usaha / UMKM Go-Online
1. **Entry:** Mengakses web melalui laptop atau tablet.
2. **Evaluation:** Melihat bagian *Paket Pilihan*, menemukan kartu **Paket UMKM Go-Online** (Rp 450.000 – Rp 850.000).
3. **Feature Inspection:** Memeriksa checklist: Desain responsif, domain & hosting, integrasi WA & Google Maps, SEO lokal.
4. **Validation:** Mengamati showcase *Karya Terpilih* dan profil tim untuk memverifikasi track record rekayasa.
5. **Conversion:** Mengklik tombol *Konsultasikan Usaha via WA*, langsung terhubung dengan Felich untuk diskusi desain.

### 2.3 Journey C: Power User / Keyboard-First Navigator
1. **Entry:** Menekan tombol `Ctrl+K` atau `Cmd+K` pada desktop.
2. **Fuzzy Search:** Mengetik `Kalkulator` atau `Tim`, keyboard navigasi mengarahkan langsung via `lenis.scrollTo` secara mulus ke section yang dituju.
3. **Direct Contact:** Menekan tombol salin nomor telepon instan untuk disimpan ke kontak.

---

## 3. Desain Tata Letak & Wireframe Multi-Device

### 3.1 Mobile Layout (< 768px)
```
┌───────────────────────────────────────┐
│ [4tune.labs]                   [ = ]  │  <-- Sticky Nav (z: 120, touch: 44px)
├───────────────────────────────────────┤
│                                       │
│ ◆ STUDIO REKAYASA & TECH SUPPORT      │
│                                       │
│ Dari kode web                         │
│ hingga hardware,                      │
│ beres tanpa perantara.                │
│                                       │
│ 4tune.labs dijalankan langsung oleh   │
│ empat mahasiswa rekayasa...           │
│                                       │
│ ┌───────────────────────────────────┐ │
│ │ Mulai Percakapan ->               │ │  <-- Full-width Primary CTA
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ Lihat Karya Kami                  │ │  <-- Full-width Secondary CTA
│ └───────────────────────────────────┘ │
│                                       │
│ • Dibalas < 24 jam                    │
│ • Diagnosa transparan & bergaransi    │
│ • Ramah Mahasiswa & UMKM              │
│                                       │
│              ┌─────────┐              │
│              │ Kinetic │              │  <-- Sized gracefully below text
│              │  Logo   │              │      (min 180px, 50vw)
│              └─────────┘              │
│                                       │
├───────────────────────────────────────┤
│ [ MARQUEE: SERVIS LAPTOP • SSD RAM ]  │
├───────────────────────────────────────┤
│ SOLUSI KENDALA (Horizontal Pills ->)  │
│ [Semua] [Laptop & Gadget] [UMKM] ...  │
│ ┌───────────────────────────────────┐ │
│ │ 01. "Laptop cepat panas..."   [v] │ │
│ └───────────────────────────────────┘ │
└───────────────────────────────────────┘
```

### 3.2 Tablet & Desktop Layout (>= 768px)
- **Desktop:** Layout 2-kolom lebar (1.05fr : 0.95fr). Kiri teks editorial dan tombol aksi magnetik, kanan kinetic stage dengan orbit loop interaktif.
- **Tablet (768px - 1024px):** Layout 2-kolom terukur (1.15fr : 0.85fr) pada landscape, dan susunan vertikal terstruktur pada portrait.

---

## 4. Spesifikasi Drawer Navigasi Mobile

* **Trigger:** Tombol burger 44x44px di pojok kanan atas.
* **Status Terbuka (`body.menu-open`):**
  - Garis hamburger berputar membentuk tanda silang 'X' dengan warna putih terang (`#F7F5EF`).
  - Bar navigasi menyatu dengan warna gelap drawer (`background: rgba(35,39,45,0.96)`).
  - Tautan navigasi bernomor `01` hingga `07` dianimasikan bertahap (*staggered fade-in*).
  - Tombol aksi *Chat WhatsApp* tersedia di bagian bawah drawer footer.
* **Dismiss Mechanism:**
  - Mengetuk tombol eksplisit **[✕ Tutup]** di sudut kanan atas drawer.
  - Mengetuk salah satu tautan menu (scroll mulus ke section terkait dan menutup drawer seketika).
  - Menekan tombol keyboard `Escape`.
  - Pembersihan deterministik: sinkronisasi status dengan `lenis.start()` dan penghapusan class `menu-open` seketika.

---

## 5. Ergonomi Sentuh & Standar Aksesibilitas (WCAG 2.1 AA)

1. **Touch Targets:** Seluruh tombol CTA, radio card, pill filter, dan link navigasi memiliki area sentuh minimum $\ge 44 \times 44\text{ px}$.
2. **Rasio Kontras Warna:**
   - Teks utama (`#20242B`) di atas kanvas cream (`#F7F5EF`): **13.5 : 1** (Melampaui standar AAA 7:1).
   - Teks tombol amber (`#E4A932`) dengan teks dark ink: **8.9 : 1** (Melampaui standar AA 4.5:1).
3. **Peredaman Animasi (`prefers-reduced-motion`):**
   Saat pengguna mengaktifkan mode reduced-motion pada sistem operasinya:
   - Durasi animasi diatur ke `0.01ms`.
   - Headline langsung tampil tanpa translasi sumbu Y.
   - Marquee animasi track dihentikan (*static presentation*).

---

## 6. Kalibrasi UX & Fitur Interaktif Terbaru (Update Sesi Terkini)

1. **Mobile Bottom Sheet Biaya Terpadu (`vaul`):**
   - Menghilangkan friksi lompatan viewport (*scroll-jump*) saat pengguna mobile menekan *"Rincian"*.
   - Sheet dapat digulir dan ditarik (*swipe-down to dismiss*), terkoordinasi dengan scroll engine Lenis (`lenis.stop()` & `data-lenis-prevent="true"`).
2. **Visualisasi Harga Coret (*Strike-Through Pricing*):**
   - Menampilkan harga normal dicoret berdampingan dengan harga diskon 10% promo Jum'at pada seluruh breakpoint (desktop, sticky bar mobile, dan bottom sheet).
3. **Ergonomi Slider Sebelum vs Sesudah Servis:**
   - Penerapan `touch-action: pan-y` pada `.ba-stage` untuk mencegah benturan gestur scroll vertikal di smartphone.
   - Dukungan sentuhan tap instan (*tap-to-position*) langsung pada kanvas komparasi.
4. **Basis Fisik Lab & Peta Vektor Interaktif OpenFreeMap:**
   - Penegasan titik drop-off fisik di **Asrama Sarana Citra Widya Edukasi Gedung 2 Lt. 3 Kamar 304**.
   - Peta interaktif live ditenagai **MapLibre GL JS** dengan Web Worker lokal same-origin (`/public/maplibre/`), fallback otomatis raster OSM, dan kontrol kamera instan *"Pusatkan ke Kamar 304"*.
   - Tab switcher instan antara Peta Vektor dan Skema Radius Konsentris.
5. **Kebijakan Antar-Jemput Transparan (Realistis):**
   - **Gratis (Rp 0):** Eksklusif untuk jarak jalan kaki (*walking distance*) di lingkungan Asrama Mahasiswa SCWE dan kampus utama Politeknik CWE.
   - **Berbayar:** Dikenakan ongkir bensin terjangkau proporsional sesuai jarak tempuh untuk kosan luar atau area sekitarnya (dengan opsi COD / ojol).
6. **Mobile Reader Full-Screen Lab Notes:**
   - Tampilan modal artikel berubah menjadi full-screen sheet pada layar $\le 640\text{px}$ dengan sticky header (`env(safe-area-inset-top)`).
7. **Diagnostic Quick Symptom Chips:**
   - Tag gejala populer di bawah input pencarian kendala yang langsung meng-auto-fill query dan membuka accordion jawaban solusi secara otomatis.

