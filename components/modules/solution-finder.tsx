"use client";

import React, { useState, useMemo } from "react";
import { SOLUTIONS_DATA, SolutionItem } from "@/data/solutions-data";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SolutionFinder() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string>(SOLUTIONS_DATA[0].id);

  // Filter based on category and live search query
  const filteredSolutions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SOLUTIONS_DATA.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      if (!matchCat) return false;
      if (!query) return true;

      const inSymptom = item.symptom.toLowerCase().includes(query);
      const inDiag = item.diagnosis.toLowerCase().includes(query);
      const inRec = item.recommendation.toLowerCase().includes(query);
      const inBadge = item.badge.toLowerCase().includes(query);
      return inSymptom || inDiag || inRec || inBadge;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const targetItem = cat === "all" ? SOLUTIONS_DATA[0] : SOLUTIONS_DATA.find((s) => s.category === cat);
    if (targetItem) {
      setExpandedId(targetItem.id);
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  };

  return (
    <div className="solution-finder-wrapper">
      {/* Live Search & Filter Bar */}
      <div className="solution-search-container" data-reveal>
        <div className="solution-search-input-wrapper">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="solution-search-input"
            placeholder="Ketik keluhan Anda... (misal: laptop lemot, blue screen, kipas berisik, buat web)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setTimeout(() => ScrollTrigger.refresh(), 100);
            }}
            aria-label="Cari keluhan atau solusi teknologi"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClearSearch}
              aria-label="Hapus kata kunci pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {searchQuery && (
          <div className="search-stats">
            Ditemukan <strong>{filteredSolutions.length}</strong> solusi untuk &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="filter-pills" role="tablist" aria-label="Kategori Gejala Masalah">
        <button
          type="button"
          className={`pill-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => handleCategoryChange("all")}
        >
          Semua Masalah ({SOLUTIONS_DATA.length})
        </button>
        <button
          type="button"
          className={`pill-btn ${activeCategory === "hardware" ? "active" : ""}`}
          onClick={() => handleCategoryChange("hardware")}
        >
          Kendala Laptop &amp; Gadget
        </button>
        <button
          type="button"
          className={`pill-btn ${activeCategory === "business" ? "active" : ""}`}
          onClick={() => handleCategoryChange("business")}
        >
          Kebutuhan Usaha &amp; UMKM
        </button>
        <button
          type="button"
          className={`pill-btn ${activeCategory === "student" ? "active" : ""}`}
          onClick={() => handleCategoryChange("student")}
        >
          Tugas Akhir &amp; Portofolio
        </button>
      </div>

      {/* Accordion List */}
      <div className="accordion-stack">
        {filteredSolutions.length === 0 ? (
          <div className="solution-empty-state" data-reveal>
            <div className="empty-icon">🔍</div>
            <h3>Keluhan Anda Belum Tercantum?</h3>
            <p>
              Jangan khawatir. Tidak semua masalah laptop atau kebutuhan sistem tercatat di daftar ini.
              Sampaikan keluhan spesifik Anda langsung ke teknisi kami untuk diagnosa gratis.
            </p>
            <div className="empty-actions">
              <button type="button" className="btn btn-ghost btn-sm" onClick={handleClearSearch}>
                Reset Pencarian
              </button>
              <a
                className="btn btn-primary btn-sm magnetic"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://wa.me/6283894496994?text=Halo%20teknisi%204tune.labs%2C%20laptop%20saya%20ada%20kendala%20khusus%3A%20${encodeURIComponent(
                  searchQuery
                )}`}
              >
                Konsultasikan Masalah Ini ↗
              </a>
            </div>
          </div>
        ) : (
          filteredSolutions.map((item: SolutionItem, idx: number) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`acc-item ${isExpanded ? "expanded" : ""}`}
                data-reveal
              >
                <button
                  type="button"
                  className="acc-trigger"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                >
                  <div className="acc-left">
                    <span className="acc-num">0{idx + 1}</span>
                    <div className="acc-title-group">
                      <span className="acc-badge">{item.badge}</span>
                      <h3 className="acc-symptom">&ldquo;{item.symptom}&rdquo;</h3>
                    </div>
                  </div>
                  <div className="acc-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={isExpanded ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="acc-content">
                    <div className="acc-grid">
                      <div className="acc-block">
                        <span className="block-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          Diagnosa Masalah:
                        </span>
                        <p>{item.diagnosis}</p>
                      </div>

                      <div className="acc-block">
                        <span className="block-label block-label-sol">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          Solusi Kami:
                        </span>
                        <p>{item.recommendation}</p>
                      </div>
                    </div>

                    <div className="acc-footer">
                      <span className="turnaround-pill">
                        <i /> Estimasi: <strong>{item.turnaroundTime}</strong>
                      </span>
                      <a
                        className="btn btn-primary btn-sm magnetic"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.ctaLink}
                      >
                        {item.ctaText} ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
