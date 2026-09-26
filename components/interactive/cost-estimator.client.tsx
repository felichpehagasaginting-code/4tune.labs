"use client";

import React, { useState, useEffect, useRef } from "react";
import { HARDWARE_PRICING, SMARTPHONE_PRICING, SOFTWARE_PRICING } from "@/data/pricing-matrix";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Drawer } from "vaul";
import { useLenis } from "@/providers/smooth-scroll.client";

function formatRupiah(amount: number): string {
  if (amount === 0) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatRupiah(min);
  return `${formatRupiah(min)} – ${formatRupiah(max)}`;
}

interface PresetItem {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  desc: string;
  ssd: string;
  ram: string;
  services: string[];
  ssdFilter: "all" | "gen3" | "gen4";
  ramFilter: "all" | "ddr4" | "ddr5";
}

interface SmartphonePresetItem {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  desc: string;
  screen: string;
  services: string[];
  screenFilter: "all" | "incell" | "oled" | "original";
}

const HARDWARE_PRESETS: PresetItem[] = [
  {
    id: "skripsi",
    title: "Paket Skripsi Ngebut",
    badge: "Paling Diminati",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    desc: "SSD 512GB + Deep Clean + Backup Data",
    ssd: "ssd-512-gen3",
    ram: "ram-none",
    services: ["deep-clean", "backup-data"],
    ssdFilter: "gen3",
    ramFilter: "all",
  },
  {
    id: "adem",
    title: "Laptop Dingin & Segar",
    badge: "Servis Hemat",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
    desc: "Deep Clean + Repasta Termal Premium",
    ssd: "ssd-none",
    ram: "ram-none",
    services: ["deep-clean"],
    ssdFilter: "all",
    ramFilter: "all",
  },
  {
    id: "bawa-part",
    title: "Bawa Part Sendiri",
    badge: "Jasa Saja",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    desc: "Jasa Pasang SSD/RAM & Tes BIOS",
    ssd: "ssd-none",
    ram: "ram-none",
    services: ["install-only"],
    ssdFilter: "all",
    ramFilter: "all",
  },
  {
    id: "gaming",
    title: "Gaming & Render Maksimal",
    badge: "Performa Tinggi",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    desc: "SSD 1TB Gen 4 + RAM 16GB DDR5 + Deep Clean",
    ssd: "ssd-1tb-gen4",
    ram: "ram-16gb-ddr5",
    services: ["deep-clean"],
    ssdFilter: "gen4",
    ramFilter: "ddr5",
  },
];

const SMARTPHONE_PRESETS: SmartphonePresetItem[] = [
  {
    id: "hp-layar",
    title: "Ganti Layar Segar",
    badge: "Paling Diminati",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    desc: "LCD Incell/OLED + Deep Clean Internal & Mesh",
    screen: "screen-incell",
    services: ["hp-deep-clean"],
    screenFilter: "incell",
  },
  {
    id: "hp-baterai",
    title: "Baterai Awet & Cas Normal",
    badge: "Solusi Cepat",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
      </svg>
    ),
    desc: "Baterai Baru Awet + Port Cas Type-C/Lightning",
    screen: "screen-none",
    services: ["hp-battery", "hp-charging-port"],
    screenFilter: "all",
  },
  {
    id: "hp-matot",
    title: "HP Mati Total / Korslet",
    badge: "Diagnosa Sirkuit",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    desc: "Pelacakan Short VPH_PWR + Thermal Cam + Clean",
    screen: "screen-none",
    services: ["hp-matot", "hp-deep-clean"],
    screenFilter: "all",
  },
  {
    id: "hp-kamera-audio",
    title: "Kamera & Audio Jernih",
    badge: "Audio Visual",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    desc: "Ganti Modul/Lensa Kamera + Pembersihan Mesh Speaker",
    screen: "screen-none",
    services: ["hp-camera", "hp-deep-clean"],
    screenFilter: "all",
  },
  {
    id: "hp-bawa-part",
    title: "Bawa Sparepart Sendiri",
    badge: "Jasa Saja",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    desc: "Jasa Bongkar Pasang Presisi LCD / Baterai",
    screen: "screen-none",
    services: ["hp-install-only"],
    screenFilter: "all",
  },
];

export function CostEstimator() {
  const [activeTab, setActiveTab] = useState<"hardware" | "smartphone" | "software">("hardware");
  const [copiedType, setCopiedType] = useState<string>("");
  const [isRealFriday, setIsRealFriday] = useState<boolean>(false);
  const lenis = useLenis();

  // Hardware State
  const [activePreset, setActivePreset] = useState<string>("skripsi");
  const [laptopModel, setLaptopModel] = useState<string>("");
  const [selectedSsd, setSelectedSsd] = useState<string>("ssd-512-gen3");
  const [selectedRam, setSelectedRam] = useState<string>("ram-none");
  const [ssdFilter, setSsdFilter] = useState<"all" | "gen3" | "gen4">("gen3");
  const [ramFilter, setRamFilter] = useState<"all" | "ddr4" | "ddr5">("all");
  const [selectedServices, setSelectedServices] = useState<string[]>(["deep-clean", "backup-data"]);
  const [isFridayPromo, setIsFridayPromo] = useState<boolean>(false);

  // Smartphone State
  const [activeHpPreset, setActiveHpPreset] = useState<string>("hp-layar");
  const [hpModel, setHpModel] = useState<string>("");
  const [selectedHpScreen, setSelectedHpScreen] = useState<string>("screen-incell");
  const [hpScreenFilter, setHpScreenFilter] = useState<"all" | "incell" | "oled" | "original">("all");
  const [selectedHpServices, setSelectedHpServices] = useState<string[]>(["hp-deep-clean"]);

  // Software State
  const [selectedWebType, setSelectedWebType] = useState<string>("web-landing");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["seo-gmaps"]);

  // UI Micro-interactions & Mobile Drawer State
  const [pricePulse, setPricePulse] = useState<boolean>(false);
  const [showMobileBar, setShowMobileBar] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  // Refs for Scroll Detection
  const estimatorWrapperRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const hpSummaryRef = useRef<HTMLDivElement>(null);
  const swSummaryRef = useRef<HTMLDivElement>(null);

  // Sync Lenis scroll freeze with Vaul Bottom Sheet
  useEffect(() => {
    if (isBottomSheetOpen) {
      if (lenis) lenis.stop();
    } else {
      if (lenis) lenis.start();
    }
    return () => {
      if (lenis) lenis.start();
    };
  }, [isBottomSheetOpen, lenis]);

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

  // Trigger pulse micro-interaction on price changes
  useEffect(() => {
    setPricePulse(true);
    const timer = setTimeout(() => setPricePulse(false), 450);
    return () => clearTimeout(timer);
  }, [
    selectedSsd,
    selectedRam,
    selectedServices,
    isFridayPromo,
    selectedHpScreen,
    selectedHpServices,
    selectedWebType,
    selectedAddons,
  ]);

  // Mobile Sticky Floating Bar Scroll Listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!estimatorWrapperRef.current) return;
      const wrapRect = estimatorWrapperRef.current.getBoundingClientRect();
      const isInside = wrapRect.top < window.innerHeight * 0.75 && wrapRect.bottom > 180;

      const currentCard =
        activeTab === "hardware"
          ? summaryRef.current
          : activeTab === "smartphone"
          ? hpSummaryRef.current
          : swSummaryRef.current;
      let isSummaryInView = false;
      if (currentCard) {
        const sumRect = currentCard.getBoundingClientRect();
        isSummaryInView = sumRect.top < window.innerHeight - 80 && sumRect.bottom > 80;
      }

      setShowMobileBar(isInside && !isSummaryInView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  // Listen to external preset selection (e.g. from CuratedBundles)
  useEffect(() => {
    const handleCustomPreset = (e: Event) => {
      const customEv = e as CustomEvent<{
        presetId: string;
        tab?: "hardware" | "smartphone" | "software";
      }>;
      if (!customEv.detail) return;
      if (customEv.detail.tab) {
        setActiveTab(customEv.detail.tab);
      }
      if (customEv.detail.presetId) {
        const foundHw = HARDWARE_PRESETS.find((p) => p.id === customEv.detail.presetId);
        if (foundHw) {
          applyPreset(foundHw);
        }
        const foundHp = SMARTPHONE_PRESETS.find((p) => p.id === customEv.detail.presetId);
        if (foundHp) {
          applyHpPreset(foundHp);
        }
      }
    };

    window.addEventListener("4tune:apply-preset", handleCustomPreset);
    return () => window.removeEventListener("4tune:apply-preset", handleCustomPreset);
  }, []);

  const handleTabChange = (tab: "hardware" | "smartphone" | "software") => {
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

  const applyPreset = (preset: PresetItem) => {
    setActivePreset(preset.id);
    setSelectedSsd(preset.ssd);
    setSelectedRam(preset.ram);
    setSelectedServices(preset.services);
    setSsdFilter(preset.ssdFilter);
    setRamFilter(preset.ramFilter);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const applyHpPreset = (preset: SmartphonePresetItem) => {
    setActiveHpPreset(preset.id);
    setSelectedHpScreen(preset.screen);
    setSelectedHpServices(preset.services);
    setHpScreenFilter(preset.screenFilter);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const handleSsdSelect = (ssdId: string) => {
    setSelectedSsd(ssdId);
    setActivePreset("custom");
  };

  const handleRamSelect = (ramId: string) => {
    setSelectedRam(ramId);
    setActivePreset("custom");
  };

  const handleHpScreenSelect = (screenId: string) => {
    setSelectedHpScreen(screenId);
    setActiveHpPreset("custom");
  };

  const toggleHardwareService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
    setActivePreset("custom");
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const toggleHpService = (serviceId: string) => {
    setSelectedHpServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
    setActiveHpPreset("custom");
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const toggleSoftwareAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
    setTimeout(() => ScrollTrigger.refresh(), 100);
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

  // Calculate Hardware Total & Discounts
  const currentSsd =
    HARDWARE_PRICING.ssd.options.find((o) => o.id === selectedSsd) || HARDWARE_PRICING.ssd.options[0];
  const currentRam =
    HARDWARE_PRICING.ram.options.find((o) => o.id === selectedRam) || HARDWARE_PRICING.ram.options[0];
  const currentServices = HARDWARE_PRICING.services.filter((s) => selectedServices.includes(s.id));

  const isZeroSelection =
    currentSsd.id === "ssd-none" && currentRam.id === "ram-none" && currentServices.length === 0;

  const rawHwMin =
    currentSsd.minPrice +
    currentRam.minPrice +
    currentServices.reduce((acc, curr) => acc + curr.minPrice, 0);
  const rawHwMax =
    currentSsd.maxPrice +
    currentRam.maxPrice +
    currentServices.reduce((acc, curr) => acc + curr.maxPrice, 0);

  let hwMin = rawHwMin;
  let hwMax = rawHwMax;

  if (isFridayPromo && !isZeroSelection) {
    hwMin = Math.round(hwMin * 0.9);
    hwMax = Math.round(hwMax * 0.9);
  }

  const discountMin = isFridayPromo && !isZeroSelection ? rawHwMin - hwMin : 0;
  const discountMax = isFridayPromo && !isZeroSelection ? rawHwMax - hwMax : 0;

  // Filter Smartphone Options & Calculate
  const filteredHpScreenOptions = SMARTPHONE_PRICING.screen.options.filter((opt) => {
    if (opt.id === "screen-none") return true;
    if (hpScreenFilter === "all") return true;
    return opt.grade === hpScreenFilter;
  });

  const currentHpScreen =
    SMARTPHONE_PRICING.screen.options.find((o) => o.id === selectedHpScreen) ||
    SMARTPHONE_PRICING.screen.options[0];
  const currentHpServices = SMARTPHONE_PRICING.services.filter((s) =>
    selectedHpServices.includes(s.id)
  );

  const isHpZeroSelection =
    currentHpScreen.id === "screen-none" && currentHpServices.length === 0;

  const rawHpMin =
    currentHpScreen.minPrice +
    currentHpServices.reduce((acc, curr) => acc + curr.minPrice, 0);
  const rawHpMax =
    currentHpScreen.maxPrice +
    currentHpServices.reduce((acc, curr) => acc + curr.maxPrice, 0);

  let hpMin = rawHpMin;
  let hpMax = rawHpMax;

  if (isFridayPromo && !isHpZeroSelection) {
    hpMin = Math.round(hpMin * 0.9);
    hpMax = Math.round(hpMax * 0.9);
  }

  const hpDiscountMin = isFridayPromo && !isHpZeroSelection ? rawHpMin - hpMin : 0;
  const hpDiscountMax = isFridayPromo && !isHpZeroSelection ? rawHpMax - hpMax : 0;

  // Calculate Software Total
  const currentWebType =
    SOFTWARE_PRICING.type.options.find((o) => o.id === selectedWebType) || SOFTWARE_PRICING.type.options[0];
  const currentAddons = SOFTWARE_PRICING.addons.filter((a) => selectedAddons.includes(a.id));

  const swMin = currentWebType.minPrice + currentAddons.reduce((acc, curr) => acc + curr.minPrice, 0);
  const swMax = currentWebType.maxPrice + currentAddons.reduce((acc, curr) => acc + curr.maxPrice, 0);

  // Generate WhatsApp Links
  const getHardwareWaUrl = () => {
    if (isZeroSelection) {
      const modelNote = laptopModel.trim() ? ` (tipe: ${laptopModel.trim()})` : "";
      return `https://wa.me/6283894496994?text=Hai%20Sukron%20(4tune.labs)%2C%20saya%20ingin%20konsultasi%20kendala%20laptop%20%2F%20PC%20saya${encodeURIComponent(modelNote)}.%20Bisa%20bantu%20diagnosa%20dan%20cek%20estimasi%20biayanya%3F%20Terima%20kasih.`;
    }
    const modelNote = laptopModel.trim() ? `- Tipe Laptop: ${laptopModel.trim()}%0A` : "";
    const ssdLabel =
      currentSsd.id === "ssd-none"
        ? "Tidak perlu SSD"
        : `${currentSsd.label}${currentSsd.speed ? ` [${currentSsd.speed}]` : ""}`;
    const ramLabel =
      currentRam.id === "ram-none"
        ? "Tidak perlu RAM"
        : `${currentRam.label}${currentRam.speed ? ` [${currentRam.speed}]` : ""}`;
    const servLabels =
      currentServices.length > 0 ? currentServices.map((s) => s.label).join(", ") : "Tidak ada servis tambahan";
    const promoNote = isFridayPromo ? " (Diskon Hari Jum'at Aktif 10%)" : "";

    const message = `Hai Sukron (4tune.labs), saya cek estimasi biaya servis di web:%0A${modelNote}- SSD: ${ssdLabel}%0A- RAM: ${ramLabel}%0A- Layanan: ${servLabels}${promoNote}%0A- Estimasi Biaya: ${formatRupiah(hwMin)} – ${formatRupiah(hwMax)}.%0A- Metode Serah Terima / Antar-Jemput: (Pilih: Drop-off Lab Asrama SCWE / Gratis Jalan Kaki Asrama-Kampus CWE / Ongkir Berbayar Kosan Luar)%0A- Lokasi Saya di: [sebutkan area asrama / kampus / kosan luar]%0A%0ABisa bantu cek ketersediaan sparepart dan jadwal pengerjaannya? Mohon info nomor kamar/titik temu penjemputan unitnya saat saya sampai. Terima kasih.`;
    return `https://wa.me/6283894496994?text=${message}`;
  };

  const getSmartphoneWaUrl = () => {
    if (isHpZeroSelection) {
      const modelNote = hpModel.trim() ? ` (tipe: ${hpModel.trim()})` : "";
      return `https://wa.me/6283159392826?text=Hai%20Zulkifli%20(4tune.labs)%2C%20saya%20ingin%20konsultasi%20kendala%20smartphone%20%2F%20HP%20saya${encodeURIComponent(modelNote)}.%20Bisa%20bantu%20diagnosa%20dan%20cek%20estimasi%20biayanya%3F%20Terima%20kasih.`;
    }
    const modelNote = hpModel.trim() ? `- Tipe HP: ${hpModel.trim()}%0A` : "";
    const screenLabel =
      currentHpScreen.id === "screen-none"
        ? "Tidak perlu ganti LCD"
        : `${currentHpScreen.label}`;
    const servLabels =
      currentHpServices.length > 0
        ? currentHpServices.map((s) => s.label).join(", ")
        : "Tidak ada servis tambahan";
    const promoNote = isFridayPromo ? " (Diskon Hari Jum'at Aktif 10%)" : "";

    const message = `Hai Zulkifli (4tune.labs), saya cek estimasi biaya servis HP di web:%0A${modelNote}- Layar (LCD): ${screenLabel}%0A- Layanan Servis: ${servLabels}${promoNote}%0A- Estimasi Biaya: ${formatRupiah(hpMin)} – ${formatRupiah(hpMax)}.%0A- Metode Serah Terima / Antar-Jemput: (Pilih: Drop-off Lab Asrama SCWE / Gratis Jalan Kaki Asrama-Kampus CWE / Ongkir Berbayar Kosan Luar)%0A- Lokasi Saya di: [sebutkan area asrama / kampus / kosan luar]%0A%0ABisa bantu cek ketersediaan sparepart dan jadwal pengerjaannya? Mohon info nomor kamar/titik temu penjemputan unitnya saat saya sampai. Terima kasih.`;
    return `https://wa.me/6283159392826?text=${message}`;
  };

  const getSoftwareWaUrl = () => {
    const webLabel = currentWebType.label;
    const addonLabels = currentAddons.length > 0 ? currentAddons.map((a) => a.label).join(", ") : "Standar";

    const message = `Hai Felich (4tune.labs), saya coba kalkulator estimasi web di website:%0A- Tipe Web: ${webLabel}%0A- Fitur Tambahan: ${addonLabels}%0A- Estimasi Biaya: ${formatRupiah(swMin)} – ${formatRupiah(swMax)}.%0A%0ASaya ingin konsultasi lebih lanjut untuk kebutuhan proyek saya. Terima kasih.`;
    return `https://wa.me/6282386526982?text=${message}`;
  };

  return (
    <div className="estimator-wrapper" ref={estimatorWrapperRef}>
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
          <span>Servis Laptop &amp; PC</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "smartphone"}
          className={`tab-btn ${activeTab === "smartphone" ? "active" : ""}`}
          onClick={() => handleTabChange("smartphone")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          <span>Servis Smartphone / HP</span>
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
              {/* Feature 4: 1-Click Solution Presets */}
              <div className="estimator-presets-block">
                <span className="presets-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>Pilih Cepat Berdasarkan Kebutuhan (1-Click Preset)</span>
                </span>
                <div className="presets-grid">
                  {HARDWARE_PRESETS.map((preset) => {
                    const isPresetActive = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className={`preset-chip ${isPresetActive ? "active" : ""}`}
                      >
                        <div className="preset-top">
                          <span className="preset-icon">{preset.icon}</span>
                          <span className="preset-badge">{preset.badge}</span>
                        </div>
                        <span className="preset-title">{preset.title}</span>
                        <span className="preset-desc">{preset.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feature 2: Laptop Compatibility Helper & Model Input */}
              <div className="compat-helper">
                <div className="compat-info-row">
                  <div className="compat-badge-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <div className="compat-text">
                    <span className="compat-title">Bingung Tipe Slot RAM atau SSD Laptop Anda?</span>
                    <p className="compat-desc">
                      Tekan <code>Ctrl + Shift + Esc</code> → tab <b>Performance</b> → <b>Memory</b> di Windows untuk cek jenis DDR4/DDR5. Atau ketikkan tipe laptop Anda di bawah ini agar teknisi (Sukron &amp; Mamad) langsung memeriksa kompatibilitasnya.
                    </p>
                  </div>
                </div>
                <div className="laptop-input-wrapper">
                  <label htmlFor="laptop-model-input" className="laptop-input-label">
                    <span>Seri / Tipe Laptop Anda</span>
                    <span className="optional-tag">Opsional • Terhubung Otomatis ke WhatsApp</span>
                  </label>
                  <div className="input-with-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="2" y1="20" x2="22" y2="20" />
                    </svg>
                    <input
                      id="laptop-model-input"
                      type="text"
                      value={laptopModel}
                      onChange={(e) => setLaptopModel(e.target.value)}
                      placeholder="Contoh: Asus TUF Gaming A15, Lenovo Ideapad Slim 3, Acer Nitro 5..."
                      className="laptop-input"
                    />
                    {laptopModel && (
                      <button
                        type="button"
                        onClick={() => setLaptopModel("")}
                        className="clear-input-btn"
                        title="Hapus input"
                        aria-label="Hapus input tipe laptop"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>

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
                      onClick={() => handleSsdSelect(opt.id)}
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
                      onClick={() => handleRamSelect(opt.id)}
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
                      {isRealFriday ? "Promo Spesial Hari Jum'at (Aktif Otomatis)" : "Klaim Promo Spesial Hari Jum'at (Diskon 10%)"}
                    </span>
                    <p className="toggle-sub">
                      Dapatkan potongan diskon 10% untuk seluruh pengerjaan servis hardware. <strong>Booking sekarang untuk pengerjaan atau serah terima unit di hari Jum&apos;at di Lab Asrama SCWE (Gedung 2 Lantai 3)</strong> agar tim teknisi kami dapat menjadwalkan slot servis lab lebih awal.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Hardware Result Card */}
            <div className="estimator-summary" ref={summaryRef}>
              <div className="summary-card">
                <span className="summary-kicker">Estimasi Biaya Transparan</span>
                <div className={`summary-price ${pricePulse ? "price-pulse" : ""}`}>
                  {isZeroSelection ? (
                    <span className="price-val" style={{ fontSize: "1.35rem", color: "var(--amber)" }}>
                      Pilih Kebutuhan Anda
                    </span>
                  ) : (
                    <div className="price-display-group">
                      {isFridayPromo && discountMin > 0 && (
                        <span className="price-original-strikethrough">
                          {formatPriceRange(rawHwMin, rawHwMax)}
                        </span>
                      )}
                      <span className="price-val">
                        {formatPriceRange(hwMin, hwMax)}
                      </span>
                    </div>
                  )}
                  {isFridayPromo && !isZeroSelection && (
                    <span className="discount-tag">
                      {isRealFriday ? "Diskon Jum'at 10% Aktif" : "Sudah Termasuk Diskon 10%"}
                    </span>
                  )}
                </div>
                <p className="summary-explain">
                  {isZeroSelection
                    ? "Silakan pilih minimal satu opsi penyimpanan (SSD), RAM, atau layanan servis untuk memunculkan estimasi biaya."
                    : "Estimasi biaya ALL-IN ramah mahasiswa/UMKM: sudah mencakup unit sparepart baru bergaransi resmi, jasa bongkar-pasang presisi, serta pengujian stabilitas BIOS. Drop-off lab dan antar-jemput jalan kaki (asrama/kampus) gratis Rp 0; kosan luar berbayar sesuai jarak."}
                </p>

                {isFridayPromo && !isZeroSelection && (
                  <div className="friday-edu-banner">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>
                      <strong>Edukasi Booking Jum&apos;at:</strong> Diskon 10% berlaku khusus untuk pengerjaan servis atau serah terima unit di hari Jum&apos;at di Lab Asrama SCWE (Gedung 2 Lt. 3). Booking lebih awal melalui WhatsApp agar slot part &amp; waktu teknisi langsung dialokasikan untuk Anda.
                    </span>
                  </div>
                )}

                {/* Breakdown Table */}
                <div className="summary-breakdown">
                  <div className="breakdown-header">
                    <span>Rincian Biaya Transparan</span>
                    <span className="breakdown-subtitle">Tanpa Biaya Siluman</span>
                  </div>

                  <div className="breakdown-list">
                    {/* SSD Breakdown */}
                    <div className="breakdown-row">
                      <div className="breakdown-left">
                        <span className="breakdown-name">Penyimpanan (SSD)</span>
                        <span className="breakdown-detail">
                          {currentSsd.id === "ssd-none" ? "Tidak perlu SSD baru" : currentSsd.label}
                        </span>
                      </div>
                      <span className="breakdown-val">
                        {currentSsd.minPrice === 0 ? "Rp 0" : `${formatRupiah(currentSsd.minPrice)} – ${formatRupiah(currentSsd.maxPrice)}`}
                      </span>
                    </div>

                    {/* RAM Breakdown */}
                    <div className="breakdown-row">
                      <div className="breakdown-left">
                        <span className="breakdown-name">Memori (RAM)</span>
                        <span className="breakdown-detail">
                          {currentRam.id === "ram-none" ? "RAM bawaan cukup" : currentRam.label}
                        </span>
                      </div>
                      <span className="breakdown-val">
                        {currentRam.minPrice === 0 ? "Rp 0" : `${formatRupiah(currentRam.minPrice)} – ${formatRupiah(currentRam.maxPrice)}`}
                      </span>
                    </div>

                    {/* Services Breakdown */}
                    {currentServices.map((serv) => (
                      <div key={serv.id} className="breakdown-row">
                        <div className="breakdown-left">
                          <span className="breakdown-name">{serv.label}</span>
                          <span className="breakdown-detail">Layanan servis pengerjaan</span>
                        </div>
                        <span className="breakdown-val">
                          +{formatRupiah(serv.minPrice)} – +{formatRupiah(serv.maxPrice)}
                        </span>
                      </div>
                    ))}

                    {/* Installation Status */}
                    {(currentSsd.id !== "ssd-none" || currentRam.id !== "ram-none") && (
                      <div className="breakdown-row breakdown-row-highlight">
                        <div className="breakdown-left">
                          <span className="breakdown-name">Jasa Pasang &amp; Uji Diagnostik</span>
                          <span className="breakdown-detail">Bongkar pasang presisi + memory/burn-in test BIOS</span>
                        </div>
                        <span className="badge-included">Termasuk (Gratis)</span>
                      </div>
                    )}

                    {/* Antar-Jemput */}
                    {!isZeroSelection && (
                      <div className="breakdown-row">
                        <div className="breakdown-left">
                          <span className="breakdown-name">Antar-Jemput / Serah Terima Unit</span>
                          <span className="breakdown-detail">Gratis Rp 0 (jalan kaki asrama/kampus CWE) • Kosan luar berbayar sesuai jarak</span>
                        </div>
                        <span className="breakdown-val" style={{ fontSize: "11px", color: "var(--ink-2)", fontWeight: 500 }}>
                          SOP Jarak
                        </span>
                      </div>
                    )}

                    {/* Friday Promo Discount Highlight */}
                    {isFridayPromo && !isZeroSelection && discountMin > 0 && (
                      <div className="breakdown-row breakdown-row-discount">
                        <div className="breakdown-left">
                          <span className="breakdown-name" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span>Diskon Spesial Hari Jum&apos;at (10%)</span>
                          </span>
                          <span className="breakdown-detail">Potongan langsung seluruh hardware &amp; servis</span>
                        </div>
                        <span className="breakdown-discount-val">
                          -{formatRupiah(discountMin)} – -{formatRupiah(discountMax)}
                        </span>
                      </div>
                    )}
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
                    style={{ fontSize: "11.5px", fontFamily: "var(--font-mono)", color: "rgba(244,242,234,0.7)", background: "none", border: "none", cursor: "pointer", padding: "0", display: "inline-flex", alignItems: "center", gap: "5px" }}
                  >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{copiedType === "hw-no" ? "No WA Sukron Tersalin!" : "Salin No WA (+62 838-9449-6994)"}</span>
                  </button>
                </div>

                <span className="summary-guarantee">
                  <i /> Sudah termasuk jasa pemasangan presisi &amp; dites langsung oleh Sukron (&ldquo;Cuklon&rdquo;) &amp; Zulkifli (&ldquo;Mamad&rdquo;).
                </span>
              </div>
            </div>
          </div>
        ) : activeTab === "smartphone" ? (
          /* ================= SMARTPHONE ESTIMATOR ================= */
          <div className="estimator-grid">
            <div className="estimator-inputs">
              {/* Feature 4: 1-Click Solution Presets */}
              <div className="estimator-presets-block">
                <span className="presets-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>Pilih Cepat Masalah HP (1-Click Preset)</span>
                </span>
                <div className="presets-grid">
                  {SMARTPHONE_PRESETS.map((preset) => {
                    const isPresetActive = activeHpPreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyHpPreset(preset)}
                        className={`preset-chip ${isPresetActive ? "active" : ""}`}
                      >
                        <div className="preset-top">
                          <span className="preset-icon">{preset.icon}</span>
                          <span className="preset-badge">{preset.badge}</span>
                        </div>
                        <span className="preset-title">{preset.title}</span>
                        <span className="preset-desc">{preset.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Smartphone Model Helper & Model Input */}
              <div className="compat-helper">
                <div className="compat-info-row">
                  <div className="compat-badge-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                  <div className="compat-text">
                    <span className="compat-title">Punya Seri / Merk HP Tertentu?</span>
                    <p className="compat-desc">
                      Ketikkan tipe smartphone Anda di bawah ini (misal: iPhone 11, Redmi Note 12, Samsung A54, Poco F3, Oppo Reno). Spesialis reparasi elektronika &amp; gadget kami (Zulkifli &ldquo;Mamad&rdquo;) akan langsung memeriksa ketersediaan part dan kompatibilitasnya.
                    </p>
                  </div>
                </div>
                <div className="laptop-input-wrapper">
                  <label htmlFor="hp-model-input" className="laptop-input-label">
                    <span>Merk &amp; Tipe Smartphone Anda</span>
                    <span className="optional-tag">Opsional • Terhubung Otomatis ke WhatsApp</span>
                  </label>
                  <div className="input-with-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                    <input
                      id="hp-model-input"
                      type="text"
                      value={hpModel}
                      onChange={(e) => setHpModel(e.target.value)}
                      placeholder="Contoh: iPhone 11 / 13, Redmi Note 12, Samsung A54, Poco F3..."
                      className="laptop-input"
                    />
                    {hpModel && (
                      <button
                        type="button"
                        onClick={() => setHpModel("")}
                        className="clear-input-btn"
                        title="Hapus input"
                        aria-label="Hapus input tipe HP"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Screen Choice */}
              <div className="input-group">
                <label className="group-label">
                  <span className="num-dot">1</span>
                  <span>{SMARTPHONE_PRICING.screen.title}</span>
                </label>
                <p className="group-desc">{SMARTPHONE_PRICING.screen.subtitle}</p>

                <div className="gen-pills" role="radiogroup" aria-label="Filter Kualitas Layar HP">
                  <button
                    type="button"
                    className={`gen-pill ${hpScreenFilter === "all" ? "active" : ""}`}
                    onClick={() => setHpScreenFilter("all")}
                  >
                    Semua Kualitas
                  </button>
                  <button
                    type="button"
                    className={`gen-pill ${hpScreenFilter === "incell" ? "active" : ""}`}
                    onClick={() => setHpScreenFilter("incell")}
                  >
                    Incell (Hemat)
                  </button>
                  <button
                    type="button"
                    className={`gen-pill ${hpScreenFilter === "oled" ? "active" : ""}`}
                    onClick={() => setHpScreenFilter("oled")}
                  >
                    OLED / AMOLED
                  </button>
                  <button
                    type="button"
                    className={`gen-pill ${hpScreenFilter === "original" ? "active" : ""}`}
                    onClick={() => setHpScreenFilter("original")}
                  >
                    Original OEM
                  </button>
                </div>

                <div className="options-grid">
                  {filteredHpScreenOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleHpScreenSelect(opt.id)}
                      className={`option-btn ${selectedHpScreen === opt.id ? "selected" : ""}`}
                    >
                      <div className="opt-header-row">
                        <span className="opt-title">{opt.label}</span>
                        {opt.grade && opt.grade !== "none" && (
                          <span className={`gen-badge ${opt.grade === "oled" ? "gen4" : opt.grade === "original" ? "ddr5" : "gen3"}`}>
                            {opt.grade === "incell" ? "Incell Grade" : opt.grade === "oled" ? "OLED Super" : "Original OEM"}
                          </span>
                        )}
                      </div>
                      {opt.description && <span className="opt-desc">{opt.description}</span>}
                      <span className="opt-price">
                        {opt.minPrice === 0
                          ? "Layar Normal (Lewati)"
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
                  <span className="num-dot">2</span>
                  <span>Layanan Perbaikan &amp; Perawatan HP</span>
                </label>
                <div className="checklist-stack">
                  {SMARTPHONE_PRICING.services.map((serv) => {
                    const isChecked = selectedHpServices.includes(serv.id);
                    return (
                      <div
                        key={serv.id}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onClick={() => toggleHpService(serv.id)}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            toggleHpService(serv.id);
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
                <label className="toggle-label" htmlFor="hp-friday-checkbox">
                  <input
                    type="checkbox"
                    id="hp-friday-checkbox"
                    checked={isFridayPromo}
                    onChange={(e) => setIsFridayPromo(e.target.checked)}
                  />
                  <div className="toggle-ui" />
                  <div>
                    <span className="toggle-title">
                      {isRealFriday ? "Promo Spesial Hari Jum'at (Aktif Otomatis)" : "Klaim Promo Spesial Hari Jum'at (Diskon 10%)"}
                    </span>
                    <p className="toggle-sub">
                      Dapatkan potongan diskon 10% untuk seluruh pengerjaan servis &amp; pergantian modul HP. <strong>Booking sekarang untuk serah terima unit di hari Jum&apos;at di Lab Asrama SCWE (Gedung 2 Lantai 3)</strong> agar slot part teknisi kami disiapkan.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Smartphone Result Card */}
            <div className="estimator-summary" ref={hpSummaryRef}>
              <div className="summary-card">
                <span className="summary-kicker">Estimasi Servis HP Transparan</span>
                <div className={`summary-price ${pricePulse ? "price-pulse" : ""}`}>
                  {isHpZeroSelection ? (
                    <span className="price-val" style={{ fontSize: "1.35rem", color: "var(--amber)" }}>
                      Pilih Kebutuhan Anda
                    </span>
                  ) : (
                    <div className="price-display-group">
                      {isFridayPromo && hpDiscountMin > 0 && (
                        <span className="price-original-strikethrough">
                          {formatPriceRange(rawHpMin, rawHpMax)}
                        </span>
                      )}
                      <span className="price-val">
                        {formatPriceRange(hpMin, hpMax)}
                      </span>
                    </div>
                  )}
                  {isFridayPromo && !isHpZeroSelection && (
                    <span className="discount-tag">
                      {isRealFriday ? "Diskon Jum'at 10% Aktif" : "Sudah Termasuk Diskon 10%"}
                    </span>
                  )}
                </div>
                <p className="summary-explain">
                  {isHpZeroSelection
                    ? "Silakan pilih salah satu opsi layar LCD atau layanan servis smartphone untuk memunculkan estimasi biaya."
                    : "Estimasi biaya ALL-IN transparan: sudah mencakup sparepart baru bergaransi, jasa bongkar pasang presisi, lem elastis standar pabrik, serta pengetesan fungsi. Drop-off lab dan antar-jemput jalan kaki (asrama/kampus CWE) gratis Rp 0; kosan luar berbayar sesuai jarak."}
                </p>

                {isFridayPromo && !isHpZeroSelection && (
                  <div className="friday-edu-banner">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>
                      <strong>Edukasi Booking Jum&apos;at:</strong> Diskon 10% berlaku khusus pengerjaan servis atau serah terima unit di hari Jum&apos;at di Lab Asrama SCWE (Gedung 2 Lt. 3). Booking via WhatsApp agar sparepart disiapkan lebih awal.
                    </span>
                  </div>
                )}

                {/* Breakdown Table */}
                <div className="summary-breakdown">
                  <div className="breakdown-header">
                    <span>Rincian Biaya Transparan</span>
                    <span className="breakdown-subtitle">Tanpa Biaya Siluman</span>
                  </div>

                  <div className="breakdown-list">
                    {/* LCD Screen Breakdown */}
                    <div className="breakdown-row">
                      <div className="breakdown-left">
                        <span className="breakdown-name">Layar (LCD / OLED)</span>
                        <span className="breakdown-detail">
                          {currentHpScreen.id === "screen-none" ? "Layar normal (tidak ganti LCD)" : currentHpScreen.label}
                        </span>
                      </div>
                      <span className="breakdown-val">
                        {currentHpScreen.minPrice === 0 ? "Rp 0" : `${formatRupiah(currentHpScreen.minPrice)} – ${formatRupiah(currentHpScreen.maxPrice)}`}
                      </span>
                    </div>

                    {/* Services Breakdown */}
                    {currentHpServices.map((serv) => (
                      <div key={serv.id} className="breakdown-row">
                        <div className="breakdown-left">
                          <span className="breakdown-name">{serv.label}</span>
                          <span className="breakdown-detail">Layanan servis HP</span>
                        </div>
                        <span className="breakdown-val">
                          +{formatRupiah(serv.minPrice)} – +{formatRupiah(serv.maxPrice)}
                        </span>
                      </div>
                    ))}

                    {/* Installation Status */}
                    {currentHpScreen.id !== "screen-none" ? (
                      <div className="breakdown-row breakdown-row-highlight">
                        <div className="breakdown-left">
                          <span className="breakdown-name">Jasa Pasang &amp; Uji Fungsi Layar</span>
                          <span className="breakdown-detail">Pengeleman presisi + kalibrasi touch &amp; sensor</span>
                        </div>
                        <span className="badge-included">Termasuk (Gratis)</span>
                      </div>
                    ) : currentHpServices.length > 0 && !currentHpServices.some((s) => s.id === "hp-install-only") ? (
                      <div className="breakdown-row breakdown-row-highlight">
                        <div className="breakdown-left">
                          <span className="breakdown-name">Jasa Pengerjaan &amp; Quality Control</span>
                          <span className="breakdown-detail">Bongkar pasang presisi + uji kelistrikan &amp; komponen</span>
                        </div>
                        <span className="badge-included">Termasuk (Gratis)</span>
                      </div>
                    ) : null}

                    {/* Antar-Jemput */}
                    {!isHpZeroSelection && (
                      <div className="breakdown-row">
                        <div className="breakdown-left">
                          <span className="breakdown-name">Antar-Jemput / Serah Terima Unit</span>
                          <span className="breakdown-detail">Gratis Rp 0 (jalan kaki asrama/kampus CWE) • Kosan luar berbayar sesuai jarak</span>
                        </div>
                        <span className="breakdown-val" style={{ fontSize: "11px", color: "var(--ink-2)", fontWeight: 500 }}>
                          SOP Jarak
                        </span>
                      </div>
                    )}

                    {/* Friday Promo Discount */}
                    {isFridayPromo && !isHpZeroSelection && hpDiscountMin > 0 && (
                      <div className="breakdown-row breakdown-row-discount">
                        <div className="breakdown-left">
                          <span className="breakdown-name" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span>Diskon Spesial Hari Jum&apos;at (10%)</span>
                          </span>
                          <span className="breakdown-detail">Potongan langsung seluruh servis &amp; modul HP</span>
                        </div>
                        <span className="breakdown-discount-val">
                          -{formatRupiah(hpDiscountMin)} – -{formatRupiah(hpDiscountMax)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {isHpZeroSelection ? (
                  <button type="button" disabled className="btn btn-ghost btn-summary" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    Pilih Kebutuhan Terlebih Dahulu
                  </button>
                ) : (
                  <a
                    className="btn btn-primary btn-summary magnetic"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={getSmartphoneWaUrl()}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Konsultasikan ke Zulkifli via WA ↗
                  </a>
                )}

                <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between" }}>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("+6283159392826", "hp-no")}
                    style={{ fontSize: "11.5px", fontFamily: "var(--font-mono)", color: "rgba(244,242,234,0.7)", background: "none", border: "none", cursor: "pointer", padding: "0", display: "inline-flex", alignItems: "center", gap: "5px" }}
                  >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{copiedType === "hp-no" ? "No WA Zulkifli Tersalin!" : "Salin No WA (+62 831-5939-2826)"}</span>
                  </button>
                </div>

                <span className="summary-guarantee">
                  <i /> Sudah termasuk lem perekat presisi, pembersihan frame, &amp; dites langsung oleh Zulkifli (&ldquo;Mamad&rdquo;).
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
            <div className="estimator-summary" ref={swSummaryRef}>
              <div className="summary-card">
                <span className="summary-kicker">Estimasi Pengembangan Web</span>
                <div className={`summary-price ${pricePulse ? "price-pulse" : ""}`}>
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
                    style={{ fontSize: "11.5px", fontFamily: "var(--font-mono)", color: "rgba(244,242,234,0.7)", background: "none", border: "none", cursor: "pointer", padding: "0", display: "inline-flex", alignItems: "center", gap: "5px" }}
                  >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{copiedType === "sw-no" ? "No WA Felich Tersalin!" : "Salin No WA (+62 823-8652-6982)"}</span>
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

      {/* Feature 1: Mobile Sticky Floating Summary Bar */}
      <div
        className={`mobile-floating-bar ${showMobileBar ? "visible" : ""}`}
        aria-live="polite"
      >
        <div className="mobile-bar-inner">
          <div className="mobile-bar-left">
            <span className="mobile-bar-label">
              Total {activeTab === "hardware" ? "Laptop & PC" : activeTab === "smartphone" ? "Smartphone HP" : "Website"}
              {(activeTab === "hardware" || activeTab === "smartphone") && isFridayPromo && (activeTab === "hardware" ? !isZeroSelection : !isHpZeroSelection) && (
                <span className="mobile-bar-promo">Disc 10%</span>
              )}
            </span>
            <span className={`mobile-bar-price ${pricePulse ? "price-pulse" : ""}`}>
              {activeTab === "hardware" ? (
                isZeroSelection ? (
                  "Pilih Kebutuhan"
                ) : (
                  <span className="mobile-bar-price-wrap">
                    {isFridayPromo && discountMin > 0 && (
                      <span className="price-original-strikethrough mobile-strike">
                        {formatPriceRange(rawHwMin, rawHwMax)}
                      </span>
                    )}
                    <span>{formatPriceRange(hwMin, hwMax)}</span>
                  </span>
                )
              ) : activeTab === "smartphone" ? (
                isHpZeroSelection ? (
                  "Pilih Kebutuhan"
                ) : (
                  <span className="mobile-bar-price-wrap">
                    {isFridayPromo && hpDiscountMin > 0 && (
                      <span className="price-original-strikethrough mobile-strike">
                        {formatPriceRange(rawHpMin, rawHpMax)}
                      </span>
                    )}
                    <span>{formatPriceRange(hpMin, hpMax)}</span>
                  </span>
                )
              ) : (
                formatPriceRange(swMin, swMax)
              )}
            </span>
          </div>
          <div className="mobile-bar-right">
            <button
              type="button"
              className="mobile-bar-details-btn"
              onClick={() => setIsBottomSheetOpen(true)}
              aria-label="Buka rincian estimasi biaya"
            >
              Rincian
            </button>
            <a
              className="btn btn-primary mobile-bar-cta"
              target="_blank"
              rel="noopener noreferrer"
              href={
                activeTab === "hardware"
                  ? getHardwareWaUrl()
                  : activeTab === "smartphone"
                  ? getSmartphoneWaUrl()
                  : getSoftwareWaUrl()
              }
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Chat WA ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Feature 4: Vaul Bottom Sheet for Mobile Details (No Scroll-Jump) */}
      <Drawer.Root open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="vaul-drawer-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" />
          <Drawer.Content
            data-lenis-prevent="true"
            className="vaul-drawer-content fixed bottom-0 left-0 right-0 max-h-[88vh] z-[210] bg-[var(--charcoal)] text-[var(--paper)] rounded-t-[24px] outline-none flex flex-col border-t border-[rgba(244,242,234,0.15)] shadow-2xl"
          >
            {/* Grab handle */}
            <div className="pt-3.5 pb-2 flex justify-center w-full flex-shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-white/25" />
            </div>

            {/* Header */}
            <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between flex-shrink-0">
              <div>
                <Drawer.Title className="text-base font-bold text-[var(--paper)]">
                  Rincian Estimasi Biaya
                </Drawer.Title>
                <Drawer.Description className="text-xs text-[var(--paper)]/60 font-mono">
                  {activeTab === "hardware"
                    ? "Servis Hardware & Upgrade PC"
                    : activeTab === "smartphone"
                    ? "Servis Smartphone / HP & Gadget"
                    : "Pengembangan Web & Software"} • Transparan
                </Drawer.Description>
              </div>
              <Drawer.Close asChild>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm text-[var(--paper)] hover:bg-white/20 transition-colors"
                  aria-label="Tutup rincian kalkulator"
                >
                  ✕
                </button>
              </Drawer.Close>
            </div>

            {/* Scrollable breakdown list */}
            <div
              data-lenis-prevent="true"
              className="px-5 py-4 overflow-y-auto space-y-4 max-h-[58vh] text-sm"
            >
              {/* Total Price Display inside Bottom Sheet */}
              <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                <span className="text-xs font-mono text-[var(--paper)]/60 block mb-1">Total Estimasi ALL-IN:</span>
                {activeTab === "hardware" ? (
                  isZeroSelection ? (
                    <span className="text-base text-[var(--amber)] font-bold">Pilih Kebutuhan Anda</span>
                  ) : (
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {isFridayPromo && discountMin > 0 && (
                        <span className="price-original-strikethrough text-sm">
                          {formatPriceRange(rawHwMin, rawHwMax)}
                        </span>
                      )}
                      <span className="text-xl font-extrabold text-[var(--amber)] font-mono">
                        {formatPriceRange(hwMin, hwMax)}
                      </span>
                      {isFridayPromo && (
                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#65b584]/20 text-[#65b584] border border-[#65b584]/30">
                          Diskon Jum&apos;at 10% Aktif
                        </span>
                      )}
                    </div>
                  )
                ) : activeTab === "smartphone" ? (
                  isHpZeroSelection ? (
                    <span className="text-base text-[var(--amber)] font-bold">Pilih Kebutuhan Anda</span>
                  ) : (
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {isFridayPromo && hpDiscountMin > 0 && (
                        <span className="price-original-strikethrough text-sm">
                          {formatPriceRange(rawHpMin, rawHpMax)}
                        </span>
                      )}
                      <span className="text-xl font-extrabold text-[var(--amber)] font-mono">
                        {formatPriceRange(hpMin, hpMax)}
                      </span>
                      {isFridayPromo && (
                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#65b584]/20 text-[#65b584] border border-[#65b584]/30">
                          Diskon Jum&apos;at 10% Aktif
                        </span>
                      )}
                    </div>
                  )
                ) : (
                  <span className="text-xl font-extrabold text-[var(--amber)] font-mono">
                    {formatRupiah(swMin)} – {formatRupiah(swMax)}
                  </span>
                )}
              </div>

              {/* Education Banner */}
              {((activeTab === "hardware" && !isZeroSelection) || (activeTab === "smartphone" && !isHpZeroSelection)) && isFridayPromo && (
                <div className="friday-edu-banner">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>
                    <strong>Edukasi Booking Jum&apos;at:</strong> Diskon 10% berlaku untuk serah terima unit atau pengerjaan pada hari Jum&apos;at di Lab Asrama SCWE (Gedung 2 Lantai 3). Booking lebih awal via WA agar slot part &amp; teknisi siap untuk Anda.
                  </span>
                </div>
              )}

              {/* Breakdown Rows */}
              <div className="space-y-3">
                {activeTab === "hardware" ? (
                  <>
                    <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                      <div>
                        <div className="font-semibold text-[var(--paper)]">Penyimpanan (SSD)</div>
                        <div className="text-xs text-[var(--paper)]/60">
                          {currentSsd.id === "ssd-none" ? "Tidak perlu SSD baru" : currentSsd.label}
                        </div>
                      </div>
                      <div className="font-mono text-xs font-semibold text-[var(--paper)] text-right">
                        {currentSsd.minPrice === 0 ? "Rp 0" : `${formatRupiah(currentSsd.minPrice)} – ${formatRupiah(currentSsd.maxPrice)}`}
                      </div>
                    </div>

                    <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                      <div>
                        <div className="font-semibold text-[var(--paper)]">Memori (RAM)</div>
                        <div className="text-xs text-[var(--paper)]/60">
                          {currentRam.id === "ram-none" ? "RAM bawaan cukup" : currentRam.label}
                        </div>
                      </div>
                      <div className="font-mono text-xs font-semibold text-[var(--paper)] text-right">
                        {currentRam.minPrice === 0 ? "Rp 0" : `${formatRupiah(currentRam.minPrice)} – ${formatRupiah(currentRam.maxPrice)}`}
                      </div>
                    </div>

                    {currentServices.map((serv) => (
                      <div key={serv.id} className="flex justify-between items-start pb-2.5 border-b border-white/5">
                        <div>
                          <div className="font-semibold text-[var(--paper)]">{serv.label}</div>
                          <div className="text-xs text-[var(--paper)]/60">Layanan servis pengerjaan</div>
                        </div>
                        <div className="font-mono text-xs font-semibold text-[var(--paper)] text-right">
                          +{formatRupiah(serv.minPrice)} – +{formatRupiah(serv.maxPrice)}
                        </div>
                      </div>
                    ))}

                    {(currentSsd.id !== "ssd-none" || currentRam.id !== "ram-none") && (
                      <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                        <div>
                          <div className="font-semibold text-[var(--paper)]">Jasa Pasang &amp; Uji Diagnostik</div>
                          <div className="text-xs text-[var(--paper)]/60">Bongkar pasang presisi + burn-in test BIOS</div>
                        </div>
                        <span className="badge-included text-xs">Termasuk (Gratis)</span>
                      </div>
                    )}

                    {!isZeroSelection && (
                      <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                        <div>
                          <div className="font-semibold text-[var(--paper)]">Antar-Jemput / Serah Terima Unit</div>
                          <div className="text-xs text-[var(--paper)]/60">Gratis Rp 0 (jalan kaki asrama/kampus CWE) • Kosan luar berbayar sesuai jarak</div>
                        </div>
                        <span className="text-[11px] font-mono text-[var(--paper)]/70 text-right">SOP Jarak</span>
                      </div>
                    )}

                    {isFridayPromo && !isZeroSelection && discountMin > 0 && (
                      <div className="flex justify-between items-start pb-2.5 border-b border-white/5 text-[#65b584]">
                        <div>
                          <div className="font-semibold">Diskon Spesial Hari Jum&apos;at (10%)</div>
                          <div className="text-xs text-[#65b584]/80">Potongan langsung seluruh hardware &amp; servis</div>
                        </div>
                        <div className="font-mono text-xs font-bold text-right">
                          -{formatRupiah(discountMin)} – -{formatRupiah(discountMax)}
                        </div>
                      </div>
                    )}
                  </>
                ) : activeTab === "smartphone" ? (
                  <>
                    <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                      <div>
                        <div className="font-semibold text-[var(--paper)]">Layar (LCD / OLED)</div>
                        <div className="text-xs text-[var(--paper)]/60">
                          {currentHpScreen.id === "screen-none" ? "Layar normal (tidak ganti LCD)" : currentHpScreen.label}
                        </div>
                      </div>
                      <div className="font-mono text-xs font-semibold text-[var(--paper)] text-right">
                        {currentHpScreen.minPrice === 0 ? "Rp 0" : `${formatRupiah(currentHpScreen.minPrice)} – ${formatRupiah(currentHpScreen.maxPrice)}`}
                      </div>
                    </div>

                    {currentHpServices.map((serv) => (
                      <div key={serv.id} className="flex justify-between items-start pb-2.5 border-b border-white/5">
                        <div>
                          <div className="font-semibold text-[var(--paper)]">{serv.label}</div>
                          <div className="text-xs text-[var(--paper)]/60">Layanan servis HP</div>
                        </div>
                        <div className="font-mono text-xs font-semibold text-[var(--paper)] text-right">
                          +{formatRupiah(serv.minPrice)} – +{formatRupiah(serv.maxPrice)}
                        </div>
                      </div>
                    ))}

                    {currentHpScreen.id !== "screen-none" ? (
                      <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                        <div>
                          <div className="font-semibold text-[var(--paper)]">Jasa Pasang &amp; Uji Fungsi Layar</div>
                          <div className="text-xs text-[var(--paper)]/60">Bongkar pasang presisi + pengeleman standar pabrik</div>
                        </div>
                        <span className="badge-included text-xs">Termasuk (Gratis)</span>
                      </div>
                    ) : currentHpServices.length > 0 && !currentHpServices.some((s) => s.id === "hp-install-only") ? (
                      <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                        <div>
                          <div className="font-semibold text-[var(--paper)]">Jasa Pengerjaan &amp; Quality Control</div>
                          <div className="text-xs text-[var(--paper)]/60">Bongkar pasang presisi + uji kelistrikan &amp; komponen</div>
                        </div>
                        <span className="badge-included text-xs">Termasuk (Gratis)</span>
                      </div>
                    ) : null}

                    {!isHpZeroSelection && (
                      <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                        <div>
                          <div className="font-semibold text-[var(--paper)]">Antar-Jemput / Serah Terima Unit</div>
                          <div className="text-xs text-[var(--paper)]/60">Gratis Rp 0 (jalan kaki asrama/kampus CWE) • Kosan luar berbayar sesuai jarak</div>
                        </div>
                        <span className="text-[11px] font-mono text-[var(--paper)]/70 text-right">SOP Jarak</span>
                      </div>
                    )}

                    {isFridayPromo && !isHpZeroSelection && hpDiscountMin > 0 && (
                      <div className="flex justify-between items-start pb-2.5 border-b border-white/5 text-[#65b584]">
                        <div>
                          <div className="font-semibold">Diskon Spesial Hari Jum&apos;at (10%)</div>
                          <div className="text-xs text-[#65b584]/80">Potongan langsung seluruh servis &amp; modul HP</div>
                        </div>
                        <div className="font-mono text-xs font-bold text-right">
                          -{formatRupiah(hpDiscountMin)} – -{formatRupiah(hpDiscountMax)}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                      <div>
                        <div className="font-semibold text-[var(--paper)]">Jenis Proyek</div>
                        <div className="text-xs text-[var(--paper)]/60">{currentWebType.label}</div>
                      </div>
                      <div className="font-mono text-xs font-semibold text-[var(--paper)] text-right">
                        {formatRupiah(currentWebType.minPrice)}
                      </div>
                    </div>

                    {currentAddons.map((addon) => (
                      <div key={addon.id} className="flex justify-between items-start pb-2.5 border-b border-white/5">
                        <div>
                          <div className="font-semibold text-[var(--paper)]">{addon.label}</div>
                          <div className="text-xs text-[var(--paper)]/60">Fitur tambahan</div>
                        </div>
                        <div className="font-mono text-xs font-semibold text-[var(--paper)] text-right">
                          +{formatRupiah(addon.minPrice)}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between items-start pb-2.5 border-b border-white/5">
                      <div>
                        <div className="font-semibold text-[var(--paper)]">Server Hosting</div>
                        <div className="text-xs text-[var(--paper)]/60">Vercel Edge Network (Bebas Biaya Bulanan)</div>
                      </div>
                      <span className="badge-included text-xs">Gratis Permanen</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer with CTA WA */}
            <div className="p-4 border-t border-white/10 bg-[var(--charcoal)] flex flex-col gap-2 flex-shrink-0">
              <a
                className="btn btn-primary w-full justify-center text-center font-bold"
                target="_blank"
                rel="noopener noreferrer"
                href={
                  activeTab === "hardware"
                    ? getHardwareWaUrl()
                    : activeTab === "smartphone"
                    ? getSmartphoneWaUrl()
                    : getSoftwareWaUrl()
                }
                onClick={() => setIsBottomSheetOpen(false)}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>Konsultasikan via WhatsApp ↗</span>
              </a>
              <div className="text-center text-[11px] font-mono text-[var(--paper)]/50">
                {activeTab === "hardware"
                  ? "Langsung dengan Sukron & Mamad (Lab Asrama SCWE)"
                  : activeTab === "smartphone"
                  ? "Langsung dengan Zulkifli / Mamad (Lab Asrama SCWE)"
                  : "Langsung dengan Felich & Dika"}
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
