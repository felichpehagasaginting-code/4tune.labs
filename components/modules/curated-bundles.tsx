"use client";

import React from "react";
import { BUNDLES_DATA, BundleItem } from "@/data/bundles-data";
import { useLenis } from "@/providers/smooth-scroll.client";

export function CuratedBundles() {
  const lenis = useLenis();

  const handleCustomizeInEstimator = (bundleId: string) => {
    let presetId = "skripsi";
    let tab: "hardware" | "smartphone" | "software" = "hardware";

    if (bundleId === "bundle-refresh") {
      presetId = "adem";
    } else if (bundleId === "bundle-creators") {
      presetId = "gaming";
    } else if (bundleId === "bundle-umkm" || bundleId === "bundle-portfolio") {
      tab = "software";
    } else if (bundleId === "bundle-hp-revive") {
      tab = "smartphone";
      presetId = "hp-layar";
    }

    // Dispatch event to cost estimator
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("4tune:apply-preset", {
          detail: { presetId, tab },
        })
      );
    }

    // Smooth scroll to calculator
    if (lenis) {
      lenis.scrollTo("#kalkulator-biaya", { offset: -72 });
    } else {
      const el = document.getElementById("kalkulator-biaya");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bundles-grid">
      {BUNDLES_DATA.map((bundle: BundleItem) => (
        <article key={bundle.id} className="bundle-card" data-reveal>
          <div className="bundle-header">
            <span className={`bundle-badge badge-${bundle.badgeType}`}>
              {bundle.badge}
            </span>
            <h3 className="bundle-title">{bundle.title}</h3>
            <p className="bundle-target">{bundle.targetUser}</p>
          </div>

          <div className="bundle-pricing">
            <span className="price-main">{bundle.priceDisplay}</span>
            <span className="price-sub">{bundle.priceNote}</span>
          </div>

          <p className="bundle-desc">{bundle.description}</p>

          <div className="bundle-divider" />

          <ul className="bundle-features">
            {bundle.features.map((feat: string, idx: number) => (
              <li key={idx}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="bundle-footer">
            <span className="bundle-lead">
              DIPERIKSA OLEH<br />
              <strong>{bundle.leadPerson}</strong>
            </span>
            <div className="bundle-actions">
              <a
                className="btn btn-primary btn-sm magnetic w-full"
                target="_blank"
                rel="noopener noreferrer"
                href={bundle.waLink}
              >
                {bundle.ctaText} ↗
              </a>
              <button
                type="button"
                className="btn btn-ghost btn-sm w-full bundle-calc-bridge"
                onClick={() => handleCustomizeInEstimator(bundle.id)}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                <span>Kustomisasi di Kalkulator</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
