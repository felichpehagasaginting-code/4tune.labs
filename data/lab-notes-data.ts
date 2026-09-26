export interface LabArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  author: string;
  role: string;
  readTime: string;
  date: string;
  tag: string;
  content: string[];
}

export const LAB_NOTES_DATA: LabArticle[] = [
  {
    id: "note-1",
    slug: "tanda-harddisk-rusak-skripsi",
    title: "5 Tanda Harddisk Laptop Mulai Sekarat Sebelum Data Tugas Akhir Hilang",
    summary: "Harddisk mekanik tidak pernah rusak tiba-tiba tanpa memberi sinyal peringatan. Kenali gejalanya sebelum Anda menangis di depan tempat servis.",
    author: "Sukron (Cuklon)",
    role: "Hardware & System Support",
    readTime: "3 mnt baca",
    date: "September 2026",
    tag: "Penyelamatan Data",
    content: [
      "Banyak mahasiswa datang ke meja servis kami dalam keadaan panik: laptop tiba-tiba layar biru (Blue Screen) dan file draft skripsi berbulan-bulan tidak bisa diakses sama sekali. Sebenarnya, media penyimpanan mekanik (HDD) hampir selalu memberikan sinyal sebelum rusak total.",
      "1. Waktu Booting yang Merangkak Naik: Jika dulu menyalakan Windows butuh 40 detik dan sekarang bertambah menjadi 3 hingga 5 menit, ini tanda piringan magnetik harddisk mulai kesulitan membaca sektor data (Bad Sector).",
      "2. Muncul Suara Tik-Tik atau Gemeretak Halus: Harddisk bekerja menggunakan jarum mekanik. Jika terdengar suara 'clicking' berulang dari bagian dalam laptop, jarum pembaca sedang gagal melakukan kalibrasi.",
      "3. File Sering 'Corrupted' Saat Dibuka: Dokumen Word atau PDF mendadak tidak bisa dibuka atau ukurannya menjadi 0 KB tanpa alasan yang jelas.",
      "4. Task Manager Menunjukkan 'Disk 100%' Terus-Menerus: Meskipun Anda tidak sedang membuka program berat, persentase penggunaan disk di Task Manager tetap menyentuh 100% dan membuat kursor tersendat-sendat.",
      "5. Suhu Laptop Terasa Sangat Panas di Area Tertentu: Motor pemutar piringan yang aus akan bekerja jauh lebih berat dan menghasilkan panas abnormal.",
      "Langkah Penyelamatan: Jangan pernah mematikan paksa dengan menekan tombol power berulang kali. Segera lakukan backup file ke cloud (Google Drive) atau flashdisk eksternal, lalu jadwalkan penggantian ke SSD yang jauh lebih tahan benturan dan bebas komponen mekanik rentan.",
    ],
  },
  {
    id: "note-2",
    slug: "kenapa-thermal-paste-kering-bikin-laptop-drop",
    title: "Kenapa Pasta Pendingin Kering Bisa Bikin Performa Laptop Drop Separuh?",
    summary: "Prosesor modern memiliki mekanisme pertahanan diri bernama thermal throttling. Inilah alasan game dan aplikasi editing Anda tiba-tiba patah-patah.",
    author: "Zulkifli (Mamad)",
    role: "Electronics & Repair Specialist",
    readTime: "3 mnt baca",
    date: "September 2026",
    tag: "Sirkuit & Suhu",
    content: [
      "Pernahkah laptop Anda terasa sangat kencang di 15 menit pertama, lalu tiba-tiba melambat drastis, lag parah, dan kipasnya berdengung kencang seperti pesawat lepas landas? Penyebab nomor satunya hampir selalu adalah pasta pendingin (thermal paste) yang sudah mengering.",
      "Bagaimana Panas Dibuang? Antara permukaan inti prosesor (die CPU/GPU) dan lempeng pendingin tembaga (heatsink) terdapat celah mikroskopis yang tidak rata. Pasta termal berfungsi sebagai jembatan untuk mengalirkan panas dari prosesor ke kipas pendingin.",
      "Apa yang Terjadi Jika Kering? Rata-rata pasta termal bawaan pabrik hanya bertahan optimal 1 hingga 2 tahun. Setelah itu, pasta mengeras menjadi bubuk kering. Celah udara terbentuk kembali, dan udara adalah isolator panas yang sangat buruk.",
      "Mekanisme Thermal Throttling: Saat sensor membaca suhu CPU menyentuh 90°C – 100°C, prosesor secara otomatis memotong kecepatan frekuensinya (misal dari 3.8 GHz drop ke 1.2 GHz) agar chip tidak meleleh terbakar. Akibatnya, aplikasi Anda terasa sangat lambat.",
      "Solusi Perawatan: Deep cleaning debu kipas dan penggantian pasta termal baru setiap 12-18 bulan adalah investasi perawatan termurah yang bisa menyelamatkan umur motherboard laptop Anda hingga bertahun-tahun.",
    ],
  },
  {
    id: "note-3",
    slug: "membuat-web-portofolio-hemat-mahasiswa",
    title: "Membangun Web Portofolio Cepat & Nol Biaya Bulanan untuk Mahasiswa Non-IT",
    summary: "Anda tidak perlu membayar sewa server jutaan per tahun hanya untuk memajang karya dan CV agar terlihat kredibel di mata perekrut.",
    author: "Felich",
    role: "AI & Product Engineer",
    readTime: "4 mnt baca",
    date: "September 2026",
    tag: "Web & Karir",
    content: [
      "Banyak rekan mahasiswa jurusan manajemen, hukum, desain, atau teknik mengira bahwa memiliki website personal ber-domain resmi itu mahal dan butuh biaya sewa server bulanan yang menguras kantong.",
      "Kenyataannya, lanskap teknologi modern saat ini memungkinkan kita membuat situs web yang super cepat, bebas iklan, dan di-hosting 100% gratis secara legal di infrastruktur komputasi kelas dunia (seperti Vercel atau Cloudflare Pages).",
      "Kunci Utamanya: Arsitektur Static-Generated. Alih-alih menyewa server database konvensional yang boros daya, kita cukup merancang antarmuka berbasis Next.js atau React yang di-generate menjadi halaman statis berkinerja tinggi. Rekruter yang membuka link dari smartphone mereka akan disambut loading instan di bawah 1 detik.",
      "Satu-Satunya Biaya: Jika Anda ingin nama domain profesional (misal namaanda.com atau namaanda.id), biayanya hanya sekitar Rp 150rb per tahun untuk langganan domain resmi. Sisanya? Nol rupiah.",
      "Bagi mahasiswa yang sedang mempersiapkan berkas magang atau fresh graduate, memiliki website personal jauh lebih berkesan di meja HRD dibanding sekadar mengirim lampiran PDF standar.",
    ],
  },
  {
    id: "note-4",
    slug: "desain-antarmuka-ramah-pengguna-awam",
    title: "Prinsip Desain Antarmuka: Membuat Pengguna Awam Nyaman Tanpa Bingung",
    summary: "Desain yang hebat bukan yang penuh warna neon menyala, melainkan yang terasa intuitif dan tidak memaksa pengguna membaca buku manual.",
    author: "Dika",
    role: "Product & UI/UX Design",
    readTime: "3 mnt baca",
    date: "September 2026",
    tag: "Desain Ergonomis",
    content: [
      "Sering kali sebuah website atau aplikasi UMKM dibuat dengan terlalu banyak animasi berlebihan, efek neon menyilaukan, atau tombol-tombol yang tersembunyi di tempat aneh. Desain seperti ini mungkin terlihat keren bagi pembuatnya, tapi membuat calon pelanggan awam merasa frustrasi dan langsung menutup halaman.",
      "Tiga Prinsip Sederhana yang Kami Terapkan di 4tune.labs:",
      "1. Hirarki Visual yang Tenang: Mata manusia membaca dari kiri atas ke kanan bawah. Judul harus jelas, harga harus transparan, dan penjelasan harus menggunakan bahasa sehari-hari yang santai tanpa jargon rumit.",
      "2. Tombol Aksi yang Nyata: Pengunjung tidak boleh menebak ke mana mereka harus mengklik. Tombol 'Hubungi via WhatsApp' atau 'Lihat Paket' harus berukuran ergonomis, nyaman disentuh jempol di layar HP, dan kontras dengan latar belakang.",
      "3. Kecepatan Adalah Bagian dari Desain: Desain secantik apa pun akan ditinggalkan jika waktu loading-nya lebih dari 3 detik di jaringan seluler. Estetika sejati adalah keseimbangan antara keindahan visual dan performa yang ringan.",
    ],
  },
  {
    id: "note-5",
    slug: "diagnosa-hp-mati-total-short-jalur-vph-pwr",
    title: "SOP Diagnosa HP Mati Total: Melacak Jalur Short VPH_PWR dengan DC Power Supply & Thermal Cam",
    summary: "HP matot jangan langsung dicas sembarangan atau ganti baterai. Simak metode injeksi tegangan presisi dan pelacakan kapasitor bocor tanpa merusak PCB.",
    author: "Zulkifli (Mamad)",
    role: "Electronics & Repair Specialist",
    readTime: "4 mnt baca",
    date: "September 2026",
    tag: "Diagnosa Sirkuit HP",
    content: [
      "Setiap minggu di Lab Rekayasa Asrama SCWE (Gedung 2 Lt. 3), kami kerap menerima HP dengan kondisi 'mati total'. Reaksi pertama pemilik biasanya panik lalu mencolokkan charger berulang-ulang berjam-jam, atau buru-buru membeli baterai baru di e-commerce. Padahal, jika ada sirkuit yang korslet di dalam, menyuntikkan arus listrik terus-menerus justru berisiko membakar chip prosesor (CPU) atau IC Power utama.",
      "1. Analisis Perilaku Arus (DC Power Supply Digital): Langkah pertama kami bukan menekan tombol power sembarangan, melainkan menghubungkan konektor baterai HP ke DC Power Supply bertegangan 3.8V - 4.2V dengan pembatas arus (current limiter). Sebelum tombol power ditekan, jika jarum ampere langsung melonjak ke 1A - 2A, dapat dipastikan telah terjadi korsleting primer pada jalur distribusi tegangan utama (VPH_PWR atau VDD_MAIN).",
      "2. Mengapa Jalur VPH_PWR Rentan Korslet? Jalur VPH_PWR adalah urat nadi tenaga yang mendistribusikan daya dari baterai dan IC Charger ke puluhan blok sirkuit (sinyal RF, audio amplifier, lampu backlight LCD, hingga CPU). Di sepanjang jalur ini, terpasang puluhan kapasitor keramik (MLCC) peredam noise yang terhubung langsung ke ground.",
      "3. Si Kecil Biang Keladi: Berdasarkan pengalaman kami, 90% kasus HP mati total akibat short VPH_PWR bukan disebabkan oleh rusaknya IC mahal, melainkan satu buah kapasitor MLCC seukuran butiran pasir yang mengalami penurunan dielektrik (bocor) akibat panas ekstrem atau benturan.",
      "4. Melacak Titik Panas dengan Thermal Camera: Untuk menemukan satu kapasitor nakal di antara ribuan komponen mikro tanpa menebak-nebak, kami menggunakan sensor pencitraan termal (Thermal Cam). Saat tegangan rendah (1.2V - 2V) disuntikkan secara aman ke jalur yang korslet, kapasitor yang rusak akan berpendar merah terang di layar termal dalam waktu kurang dari 3 detik.",
      "5. Pengangkatan & Mikrosolder Presisi: Kapasitor yang bocor dilepas menggunakan solder uap bersuhu terkalibrasi (320°C - 340°C) dengan pasta fluks no-clean agar jalur PCB tidak melepuh. Komponen pengganti dipasang kembali demi menjaga kestabilan penyaringan arus jangka panjang.",
      "Pesan Kami: Jika HP Anda tiba-tiba mati total dan terasa hangat di satu sisi bodi, segera lepaskan dari casan. Bawa langsung ke meja lab untuk diuji resistansinya secara transparan.",
    ],
  },
  {
    id: "note-6",
    slug: "pertolongan-pertama-hp-kemasukan-air-dan-memilih-lcd",
    title: "Pertolongan Pertama HP Kemasukan Air & Panduan Cerdas Memilih Panel Layar LCD",
    summary: "Beras bukan solusi HP tercebur air! Pahami langkah darurat pencegahan korosi elektrolit dan cara memilih kualitas panel layar pengganti (Original, OLED, atau Incell).",
    author: "Zulkifli (Mamad)",
    role: "Electronics & Repair Specialist",
    readTime: "4 mnt baca",
    date: "September 2026",
    tag: "Tips & Edukasi HP",
    content: [
      "Mitos Beras yang Menyesatkan: Ketika HP tercebur ke ember atau kehujanan, mitos paling populer adalah merendamnya di dalam beras selama 2 hari. Secara teknis, beras hanya menyerap kelembaban di permukaan luar, tetapi tidak mampu menghentikan korosi elektrolit di sela-sela pin fleksibel konektor. Butiran tepung beras justru sering masuk ke dalam lubang port charger dan mesh speaker, menjadi bubur lengket yang merusak komponen.",
      "Langkah Darurat yang Tepat: (1) Matikan daya HP seketika dan cabut SIM tray. (2) JANGAN PERNAH menyalakan HP atau mencolokkan kabel charger! Aliran arus listrik yang bertemu mineral air akan memicu reaksi elektrolisis yang mengikis jalur tembaga PCB dalam hitungan menit. (3) Jangan gunakan hair dryer panas karena dapat melelehkan lem LCD dan meniup air semakin dalam. (4) Segera bawa ke meja servis untuk dibongkar, diputuskan baterainya, dan dibersihkan menggunakan cairan pembersih isopropil alkohol 99% di wadah ultrasonik.",
      "Panduan Memilih Panel Layar Pengganti (LCD): Banyak konsumen bingung saat layar HP-nya retak atau blank karena ditawari berbagai jenis layar di pasaran. Berikut panduan ringkasnya:",
      "1. Layar Original Pabrik / OEM Copotan: Menawarkan kualitas warna 100% presisi, dukungan sensor TrueTone/Color Match pabrik, dan kompatibilitas penuh sensor sidik jari di dalam layar (under-display optical/ultrasonic fingerprint). Pilihan terbaik bagi Anda yang memprioritaskan kualitas tanpa kompromi.",
      "2. Panel OLED / AMOLED High-Grade: Memiliki karakter warna hitam sempurna (kontras rasio tinggi) dan mendukung refresh rate tinggi (90Hz / 120Hz). Konsumsi daya tetap efisien dan ketebalan panel mendekati original pabrik. Pilihan paling seimbang antara harga dan kualitas.",
      "3. Panel Incell (Ekonomis): Menggunakan teknologi backlight LED di mana digitizer sentuh terintegrasi langsung di dalam kaca. Warnanya cerah dan sangat responsif untuk kebutuhan tugas kuliah harian, dengan harga yang sangat ramah kantong mahasiswa. Kelemahannya, bezel hitam sedikit lebih tebal dan tidak mendukung fingerprint di dalam layar.",
      "Di 4tune.labs, kami selalu menjelaskan perbedaan fisik ketiga jenis panel ini secara jujur di meja kerja sebelum Anda memutuskan, lengkap dengan garansi fungsi normal.",
    ],
  },
];
