"use client";

import React, { useState, useEffect } from "react";
import { LAB_NOTES_DATA, LabArticle } from "@/data/lab-notes-data";
import { useLenis } from "@/providers/smooth-scroll.client";

export function LabNotes() {
  const [activeArticle, setActiveArticle] = useState<LabArticle | null>(null);
  const lenis = useLenis();

  // Close modal on Escape key press & manage scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveArticle(null);
      }
    };

    if (activeArticle) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [activeArticle, lenis]);

  return (
    <div className="lab-notes-wrapper">
      <div className="notes-grid">
        {LAB_NOTES_DATA.map((article: LabArticle) => (
          <article
            key={article.id}
            className="note-card"
            data-reveal
            onClick={() => setActiveArticle(article)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveArticle(article);
              }
            }}
          >
            <div className="note-meta-top">
              <span className="note-tag">{article.tag}</span>
              <span className="note-time">{article.readTime}</span>
            </div>

            <h3 className="note-title">{article.title}</h3>
            <p className="note-summary">{article.summary}</p>

            <div className="note-footer">
              <div className="note-author-info">
                <strong>{article.author}</strong>
                <span>{article.role}</span>
              </div>
              <span className="note-read-btn">
                Baca Catatan
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Reader */}
      {activeArticle && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveArticle(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="modal-card"
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-tags">
                <span className="note-tag">{activeArticle.tag}</span>
                <span className="note-time">{activeArticle.readTime} • {activeArticle.date}</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveArticle(null)}
                aria-label="Tutup artikel"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <h2 id="modal-title" className="modal-article-title">
              {activeArticle.title}
            </h2>

            <div className="modal-author-strip">
              <div className="author-avatar-sm">
                {activeArticle.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <strong>{activeArticle.author}</strong>
                <span>
                  {activeArticle.role} — <span className="brand-wordmark"><span className="w4">4</span><span className="wt">tune</span><span className="wl">.labs</span></span>
                </span>
              </div>
            </div>

            <div className="modal-body-prose">
              {activeArticle.content.map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="modal-footer-cta">
              <p>Mengalami kendala serupa atau butuh panduan langsung?</p>
              <a
                className="btn btn-primary btn-sm magnetic"
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/6283894496994?text=Hai%204tune.labs%2C%20saya%20baru%20baca%20Lab%20Notes%20di%20website%20dan%20ingin%20tanya%20lebih%20lanjut."
              >
                Tanya Langsung ke Teknisi / Engineer ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
