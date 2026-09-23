import React from "react";

export function TrustGuarantee() {
  const guarantees = [
    {
      icon: "🔒",
      badge: "SOP PRIVASI KETAT",
      title: "Zero Data Intrusion (Privasi 100%)",
      desc: "Teknisi dilarang keras membuka file pribadi, foto, dokumen skripsi, atau history chat Anda. Pengecekan teknis hanya mencakup sensor suhu, BIOS, dan benchmark kestabilan perangkat.",
    },
    {
      icon: "🛡️",
      badge: "ORIGINAL DISTRIBUTOR",
      title: "Garansi Part Resmi 1 – 3 Tahun",
      desc: "Seluruh SSD dan RAM yang kami pasok 100% baru dalam kemasan segel resmi (bukan refurbished atau copotan abal-abal). Klaim garansi dibantu tuntas ke distributor resmi.",
    },
    {
      icon: "🔄",
      badge: "JAMINAN KUALITAS",
      title: "Garansi Servis 30 Hari Bebas Biaya",
      desc: "Jika terjadi kendala serupa atau kendala termal pasca pengerjaan dalam rentang 30 hari, teknisi kami siap melakukan servis ulang dan kalibrasi 100% gratis.",
    },
    {
      icon: "📸",
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
      </div>
    </section>
  );
}
