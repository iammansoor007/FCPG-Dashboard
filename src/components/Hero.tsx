"use client";

import { motion, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useContent } from "../hooks/useContent";
import RichTextRenderer from "./ui/RichTextRenderer";
import videowrapper from "../assets/videowrapper.png";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Hero() {
  const { hero } = useContent();
  const sectionRef = useRef<HTMLElement>(null);

  const {
    badge = "Premium Exterior Solutions",
    headlines = [],
    description = "",
    buttons = [],
    images = [],
    bgImageAlt = "RealRoof Hero Background"
  } = hero || {};

  // Dynamically resolve headings based on highlights in the CMS
  const highlightLine = headlines.find((h: any) => h.highlight)?.text || headlines[headlines.length - 1]?.text || "Built to Last";
  const plainLines = headlines.filter((h: any) => !h.highlight && h.text !== highlightLine).map((h: any) => h.text);
  const heading1 = plainLines[0] || "Greenville's Premium";
  const heading2 = plainLines[1] || "Roofing Contractors";
  const heading3 = highlightLine;

  const bgImageSrc = images?.[0] || videowrapper.src;

  const primaryBtn = buttons.find((btn: any) => btn.primary) || buttons[0] || { text: "Get Quote", href: "#contact" };
  const secondaryBtn = buttons.find((btn: any) => !btn.primary) || buttons[1] || { text: "Learn More", href: "#services" };

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden bg-[var(--midnight-navy)] flex items-center text-white min-h-[85vh] lg:min-h-[90vh]">
      {/* Background image with Ken Burns slow scale loop */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={bgImageSrc}
          alt={bgImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Visual overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--midnight-navy)] via-[var(--midnight-navy)]/85 to-[var(--midnight-navy)]/15 md:from-[var(--midnight-navy)] md:via-[var(--midnight-navy)]/80 md:to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight-navy)]/40 via-transparent to-transparent z-10" />

      {/* Grid Dot Matrix Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-dots)" />
        </svg>
      </div>

      {/* Radial soft gold and sapphire ambient glows */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-[var(--brand-gold)]/[0.06] rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" />
      <div className="absolute bottom-4 right-1/4 w-[400px] h-[400px] bg-[#052946]/[0.4] rounded-full blur-[110px] pointer-events-none z-10" />

      {/* Premium thin gold bottom fading border line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--brand-gold)] to-transparent z-20 opacity-70" />

      <div className="relative mx-auto w-full max-w-[1160px] px-6 lg:px-8 py-10 lg:py-16 z-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-[620px]"
        >
          {/* Tagline pill */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)] animate-pulse" />
            <span className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--tagline-gold)]">
              {badge}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[32px] sm:text-[45px] lg:text-[54px] font-display font-bold leading-[1.08] tracking-tight text-white font-heading"
          >
            {heading1}
            <br />
            {heading2}
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #c99b31 0%, #f1cd7c 50%, #c99b31 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading3}
            </span>
          </motion.h1>
          
          <motion.div
            variants={fadeUp}
            className="mt-3 max-w-[520px] text-[13.5px] md:text-[15px] font-normal leading-[1.65] text-white/80"
          >
            <RichTextRenderer content={description} stripParagraphs={true} />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-wrap gap-4"
          >
            {/* Primary CTA */}
            <Link
              href={primaryBtn.href || "#contact"}
              className="group inline-flex h-[48px] items-center justify-center gap-2.5 bg-[var(--brand-gold)] border border-[var(--brand-gold)] px-6 text-[12px] font-bold uppercase text-white tracking-wider transition-all duration-200 hover:bg-white hover:!text-[#031b31] hover:border-white active:scale-[0.97] rounded-[4px] shadow-lg shadow-black/10 hover:shadow-[0_8px_25px_rgba(201,155,49,0.35)]"
            >
              <CalendarDays size={14} className="transition-transform duration-300 group-hover:rotate-12" />
              {primaryBtn.text}
            </Link>
            {/* Secondary CTA */}
            <Link
              href={secondaryBtn.href || "#contact"}
              className="inline-flex h-[48px] items-center justify-center border border-white/30 bg-transparent px-6 text-[12px] font-bold uppercase text-white/90 tracking-wider transition-all duration-200 hover:bg-white/10 hover:border-white active:scale-[0.97] rounded-[4px]"
            >
              {secondaryBtn.text}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
