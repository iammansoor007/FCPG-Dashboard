"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useContent } from "../hooks/useContent";

export default function ResourcesFAQ({ currentPage, hideHeader, hideBackground }: { currentPage?: string; hideHeader?: boolean; hideBackground?: boolean } = {}) {
  const { resourcesFAQ } = useContent();

  const {
    badge = "FAQs",
    heading1 = "Start a Conversation.",
    heading2 = "Answers to Your Questions.",
    description = "",
    supportCard = {
      title: "Direct Support Office",
      subtitle: "Contact us directly for rapid response",
      stats: [
        { label: "SLA Response", value: "< 2 Hrs" },
        { label: "Phone Wait", value: "< 1 Min" },
        { label: "Resolution", value: "98.5%" }
      ],
      phone: "(864) 326-0000",
      phoneHref: "tel:8643260000",
      email: "info@firstchoicepg.com",
      emailHref: "mailto:info@firstchoicepg.com",
      ctaHref: "/contact",
      ctaLabel: "Schedule a Consultation"
    },
    faqs = []
  } = resourcesFAQ || {};

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative bg-gradient-to-b from-white via-[#f7f8fa] to-[#f3f4f7] overflow-hidden py-12 lg:py-16"
      style={{ borderTop: "1px solid #eceae4" }}>
      
      {/* ── Background Dot Grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          inset: "-40%",
          backgroundImage: "radial-gradient(rgba(5, 41, 70, 0.05) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Floating Animated Gold Dashed Outlines */}
      <div className="absolute top-8 left-[6%] w-64 h-64 rounded-full border border-dashed border-[var(--brand-gold)]/8 pointer-events-none animate-[spin_90s_linear_infinite] z-0" />
      <div className="absolute bottom-12 right-[4%] w-80 h-80 rounded-full border border-dashed border-[var(--brand-gold)]/6 pointer-events-none animate-[spin_130s_linear_infinite_reverse] z-0" />

      {/* Soft Ambient Gold Glow */}
      <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-[var(--brand-gold)]/[0.06] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-[5%] w-[450px] h-[450px] bg-[#052946]/[0.04] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Title + Support Stats Card */}
          <div className="lg:col-span-5 flex flex-col justify-start">

            {/* Elegant badge */}
            <div className="inline-flex items-center gap-2 mb-5 border border-[var(--brand-gold)]/25 rounded-full px-3.5 py-1.5 bg-[var(--brand-gold)]/[0.03] shadow-[0_2px_10px_rgba(201,155,49,0.03)] w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-gold)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-gold)]"></span>
              </span>
              <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[var(--brand-gold)]">{badge}</p>
            </div>

            {/* Title */}
            <h2
              className="font-display font-bold text-[var(--text-navy)] leading-[1.1] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 2.8rem)" }}
            >
              <span className="font-serif italic font-normal text-[var(--text-navy)]/95 block mb-1">
                {heading1}
              </span>
              <span
                className="shimmer-gradient block mt-1"
                style={{
                  color: "transparent",
                  backgroundImage: "linear-gradient(90deg, #c99b31 0%, #f1cd7c 25%, #c99b31 50%, #f1cd7c 75%, #c99b31 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundSize: "200% auto",
                }}
              >
                {heading2}
              </span>
            </h2>

            <p className="text-[13.5px] font-sans leading-[1.7] text-[var(--text-slate)] mb-6 max-w-[480px]">
              {description}
            </p>

            {/* Premium Gold Accent Line Divider */}
            <div className="h-[1.5px] w-20 bg-gradient-to-r from-[var(--brand-gold)] to-transparent mb-8" />

            {/* Premium Support Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-6 sm:p-8 w-full rounded-[24px] bg-gradient-to-br from-[#062c4d] to-[#031b31] text-white overflow-hidden shadow-2xl border border-[rgba(201,155,49,0.25)] flex flex-col gap-6"
            >
              {/* Dot Matrix Pattern Overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="card-dot-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.2" fill="#ffffff" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#card-dot-pattern)" />
              </svg>

              {/* Gold Ambient Glow Blob */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[var(--brand-gold)]/20 rounded-full blur-[40px] pointer-events-none" />

              {/* Card Title Block */}
              <div className="relative z-10 flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10 shadow-inner">
                  <HelpCircle size={20} className="text-[var(--brand-gold)]" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-[16px] text-[var(--brand-gold)] leading-tight">{supportCard?.title}</h4>
                  <p className="text-[12px] text-white/70 mt-1">{supportCard?.subtitle}</p>
                </div>
              </div>

              {/* Minimalist 3-Column Stats Row */}
              <div className="grid grid-cols-3 gap-1 relative z-10 py-4 border-t border-b border-white/10">
                {(supportCard?.stats || []).map((stat: any, i: number) => (
                  <div key={stat.label} className={`flex flex-col${i > 0 ? " border-l border-white/10 pl-3" : ""}`}>
                    <span className={`text-[20px] sm:text-[22px] font-black font-sans leading-none${i === 1 ? " text-[var(--brand-gold)]" : " text-white"}`}>{stat.value}</span>
                    <span className="text-[8.5px] text-white/50 font-bold uppercase tracking-wider mt-1.5 leading-tight">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Direct Contact Links */}
              <div className="relative z-10 flex flex-col gap-3.5 text-[13px] font-semibold text-white/90">
                <a href={supportCard?.phoneHref} className="group/link flex items-center gap-3 hover:text-[var(--brand-gold)] transition-colors duration-200">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover/link:border-[var(--brand-gold)]/40 group-hover/link:bg-[var(--brand-gold)]/[0.03] transition-all duration-200">
                    <Phone size={13} className="text-[var(--brand-gold)]" />
                  </span>
                  {supportCard?.phone}
                </a>
                <a href={supportCard?.emailHref} className="group/link flex items-center gap-3 hover:text-[var(--brand-gold)] transition-colors duration-200">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover/link:border-[var(--brand-gold)]/40 group-hover/link:bg-[var(--brand-gold)]/[0.03] transition-all duration-200">
                    <Mail size={13} className="text-[var(--brand-gold)]" />
                  </span>
                  {supportCard?.email}
                </a>
              </div>

              {/* Direct Action Link */}
              <Link
                href={supportCard?.ctaHref || "#"}
                className="group relative z-10 w-full h-[46px] rounded-[4px] bg-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/90 text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-black/10 border border-[var(--brand-gold)]"
              >
                {supportCard?.ctaLabel}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </motion.div>

          </div>

          {/* Right Column: Premium Accordion FAQs */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="divide-y divide-[rgba(5,41,70,0.08)] border-b border-[rgba(5,41,70,0.08)]">
              {(faqs || []).map((faq: any, idx: number) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={idx} className="py-5 first:pt-0 last:pb-5 transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="group/btn w-full flex items-center justify-between text-left font-display font-bold text-[15.5px] sm:text-[17px] text-[var(--text-navy)] hover:text-[var(--brand-gold)] transition-colors duration-200 py-2.5 cursor-pointer"
                    >
                      <span className="flex items-start gap-4 pr-6">
                        {/* Serif Gold Counter */}
                        <span className={`font-serif italic font-normal text-[16px] sm:text-[18px] tracking-wide transition-colors duration-200 mt-0.5 ${isOpen ? "text-[var(--brand-gold)]" : "text-[var(--brand-gold)]/40"
                          }`}>
                          {String(idx + 1).padStart(2, "0")}.
                        </span>
                        <span className={`transition-all duration-300 block ${isOpen ? "text-[var(--brand-gold)] translate-x-1" : "group-hover/btn:translate-x-1"
                          }`}>
                          {faq.q}
                        </span>
                      </span>

                      {/* Rotating Plus SVG */}
                      <span className={`flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
                          ? "border-[var(--brand-gold)] bg-[var(--brand-gold)] text-white shadow-md shadow-brand-gold/15"
                          : "border-[rgba(5,41,70,0.12)] bg-transparent text-[rgba(5,41,70,0.4)] group-hover/btn:border-[var(--brand-gold)]/40 group-hover/btn:text-[var(--brand-gold)]"
                        }`}>
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-45 text-white" : "text-current"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        >
                          <div className="pl-9 pr-6 pb-2 pt-2 text-[13.5px] sm:text-[14px] font-sans text-[var(--text-slate)] leading-[1.78]">
                            <p className="pl-1 text-[var(--text-slate)]/90">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
