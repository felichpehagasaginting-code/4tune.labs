export interface BundleItem {
  id: string;
  badge: string;
  badgeType: "hot" | "popular" | "value" | "recommended";
  title: string;
  targetUser: string;
  priceDisplay: string;
  priceNote: string;
  description: string;
  features: string[];
  ctaText: string;
  waLink: string;
  leadPerson: string;
}

export const BUNDLES_DATA: BundleItem[] = [
  {
    id: "bundle-skripsi",
    badge: "Paling Diminati Mahasiswa",
    badgeType: "hot",
    title: "Paket Skripsi Anti-Panik",
    targetUser: "Mahasiswa tingkat akhir yang butuh laptop ngebut, adem, dan data tersimpan aman.",
    priceDisplay: "Mulai Rp 980.000",
    priceNote: "Sudah termasuk unit SSD 512GB NVMe baru & jasa lengkap",
    description: "Kombinasi lengkap agar laptop Anda tidak lag saat membuka ratusan halaman dokumen, olah data SPSS/Python, atau meeting daring bersama dosen pembimbing.",
    features: [
      "Upgrade SSD 512 GB NVMe Kecepatan Tinggi",
      "Penyelamatan & Migrasi Backup Data Skripsi Aman",
      "Deep Cleaning Kipas & Ganti Pasta Thermal Pendingin",
      "Instalasi Software Riset & Produktivitas (Office/PDF)",
      "Garansi Sparepart & Pendampingan Pengerjaan",
    ],
    ctaText: "Ambil Paket Skripsi",
    waLink: "https://wa.me/6283894496994?text=Hai%20Sukron%2C%20saya%20tertarik%20dengan%20Paket%20Skripsi%20Anti-Panik%20untuk%20laptop%20saya.",
    leadPerson: "Sukron (Cuklon) — Divisi Hardware",
  },
  {
    id: "bundle-refresh",
    badge: "Solusi Cepat 1 Hari",
    badgeType: "value",
    title: "Paket Laptop Segar Kembali",
    targetUser: "Laptop yang mulai lemot, kipas berdengung, dan berdebu setelah pemakaian bertahun-tahun.",
    priceDisplay: "Rp 120.000 – 170.000",
    priceNote: "Layanan servis komprehensif tanpa ganti sparepart",
    description: "Perawatan fisik dan pembersihan berkala untuk mengembalikan suhu kerja laptop tetap dingin dan performa sistem operasi kembali responsif seperti saat baru dibeli.",
    features: [
      "Pembersihan Debu Kipas & Saluran Radiator Total",
      "Penggantian Pasta Thermal Pendingin Kualitas Tinggi",
      "Pembersihan File Sampah (Cache/Temp) & Virus",
      "Pembaruan Driver & Optimasi Startup Windows",
      "Diskon Ekstra Spesial Setiap Hari Jum'at",
    ],
    ctaText: "Segarkan Laptop Sekarang",
    waLink: "https://wa.me/6283894496994?text=Hai%20Sukron%2C%20saya%20mau%20ambil%20Paket%20Laptop%20Segar%20Kembali%20(Deep%20Cleaning%20%2B%20Repasta).",
    leadPerson: "Sukron & Zul — Divisi Hardware",
  },
  {
    id: "bundle-umkm",
    badge: "Favorit Usaha & Toko",
    badgeType: "popular",
    title: "Paket UMKM Go-Online",
    targetUser: "Pemilik usaha, kedai, jasa, atau brand lokal yang butuh kehadiran digital terpercaya.",
    priceDisplay: "Mulai Rp 599.000",
    priceNote: "Investasi sekali bayar + include domain 1 tahun",
    description: "Website satu halaman elegan yang siap tampil di link bio media sosial Anda, memuat foto produk berkualitas, profil bisnis, dan tombol pesan langsung ke WhatsApp admin.",
    features: [
      "Landing Page 1 Halaman Responsif (Super Cepat di HP)",
      "Katalog Produk / Menu Jasa dengan Format Jernih",
      "Tombol Order WhatsApp Otomatis dengan Format Teks",
      "Bantuan Pendaftaran Titik Lokasi di Google Maps",
      "Gratis Setup Domain Custom .com / .id selama 1 Tahun",
    ],
    ctaText: "Mulai Paket UMKM",
    waLink: "https://wa.me/6282386526982?text=Hai%20Felich%2C%20saya%20ingin%20konsultasi%20Paket%20UMKM%20Go-Online%20untuk%20usaha%20saya.",
    leadPerson: "Felich & Dika — Divisi Web & Design",
  },
  {
    id: "bundle-portfolio",
    badge: "Standar Portofolio Kerja",
    badgeType: "recommended",
    title: "Paket Portofolio Personal",
    targetUser: "Mahasiswa atau profesional muda yang ingin portofolio unik dan kredibel untuk karir.",
    priceDisplay: "Rp 350.000 – 600.000",
    priceNote: "Tanpa biaya server bulanan (Deploy Vercel)",
    description: "Website personal bergaya editorial modern yang memajang riwayat proyek, skill, dan kontak Anda secara terstruktur, siap dilampirkan pada CV atau LinkedIn.",
    features: [
      "Desain Visual Khusus (Bukan Template Pasaran)",
      "Galeri Karya dengan Ilustrasi & Tautan Aplikasi",
      "Optimasi Ringan & Cepat Dibuka di Smartphone Rekruter",
      "Deploy Server Tanpa Biaya Langganan Bulanan",
      "Panduan Update Konten Sederhana Mandiri",
    ],
    ctaText: "Pesan Portofolio Personal",
    waLink: "https://wa.me/6282386526982?text=Hai%20Felich%2C%20saya%20mau%20bikin%20website%20portofolio%20personal%20untuk%20persiapan%20kerja.",
    leadPerson: "Felich & Dika — Divisi Web & Design",
  },
];
