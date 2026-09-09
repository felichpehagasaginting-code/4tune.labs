"use client";

import React, { useState } from "react";
import { SpecDrawer, type ProjectSpec } from "../interactive/spec-drawer.client";
import { FolderGit2, ArrowUpRight, Filter, ChevronRight, Activity, Cpu, Sparkles } from "lucide-react";

const PROJECTS_DATA: ProjectSpec[] = [
  {
    refId: "PRJ-01",
    codename: "Portofolio Mahasiswa Interaktif",
    domain: "Portofolio Personal & Magang",
    category: "Applied R&D",
    architectureOverview:
      "Website portofolio pribadi modern dengan animasi halus, showcase pencapaian, dan tampilan responsif yang mempermudah lolos seleksi magang dan kerja.",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    productionMetric: "Loading cepat di bawah 1 detik di jaringan HP 4G",
    deliverables: [
      "Halaman beranda estetik dengan galeri proyek",
      "Integrasi tautan ke resume PDF & LinkedIn",
      "Deploy gratis ke Vercel dengan domain custom"
    ],
    topology: `
[Pengunjung / HR] ──> [Website Portofolio] ──> [Download CV / Link WA]
          │                    │                         │
          ▼                    ▼                         ▼
[Galeri Proyek]   ──> [Detail Pencapaian]  ──> [Langsung Terhubung]
    `
  },
  {
    refId: "PRJ-02",
    codename: "Company Profile Usaha & UMKM",
    domain: "Landing Page Bisnis & Katalog",
    category: "SaaS",
    architectureOverview:
      "Landing page modern untuk usaha kecil & menengah lengkap dengan katalog produk/layanan, testimoni pelanggan, dan tombol order otomatis ke WhatsApp admin.",
    stack: ["Next.js", "Tailwind CSS", "WhatsApp API", "Google SEO"],
    productionMetric: "Meningkatkan konversi chat WhatsApp dari pengunjung baru",
    deliverables: [
      "Halaman profil bisnis profesional dengan domain usahamu",
      "Integrasi tombol chat WhatsApp langsung ke nomor kasir/admin",
      "Pemasangan Google Maps dan optimasi pencarian lokal"
    ],
    topology: `
[Calon Pelanggan] ──> [Website Bisnis] ──> [Lihat Menu / Katalog]
          │                   │                         │
          ▼                   ▼                         ▼
[Cek Alamat Maps] ──> [Klik Pesan WA]  ──> [Chat Kasir Otomatis]
    `
  },
  {
    refId: "PRJ-03",
    codename: "Dashboard Pencatatan Inventaris",
    domain: "Aplikasi Web Manajemen Toko",
    category: "Systems",
    architectureOverview:
      "Aplikasi web sederhana untuk mencatat stok barang masuk dan keluar toko yang gampang digunakan oleh staf kasir non-IT tanpa perlu software rumit.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    productionMetric: "Membantu toko memangkas selisih stok manual hingga 95%",
    deliverables: [
      "Dashboard pencatatan stok barang yang mudah dioperasikan",
      "Laporan penjualan dan stok menipis otomatis",
      "Hak akses akun kasir dan pemilik toko"
    ],
    topology: `
[Input Kasir / Staf] ──> [Sistem Web Toko] ──> [Database Stok Aman]
          │                      │                        │
          ▼                      ▼                        ▼
[Cek Barang Masuk]   ──> [Hitung Penjualan] ──> [Laporan Siap Cetak]
    `
  },
  {
    refId: "PRJ-04",
    codename: "Prototipe Monitoring Sensor IoT",
    domain: "Hardware & Skripsi Elektronika",
    category: "Hardware",
    architectureOverview:
      "Rancang bangun alat monitoring berbasis mikrokontroler ESP32 yang membaca data sensor fisik (suhu/kelembaban/level air) dan menampilkannya di dashboard web secara real-time.",
    stack: ["ESP32 / Arduino", "C++", "Sensor IoT", "Web Dashboard"],
    productionMetric: "Pengambilan data sensor konsisten untuk pengujian sidang tugas akhir",
    deliverables: [
      "Rangkaian prototipe hardware mikrokontroler siap uji",
      "Kode program Arduino/ESP32 yang terdokumentasi jelas",
      "Halaman web visualisasi grafik data sensor"
    ],
    topology: `
[Sensor Fisik Lapangan] ──> [Mikrokontroler ESP32] ──> [WiFi / Telemetri]
           │                         │                        │
           ▼                         ▼                        ▼
[Pembacaan Data]        ──> [Kirim Data ke Web]    ──> [Grafik Real-Time]
    `
  }
];

export function EngineeringIndex({
  onSelectDomain,
}: {
  onSelectDomain: (domain: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectSpec | null>(null);

  const categories = ["All", "SaaS", "Systems", "Hardware", "Applied R&D"];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="showcase" className="py-24 border-b border-subtle bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-subtle text-neutral-300 text-xs font-mono uppercase tracking-wider mb-4">
              <FolderGit2 size={13} />
              <span>05. Contoh Karya &amp; Proyek Kami</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
              Karya Nyata yang Telah Kami Buat. <br />
              <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Sederhana, Rapi, dan Berfungsi Optimal.
              </span>
            </h2>
            <p className="mt-4 text-base text-secondary leading-relaxed">
              Berikut beberapa jenis proyek yang biasa kami tangani—mulai dari portofolio mahasiswa, landing page bisnis lokal, hingga alat sensor IoT.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-surface/80 p-1.5 rounded-xl border border-subtle backdrop-blur-md overflow-x-auto">
            <Filter size={14} className="text-muted ml-2 mr-1 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-white text-black font-bold shadow-sm"
                    : "text-secondary hover:text-primary hover:bg-surface"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.refId}
              onClick={() => setActiveProject(project)}
              className="group relative rounded-2xl border border-subtle bg-surface/60 hover:bg-surface-elev hover:border-neutral-500 p-6 sm:p-8 transition-all duration-300 backdrop-blur-md cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas border border-subtle text-neutral-300 uppercase font-semibold">
                    {project.refId} {"//"} {project.domain}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-surface border border-subtle group-hover:border-white group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-primary group-hover:text-white transition-colors">
                  {project.codename}
                </h3>

                {/* Narrative Overview */}
                <p className="mt-4 text-xs sm:text-sm text-secondary leading-relaxed">
                  {project.architectureOverview}
                </p>

                {/* Production Metric Highlight */}
                <div className="mt-5 p-3.5 rounded-xl bg-canvas/80 border border-subtle flex items-center gap-2.5">
                  <Activity size={15} className="text-neutral-300 flex-shrink-0" />
                  <span className="text-xs font-mono font-semibold text-primary">
                    {project.productionMetric}
                  </span>
                </div>
              </div>

              {/* Card Bottom: Tech Stack */}
              <div className="mt-6 pt-4 border-t border-subtle flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((st, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas text-secondary"
                    >
                      {st}
                    </span>
                  ))}
                </div>

                <span className="text-[11px] font-mono text-neutral-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Lihat Detail</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Drawer */}
      <SpecDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onEngage={onSelectDomain}
      />
    </section>
  );
}
