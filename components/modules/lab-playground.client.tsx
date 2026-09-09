"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sliders, Sparkles, Clock, CheckCircle2, Smartphone, Globe, MessageCircle, Laptop, ArrowRight } from "lucide-react";

export function LabPlayground() {
  const [projectType, setProjectType] = useState<"mahasiswa" | "umkm" | "app" | "iot">("mahasiswa");
  const [pageCount, setPageCount] = useState(3);
  const [hasWhatsApp, setHasWhatsApp] = useState(true);
  const [hasAnimation, setHasAnimation] = useState(true);
  const [hasDomainSetup, setHasDomainSetup] = useState(true);

  // Dynamic calculated estimates
  const estimatedDays = Math.max(3, pageCount * 1.5 + (projectType === "iot" || projectType === "app" ? 4 : 1));
  const mobileScore = 98 + (hasAnimation ? 1 : 0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw interactive website wireframe mockup on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 350);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.03;

      // Draw Browser Window Frame
      const winX = 24;
      const winY = 20;
      const winW = width - 48;
      const winH = height - 40;

      // Window Background
      ctx.fillStyle = "#12141A";
      ctx.beginPath();
      ctx.roundRect(winX, winY, winW, winH, 12);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Window Header Bar
      ctx.fillStyle = "#181B22";
      ctx.beginPath();
      ctx.roundRect(winX, winY, winW, 28, [12, 12, 0, 0]);
      ctx.fill();

      // Window dots
      const dots = ["#4A505C", "#4A505C", "#4A505C"];
      dots.forEach((dot, idx) => {
        ctx.beginPath();
        ctx.arc(winX + 16 + idx * 12, winY + 14, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = dot;
        ctx.fill();
      });

      // Address Bar Mock
      ctx.fillStyle = "#0E1015";
      ctx.beginPath();
      ctx.roundRect(winX + 60, winY + 6, winW - 120, 16, 4);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "9px monospace";
      ctx.fillText(
        projectType === "mahasiswa"
          ? "https://portofolio-kamu.vercel.app"
          : projectType === "umkm"
          ? "https://bisnis-kamu.com"
          : projectType === "iot"
          ? "https://monitoring-sensor.web.app"
          : "https://app-manajemen.com",
        winX + 70,
        winY + 18
      );

      // Hero Content Inside Mock Window
      const pulseY = Math.sin(tick) * 2;

      // Mock Navbar
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(winX + 24, winY + 44, 48, 6);

      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillRect(winW - 80, winY + 44, 24, 6);
      ctx.fillRect(winW - 48, winY + 44, 24, 6);

      // Mock Hero Headline Lines
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillRect(winX + 24, winY + 70 + pulseY, Math.min(220, winW * 0.55), 12);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillRect(winX + 24, winY + 90 + pulseY, Math.min(180, winW * 0.45), 6);
      ctx.fillRect(winX + 24, winY + 102 + pulseY, Math.min(140, winW * 0.35), 6);

      // Mock Action Button
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(winX + 24, winY + 122 + pulseY, 80, 20, 6);
      ctx.fill();

      // Dynamic Card Blocks based on page count
      const cardsToShow = Math.min(pageCount, 4);
      const cardW = (winW - 48 - (cardsToShow - 1) * 12) / cardsToShow;
      for (let i = 0; i < cardsToShow; i++) {
        const cx = winX + 24 + i * (cardW + 12);
        const cy = winY + 160;
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.beginPath();
        ctx.roundRect(cx, cy, cardW, winH - 180, 8);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.stroke();

        // Card inner skeleton line
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(cx + 8, cy + 12, Math.min(cardW - 16, 50), 5);
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(cx + 8, cy + 24, Math.min(cardW - 16, 40), 4);
      }

      // Floating WhatsApp Widget Mock if enabled
      if (hasWhatsApp) {
        ctx.beginPath();
        ctx.arc(winX + winW - 28, winY + winH - 28, 14, 0, Math.PI * 2);
        ctx.fillStyle = "#25D366";
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText("WA", winX + winW - 37, winY + winH - 24);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [projectType, pageCount, hasWhatsApp, hasAnimation]);

  return (
    <section id="playground" className="py-24 border-b border-subtle bg-canvas relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-subtle text-neutral-300 text-xs font-mono uppercase tracking-wider mb-4">
              <Sparkles size={13} />
              <span>03. Simulasi &amp; Estimasi Proyek</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
              Rancang Website Sesuai Kebutuhanmu. <br />
              <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Cek Estimasi Waktu &amp; Fiturnya di Sini.
              </span>
            </h2>
            <p className="mt-4 text-base text-secondary leading-relaxed">
              Pilih jenis website yang ingin kamu buat dan atur fitur-fiturnya. Tampilan visual di samping akan otomatis menyesuaikan secara live!
            </p>
          </div>

          {/* Preset Project Types */}
          <div className="flex flex-wrap items-center gap-2 bg-surface/80 p-1.5 rounded-xl border border-subtle backdrop-blur-md">
            <button
              onClick={() => setProjectType("mahasiswa")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                projectType === "mahasiswa"
                  ? "bg-white text-black font-bold shadow-sm"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Portofolio Mahasiswa
            </button>
            <button
              onClick={() => setProjectType("umkm")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                projectType === "umkm"
                  ? "bg-white text-black font-bold shadow-sm"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Profil Usaha / UMKM
            </button>
            <button
              onClick={() => setProjectType("app")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                projectType === "app"
                  ? "bg-white text-black font-bold shadow-sm"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Web App / Dashboard
            </button>
            <button
              onClick={() => setProjectType("iot")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                projectType === "iot"
                  ? "bg-white text-black font-bold shadow-sm"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Sensor &amp; IoT
            </button>
          </div>
        </div>

        {/* Interactive Customizer Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-surface/80 border border-subtle rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-subtle">
                <span className="font-mono text-xs uppercase tracking-wider text-muted flex items-center gap-2">
                  <Sliders size={14} className="text-neutral-300" />
                  Atur Kebutuhan Halaman
                </span>
                <span className="text-[11px] font-mono text-neutral-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  Live Preview
                </span>
              </div>

              {/* Slider: Page Count */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-secondary">Perkiraan Jumlah Halaman/Bagian:</span>
                  <span className="text-primary font-bold">{pageCount} Halaman</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-canvas rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted">
                  <span>1 Halaman (Simple)</span>
                  <span>4 Halaman (Standar)</span>
                  <span>8+ Halaman (Komplit)</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-canvas border border-subtle cursor-pointer hover:border-neutral-500 transition-colors">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-primary flex items-center gap-1.5">
                      <MessageCircle size={14} className="text-neutral-300" />
                      <span>Tombol WhatsApp Langsung</span>
                    </div>
                    <div className="text-[11px] text-muted">Pengunjung bisa langsung chat WA dengan satu klik</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasWhatsApp}
                    onChange={(e) => setHasWhatsApp(e.target.checked)}
                    className="w-4 h-4 accent-white rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-canvas border border-subtle cursor-pointer hover:border-neutral-500 transition-colors">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-primary flex items-center gap-1.5">
                      <Sparkles size={14} className="text-neutral-300" />
                      <span>Animasi Interaktif Halus</span>
                    </div>
                    <div className="text-[11px] text-muted">Bikin website terlihat hidup dan tidak membosankan</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasAnimation}
                    onChange={(e) => setHasAnimation(e.target.checked)}
                    className="w-4 h-4 accent-white rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-canvas border border-subtle cursor-pointer hover:border-neutral-500 transition-colors">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-primary flex items-center gap-1.5">
                      <Globe size={14} className="text-neutral-300" />
                      <span>Bantuan Setup Domain &amp; Hosting</span>
                    </div>
                    <div className="text-[11px] text-muted">Kami bantu sambungkan domain .com / .my.id sampai online</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasDomainSetup}
                    onChange={(e) => setHasDomainSetup(e.target.checked)}
                    className="w-4 h-4 accent-white rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="p-3.5 rounded-xl bg-canvas/70 border border-subtle text-[11px] text-secondary flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-neutral-300 flex-shrink-0 mt-0.5" />
              <span>
                Masih bingung butuh berapa halaman? Tenang aja, kita bisa diskusiin dulu secara santai lewat WhatsApp!
              </span>
            </div>
          </div>

          {/* Wireframe Mockup Canvas & Estimates Dashboard (7 cols) */}
          <div className="lg:col-span-7 bg-surface/50 border border-subtle rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
            {/* Live Metrics Header Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10 mb-4">
              <div className="p-3 rounded-xl bg-canvas/80 border border-subtle">
                <div className="text-[10px] font-mono uppercase text-muted mb-1 flex items-center gap-1">
                  <Clock size={12} />
                  <span>Estimasi Waktu</span>
                </div>
                <div className="text-xl font-mono font-bold text-white">{Math.round(estimatedDays)} Hari Kerja</div>
                <div className="text-[10px] text-muted font-mono">Bisa lebih cepat jika materi siap</div>
              </div>

              <div className="p-3 rounded-xl bg-canvas/80 border border-subtle">
                <div className="text-[10px] font-mono uppercase text-muted mb-1 flex items-center gap-1">
                  <Smartphone size={12} />
                  <span>Mobile Friendly</span>
                </div>
                <div className="text-xl font-mono font-bold text-primary">{mobileScore}% Rapi</div>
                <div className="text-[10px] text-muted font-mono">Nyaman dibuka di layar HP</div>
              </div>

              <div className="p-3 rounded-xl bg-canvas/80 border border-subtle col-span-2 sm:col-span-1">
                <div className="text-[10px] font-mono uppercase text-muted mb-1 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>Pendampingan</span>
                </div>
                <div className="text-xl font-mono font-bold text-white">100% Tuntas</div>
                <div className="text-[10px] text-muted font-mono">Diajarin cara pakainya</div>
              </div>
            </div>

            {/* Central Canvas Visualizer Stage */}
            <div className="relative w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden bg-canvas/90 border border-subtle flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            <div className="mt-4 pt-3 border-t border-subtle flex items-center justify-between">
              <span className="text-xs text-secondary font-mono">
                Tertarik bikin website seperti ini?
              </span>
              <a
                href="#inquiry"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline"
              >
                <span>Konsultasikan Sekarang</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
