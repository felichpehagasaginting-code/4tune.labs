"use client";

import React, { useState, useRef } from "react";
import { ArrowUpRight, Github, Linkedin, Globe, Cpu, Terminal, Sparkles, Layers, ShieldCheck, Mail, HeartHandshake } from "lucide-react";

interface Engineer {
  id: string;
  name: string;
  role: string;
  badge: string;
  tagline: string;
  bio: string;
  skills: string[];
  status: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

const ENGINEERS: Engineer[] = [
  {
    id: "felich",
    name: "Felich",
    role: "Full-Stack Web & AI Developer",
    badge: "Web & Applied AI",
    tagline: "Bikin website modern yang cepat, estetik, dan interaktif.",
    bio: "Fokus pada pembuatan website modern menggunakan Next.js & React, serta integrasi AI simpel yang bikin tugas atau operasional usaha jadi serba otomatis.",
    skills: ["Next.js", "React", "TypeScript", "Python", "Web Interaktif"],
    status: "Siap Diajak Diskusi",
    portfolioUrl: "https://felich-dev.vercel.app/",
    githubUrl: "https://github.com/felichpehagasaginting-code",
    linkedinUrl: "https://www.linkedin.com/in/felich-pehagasa-ginting",
  },
  {
    id: "sukron",
    name: "Sukron",
    role: "Backend & Cloud Infrastructure",
    badge: "Server & Database",
    tagline: "Memastikan website dan database kamu online stabil 24/7.",
    bio: "Menangani hosting, server, dan database agar website kamu nggak gampang lemot, aman dari error, dan siap dikunjungi banyak orang sekaligus.",
    skills: ["Backend API", "Database", "Hosting & Domain", "Cloud Setup"],
    status: "Siap Bantu Server",
    githubUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: "zulkifli",
    name: "Zulkifli",
    role: "Hardware & IoT Specialist",
    badge: "Elektronika & IoT",
    tagline: "Merakit sensor dan mikrokontroler buat tugas akhir atau monitoring.",
    bio: "Membantu pembuatan alat fisik berbasis Arduino, ESP32, atau sensor pintar yang datanya bisa langsung dipantau lewat website di layar HP kamu.",
    skills: ["Arduino / ESP32", "Sensor IoT", "Prototipe Alat", "Perakitan Sirkuit"],
    status: "Siap Rakit Alat",
    githubUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: "dika",
    name: "Dika",
    role: "UI/UX & Frontend Designer",
    badge: "Tampilan & Desain",
    tagline: "Bikin desain website yang rapi, cantik, dan gampang dipakai.",
    bio: "Bertanggung jawab atas tampilan visual agar website kamu terlihat profesional, enak dilihat, dan nyaman digunakan baik di layar HP maupun laptop.",
    skills: ["UI/UX Design", "Desain Responsif", "Animasi Halus", "Tailwind CSS"],
    status: "Siap Desain Web",
    githubUrl: "#",
    linkedinUrl: "#",
  },
];

export function PrincipalSpotlight() {
  const [activeId, setActiveId] = useState<string>("felich");

  return (
    <section id="principals" className="py-24 relative overflow-hidden border-b border-subtle bg-canvas">
      {/* Subtle soft neutral ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.015] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-subtle text-neutral-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>02. Tim Builder Kami</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
            Kenalan dengan 4 Mahasiswa <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              di Balik 4tune.labs.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-secondary leading-relaxed">
            Kami sesama mahasiswa yang suka ngulik teknologi dan ngoding. Kamu bisa ngobrol santai langsung dengan kami tanpa sungkan atau takut bingung sama istilah teknis.
          </p>
        </div>

        {/* 4 Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGINEERS.map((eng) => (
            <EngineerCard
              key={eng.id}
              engineer={eng}
              isActive={activeId === eng.id}
              onSelect={() => setActiveId(eng.id)}
            />
          ))}
        </div>

        {/* Collective Trust Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-surface/60 border border-subtle backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-primary flex items-center justify-center md:justify-start gap-2">
              <HeartHandshake className="text-neutral-300 w-5 h-5 flex-shrink-0" />
              <span>Pendampingan Ramah dari Awal Sampai Jadi</span>
            </h4>
            <p className="text-xs sm:text-sm text-secondary max-w-2xl">
              Nggak paham hosting, domain, atau cara naruh website di internet? Tenang aja, semua kami bantu siapkan sampai websitemu siap ditunjukkan ke dosen, klien, atau pelanggan.
            </p>
          </div>

          <a
            href="#inquiry"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
          >
            <span>Yuk Ngobrol Santai</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function EngineerCard({
  engineer,
  isActive,
  onSelect,
}: {
  engineer: Engineer;
  isActive: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onSelect();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${
          isHovered ? "scale3d(1.02, 1.02, 1.02)" : "scale3d(1, 1, 1)"
        }`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className={`relative group rounded-2xl border p-6 flex flex-col justify-between transition-colors duration-300 backdrop-blur-md cursor-pointer select-none ${
        isActive || isHovered
          ? "border-white/30 bg-surface-elev shadow-xl"
          : "border-subtle bg-surface/70 hover:border-neutral-600"
      }`}
    >
      {/* Specular Radial Light Reflection */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.06), transparent 70%)`,
        }}
      />

      {/* Card Header & Badge */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-canvas border border-subtle text-neutral-200 font-semibold">
            {engineer.badge}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            Online
          </span>
        </div>

        {/* Engineer Avatar & Name Lockup */}
        <div>
          <h3 className="text-2xl font-bold text-primary group-hover:text-white transition-colors flex items-center justify-between">
            <span>{engineer.name}</span>
            {engineer.portfolioUrl && (
              <a
                href={engineer.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Kunjungi Portfolio Pribadi Felich"
                className="text-secondary hover:text-white transition-colors p-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight size={18} />
              </a>
            )}
          </h3>
          <p className="text-xs text-secondary font-mono mt-1 font-medium">
            {engineer.role}
          </p>
        </div>

        {/* Tagline & Bio */}
        <p className="text-xs text-primary/90 font-medium leading-relaxed">
          {engineer.tagline}
        </p>
        <p className="text-[12px] text-secondary leading-relaxed">
          {engineer.bio}
        </p>

        {/* Skills Tag Pills */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {engineer.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas/80 border border-subtle text-secondary group-hover:border-neutral-600 group-hover:text-primary transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Card Bottom: Status & Socials */}
      <div className="relative z-10 mt-6 pt-4 border-t border-subtle flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted group-hover:text-primary transition-colors">
          {engineer.status}
        </span>

        <div className="flex items-center gap-1.5">
          {engineer.portfolioUrl && (
            <a
              href={engineer.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Portfolio"
              className="p-1.5 rounded-md text-secondary hover:text-white hover:bg-canvas transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={15} />
            </a>
          )}
          {engineer.githubUrl && engineer.githubUrl !== "#" && (
            <a
              href={engineer.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="p-1.5 rounded-md text-secondary hover:text-primary hover:bg-canvas transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={15} />
            </a>
          )}
          {engineer.linkedinUrl && engineer.linkedinUrl !== "#" && (
            <a
              href={engineer.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="p-1.5 rounded-md text-secondary hover:text-primary hover:bg-canvas transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
