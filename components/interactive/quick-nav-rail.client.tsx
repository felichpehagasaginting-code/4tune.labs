"use client";

import React, { useState, useEffect } from "react";
import { useLenis } from "@/providers/smooth-scroll.client";

interface QuickNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const QUICK_NAV_ITEMS: QuickNavItem[] = [
  {
    id: "solusi-kendala",
    label: "Solusi",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: "paket-pilihan",
    label: "Paket",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "kalkulator-biaya",
    label: "Kalkulator",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="16" y2="18" />
      </svg>
    ),
  },
  {
    id: "bukti-servis",
    label: "Bukti",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
  },
  {
    id: "lokasi-lab",
    label: "Lokasi SCWE",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "karya",
    label: "Karya",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "tim",
    label: "Tim",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
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
        <span className="quick-nav-hint">Lompat:</span>
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
          <span className="pill-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </span>
          <span className="pill-label">Atas</span>
        </button>
      </div>
    </aside>
  );
}
