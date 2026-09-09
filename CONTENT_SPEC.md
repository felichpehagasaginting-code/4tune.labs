# CONTENT ARCHITECTURE & COPYWRITING SPECIFICATION

**Document Identifier:** `4TL-CONTENT-2026-V2.0`  
**Scope:** Teks Resmi Landing Page, Struktur Katalog Layanan, dan Dataset Dinamis  
**Tone of Voice:** Jujur, transparan, bersahabat, percaya diri, dan berbobot teknis tinggi. Bebas dari jargon agensi yang membingungkan.  

---

## 1. Navigasi Global & Identitas Brand

* **Brand Wordmark:** `4tune.labs` (menggunakan komponen `<BrandText />` dengan warna `4` Amber, `tune` Green, `.labs` Charcoal).
* **Navigasi Utama:**
  - `Solusi` (`#solusi-kendala`)
  - `Layanan` (`#layanan`)
  - `Paket` (`#paket-pilihan`)
  - `Kalkulator` (`#kalkulator-biaya`)
  - `Karya` (`#karya`)
  - `Lab Notes` (`#lab-notes`)
  - `Tim` (`#tim`)
* **Tombol Aksi Header:** `Mulai Ngobrol` (mengarahkan langsung ke WhatsApp).
* **Drawer Navigasi Mobile:**
  - `01. Solusi Kendala`
  - `02. Layanan`
  - `03. Paket Pilihan`
  - `04. Kalkulator Biaya`
  - `05. Karya Terpilih`
  - `06. Lab Notes`
  - `07. Tim Kami`
  - Tombol: `Chat WhatsApp`

---

## 2. Hero Section

* **Eyebrow:** `◆ STUDIO REKAYASA & TECH SUPPORT`
* **Display Headline (H1):**
  > **Dari kode web**  
  > **hingga *hardware*,**  
  > **beres tanpa perantara.**
* **Sub-Headline:**
  > **4tune.labs** dijalankan langsung oleh empat mahasiswa rekayasa. Menggabungkan pembuatan website modern & solusi AI dengan layanan servis hardware, upgrade performa laptop/PC, dan elektronika terapan. Anda ngobrol langsung dengan orang yang mengeksekusinya — tanpa perantara, transparan, dan ramah kantong.
* **Tombol Aksi Hero:**
  - *Tombol Primer:* `Mulai Percakapan ->` (WhatsApp)
  - *Tombol Sekunder:* `Lihat Karya Kami` (`#karya`)
* **Trust Badges:**
  - `• Dibalas < 24 jam`
  - `• Diagnosa transparan & bergaransi`
  - `• Ramah Mahasiswa & UMKM`
* **Marquee Infinite Strip:**
  - `SERVIS LAPTOP & KOMPUTER • UPGRADE SSD & RAM • APLIKASI WEB & AI • ELEKTRONIKA & IOT • PERAWATAN BERGARANSI • DISKON JUM'AT BERKAH`

---

## 3. Manifesto Section

* **Kutipan Utama:**
  > *"Kami percaya teknologi tidak seharusnya dibebani oleh perantara yang hanya pandai berjanji. Di 4tune.labs, insinyur perangkat lunak dan teknisi perangkat keras duduk di meja yang sama — memastikan kode yang cepat berjalan di atas mesin yang sehat."*

---

## 4. Solusi Kendala (SolutionFinder Dataset)

| Kategori | Kutipan Gejala Masalah | Diagnosa Teknis | Solusi 4tune.labs |
| :--- | :--- | :--- | :--- |
| **Hardware** | *"Laptop cepat panas, kipas bising, dan suka mati tiba-tiba saat dipakai Zoom atau ngerjain tugas."* | Debu pekat menutup saluran pembuangan radiator dan pasta pendingin bawaan sudah mengering menjadi kerak. | Deep cleaning menyeluruh pada baling-baling kipas, pembersihan heatsink, dan pelumasan ulang dengan pasta termal premium berkemampuan hantar panas tinggi. |
| **Hardware** | *"Menyalakan laptop butuh waktu 3–5 menit, dan buka dokumen Word / Excel sering muncul tulisan 'Not Responding'."* | Hard disk mekanik konvensional (HDD) telah mengalami penurunan kecepatan baca-tulis atau bottleneck memori RAM. | Migrasi ke SSD NVMe/SATA berkecepatan tinggi (3–5x lebih kencang) dan penambahan RAM minimal 8GB/16GB DDR4. |
| **Business / UMKM** | *"Usaha kami butuh website profesional yang cepat, bisa dibuka di HP, dan ada tombol langsung pesan ke WhatsApp."* | Website berbasis template berat sering lemot dibuka dan kurang dioptimalkan untuk perangkat seluler. | Pembuatan landing page kustom berbasis Next.js berkecepatan tinggi, SEO lokal terpasang, dan integrasi WhatsApp instan. |
| **Student** | *"Tugas akhir atau skripsi butuh prototipe web interaktif atau integrasi perangkat IoT/sensor tapi bingung mulainya."* | Keterbatasan waktu integrasi antara mikrokontroler (ESP32/Arduino) dengan dashboard antarmuka web. | Konsultasi arsitektur terapan, perakitan sirkuit sensor, dan pembuatan dashboard visualisasi data real-time. |

---

## 5. Paket Pilihan Terkurasi (CuratedBundles Dataset)

1. **Paket Mahasiswa Fresh & Kencang (Rp 120.000 – Rp 170.000):**
   - Layanan servis komprehensif tanpa ganti sparepart.
   - Pembersihan debu kipas & saluran radiator total.
   - Penggantian pasta thermal pendingin kualitas tinggi.
   - Pembersihan file sampah (cache/temp) & pemindaian malware.
   - Pembaruan driver & optimasi startup OS.
   - *Teknisi:* Sukron & Zul (Divisi Hardware).
2. **Paket UMKM Go-Online (Rp 450.000 – Rp 850.000):**
   - Solusi digital siap pakai bagi pemilik usaha dan toko lokal.
   - Desain landing page modern 1 halaman responsif.
   - Tombol klik langsung ke WhatsApp bisnis & peta Google Maps.
   - Pendaftaran domain kustom (.com/.id) & hosting cepat gratis 1 tahun.
   - Optimasi SEO agar mudah dicari di pencarian Google.
   - *Engineer:* Felich (Divisi Web & AI).
3. **Paket Kreator & AI Ready (Rp 1.200.000 – Rp 2.500.000):**
   - Solusi perangkat keras dan perangkat lunak untuk performa tinggi.
   - Rakit PC workstation kustom atau upgrade maksimal laptop.
   - Integrasi asisten AI/LLM streaming interaktif.
   - Setup lingkungan coding modern & pipeline otomasi.
   - Garansi pengerjaan dan pendampingan 3 bulan.
   - *Tim:* Felich, Sukron, Aris.

---

## 6. Kalkulator Biaya (Pricing Matrix Dataset)

### 6.1 Hardware & Servis PC
- **Upgrade SSD (NVMe M.2):**
  - *Tanpa SSD Baru:* Rp 0
  - *PCIe Gen 3 (~2.400 - 3.500 MB/s - Laptop Standar & Kuliah):*
    - 256 GB: Rp 320.000 – Rp 420.000
    - 512 GB: Rp 580.000 – Rp 720.000
    - 1 TB: Rp 1.050.000 – Rp 1.280.000
  - *PCIe Gen 4 (~5.000 - 7.400 MB/s - Gaming & High-End Workstation):*
    - 512 GB: Rp 750.000 – Rp 950.000
    - 1 TB: Rp 1.350.000 – Rp 1.680.000
    - 2 TB: Rp 2.450.000 – Rp 2.950.000
- **Ekspansi RAM (SODIMM / DIMM):**
  - *RAM Bawaan Cukup:* Rp 0
  - *DDR4 (3200 MHz - Laptop/PC Standar):*
    - 8 GB DDR4: Rp 320.000 – Rp 420.000
    - 16 GB DDR4: Rp 580.000 – Rp 750.000
    - 32 GB DDR4 (Dual-Channel Kit 2x16GB): Rp 1.150.000 – Rp 1.450.000
  - *DDR5 (4800 / 5600 MHz - Laptop/PC Modern):*
    - 8 GB DDR5: Rp 480.000 – Rp 620.000
    - 16 GB DDR5: Rp 850.000 – Rp 1.150.000
    - 32 GB DDR5 (Dual-Channel Kit 2x16GB): Rp 1.650.000 – Rp 2.150.000
- **Add-on Perawatan & Servis:**
  - Deep Cleaning & Ganti Thermal Paste Premium: +Rp 80.000 (Sangat Dianjurkan)
  - Instalasi Bersih OS (Windows 11 / Linux) + Driver Teruji: +Rp 60.000
  - Backup & Penyelamatan Data Partisi: +Rp 50.000
  - Penggantian Baterai Laptop OEM/Original: +Rp 250.000
- **Promo Hari Jum'at:** Diskon 10% untuk seluruh pengerjaan servis hardware.

### 6.2 Pembuatan Website & Solusi AI
- **Tipe Proyek:**
  - Landing Page UMKM / Produk: Rp 450.000 – Rp 850.000
  - Portofolio Interaktif / Tugas Akhir: Rp 350.000 – Rp 650.000
  - Website Multi-Page & Dashboard Usaha: Rp 900.000 – Rp 1.800.000
  - Web App Custom + Integrasi Agen AI: Rp 1.500.000 – Rp 3.000.000
- **Add-on Tambahan:**
  - Optimasi SEO Lokal & Google Maps: +Rp 100.000
  - Integrasi CMS Panel Mandiri: +Rp 250.000
  - Desain Interaktif & Animasi Khusus: +Rp 150.000

---

## 7. Tim Rekayasa (Team Dataset)

1. **Felich** — *Full-Stack & AI Engineer*  
   Penerjemah ide menjadi arsitektur web modern yang interaktif, cepat, dan cerdas. Pengembang utama di balik platform Felys (AI Companion), Nettas PB AI (Photobooth Cross-Platform), dan sistem pembelajaran TRPL 2026.
2. **Zulkifli ("Mamad")** — *Electronics & Repair Specialist*  
   Spesialis perbaikan jalur motherboard, mikrosoldering, diagnosa arus pendek perangkat keras, dan reparasi modul gadget serta power supply.
3. **Sukron** — *PC Hardware & OS Specialist*  
   Ahli perakitan PC, diagnosa pendinginan sistem, migrasi penyimpanan berkecepatan tinggi, dan optimasi kernel sistem operasi untuk kestabilan jangka panjang.
4. **Aris** — *Embedded Systems & IoT Engineer*  
   Insinyur elektronika cerdas yang menghubungkan mikrokontroler (ESP32/STM32), jaringan mikrotik, dan sensor fisik dengan sistem perangkat lunak terpusat.

---

## 8. Kontak & Footer

* **Headline Kontak:** *"Punya rencana proyek atau perangkat yang perlu dibereskan?"*
* **Deskripsi:** Ceritakan kebutuhan Anda dengan bahasa apa pun — santai atau teknis. Dari pembuatan website portofolio/UMKM dan aplikasi berbasis AI, hingga servis laptop lemot, upgrade hardware, dan perbaikan perangkat. Konsultasi pertama santai, transparan, dan gratis tanpa komitmen.
* **Saluran Komunikasi:**
  - WhatsApp Web: `+62 823-8652-6982` (Felich)
  - WhatsApp Servis: `+62 838-9449-6994` (Sukron)
  - Email: `4tune.labs@gmail.com`
* **Hak Cipta:** `© 2026 4tune.labs. Seluruh hak cipta. Dibuat dengan standar kejujuran, transparansi, dan craft teknis yang tinggi.`
