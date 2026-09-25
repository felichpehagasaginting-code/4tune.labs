"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers/smooth-scroll.client";
import { CostEstimator } from "@/components/interactive/cost-estimator.client";
import { SolutionFinder } from "@/components/modules/solution-finder";
import { CuratedBundles } from "@/components/modules/curated-bundles";
import { LabNotes } from "@/components/modules/lab-notes";
import { BeforeAfterSlider } from "@/components/interactive/before-after-slider.client";
import { LabLocation } from "@/components/modules/lab-location";
import { TrustGuarantee } from "@/components/modules/trust-guarantee";
import { WorksShowcase } from "@/components/modules/works-showcase.client";
import { QuickNavRail } from "@/components/interactive/quick-nav-rail.client";

gsap.registerPlugin(ScrollTrigger);

function BrandText({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-wordmark ${className}`.trim()}>
      <span className="w4">4</span>
      <span className="wt">tune</span>
      <span className="wl">.labs</span>
    </span>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [copiedCta, setCopiedCta] = useState<string>("");
  const lenis = useLenis();

  const copyToClipboard = (text: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCta(id);
      setTimeout(() => setCopiedCta(""), 2400);
    }
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.classList.remove("menu-open");
    if (lenis) {
      lenis.start();
    }
  }, [lenis]);

  // Close mobile drawer when an anchor link is clicked
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (menuOpen) {
      closeMenu();
    }

    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(targetId, { offset: -72 });
      } else {
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, menuOpen ? 300 : 0);
  };

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    if (nextState) {
      document.body.classList.add("menu-open");
      if (lenis) lenis.stop();
    } else {
      closeMenu();
    }
  };

  // Keyboard accessibility: ESC closes mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  // Deterministic scroll unfreeze on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("menu-open");
      if (lenis) lenis.start();
    };
  }, [lenis]);

  // Pastikan posisi scroll default di section awal (Hero) saat web dibuka
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!window.location.hash) {
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [lenis]);

  useEffect(() => {
    if (!pageRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Header scroll state & section spy handler
    const navEl = document.getElementById("nav");
    let lastY = 0;
    const sectionIds = [
      "solusi-kendala",
      "layanan",
      "paket-pilihan",
      "kalkulator-biaya",
      "bukti-servis",
      "jaminan-garansi",
      "lokasi-lab",
      "karya",
      "lab-notes",
      "cara-kerja",
      "tim",
      "kontak",
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (navEl) {
        navEl.classList.toggle("scrolled", scrollY > 40);
        if (
          scrollY > lastY &&
          scrollY > 320 &&
          !document.body.classList.contains("menu-open")
        ) {
          navEl.classList.add("hidden");
        } else {
          navEl.classList.remove("hidden");
        }
      }

      // Scroll spy detection
      const spyPosition = scrollY + 160;
      for (const sid of sectionIds) {
        const el = document.getElementById(sid);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (spyPosition >= top && spyPosition < top + height) {
            setActiveSection(sid);
            break;
          }
        }
      }

      lastY = scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // GSAP animation context
    const ctx = gsap.context(() => {
      // Magnetic hover on desktop fine-pointer devices
      if (!reduceMotion && window.matchMedia("(pointer:fine)").matches) {
        const magnetics = pageRef.current?.querySelectorAll<HTMLElement>(".magnetic");
        magnetics?.forEach((btn) => {
          const onMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            gsap.to(btn, {
              x: (e.clientX - rect.left - rect.width / 2) * 0.25,
              y: (e.clientY - rect.top - rect.height / 2) * 0.35,
              duration: 0.4
            });
          };
          const onLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.5)"
            });
          };
          btn.addEventListener("mousemove", onMove);
          btn.addEventListener("mouseleave", onLeave);
        });
      }

      if (reduceMotion) {
        gsap.set(".hero-title .line-in", { y: 0 });
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        gsap.set(".mw", { opacity: 1 });
        return;
      }

      // Initial state of headline
      gsap.set(".hero-title .line-in", { y: "110%" });

      // Progress bar pinned to page scroll
      gsap.to(".progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3
        }
      });

      // Hero Timeline: Logo Assembly + Typography entrance
      const tl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: "power4.out", duration: 1.05 }
      });

      tl.from("#ribbon-amber", { x: -48, y: -48, rotation: -15, opacity: 0, duration: 1.05 }, 0)
        .from("#ribbon-green", { x: 48, y: 48, rotation: 15, opacity: 0, duration: 1.05 }, 0.15)
        .from(
          "#house",
          {
            y: -50,
            opacity: 0,
            duration: 0.85,
            ease: "back.out(1.4)"
          },
          0.45
        )
        .from(
          "#hex",
          {
            scale: 0,
            opacity: 0,
            duration: 0.55,
            ease: "back.out(2.2)",
            svgOrigin: "120 120"
          },
          0.85
        )
        .to(
          ".hero-title .line-in",
          { y: 0, stagger: 0.09, duration: 1 },
          0.7
        )
        .from(
          ".hero-eyebrow, .hero-sub, .hero-cta, .hero-trust",
          { y: 24, opacity: 0, stagger: 0.08, duration: 0.8 },
          0.85
        )
        .from(".scroll-hint", { opacity: 0, duration: 0.8 }, 1.3)
        .from(".orbit", { opacity: 0, duration: 1.2 }, 1.2);

      // Post-assembly breathing idle
      tl.add(() => {
        gsap.to("#logo-stage-inner", {
          y: 10,
          duration: 3.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
        gsap.to("#hex", {
          scale: 1.07,
          svgOrigin: "120 120",
          duration: 1.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
        gsap.to(".orbit-a", {
          rotation: 360,
          svgOrigin: "120 120",
          duration: 60,
          repeat: -1,
          ease: "none"
        });
        gsap.to(".orbit-b", {
          rotation: -360,
          svgOrigin: "120 120",
          duration: 80,
          repeat: -1,
          ease: "none"
        });
        gsap.to(".blob-a", {
          x: -40,
          y: 30,
          duration: 10,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
        gsap.to(".blob-b", {
          x: 40,
          y: -30,
          duration: 12,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      }, 1.6);

      // Reveal elements on scroll
      const reveals = pageRef.current?.querySelectorAll("[data-reveal]");
      reveals?.forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true
          }
        });
      });

      // Manifesto word-by-word reveal
      const mani = document.getElementById("mani-text");
      if (mani) {
        const words = mani.querySelectorAll(".mw");
        gsap.fromTo(
          words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.03,
            ease: "none",
            scrollTrigger: {
              trigger: mani,
              start: "top 80%",
              end: "bottom 45%",
              scrub: 0.6
            }
          }
        );
      }

      // Parallax giant text in dark band
      const giant = document.getElementById("giant");
      if (giant) {
        gsap.fromTo(
          giant,
          { x: "4%" },
          {
            x: "-12%",
            ease: "none",
            scrollTrigger: {
              trigger: ".principles",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }

      // Active nav link highlight
      ["layanan", "karya", "cara-kerja", "tim"].forEach((id) => {
        const link = document.querySelector(
          `.nav-links a[data-section="${id}"]`
        );
        if (!link) return;
        ScrollTrigger.create({
          trigger: "#" + id,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => link.classList.toggle("active", self.isActive)
        });
      });
    }, pageRef);

    // Refresh ScrollTrigger once fonts load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, [lenis]);

  return (
    <div ref={pageRef} className="relative min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      {/* Top Reading Progress Bar */}
      <div className="progress" aria-hidden="true" />

      {/* ================= STICKY HEADER & NAV ================= */}
      <header className="site-nav" id="nav">
        <div className="nav-inner">
          <a
            className="brand"
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            aria-label="4tune.labs — beranda"
          >
            <svg viewBox="0 0 240 240" aria-hidden="true">
              <use href="#mark-full" />
            </svg>
            <BrandText />
          </a>

          <nav className="nav-links" aria-label="Navigasi utama">
            <a
              href="#solusi-kendala"
              className={activeSection === "solusi-kendala" ? "active" : ""}
              data-section="solusi-kendala"
              onClick={(e) => handleNavClick(e, "#solusi-kendala")}
            >
              Solusi
            </a>
            <a
              href="#layanan"
              className={activeSection === "layanan" ? "active" : ""}
              data-section="layanan"
              onClick={(e) => handleNavClick(e, "#layanan")}
            >
              Layanan
            </a>
            <a
              href="#paket-pilihan"
              className={activeSection === "paket-pilihan" ? "active" : ""}
              data-section="paket-pilihan"
              onClick={(e) => handleNavClick(e, "#paket-pilihan")}
            >
              Paket
            </a>
            <a
              href="#kalkulator-biaya"
              className={activeSection === "kalkulator-biaya" ? "active" : ""}
              data-section="kalkulator-biaya"
              onClick={(e) => handleNavClick(e, "#kalkulator-biaya")}
            >
              Kalkulator
            </a>
            <a
              href="#bukti-servis"
              className={activeSection === "bukti-servis" ? "active" : ""}
              data-section="bukti-servis"
              onClick={(e) => handleNavClick(e, "#bukti-servis")}
            >
              Bukti
            </a>
            <a
              href="#lokasi-lab"
              className={activeSection === "lokasi-lab" ? "active" : ""}
              data-section="lokasi-lab"
              onClick={(e) => handleNavClick(e, "#lokasi-lab")}
            >
              Lokasi SCWE
            </a>
            <a
              href="#karya"
              className={activeSection === "karya" ? "active" : ""}
              data-section="karya"
              onClick={(e) => handleNavClick(e, "#karya")}
            >
              Karya
            </a>
            <a
              href="#tim"
              className={activeSection === "tim" ? "active" : ""}
              data-section="tim"
              onClick={(e) => handleNavClick(e, "#tim")}
            >
              Tim
            </a>
          </nav>

          <div className="nav-cta">
            <a
              className="btn btn-primary btn-sm magnetic"
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.me/6283894496994?text=Hai%204tune.labs%2C%20saya%20ingin%20diskusi%20soal%20proyek."
            >
              Mulai Ngobrol
            </a>
            <button
              className="burger"
              id="burger"
              onClick={toggleMenu}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className="menu-drawer" id="menu" aria-hidden={!menuOpen}>
        <div className="menu-drawer-top">
          <button
            type="button"
            className="menu-close-btn"
            onClick={closeMenu}
            aria-label="Tutup menu navigasi"
          >
            <span className="close-icon" aria-hidden="true">✕</span>
            <span>Tutup</span>
          </button>
        </div>

        <a
          className="m-link"
          href="#solusi-kendala"
          onClick={(e) => handleNavClick(e, "#solusi-kendala")}
        >
          <span>01</span>Solusi Kendala
        </a>
        <a
          className="m-link"
          href="#layanan"
          onClick={(e) => handleNavClick(e, "#layanan")}
        >
          <span>02</span>Layanan
        </a>
        <a
          className="m-link"
          href="#paket-pilihan"
          onClick={(e) => handleNavClick(e, "#paket-pilihan")}
        >
          <span>03</span>Paket Pilihan
        </a>
        <a
          className="m-link"
          href="#kalkulator-biaya"
          onClick={(e) => handleNavClick(e, "#kalkulator-biaya")}
        >
          <span>04</span>Kalkulator Biaya
        </a>
        <a
          className="m-link"
          href="#bukti-servis"
          onClick={(e) => handleNavClick(e, "#bukti-servis")}
        >
          <span>05</span>Bukti Servis &amp; Termal
        </a>
        <a
          className="m-link"
          href="#lokasi-lab"
          onClick={(e) => handleNavClick(e, "#lokasi-lab")}
        >
          <span>06</span>Lokasi Lab Asrama SCWE
        </a>
        <a
          className="m-link"
          href="#karya"
          onClick={(e) => handleNavClick(e, "#karya")}
        >
          <span>07</span>Karya Terpilih
        </a>
        <a
          className="m-link"
          href="#tim"
          onClick={(e) => handleNavClick(e, "#tim")}
        >
          <span>08</span>Tim Kami
        </a>

        <div className="m-foot">
          <a
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/6283894496994?text=Hai%204tune.labs%2C%20saya%20ingin%20diskusi%20soal%20proyek."
            onClick={closeMenu}
          >
            Chat WhatsApp
          </a>
        </div>
      </div>

      <main id="top">
        {/* ================= HERO SECTION ================= */}
        <section className="hero">
          <div className="blob blob-a" aria-hidden="true" />
          <div className="blob blob-b" aria-hidden="true" />

          <div className="container hero-grid">
            <div>
              <p className="eyebrow hero-eyebrow">Studio Rekayasa &amp; Tech Support</p>

              <h1 className="hero-title">
                <span className="line">
                  <span className="line-in">Dari kode web</span>
                </span>
                <span className="line">
                  <span className="line-in">
                    hingga <em className="accent">hardware</em>,
                  </span>
                </span>
                <span className="line">
                  <span className="line-in">beres tanpa perantara.</span>
                </span>
              </h1>

              <p className="hero-sub">
                <BrandText /> dijalankan langsung oleh empat mahasiswa rekayasa.
                Menggabungkan pembuatan website modern &amp; solusi AI dengan layanan servis hardware,
                upgrade performa laptop/PC, dan elektronika terapan. Anda ngobrol langsung dengan orang yang
                mengeksekusinya — tanpa perantara, transparan, dan ramah kantong.
              </p>

              <div className="hero-cta">
                <a
                  className="btn btn-primary magnetic"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/6283894496994?text=Hai%204tune.labs%2C%20saya%20punya%20kebutuhan%20web%20%2F%20servis%20hardware%20yang%20ingin%20didiskusikan."
                >
                  Mulai Percakapan
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a
                  className="btn btn-ghost"
                  href="#karya"
                  onClick={(e) => handleNavClick(e, "#karya")}
                >
                  Lihat Karya Kami
                </a>
              </div>

              <div className="hero-trust">
                <span>
                  <i />
                  Dibalas &lt; 24 jam
                </span>
                <span>
                  <i />
                  Diagnosa transparan &amp; bergaransi
                </span>
                <span>
                  <i />
                  Ramah Mahasiswa &amp; UMKM
                </span>
              </div>
            </div>

            {/* Logo Kinetic Stage */}
            <div className="logo-stage" aria-label="Logo 4tune.labs">
              <div id="logo-stage-inner">
                <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
                  <circle
                    className="orbit orbit-a"
                    cx="120"
                    cy="120"
                    r="105"
                    stroke="rgba(32,36,43,.14)"
                    strokeWidth="1"
                    strokeDasharray="2 7"
                  />
                  <circle
                    className="orbit orbit-b"
                    cx="120"
                    cy="120"
                    r="118"
                    stroke="rgba(32,36,43,.09)"
                    strokeWidth="1"
                    strokeDasharray="2 11"
                  />

                  {/* Amber Ribbons */}
                  <path
                    id="ribbon-amber"
                    d="M 42.77 24.24 L 91.25 24.24 L 96.48 25.66 L 101.23 28.51 L 114.53 41.82 L 114.06 43.25 L 104.55 52.75 L 102.18 51.33 L 92.2 40.87 L 89.35 39.45 L 44.2 39.45 L 40.4 42.3 L 39.45 45.15 L 39.92 63.21 L 93.62 63.68 L 78.89 78.42 L 40.4 78.42 L 39.45 79.37 L 39.45 87.92 L 40.4 90.3 L 79.84 130.22 L 80.79 132.12 L 80.79 152.55 L 32.79 104.55 L 28.04 99.33 L 25.19 93.15 L 24.24 87.92 L 24.24 43.25 L 25.19 38.97 L 27.09 34.69 L 31.84 28.99 L 36.59 26.14 L 42.3 24.71 Z M 159.21 86.5 L 211.49 140.2 L 213.86 144.0 L 215.76 150.65 L 215.76 197.7 L 212.91 205.78 L 207.21 211.96 L 204.83 213.39 L 198.18 215.76 L 148.28 215.76 L 140.2 211.96 L 128.79 200.55 L 126.89 199.6 L 124.99 196.75 L 135.45 186.3 L 147.8 198.65 L 151.13 200.55 L 196.28 200.55 L 200.55 196.28 L 200.08 176.79 L 146.38 176.79 L 146.85 174.89 L 160.16 161.58 L 199.6 161.58 L 200.55 160.63 L 200.55 152.08 L 199.6 149.7 L 159.68 108.83 L 160.16 90.3 L 159.21 86.97 Z M 87.45 159.21 L 109.31 159.68 L 119.29 169.66 L 107.88 180.59 L 87.45 159.68 Z"
                    fill="#E4A932"
                    fillRule="evenodd"
                  />

                  {/* Green Ribbons */}
                  <path
                    id="ribbon-green"
                    d="M 148.28 24.24 L 198.18 24.24 L 207.21 28.04 L 211.96 32.79 L 214.34 37.07 L 215.76 42.3 L 215.76 90.3 L 211.96 99.8 L 206.26 105.98 L 196.75 115.49 L 185.82 104.55 L 198.18 91.72 L 200.55 87.92 L 200.55 45.62 L 199.6 42.77 L 197.23 40.4 L 194.85 39.45 L 152.08 39.45 L 147.8 41.35 L 131.64 57.03 L 129.27 54.65 L 124.04 52.28 L 119.29 51.8 L 114.06 52.75 L 137.82 28.99 L 144.48 25.19 L 147.8 24.71 Z M 81.74 85.54 L 80.79 89.35 L 80.32 109.78 L 70.81 119.29 L 59.88 108.36 L 59.88 107.41 L 81.27 86.02 Z M 169.19 120.71 L 180.12 131.64 L 175.84 136.87 L 158.26 153.98 L 159.21 151.6 L 159.21 130.22 L 168.71 121.19 Z M 43.25 124.51 L 54.65 135.45 L 41.82 148.28 L 39.45 152.55 L 39.45 194.85 L 41.35 198.65 L 45.15 200.55 L 89.35 200.08 L 91.25 199.13 L 111.21 179.64 L 131.17 159.21 L 151.13 159.21 L 153.98 158.26 L 153.03 159.68 L 101.7 211.01 L 95.52 214.81 L 87.92 216.24 L 45.62 216.24 L 39.45 215.29 L 32.79 211.96 L 28.04 207.21 L 24.24 198.18 L 24.24 150.18 L 25.66 144.95 L 29.47 138.77 L 42.77 124.99 Z"
                    fill="#369966"
                    fillRule="evenodd"
                  />

                  {/* Center House Emblem */}
                  <g id="house">
                    <path
                      id="house-bg"
                      d="M 117.39 52.75 L 123.09 52.75 L 128.79 55.13 L 156.83 84.12 L 156.36 85.07 L 157.78 86.97 L 158.73 92.67 L 158.73 150.65 L 156.36 155.88 L 152.08 158.26 L 89.82 158.26 L 84.12 156.36 L 82.22 153.5 L 81.27 130.22 L 81.27 90.3 L 82.69 85.54 L 84.59 82.22 L 110.26 56.08 L 113.58 53.7 L 116.91 53.23 Z M 120.24 68.44 L 142.57 92.2 L 142.57 94.1 L 133.07 94.1 L 132.59 101.23 L 143.05 108.83 L 143.05 142.57 L 96.95 142.1 L 96.95 108.83 L 107.88 101.23 L 107.41 94.1 L 97.43 94.1 L 97.43 92.2 L 119.76 68.91 Z"
                      fill="#424449"
                      fillRule="evenodd"
                      stroke="#424449"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* Center Hexagon */}
                  <path
                    id="hex"
                    d="M 119.76 105.03 L 132.59 112.16 L 132.59 127.37 L 120.24 134.5 L 107.41 127.37 L 107.41 112.16 L 119.29 105.5 Z"
                    fill="#369966"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="scroll-hint" aria-hidden="true">
            SCROLL<i />
          </div>
        </section>

        {/* ================= MARQUEE TICKER ================= */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track" id="marquee-track">
            <div className="marquee-group">
              <span>Website Mahasiswa &amp; UMKM <b>•</b></span>
              <span>Servis Laptop &amp; Komputer <b>•</b></span>
              <span>Upgrade SSD &amp; RAM <b>•</b></span>
              <span>Aplikasi Web &amp; AI <b>•</b></span>
              <span>Perbaikan HP &amp; Tablet <b>•</b></span>
              <span>Instalasi OS &amp; Software <b>•</b></span>
              <span>IoT &amp; Mikrokontroler <b>•</b></span>
              <span>Desain UI/UX Modern <b>•</b></span>
              <span>Maintenance &amp; Deep Cleaning <b>•</b></span>
            </div>
            {/* Cloned group for seamless CSS infinite loop */}
            <div className="marquee-group">
              <span>Website Mahasiswa &amp; UMKM <b>•</b></span>
              <span>Servis Laptop &amp; Komputer <b>•</b></span>
              <span>Upgrade SSD &amp; RAM <b>•</b></span>
              <span>Aplikasi Web &amp; AI <b>•</b></span>
              <span>Perbaikan HP &amp; Tablet <b>•</b></span>
              <span>Instalasi OS &amp; Software <b>•</b></span>
              <span>IoT &amp; Mikrokontroler <b>•</b></span>
              <span>Desain UI/UX Modern <b>•</b></span>
              <span>Maintenance &amp; Deep Cleaning <b>•</b></span>
            </div>
          </div>
        </div>

        {/* ================= MANIFESTO ================= */}
        <section className="manifesto">
          <div className="container">
            <p className="eyebrow mani-label" data-reveal>
              Filosofi Rekayasa &amp; Pelayanan Kami
            </p>
            <p className="mani-text" id="mani-text">
              <span className="mw">Software </span>
              <span className="mw">yang </span>
              <span className="mw">hebat </span>
              <span className="mw">itu </span>
              <span className="mw"><em>tenang</em>, </span>
              <span className="mw">dan </span>
              <span className="mw">hardware </span>
              <span className="mw">yang </span>
              <span className="mw">prima </span>
              <span className="mw">itu </span>
              <span className="mw"><em>andal</em>. </span>
              <span className="mw">Kami </span>
              <span className="mw">membangun </span>
              <span className="mw">produk </span>
              <span className="mw">digital </span>
              <span className="mw">yang </span>
              <span className="mw">rapi </span>
              <span className="mw">sekaligus </span>
              <span className="mw">merawat </span>
              <span className="mw">perangkat </span>
              <span className="mw">fisik </span>
              <span className="mw">Anda </span>
              <span className="mw">agar </span>
              <span className="mw">kembali </span>
              <span className="mw">bertenaga </span>
              <span className="mw">— </span>
              <span className="mw">solusi </span>
              <span className="mw">teknologi </span>
              <span className="mw">yang </span>
              <span className="mw"><em>transparan</em>, </span>
              <span className="mw">masuk </span>
              <span className="mw">akal, </span>
              <span className="mw">dan </span>
              <span className="mw">berdampak </span>
              <span className="mw">nyata.</span>
            </p>
          </div>
        </section>

        {/* ================= PETA SOLUSI KENDALA ================= */}
        <section className="services" id="solusi-kendala" style={{ background: "var(--cream)", borderTop: "1px solid var(--line)" }}>
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>
                Solusi Kendala Nyata
              </p>
              <h2 className="h2" data-reveal>
                Kenali masalah Anda. Kami siapkan <em>solusinya.</em>
              </h2>
              <p data-reveal>
                Mulai dari laptop lemot berdebu yang bikin panik saat ngerjain tugas, hingga bisnis lokal yang butuh link website profil rapi di WhatsApp. Klik keluhan yang Anda rasakan untuk melihat diagnosa jujur dan estimasi waktu penanganannya.
              </p>
            </div>

            <SolutionFinder />
          </div>
        </section>

        {/* ================= LAYANAN ================= */}
        <section className="services" id="layanan">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>
                Layanan
              </p>
              <h2 className="h2" data-reveal>
                Tiga keahlian utama yang kami hadirkan <em>untuk Anda.</em>
              </h2>
              <p data-reveal>
                Bukan sekadar deretan istilah teknis — dari baris kode web modern sampai meja obeng teknisi hardware.
                Setiap bidang ditangani langsung oleh engineer yang menekuninya, dengan pengerjaan transparan dan harga bersahabat.
              </p>
            </div>

            <div className="svc-list">
              {/* 01: Web & Digital Solutions */}
              <a
                className="svc"
                data-reveal
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/6282386526982?text=Hai%20Felich%2C%20saya%20lihat%204tune.labs%20dan%20ingin%20diskusi%20soal%20pembuatan%20website%20%2F%20aplikasi."
              >
                <span className="svc-num">/ 01</span>
                <div>
                  <h3>Pengembangan Web &amp; Aplikasi Digital</h3>
                  <span className="svc-tag">
                    produk digital &amp; website modern yang siap online dan nyaman dipakai.
                  </span>
                  <p className="svc-desc">
                    Kami membantu mahasiswa non-IT dan pemilik usaha kecil memiliki kehadiran digital profesional —
                    dari website portofolio tugas akhir, landing page profil usaha/UMKM dengan tombol WhatsApp otomatis,
                    hingga aplikasi web kustom berbasis AI. Cepat diakses di smartphone, desain bersih, dan bebas pusing istilah teknis.
                  </p>
                  <div className="chips">
                    <span>Website Mahasiswa &amp; UMKM</span>
                    <span>Next.js &amp; React</span>
                    <span>Integrasi AI</span>
                    <span>UI/UX Design</span>
                    <span>SEO &amp; Domain</span>
                    <span>Deploy Siap Pakai</span>
                  </div>
                </div>
                <div className="svc-meta">
                  <span className="svc-owner">
                    DIPIMPIN<br />
                    <b>Felich &amp; Dika — Software &amp; Product</b>
                  </span>
                  <span className="svc-arrow">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </a>

              {/* 02: Hardware Tech Support & Repair */}
              <a
                className="svc"
                data-reveal
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/6283894496994?text=Hai%20Sukron%2C%20saya%20lihat%204tune.labs%20dan%20ingin%20tanya%20servis%20laptop%20%2F%20upgrade%20hardware."
              >
                <span className="svc-num">/ 02</span>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3>Servis Hardware, Upgrade &amp; Pemulihan Sistem</h3>
                    <span className="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[rgba(61,155,99,0.15)] text-[var(--green-deep)] font-semibold border border-[rgba(61,155,99,0.3)]">
                      PROMO: Diskon Setiap Hari Jum&apos;at!
                    </span>
                  </div>
                  <span className="svc-tag">
                    laptop lemot kembali ngebut, upgrade hardware, dan perbaikan perangkat bergaransi.
                  </span>
                  <p className="svc-desc">
                    Penyelamat perangkat kuliah &amp; kerja Anda. Mulai dari laptop lemot yang butuh upgrade SSD &amp; ekspansi RAM
                    agar booting hitungan detik, instalasi bersih OS (Windows/Linux) &amp; software esensial, perbaikan hardware laptop &amp; PC,
                    service gadget (HP &amp; Tablet), hingga deep cleaning kipas &amp; penggantian pasta pendingin thermal. Pengerjaan transparan,
                    data Anda aman terjamin, serah terima unit di Lab Kamar 304 atau antar-jemput (gratis jalan kaki asrama/kampus, kosan luar berbayar sesuai jarak), serta bergaransi resmi.
                  </p>
                  <div className="chips">
                    <span>Upgrade SSD &amp; RAM</span>
                    <span>Service Laptop &amp; PC</span>
                    <span>Perbaikan HP &amp; Tablet</span>
                    <span>Instalasi OS &amp; Software</span>
                    <span>Deep Cleaning &amp; Thermal</span>
                    <span>Pengecekan Transparan</span>
                    <span>Garansi Servis</span>
                  </div>
                </div>
                <div className="svc-meta">
                  <span className="svc-owner">
                    DIPIMPIN<br />
                    <b>Sukron &amp; Zulkifli — Hardware &amp; Tech Support</b>
                  </span>
                  <span className="svc-arrow">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </a>

              {/* 03: Applied Electronics, IoT & Technical Setup */}
              <a
                className="svc"
                data-reveal
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/6283159392826?text=Hai%20Zul%2C%20saya%20lihat%204tune.labs%20dan%20ingin%20diskusi%20soal%20perangkat%20keras%20%2F%20IoT%20%2F%20kelistrikan."
              >
                <span className="svc-num">/ 03</span>
                <div>
                  <h3>Elektronika Terapan, IoT &amp; Instalasi Teknis</h3>
                  <span className="svc-tag">
                    jembatan praktis antara komponen fisik, sensor mikrokontroler, dan kelistrikan kerja.
                  </span>
                  <p className="svc-desc">
                    Perakitan prototipe perangkat cerdas (ESP32 / Arduino), sensor mikrokontroler untuk tugas akhir atau sistem monitoring,
                    instalasi kelistrikan ringan rumah &amp; ruang kerja, hingga perapian jaringan kabel lokal. Dikerjakan dengan ketelitian
                    standar teknik yang aman, presisi, dan rapi.
                  </p>
                  <div className="chips">
                    <span>Prototipe IoT</span>
                    <span>ESP32 &amp; Arduino</span>
                    <span>Instalasi Listrik Ringan</span>
                    <span>Setup Jaringan Lokal</span>
                    <span>Maintenance &amp; Kabel</span>
                    <span>Konsultasi Teknis</span>
                  </div>
                </div>
                <div className="svc-meta">
                  <span className="svc-owner">
                    DIPIMPIN<br />
                    <b>Zulkifli &amp; Sukron — Electronics Specialists</b>
                  </span>
                  <span className="svc-arrow">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ================= PAKET BUNDLING ================= */}
        <section className="bundles-section" id="paket-pilihan">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>
                Paket Pilihan
              </p>
              <h2 className="h2" data-reveal>
                Paket terstruktur untuk <em>kebutuhan mendesak.</em>
              </h2>
              <p data-reveal>
                Tanpa repot memikirkan komponen satu per satu. Paket hemat mahasiswa &amp; pelaku usaha dengan cakupan tuntas, harga transparan di depan, dan garansi pengerjaan.
              </p>
            </div>

            <CuratedBundles />
          </div>
        </section>

        {/* ================= KALKULATOR ESTIMASI BIAYA ================= */}
        <section className="estimator-section" id="kalkulator-biaya">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>
                Kalkulator Transparan
              </p>
              <h2 className="h2" data-reveal>
                Hitung estimasi biaya sebelum <em>bicara dengan teknisi.</em>
              </h2>
              <p data-reveal>
                Sesuaikan kebutuhan upgrade hardware atau skala website Anda. Dapatkan perkiraan biaya langsung dan kirim rinciannya ke WhatsApp dengan satu klik.
              </p>
            </div>

            <CostEstimator />
          </div>
        </section>

        {/* ================= BUKTI NYATA SERVIS & TERMAL ================= */}
        <BeforeAfterSlider />

        {/* ================= STANDAR PRIVASI & GARANSI SOP ================= */}
        <TrustGuarantee />

        {/* ================= BASIS LAB & LAYANAN ANTAR-JEMPUT ASRAMA SCWE ================= */}
        <LabLocation />

        {/* ================= KARYA ================= */}
        <section className="works" id="karya">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>
                Karya Terpilih
              </p>
              <h2 className="h2" data-reveal>
                Sistem &amp; produk yang telah <em>kami bangun.</em>
              </h2>
              <p data-reveal>
                Karya nyata yang dibangun oleh Felich dan tim <BrandText /> — mulai dari aplikasi web interaktif,
                asisten AI mahasiswa, platform edukasi tergamifikasi, hingga arsitektur panen terdistribusi.
              </p>
            </div>

            <WorksShowcase />

            <p className="works-note" data-reveal>
              <i />
              Sebagian proyek di bawah hak cipta klien, kampus, atau riset terapan. Seluruh demonstrasi disajikan dengan izin resmi.
            </p>
          </div>
        </section>

        {/* ================= CARA KERJA ================= */}
        <section className="principles" id="cara-kerja">
          <div className="giant" id="giant" aria-hidden="true">
            CARA KERJA — CARA KERJA
          </div>
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>
                Cara Kerja
              </p>
              <h2 className="h2" data-reveal>
                Tiga aturan yang tidak kami langgar, <em>di proyek mana pun.</em>
              </h2>
              <p data-reveal>
                Prinsip kerja yang menjaga pembuatan software tetap presisi, dan penanganan servis
                hardware tetap jujur, transparan, serta dapat diandalkan.
              </p>
            </div>

            <div className="pr-grid">
              <div className="pr-card" data-reveal>
                <div className="pr-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                </div>
                <span className="pr-num">ATURAN / 01</span>
                <h3>Bicara langsung dengan teknisi &amp; engineernya</h3>
                <p>
                  Nol sales atau perantara bertele-tele. Baik rencana website portofolio/UMKM
                  maupun konsultasi laptop yang bermasalah, Anda langsung berdiskusi dengan orang yang
                  mengecek komponen dan menulis baris kodenya.
                </p>
              </div>

              <div className="pr-card" data-reveal>
                <div className="pr-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="6" y1="3" x2="6" y2="15" />
                    <circle cx="18" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M18 9a9 9 0 0 1-9 9" />
                  </svg>
                </div>
                <span className="pr-num">ATURAN / 02</span>
                <h3>Bahasa manusiawi &amp; estimasi jujur di awal</h3>
                <p>
                  Kami paham Anda butuh solusi nyata, bukan istilah teknis yang bikin pusing.
                  Diagnosa kerusakan fisik atau arsitektur web kami jelaskan gamblang apa adanya.
                  Biaya disepakati di depan tanpa biaya siluman, dan data privasi Anda dijamin 100% aman.
                </p>
              </div>

              <div className="pr-card" data-reveal>
                <div className="pr-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span className="pr-num">ATURAN / 03</span>
                <h3>Hasil nyata, teruji tuntas, dan bergaransi</h3>
                <p>
                  Website diuji responsif di HP dan laptop Anda sebelum serah terima. Servis perangkat keras
                  dan upgrade komponen (SSD/RAM) dites stabilitas suhu dan benchmark performanya
                  sebelum dibawa pulang — dilengkapi masa garansi pengerjaan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LAB NOTES ================= */}
        <section className="notes-section" id="lab-notes">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>
                Lab Notes &amp; Edukasi
              </p>
              <h2 className="h2" data-reveal>
                Catatan teknis ringkas dari <em>meja kerja kami.</em>
              </h2>
              <p data-reveal>
                Panduan perawatan gadget, pencegahan kehilangan data skripsi, dan tips membangun website modern dalam bahasa santai yang mudah dipahami. Klik kartu untuk membaca catatan lengkap.
              </p>
            </div>

            <LabNotes />
          </div>
        </section>

        {/* ================= TIM ================= */}
        <section className="team" id="tim">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>
                Tim Kami
              </p>
              <h2 className="h2" data-reveal>
                Empat builder di balik <BrandText />.
              </h2>
              <p data-reveal>
                Dua fokus merancang ekosistem web, aplikasi digital &amp; AI; dua memimpin pemulihan
                hardware, upgrade sistem, dan elektronika terapan. Sapa langsung spesialis yang Anda butuhkan.
              </p>
            </div>

            <div className="team-grid">
              {/* Member 01 - Sukron */}
              <div className="member" data-reveal>
                <div className="avatar av-1">SU</div>
                <span className="member-role">HARDWARE &amp; SYSTEM SUPPORT</span>
                <h3>Sukron (&ldquo;Cuklon&rdquo;)</h3>
                <p>
                  Spesialis pemulihan performa perangkat, instalasi OS resmi (Windows/Linux) &amp; software kerja, serta upgrade storage SSD dan kapasitas RAM. Mengembalikan laptop lemot atau PC bermasalah kembali responsif, dingin, dan siap diajak produktif.
                </p>
                <div className="card-chips">
                  <span>Service Laptop &amp; PC</span>
                  <span>Upgrade SSD &amp; RAM</span>
                  <span>Instalasi OS &amp; Software</span>
                  <span className="text-[var(--green-deep)] font-semibold border-[rgba(61,155,99,0.35)]">Diskon Hari Jum&apos;at</span>
                </div>
                <div className="member-actions">
                  <a
                    className="btn btn-ghost btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/6283894496994?text=Hai%20Sukron%20(Cuklon)%2C%20saya%20ingin%20konsultasi%20servis%20laptop%20%2F%20upgrade%20hardware."
                  >
                    Konsultasi Servis via WA ↗
                  </a>
                </div>
              </div>

              {/* Member 02 - Felich */}
              <div className="member" data-reveal>
                <div className="avatar av-2">FE</div>
                <span className="member-role">FULL-STACK &amp; AI ENGINEER</span>
                <h3>Felich</h3>
                <p>
                  Penerjemah ide menjadi arsitektur web modern yang interaktif, cepat, dan cerdas. Pengembang utama di balik platform Felys (AI Companion), Nettas PB AI (Photobooth Cross-Platform), dan sistem pembelajaran TRPL 2026.
                </p>
                <div className="card-chips">
                  <span>Next.js &amp; Full-Stack Web</span>
                  <span>Integrasi AI &amp; Agents</span>
                  <span>Desain Web Interaktif</span>
                </div>
                <div className="member-actions">
                  <a
                    className="btn btn-ghost btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/6282386526982?text=Hai%20Felich%2C%20saya%20lihat%20portofolio%20kamu%20di%204tune.labs%20dan%20ingin%20diskusi%20pembuatan%20website%20%2F%20aplikasi."
                  >
                    Diskusi Proyek Web via WA ↗
                  </a>
                  <a
                    className="btn btn-dark btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://felich-dev.vercel.app/"
                  >
                    Portofolio (felich-dev) ↗
                  </a>
                </div>
              </div>

              {/* Member 03 - Zulkifli */}
              <div className="member" data-reveal>
                <div className="avatar av-3">ZL</div>
                <span className="member-role">ELECTRONICS &amp; REPAIR SPECIALIST</span>
                <h3>Zulkifli (&ldquo;Mamad&rdquo;)</h3>
                <p>
                  Ahli reparasi perangkat elektronik &amp; gadget (HP dan tablet), instalasi kelistrikan ringan yang aman, serta perakitan mikrokontroler sensor IoT. Mengutamakan ketelitian pada jalur fisik komponen dan solder presisi.
                </p>
                <div className="card-chips">
                  <span>Perbaikan HP &amp; Tablet</span>
                  <span>Elektronika &amp; IoT</span>
                  <span>Instalasi Listrik Ringan</span>
                  <span>Maintenance Perangkat</span>
                </div>
                <div className="member-actions">
                  <a
                    className="btn btn-ghost btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/6283159392826?text=Hai%20Zulkifli%20(Mamad)%2C%20saya%20ingin%20konsultasi%20perbaikan%20gadget%20%2F%20elektronik."
                  >
                    Konsultasi Reparasi via WA ↗
                  </a>
                </div>
              </div>

              {/* Member 04 - Dika */}
              <div className="member" data-reveal>
                <div className="avatar av-4">DI</div>
                <span className="member-role">PRODUCT &amp; UI/UX DESIGN</span>
                <h3>Dika</h3>
                <p>
                  Perancang pengalaman visual dan alur antarmuka yang bersih, ergonomis, dan tidak membingungkan pengguna non-IT. Memastikan website profil bisnis, portal edukasi, maupun dashboard sistem tampil kredibel dan berkarakter.
                </p>
                <div className="card-chips">
                  <span>UI/UX Architecture</span>
                  <span>Design Systems</span>
                  <span>Visual Identity &amp; Branding</span>
                </div>
                <div className="member-actions">
                  <a
                    className="btn btn-ghost btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/6282162411486?text=Hai%20Dika%2C%20saya%20ingin%20diskusi%20soal%20desain%20antarmuka%20dan%20tampilan%20website."
                  >
                    Diskusi Desain via WA ↗
                  </a>
                </div>
              </div>
            </div>

            <p className="team-note" data-reveal>
              <i />
              Foto profil tim sedang disiapkan. Setiap divisi ditangani langsung oleh orang yang bersangkutan — silakan hubungi langsung teknisi atau engineer yang Anda perlukan.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="cta" id="kontak">
          <div className="container">
            <p className="eyebrow" data-reveal>
              Mari Terhubung
            </p>
            <h2 data-reveal>
              Punya rencana proyek atau <em>perangkat yang perlu dibereskan?</em>
            </h2>
            <p data-reveal>
              Ceritakan kebutuhan Anda dengan bahasa apa pun — santai atau teknis.
              Dari pembuatan website portofolio/UMKM dan aplikasi berbasis AI,
              hingga servis laptop lemot, upgrade hardware, dan perbaikan perangkat.
              Konsultasi pertama santai, transparan, dan gratis tanpa komitmen.
            </p>
            <div className="cta-buttons" data-reveal>
              <a
                className="btn btn-primary magnetic"
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/6282386526982?text=Hai%204tune.labs%2C%20saya%20ingin%20konsultasi%20tentang%20pembuatan%20website%20%2F%20aplikasi."
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                WhatsApp Divisi Web &amp; Software
              </a>
              <a
                className="btn btn-ghost magnetic"
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/6283894496994?text=Hai%204tune.labs%20(Cloud%20Service)%2C%20saya%20ingin%20konsultasi%20servis%20laptop%20%2F%20upgrade%20hardware."
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                WhatsApp Servis &amp; Hardware
              </a>
              <a className="btn btn-ghost" href="mailto:4tune.labs@gmail.com">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
                <BrandText />@gmail.com
              </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 mt-4" data-reveal>
              <button
                type="button"
                onClick={() => copyToClipboard("+6282386526982", "cta-felich")}
                style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--ink-2)", background: "none", border: "none", cursor: "pointer", padding: "4px 8px", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{copiedCta === "cta-felich" ? "No WA Felich (Web) Tersalin!" : "Salin No WA Web (+62 823-8652-6982)"}</span>
              </button>
              <span style={{ color: "var(--ink-2)", opacity: 0.35 }}>•</span>
              <button
                type="button"
                onClick={() => copyToClipboard("+6283894496994", "cta-sukron")}
                style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--ink-2)", background: "none", border: "none", cursor: "pointer", padding: "4px 8px", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{copiedCta === "cta-sukron" ? "No WA Sukron (Servis) Tersalin!" : "Salin No WA Servis (+62 838-9449-6994)"}</span>
              </button>
            </div>

            <p className="cta-small" data-reveal>
              Dibalas langsung oleh teknisi &amp; engineer kami • Pengecekan transparan • Diskon servis setiap hari Jum&apos;at.
            </p>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="container">
          <div className="foot-top">
            <div className="foot-brand">
              <a
                className="brand"
                href="#top"
                onClick={(e) => handleNavClick(e, "#top")}
              >
                <svg viewBox="0 0 240 240" aria-hidden="true">
                  <use href="#mark-full" />
                </svg>
                <BrandText />
              </a>
              <p>Studio rekayasa perangkat lunak &amp; tech support hardware, dijalankan langsung oleh para teknisi dan engineernya.</p>
            </div>
            <nav className="foot-nav" aria-label="Navigasi footer">
              <div>
                <b>SITUS</b>
                <a
                  href="#solusi-kendala"
                  onClick={(e) => handleNavClick(e, "#solusi-kendala")}
                >
                  Solusi Kendala
                </a>
                <a
                  href="#layanan"
                  onClick={(e) => handleNavClick(e, "#layanan")}
                >
                  Layanan
                </a>
                <a
                  href="#paket-pilihan"
                  onClick={(e) => handleNavClick(e, "#paket-pilihan")}
                >
                  Paket Pilihan
                </a>
                <a
                  href="#kalkulator-biaya"
                  onClick={(e) => handleNavClick(e, "#kalkulator-biaya")}
                >
                  Kalkulator Biaya
                </a>
                <a
                  href="#karya"
                  onClick={(e) => handleNavClick(e, "#karya")}
                >
                  Karya
                </a>
                <a
                  href="#lab-notes"
                  onClick={(e) => handleNavClick(e, "#lab-notes")}
                >
                  Lab Notes
                </a>
                <a
                  href="#cara-kerja"
                  onClick={(e) => handleNavClick(e, "#cara-kerja")}
                >
                  Cara Kerja
                </a>
                <a
                  href="#tim"
                  onClick={(e) => handleNavClick(e, "#tim")}
                >
                  Tim
                </a>
              </div>
              <div>
                <b>KONSULTASI</b>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/6282386526982?text=Hai%204tune.labs%2C%20saya%20ingin%20tanya%20proyek%20web."
                >
                  WhatsApp Web &amp; Software
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/6283894496994?text=Hai%204tune.labs%20(Cloud%20Service)%2C%20saya%20ingin%20tanya%20servis%20hardware."
                >
                  WhatsApp Servis &amp; Hardware
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://felich-dev.vercel.app/"
                >
                  Portofolio Felich (felich-dev)
                </a>
                <a href="mailto:4tune.labs@gmail.com"><BrandText />@gmail.com</a>
              </div>
            </nav>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} <BrandText />. Seluruh hak cipta.</span>
            <span>Dibuat dengan standar kejujuran, transparansi, dan craft teknis yang tinggi.</span>
          </div>
        </div>
      </footer>

      {/* Floating In-Page Section Quick-Nav Rail */}
      <QuickNavRail />

      {/* Shared Logo SVG Symbol Definition */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <symbol id="mark-full" viewBox="0 0 240 240" fill="none">
          {/* Amber Ribbons */}
          <path
            d="M 42.77 24.24 L 91.25 24.24 L 96.48 25.66 L 101.23 28.51 L 114.53 41.82 L 114.06 43.25 L 104.55 52.75 L 102.18 51.33 L 92.2 40.87 L 89.35 39.45 L 44.2 39.45 L 40.4 42.3 L 39.45 45.15 L 39.92 63.21 L 93.62 63.68 L 78.89 78.42 L 40.4 78.42 L 39.45 79.37 L 39.45 87.92 L 40.4 90.3 L 79.84 130.22 L 80.79 132.12 L 80.79 152.55 L 32.79 104.55 L 28.04 99.33 L 25.19 93.15 L 24.24 87.92 L 24.24 43.25 L 25.19 38.97 L 27.09 34.69 L 31.84 28.99 L 36.59 26.14 L 42.3 24.71 Z M 159.21 86.5 L 211.49 140.2 L 213.86 144.0 L 215.76 150.65 L 215.76 197.7 L 212.91 205.78 L 207.21 211.96 L 204.83 213.39 L 198.18 215.76 L 148.28 215.76 L 140.2 211.96 L 128.79 200.55 L 126.89 199.6 L 124.99 196.75 L 135.45 186.3 L 147.8 198.65 L 151.13 200.55 L 196.28 200.55 L 200.55 196.28 L 200.08 176.79 L 146.38 176.79 L 146.85 174.89 L 160.16 161.58 L 199.6 161.58 L 200.55 160.63 L 200.55 152.08 L 199.6 149.7 L 159.68 108.83 L 160.16 90.3 L 159.21 86.97 Z M 87.45 159.21 L 109.31 159.68 L 119.29 169.66 L 107.88 180.59 L 87.45 159.68 Z"
            fill="#E4A932"
            fillRule="evenodd"
          />

          {/* Green Ribbons */}
          <path
            d="M 148.28 24.24 L 198.18 24.24 L 207.21 28.04 L 211.96 32.79 L 214.34 37.07 L 215.76 42.3 L 215.76 90.3 L 211.96 99.8 L 206.26 105.98 L 196.75 115.49 L 185.82 104.55 L 198.18 91.72 L 200.55 87.92 L 200.55 45.62 L 199.6 42.77 L 197.23 40.4 L 194.85 39.45 L 152.08 39.45 L 147.8 41.35 L 131.64 57.03 L 129.27 54.65 L 124.04 52.28 L 119.29 51.8 L 114.06 52.75 L 137.82 28.99 L 144.48 25.19 L 147.8 24.71 Z M 81.74 85.54 L 80.79 89.35 L 80.32 109.78 L 70.81 119.29 L 59.88 108.36 L 59.88 107.41 L 81.27 86.02 Z M 169.19 120.71 L 180.12 131.64 L 175.84 136.87 L 158.26 153.98 L 159.21 151.6 L 159.21 130.22 L 168.71 121.19 Z M 43.25 124.51 L 54.65 135.45 L 41.82 148.28 L 39.45 152.55 L 39.45 194.85 L 41.35 198.65 L 45.15 200.55 L 89.35 200.08 L 91.25 199.13 L 111.21 179.64 L 131.17 159.21 L 151.13 159.21 L 153.98 158.26 L 153.03 159.68 L 101.7 211.01 L 95.52 214.81 L 87.92 216.24 L 45.62 216.24 L 39.45 215.29 L 32.79 211.96 L 28.04 207.21 L 24.24 198.18 L 24.24 150.18 L 25.66 144.95 L 29.47 138.77 L 42.77 124.99 Z"
            fill="#369966"
            fillRule="evenodd"
          />

          {/* Center House Emblem */}
          <g>
            <path
              d="M 117.39 52.75 L 123.09 52.75 L 128.79 55.13 L 156.83 84.12 L 156.36 85.07 L 157.78 86.97 L 158.73 92.67 L 158.73 150.65 L 156.36 155.88 L 152.08 158.26 L 89.82 158.26 L 84.12 156.36 L 82.22 153.5 L 81.27 130.22 L 81.27 90.3 L 82.69 85.54 L 84.59 82.22 L 110.26 56.08 L 113.58 53.7 L 116.91 53.23 Z M 120.24 68.44 L 142.57 92.2 L 142.57 94.1 L 133.07 94.1 L 132.59 101.23 L 143.05 108.83 L 143.05 142.57 L 96.95 142.1 L 96.95 108.83 L 107.88 101.23 L 107.41 94.1 L 97.43 94.1 L 97.43 92.2 L 119.76 68.91 Z"
              fill="#424449"
              fillRule="evenodd"
              stroke="#424449"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </g>

          {/* Center Hexagon */}
          <path
            d="M 119.76 105.03 L 132.59 112.16 L 132.59 127.37 L 120.24 134.5 L 107.41 127.37 L 107.41 112.16 L 119.29 105.5 Z"
            fill="#369966"
          />
        </symbol>
      </svg>
    </div>
  );
}
