# ENGINEERING & DEVELOPMENT WORKFLOW

**Document Identifier:** `4TL-DEV-2026-V2.0`  
**Target Audience:** 4tune.labs Core Builders & Contributors  
**Execution Standard:** Zero-Warning Compilation, Strict Typing, Deterministic Performance  
**Repository:** `https://github.com/felichpehagasaginting-code/4tune.labs`  

---

## 1. Prasyarat Lingkungan Pengembangan

* **Runtime:** Node.js `>= 20.0.0 (LTS)`
* **Package Manager:** `pnpm >= 9.0.0`
* **Sistem Operasi:** Windows 10/11, macOS, atau Linux (Ubuntu/Debian)
* **Testing Engine:** Python 3.10+ dengan Playwright (`playwright` & `chromium`)

---

## 2. Inisialisasi Proyek Lokal

```bash
# 1. Kloning repositori resmi
git clone https://github.com/felichpehagasaginting-code/4tune.labs.git
cd 4tune.labs

# 2. Pasang dependensi menggunakan pnpm
pnpm install

# 3. Jalankan server pengembangan lokal
pnpm dev
```
Akses `http://localhost:3000` pada peramban web Anda.

---

## 3. Matriks Skrip Proyek (`package.json`)

| Perintah | Deskripsi | Standar Target |
| :--- | :--- | :--- |
| `pnpm dev` | Menjalankan Next.js development server dengan Fast Refresh | HMR $< 100\text{ms}$ |
| `pnpm build` | Membangun bundle produksi teroptimasi & static pages | Kompilasi $< 4\text{s}$, 0 error |
| `pnpm start` | Menjalankan server produksi lokal | Siap menerima koneksi edge |
| `pnpm lint` | Menjalankan pemeriksaan linter ESLint | 0 warning / 0 error |

---

## 4. Standar Kode & Arsitektur Modul

1. **Strict TypeScript:**
   - Seluruh properti props dan return type fungsi harus bertipe eksplisit.
   - Dilarang keras menggunakan tipe `any` tanpa justifikasi ketat.
2. **Design Tokens & Styling:**
   - Seluruh warna, padding, dan ukuran font harus mengacu pada token yang terdefinisi di `:root` dalam [app/globals.css](file:///f:/Projects/4tune.labs/app/globals.css).
   - Penggunaan kelas Tailwind CSS v4 diselaraskan dengan variabel warna custom (`var(--cream)`, `var(--ink)`, `var(--amber)`, `var(--green)`).
3. **Komponen Brand Wordmark:**
   - Gunakan selalu `<BrandText />` saat menampilkan teks `4tune.labs` untuk menjaga konsistensi warna khas brand (`4` Amber, `tune` Green, `.labs` Charcoal).

---

## 5. Pengujian & Verifikasi Kualitas Multi-Device

Sebelum melakukan push atau perilisan versi baru, wajib menjalankan rangkaian pengujian Playwright multi-viewport:

### 5.1 Matriks Viewport Uji
1. **Ponsel Sempit (iPhone SE):** `320 x 568`
2. **Ponsel Ringkas (Samsung Galaxy):** `360 x 800`
3. **Ponsel Standar (iPhone 14 / Pixel):** `375 x 812` & `412 x 915`
4. **Tablet Portrait (iPad Mini):** `768 x 1024`
5. **Tablet Landscape (iPad Air/Pro):** `1024 x 768`
6. **Laptop & Desktop:** `1280 x 800` & `1440 x 900`

### 5.2 Kriteria Kelulusan Mutlak (Zero Tolerance)
* **Pencegahan Horizontal Scroll:** `document.documentElement.scrollWidth === document.documentElement.clientWidth` (100% false untuk `hasHorizontalScroll`).
* **Interaktivitas Drawer Mobile:** Tombol burger wajib dapat diklik untuk membuka DAN menutup drawer tanpa terhalang event interceptor.
* **Keyboard Navigation:** Menekan tombol `Escape` wajib menutup modal dan mobile drawer secara instan.
* **Build Check:** `pnpm build` wajib menghasilkan exit code 0 dengan prerender static routes sukses.

---

## 6. Alur Kerja Git & Standar Commit

Proyek mengadopsi standar **Conventional Commits**:
* `feat:` Penambahan fitur baru (misal: penambahan modul kalkulator, filter kendala).
* `fix:` Perbaikan bug (misal: perbaikan z-index drawer, penyesuaian scroll trigger).
* `style:` Penyesuaian tampilan, CSS tokens, fluid typography clamp, atau warna.
* `refactor:` Restrukturisasi kode tanpa mengubah fungsionalitas visual.
* `perf:` Peningkatan kinerja atau optimasi bundle size.
* `docs:` Pembaruan dokumentasi spesifikasi teknis dan panduan.
* `chore:` Pemeliharaan dependensi, konfigurasi build, atau skrip testing.
