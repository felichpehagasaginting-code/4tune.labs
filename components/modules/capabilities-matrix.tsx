"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase, Cpu, CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";

export function CapabilitiesMatrix() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const capabilities = [
    {
      id: "LAYANAN 01",
      domain: "Website Mahasiswa & Portofolio",
      title: "Website Portofolio, Skripsi, & Pameran Karya Mahasiswa",
      icon: <GraduationCap className="w-6 h-6 text-neutral-300" />,
      badge: "Untuk Mahasiswa & Kreator",
      summary:
        "Tingkatkan rasa percaya diri saat melamar magang atau sidang skripsi. Kami bantu buatkan website portofolio interaktif yang memamerkan karya dan prestasimu secara elegan.",
      features: [
        "Desain modern dan estetik yang bikin portofoliomu menonjol di mata rekruter atau dosen",
        "Tampilan responsif 100% rapi saat dibuka di HP, tablet, maupun laptop",
        "Galeri proyek interaktif lengkap dengan deskripsi, gambar, dan tombol link karya",
        "Bantuan deploy gratis ke internet (menggunakan Vercel/Netlify dengan link custom)"
      ],
      deliverables: [
        "Website portofolio yang sudah live online di internet",
        "Panduan mudah cara mengganti teks dan foto sendiri",
        "Garansi perbaikan jika ada tampilan yang kurang pas"
      ],
      impact: "Bikin kamu terlihat lebih profesional, terorganisir, dan siap bersaing di dunia kerja."
    },
    {
      id: "LAYANAN 02",
      domain: "Website Profil Usaha & UMKM",
      title: "Landing Page & Company Profile Usaha yang Meyakinkan",
      icon: <Briefcase className="w-6 h-6 text-neutral-300" />,
      badge: "Untuk UMKM & Bisnis Lokal",
      summary:
        "Bantu bisnismu naik kelas. Pelanggan sekarang mencari kredibilitas lewat Google dan website resmi. Kami bangunkan website bisnis yang cepat, terpercaya, dan langsung terhubung ke WhatsApp.",
      features: [
        "Tampilan company profile yang memperkuat citra dan kepercayaan merek usahamu",
        "Tombol aksi langsung ke WhatsApp admin untuk mempermudah calon pelanggan bertransaksi",
        "Daftar katalog produk atau jasa dengan foto dan penjelasan yang mudah dipahami",
        "Setup nama domain usahamu sendiri (misal: namabisnis.com) agar tampak kredibel"
      ],
      deliverables: [
        "Website bisnis siap pakai dengan domain pilihanmu",
        "Integrasi tombol WhatsApp dan link Google Maps lokasi usaha",
        "Optimasi kecepatan loading agar calon pembeli tidak kabur karena lemot"
      ],
      impact: "Meningkatkan penjualan dan kepercayaan pelanggan baru yang mencari bisnismu di internet."
    },
    {
      id: "LAYANAN 03",
      domain: "Sistem Web Kustom & Alat IoT",
      title: "Dashboard Data, Web App Simpel & Bantuan Proyek IoT",
      icon: <Cpu className="w-6 h-6 text-neutral-300" />,
      badge: "Proyek Kustom & Riset",
      summary:
        "Butuh sistem manajemen inventaris simpel untuk tokomu, atau butuh bantuan merakit sensor IoT Arduino/ESP32 untuk tugas akhir kuliah? Kami siap bantu dari rancangan hingga berjalan.",
      features: [
        "Aplikasi web sederhana untuk pencatatan stok, data absensi, atau laporan internal",
        "Perakitan alat sensor pintar (IoT) dengan mikrokontroler Arduino atau ESP32",
        "Dashboard pemantauan sensor real-time yang bisa dilihat grafiknya dari browser HP",
        "Pendampingan teknis dan penjelasan cara kerja sistem secara transparan"
      ],
      deliverables: [
        "Aplikasi web atau dashboard data yang berfungsi penuh",
        "Kode program hardware/firmware yang terdokumentasi rapi",
        "Sesi demo dan tanya jawab sampai kamu benar-benar paham alur kerjanya"
      ],
      impact: "Tugas akhir atau kebutuhan pencatatan tokomu selesai tanpa stres berkepanjangan."
    }
  ];

  return (
    <section id="capabilities" className="py-24 border-b border-subtle bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-subtle text-neutral-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers size={13} />
            <span>04. Layanan &amp; Solusi Kami</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
            Apa Saja yang Bisa Kami Bantu? <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Fokus pada Kebutuhan Nyata Anda.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-secondary leading-relaxed">
            Tidak perlu khawatir jika Anda belum paham istilah teknis sama sekali. Kami mendengarkan apa yang Anda butuhkan dan mewujudkannya dalam bentuk website yang rapi dan fungsional.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 border-b border-subtle pb-4 overflow-x-auto">
          {capabilities.map((cap, idx) => (
            <button
              key={cap.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl text-left transition-all cursor-pointer whitespace-nowrap ${
                activeTab === idx
                  ? "bg-surface border border-white/20 shadow-md text-primary"
                  : "bg-surface/30 border border-transparent text-secondary hover:text-primary hover:bg-surface/60"
              }`}
            >
              <div className="flex-shrink-0">{cap.icon}</div>
              <div>
                <div className="text-[10px] font-mono text-muted uppercase tracking-wider">{cap.id}</div>
                <div className="text-xs sm:text-sm font-bold">{cap.domain}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Discipline Feature Card */}
        {capabilities[activeTab] && (
          <div className="p-8 sm:p-10 rounded-2xl bg-surface/70 border border-subtle backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-canvas border border-subtle text-neutral-200 text-xs font-mono font-medium">
                {capabilities[activeTab].badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-primary leading-snug">
                {capabilities[activeTab].title}
              </h3>

              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                {capabilities[activeTab].summary}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-muted uppercase tracking-wider">
                  Apa yang Anda Dapatkan:
                </div>
                {capabilities[activeTab].features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-primary/90">
                    <CheckCircle2 size={16} className="text-neutral-300 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Impact Callout */}
              <div className="p-4 rounded-xl bg-canvas/80 border border-subtle text-xs text-secondary">
                <span className="text-white font-mono font-bold mr-1.5">[MANFAAT]</span>
                {capabilities[activeTab].impact}
              </div>
            </div>

            {/* Right Deliverables Panel (5 cols) */}
            <div className="lg:col-span-5 bg-canvas/90 border border-subtle rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-subtle">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">
                  Hasil yang Diterima
                </span>
                <span className="text-[10px] font-mono text-neutral-300 px-2 py-0.5 rounded bg-surface border border-subtle">
                  Siap Pakai
                </span>
              </div>

              <ul className="space-y-3 text-xs text-secondary font-mono">
                {capabilities[activeTab].deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5">
                    <span className="text-neutral-400 font-bold">0{dIdx + 1}.</span>
                    <span className="text-primary">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-subtle">
                <a
                  href="#inquiry"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-surface hover:bg-surface-hover border border-subtle hover:border-neutral-500 text-primary text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Tanya-Tanya Layanan Ini</span>
                  <ArrowRight size={14} className="text-neutral-300" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
