"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroLogoAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const amber1 = svgRef.current.querySelector("#logo-part-amber-topleft");
    const amber2 = svgRef.current.querySelector("#logo-part-amber-bottomright");
    const emerald1 = svgRef.current.querySelector("#logo-part-emerald-topright");
    const emerald2 = svgRef.current.querySelector("#logo-part-emerald-bottomleft");
    const housing = svgRef.current.querySelector("#logo-part-housing");
    const hex = svgRef.current.querySelector("#logo-part-hex");
    const wordmark = svgRef.current.querySelector("#logo-wordmark");

    // Initial exploded state
    gsap.set(amber1, { x: -80, y: -60, rotation: -18, opacity: 0.35, transformOrigin: "center center" });
    gsap.set(amber2, { x: 80, y: 60, rotation: -18, opacity: 0.35, transformOrigin: "center center" });
    gsap.set(emerald1, { x: 80, y: -60, rotation: 18, opacity: 0.35, transformOrigin: "center center" });
    gsap.set(emerald2, { x: -80, y: 60, rotation: 18, opacity: 0.35, transformOrigin: "center center" });
    gsap.set(housing, { y: -70, scale: 0.7, opacity: 0, transformOrigin: "center center" });
    gsap.set(hex, { scale: 0.1, opacity: 0, transformOrigin: "center center" });
    gsap.set(wordmark, { y: 35, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1
      }
    });

    // Phase 1: Convergence and intertwining (0% -> 60% of scroll)
    tl.to(
      [amber1, amber2, emerald1, emerald2],
      {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.6
      },
      0
    )
      .to(
        housing,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.5
        },
        0.15
      )
      .to(
        hex,
        {
          scale: 1,
          opacity: 1,
          ease: "back.out(1.7)",
          duration: 0.4
        },
        0.3
      )
      .to(
        wordmark,
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.4
        },
        0.4
      );

    // Phase 2: Precision Lock pulse (60% -> 75%)
    tl.to(
      svgRef.current,
      {
        scale: 1.04,
        filter: "drop-shadow(0 4px 24px rgba(255, 255, 255, 0.08))",
        duration: 0.15,
        ease: "power1.inOut"
      },
      0.65
    ).to(
      svgRef.current,
      {
        scale: 1,
        filter: "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
        duration: 0.15,
        ease: "power1.inOut"
      },
      0.8
    );

    // Phase 3: Fly-to-Nav Morph (80% -> 100%)
    // Shrinks and moves towards the top-left navigation slot
    tl.to(
      svgRef.current,
      {
        scale: 0.22,
        y: -320,
        x: -240,
        opacity: 0,
        ease: "power3.in",
        duration: 0.3
      },
      0.85
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-logo-stage"
      className="relative w-full min-h-[55vh] flex flex-col items-center justify-center pointer-events-none select-none my-6"
      aria-hidden="true"
    >
      {/* Precision Engineering Blueprint Reticle & Calibration Grid */}
      <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] border border-dashed border-subtle/80 flex items-center justify-center -z-10">
        {/* Axis Crosshairs */}
        <div className="absolute inset-x-0 h-px bg-subtle/70" />
        <div className="absolute inset-y-0 w-px bg-subtle/70" />

        {/* Concentric Calibration Circles */}
        <div className="w-[75%] h-[75%] rounded-full border border-subtle/40" />
        <div className="w-[50%] h-[50%] rounded-full border border-dashed border-subtle/30" />

        {/* Corner Crop Marks with Monospace Calibration Tags */}
        <span className="absolute top-2 left-2 text-[9px] font-mono text-muted">┌ [CAD: 000.00]</span>
        <span className="absolute top-2 right-2 text-[9px] font-mono text-muted">[ROT: 0.00°] ┐</span>
        <span className="absolute bottom-2 left-2 text-[9px] font-mono text-muted">└ [AXIS: SYM_4]</span>
        <span className="absolute bottom-2 right-2 text-[9px] font-mono text-muted">[LENIS_SCRUB] ┘</span>
      </div>

      {/* Kinetic SVG Target Container */}
      <div className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] flex items-center justify-center relative">
        <svg
          ref={svgRef}
          viewBox="0 0 500 520"
          width="100%"
          height="100%"
          fill="none"
          className="overflow-visible"
        >
          {/* Amber Quadrant 1 (Top-Left Ribbon + Crossbar) */}
          <g id="logo-part-amber-topleft" stroke="#E5A024" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 230 135 H 175 C 152 135 135 152 135 175 V 230 C 135 242 145 250 160 250 H 220" />
            <path d="M 135 190 H 215" strokeWidth="20" />
            <path d="M 175 175 L 250 250" strokeWidth="24" />
          </g>

          {/* Amber Quadrant 2 (Bottom-Right Ribbon + Crossbar) */}
          <g id="logo-part-amber-bottomright" stroke="#E5A024" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 270 365 H 325 C 348 365 365 348 365 325 V 270 C 365 258 355 250 340 250 H 280" />
            <path d="M 285 310 H 365" strokeWidth="20" />
            <path d="M 250 250 L 325 325" strokeWidth="24" />
          </g>

          {/* Emerald Quadrant 1 (Top-Right Ribbon + Stem) */}
          <g id="logo-part-emerald-topright" stroke="#239D60" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 270 135 H 325 C 348 135 365 152 365 175 V 230 C 365 242 355 250 340 250" />
            <path d="M 325 135 V 225" strokeWidth="20" />
            <path d="M 325 175 L 250 250" strokeWidth="24" />
          </g>

          {/* Emerald Quadrant 2 (Bottom-Left Ribbon + Stem) */}
          <g id="logo-part-emerald-bottomleft" stroke="#239D60" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 230 365 H 175 C 152 365 135 348 135 325 V 270 C 135 258 145 250 160 250" />
            <path d="M 175 275 V 365" strokeWidth="20" />
            <path d="M 250 250 L 175 325" strokeWidth="24" />
          </g>

          {/* Central Charcoal Housing / Arrow Structure */}
          <g id="logo-part-housing">
            <path
              d="M 250 148 L 298 194 V 292 H 202 V 194 Z"
              fill="#2D3139"
              stroke="#2D3139"
              strokeWidth="10"
              strokeLinejoin="round"
            />
            <path
              d="M 250 178 L 274 204 H 262 V 274 H 238 V 204 H 226 Z"
              fill="#FFFFFF"
            />
          </g>

          {/* Central Emerald Core Hexagon */}
          <g id="logo-part-hex">
            <polygon
              points="250,224 268,234 268,256 250,266 232,256 232,234"
              fill="#239D60"
            />
          </g>

          {/* Typography Wordmark */}
          <g id="logo-wordmark" transform="translate(250, 440)" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="52" letterSpacing="-0.03em">
            <text y="0">
              <tspan id="logo-wordmark-4" fill="#E5A024">4</tspan>
              <tspan id="logo-wordmark-tune" fill="#239D60">tune</tspan>
              <tspan id="logo-wordmark-labs" fill="#2D3139" fontWeight="600">.labs</tspan>
            </text>
          </g>
        </svg>
      </div>

      <div className="text-xs font-mono text-muted tracking-widest uppercase mt-2 opacity-60">
        [ SCROLL TO ASSEMBLE ARCHITECTURE ]
      </div>
    </div>
  );
}
