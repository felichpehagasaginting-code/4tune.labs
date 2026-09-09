export interface SolutionItem {
  id: string;
  category: "hardware" | "business" | "student";
  categoryLabel: string;
  symptom: string;
  badge: string;
  diagnosis: string;
  recommendation: string;
  turnaroundTime: string;
  ctaText: string;
  ctaLink: string;
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: "sol-1",
    category: "hardware",
    categoryLabel: "Kendala Laptop & PC",
    symptom: "Laptop cepat mendidih, kipas menjerit kencang, dan suka mati tiba-tiba saat dipakai Zoom atau ngerjain tugas.",
    badge: "Suhu & Pendingin",
    diagnosis: "Debu pekat menutup saluran pembuangan panas radiator dan pasta pendingin bawaan pabrik sudah mengering menjadi kerak. Akibatnya prosesor membatasi performa (thermal throttling) hingga mematikan diri demi perlindungan sistem.",
    recommendation: "Deep cleaning menyeluruh pada baling-baling kipas, pembersihan heatsink tembaga, dan pelumasan ulang dengan pasta termal premium berkemampuan hantar panas tinggi.",
    turnaroundTime: "1 – 3 Jam (Bisa ditunggu)",
    ctaText: "Jadwalkan Deep Cleaning",
    ctaLink: "https://wa.me/6283894496994?text=Hai%20Sukron%2C%20laptop%20saya%20panas%20dan%20kipas%20berisik.%20Mau%20konsultasi%20deep%20cleaning.",
  },
  {
    id: "sol-2",
    category: "hardware",
    categoryLabel: "Kendala Laptop & PC",
    symptom: "Menyalakan laptop butuh waktu 3-5 menit, dan buka dokumen Word / Excel sering muncul tulisan 'Not Responding'.",
    badge: "Kecepatan & Storage",
    diagnosis: "Sistem operasi Anda masih berjalan di atas Harddisk (HDD) mekanik yang lambat atau kapasitas RAM 4GB sudah tidak sanggup menampung pembaruan Windows modern.",
    recommendation: "Migrasi sistem ke SSD NVMe/SATA dan tambah keping RAM minimal 8GB. Hasilnya: booting hanya 8-12 detik dan aplikasi terbuka seketika tanpa hambatan.",
    turnaroundTime: "1 Hari Kerja (Termasuk kloning data)",
    ctaText: "Konsultasi Upgrade SSD & RAM",
    ctaLink: "https://wa.me/6283894496994?text=Hai%20Sukron%2C%20laptop%20saya%20lemot%20banget%20dan%20sering%20not%20responding.%20Boleh%20tanya%20upgrade%20SSD%2FRAM%3F",
  },
  {
    id: "sol-3",
    category: "business",
    categoryLabel: "Kebutuhan Usaha & UMKM",
    symptom: "Pelanggan sering bingung melihat katalog produk/jasa di chat WhatsApp, dan usaha belum punya link profil resmi yang kredibel di bio media sosial.",
    badge: "Solusi Usaha & Profil",
    diagnosis: "Mengirim foto brosur atau daftar harga manual satu per satu via WhatsApp merepotkan pelanggan dan membuang waktu Anda melayani pertanyaan yang sama berulang kali.",
    recommendation: "Pembuatan Landing Page profil usaha ringkas 1 halaman yang cepat dibuka di HP, memuat katalog produk jernih, testimoni, dan tombol order otomatis yang langsung terhubung ke WhatsApp bisnis Anda.",
    turnaroundTime: "3 – 5 Hari Kerja",
    ctaText: "Diskusi Landing Page UMKM",
    ctaLink: "https://wa.me/6282386526982?text=Hai%20Felich%2C%20saya%20punya%20usaha%20dan%20ingin%20membuat%20landing%20page%20profil%20dengan%20katalog%20WhatsApp.",
  },
  {
    id: "sol-4",
    category: "student",
    categoryLabel: "Tugas Akhir & Mahasiswa",
    symptom: "Perlu website portofolio untuk melamar magang/kerja atau tugas kuliah, tapi bingung cara pasang domain, hosting, dan desainnya.",
    badge: "Portofolio & Karir",
    diagnosis: "Template website gratisan sering kali lambat, dipenuhi iklan, atau terlihat generik. Mahasiswa butuh situs personal yang rapi, mencerminkan identitas karya, dan ringan saat dibuka HRD.",
    recommendation: "Kami bangunkan website personal modern dengan standar editorial, terintegrasi tautan CV/proyek, dan kami bantu deploy ke server gratis yang cepat (Vercel) sehingga bebas biaya langganan server bulanan.",
    turnaroundTime: "2 – 4 Hari Kerja",
    ctaText: "Bangun Portofolio Personal",
    ctaLink: "https://wa.me/6282386526982?text=Hai%20Felich%20%26%20Dika%2C%20saya%20ingin%20membuat%20website%20portofolio%20personal%20untuk%20persiapan%20kerja%2Fmagang.",
  },
  {
    id: "sol-5",
    category: "hardware",
    categoryLabel: "Kendala Gadget & HP",
    symptom: "Layar HP/tablet retak, baterai cepat bocor drop dari 50% ke 0%, atau port charger harus digoyang-goyang baru mau ngecas.",
    badge: "Reparasi Gadget",
    diagnosis: "Kerusakan fisik pada modul konektor fleksibel atau sel lithium baterai yang sudah melewati batas siklus pengisian daya.",
    recommendation: "Pemeriksaan jalur sirkuit oleh Zulkifli, penggantian modul konektor charger presisi, atau pergantian baterai berkualitas dengan garansi fungsi normal.",
    turnaroundTime: "1 – 2 Hari Kerja",
    ctaText: "Konsultasi Servis Gadget",
    ctaLink: "https://wa.me/6283159392826?text=Hai%20Zulkifli%2C%20HP%2Ftablet%20saya%20bermasalah%20di%20bagian%20baterai%2Fport%20charger.%20Bisa%20bantu%20cek%3F",
  },
];
