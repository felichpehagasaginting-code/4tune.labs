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
    subtitle: "Pilih generasi NVMe sesuai slot laptop/PC Anda untuk kecepatan boot instan",
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
        description: "Kecepatan ~2.400 MB/s • Pilihan hemat untuk OS & software kuliah esensial",
        generation: "gen3",
        speed: "~2.400 MB/s",
        minPrice: 320000,
        maxPrice: 420000,
      },
      {
        id: "ssd-512-gen3",
        label: "SSD 512 GB NVMe (PCIe Gen 3)",
        description: "Kecepatan ~3.500 MB/s • Best value untuk laptop kuliah, kerja & tugas akhir",
        generation: "gen3",
        speed: "~3.500 MB/s",
        minPrice: 580000,
        maxPrice: 720000,
      },
      {
        id: "ssd-1tb-gen3",
        label: "SSD 1 TB NVMe (PCIe Gen 3)",
        description: "Kecepatan ~3.500 MB/s • Kapasitas lega untuk simpan data besar & multi-OS",
        generation: "gen3",
        speed: "~3.500 MB/s",
        minPrice: 1050000,
        maxPrice: 1280000,
      },
      // PCIe Gen 4 (Laptop Modern, Gaming, & Workstation)
      {
        id: "ssd-512-gen4",
        label: "SSD 512 GB NVMe (PCIe Gen 4)",
        description: "Kecepatan ~5.000 MB/s • Transfer ultra cepat untuk laptop gaming & PC modern",
        generation: "gen4",
        speed: "~5.000 MB/s",
        minPrice: 750000,
        maxPrice: 950000,
      },
      {
        id: "ssd-1tb-gen4",
        label: "SSD 1 TB NVMe (PCIe Gen 4)",
        description: "Kecepatan ~7.000+ MB/s • Performa ekstrem video editing 4K, 3D render & gaming",
        generation: "gen4",
        speed: "~7.000+ MB/s",
        minPrice: 1350000,
        maxPrice: 1680000,
      },
      {
        id: "ssd-2tb-gen4",
        label: "SSD 2 TB NVMe (PCIe Gen 4 Flagship)",
        description: "Kecepatan ~7.400 MB/s • Kapasitas raksasa untuk workstation profesional",
        generation: "gen4",
        speed: "~7.400 MB/s",
        minPrice: 2450000,
        maxPrice: 2950000,
      },
    ],
  },
  ram: {
    title: "Ekspansi Memori (RAM)",
    subtitle: "Pilih DDR4 (laptop standar) atau DDR5 (laptop generasi baru) untuk multitasking bebas lag",
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
        description: "Minimal nyaman untuk multitasking harian, buka puluhan tab & dokumen",
        generation: "ddr4",
        speed: "3200 MHz",
        minPrice: 320000,
        maxPrice: 420000,
      },
      {
        id: "ram-16gb-ddr4",
        label: "Tambah 16 GB DDR4 (3200 MHz)",
        description: "Performa lega untuk editing video, coding intensif, & gaming harian",
        generation: "ddr4",
        speed: "3200 MHz",
        minPrice: 580000,
        maxPrice: 750000,
      },
      {
        id: "ram-32gb-ddr4",
        label: "Tambah 32 GB DDR4 (2x16GB Kit 3200 MHz)",
        description: "Dual-channel optimal untuk render animasi & komputasi data berat",
        generation: "ddr4",
        speed: "Dual-Channel 3200 MHz",
        minPrice: 1150000,
        maxPrice: 1450000,
      },
      // DDR5 (4800 / 5600 MHz)
      {
        id: "ram-8gb-ddr5",
        label: "Tambah 8 GB DDR5 (4800/5600 MHz)",
        description: "Ekspansi laptop modern generasi Intel Gen 12-14 / AMD Ryzen 6000-8000+",
        generation: "ddr5",
        speed: "4800/5600 MHz",
        minPrice: 480000,
        maxPrice: 620000,
      },
      {
        id: "ram-16gb-ddr5",
        label: "Tambah 16 GB DDR5 (5600 MHz High-Speed)",
        description: "High-bandwidth DDR5 untuk gaming berat & rendering efisien generasi terbaru",
        generation: "ddr5",
        speed: "5600 MHz",
        minPrice: 850000,
        maxPrice: 1150000,
      },
      {
        id: "ram-32gb-ddr5",
        label: "Tambah 32 GB DDR5 (2x16GB Kit 5600 MHz)",
        description: "Bandwidth puncak maksimal untuk AI model training lokal & workstation berat",
        generation: "ddr5",
        speed: "Dual-Channel 5600 MHz",
        minPrice: 1650000,
        maxPrice: 2150000,
      },
    ],
  },
  services: [
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
