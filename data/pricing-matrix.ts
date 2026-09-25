export interface PricingOption {
  id: string;
  label: string;
  description?: string;
  generation?: "gen3" | "gen4" | "ddr4" | "ddr5" | "all";
  speed?: string;
  minPrice: number;
  maxPrice: number;
}

export interface HardwarePricingCategory {
  title: string;
  subtitle: string;
  options: PricingOption[];
}

export const HARDWARE_PRICING = {
  ssd: {
    title: "Upgrade Penyimpanan (SSD)",
    subtitle: "Pilih kapasitas NVMe. Estimasi sudah ALL-IN termasuk unit baru bergaransi + jasa pasang & uji performa",
    options: [
      {
        id: "ssd-none",
        label: "Tidak perlu SSD baru",
        generation: "all",
        minPrice: 0,
        maxPrice: 0,
      },
      // PCIe Gen 3 (Laptop & PC Mainstream)
      {
        id: "ssd-256-gen3",
        label: "SSD 256 GB NVMe (PCIe Gen 3)",
        description: "Kecepatan ~2.400 MB/s • Pilihan hemat untuk OS & software kuliah (Team MP33, Lexar NM620, V-GeN)",
        generation: "gen3",
        speed: "~2.400 MB/s",
        minPrice: 450000,
        maxPrice: 750000,
      },
      {
        id: "ssd-512-gen3",
        label: "SSD 512 GB NVMe (PCIe Gen 3)",
        description: "Kecepatan ~3.500 MB/s • Best value laptop kuliah & kerja (Crucial P3, Team MP33 Pro, ADATA)",
        generation: "gen3",
        speed: "~3.500 MB/s",
        minPrice: 850000,
        maxPrice: 1350000,
      },
      {
        id: "ssd-1tb-gen3",
        label: "SSD 1 TB NVMe (PCIe Gen 3)",
        description: "Kecepatan ~3.500 MB/s • Kapasitas besar file riset & multi-OS (Lexar NM620, Crucial P3, Team)",
        generation: "gen3",
        speed: "~3.500 MB/s",
        minPrice: 1500000,
        maxPrice: 2300000,
      },
      // PCIe Gen 4 (Laptop Modern, Gaming, & Workstation)
      {
        id: "ssd-512-gen4",
        label: "SSD 512 GB NVMe (PCIe Gen 4)",
        description: "Kecepatan ~5.000 MB/s • Respons kilat gaming & PC modern (Kingston NV2/NV3, Crucial P3 Plus)",
        generation: "gen4",
        speed: "~5.000 MB/s",
        minPrice: 1150000,
        maxPrice: 1650000,
      },
      {
        id: "ssd-1tb-gen4",
        label: "SSD 1 TB NVMe (PCIe Gen 4)",
        description: "Kecepatan ~5.000 - 7.400 MB/s • Video editing 4K & game berat (Kingston KC3000, Lexar NM790, WD Black)",
        generation: "gen4",
        speed: "~5.000 - 7.400 MB/s",
        minPrice: 1950000,
        maxPrice: 2900000,
      },
      {
        id: "ssd-2tb-gen4",
        label: "SSD 2 TB NVMe (PCIe Gen 4 Flagship)",
        description: "Kecepatan ~7.400 MB/s • Kapasitas raksasa workstation & olah AI (Lexar NM790, Samsung 990 Pro)",
        generation: "gen4",
        speed: "~7.400 MB/s",
        minPrice: 3800000,
        maxPrice: 5800000,
      },
    ],
  },
  ram: {
    title: "Ekspansi Memori (RAM)",
    subtitle: "Pilih DDR4 atau DDR5. Estimasi sudah ALL-IN termasuk unit baru bergaransi + jasa pasang & cek kompatibilitas",
    options: [
      {
        id: "ram-none",
        label: "RAM bawaan cukup",
        generation: "all",
        minPrice: 0,
        maxPrice: 0,
      },
      // DDR4 (3200 MHz)
      {
        id: "ram-8gb-ddr4",
        label: "Tambah 8 GB DDR4 (3200 MHz)",
        description: "Multitasking nyaman dokumen & puluhan tab browser (Team Elite, Kingston Value, V-GeN)",
        generation: "ddr4",
        speed: "3200 MHz",
        minPrice: 750000,
        maxPrice: 1200000,
      },
      {
        id: "ram-16gb-ddr4",
        label: "Tambah 16 GB DDR4 (3200 MHz)",
        description: "Sweet spot editing video, coding intensif & gaming (Team Elite, Kingston Fury, Crucial)",
        generation: "ddr4",
        speed: "3200 MHz",
        minPrice: 1400000,
        maxPrice: 2200000,
      },
      {
        id: "ram-32gb-ddr4",
        label: "Tambah 32 GB DDR4 (2x16GB Kit 3200 MHz)",
        description: "Dual-channel optimal render animasi & komputasi data (Team Elite Kit, Kingston Fury Kit)",
        generation: "ddr4",
        speed: "Dual-Channel 3200 MHz",
        minPrice: 2800000,
        maxPrice: 4200000,
      },
      // DDR5 (4800 / 5600 MHz)
      {
        id: "ram-8gb-ddr5",
        label: "Tambah 8 GB DDR5 (4800/5600 MHz)",
        description: "Ekspansi laptop generasi Intel Gen 12-14 / AMD Ryzen 6000-8000+ (Crucial, Kingston, Samsung)",
        generation: "ddr5",
        speed: "4800/5600 MHz",
        minPrice: 1800000,
        maxPrice: 2500000,
      },
      {
        id: "ram-16gb-ddr5",
        label: "Tambah 16 GB DDR5 (5600 MHz High-Speed)",
        description: "High-bandwidth DDR5 gaming berat & rendering efisien (Crucial 5600, Kingston Fury Impact)",
        generation: "ddr5",
        speed: "5600 MHz",
        minPrice: 2800000,
        maxPrice: 4500000,
      },
      {
        id: "ram-32gb-ddr5",
        label: "Tambah 32 GB DDR5 (2x16GB Kit 5600 MHz)",
        description: "Bandwidth puncak maksimal untuk AI model lokal & workstation berat (Crucial 5600 Kit, Kingston Fury)",
        generation: "ddr5",
        speed: "Dual-Channel 5600 MHz",
        minPrice: 7500000,
        maxPrice: 11000000,
      },
    ],
  },
  services: [
    {
      id: "install-only",
      label: "Jasa Pasang Sparepart Bawa Sendiri (SSD / RAM)",
      description: "Bongkar pasang casing rapi, instalasi komponen milik Anda + pengujian BIOS",
      minPrice: 35000,
      maxPrice: 60000,
    },
    {
      id: "deep-clean",
      label: "Deep Cleaning & Ganti Thermal Paste",
      description: "Bersihkan debu kipas & oles pasta pendingin premium agar suhu dingin",
      minPrice: 80000,
      maxPrice: 120000,
      recommended: true,
    },
    {
      id: "os-install",
      label: "Instalasi Bersih OS (Windows / Linux) & Driver",
      description: "Sistem bersih bebas bloatware/virus + software kuliah esensial",
      minPrice: 50000,
      maxPrice: 90000,
    },
    {
      id: "backup-data",
      label: "Migrasi & Penyelamatan Backup Data",
      description: "Pindahkan data skripsi/file penting dengan aman ke drive baru",
      minPrice: 40000,
      maxPrice: 70000,
    },
    {
      id: "battery-replace",
      label: "Penggantian Baterai Laptop (OEM / Original)",
      description: "Sudah termasuk unit baterai baru + jasa bongkar pasang & kalibrasi daya",
      minPrice: 280000,
      maxPrice: 480000,
    },
  ],
};

export const SOFTWARE_PRICING = {
  type: {
    title: "Skala & Jenis Website",
    subtitle: "Pilih format kehadiran digital yang sesuai kebutuhan Anda",
    options: [
      {
        id: "web-landing",
        label: "Landing Page UMKM / Bisnis (1 Halaman)",
        description: "Tampilan modern, profil usaha, galeri produk & tombol WhatsApp otomatis",
        minPrice: 450000,
        maxPrice: 850000,
      },
      {
        id: "web-portfolio",
        label: "Website Portofolio Mahasiswa / Personal",
        description: "Pamerkan karya, CV, tugas akhir dengan desain editorial berkelas",
        minPrice: 350000,
        maxPrice: 650000,
      },
      {
        id: "web-custom",
        label: "Aplikasi Web Kustom / Integrasi AI",
        description: "Sistem cerdas, dashboard interaktif, atau platform tugas akhir khusus",
        minPrice: 1200000,
        maxPrice: 2800000,
      },
    ],
  },
  addons: [
    {
      id: "custom-domain",
      label: "Bantuan Setup Domain Kustom (.com / .id)",
      description: "Alamat web profesional atas nama brand atau nama Anda sendiri",
      minPrice: 150000,
      maxPrice: 250000,
    },
    {
      id: "seo-gmaps",
      label: "Pendaftaran Google Maps & Optimasi SEO",
      description: "Bisnis Anda mudah dicari di pencarian Google & Google Maps lokal",
      minPrice: 75000,
      maxPrice: 150000,
      recommended: true,
    },
    {
      id: "ai-assistant",
      label: "Integrasi Fitur AI Ringan",
      description: "Chatbot atau smart form untuk menjawab pertanyaan umum pelanggan",
      minPrice: 300000,
      maxPrice: 600000,
    },
  ],
};

export interface SmartphoneScreenOption {
  id: string;
  label: string;
  grade: "incell" | "oled" | "original" | "none";
  description: string;
  minPrice: number;
  maxPrice: number;
  recommended?: boolean;
}

export interface SmartphoneServiceOption {
  id: string;
  label: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  recommended?: boolean;
}

export const SMARTPHONE_PRICING = {
  screen: {
    title: "Pilihan Penggantian Layar (LCD / OLED)",
    subtitle: "Pilih kualitas panel layar pengganti. Estimasi ALL-IN sudah termasuk unit baru bergaransi + jasa pasang & pengeleman presisi",
    options: [
      {
        id: "screen-none",
        label: "Layar Normal (Tidak Perlu Ganti LCD)",
        grade: "none" as const,
        description: "Pilih opsi ini jika layar Anda masih normal dan hanya butuh perbaikan modul, baterai, port, atau mesin",
        minPrice: 0,
        maxPrice: 0,
      },
      {
        id: "screen-incell",
        label: "LCD Incell (Ekonomis Mahasiswa)",
        grade: "incell" as const,
        description: "Tampilan jernih & sentuhan responsif • Solusi hemat untuk pemakaian kuliah harian, tugas, & medsos",
        minPrice: 160000,
        maxPrice: 280000,
      },
      {
        id: "screen-oled",
        label: "OLED / AMOLED High-Grade",
        grade: "oled" as const,
        description: "Warna hitam pekat, saturasi kaya & hemat daya • Mendukung refresh rate 90/120Hz mulus tanpa lag",
        gradeLabel: "OLED High-Grade",
        minPrice: 350000,
        maxPrice: 680000,
        recommended: true,
      },
      {
        id: "screen-original",
        label: "LCD Original Pabrik / Copotan OEM",
        grade: "original" as const,
        description: "Standar visual pabrik 100% presisi • Mendukung TrueTone & sensor sidik jari di layar (under-display)",
        gradeLabel: "Original OEM",
        minPrice: 600000,
        maxPrice: 1250000,
      },
    ],
  },
  services: [
    {
      id: "hp-deep-clean",
      label: "Deep Cleaning Internal & Pembersihan Mesh Speaker / Port",
      description: "Pembersihan debu & kerak minyak pada mesh earpiece/mic, port cas, dan residu papan sirkuit",
      minPrice: 40000,
      maxPrice: 70000,
      recommended: true,
    },
    {
      id: "hp-battery",
      label: "Penggantian Baterai HP (High-Capacity / Original)",
      description: "Solusi baterai kembung/drop drastis • Termasuk baterai baru + perekat tarik elastis standar pabrik",
      minPrice: 120000,
      maxPrice: 220000,
    },
    {
      id: "hp-charging-port",
      label: "Perbaikan Port Charger (Type-C / Lightning) Longgar",
      description: "Ganti/rekondisi modul konektor cas sub-board agar kembali pas, kokoh, dan fast charging normal",
      minPrice: 75000,
      maxPrice: 135000,
    },
    {
      id: "hp-camera",
      label: "Ganti Modul Kamera (Depan / Belakang) & Kaca Lensa",
      description: "Atasi kamera blur/bergetar bunyi mendengung (OIS rusak) atau kaca kamera luar retak pecah",
      minPrice: 95000,
      maxPrice: 240000,
    },
    {
      id: "hp-matot",
      label: "Perbaikan HP Mati Total (Short Jalur VPH_PWR / IC Power)",
      description: "Injeksi tegangan DC power supply, deteksi komponen panas via thermal cam & mikrosolder kapasitor bocor",
      minPrice: 150000,
      maxPrice: 350000,
    },
    {
      id: "hp-bootloop",
      label: "Penanganan Bootloop & Flashing Firmware Resmi",
      description: "Pemulihan HP mentok logo merk berulang kali, unbrick sistem Android/iOS & perbaikan partisi OS",
      minPrice: 60000,
      maxPrice: 110000,
    },
    {
      id: "hp-install-only",
      label: "Jasa Pasang Sparepart HP Bawa Sendiri",
      description: "Bongkar pasang rapi untuk LCD/baterai/modul kamera yang Anda beli sendiri dari marketplace",
      minPrice: 45000,
      maxPrice: 75000,
    },
  ],
};

