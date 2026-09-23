"use client";

import React, { useState, useEffect, useRef } from "react";

export function WhatsAppFab() {
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  // Close popover when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard accessibility: ESC closes popover
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={fabRef}
      className={`whatsapp-fab-container ${isOpen ? "active" : ""}`}
      aria-label="Speed-Dial Kontak WhatsApp"
    >
      {/* Popover Card */}
      {isOpen && (
        <div
          className="whatsapp-fab-popover"
          role="dialog"
          aria-modal="true"
          aria-label="Pilih Divisi Konsultasi WhatsApp"
        >
          <div className="wa-popover-header">
            <div className="wa-status-indicator">
              <span className="wa-status-dot" aria-hidden="true" />
              <span>Teknisi & Developer Siaga</span>
            </div>
            <button
              type="button"
              className="wa-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup menu konsultasi WhatsApp"
            >
              ✕
            </button>
          </div>

          <p className="wa-popover-title">Pilih Divisi Konsultasi Langsung</p>
          <p className="wa-popover-sub">
            Ngobrol langsung dengan eksekutor tanpa perantara. Rata-rata respon &lt; 15 menit.
          </p>

          <div className="wa-channel-list">
            {/* Channel 1: Hardware & Laptop */}
            <a
              href="https://wa.me/6283894496994?text=Halo%20Sukron%20%26%20Mamad%20(4tune.labs)%2C%20saya%20ingin%20konsultasi%20kendala%20%2F%20upgrade%20laptop%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="wa-channel-item channel-hardware"
              onClick={() => setIsOpen(false)}
            >
              <div className="wa-channel-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div className="wa-channel-info">
                <div className="wa-channel-name">
                  <strong>Divisi Servis &amp; Hardware</strong>
                  <span className="wa-badge hardware">Sukron &amp; Mamad</span>
                </div>
                <p className="wa-channel-desc">
                  Upgrade SSD/RAM, ganti pasta termal, laptop mati/lemot, engsel &amp; ganti keyboard.
                </p>
              </div>
              <span className="wa-channel-arrow" aria-hidden="true">↗</span>
            </a>

            {/* Channel 2: Web & AI Software */}
            <a
              href="https://wa.me/6282386526982?text=Halo%20Felich%20%26%20Dika%20(4tune.labs)%2C%20saya%20ingin%20diskusi%20proyek%20website%20%2F%20solusi%20AI%20%2F%20aplikasi."
              target="_blank"
              rel="noopener noreferrer"
              className="wa-channel-item channel-software"
              onClick={() => setIsOpen(false)}
            >
              <div className="wa-channel-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className="wa-channel-info">
                <div className="wa-channel-name">
                  <strong>Divisi Web &amp; Solusi AI</strong>
                  <span className="wa-badge software">Felich &amp; Dika</span>
                </div>
                <p className="wa-channel-desc">
                  Website bisnis/UMKM, landing page, sistem asisten AI, integrasi API &amp; portofolio.
                </p>
              </div>
              <span className="wa-channel-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="wa-popover-footer">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Asrama Sarana Citra Widya Edukasi (Bekasi)
            </span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        className="whatsapp-fab-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Buka speed-dial WhatsApp 4tune.labs"
      >
        <span className="wa-ping-badge" aria-hidden="true" />
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.02 18.09c-1.49 0-2.94-.4-4.22-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a7.94 7.94 0 0 1-1.22-4.32c0-4.41 3.59-8 8.01-8 2.14 0 4.15.83 5.66 2.34a7.94 7.94 0 0 1 2.34 5.66c0 4.41-3.59 8-7.98 8zm4.39-6.01c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06s-1.02-.38-1.94-1.2c-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42l-.46-.01c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
        </svg>
        <span className="wa-fab-label">Chat Teknisi</span>
      </button>
    </div>
  );
}
