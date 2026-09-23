"use client";

import React, { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface WorkProject {
  id: string;
  category: "ai" | "web" | "data";
  categoryLabel: string;
  kicker: string;
  title: string;
  description: string;
  chips: string[];
  demoUrl?: string;
  waText: string;
  svgThumb: React.ReactNode;
}

const PROJECTS_DATA: WorkProject[] = [
  {
    id: "felys",
    category: "ai",
    categoryLabel: "AI & Apps",
    kicker: "AI & Edukasi — Dual-Mode Companion",
    title: "Felys: Student Life AI Companion",
    description:
      "Solusi all-in-one dengan Dual-Mode System (Mode Akademik & Mode Keuangan) yang disatukan oleh asisten AI pintar bernama Fio. Dirancang khusus sebagai Always-Open Companion yang sangat ringan dan hemat baterai di laptop mahasiswa.",
    chips: ["Next.js", "AI Assistant (Fio)", "Dual-Mode System", "Lightweight PWA"],
    demoUrl: "https://felys.vercel.app/",
    waText: "Hai Felich, saya tertarik dengan proyek Felys di 4tune.labs.",
    svgThumb: (
      <svg viewBox="0 0 400 250" aria-hidden="true">
        <rect width="400" height="250" fill="#20242B" />
        <g className="pat">
          <line x1="200" y1="20" x2="200" y2="230" stroke="rgba(247,245,239,0.08)" strokeDasharray="3 5" />
          <path d="M70 125 L120 95 L170 125 L120 155 Z" fill="none" stroke="#E7B13F" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M90 137 L90 170 C90 180 150 180 150 170 L150 137" fill="none" stroke="#E7B13F" strokeWidth="2" strokeLinecap="round" />
          <line x1="170" y1="125" x2="170" y2="165" stroke="#E7B13F" strokeWidth="2" />
          <circle cx="170" cy="167" r="3" fill="#E7B13F" />
          <rect x="230" y="90" width="100" height="70" rx="8" fill="none" stroke="#3D9B63" strokeWidth="2.5" />
          <line x1="230" y1="115" x2="330" y2="115" stroke="#3D9B63" strokeWidth="2" />
          <circle cx="280" cy="138" r="10" fill="none" stroke="#3D9B63" strokeWidth="2" />
          <path d="M280 133 L280 143 M277 135 L283 135 M277 141 L283 141" stroke="#3D9B63" strokeWidth="1.5" />
          <circle cx="200" cy="125" r="22" fill="#2C313A" stroke="#E7B13F" strokeWidth="2" />
          <circle cx="200" cy="125" r="8" fill="#3D9B63" />
          <circle cx="200" cy="125" r="36" fill="none" stroke="rgba(231,177,63,0.3)" strokeDasharray="2 6" />
        </g>
      </svg>
    ),
  },
  {
    id: "trpl",
    category: "web",
    categoryLabel: "Web & Platform",
    kicker: "Edutech — Gamified Learning Platform",
    title: "Platform Pemrograman TRPL 2026",
    description:
      "Platform pembelajaran pemrograman interaktif, adaptif, ramah pemula, dan tergamifikasi modern yang dirancang khusus untuk mahasiswa baru Program Studi Teknologi Rekayasa Perangkat Lunak (TRPL) 2026.",
    chips: ["Next.js", "Interactive Playground", "Gamifikasi", "TRPL 2026"],
    demoUrl: "https://pemrograman-trpl.vercel.app/",
    waText: "Hai Felich, saya tertarik dengan platform Pemrograman TRPL.",
    svgThumb: (
      <svg viewBox="0 0 400 250" aria-hidden="true">
        <rect width="400" height="250" fill="#23272D" />
        <g className="pat">
          <rect x="50" y="45" width="300" height="160" rx="10" fill="#1C1F26" stroke="rgba(247,245,239,0.12)" strokeWidth="1.5" />
          <circle cx="70" cy="62" r="4.5" fill="#EF4444" />
          <circle cx="84" cy="62" r="4.5" fill="#E7B13F" />
          <circle cx="98" cy="62" r="4.5" fill="#3D9B63" />
          <text x="120" y="66" fill="#8E95A5" fontSize="10" fontFamily="monospace">trpl-2026/main.ts</text>
          <rect x="70" y="86" width="60" height="7" rx="3" fill="#E7B13F" />
          <rect x="138" y="86" width="90" height="7" rx="3" fill="#8E95A5" opacity="0.6" />
          <rect x="90" y="104" width="140" height="7" rx="3" fill="#3D9B63" />
          <rect x="90" y="122" width="80" height="7" rx="3" fill="#E7B13F" opacity="0.8" />
          <rect x="70" y="140" width="30" height="7" rx="3" fill="#8E95A5" opacity="0.6" />
          <rect x="230" y="150" width="100" height="36" rx="6" fill="#23272D" stroke="#E7B13F" strokeWidth="1.5" />
          <circle cx="248" cy="168" r="8" fill="#E7B13F" />
          <polygon points="248,162 250,166 254,167 251,170 252,174 248,172 244,174 245,170 242,167 246,166" fill="#23272D" />
          <text x="264" y="172" fill="#F7F5EF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">LVL UP</text>
        </g>
      </svg>
    ),
  },
  {
    id: "nettas-ai",
    category: "ai",
    categoryLabel: "AI & Apps",
    kicker: "Computer Vision — Cross-Platform Photobooth",
    title: "Nettas Photobooth AI",
    description:
      "Aplikasi photobooth interaktif berbasis teknologi Kecerdasan Buatan (AI) yang bersifat cross-platform (Windows, Linux, Android, iOS) dengan integrasi filter digital berbasis AI secara real-time.",
    chips: ["Cross-Platform", "Real-Time AI Filters", "Computer Vision", "Multi-OS Support"],
    demoUrl: "https://nettaspbai.vercel.app/",
    waText: "Hai Felich, saya tertarik dengan aplikasi Nettas Photobooth AI.",
    svgThumb: (
      <svg viewBox="0 0 400 250" aria-hidden="true">
        <rect width="400" height="250" fill="#1C1F26" />
        <g className="pat">
          <rect x="60" y="40" width="280" height="170" rx="14" fill="none" stroke="rgba(247,245,239,0.15)" strokeWidth="1.5" />
          <path d="M80 65 L80 55 L90 55" fill="none" stroke="#E7B13F" strokeWidth="3" strokeLinecap="round" />
          <path d="M320 65 L320 55 L310 55" fill="none" stroke="#E7B13F" strokeWidth="3" strokeLinecap="round" />
          <path d="M80 185 L80 195 L90 195" fill="none" stroke="#E7B13F" strokeWidth="3" strokeLinecap="round" />
          <path d="M320 185 L320 195 L310 195" fill="none" stroke="#E7B13F" strokeWidth="3" strokeLinecap="round" />
          <polygon points="200,80 235,115 220,165 180,165 165,115" fill="none" stroke="#3D9B63" strokeWidth="2" />
          <circle cx="200" cy="80" r="4" fill="#E7B13F" />
          <circle cx="235" cy="115" r="4" fill="#3D9B63" />
          <circle cx="220" cy="165" r="4" fill="#3D9B63" />
          <circle cx="180" cy="165" r="4" fill="#3D9B63" />
          <circle cx="165" cy="115" r="4" fill="#3D9B63" />
          <line x1="200" y1="80" x2="200" y2="165" stroke="rgba(61,155,99,0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="165" y1="115" x2="235" y2="115" stroke="rgba(61,155,99,0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="135" y="180" width="130" height="20" rx="10" fill="#23272D" stroke="rgba(247,245,239,0.2)" strokeWidth="1" />
          <text x="200" y="194" textAnchor="middle" fill="#E7B13F" fontSize="9" fontFamily="monospace" fontWeight="bold">AI CROSS-PLATFORM</text>
        </g>
      </svg>
    ),
  },
  {
    id: "sawitgo",
    category: "data",
    categoryLabel: "Otomasi & Data",
    kicker: "Agritech — Distributed Store-and-Forward",
    title: "SawitGO: Smart Harvest Management",
    description:
      "Sistem Cerdas Manajemen Panen Kelapa Sawit berbasis arsitektur terdistribusi Store-and-Forward (tetap jalan saat blank spot di kebun), konsensus hirarkis (Weighted RBAC), dan ketertelusuran spasial standar global (EUDR / RSPO / ISPO).",
    chips: ["Store-and-Forward", "Weighted RBAC", "Spatial GIS", "EUDR & RSPO"],
    waText: "Hai Felich, saya ingin diskusi soal arsitektur SawitGO.",
    svgThumb: (
      <svg viewBox="0 0 400 250" aria-hidden="true">
        <rect width="400" height="250" fill="#23272D" />
        <g className="pat">
          <path d="M120 180 Q140 100 200 90 Q260 100 280 180" fill="none" stroke="#3D9B63" strokeWidth="3" strokeLinecap="round" />
          <line x1="200" y1="90" x2="200" y2="190" stroke="#3D9B63" strokeWidth="2.5" />
          <path d="M200 110 Q230 115 250 135" fill="none" stroke="#3D9B63" strokeWidth="2" />
          <path d="M200 110 Q170 115 150 135" fill="none" stroke="#3D9B63" strokeWidth="2" />
          <path d="M200 140 Q240 145 260 165" fill="none" stroke="#3D9B63" strokeWidth="2" />
          <path d="M200 140 Q160 145 140 165" fill="none" stroke="#3D9B63" strokeWidth="2" />
          <circle cx="100" cy="100" r="14" fill="#2C313A" stroke="#E7B13F" strokeWidth="2" />
          <text x="100" y="104" textAnchor="middle" fill="#E7B13F" fontSize="9" fontFamily="monospace" fontWeight="bold">OFF</text>
          <path d="M115 100 L180 85" stroke="#E7B13F" strokeWidth="2" strokeDasharray="3 4" />
          <circle cx="200" cy="80" r="16" fill="#3D9B63" stroke="#F7F5EF" strokeWidth="2" />
          <circle cx="300" cy="110" r="14" fill="#2C313A" stroke="#3D9B63" strokeWidth="2" />
          <text x="300" y="114" textAnchor="middle" fill="#3D9B63" fontSize="9" fontFamily="monospace" fontWeight="bold">SYNC</text>
          <path d="M285 110 L220 85" stroke="#3D9B63" strokeWidth="2" />
          <rect x="110" y="200" width="180" height="24" rx="12" fill="#1C1F26" stroke="rgba(231,177,63,0.4)" strokeWidth="1" />
          <text x="200" y="216" textAnchor="middle" fill="#F7F5EF" fontSize="10" fontFamily="monospace">EUDR • RSPO • ISPO</text>
        </g>
      </svg>
    ),
  },
  {
    id: "flight-tracker",
    category: "data",
    categoryLabel: "Otomasi & Data",
    kicker: "Data Radar — Real-Time Airfare Intelligence",
    title: "FlightTracker (TicketAI)",
    description:
      "Sistem pemantau harga tiket pesawat otomatis dengan 100% data real-time untuk rute Kualanamu (KNO) menuju Soekarno-Hatta (CGK) pada rentang tanggal dinamis dan analisis fluktuasi harga termurah.",
    chips: ["Real-Time Scraping", "Flight Telemetry", "Price Radar", "Alert Automation"],
    waText: "Hai Felich, saya tertarik dengan sistem FlightTracker TicketAI.",
    svgThumb: (
      <svg viewBox="0 0 400 250" aria-hidden="true">
        <rect width="400" height="250" fill="#20242B" />
        <g className="pat">
          <path d="M60 170 Q 200 40 340 170" fill="none" stroke="#E7B13F" strokeWidth="3" strokeDasharray="6 6" />
          <circle cx="60" cy="170" r="12" fill="#2C313A" stroke="#E7B13F" strokeWidth="2" />
          <text x="60" y="174" textAnchor="middle" fill="#E7B13F" fontSize="8" fontFamily="monospace" fontWeight="bold">KNO</text>
          <circle cx="340" cy="170" r="12" fill="#2C313A" stroke="#3D9B63" strokeWidth="2" />
          <text x="340" y="174" textAnchor="middle" fill="#3D9B63" fontSize="8" fontFamily="monospace" fontWeight="bold">CGK</text>
          <g transform="translate(195, 75) rotate(15)">
            <path d="M0 -12 L4 0 L14 4 L14 8 L4 6 L3 12 L7 15 L7 18 L0 16 L-7 18 L-7 15 L-3 12 L-4 6 L-14 8 L-14 4 L-4 0 Z" fill="#F7F5EF" />
          </g>
          <rect x="130" y="170" width="14" height="30" rx="3" fill="rgba(61,155,99,0.5)" />
          <rect x="155" y="150" width="14" height="50" rx="3" fill="#3D9B63" />
          <rect x="180" y="130" width="14" height="70" rx="3" fill="#E7B13F" />
          <rect x="205" y="145" width="14" height="55" rx="3" fill="rgba(231,177,63,0.7)" />
          <rect x="230" y="160" width="14" height="40" rx="3" fill="rgba(61,155,99,0.7)" />
          <rect x="255" y="175" width="14" height="25" rx="3" fill="#3D9B63" />
          <text x="200" y="222" textAnchor="middle" fill="#8E95A5" fontSize="10" fontFamily="monospace">100% REAL-TIME TELEMETRY</text>
        </g>
      </svg>
    ),
  },
  {
    id: "nettas-ceremonial",
    category: "web",
    categoryLabel: "Web & Platform",
    kicker: "Interactive Web — Ceremonial Tap-Tap Engine",
    title: "Nettas 2026 Ceremonial Opener",
    description:
      "Platform Tap-Tap interaktif dan seru yang dimainkan serentak oleh audiens untuk membuka event resmi NETTAS dari Program Studi Teknologi Rekayasa Perangkat Lunak Politeknik Kelapa Sawit Citra Widya Edukasi.",
    chips: ["Tap-Tap Engine", "Gamified Event", "Web Audio FX", "TRPL Citra Widya Edukasi"],
    waText: "Hai Felich, saya tertarik dengan platform event Nettas 2026.",
    svgThumb: (
      <svg viewBox="0 0 400 250" aria-hidden="true">
        <rect width="400" height="250" fill="#282D36" />
        <g className="pat">
          <circle cx="200" cy="120" r="28" fill="none" stroke="#E7B13F" strokeWidth="2.5" />
          <circle cx="200" cy="120" r="54" fill="none" stroke="#3D9B63" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
          <circle cx="200" cy="120" r="82" fill="none" stroke="#E7B13F" strokeWidth="1.5" strokeDasharray="2 6" opacity="0.5" />
          <circle cx="200" cy="120" r="18" fill="#E7B13F" />
          <circle cx="200" cy="120" r="8" fill="#282D36" />
          <polygon points="120,70 126,80 114,80" fill="#3D9B63" />
          <rect x="280" y="65" width="10" height="10" rx="2" fill="#E7B13F" transform="rotate(25 285 70)" />
          <circle cx="100" cy="150" r="5" fill="#E7B13F" />
          <circle cx="300" cy="155" r="5" fill="#3D9B63" />
          <polygon points="260,180 268,190 252,190" fill="#3D9B63" />
          <rect x="100" y="186" width="200" height="28" rx="6" fill="#1C1F26" stroke="rgba(247,245,239,0.15)" strokeWidth="1" />
          <text x="200" y="205" textAnchor="middle" fill="#F7F5EF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">NETTAS 2026 — TRPL CWE</text>
        </g>
      </svg>
    ),
  },
];

export function WorksShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const filteredProjects = activeCategory === "all"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  // Progressive Disclosure: default shows 2 items to prevent long scroll fatigue!
  const displayedProjects = isExpanded ? filteredProjects : filteredProjects.slice(0, 2);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
    setTimeout(() => ScrollTrigger.refresh(), 150);
  };

  return (
    <div className="works-showcase-wrapper">
      {/* Category Filter Pills */}
      <div className="works-filter-bar" role="tablist" aria-label="Filter Kategori Karya">
        <button
          type="button"
          className={`pill-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => handleCategoryChange("all")}
        >
          Semua Karya ({PROJECTS_DATA.length})
        </button>
        <button
          type="button"
          className={`pill-btn ${activeCategory === "ai" ? "active" : ""}`}
          onClick={() => handleCategoryChange("ai")}
        >
          AI &amp; Apps
        </button>
        <button
          type="button"
          className={`pill-btn ${activeCategory === "web" ? "active" : ""}`}
          onClick={() => handleCategoryChange("web")}
        >
          Web &amp; Platform
        </button>
        <button
          type="button"
          className={`pill-btn ${activeCategory === "data" ? "active" : ""}`}
          onClick={() => handleCategoryChange("data")}
        >
          Otomasi &amp; Data
        </button>
      </div>

      {/* Projects Grid */}
      <div className="works-grid">
        {displayedProjects.map((project) => (
          <article key={project.id} className="card" data-reveal>
            <div className="card-thumb">{project.svgThumb}</div>
            <div className="card-body">
              <span className="card-kicker">{project.kicker}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="card-chips">
                {project.chips.map((chip, i) => (
                  <span key={i}>{chip}</span>
                ))}
              </div>
              <div className="card-actions">
                {project.demoUrl && (
                  <a
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.demoUrl}
                  >
                    <u>Buka Aplikasi</u>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                )}
                <a
                  className={`card-link ${project.demoUrl ? "card-link-muted" : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/6282386526982?text=${encodeURIComponent(project.waText)}`}
                >
                  <u>Tanya Proyek Ini</u>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progressive Disclosure Toggle Button (Solves Long Page Scroll!) */}
      {filteredProjects.length > 2 && (
        <div className="works-expand-container" data-reveal>
          <button
            type="button"
            className="btn btn-ghost works-expand-btn magnetic"
            onClick={toggleExpand}
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <>
                <span>Tampilkan Lebih Ringkas</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </>
            ) : (
              <>
                <span>Lihat {filteredProjects.length - 2} Proyek Lainnya</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
