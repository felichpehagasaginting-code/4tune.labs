import React from "react";

export function LabLocation() {
  const gmapsUrl = "https://www.google.com/maps/search/?api=1&query=Politeknik+Kelapa+Sawit+Citra+Widya+Edukasi+Bekasi";
  const waPickupUrl = "https://wa.me/6283894496994?text=Halo%20Sukron%20%26%20Mamad%20(4tune.labs)%2C%20saya%20di%20sekitar%20Asrama%20%2F%20Kampus%20Citra%20Widya%20Edukasi%2C%20mau%20jadwalkan%20antar-jemput%20servis%20laptop.";

  return (
    <section className="lab-location-section" id="lokasi-lab" aria-label="Lokasi Lab & Antar Jemput">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal>
            Basis Operasional &amp; Antar-Jemput
          </p>
          <h2 className="h2" data-reveal>
            Lab fisik di <em>Asrama Sarana Citra Widya Edukasi.</em>
          </h2>
          <p data-reveal>
            Bukan tempat servis antah-berantah. Kami beroperasi langsung dari lingkungan kampus dengan jaminan keamanan unit,
            akses temu langsung dengan teknisi, dan layanan antar-jemput gratis untuk mahasiswa dan warga sekitar.
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
            <p className="loc-address">
              Area Kampus Politeknik Kelapa Sawit Citra Widya Edukasi (CWE),<br />
              Jl. Gapura No. 1, Cibuntu, Kec. Cibitung / Setu, Kabupaten Bekasi, Jawa Barat 17520.
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
                  <strong>Drop-off Langsung</strong>
                  <p>Bisa antar laptop langsung ke kamar/lab teknisi setelah janjian via WhatsApp.</p>
                </div>
              </div>
              <div className="loc-feat-item">
                <span className="feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </span>
                <div>
                  <strong>Gratis Antar-Jemput (Rp 0)</strong>
                  <p>Khusus area Asrama Mahasiswa SCWE, gedung kampus, dan kosan sekitar radius 2–3 km.</p>
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
                className="btn btn-primary btn-sm magnetic"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Jadwalkan Antar-Jemput Unit ↗
              </a>
            </div>
          </div>

          {/* Coverage Map Schematic Card */}
          <div className="loc-card coverage-card">
            <div className="coverage-badge">ZONA COVERAGE LAYANAN</div>
            <div className="coverage-schematic">
              <svg viewBox="0 0 400 280" className="coverage-map-svg" aria-hidden="true">
                <rect width="400" height="280" fill="#1C1F24" rx="12" />
                {/* Concentric coverage radius rings */}
                <circle cx="200" cy="140" r="110" fill="none" stroke="#2E7D57" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />
                <circle cx="200" cy="140" r="65" fill="rgba(46, 125, 87, 0.08)" stroke="#2E7D57" strokeWidth="1.5" />
                
                {/* Connecting road paths */}
                <path d="M 40 140 L 360 140 M 200 30 L 200 250" stroke="#2B323D" strokeWidth="2.5" />
                <path d="M 90 60 Q 200 140 310 220" stroke="#2B323D" strokeWidth="2" strokeDasharray="2 3" />
                
                {/* Center marker: Asrama SCWE */}
                <circle cx="200" cy="140" r="14" fill="#E7B13F" fillOpacity="0.25" />
                <circle cx="200" cy="140" r="8" fill="#E7B13F" />
                <text x="200" y="120" fill="#E7B13F" fontSize="12" fontWeight="bold" textAnchor="middle">
                  LAB ASRAMA SCWE
                </text>

                {/* Sub-points */}
                <circle cx="160" cy="100" r="4" fill="#3D9B63" />
                <text x="155" y="90" fill="#BAC3CE" fontSize="10" textAnchor="end">Gedung Kampus CWE</text>

                <circle cx="245" cy="165" r="4" fill="#3D9B63" />
                <text x="252" y="178" fill="#BAC3CE" fontSize="10">Kosan Cibuntu</text>

                <circle cx="140" cy="180" r="4" fill="#3D9B63" />
                <text x="135" y="195" fill="#BAC3CE" fontSize="10" textAnchor="end">Kosan Gandamekar</text>

                <circle cx="270" cy="110" r="4" fill="#3D9B63" />
                <text x="278" y="112" fill="#BAC3CE" fontSize="10">Area Setu / Warung Bongkok</text>
              </svg>
            </div>

            <div className="coverage-legend">
              <div className="legend-item">
                <span className="dot dot-green" />
                <span><strong>Zona Hijau (Rp 0):</strong> Asrama Mahasiswa, Kampus SCWE &amp; Kosan Sekitar</span>
              </div>
              <div className="legend-item">
                <span className="dot dot-amber" />
                <span><strong>Zona Luar:</strong> Bisa COD di titik temu yang disepakati bersama teknisi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
