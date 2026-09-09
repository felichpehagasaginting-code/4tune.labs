# DESIGN SYSTEM SPECIFICATION

**Document Identifier:** `4TL-DS-2026-V2.0`  
**Brand:** 4tune.labs  
**Philosophy:** Editorial Warm Cream & Dark Charcoal with Precision Monospaced & Kinetic Accents.  
**Inspirations:** Stripe Press, Bell Labs Manuals, Braun Industrial Design, Linear.  

---

## 1. Prinsip Desain & Batasan Visual

1. **Editorial Craft & Technical Dignity:** Menggabungkan kehangatan kertas (*Warm Cream*) dengan ketegasan tinta (*Charcoal Ink*), menciptakan kesan studio rekayasa yang matang, dapat dipercaya, dan tidak berisik.
2. **Deterministic Color Grammar:**
   - **Amber Gold (`#E4A932`):** Mewakili energi kreasi, brand digit `4`, tombol aksi utama (*primary CTA*), dan aksen hover.
   - **Emerald Green (`#369966`):** Mewakili stabilitas sistem, brand kata `tune`, indikator telemetri/garansi, dan heksagon inti.
   - **Architectural Charcoal (`#424449` / `#20242B`):** Mewakili fondasi rekayasa, brand `.labs`, rumah arsitektural inti, dan teks utama.
3. **Invariable Brand Wordmark:**
   Teks `4tune.labs` di seluruh permukaan web wajib menggunakan komposisi 3-warna khas menggunakan komponen `<BrandText />` atau kelas `.brand-wordmark`. Tidak diperbolehkan menggunakan teks monokrom polos.
4. **Kinetic Ergonomics (Lenis + GSAP):** Seluruh animasi digerakkan oleh hardware-accelerated transforms (`y`, `scale`, `rotation`, `opacity`) dengan frame rate 60/120 FPS tanpa pergeseran layout (*CLS = 0*).
5. **Touch-First Accessibility:** Minimal area sentuh (*touch target*) 44x44px pada seluruh kontrol interaktif di perangkat mobile.

---

## 2. Palet Warna & Token Semantik

```
+-----------------------------------------------------------------------------------+
| CANVAS CREAM:       #F7F5EF  (--cream)       • Latar belakang utama landing page  |
| SURFACE ELEVATED:   #EFECE2  (--cream-2)     • Latar kartu sekunder & panel opsi  |
| FOREGROUND INK:     #20242B  (--ink)         • Warna teks headline & bodi utama   |
| MUTED INK:          #5C626D  (--ink-2)       • Warna teks deskripsi & metadata    |
| HAIRLINE BORDER:    rgba(32,36,43,0.12)      • Garis batas halus & separator      |
|                                                                                   |
| BRAND AMBER:        #E4A932  (--amber)       • Huruf '4', Tombol Primer, Aksen    |
| BRAND GREEN:        #369966  (--green)       • Huruf 'tune', Status, Garansi      |
| BRAND CHARCOAL:     #424449  (--house)       • Huruf '.labs', Prisma Rumah        |
| DRAWER CHARCOAL:    #23272D  (--charcoal)    • Latar drawer menu mobile & kontras |
+-----------------------------------------------------------------------------------+
```

### 2.1 CSS Variables / Semantic Tokens (`app/globals.css`)

```css
:root {
  --cream:      #F7F5EF;
  --cream-2:    #EFECE2;
  --ink:        #20242B;
  --ink-2:      #5C626D;
  --line:       rgba(32, 36, 43, 0.12);
  --amber:      #E4A932;
  --amber-deep: #C9932B;
  --green:      #369966;
  --green-deep: #2F7C4E;
  --charcoal:   #23272D;
  --charcoal-2: #2C313A;
  --paper:      #F4F2EA;
  --house:      #424449;

  --font-ui:    "Plus Jakarta Sans", system-ui, sans-serif;
  --font-serif: "Instrument Serif", Georgia, serif;
  --font-mono:  "JetBrains Mono", monospace;

  --radius:     14px;
  --nav-h:      72px;
  --container:  1200px;
  --pad:        clamp(16px, 4vw, 48px);
}
```

---

## 3. Brand Identity & Master Logo Vector Geometry

### 3.1 Konstruksi Vektor Master Logo (`#mark-full` / `public/icon.svg`)
Vektor logo 4tune.labs dibangun di atas kanvas `viewBox="0 0 240 240"` dengan 4 elemen struktural matematis:
1. **Loop Amber Ribbon (Atas-Kiri & Bawah-Kanan):** Path poligon presisi dengan `fill="#E4A932"`, membentuk simpul pita rekayasa kuadran diagonal.
2. **Loop Green Ribbon (Atas-Kanan & Bawah-Kiri):** Path poligon presisi dengan `fill="#369966"`, saling mengunci secara interleaved dengan pita amber.
3. **Prisma Rumah Arsitektural Tengah:** Path poligon simetris berdimensi kokoh dengan `fill="#424449"`, melambangkan studio laboratorium (*labs*).
4. **Heksagon Inti:** Path heksagon reguler di pusat rumah dengan `fill="#369966"`, melambangkan presisi sirkuit dan logika biner.

### 3.2 Aturan Wordmark `<BrandText />`
Komponen JSX standar untuk merender teks nama brand:
```tsx
export function BrandText({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-wordmark ${className}`}>
      <span className="w4">4</span>
      <span className="wt">tune</span>
      <span className="wl">.labs</span>
    </span>
  );
}
```

---

## 4. Tipografi & Skala Hirarki

| Elemen | Font Family | Weight | Ukuran (Clamp) | Karakteristik |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Plus Jakarta Sans | 800 | `clamp(1.85rem, 5.6vw, 4.4rem)` | Line-height 1.05 - 1.12, letter-spacing -0.035em |
| **Serif Accent** | Instrument Serif | 400 Italic | 1.08em relative | Garis bawah aksen gradien amber |
| **Section Title**| Plus Jakarta Sans | 800 | `clamp(2rem, 4.5vw, 3.2rem)` | Line-height 1.1, margin bawah terukur |
| **Body Text** | Plus Jakarta Sans | 400 / 500 | `clamp(0.925rem, 1.5vw, 1.125rem)` | Line-height 1.6, keterbacaan tinggi |
| **Eyebrows** | JetBrains Mono | 500 | 11px | Uppercase, tracking 0.2em, aksen wajik (`◆`) |
| **Badges/Code** | JetBrains Mono | 500 / 600 | 11px – 13px | Background surface, border halus |

---

## 5. Sistem Tata Letak & Breakpoint Responsif

| Breakpoint | Target Perangkat | Aturan Hero | Grid Modul | Navigasi |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop (> 1200px)** | Layar lebar, workstation | 2 Kolom berdampingan (1.05fr : 0.95fr) | Tim: 4 kolom, Bundles: 3 kolom | Full links + CTA button |
| **Laptop (1024px – 1200px)**| Layar laptop standar | 2 Kolom proporsional | Tim: 2 kolom, Bundles: 3 kolom | Full links + CTA button |
| **Tablet (768px – 1024px)** | iPad portrait & landscape | 2 Kolom landscape / Stack portrait seimbang | Tim: 2 kolom, Bundles: 2 kolom | Hamburger button + Drawer |
| **Mobile (560px – 768px)** | Smartphone standar/pro | 1 Kolom (Teks pertama, Kinetic Logo kedua) | Tim: 1 kolom, Bundles: 1 kolom | Hamburger button + Drawer |
| **Compact (< 560px)** | iPhone SE, layar sempit | 1 Kolom, CTA full-width, Fluid clamp | Estimator: tab vertikal, tombol 100% | Hamburger button + Drawer |

---

## 6. Stacking Context & Arsitektur Lapisan (Z-Index)

```css
--z-progress:   140; /* Reading progress indicator paling atas */
--z-burger:     130; /* Tombol hamburger 'X' selalu dapat diklik */
--z-site-nav:   120; /* Bar navigasi sticky header */
--z-drawer:     110; /* Drawer menu mobile overlay */
--z-modal:      200; /* Modal preview proyek dan dialog detail */
--z-command:    250; /* Command Palette (Ctrl+K) overlay */
--z-hero-inner:   2; /* Konten teks dan stage interaktif */
--z-ambient:      1; /* Ambient blur blobs di background */
```

Dukungan notch & safe area insets iPhone:
```css
body {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
.site-nav {
  padding-top: env(safe-area-inset-top);
}
.menu-drawer {
  padding-bottom: max(28px, env(safe-area-inset-bottom));
}
```
