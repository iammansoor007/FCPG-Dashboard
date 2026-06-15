"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Check } from "lucide-react";
import { useContent } from "../hooks/useContent";

/* ─── Sub-components ────────────────────────────────────── */
function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="var(--brand-gold)">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-display font-bold shrink-0 text-[11px]"
      style={{
        width: 36,
        height: 36,
        background: "linear-gradient(135deg, var(--primary-navy), var(--midnight-navy))",
        color: "var(--brand-gold)",
        border: "1.5px solid rgba(201,155,49,0.25)",
      }}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ t }: { t: any }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between rounded-2xl p-6 bg-white/80 backdrop-blur-md border border-[rgba(5,41,70,0.06)] shadow-[0_8px_32px_0_rgba(8,38,66,0.02)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(201,155,49,0.08)] hover:border-[rgba(201,155,49,0.45)] hover:-translate-y-1 overflow-hidden"
      style={{
        transitionProperty: "box-shadow, border-color, transform",
      }}
    >
      {/* Gold top sweep line on hover */}
      <span className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-2xl bg-gradient-to-r from-brand-gold/0 via-brand-gold to-brand-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 155, 49, 0.08), transparent 80%)`
        }}
      />

      {/* Ghosted quote mark in the top-right corner */}
      <div className="absolute top-4 right-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-300 pointer-events-none">
        <Quote size={28} className="text-[var(--text-navy)]" strokeWidth={1.5} />
      </div>

      <div className="relative z-10">
        <Stars />
        <blockquote className="font-sans font-medium text-[var(--text-slate)] leading-[1.68] mt-4 text-[13px] sm:text-[13.5px] italic">
          "{t.quote}"
        </blockquote>
      </div>

      <div className="relative z-10 flex items-center gap-3 mt-6 pt-4 border-t border-[rgba(5,41,70,0.05)]">
        <Avatar initials={t.initials} />
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-sans font-bold text-[var(--text-navy)] text-[12.5px] leading-tight">{t.name}</p>
            <div className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]">
              <Check size={9} strokeWidth={3.5} />
            </div>
          </div>
          <p className="font-sans text-[10.5px] text-[var(--text-slate)] mt-0.5 leading-tight">{t.title} · {t.location}</p>
          <p className="font-sans font-medium text-[9px] text-[var(--brand-gold)] mt-0.5 tracking-wider uppercase">{t.years}</p>
        </div>
      </div>
    </div>
  );
}

interface MarqueeColumnProps {
  list: any[];
  direction?: "up" | "down";
  speed?: string;
  className?: string;
}

function MarqueeColumn({ list, direction = "up", speed = "45s", className = "" }: MarqueeColumnProps) {
  // Render array twice to enable seamless looping
  const doubledList = [...list, ...list];

  return (
    <div className={`relative overflow-hidden h-full ${className}`}>
      <div
        className={`marquee-track flex flex-col gap-6 py-3 cursor-pointer ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
          }`}
        style={{
          "--duration": speed,
        } as React.CSSProperties}
      >
        {doubledList.map((t, idx) => (
          <TestimonialCard key={`${t.name}-${idx}`} t={t} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────── */
export default function Testimonials() {
  const { sectionHeaders, testimonials: testimonialsData } = useContent();

  const sh = sectionHeaders?.testimonials || {
    badge: "Client Stories",
    heading1: "Stories of Impact.",
    heading2: "Shared by Our Communities.",
    description: ""
  };

  const list = testimonialsData?.testimonials || [];
  
  // Safely divide into columns:
  const col1 = list.filter((_: any, idx: number) => idx % 3 === 0);
  const col2 = list.filter((_: any, idx: number) => idx % 3 === 1);
  const col3 = list.filter((_: any, idx: number) => idx % 3 === 2);

  if (list.length === 0) return null;

  return (
    <section id="testimonials" className="relative bg-white overflow-hidden"
      style={{ borderTop: "1px solid #eceae4" }}>

      {/* Animation keyframes are defined globally in app/globals.css for performance */}

      {/* ── Tilted grid lines background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          inset: "-40%",
          backgroundImage: `
            linear-gradient(rgba(5,41,70,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5,41,70,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          transform: "rotate(15deg)",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* ── Background Ambient Glow Blobs (Drifting Fluid Motion) ── */}
      <motion.div
        animate={{
          scale: [1, 1.12, 0.92, 1],
          x: [0, 25, -20, 0],
          y: [0, -20, 30, 0]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[30%] left-[15%] w-[420px] h-[420px] bg-[var(--brand-gold)]/[0.04] rounded-full blur-[110px] pointer-events-none select-none z-0"
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1.15, 1],
          x: [0, -30, 25, 0],
          y: [0, 25, -20, 0]
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[20%] right-[15%] w-[480px] h-[480px] bg-[#052946]/[0.045] rounded-full blur-[130px] pointer-events-none select-none z-0"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* ── Section Header ── */}
        <div className="text-center max-w-[700px] mx-auto mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Elegant capsule section badge with double-ripple pulse */}
            <div className="inline-flex items-center gap-2 mb-6 border border-[var(--brand-gold)]/25 rounded-full px-3.5 py-1.5 bg-[var(--brand-gold)]/[0.03] shadow-[0_2px_10px_rgba(201,155,49,0.03)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-gold)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-gold)]"></span>
              </span>
              <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[var(--brand-gold)]">{sh.badge}</p>
            </div>

            <h2
              className="font-display font-bold text-[var(--text-navy)] leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
            >
              <span className="font-serif italic font-normal text-[var(--text-navy)]/95 block mb-1">
                {sh.heading1}
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
                {sh.heading2}
              </span>
            </h2>

            <p className="mt-4 font-sans text-[var(--text-slate)] leading-[1.78]" style={{ fontSize: "14px" }}>
              {sh.description}
            </p>
          </motion.div>
        </div>

        {/* ── Marquee container ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden w-full h-[640px] rounded-[32px] border border-[rgba(5,41,70,0.05)] bg-white/40 backdrop-blur-[4px] shadow-[0_4px_30px_rgba(8,38,66,0.015)]"
        >

          {/* Side, top, and bottom vignettes for dramatic fade effect */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none z-20" />

          {/* Scrolling Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full px-6 py-2">
            {/* Column 1: Left - Scrolls Downward. Visible on Tablet & Desktop */}
            {col1.length > 0 && (
              <MarqueeColumn
                list={col1}
                direction="down"
                speed="48s"
                className="hidden md:block"
              />
            )}

            {/* Column 2: Center - Scrolls Upward. Always Visible */}
            {col2.length > 0 && (
              <MarqueeColumn
                list={col2}
                direction="up"
                speed="40s"
                className="block"
              />
            )}

            {/* Column 3: Right - Scrolls Downward. Visible on Desktop */}
            {col3.length > 0 && (
              <MarqueeColumn
                list={col3}
                direction="down"
                speed="52s"
                className="hidden lg:block"
              />
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}