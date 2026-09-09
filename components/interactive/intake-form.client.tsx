"use client";

import React, { useState } from "react";
import { MessageSquare, CheckCircle2, Send, PhoneCall, Sparkles, ArrowRight, Check, HeartHandshake } from "lucide-react";

interface IntakeFormProps {
  initialDomain?: string;
}

export function IntakeForm({ initialDomain }: IntakeFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState(""); // WhatsApp or Email
  const [affiliation, setAffiliation] = useState(""); // Kampus / Nama Usaha
  const [projectChoice, setProjectChoice] = useState(
    initialDomain || "Website Portofolio Mahasiswa"
  );
  const [description, setDescription] = useState("");
  const [preferredBuilder, setPreferredBuilder] = useState<"Siapa Saja" | "Felich" | "Sukron" | "Zulkifli" | "Dika">("Siapa Saja");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const projectChoices = [
    {
      title: "Website Portofolio Mahasiswa",
      desc: "Buat pameran karya, CV online, magang, atau tugas akhir kuliah."
    },
    {
      title: "Company Profile Usaha / UMKM",
      desc: "Buat profil bisnis lokal, toko, katalog produk, & tombol order ke WA."
    },
    {
      title: "Web App / Dashboard Sederhana",
      desc: "Sistem pencatatan data stok, inventaris, atau formulir pendaftaran."
    },
    {
      title: "Proyek Elektronika & IoT",
      desc: "Bantuan perakitan sensor Arduino/ESP32 & grafik monitoring data."
    }
  ];

  const builders = [
    { name: "Siapa Saja", phone: "6282386526982", role: "Diskusi Santai Bareng Tim" },
    { name: "Felich", phone: "6282386526982", role: "Web Frontend & Fitur AI" },
    { name: "Sukron", phone: "6283894496994", role: "Server, Hosting & Database" },
    { name: "Zulkifli", phone: "6283159392826", role: "Alat Elektronik & Sensor IoT" },
    { name: "Dika", phone: "6282162411486", role: "Desain Tampilan & UI/UX" }
  ];

  const activeBuilder = builders.find((b) => b.name === preferredBuilder) || builders[0]!;

  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `Halo teman-teman 4tune.labs!\n\n` +
      `Saya mau tanya-tanya / konsultasi seputar pembuatan proyek:\n` +
      `• Nama: ${name || "Kawan"}\n` +
      `• Kampus / Usaha: ${affiliation || "-"}\n` +
      `• Kontak: ${contact || "-"}\n` +
      `• Jenis Kebutuhan: ${projectChoice}\n` +
      `• Ingin Ngobrol Sama: ${preferredBuilder}\n\n` +
      `Gambaran / Catatan Tambahan:\n${description || "Mau tanya-tanya dulu seputar estimasi dan biayanya."}\n\n` +
      `Makasih ya!`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact || !description) {
      alert("Mohon isi nama, kontak WhatsApp/email, dan gambaran kebutuhanmu ya!");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName: name,
          workEmail: contact,
          companyName: affiliation || "Mahasiswa / Personal",
          domainClassification: projectChoice,
          technicalScope: description,
          routingFounder: preferredBuilder
        })
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-24 border-b border-subtle bg-canvas relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.015] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-subtle text-neutral-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>07. Konsultasi Santai</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
            Punya Rencana Bikin Website? <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Ceritakan Idemu pada Kami.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-secondary leading-relaxed">
            Mau buat website tugas kuliah, portofolio magang, profil bisnismu, atau sekadar tanya estimasi biaya dulu? Nggak usah sungkan, kami siap bantu!
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8 sm:p-10 rounded-2xl bg-surface/80 border border-subtle backdrop-blur-md shadow-2xl">
          {isSuccess ? (
            /* Success Message */
            <div className="space-y-6 text-center py-8">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white shadow-lg">
                <CheckCircle2 size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-primary">
                  Pesanmu Sudah Kami Terima!
                </h3>
                <p className="text-sm text-secondary max-w-md mx-auto leading-relaxed">
                  Terima kasih sudah menghubungi kami. Salah satu dari kami akan segera membalas lewat kontak WhatsApp atau email yang kamu cantumkan.
                </p>
              </div>

              {/* Instant WhatsApp Shortcut */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${activeBuilder.phone}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
                >
                  <PhoneCall size={15} />
                  <span>Chat Langsung via WhatsApp ({activeBuilder.name})</span>
                </a>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-3 rounded-xl bg-canvas border border-subtle text-xs text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Consultation Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Project Choice */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-muted block">
                  1. Apa yang Mau Kamu Buat?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectChoices.map((choice) => (
                    <div
                      key={choice.title}
                      onClick={() => setProjectChoice(choice.title)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        projectChoice === choice.title
                          ? "bg-canvas border-white/50 shadow-sm"
                          : "bg-canvas/50 border-subtle hover:border-strong hover:bg-canvas"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary">{choice.title}</span>
                        {projectChoice === choice.title && (
                          <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center">
                            <Check size={11} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-secondary mt-1 leading-relaxed">
                        {choice.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Contact Info */}
              <div className="space-y-4">
                <label className="text-xs font-mono uppercase tracking-wider text-muted block">
                  2. Kontak Kamu:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs text-secondary">Nama Lengkap / Panggilan *</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Budi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas border border-subtle text-primary text-xs focus:border-neutral-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs text-secondary">No. WhatsApp / Email *</span>
                    <input
                      type="text"
                      required
                      placeholder="0812xxxx atau email"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas border border-subtle text-primary text-xs focus:border-neutral-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs text-secondary">Kampus / Nama Usaha (Opsional)</span>
                    <input
                      type="text"
                      placeholder="e.g. Universitas X / Kedai Kopi"
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas border border-subtle text-primary text-xs focus:border-neutral-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Project Scope */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted block">
                  3. Ceritakan Gambaran Singkatnya:
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan dengan bahasa santai aja. Contoh: 'Halo, saya mau bikin website portofolio buat daftar magang bulan depan, ada galeri karya foto dan CV...'"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas border border-subtle text-primary text-xs leading-relaxed focus:border-neutral-400 focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* Step 4: Routing */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted block">
                  4. Mau Ngobrol Langsung Sama Siapa?
                </label>
                <div className="flex flex-wrap gap-2">
                  {builders.map((b) => (
                    <button
                      type="button"
                      key={b.name}
                      onClick={() => setPreferredBuilder(b.name as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        preferredBuilder === b.name
                          ? "bg-white text-black font-bold shadow-sm"
                          : "bg-canvas border border-subtle text-secondary hover:text-primary"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submission CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-subtle">
                <div className="text-[11px] text-muted flex items-center gap-2">
                  <HeartHandshake size={14} className="text-neutral-300" />
                  <span>Konsultasi santai, ramah, dan tanpa dipungut biaya awal.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Direct WhatsApp Option */}
                  <a
                    href={`https://wa.me/${activeBuilder.phone}?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface border border-subtle hover:border-neutral-400 text-primary text-xs font-mono transition-colors"
                  >
                    <PhoneCall size={14} />
                    <span>Chat WhatsApp</span>
                  </a>

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 active:scale-95 transition-all shadow-md disabled:opacity-60 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Mengirimkan..." : "Kirimkan Pesan"}</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
