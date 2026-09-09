"use client";

import React from "react";
import { Users, GitPullRequest, Timer, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, MessageSquare, Code2, Rocket } from "lucide-react";

export function StudioModel() {
  const steps = [
    {
      id: "LANGKAH 01",
      title: "Ngobrol Santai & Rancang Konsep",
      badge: "Diskusi & Solusi",
      target: "Bebas konsultasi tanpa harus paham istilah IT",
      description:
        "Ceritakan apa yang kamu butuhkan—apakah untuk pameran tugas akhir kuliah, portofolio magang, atau profil toko usahamu. Kami bantu susunkan struktur halaman yang paling cocok.",
      highlights: [
        "Konsultasi santai via WhatsApp atau Google Meet",
        "Penentuan fitur yang tepat sasaran & hemat budget",
        "Estimasi waktu pengerjaan yang jelas dan transparan",
        "Tanpa biaya konsultasi awal"
      ]
    },
    {
      id: "LANGKAH 02",
      title: "Pengerjaan Cepat & Cek Progres",
      badge: "Koding & Desain",
      target: "Bisa dipantau langsung lewat link preview",
      description:
        "Tim mahasiswa kami mulai merancang tampilan estetik dan menulis kode program. Kamu akan diberikan tautan pratinjau khusus untuk melihat hasilnya langsung di HP kamu.",
      highlights: [
        "Desain responsif yang rapi di layar HP dan laptop",
        "Bisa minta revisi dan masukan jika ada yang kurang pas",
        "Pengerjaan relatif cepat (rata-rata 3 - 7 hari kerja)",
        "Kode bersih dan loading website yang ringan"
      ]
    },
    {
      id: "LANGKAH 03",
      title: "Peluncuran & Siap Ditunjukkan",
      badge: "Online & Tuntas",
      target: "Tinggal pakai dan bagikan link-nya",
      description:
        "Setelah semuanya sesuai keinginanmu, kami bantu hubungkan ke nama domain pilihan dan meluncurkannya ke internet sampai bisa diakses oleh siapa saja.",
      highlights: [
        "Bantuan setup domain (.com, .my.id, dsb.)",
        "Panduan mudah cara mengganti isi teks dan gambar",
        "Dukungan teknis dan garansi jika ada kendala",
        "File dan hak milik website 100% milikmu"
      ]
    }
  ];

  return (
    <section id="model" className="py-24 border-b border-subtle bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-subtle text-neutral-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Users size={13} />
            <span>06. Alur Kerja Kami</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
            Cara Kami Membantumu. <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Simpel, Terarah, dan Tanpa Bikin Pusing.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-secondary leading-relaxed">
            Tidak ada birokrasi berbelit. Kami mendampingi kamu dari ide awal di kepala hingga websitemu resmi online dan siap dibagikan.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-subtle bg-surface/70 hover:bg-surface-elev hover:border-neutral-500 p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-md group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas border border-subtle text-muted">
                    {m.id}
                  </span>
                  <span className="text-xs font-mono text-neutral-300 font-semibold">
                    {m.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-primary group-hover:text-white transition-colors">
                  {m.title}
                </h3>

                <p className="text-xs text-neutral-400 font-mono font-medium">
                  {m.target}
                </p>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  {m.description}
                </p>

                <div className="pt-4 space-y-2.5 border-t border-subtle">
                  {m.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-primary/90">
                      <CheckCircle2 size={15} className="text-neutral-300 flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-subtle">
                <a
                  href="#inquiry"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-canvas hover:bg-white hover:text-black border border-subtle text-primary font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Mulai dari Langkah 1</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
