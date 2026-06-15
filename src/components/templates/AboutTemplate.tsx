"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  UsersRound,
  MessageCircle,
  ClipboardCheck,
  BadgeDollarSign,
  Handshake,
  Mail,
  ArrowDown,
  Building2,
  TrendingUp,
  Cpu,
  Check,
} from "lucide-react";

import { LinkedinIcon } from "@/components/Icons";
import { useContent } from "@/hooks/useContent";
import CtaBar from "@/components/QuickQuote";
import ContactForm from "@/components/QAForm";

// ── Icon map ──
const IconMap: Record<string, React.ElementType> = {
  Award,
  UsersRound,
  MessageCircle,
  ClipboardCheck,
  BadgeDollarSign,
  Handshake,
  Building2,
  TrendingUp,
  Cpu,
  Check,
};

// ── Animation variant ──
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// ──────────────────────────────────────────────────────────────
// PILLAR CARD  (spotlight hover)
// ──────────────────────────────────────────────────────────────
function PillarCard({
  icon: IconName,
  title,
  text,
  index,
}: {
  icon: string;
  title: string;
  text: string;
  index: number;
}) {
  const Icon = IconMap[IconName] || Award;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const col = index % 3;
  const row = Math.floor(index / 3);
  const isLastCol = col === 2;
  const isLastRow = row === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col gap-4 sm:gap-5 p-5 sm:p-8 cursor-default overflow-hidden bg-white transition-all duration-300 hover:bg-[rgba(201,155,49,0.02)]
        ${!isLastCol ? "md:border-r border-[rgba(201,155,49,0.18)]" : ""}
        ${!isLastRow ? "md:border-b border-[rgba(201,155,49,0.18)]" : ""}
        border-b md:border-b-0 border-[rgba(201,155,49,0.12)] last:border-b-0
      `}
    >
      {/* Spotlight cursor */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201,155,49,0.08), transparent 80%)`,
        }}
      />
      {/* Top gold accent */}
      <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#c99b31]/0 via-[#c99b31] to-[#c99b31]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-[10.5px] font-black tracking-[0.2em] text-[#c99b31]/60 group-hover:text-[#c99b31] transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white text-[#5a7a9a] shadow-[0_2px_8px_rgba(8,38,66,0.05)] transition-all duration-300 group-hover:bg-[#c99b31] group-hover:text-white group-hover:border-[#c99b31] group-hover:shadow-[0_6px_20px_rgba(201,155,49,0.25)]">
          <Icon size={19} strokeWidth={1.85} />
        </div>
      </div>

      <h3 className="text-[15px] font-bold text-[#072642] leading-snug tracking-tight group-hover:text-[#031b31] transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-[13px] text-[#5a7a9a] leading-[1.72] flex-1 relative z-10">
        {text}
      </p>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// PARALLAX TILT
// ──────────────────────────────────────────────────────────────
function ParallaxTilt({
  children,
  className,
}: {
  children:
    | React.ReactNode
    | ((isHovered: boolean, coords: { x: number; y: number }) => React.ReactNode);
  className?: string;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    setCoords({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      animate={{
        rotateX: isHovered ? -coords.y * 10 : 0,
        rotateY: isHovered ? coords.x * 10 : 0,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 18 }}
      className={className}
    >
      {typeof children === "function" ? children(isHovered, coords) : children}
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// MAIN PAGE
// ──────────────────────────────────────────────────────────────
export default function AboutTemplate({ pageData, params }: { pageData?: any; params?: any }) {
  const { aboutPage } = useContent();

  const hero = aboutPage?.hero || {};
  const philosophy = aboutPage?.philosophy || {};
  const pillars: any[] = aboutPage?.pillars || [];
  const story = aboutPage?.story || { milestones: [] };
  const leadership = aboutPage?.leadership || { members: [] };
  const stats: any[] = aboutPage?.stats || [];

  const historySectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    document.getElementById("about-philosophy")?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll({
    target: historySectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const watermark2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const lineScaleY = useTransform(timelineScroll, [0, 1], [0, 1]);

  return (
    <main className="min-h-screen bg-white text-[#072642]">

      {/* ── HERO ── */}
      <section className="relative min-h-[440px] lg:min-h-[520px] overflow-hidden bg-[#031b31] flex items-center text-white">
        {/* Background image – slow zoom */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {hero.bgImage && (
            <Image
              src={hero.bgImage}
              alt={hero.bgImageAlt || "About us hero"}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031b31] via-[#031b31]/90 to-[#031b31]/25 md:from-[#031b31] md:via-[#031b31]/80 md:to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031b31]/50 via-transparent to-transparent z-10" />

        {/* Dot matrix */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-grid-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#ffffff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid-dots)" />
          </svg>
          {hero.coordLng && (
            <div className="absolute top-6 right-8 text-[9px] font-mono text-[#c99b31]/35 tracking-widest">
              {hero.coordLng}
            </div>
          )}
          {hero.coordLat && (
            <div className="absolute bottom-16 right-8 text-[9px] font-mono text-[#c99b31]/35 tracking-widest">
              {hero.coordLat}
            </div>
          )}
          <div className="absolute bottom-6 left-8 text-[9px] font-mono text-[#c99b31]/20 tracking-wider hidden md:block">
            BLUEPRINT_REF: ABOUT_HERO_SC // ACTIVE
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-[#c99b31]/[0.06] rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" />
        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c99b31] to-transparent z-20 opacity-70" />

        <div className="relative mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 z-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-[620px]"
          >
            {hero.tagline && (
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c99b31] animate-pulse" />
                <span className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f1cd7c]">
                  {hero.tagline}
                </span>
              </motion.div>
            )}

            <motion.h1
              variants={fadeUp}
              className="text-[28px] sm:text-[48px] lg:text-[58px] font-bold leading-[1.06] tracking-tight text-white"
            >
              {hero.heading1}
              {hero.heading1 && <br />}
              {hero.heading2}
              {hero.heading2 && <br />}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #c99b31 0%, #f1cd7c 50%, #c99b31 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {hero.heading3}
              </span>
            </motion.h1>

            {hero.description && (
              <motion.p
                variants={fadeUp}
                className="mt-4 sm:mt-5 max-w-[540px] text-[13px] sm:text-[14px] md:text-[15.5px] font-normal leading-[1.65] text-white/80"
              >
                {hero.description}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300"
          onClick={handleScrollDown}
        >
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">
            Scroll Details
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center w-7 h-7 rounded-full border border-white/20 bg-white/5 text-[#c99b31]"
          >
            <ArrowDown size={12} strokeWidth={2.5} />
          </motion.div>
        </div>
      </section>

      {/* ── CORE PHILOSOPHY & PILLARS ── */}
      <section id="about-philosophy" className="bg-white scroll-mt-24">
        <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="max-w-[650px] mb-14">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-5 h-[1.5px] bg-[#c99b31]" />
              <p className="text-[10px] font-black tracking-[0.28em] uppercase text-[#c99b31]">
                {philosophy.badge}
              </p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#072642] leading-tight tracking-tight"
            >
              {philosophy.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-4 text-[13px] sm:text-[14px] text-[#5a7a9a] leading-[1.72]"
            >
              {philosophy.description}
            </motion.p>
          </div>

          {/* Pillar Grid */}
          <div className="border border-[rgba(201,155,49,0.18)] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 bg-white shadow-sm">
            {pillars.map((pillar: any, index: number) => (
              <PillarCard
                key={pillar.title || index}
                index={index}
                icon={pillar.icon}
                title={pillar.title}
                text={pillar.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SCROLLING TIMELINE / HISTORY ── */}
      <section
        ref={historySectionRef}
        className="bg-[#f8f9fa] relative overflow-hidden border-y border-[rgba(201,155,49,0.12)] py-16 lg:py-24"
      >
        {/* Watermark parallax text */}
        <motion.div
          style={{ y: watermarkY }}
          className="absolute right-[-8%] top-[12%] text-[15vw] font-black text-[#c99b31]/[0.015] pointer-events-none select-none tracking-tighter"
        >
          ESTABLISHED 2009
        </motion.div>
        <motion.div
          style={{ y: watermark2Y }}
          className="absolute left-[-5%] bottom-[10%] text-[12vw] font-black text-[#c99b31]/[0.015] pointer-events-none select-none tracking-tighter"
        >
          FIRST CHOICE
        </motion.div>

        {/* Dot bg with parallax */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="story-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#031b31" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#story-dots)" />
          </svg>
        </motion.div>

        <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="flex flex-col gap-4 mb-16 max-w-[620px]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-[#c99b31]" />
              <p className="text-[10px] font-black tracking-[0.28em] uppercase text-[#c99b31]">
                {story.badge}
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#072642] leading-[1.12] tracking-tight">
              {story.heading1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c99b31] to-[#f1cd7c]">
                {story.heading2}
              </span>
            </h2>
            <p className="text-[14px] text-[#5a7a9a] leading-[1.7]">{story.description}</p>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Track */}
            <div className="absolute left-[12px] sm:left-[15px] lg:left-1/2 lg:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gray-200 pointer-events-none" />
            {/* Active drawing line */}
            <motion.div
              className="absolute left-[12px] sm:left-[15px] lg:left-1/2 lg:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-[#c99b31] origin-top pointer-events-none"
              style={{ scaleY: lineScaleY }}
            />

            <div className="flex flex-col">
              {(story.milestones || []).map((milestone: any, index: number) => {
                const Icon = IconMap[milestone.icon] || Award;
                const isEven = index % 2 === 1;

                return (
                  <div
                    key={milestone.year || index}
                    className="relative pb-16 lg:pb-24 last:pb-0 group overflow-hidden"
                  >
                    {/* Desktop timeline node */}
                    <motion.div
                      initial={{ scale: 0, rotate: -30, backgroundColor: "#ffffff", borderColor: "#e5e7eb", color: "#9ca3af" }}
                      whileInView={{ scale: 1, rotate: 0, backgroundColor: "#ffffff", borderColor: "#c99b31", color: "#c99b31" }}
                      viewport={{ once: false, margin: "-180px 0px -180px 0px" }}
                      transition={{ type: "spring", stiffness: 140, damping: 15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-4 w-9 h-9 rounded-full border-2 z-10 hidden lg:flex items-center justify-center shadow-[0_0_12px_rgba(8,38,66,0.05)] hover:bg-[#c99b31] hover:text-white hover:border-[#c99b31] transition-all duration-300"
                    >
                      <Icon size={14} strokeWidth={2.2} />
                    </motion.div>

                    {/* Mobile left node */}
                    <motion.div
                      initial={{ scale: 0, backgroundColor: "#ffffff", borderColor: "#e5e7eb", color: "#9ca3af" }}
                      whileInView={{ scale: 1, backgroundColor: "#ffffff", borderColor: "#c99b31", color: "#c99b31" }}
                      viewport={{ once: false, margin: "-120px 0px -120px 0px" }}
                      transition={{ type: "spring", stiffness: 180, damping: 12 }}
                      className="absolute left-[-4px] sm:left-[-1px] top-1.5 w-8 h-8 rounded-full border-2 z-10 flex lg:hidden items-center justify-center shadow-sm hover:bg-[#c99b31] hover:text-white hover:border-[#c99b31] transition-all duration-300"
                    >
                      <Icon size={13} strokeWidth={2.2} />
                    </motion.div>

                    <div className="pl-8 sm:pl-12 lg:pl-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                      {/* Text card */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? 45 : -45 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                      >
                        <ParallaxTilt className="flex flex-col gap-4 p-4 sm:p-8 rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(8,38,66,0.04)] relative overflow-hidden transition-colors duration-500 hover:border-[#c99b31]/25 group">
                          {(isHovered, coords) => (
                            <>
                              {/* Floating year watermark */}
                              <motion.div
                                animate={{
                                  x: isHovered ? coords.x * -20 : 0,
                                  y: isHovered ? coords.y * -20 : 0,
                                  scale: isHovered ? 1.05 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                                className="absolute -bottom-6 -right-6 text-[90px] font-black text-[#c99b31]/[0.04] pointer-events-none select-none tracking-tighter group-hover:text-[#c99b31]/[0.07] transition-colors duration-300"
                              >
                                {milestone.year}
                              </motion.div>

                              <div className="flex items-center justify-between flex-wrap gap-2 relative z-10">
                                <span className="text-[26px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#c99b31] to-[#f1cd7c]">
                                  {milestone.year}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(201,155,49,0.08)] border border-[rgba(201,155,49,0.18)] text-[9px] font-black text-[#c99b31] uppercase tracking-widest">
                                  {milestone.highlight}
                                </span>
                              </div>

                              <h3 className="text-[16px] font-bold text-[#072642] tracking-tight relative z-10 uppercase">
                                {milestone.title}
                              </h3>
                              <p className="text-[13px] text-[#5a7a9a] leading-[1.7] relative z-10">
                                {milestone.desc}
                              </p>

                              {milestone.achievements && (
                                <ul className="mt-2 space-y-2.5 text-[12.5px] text-[#5a7a9a] relative z-10 border-t border-gray-100 pt-4">
                                  {milestone.achievements.map((ach: string, bulletIdx: number) => (
                                    <motion.li
                                      key={bulletIdx}
                                      initial={{ opacity: 0, x: -8 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.4, delay: 0.15 + bulletIdx * 0.08 }}
                                      className="flex items-start gap-2.5"
                                    >
                                      <span className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-[rgba(201,155,49,0.08)] text-[#c99b31] mt-0.5 shadow-sm">
                                        <Check size={9} strokeWidth={3} />
                                      </span>
                                      <span>{ach}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              )}
                            </>
                          )}
                        </ParallaxTilt>
                      </motion.div>

                      {/* Photo card */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -45 : 45 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                      >
                        <ParallaxTilt className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-gray-100 shadow-[0_6px_25px_rgba(8,38,66,0.05)] bg-white group">
                          {(isHovered, coords) => (
                            <>
                              {/* Inner gold frame in 3D */}
                              <motion.div
                                style={{ transformStyle: "preserve-3d", zIndex: 20 }}
                                animate={{
                                  x: isHovered ? coords.x * 12 : 0,
                                  y: isHovered ? coords.y * 12 : 0,
                                }}
                                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                                className="absolute inset-2.5 border border-[#c99b31]/15 group-hover:border-[#c99b31]/25 transition-colors duration-500 z-20 pointer-events-none rounded-xl"
                              />
                              {/* Dot overlay */}
                              <motion.div
                                animate={{
                                  x: isHovered ? -coords.x * 5 : 0,
                                  y: isHovered ? -coords.y * 5 : 0,
                                  opacity: isHovered ? 0.05 : 0.01,
                                }}
                                className="absolute inset-0 pointer-events-none z-10"
                                style={{
                                  backgroundImage: `radial-gradient(circle, #c99b31 1px, transparent 1px)`,
                                  backgroundSize: "20px 20px",
                                }}
                              />
                              {/* Image */}
                              <motion.div
                                className="absolute inset-0 w-full h-full"
                                style={{ transformStyle: "preserve-3d" }}
                                animate={{
                                  scale: isHovered ? 1.04 : 1,
                                  x: isHovered ? coords.x * -6 : 0,
                                  y: isHovered ? coords.y * -6 : 0,
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                              >
                                {milestone.image && (
                                  <Image
                                    src={milestone.image}
                                    alt={milestone.imageAlt || milestone.title}
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="object-cover"
                                  />
                                )}
                              </motion.div>
                            </>
                          )}
                        </ParallaxTilt>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE LEADERSHIP ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Header */}
          <div className="text-center max-w-[620px] mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="w-5 h-[1.5px] bg-[#c99b31]" />
              <p className="text-[10px] font-black tracking-[0.28em] uppercase text-[#c99b31]">
                {leadership.badge}
              </p>
              <span className="w-5 h-[1.5px] bg-[#c99b31]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#072642] leading-tight tracking-tight">
              {leadership.heading}
            </h2>
            <p className="mt-4 text-[14px] text-[#5a7a9a] leading-[1.7]">
              {leadership.description}
            </p>
          </div>

          {/* Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(leadership.members || []).map((member: any, index: number) => {
              const nameParts = member.name?.split(", ") || [];
              const credentialLabel = nameParts[1] || "";

              return (
                <motion.div
                  key={member.name || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group flex flex-col bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#c99b31]/25 overflow-hidden"
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-[5/4] overflow-hidden border-b border-gray-100">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.imageAlt || member.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover object-top transition-transform duration-[1000ms] group-hover:scale-105"
                      />
                    )}

                    {/* Credential badge */}
                    {credentialLabel && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#031b31] border border-[#c99b31]/30 text-[#c99b31] text-[9px] font-black tracking-widest uppercase shadow-lg backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c99b31] animate-pulse" />
                          {credentialLabel}
                        </span>
                      </div>
                    )}

                    {/* LinkedIn / Mail overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031b31]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 z-10">
                      <div className="flex gap-2">
                        <Link
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#c99b31] hover:text-white transition duration-200"
                          aria-label="LinkedIn Profile"
                        >
                          <LinkedinIcon className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href="mailto:info@firstchoicepg.com"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#c99b31] hover:text-white transition duration-200"
                          aria-label="Email Member"
                        >
                          <Mail size={14} />
                        </Link>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">
                        FCPG Executive
                      </span>
                    </div>
                  </div>

                  {/* Profile details */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3 flex-grow border-t-2 border-transparent group-hover:border-[#c99b31] transition-colors duration-500">
                    <div>
                      <h3 className="text-[15.5px] font-bold text-[#072642] tracking-tight group-hover:text-[#c99b31] transition-colors duration-200">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-[#c99b31] uppercase tracking-wider mt-0.5">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-[12.5px] text-[#5a7a9a] leading-[1.72] flex-grow">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="relative bg-[#031b31] text-white py-14 overflow-hidden border-y border-[#c99b31]/20">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(201,155,49,0.04)] to-transparent pointer-events-none" />
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stats-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stats-grid)" />
          </svg>
        </div>

        <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            {stats.map((stat: any, idx: number) => (
              <div
                key={stat.label || idx}
                className={`flex flex-col gap-1.5 ${idx >= 2 ? "pt-6 md:pt-0" : ""}`}
              >
                <span
                  className="text-[26px] sm:text-[32px] md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #c99b31 0%, #f1cd7c 50%, #c99b31 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-[10.5px] uppercase font-bold tracking-[0.15em] text-white/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM FUNNEL ── */}
      <CtaBar />
      <ContactForm />
    </main>
  );
}
