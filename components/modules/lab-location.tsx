"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const OpenFreeMapEmbed = dynamic(
  () =>
    import("@/components/modules/openfreemap-view.client").then(
      (mod) => mod.OpenFreeMapEmbed
    ),
  {
    ssr: false,
    loading: () => (
      <div className="ofm-map-wrapper">
        <div className="ofm-loading-overlay">
          <div className="ofm-spinner" />
          <span>Memuat peta...</span>
        </div>
      </div>
    ),
  }
);

const FULL_LAB_ADDRESS_AND_LANDMARK = `4tune.labs — Lab Servis Hardware & Web Studio
Alamat Utama: Asrama Sarana Citra Widya Edukasi (SCWE)
Spesifik Lokasi: Asrama SCWE Gedung 2 Lantai 3
Titik Presisi: -6.300819787803049, 107.06610593887473 (Plus Code: M3X8+MF7)
Alamat Peta: M3X8+MF7, Jl. Raya Setu, Cibuntu, Kec. Cibitung, Kabupaten Bekasi, Jawa Barat 17520 (Kawasan Kampus Politeknik Kelapa Sawit Citra Widya Edukasi).

Patokan Serah Terima Unit:
- Masuk melalui gerbang utama Politeknik CWE / Asrama SCWE (Jl. Raya Setu / Jl. Gapura).
- Langsung tuju Gedung Asrama 2 (hubungi teknisi via WhatsApp saat tiba untuk konfirmasi lantai/kamar dan penjemputan unit).
- Unit/barang laptop atau gadget dapat langsung diserahkan kepada teknisi (Sukron / Mamad / Felich / Dika) untuk diagnosa kilat dan tanda terima digital.
- Layanan Antar-Jemput: Gratis (Rp 0) untuk jarak yang masuk akal ditempuh jalan kaki (lingkungan Asrama SCWE & kawasan utama kampus CWE). Di luar jarak jalan kaki (kosan luar / area Cibuntu / Setu), berlaku ongkir/bensin terjangkau sesuai jarak tempuh (atau opsi titik temu COD/kurir ojol).`;

export function LabLocation() {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<"openfreemap" | "schematic">("openfreemap");
  const gmapsUrl = "https://www.google.com/maps/place/Asrama+Sarana+Citra+Widya/@-6.3008198,107.0661059,17z";
  const waPickupUrl = "https://wa.me/6283894496994?text=Halo%20Sukron%20%26%20Mamad%20(4tune.labs)%2C%20saya%20mau%20jadwalkan%20antar-jemput%20servis%20laptop.%20Lokasi%20saya%20di%20(sebutkan%20area%20asrama%20%2F%20kampus%20%2F%20kosan%20luar)%3A";

  const fallbackCopy = () => {
    if (typeof document === "undefined") return;
    try {
      const textArea = document.createElement("textarea");
      textArea.value = FULL_LAB_ADDRESS_AND_LANDMARK;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      // Fallback silently if clipboard is unavailable
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(FULL_LAB_ADDRESS_AND_LANDMARK)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2600);
        })
        .catch(() => {
          fallbackCopy();
        });
    } else {
      fallbackCopy();
    }
  };

  return (
    <section className="lab-location-section" id="lokasi-lab" aria-label="Lokasi Lab & Antar Jemput">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal>
            Basis Operasional &amp; Layanan Antar-Jemput
          </p>
          <h2 className="h2" data-reveal>
            Lab fisik di <em>Asrama Sarana Citra Widya Edukasi.</em>
          </h2>
          <p data-reveal>
            Bukan tempat servis antah-berantah. Kami beroperasi langsung dari lingkungan kampus dengan jaminan keamanan unit,
            akses temu langsung dengan teknisi, serta aturan antar-jemput yang jelas: gratis untuk jarak jalan kaki (lingkungan asrama &amp; kampus),
            serta berbayar terjangkau sesuai jarak tempuh untuk kosan luar atau area sekitarnya.
          </p>
        </div>

        <div className="location-grid" data-reveal>
          {/* Main Info Card */}
          <div className="loc-card main-address-card">
            <div className="loc-badge">
              <span className="loc-dot" />
              <span>TITIK DROP-OFF &amp; LAB UTAMA</span>
            </div>
            <h3 className="loc-title">Asrama Sarana Citra Widya Edukasi</h3>
            
            <div className="loc-specific-room-badge">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span><strong>Asrama SCWE Gedung 2 Lantai 3</strong> — Detail kamar &amp; serah terima diinfokan via WhatsApp</span>
            </div>

            <p className="loc-address">
              M3X8+MF7, Jl. Raya Setu, Cibuntu, Kec. Cibitung, Kabupaten Bekasi, Jawa Barat 17520<br />
              (Area Asrama SCWE / Kawasan Politeknik Kelapa Sawit Citra Widya Edukasi).
            </p>

            <div className="loc-features-grid">
              <div className="loc-feat-item">
                <span className="feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                <div>
                  <strong>Drop-off Langsung ke Lab (Asrama SCWE)</strong>
                  <p>Unit/barang dapat diserahkan di <strong>Asrama SCWE Gedung 2 Lantai 3</strong>. Konfirmasi kedatangan via WhatsApp untuk penjemputan unit, cek kondisi fisik awal &amp; diagnosa tatap muka dengan teknisi kami.</p>
                </div>
              </div>
              <div className="loc-feat-item">
                <span className="feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </span>
                <div>
                  <strong>Aturan Antar-Jemput Transparan</strong>
                  <p>
                    <strong>Gratis (Rp 0)</strong> untuk jarak yang masuk akal ditempuh dengan <em>jalan kaki</em> (lingkungan Asrama SCWE, antar kamar/gedung asrama, &amp; kampus utama CWE).<br />
                    <strong>Di luar jarak jalan kaki</strong> (kosan luar Cibuntu/Setu atau berjarak kendaraan): dikenakan ongkos kirim/bensin terjangkau sesuai jarak tempuh (atau opsi titik temu COD / kurir ojol).
                  </p>
                </div>
              </div>
              <div className="loc-feat-item">
                <span className="feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </span>
                <div>
                  <strong>Tanda Terima Digital</strong>
                  <p>Nomor seri, kondisi fisik awal, dan keluhan dicatat transparan sebelum pengerjaan dimulai.</p>
                </div>
              </div>
              <div className="loc-feat-item">
                <span className="feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div>
                  <strong>Pengecekan Kilat di Tempat</strong>
                  <p>Diagnosa awal 10-15 menit untuk cek slot RAM kosong, tipe SSD, atau thermal paste.</p>
                </div>
              </div>
            </div>

            <div className="loc-actions">
              <button
                type="button"
                onClick={handleCopy}
                className="btn btn-primary btn-sm magnetic"
                aria-label="Salin Alamat Lengkap & Patokan Lab"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {copied ? (
                    <polyline points="20 6 9 17 4 12" />
                  ) : (
                    <>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </>
                  )}
                </svg>
                <span>{copied ? "✓ Alamat & Patokan Tersalin!" : "Salin Alamat Lengkap & Patokan Lab"}</span>
              </button>

              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm magnetic"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Buka di Google Maps ↗
              </a>
              <a
                href={waPickupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm magnetic"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Jadwalkan Antar-Jemput ↗
              </a>
            </div>
          </div>

          {/* Map & Coverage Card */}
          <div className="loc-card coverage-card">
            <div className="coverage-card-header">
              <span className="coverage-card-title">Navigasi Lokasi</span>

              {/* View Switcher Tabs */}
              <div className="map-view-switcher" role="tablist" aria-label="Pilihan Tampilan Peta">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeView === "openfreemap"}
                  onClick={() => setActiveView("openfreemap")}
                  className={`map-tab-btn ${activeView === "openfreemap" ? "active" : ""}`}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                    <line x1="8" y1="2" x2="8" y2="18" />
                    <line x1="16" y1="6" x2="16" y2="22" />
                  </svg>
                  <span>Peta Interaktif</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeView === "schematic"}
                  onClick={() => setActiveView("schematic")}
                  className={`map-tab-btn ${activeView === "schematic" ? "active" : ""}`}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  <span>Radius &amp; Zona Jemput</span>
                </button>
              </div>
            </div>

            <div className="coverage-card-body">
              <div style={{ display: activeView === "openfreemap" ? "block" : "none" }}>
                <OpenFreeMapEmbed isVisible={activeView === "openfreemap"} />
              </div>

              <div
                className="coverage-schematic"
                style={{ display: activeView === "schematic" ? "flex" : "none" }}
              >
                <svg viewBox="0 0 400 280" className="coverage-map-svg" aria-hidden="true">
                  <rect width="400" height="280" fill="#1C1F24" rx="12" />
                  
                  {/* Outer coverage ring: Zona Berkendara / Berbayar Sesuai Jarak */}
                  <circle cx="200" cy="140" r="112" fill="rgba(217, 119, 6, 0.04)" stroke="#D97706" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.8" />
                  
                  {/* Inner coverage ring: Zona Jalan Kaki / Gratis Rp 0 */}
                  <circle cx="200" cy="140" r="58" fill="rgba(46, 125, 87, 0.14)" stroke="#2E7D57" strokeWidth="1.5" />
                  
                  {/* Connecting road paths */}
                  <path d="M 40 140 L 360 140 M 200 28 L 200 252" stroke="#2B323D" strokeWidth="2" />
                  <path d="M 90 60 Q 200 140 310 220" stroke="#2B323D" strokeWidth="1.8" strokeDasharray="2 3" />
                  
                  {/* Outer zone banner label (Top) */}
                  <text x="200" y="42" fill="#E7B13F" fontSize="8.5" fontWeight="600" textAnchor="middle" letterSpacing="0.4">
                    — ZONA BERKENDARA (BERBAYAR SESUAI JARAK) —
                  </text>

                  {/* Inner zone banner label (Inside Green Circle) */}
                  <text x="200" y="168" fill="#65B584" fontSize="8" fontWeight="700" textAnchor="middle" letterSpacing="0.3">
                    — ZONA JALAN KAKI (GRATIS Rp 0) —
                  </text>

                  {/* Center marker: Asrama SCWE (Lab Utama) */}
                  <circle cx="200" cy="140" r="14" fill="#E7B13F" fillOpacity="0.25" />
                  <circle cx="200" cy="140" r="8" fill="#E7B13F" />
                  <text x="200" y="125" fill="#E7B13F" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                    LAB ASRAMA SCWE (GD. 2 LT. 3)
                  </text>

                  {/* Walking distance point: Kampus CWE (Gratis Rp 0) */}
                  <circle cx="160" cy="98" r="4.5" fill="#65B584" />
                  <text x="154" y="93" fill="#E4E4E7" fontSize="8.5" fontWeight="600" textAnchor="end">Kampus CWE (Gratis)</text>

                  {/* Vehicle distance points (Berbayar Sesuai Jarak) - Positioned safely inside viewBox */}
                  <circle cx="270" cy="138" r="4" fill="#D97706" />
                  <text x="278" y="135" fill="#BAC3CE" fontSize="8.5" fontWeight="500">Kosan Cibuntu</text>
                  <text x="278" y="145" fill="#D97706" fontSize="7.5">(Berbayar)</text>

                  <circle cx="130" cy="190" r="4" fill="#D97706" />
                  <text x="122" y="188" textAnchor="end" fill="#BAC3CE" fontSize="8.5" fontWeight="500">Kosan Gandamekar</text>
                  <text x="122" y="198" textAnchor="end" fill="#D97706" fontSize="7.5">(Berbayar)</text>

                  <circle cx="265" cy="80" r="4" fill="#D97706" />
                  <text x="273" y="78" fill="#BAC3CE" fontSize="8.5" fontWeight="500">Setu / Wr. Bongkok</text>
                  <text x="273" y="88" fill="#D97706" fontSize="7.5">(Berbayar)</text>

                  {/* Bottom policy summary note */}
                  <text x="200" y="268" fill="#8E9AA8" fontSize="8" textAnchor="middle" letterSpacing="0.2">
                    Radius Jalan Kaki Rp 0 • Luar Kampus Dikenakan Ongkir Bensin / Opsi COD
                  </text>
                </svg>
              </div>
            </div>

            {activeView === "schematic" ? (
              <div className="coverage-legend">
                <div className="legend-item">
                  <span className="dot dot-amber" />
                  <span><strong>Titik Drop-Off Lab:</strong> Asrama SCWE Gedung 2 Lt. 3 (Detail via WhatsApp)</span>
                </div>
                <div className="legend-item">
                  <span className="dot dot-green" />
                  <span><strong>Gratis Jalan Kaki (Rp 0):</strong> Lingkungan Asrama SCWE &amp; Gedung Kampus Utama CWE</span>
                </div>
                <div className="legend-item">
                  <span className="dot dot-orange" />
                  <span><strong>Berbayar Sesuai Jarak:</strong> Kosan Luar Cibuntu / Gandamekar / Setu (Ongkir Terjangkau / COD / Kurir Ojol)</span>
                </div>
              </div>
            ) : (
              <div className="map-minimal-footer">
                <span className="loc-dot" />
                <span>Titik Presisi Lab: <strong>Asrama SCWE Gedung 2 Lt. 3</strong> • Antar-jemput gratis jalan kaki, kosan luar berbayar sesuai jarak</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
