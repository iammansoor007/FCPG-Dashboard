"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BadgeDollarSign, Handshake, MessageCircle,
  UsersRound, ClipboardCheck, Cpu, ArrowRight,
} from "lucide-react";
import { useContent } from "../hooks/useContent";

interface FeatureCellProps {
  icon: any;
  title: string;
  text: string;
  index: number;
  totalCols?: number;
  total?: number;
}

/* Border-sharing grid cell — used by Stripe, Linear, Notion for clean feature grids */
function FeatureCell({ icon: Icon, title, text, index, totalCols = 3, total = 6 }: FeatureCellProps) {
  const col = index % totalCols;          // 0-based column
  const row = Math.floor(index / totalCols); // 0-based row
  const totalRows = Math.ceil(total / totalCols);
  const isLastCol = col === totalCols - 1;
  const isLastRow = row === totalRows - 1;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={[
        "group relative flex flex-col gap-5 p-8 cursor-default overflow-hidden",
        "transition-all duration-300 hover:bg-[rgba(201,155,49,0.02)]",
        !isLastCol ? "border-r border-[rgba(201,155,49,0.18)]" : "",
        !isLastRow ? "border-b border-[rgba(201,155,49,0.18)]" : "",
      ].join(" ")}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 155, 49, 0.075), transparent 80%)`
        }}
      />

      {/* Gold top-sweep line on hover */}
      <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-gold/0 via-brand-gold to-brand-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Top row: number + icon */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-[10.5px] font-black tracking-[0.2em] text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white text-text-slate shadow-[0_2px_8px_rgba(8,38,66,0.05)] transition-all duration-400 group-hover:bg-brand-gold group-hover:text-white group-hover:border-brand-gold group-hover:shadow-[0_6px_20px_rgba(201,155,49,0.25)]">
          <Icon size={19} strokeWidth={1.85} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-bold text-text-navy leading-snug tracking-tight group-hover:text-primary-navy transition-colors duration-300 relative z-10">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[13px] text-text-slate leading-[1.72] font-sans flex-1 relative z-10">
        {text}
      </p>
    </motion.div>
  );
}

export default function WhyChoose() {
  const { sectionHeaders, whyChoose } = useContent();

  const sh = sectionHeaders?.whyChoose || {
    badge: "Why First Choice",
    heading1: "A Partner You Can",
    heading2: "Rely On",
    description: "",
    primaryCta: "Get Started",
    secondaryCta: "About Our Company",
    trustLine: ""
  };

  const valuesRaw = whyChoose?.values || [];

  const IconMap: Record<string, any> = {
    BadgeDollarSign,
    Handshake,
    MessageCircle,
    UsersRound,
    ClipboardCheck,
    Cpu
  };

  const values = valuesRaw.map((val: any) => ({
    ...val,
    icon: IconMap[val.icon] || ClipboardCheck
  }));

  return (
    <section id="about-us" className="bg-white">
      <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-8 py-16 lg:py-24">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[520px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-brand-gold" />
              <p className="text-[10px] font-black tracking-[0.28em] uppercase text-brand-gold">
                {sh.badge}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-text-navy leading-[1.1] tracking-tight">
              {sh.heading1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-tagline-gold">
                {sh.heading2}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 md:max-w-[380px]"
          >
            <p className="text-[15px] text-text-slate leading-[1.75] font-sans">
              {sh.description}
            </p>

            {/* Dual CTA row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary — gold */}
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2.5 h-12 px-6 rounded-[4px] font-bold text-[11px] uppercase tracking-wider transition-all duration-300 active:scale-[0.97] shadow-md hover:shadow-xl"
                style={{ backgroundColor: "var(--brand-gold)", color: "#ffffff" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--tagline-gold)"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--brand-gold)"}
              >
                {sh.primaryCta}
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Secondary — outlined navy */}
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-[4px] font-bold text-[11px] uppercase tracking-wider border transition-all duration-300 active:scale-[0.97]"
                style={{ borderColor: "var(--primary-navy)", color: "var(--primary-navy)", backgroundColor: "transparent" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--primary-navy)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--primary-navy)"; }}
              >
                {sh.secondaryCta}
              </Link>
            </div>

            {/* Trust micro-line */}
            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <p className="text-[11px] text-text-slate font-medium">
                {sh.trustLine}
              </p>
            </div>
          </motion.div>
        </div>


        {/* ── Feature grid — border-sharing ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl border border-[#e8ecf0] overflow-hidden"
        >
          {values.map((v: any, i: number) => (
            <FeatureCell key={v.title} {...v} index={i} total={values.length} />
          ))}
        </div>

      </div>
    </section>
  );
}
