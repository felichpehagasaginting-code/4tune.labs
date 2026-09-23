"use client";

import React, { useState, useEffect } from "react";
import { useLenis } from "@/providers/smooth-scroll.client";

interface QuickNavItem {
  id: string;
  label: string;
  icon: string;
}

const QUICK_NAV_ITEMS: QuickNavItem[] = [
  { id: "solusi-kendala", label: "Solusi", icon: "⚡" },
  { id: "paket-pilihan", label: "Paket", icon: "🛠️" },
  { id: "kalkulator-biaya", label: "Kalkulator", icon: "💰" },
  { id: "bukti-servis", label: "Bukti", icon: "🔬" },
  { id: "lokasi-lab", label: "Lokasi SCWE", icon: "📍" },
  { id: "karya", label: "Karya", icon: "💼" },
  { id: "tim", label: "Tim", icon: "👥" },
];

export function QuickNavRail() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show rail only after scrolling past the hero fold
      setIsVisible(scrollY > 450);

      // Scroll spy for quick nav
      const spyPos = scrollY + window.innerHeight * 0.4;
      for (const item of QUICK_NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (spyPos >= top && spyPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJump = (targetId: string) => {
    if (lenis) {
      lenis.scrollTo(`#${targetId}`, { offset: -72 });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      className="quick-nav-rail"
      aria-label="Navigasi Cepat Antar Section"
      data-reveal
    >
      <div className="quick-nav-pills">
        <span className="quick-nav-hint">Lompat Cepat:</span>
        {QUICK_NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`quick-pill ${isActive ? "active" : ""}`}
              onClick={() => handleJump(item.id)}
              aria-label={`Lompat ke bagian ${item.label}`}
            >
              <span className="pill-icon" aria-hidden="true">{item.icon}</span>
              <span className="pill-label">{item.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          className="quick-pill top-pill"
          onClick={handleBackToTop}
          aria-label="Kembali ke paling atas"
          title="Ke Atas"
        >
          <span className="pill-icon" aria-hidden="true">🔝</span>
          <span className="pill-label">Atas</span>
        </button>
      </div>
    </aside>
  );
}
