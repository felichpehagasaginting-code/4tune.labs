import React from "react";
import { BUNDLES_DATA, BundleItem } from "@/data/bundles-data";

export function CuratedBundles() {
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
            <a
              className="btn btn-primary btn-sm magnetic w-full"
              target="_blank"
              rel="noopener noreferrer"
              href={bundle.waLink}
            >
              {bundle.ctaText} ↗
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
