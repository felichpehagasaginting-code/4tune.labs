"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, Activity, Cpu, ArrowRight } from "lucide-react";
import { useLenis } from "@/providers/smooth-scroll.client";

export interface ProjectSpec {
  refId: string;
  codename: string;
  domain: string;
  category: "Systems" | "Hardware" | "SaaS" | "Applied R&D";
  architectureOverview: string;
  stack: string[];
  productionMetric: string;
  deliverables: string[];
  topology: string;
}

interface SpecDrawerProps {
  project: ProjectSpec | null;
  onClose: () => void;
  onEngage: (domain: string) => void;
}

export function SpecDrawer({ project, onClose, onEngage }: SpecDrawerProps) {
  const lenis = useLenis();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleAction = () => {
    onClose();
    onEngage(project.domain);
    if (lenis) {
      lenis.scrollTo("#inquiry", { offset: -60 });
    } else {
      document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Slide-Over Drawer Container */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Engineering Specification for ${project.codename}`}
        className="relative z-10 w-full max-w-xl bg-surface border-l border-subtle h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-subtle flex items-center justify-between sticky top-0 bg-surface/95 backdrop-blur z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent-amber font-semibold">
                {project.refId}
              </span>
              <span className="text-muted">•</span>
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-canvas border border-subtle text-secondary">
                {project.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-primary mt-1">
              {project.codename}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close specification drawer"
            className="p-2 rounded hover:bg-surface-hover text-secondary hover:text-primary border border-subtle focus-ring transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Domain & Overview */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted mb-1">
              ENGINEERING DOMAIN
            </div>
            <div className="text-sm font-medium text-primary mb-3">
              {project.domain}
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed bg-canvas p-3 rounded border border-subtle">
              {project.architectureOverview}
            </p>
          </div>

          {/* Benchmark Production Metric */}
          <div className="p-4 rounded-xl bg-surface border border-subtle">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider mb-1">
              <Activity size={14} />
              <span>MEASURED PRODUCTION OUTCOME</span>
            </div>
            <div className="text-sm font-mono font-medium text-primary">
              {project.productionMetric}
            </div>
          </div>

          {/* System Topology Diagram */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted mb-2">
              SYSTEM ARCHITECTURE TOPOLOGY
            </div>
            <div className="p-3 rounded bg-canvas border border-subtle font-mono text-[11px] text-muted overflow-x-auto select-all">
              <pre className="whitespace-pre">{project.topology.trim()}</pre>
            </div>
          </div>

          {/* Stack & Dependency Tree */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted mb-2">
              <Cpu size={13} className="text-neutral-300" />
              <span>PRIMARY TECH STACK &amp; RUNTIME</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-canvas border border-subtle text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables Delivered */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted mb-2">
              PRODUCTION DELIVERABLES
            </div>
            <ul className="space-y-2">
              {project.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-secondary">
                  <CheckCircle2 size={13} className="text-neutral-300 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Drawer Action Footer */}
        <div className="p-6 border-t border-subtle bg-surface sticky bottom-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAction}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 active:scale-95 transition-all focus-ring shadow-sm"
          >
            <span>Konsultasikan Arsitektur Serupa</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </aside>
    </div>
  );
}
