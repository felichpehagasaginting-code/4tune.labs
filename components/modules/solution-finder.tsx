"use client";

import React, { useState } from "react";
import { SOLUTIONS_DATA, SolutionItem } from "@/data/solutions-data";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SolutionFinder() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string>(SOLUTIONS_DATA[0].id);

  const filteredSolutions = activeCategory === "all"
    ? SOLUTIONS_DATA
    : SOLUTIONS_DATA.filter((item) => item.category === activeCategory);

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

  return (
    <div className="solution-finder-wrapper">
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
        {filteredSolutions.map((item: SolutionItem, idx: number) => {
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
        })}
      </div>
    </div>
  );
}
