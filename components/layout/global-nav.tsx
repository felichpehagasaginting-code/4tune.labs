"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/providers/theme-provider.client";
import { useLenis } from "@/providers/smooth-scroll.client";
import { Sun, Moon, Terminal, ArrowRight, Sparkles } from "lucide-react";

interface GlobalNavProps {
  onOpenCommandPalette: () => void;
}

export function GlobalNav({ onOpenCommandPalette }: GlobalNavProps) {
  const { theme, toggleTheme } = useTheme();
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { offset: -70 });
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-subtle bg-canvas/85 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "body")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/brand/logo-mark.svg"
                alt="4tune.labs logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="font-mono font-bold tracking-tight text-primary text-base">
              4tune<span className="text-neutral-300">.labs</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface border border-subtle text-[11px] font-mono text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            <span>Terima Jasa Website Mahasiswa &amp; UMKM</span>
          </div>
        </div>

        {/* Center: High-Level Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-secondary">
          <a
            href="#principals"
            onClick={(e) => handleNavClick(e, "#principals")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Tim Kami
          </a>
          <a
            href="#playground"
            onClick={(e) => handleNavClick(e, "#playground")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Simulasi Proyek
          </a>
          <a
            href="#capabilities"
            onClick={(e) => handleNavClick(e, "#capabilities")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Layanan
          </a>
          <a
            href="#showcase"
            onClick={(e) => handleNavClick(e, "#showcase")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Contoh Karya
          </a>
          <a
            href="#model"
            onClick={(e) => handleNavClick(e, "#model")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Alur Kerja
          </a>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Theme Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="p-2 rounded-xl bg-surface border border-subtle text-secondary hover:text-primary hover:border-strong transition-all focus-ring cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-surface border border-subtle hover:border-strong text-secondary hover:text-primary text-xs font-mono transition-all focus-ring group cursor-pointer"
          >
            <Terminal size={13} className="text-neutral-300" />
            <kbd className="text-[10px] px-1.5 py-0.5 bg-canvas border border-subtle rounded text-muted group-hover:text-primary">
              ⌘K
            </kbd>
          </button>

          {/* Primary Quick CTA */}
          <a
            href="#inquiry"
            onClick={(e) => handleNavClick(e, "#inquiry")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span>Konsultasi</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </header>
  );
}
