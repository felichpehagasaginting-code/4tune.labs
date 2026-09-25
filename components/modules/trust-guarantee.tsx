import React from "react";

export function TrustGuarantee() {
  const guarantees = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      badge: "SOP PRIVASI KETAT",
      title: "Zero Data Intrusion (Privasi 100%)",
      desc: "Teknisi dilarang keras membuka file pribadi, foto, dokumen skripsi, atau history chat Anda. Pengecekan teknis hanya mencakup sensor suhu, BIOS, dan benchmark kestabilan perangkat.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
      badge: "ORIGINAL DISTRIBUTOR",
      title: "Garansi Part Resmi 1 – 3 Tahun",
      desc: "Seluruh SSD dan RAM yang kami pasok 100% baru dalam kemasan segel resmi (bukan refurbished atau copotan abal-abal). Klaim garansi dibantu tuntas ke distributor resmi.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      ),
      badge: "JAMINAN KUALITAS",
      title: "Garansi Servis 30 Hari Bebas Biaya",
      desc: "Jika terjadi kendala serupa atau kendala termal pasca pengerjaan dalam rentang 30 hari, teknisi kami siap melakukan servis ulang dan kalibrasi 100% gratis.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      badge: "TRANSPARANSI PENUH",
      title: "Dokumentasi Foto / Video Nyata",
      desc: "Anda akan menerima dokumentasi foto/video kondisi internal laptop sebelum dan sesudah pengerjaan sebagai bukti otentik bahwa servis dilakukan secara tuntas dan presisi.",
    },
  ];

  return (
    <section className="trust-guarantee-section" id="jaminan-garansi" aria-label="Standar Garansi dan Keamanan Data">
      <div className="container">
        <div className="section-head text-center">
          <p className="eyebrow" data-reveal>
            Integritas &amp; Standar Operasional
          </p>
          <h2 className="h2" data-reveal>
            Privasi data Anda aman. <em>Garansi kami jelas &amp; tertulis.</em>
          </h2>
          <p data-reveal>
            Banyak orang ragu menyervis laptop karena takut data pribadinya diintip atau part ditukar.
            Di 4tune.labs, etika rekayasa dan transparansi adalah harga mati.
          </p>
        </div>

        <div className="guarantee-grid" data-reveal>
          {guarantees.map((item, index) => (
            <div key={index} className="guarantee-card">
              <div className="guarantee-card-header">
                <span className="guarantee-icon" aria-hidden="true">{item.icon}</span>
                <span className="guarantee-badge">{item.badge}</span>
              </div>
              <h3 className="guarantee-title">{item.title}</h3>
              <p className="guarantee-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="guarantee-pickup-banner" data-reveal>
          <div className="pickup-banner-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div className="pickup-banner-text">
            <strong>SOP Antar-Jemput Unit &amp; Drop-Off Transparan</strong>
            <p>
              <strong>Gratis (Rp 0):</strong> Khusus berlaku untuk jarak yang masuk akal ditempuh dengan <em>jalan kaki</em> (dalam lingkungan Asrama SCWE, antar kamar/gedung asrama, dan kawasan utama kampus Politeknik CWE).<br />
              <strong>Di Luar Jarak Jalan Kaki:</strong> Untuk kosan luar atau area berjarak kendaraan (Cibuntu, Gandamekar, Setu, dsk.), dikenakan ongkos kirim/bensin terjangkau sesuai jarak tempuh (atau opsi titik temu COD / kurir ojol).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
