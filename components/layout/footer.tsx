"use client";

import React from "react";
import Image from "next/image";
import { Terminal, Activity, PhoneCall, Mail, Github, Globe, ArrowUpRight, HeartHandshake } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-canvas text-secondary text-xs font-mono py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-subtle">
          {/* Column 01: Brand & Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-primary font-bold text-base">
              <div className="w-6 h-6 relative flex-shrink-0">
                <Image
                  src="/assets/brand/logo-mark.svg"
                  alt="4tune.labs mark"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>4tune<span className="text-neutral-300">.labs</span></span>
            </div>
            <p className="text-muted text-xs leading-relaxed font-sans">
              Studio Pembuatan Website &amp; Solusi Teknologi Mahasiswa. Membantu mahasiswa non-IT dan pemilik usaha kecil mewujudkan website impian yang rapi dan siap pakai.
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-muted">
                <Mail size={13} className="text-neutral-300" />
                <a href="mailto:4tune.labs@gmail.com" className="hover:text-primary transition-colors">
                  4tune.labs@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted">
                <Activity size={13} className="text-neutral-300" />
                <span>Base: Indonesia 🇮🇩 // Mahasiswa Rekayasa</span>
              </div>
            </div>
          </div>

          {/* Column 02: The Four Principals */}
          <div className="space-y-3">
            <div className="text-primary font-semibold uppercase tracking-wider text-xs mb-3">
              TIM BUILDER
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <a
                  href="https://felich-dev.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-white transition-colors group"
                >
                  <span className="text-primary font-medium group-hover:text-white">
                    Felich <span className="text-muted font-normal">(Full-Stack &amp; AI)</span>
                  </span>
                  <ArrowUpRight size={13} className="text-muted group-hover:text-white" />
                </a>
              </div>

              <div>
                <a
                  href="https://wa.me/6283894496994"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-white transition-colors group"
                >
                  <span className="text-primary font-medium group-hover:text-white">
                    Sukron <span className="text-muted font-normal">(Server &amp; Database)</span>
                  </span>
                  <ArrowUpRight size={13} className="text-muted group-hover:text-white" />
                </a>
              </div>

              <div>
                <a
                  href="https://wa.me/6283159392826"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-white transition-colors group"
                >
                  <span className="text-primary font-medium group-hover:text-white">
                    Zulkifli <span className="text-muted font-normal">(Alat &amp; IoT)</span>
                  </span>
                  <ArrowUpRight size={13} className="text-muted group-hover:text-white" />
                </a>
              </div>

              <div>
                <a
                  href="https://wa.me/6282162411486"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-white transition-colors group"
                >
                  <span className="text-primary font-medium group-hover:text-white">
                    Dika <span className="text-muted font-normal">(Desain &amp; UI/UX)</span>
                  </span>
                  <ArrowUpRight size={13} className="text-muted group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 03: Core Navigation */}
          <div className="space-y-3">
            <div className="text-primary font-semibold uppercase tracking-wider text-xs mb-3">
              NAVIGASI
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#principals" className="hover:text-primary transition-colors">
                  Tim Kami
                </a>
              </li>
              <li>
                <a href="#playground" className="hover:text-primary transition-colors">
                  Simulasi Proyek
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-primary transition-colors">
                  Layanan &amp; Solusi
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-primary transition-colors">
                  Contoh Karya
                </a>
              </li>
              <li>
                <a href="#model" className="hover:text-primary transition-colors">
                  Alur Kerja
                </a>
              </li>
            </ul>
          </div>

          {/* Column 04: Principles & Trust */}
          <div className="space-y-3">
            <div className="text-primary font-semibold uppercase tracking-wider text-xs mb-3">
              KOMITMEN KAMI
            </div>
            <ul className="space-y-2 text-xs">
              <li className="text-muted">
                Biaya Ramah Mahasiswa &amp; UMKM
              </li>
              <li className="text-muted">
                Bebas Istilah Teknis Membingungkan
              </li>
              <li className="text-muted">
                Pendampingan Sampai Siap Tayang
              </li>
              <li className="text-muted">
                Garansi Perbaikan &amp; Panduan Pakai
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted gap-4">
          <div>
            &copy; 2026 4tune.labs. Dibuat dengan penuh dedikasi oleh 4 mahasiswa rekayasa.
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-300" />
            <span>Terbuka untuk konsultasi &amp; kerja sama</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
