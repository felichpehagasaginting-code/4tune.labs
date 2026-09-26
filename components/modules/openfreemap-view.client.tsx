"use client";

import React, { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Configure MapLibre worker using local bundled worker assets for fast, zero-CORS initialization
if (typeof window !== "undefined") {
  try {
    const localWorker = new URL("/maplibre/maplibre-gl-worker.mjs", window.location.origin).href;
    maplibregl.setWorkerUrl(localWorker);
  } catch {
    maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
  }
}

// Koordinat Presisi Asrama Sarana Citra Widya Edukasi (SCWE) - Jl. Raya Setu, Cibuntu, Bekasi (Plus Code: M3X8+MF7)
const SCWE_COORDINATES: [number, number] = [107.06610593887473, -6.300819787803049]; // [lng, lat]

// Minimalist, fast-loading OpenFreeMap vector style
const PRIMARY_STYLE = "https://tiles.openfreemap.org/styles/positron";

// Resilient fallback raster style using global OpenStreetMap tiles (needs zero Web Worker)
const FALLBACK_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "osm",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

interface OpenFreeMapEmbedProps {
  isVisible?: boolean;
}

export function OpenFreeMapEmbed({ isVisible = true }: OpenFreeMapEmbedProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    let isDisposed = false;
    let isReady = false;
    let hasFallbackTriggered = false;

    const handleReady = (map: maplibregl.Map) => {
      if (isDisposed || isReady) return;
      isReady = true;
      setMapLoaded(true);
      try {
        map.resize();
      } catch {
        // Ignore resize error if unmounted
      }
    };

    let map: maplibregl.Map;

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: PRIMARY_STYLE,
        center: SCWE_COORDINATES,
        zoom: 16.2,
        pitch: 20,
        bearing: 0,
        attributionControl: false,
      });

      // Essential minimal controls: Zoom only
      map.addControl(
        new maplibregl.NavigationControl({
          showCompass: false,
          showZoom: true,
        }),
        "top-right"
      );

      // Discreet attribution
      map.addControl(
        new maplibregl.AttributionControl({
          compact: true,
          customAttribution: "© OpenStreetMap",
        }),
        "bottom-right"
      );

      // Marker element with clean pin & subtle pulse
      const markerEl = document.createElement("div");
      markerEl.className = "ofm-custom-marker";
      markerEl.innerHTML = `
        <div class="ofm-marker-pulse"></div>
        <div class="ofm-marker-pin">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `;

      // Compact popup
      const popup = new maplibregl.Popup({
        offset: 28,
        closeButton: true,
        closeOnClick: false,
        className: "ofm-marker-popup",
      })
        .setLngLat(SCWE_COORDINATES)
        .setHTML(`
          <div class="ofm-popup-content">
            <strong class="ofm-popup-title">4tune.labs — Lab Servis &amp; Studio</strong>
            <p class="ofm-popup-sub">Asrama SCWE Gedung 2 Lt. 3 (Kampus CWE) • Detail kamar &amp; antar-jemput via WhatsApp</p>
          </div>
        `);

      // Attach marker & popup
      const marker = new maplibregl.Marker({ element: markerEl, anchor: "bottom" })
        .setLngLat(SCWE_COORDINATES)
        .setPopup(popup)
        .addTo(map);

      // Open popup by default so user sees location immediately
      marker.togglePopup();

      // Listen for ready state
      if (map.loaded()) {
        handleReady(map);
      } else {
        map.once("load", () => handleReady(map));
        map.once("idle", () => handleReady(map));
      }

      // If style fails to load or error occurs, trigger fallback
      map.on("error", () => {
        if (!isReady && !hasFallbackTriggered && !isDisposed) {
          hasFallbackTriggered = true;
          try {
            map.setStyle(FALLBACK_STYLE);
          } catch {
            setMapError(true);
          }
        }
      });

      // Safety timer: switch to fallback if primary vector tiles take too long (> 2.5s)
      const fallbackTimer = setTimeout(() => {
        if (!isReady && !hasFallbackTriggered && !isDisposed) {
          hasFallbackTriggered = true;
          try {
            map.setStyle(FALLBACK_STYLE);
          } catch {
            handleReady(map);
          }
        }
      }, 2500);

      // Hard safety timeout: dismiss overlay under all circumstances within 3.5s
      const hardTimer = setTimeout(() => {
        if (!isDisposed) {
          handleReady(map);
        }
      }, 3500);

      mapRef.current = map;

      // Handle dynamic container resize
      const ro = new ResizeObserver(() => {
        if (!isDisposed && mapRef.current) {
          try {
            mapRef.current.resize();
          } catch {
            // Ignore
          }
        }
      });
      ro.observe(mapContainerRef.current);

      return () => {
        isDisposed = true;
        clearTimeout(fallbackTimer);
        clearTimeout(hardTimer);
        ro.disconnect();
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch {
      setMapError(true);
    }
  }, []);

  // Handle visibility changes (e.g. tab switcher in parent)
  useEffect(() => {
    if (isVisible && mapRef.current) {
      const timer = setTimeout(() => {
        try {
          mapRef.current?.resize();
        } catch {
          // Ignore
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: SCWE_COORDINATES,
        zoom: 16.2,
        pitch: 20,
        bearing: 0,
        essential: true,
      });
    }
  };

  return (
    <div className="ofm-map-wrapper" data-lenis-prevent="true">
      <div ref={mapContainerRef} className="ofm-map-container" />

      {/* Minimal Floating Reset Button */}
      <button
        type="button"
        onClick={handleResetView}
        className="ofm-reset-btn"
        title="Pusatkan kembali ke lokasi Lab Asrama SCWE"
        aria-label="Pusatkan kembali ke lokasi Lab"
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
        <span>Pusatkan</span>
      </button>

      {!mapLoaded && !mapError && (
        <div className="ofm-loading-overlay">
          <div className="ofm-spinner" />
          <span>Memuat peta...</span>
        </div>
      )}

      {mapError && (
        <div className="ofm-error-overlay">
          <p>Peta interaktif tidak dapat dimuat di browser ini.</p>
          <a
            href="https://www.google.com/maps/place/Asrama+Sarana+Citra+Widya/@-6.3008198,107.0661059,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Buka di Google Maps ↗
          </a>
        </div>
      )}
    </div>
  );
}
