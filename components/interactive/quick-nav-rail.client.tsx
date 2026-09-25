"use client";

import React, { useState, useEffect, useRef } from "react";
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
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: "paket-pilihan",
    label: "Paket",
    icon: (
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
  },
  {
    id: "lokasi-lab",
    label: "Lokasi",
    icon: (
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "karya",
    label: "Karya",
    icon: (
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "tim",
    label: "Tim",
    icon: (
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
  const [activeSection, setActiveSection] = useState<string>("solusi-kendala");
  const [hasMobileCostBar, setHasMobileCostBar] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const lenis = useLenis();

  // Optimized Scroll listener for spy & visibility using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsVisible(scrollY > 400);

          // Check if mobile cost summary bar is currently visible in DOM
          const mobileBarEl = document.querySelector(".mobile-floating-bar.visible");
          setHasMobileCostBar(Boolean(mobileBarEl));

          const spyPos = scrollY + window.innerHeight * 0.35;
          for (const item of QUICK_NAV_ITEMS) {
            const el = document.getElementById(item.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (spyPos >= top && spyPos < top + height) {
                setActiveSection((prev) => (prev !== item.id ? item.id : prev));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update sliding thumb position with hardware-accelerated transform
  useEffect(() => {
    const activeBtn = itemRefs.current[activeSection];
    const container = scrollContainerRef.current;
    if (activeBtn && container) {
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;

      setIndicatorStyle({
        left: btnOffsetLeft,
        width: btnWidth,
      });

      // Smoothly auto-center the active pill without blocking gesture
      const scrollTarget = btnOffsetLeft - container.offsetWidth / 2 + btnWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: "smooth",
      });
    }
  }, [activeSection, isVisible]);

  const handleJump = (targetId: string) => {
    setActiveSection(targetId);
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
      className={`ios-nav-capsule ${hasMobileCostBar ? "with-mobile-bar" : ""}`}
      aria-label="Navigasi Cepat Cerdas"
    >
      <div className="ios-nav-container">
        {/* Swipeable / scrollable track */}
        <div className="ios-nav-track" ref={scrollContainerRef}>
          {/* Animated sliding thumb (Liquid indicator) */}
          <div
            className="ios-nav-indicator"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
            }}
          />

          {QUICK_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                type="button"
                className={`ios-nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleJump(item.id)}
                aria-label={`Lompat ke bagian ${item.label}`}
              >
                <span className="ios-item-icon" aria-hidden="true">{item.icon}</span>
                <span className="ios-item-label">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Separator & Quick Back to Top */}
        <div className="ios-nav-sep" aria-hidden="true" />

        <button
          type="button"
          className="ios-nav-top-btn"
          onClick={handleBackToTop}
          aria-label="Kembali ke atas"
          title="Ke Atas"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
