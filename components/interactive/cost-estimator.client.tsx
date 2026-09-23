"use client";

import React, { useState, useEffect } from "react";
import { HARDWARE_PRICING, SOFTWARE_PRICING } from "@/data/pricing-matrix";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function formatRupiah(amount: number): string {
  if (amount === 0) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CostEstimator() {
  const [activeTab, setActiveTab] = useState<"hardware" | "software">("hardware");
  const [copiedType, setCopiedType] = useState<string>("");
  const [isRealFriday, setIsRealFriday] = useState<boolean>(false);

  // Hardware State
  const [selectedSsd, setSelectedSsd] = useState<string>("ssd-512-gen3");
  const [selectedRam, setSelectedRam] = useState<string>("ram-none");
  const [ssdFilter, setSsdFilter] = useState<"all" | "gen3" | "gen4">("all");
  const [ramFilter, setRamFilter] = useState<"all" | "ddr4" | "ddr5">("all");
  const [selectedServices, setSelectedServices] = useState<string[]>(["deep-clean"]);
  const [isFridayPromo, setIsFridayPromo] = useState<boolean>(false);

  // Software State
  const [selectedWebType, setSelectedWebType] = useState<string>("web-landing");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["seo-gmaps"]);

  // Detect real-world Friday on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const day = new Date().getDay();
      if (day === 5) {
        setIsRealFriday(true);
        setIsFridayPromo(true);
      }
    }
  }, []);

  const handleTabChange = (tab: "hardware" | "software") => {
    setActiveTab(tab);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  const copyToClipboard = (text: string, identifier: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(identifier);
      setTimeout(() => setCopiedType(""), 2400);
    }
  };

  // Filter hardware options based on generation pills
  const filteredSsdOptions = HARDWARE_PRICING.ssd.options.filter((opt) => {
    if (opt.id === "ssd-none") return true;
    if (ssdFilter === "all") return true;
    return opt.generation === ssdFilter;
  });

  const filteredRamOptions = HARDWARE_PRICING.ram.options.filter((opt) => {
    if (opt.id === "ram-none") return true;
    if (ramFilter === "all") return true;
    return opt.generation === ramFilter;
  });

  // Calculate Hardware Total
  const currentSsd = HARDWARE_PRICING.ssd.options.find((o) => o.id === selectedSsd) || HARDWARE_PRICING.ssd.options[0];
  const currentRam = HARDWARE_PRICING.ram.options.find((o) => o.id === selectedRam) || HARDWARE_PRICING.ram.options[0];
  const currentServices = HARDWARE_PRICING.services.filter((s) => selectedServices.includes(s.id));

  const isZeroSelection = currentSsd.id === "ssd-none" && currentRam.id === "ram-none" && currentServices.length === 0;

  let hwMin = currentSsd.minPrice + currentRam.minPrice + currentServices.reduce((acc, curr) => acc + curr.minPrice, 0);
  let hwMax = currentSsd.maxPrice + currentRam.maxPrice + currentServices.reduce((acc, curr) => acc + curr.maxPrice, 0);

  if (isFridayPromo && !isZeroSelection) {
    hwMin = Math.round(hwMin * 0.9);
    hwMax = Math.round(hwMax * 0.9);
  }

  // Calculate Software Total
  const currentWebType = SOFTWARE_PRICING.type.options.find((o) => o.id === selectedWebType) || SOFTWARE_PRICING.type.options[0];
  const currentAddons = SOFTWARE_PRICING.addons.filter((a) => selectedAddons.includes(a.id));

  const swMin = currentWebType.minPrice + currentAddons.reduce((acc, curr) => acc + curr.minPrice, 0);
  const swMax = currentWebType.maxPrice + currentAddons.reduce((acc, curr) => acc + curr.maxPrice, 0);

  // Generate WhatsApp Links
  const toggleHardwareService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const toggleSoftwareAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const getHardwareWaUrl = () => {
    const ssdLabel =
      currentSsd.id === "ssd-none"
        ? "Tidak perlu SSD"
        : `${currentSsd.label}${currentSsd.speed ? ` [${currentSsd.speed}]` : ""}`;
    const ramLabel =
      currentRam.id === "ram-none"
        ? "Tidak perlu RAM"
        : `${currentRam.label}${currentRam.speed ? ` [${currentRam.speed}]` : ""}`;
    const servLabels = currentServices.length > 0 ? currentServices.map((s) => s.label).join(", ") : "Tidak ada servis tambahan";
    const promoNote = isFridayPromo ? " (Diskon Hari Jum'at Aktif 10%)" : "";

    const message = `Hai Sukron (4tune.labs), saya cek estimasi biaya servis di web:%0A- SSD: ${ssdLabel}%0A- RAM: ${ramLabel}%0A- Layanan: ${servLabels}${promoNote}%0A- Estimasi Biaya: ${formatRupiah(hwMin)} – ${formatRupiah(hwMax)}.%0A%0ABisa bantu cek ketersediaan sparepart dan waktu pengerjaan untuk laptop saya? Terima kasih.`;
    return `https://wa.me/6283894496994?text=${message}`;
  };

  const getSoftwareWaUrl = () => {
    const webLabel = currentWebType.label;
    const addonLabels = currentAddons.length > 0 ? currentAddons.map((a) => a.label).join(", ") : "Standar";

    const message = `Hai Felich (4tune.labs), saya coba kalkulator estimasi web di website:%0A- Tipe Web: ${webLabel}%0A- Fitur Tambahan: ${addonLabels}%0A- Estimasi Biaya: ${formatRupiah(swMin)} – ${formatRupiah(swMax)}.%0A%0ASaya ingin konsultasi lebih lanjut untuk kebutuhan proyek saya. Terima kasih.`;
    return `https://wa.me/6282386526982?text=${message}`;
  };

  return (
    <div className="estimator-wrapper">
      {/* Switcher Tab */}
      <div className="estimator-tabs" role="tablist" aria-label="Pilih Divisi Estimasi">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "hardware"}
          className={`tab-btn ${activeTab === "hardware" ? "active" : ""}`}
          onClick={() => handleTabChange("hardware")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <span>Divisi Servis Hardware &amp; PC</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "software"}
          className={`tab-btn ${activeTab === "software" ? "active" : ""}`}
          onClick={() => handleTabChange("software")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>Divisi Web &amp; Software</span>
        </button>
      </div>

      <div className="estimator-card">
        {activeTab === "hardware" ? (
          /* ================= HARDWARE ESTIMATOR ================= */
          <div className="estimator-grid">
            <div className="estimator-inputs">
              {/* SSD Choice */}
              <div className="input-group">
                <label className="group-label">
                  <span className="num-dot">1</span>
                  <span>{HARDWARE_PRICING.ssd.title}</span>
                </label>
                <p className="group-desc">{HARDWARE_PRICING.ssd.subtitle}</p>

                <div className="gen-pills" role="radiogroup" aria-label="Filter Generasi SSD">
                  <button
                    type="button"
                    className={`gen-pill ${ssdFilter === "all" ? "active" : ""}`}
                    onClick={() => setSsdFilter("all")}
                  >
                    Semua Generasi
                  </button>
                  <button
                    type="button"
                    className={`gen-pill ${ssdFilter === "gen3" ? "active" : ""}`}
                    onClick={() => setSsdFilter("gen3")}
                  >
                    PCIe Gen 3 (Hemat)
                  </button>
                  <button
                    type="button"
                    className={`gen-pill ${ssdFilter === "gen4" ? "active" : ""}`}
                    onClick={() => setSsdFilter("gen4")}
                  >
                    PCIe Gen 4 (Kencang)
                  </button>
                </div>

                <div className="options-grid">
                  {filteredSsdOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSsd(opt.id)}
                      className={`option-btn ${selectedSsd === opt.id ? "selected" : ""}`}
                    >
                      <div className="opt-header-row">
                        <span className="opt-title">{opt.label}</span>
                        {opt.generation && opt.generation !== "all" && (
                          <span className={`gen-badge ${opt.generation}`}>
                            {opt.generation === "gen3" ? "PCIe Gen 3" : "PCIe Gen 4"}
                          </span>
                        )}
                      </div>
                      {opt.description && <span className="opt-desc">{opt.description}</span>}
                      <span className="opt-price">
                        {opt.minPrice === 0
                          ? "Gratis / Lewati"
                          : opt.minPrice === opt.maxPrice
                          ? formatRupiah(opt.minPrice)
                          : `${formatRupiah(opt.minPrice)} – ${formatRupiah(opt.maxPrice)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* RAM Choice */}
              <div className="input-group">
                <label className="group-label">
                  <span className="num-dot">2</span>
                  <span>{HARDWARE_PRICING.ram.title}</span>
                </label>
                <p className="group-desc">{HARDWARE_PRICING.ram.subtitle}</p>

                <div className="gen-pills" role="radiogroup" aria-label="Filter Tipe RAM">
                  <button
                    type="button"
                    className={`gen-pill ${ramFilter === "all" ? "active" : ""}`}
                    onClick={() => setRamFilter("all")}
                  >
                    Semua Tipe
                  </button>
                  <button
                    type="button"
                    className={`gen-pill ${ramFilter === "ddr4" ? "active" : ""}`}
                    onClick={() => setRamFilter("ddr4")}
                  >
                    DDR4 (3200 MHz)
                  </button>
                  <button
                    type="button"
                    className={`gen-pill ${ramFilter === "ddr5" ? "active" : ""}`}
                    onClick={() => setRamFilter("ddr5")}
                  >
                    DDR5 (4800 / 5600 MHz)
                  </button>
                </div>

                <div className="options-grid">
                  {filteredRamOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedRam(opt.id)}
                      className={`option-btn ${selectedRam === opt.id ? "selected" : ""}`}
                    >
                      <div className="opt-header-row">
                        <span className="opt-title">{opt.label}</span>
                        {opt.generation && opt.generation !== "all" && (
                          <span className={`gen-badge ${opt.generation}`}>
                            {opt.generation.toUpperCase()}
                          </span>
                        )}
                      </div>
                      {opt.description && <span className="opt-desc">{opt.description}</span>}
                      <span className="opt-price">
                        {opt.minPrice === 0
                          ? "Tidak Ditambah"
                          : opt.minPrice === opt.maxPrice
                          ? formatRupiah(opt.minPrice)
                          : `${formatRupiah(opt.minPrice)} – ${formatRupiah(opt.maxPrice)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Services */}
              <div className="input-group">
                <label className="group-label">
                  <span className="num-dot">3</span>
                  <span>Layanan Perawatan &amp; Pengerjaan</span>
                </label>
                <div className="checklist-stack">
                  {HARDWARE_PRICING.services.map((serv) => {
                    const isChecked = selectedServices.includes(serv.id);
                    return (
                      <div
                        key={serv.id}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onClick={() => toggleHardwareService(serv.id)}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            toggleHardwareService(serv.id);
                          }
                        }}
                        className={`check-card ${isChecked ? "checked" : ""}`}
                      >
                        <div className="check-box">
                          {isChecked && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div className="check-info">
                          <div className="check-title-row">
                            <span className="check-title">{serv.label}</span>
                            {serv.recommended && <span className="rec-badge">Sangat Dianjurkan</span>}
                          </div>
                          <span className="check-desc">{serv.description}</span>
                        </div>
                        <span className="check-price">+{formatRupiah(serv.minPrice)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Friday Promo Toggle */}
              <div className="friday-toggle-card">
                <label className="toggle-label" htmlFor="friday-checkbox">
                  <input
                    type="checkbox"
                    id="friday-checkbox"
                    checked={isFridayPromo}
                    onChange={(e) => setIsFridayPromo(e.target.checked)}
                  />
                  <div className="toggle-ui" />
                  <div>
                    <span className="toggle-title">
                      {isRealFriday ? "🎉 Promo Spesial Hari Jum'at (Aktif Otomatis)" : "Klaim Promo Spesial Hari Jum'at"}
                    </span>
                    <p className="toggle-sub">Dapatkan potongan diskon 10% untuk seluruh pengerjaan servis hardware di hari Jum&apos;at.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Hardware Result Card */}
            <div className="estimator-summary">
              <div className="summary-card">
                <span className="summary-kicker">Estimasi Biaya Transparan</span>
                <div className="summary-price">
                  {isZeroSelection ? (
                    <span className="price-val" style={{ fontSize: "1.35rem", color: "var(--amber)" }}>
                      Pilih Kebutuhan Anda
                    </span>
                  ) : (
                    <span className="price-val">
                      {formatRupiah(hwMin)} – {formatRupiah(hwMax)}
                    </span>
                  )}
                  {isFridayPromo && !isZeroSelection && (
                    <span className="discount-tag">
                      {isRealFriday ? "🎉 Diskon Jum'at 10% Aktif" : "Sudah Termasuk Diskon 10%"}
                    </span>
                  )}
                </div>
                <p className="summary-explain">
                  {isZeroSelection
                    ? "Silakan pilih minimal satu opsi penyimpanan (SSD), RAM, atau layanan servis untuk memunculkan estimasi biaya."
                    : "Estimasi biaya ALL-IN ramah mahasiswa/UMKM: sudah mencakup unit sparepart baru bergaransi resmi, jasa bongkar-pasang presisi, serta pengujian stabilitas BIOS. Tanpa biaya siluman."}
                </p>

                <div className="summary-list">
                  <div className="s-row">
                    <span>Penyimpanan:</span>
                    <b>{currentSsd.id === "ssd-none" ? "Tidak ada" : currentSsd.label}</b>
                  </div>
                  <div className="s-row">
                    <span>RAM:</span>
                    <b>{currentRam.id === "ram-none" ? "Bawaan" : currentRam.label}</b>
                  </div>
                  <div className="s-row">
                    <span>Layanan Tambahan:</span>
                    <b>{currentServices.length > 0 ? `${currentServices.length} Item Terpilih` : "Nol"}</b>
                  </div>
                </div>

                {isZeroSelection ? (
                  <button type="button" disabled className="btn btn-ghost btn-summary" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    Pilih Kebutuhan Terlebih Dahulu
                  </button>
                ) : (
                  <a
                    className="btn btn-primary btn-summary magnetic"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={getHardwareWaUrl()}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Konsultasikan via WhatsApp ↗
                  </a>
                )}

                <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between" }}>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("+6283894496994", "hw-no")}
                    style={{ fontSize: "11.5px", fontFamily: "var(--font-mono)", color: "rgba(244,242,234,0.7)", background: "none", border: "none", cursor: "pointer", padding: "0" }}
                  >
                    {copiedType === "hw-no" ? "✓ No WA Sukron Tersalin!" : "📋 Salin No WA (+62 838-9449-6994)"}
                  </button>
                </div>

                <span className="summary-guarantee">
                  <i /> Sudah termasuk jasa pemasangan presisi &amp; dites langsung oleh Sukron (&ldquo;Cuklon&rdquo;) &amp; Zulkifli (&ldquo;Mamad&rdquo;).
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ================= SOFTWARE ESTIMATOR ================= */
          <div className="estimator-grid">
            <div className="estimator-inputs">
              {/* Web Type Choice */}
              <div className="input-group">
                <label className="group-label">
                  <span className="num-dot">1</span>
                  <span>{SOFTWARE_PRICING.type.title}</span>
                </label>
                <p className="group-desc">{SOFTWARE_PRICING.type.subtitle}</p>
                <div className="options-stack">
                  {SOFTWARE_PRICING.type.options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedWebType(opt.id)}
                      className={`option-btn option-btn-wide ${selectedWebType === opt.id ? "selected" : ""}`}
                    >
                      <div className="opt-left">
                        <span className="opt-title">{opt.label}</span>
                        {opt.description && <span className="opt-desc">{opt.description}</span>}
                      </div>
                      <span className="opt-price">{formatRupiah(opt.minPrice)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Addons Checklist */}
              <div className="input-group">
                <label className="group-label">
                  <span className="num-dot">2</span>
                  <span>Fitur Tambahan &amp; Kebutuhan Rilis</span>
                </label>
                <div className="checklist-stack">
                  {SOFTWARE_PRICING.addons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onClick={() => toggleSoftwareAddon(addon.id)}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            toggleSoftwareAddon(addon.id);
                          }
                        }}
                        className={`check-card ${isChecked ? "checked" : ""}`}
                      >
                        <div className="check-box">
                          {isChecked && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div className="check-info">
                          <div className="check-title-row">
                            <span className="check-title">{addon.label}</span>
                            {addon.recommended && <span className="rec-badge">Sangat Direkomendasikan</span>}
                          </div>
                          <span className="check-desc">{addon.description}</span>
                        </div>
                        <span className="check-price">+{formatRupiah(addon.minPrice)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Software Result Card */}
            <div className="estimator-summary">
              <div className="summary-card">
                <span className="summary-kicker">Estimasi Pengembangan Web</span>
                <div className="summary-price">
                  <span className="price-val">{formatRupiah(swMin)} – {formatRupiah(swMax)}</span>
                </div>
                <p className="summary-explain">
                  Termasuk source code bersih, konfigurasi domain/hosting bebas biaya bulanan, desain responsif HP/desktop, dan garansi bug.
                </p>

                <div className="summary-list">
                  <div className="s-row">
                    <span>Jenis Proyek:</span>
                    <b>{currentWebType.label.split("(")[0]}</b>
                  </div>
                  <div className="s-row">
                    <span>Fitur Tambahan:</span>
                    <b>{currentAddons.length > 0 ? `${currentAddons.length} Fitur Terpilih` : "Standar Siap Pakai"}</b>
                  </div>
                  <div className="s-row">
                    <span>Server Hosting:</span>
                    <b>Gratis Permanen (Vercel)</b>
                  </div>
                </div>

                <a
                  className="btn btn-primary btn-summary magnetic"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={getSoftwareWaUrl()}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  Diskusikan Rencana via WhatsApp ↗
                </a>

                <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between" }}>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("+6282386526982", "sw-no")}
                    style={{ fontSize: "11.5px", fontFamily: "var(--font-mono)", color: "rgba(244,242,234,0.7)", background: "none", border: "none", cursor: "pointer", padding: "0" }}
                  >
                    {copiedType === "sw-no" ? "✓ No WA Felich Tersalin!" : "📋 Salin No WA (+62 823-8652-6982)"}
                  </button>
                </div>

                <span className="summary-guarantee">
                  <i /> Konsultasi awal santai dipimpin langsung oleh Felich &amp; Dika.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
