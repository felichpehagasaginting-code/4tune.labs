"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "@/providers/theme-provider.client";
import { useLenis } from "@/providers/smooth-scroll.client";
import {
  Layers,
  FolderGit2,
  Users,
  Shield,
  PhoneCall,
  Sun,
  Moon,
  Copy,
  Mail,
  Check,
  Zap,
  Globe,
  ArrowUpRight
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { theme, toggleTheme } = useTheme();
  const lenis = useLenis();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const scrollTo = (id: string) => {
    onOpenChange(false);
    if (lenis) {
      lenis.scrollTo(id, { offset: -60 });
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* CMDK Container */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-surface border border-subtle shadow-2xl overflow-hidden font-mono text-xs">
        <Command label="4tune.labs Command Menu">
          {/* Search Input */}
          <div className="flex items-center px-4 border-b border-subtle">
            <span className="text-neutral-300 mr-2.5 font-bold">&gt;</span>
            <Command.Input
              autoFocus
              placeholder="Cari navigasi, principal engineer, atau aksi cepat..."
              className="w-full py-4 bg-transparent text-primary text-xs focus:outline-none placeholder:text-muted font-sans"
            />
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-canvas border border-subtle text-muted">
              ESC
            </kbd>
          </div>

          {/* Command List Items */}
          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="py-6 text-center text-muted text-xs">
              Tidak ada perintah yang sesuai.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group heading="NAVIGASI">
              <Command.Item
                onSelect={() => scrollTo("#principals")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <Users size={14} className="text-neutral-300" />
                <span>02. Tim Builder Kami (4 Mahasiswa)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("#playground")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <Zap size={14} className="text-neutral-300" />
                <span>03. Simulasi &amp; Estimasi Proyek</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("#capabilities")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <Layers size={14} className="text-neutral-300" />
                <span>04. Layanan &amp; Solusi Website</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("#showcase")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <FolderGit2 size={14} className="text-neutral-300" />
                <span>05. Contoh Karya &amp; Proyek Kami</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("#model")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <Users size={14} className="text-neutral-300" />
                <span>06. Alur Kerja Kami</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("#inquiry")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <Shield size={14} className="text-neutral-300" />
                <span>07. Konsultasi Santai (Hubungi Kami)</span>
              </Command.Item>
            </Command.Group>

            {/* Principal Hotlines */}
            <Command.Group heading="HUBUNGI TIM KAMI">
              <Command.Item
                onSelect={() => {
                  window.open("https://felich-dev.vercel.app/", "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Globe size={14} className="text-neutral-300" />
                  <span>Kunjungi Portfolio Felich (felich-dev.vercel.app)</span>
                </div>
                <ArrowUpRight size={13} className="text-muted" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open("https://wa.me/6282386526982", "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall size={14} className="text-neutral-300" />
                  <span>Felich (Full-Stack &amp; AI Specialist)</span>
                </div>
                <span className="text-[10px] text-muted">+62 823-8652-6982</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open("https://wa.me/6283894496994", "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall size={14} className="text-neutral-300" />
                  <span>Sukron (Systems &amp; Infra Architect)</span>
                </div>
                <span className="text-[10px] text-muted">+62 838-9449-6994</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open("https://wa.me/6283159392826", "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall size={14} className="text-neutral-300" />
                  <span>Zulkifli (Elektronika &amp; Reparasi HP Specialist)</span>
                </div>
                <span className="text-[10px] text-muted">+62 831-5939-2826</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open("https://wa.me/6282162411486", "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall size={14} className="text-neutral-300" />
                  <span>Dika (Product Engineer &amp; Design Systems)</span>
                </div>
                <span className="text-[10px] text-muted">+62 821-6241-1486</span>
              </Command.Item>
            </Command.Group>

            {/* Quick Actions */}
            <Command.Group heading="AKSI CEPAT">
              <Command.Item
                onSelect={() => copyToClipboard("4tune.labs@gmail.com", "email")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-neutral-300" />
                  <span>Salin Email Studio (4tune.labs@gmail.com)</span>
                </div>
                {copiedText === "email" ? (
                  <Check size={14} className="text-neutral-300" />
                ) : (
                  <Copy size={13} className="text-muted" />
                )}
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  toggleTheme();
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  {theme === "dark" ? (
                    <Sun size={14} className="text-neutral-300" />
                  ) : (
                    <Moon size={14} className="text-neutral-300" />
                  )}
                  <span>Ganti Tema ({theme === "dark" ? "Light Mode" : "Dark Mode"})</span>
                </div>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Bar */}
          <div className="p-3 border-t border-subtle bg-canvas flex items-center justify-between text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span>Navigasi:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-subtle">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-subtle">↓</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-subtle">↵</kbd>
            </span>
            <span>4tune.labs Command Menu</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
