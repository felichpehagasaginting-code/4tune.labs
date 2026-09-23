"use client";

import React, { useState, useRef, useCallback } from "react";

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = Math.round((clampedX / rect.width) * 100);
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className="before-after-section" id="bukti-servis" aria-label="Bukti Nyata Pengerjaan Servis">
      <div className="container">
        <div className="section-head text-center">
          <p className="eyebrow" data-reveal>
            Transparansi Pengerjaan Hardware
          </p>
          <h2 className="h2" data-reveal>
            Geser untuk melihat <em>hasil nyata pengerjaan kami.</em>
          </h2>
          <p data-reveal>
            Bukan sekadar dibersihkan luarnya saja. Kami membongkar modul pendingin, membersihkan sirip heatsink dari kerak debu,
            dan mengganti pasta termal kering dengan formula konduktivitas tinggi.
          </p>
        </div>

        {/* Comparison Showcase Container */}
        <div className="ba-showcase-wrapper" data-reveal>
          <div
            ref={containerRef}
            className="ba-stage"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            role="region"
            aria-label="Komparasi Visual Kondisi Sebelum dan Sesudah Servis"
          >
            {/* "AFTER" Layer (Underneath / Full Width) */}
            <div className="ba-layer ba-after">
              <div className="ba-visual-card after-card">
                <div className="ba-chip clean" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>SESUDAH SERVIS (4tune.labs)</span>
                </div>
                <div className="ba-mockup-content">
                  {/* Schematic representation of clean heatsink & fan */}
                  <svg viewBox="0 0 600 360" className="ba-schematic-svg" aria-hidden="true">
                    <rect width="600" height="360" fill="#14181B" rx="16" />
                    {/* Motherboard Grid Lines */}
                    <path d="M 0 60 L 600 60 M 0 120 L 600 120 M 0 180 L 600 180 M 0 240 L 600 240 M 0 300 L 600 300" stroke="#1D242B" strokeWidth="1" />
                    <path d="M 60 0 L 60 L 360 M 120 0 L 120 L 360 M 180 0 L 180 L 360 M 240 0 L 240 L 360 M 300 0 L 300 L 360 M 360 0 L 360 L 360 M 420 0 L 420 L 360 M 480 0 L 480 L 360 M 540 0 L 540 L 360" stroke="#1D242B" strokeWidth="1" />

                    {/* Clean Polished Copper Heatpipes */}
                    <path d="M 120 180 L 300 180 Q 360 180 360 140 L 360 80 L 500 80" fill="none" stroke="#D97736" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 120 200 L 320 200 Q 380 200 380 160 L 380 100 L 500 100" fill="none" stroke="#E58B4A" strokeWidth="10" strokeLinecap="round" />

                    {/* Clean CPU Die with fresh Honeywell / Arctic MX-4 Paste */}
                    <rect x="90" y="150" width="80" height="80" rx="8" fill="#202A33" stroke="#2E7D57" strokeWidth="3" />
                    <rect x="105" y="165" width="50" height="50" rx="4" fill="#3D9B63" fillOpacity="0.85" />
                    <text x="130" y="195" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">PASTA BARU</text>

                    {/* Fresh Pristine Blower Fan */}
                    <circle cx="480" cy="180" r="75" fill="#1C2329" stroke="#2E7D57" strokeWidth="2.5" />
                    <circle cx="480" cy="180" r="28" fill="#26323B" />
                    {/* Pristine Fan Blades */}
                    {Array.from({ length: 14 }).map((_, i) => (
                      <path
                        key={`after-blade-${i}`}
                        d={`M 480 180 L ${480 + Math.cos((i * 25.7 * Math.PI) / 180) * 68} ${180 + Math.sin((i * 25.7 * Math.PI) / 180) * 68}`}
                        stroke="#65B584"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    ))}
                    {/* Airflow Flow Vectors */}
                    <path d="M 430 110 Q 520 80 570 120" fill="none" stroke="#48C78E" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 440 240 Q 530 270 580 230" fill="none" stroke="#48C78E" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                </div>
                <div className="ba-info-box after-info">
                  <div className="ba-metric">
                    <span className="metric-label">Suhu Full Load</span>
                    <strong className="metric-val text-green">68°C</strong>
                    <span className="metric-sub">Adem &amp; Stabil</span>
                  </div>
                  <div className="ba-metric">
                    <span className="metric-label">Kondisi Kipas</span>
                    <strong className="metric-val text-green">29 dB</strong>
                    <span className="metric-sub">Senyap Berbisik</span>
                  </div>
                  <div className="ba-metric">
                    <span className="metric-label">CPU Clock Speed</span>
                    <strong className="metric-val text-green">4.2 GHz</strong>
                    <span className="metric-sub">Boost Maksimal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* "BEFORE" Layer (Clipped to slider position) */}
            <div
              className="ba-layer ba-before"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <div className="ba-visual-card before-card">
                <div className="ba-chip dirty" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>SEBELUM SERVIS (Kotor &amp; Kering)</span>
                </div>
                <div className="ba-mockup-content">
                  {/* Schematic representation of clogged dirty heatsink & fan */}
                  <svg viewBox="0 0 600 360" className="ba-schematic-svg" aria-hidden="true">
                    <rect width="600" height="360" fill="#1C1816" rx="16" />
                    {/* Motherboard Grid Lines */}
                    <path d="M 0 60 L 600 60 M 0 120 L 600 120 M 0 180 L 600 180 M 0 240 L 600 240 M 0 300 L 600 300" stroke="#261E1A" strokeWidth="1" />
                    <path d="M 60 0 L 60 L 360 M 120 0 L 120 L 360 M 180 0 L 180 L 360 M 240 0 L 240 L 360 M 300 0 L 300 L 360 M 360 0 L 360 L 360 M 420 0 L 420 L 360 M 480 0 L 480 L 360 M 540 0 L 540 L 360" stroke="#261E1A" strokeWidth="1" />

                    {/* Dark Oxidized Heatpipes */}
                    <path d="M 120 180 L 300 180 Q 360 180 360 140 L 360 80 L 500 80" fill="none" stroke="#7A4422" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 120 200 L 320 200 Q 380 200 380 160 L 380 100 L 500 100" fill="none" stroke="#5E3319" strokeWidth="10" strokeLinecap="round" />

                    {/* Dried cracked thermal paste */}
                    <rect x="90" y="150" width="80" height="80" rx="8" fill="#2E201B" stroke="#D9534F" strokeWidth="3" />
                    <rect x="105" y="165" width="50" height="50" rx="4" fill="#665046" />
                    <path d="M 115 170 L 145 200 M 140 170 L 120 205 M 125 180 L 135 185" stroke="#3D2E28" strokeWidth="2.5" />
                    <text x="130" y="210" fill="#ECA29E" fontSize="9" fontWeight="bold" textAnchor="middle">PASTA KERING</text>

                    {/* Dust-clogged Blower Fan */}
                    <circle cx="480" cy="180" r="75" fill="#241B17" stroke="#D9534F" strokeWidth="2.5" />
                    <circle cx="480" cy="180" r="28" fill="#3D302A" />
                    {/* Dusty Fan Blades with grime blobs */}
                    {Array.from({ length: 14 }).map((_, i) => (
                      <path
                        key={`before-blade-${i}`}
                        d={`M 480 180 L ${480 + Math.cos((i * 25.7 * Math.PI) / 180) * 68} ${180 + Math.sin((i * 25.7 * Math.PI) / 180) * 68}`}
                        stroke="#80685C"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    ))}
                    {/* Dust Fluff Overlay */}
                    <ellipse cx="490" cy="140" rx="35" ry="18" fill="#5E4E45" fillOpacity="0.8" />
                    <ellipse cx="460" cy="210" rx="30" ry="15" fill="#5E4E45" fillOpacity="0.85" />
                    <text x="480" y="145" fill="#D2B9AB" fontSize="10" textAnchor="middle" fontWeight="bold">KERAK DEBU</text>
                  </svg>
                </div>
                <div className="ba-info-box before-info">
                  <div className="ba-metric">
                    <span className="metric-label">Suhu Full Load</span>
                    <strong className="metric-val text-red">94°C</strong>
                    <span className="metric-sub">Thermal Throttling</span>
                  </div>
                  <div className="ba-metric">
                    <span className="metric-label">Kondisi Kipas</span>
                    <strong className="metric-val text-red">52 dB</strong>
                    <span className="metric-sub">Bising &amp; Meraung</span>
                  </div>
                  <div className="ba-metric">
                    <span className="metric-label">CPU Clock Speed</span>
                    <strong className="metric-val text-red">2.1 GHz</strong>
                    <span className="metric-sub">Drop Performa -50%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="ba-divider-handle"
              style={{ left: `${sliderPos}%` }}
              role="slider"
              tabIndex={0}
              aria-valuenow={sliderPos}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Geser untuk perbandingan sebelum dan sesudah servis"
              onKeyDown={handleKeyDown}
            >
              <div className="ba-line" />
              <div className="ba-thumb">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                  <polyline points="9 18 3 12 9 6" />
                </svg>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                  <polyline points="15 18 21 12 15 6" />
                </svg>
              </div>
              <div className="ba-line" />
            </div>
          </div>

          <div className="ba-caption">
            <p style={{ display: "inline-flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "var(--amber)" }} aria-hidden="true">
                <line x1="9" y1="18" x2="15" y2="18" />
                <line x1="10" y1="22" x2="14" y2="22" />
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
              </svg>
              <span><em>Geser garis tengah ke kiri / kanan (atau gunakan tombol panah keyboard) untuk membandingkan kondisi modul thermal sebelum dan sesudah penanganan teknisi 4tune.labs.</em></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
