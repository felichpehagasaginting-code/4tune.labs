"use client";

import React from "react";
import { HeroLogoAssembly } from "./hero-logo-assembly.client";
import { InteractiveHeroCanvas } from "./interactive-hero-canvas.client";
import { ArrowRight, Sparkles, GraduationCap, Briefcase, MessageCircle, Laptop } from "lucide-react";
import { useLenis } from "@/providers/smooth-scroll.client";

export function HeroSection() {
  const lenis = useLenis();

  const scrollTo = (target: string) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: -60 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-12 pb-20 sm:pb-28 overflow-hidden border-b border-subtle bg-canvas">
      {/* Interactive Reactive Mouse Canvas */}
      <InteractiveHeroCanvas />

      {/* Subtle Soft Ambient Vignette */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.02] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Friendly Student Builder Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-subtle bg-surface/90 backdrop-blur-md font-mono text-[11px] uppercase tracking-widest text-secondary mb-8 shadow-sm hover:border-neutral-500 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
          <span className="text-primary font-medium">4TUNE.LABS</span>
          <span className="text-muted/60">/</span>
          <span className="text-neutral-300">STUDENT BUILDERS &amp; WEB STUDIO</span>
        </div>

        {/* Display Headline: Down-to-Earth, Friendly, Inspiring */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-primary max-w-5xl mx-auto leading-[1.08]">
          Bikin Website Impian Anda Jadi Nyata,{" "}
          <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Tanpa Ribet Bahasa Teknis.
          </span>
        </h1>

        {/* Sub-Headline: Grounded, approachable for non-IT students & small companies */}
        <p className="mt-6 text-base sm:text-lg text-secondary max-w-2xl mx-auto leading-relaxed font-normal">
          Kami adalah tim mahasiswa rekayasa yang siap membantu mahasiswa non-IT dan pemilik usaha kecil membuat website modern, portofolio keren, hingga proyek IoT sederhana. 
          Konsultasi santai, hasil rapi, dan biaya yang ramah di kantong.
        </p>

        {/* Action CTAs: High-Contrast Minimalist */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => scrollTo("#inquiry")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 active:scale-95 transition-all focus-ring shadow-lg shadow-white/5 cursor-pointer"
          >
            <span>Konsultasi Proyek Gratis</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => scrollTo("#principals")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-surface/80 border border-subtle hover:border-neutral-500 text-primary font-medium text-xs sm:text-sm tracking-wide hover:bg-surface-hover transition-all focus-ring backdrop-blur-md cursor-pointer"
          >
            <Sparkles size={16} className="text-neutral-300" />
            <span>Kenalan dengan Tim Kami</span>
          </button>
        </div>

        {/* Kinetic Hero Logo Assembly Stage */}
        <div className="w-full mt-6">
          <HeroLogoAssembly />
        </div>

        {/* 4 Friendly Pillars of Service */}
        <div className="w-full mt-8 border-y border-subtle bg-surface/40 backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-subtle text-left rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 hover:bg-surface/60 transition-colors">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted mb-2">
              <GraduationCap size={14} className="text-neutral-300" />
              <span>[01] BUAT MAHASISWA</span>
            </div>
            <div className="text-base font-bold text-primary">Website Tugas &amp; Portofolio</div>
            <div className="text-xs text-secondary mt-1">
              Bantu bikin website skripsi, pameran karya, atau portofolio pribadi siap kerja.
            </div>
          </div>

          <div className="p-5 sm:p-6 hover:bg-surface/60 transition-colors">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted mb-2">
              <Briefcase size={14} className="text-neutral-300" />
              <span>[02] BUAT USAHA KECIL</span>
            </div>
            <div className="text-base font-bold text-primary">Company Profile &amp; UMKM</div>
            <div className="text-xs text-secondary mt-1">
              Bikin brand usaha Anda terlihat profesional di Google &amp; mudah dihubungi via WA.
            </div>
          </div>

          <div className="p-5 sm:p-6 hover:bg-surface/60 transition-colors">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted mb-2">
              <MessageCircle size={14} className="text-neutral-300" />
              <span>[03] BAHASA MANUSIA</span>
            </div>
            <div className="text-base font-bold text-primary">Nir-Istilah Membingungkan</div>
            <div className="text-xs text-secondary mt-1">
              Anda cukup jelaskan kebutuhan dan keinginan, biarkan kami yang urus kodenya.
            </div>
          </div>

          <div className="p-5 sm:p-6 hover:bg-surface/60 transition-colors">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted mb-2">
              <Laptop size={14} className="text-neutral-300" />
              <span>[04] TUNTAS &amp; SIAP PAKAI</span>
            </div>
            <div className="text-base font-bold text-primary">Langsung Online</div>
            <div className="text-xs text-secondary mt-1">
              Website langsung siap tayang dengan domain sendiri, cepat dibuka di HP &amp; laptop.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
