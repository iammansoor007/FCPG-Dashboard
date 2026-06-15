"use client";

import { motion } from "framer-motion";
import { useContent } from "../hooks/useContent";

export default function TrustStrip() {
  const { sectionHeaders, trustStrip } = useContent();

  const sh = sectionHeaders?.trustStrip || {
    badge: "Our Commitments",
    heading1: "Standards That",
    heading2: "Don't Bend.",
    description: ""
  };

  const { pillars = [], credentials = [], bgText = "FC" } = trustStrip || {};
  const marqueeItems = [...credentials, ...credentials];

  return (
    <section id="trust-strip" className="relative bg-white overflow-hidden"
      style={{ borderTop: "1px solid #eceae4" }}>

      {/* ── Tilted grid lines ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          inset: "-40%",
          backgroundImage: `
            linear-gradient(rgba(5,41,70,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5,41,70,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          transform: "rotate(15deg)",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* ── Large decorative BG number ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute right-[-2%] top-1/2 -translate-y-1/2 font-display font-black leading-none"
        style={{
          fontSize: "clamp(16rem, 30vw, 28rem)",
          color: "rgba(5,41,70,0.028)",
          letterSpacing: "-0.06em",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {bgText}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-0">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-7 bg-brand-gold" />
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-brand-gold">
                {sh.badge}
              </p>
            </div>
            <h2
              className="font-display font-bold text-text-navy leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
            >
              {sh.heading1}{" "}
              <br className="hidden sm:block" />
              {sh.heading2}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans leading-[1.82] text-text-slate md:max-w-[320px] md:pb-1"
            style={{ fontSize: "13.5px" }}
          >
            {sh.description}
          </motion.p>
        </div>

        {/* ── Thick gold rule ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 mb-0 h-[1.5px] w-full origin-left"
          style={{ background: "linear-gradient(90deg, #c99b31, rgba(201,155,49,0.1))" }}
        />

        {/* ── Horizontal stat strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {(pillars || []).map((p: any, i: number) => (
            <motion.div
              key={p.stat}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col py-10 px-6 cursor-default"
              style={{
                borderRight: i < 3 ? "1px solid rgba(5,41,70,0.08)" : "none",
                borderBottom: "1px solid rgba(5,41,70,0.08)",
              }}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(160deg, rgba(201,155,49,0.05) 0%, transparent 80%)" }}
              />

              {/* Bottom gold accent on hover */}
              <span
                className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg,#c99b31,transparent)" }}
              />

              {/* Giant stat */}
              <span
                className="font-display font-black leading-[0.9] tracking-tight mb-4 relative z-10"
                style={{
                  fontSize: "clamp(3.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.05em",
                  background: "linear-gradient(135deg, #052946 0%, #0a4a82 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundImage = "linear-gradient(135deg,#c99b31,#e8b84b)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundImage = "linear-gradient(135deg, #052946 0%, #0a4a82 100%)";
                }}
              >
                {p.stat}
              </span>

              {/* Label */}
              <p
                className="font-sans font-black uppercase tracking-[0.16em] mb-3 relative z-10"
                style={{ fontSize: "9.5px", color: "#c99b31" }}
              >
                {p.label}
              </p>

              {/* Body */}
              <p
                className="font-sans leading-[1.78] relative z-10"
                style={{ fontSize: "13px", color: "#43566a" }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Full-bleed marquee ── */}
      <div
        className="relative w-full overflow-hidden mt-0"
        style={{
          background: "linear-gradient(90deg, #052946 0%, #07375e 100%)",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: "linear-gradient(90deg,#052946,transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: "linear-gradient(270deg,#07375e,transparent)" }} />

        <div className="animate-trust-marquee" style={{ display: "flex", width: "max-content" }}>
          {marqueeItems.map((c, i) => (
            <div key={i} className="inline-flex items-center gap-4 px-8 shrink-0">
              <span style={{
                display: "inline-block", width: "5px", height: "5px",
                background: "#c99b31", transform: "rotate(45deg)", opacity: 0.8, flexShrink: 0,
              }} />
              <span
                className="font-sans font-semibold uppercase whitespace-nowrap"
                style={{ fontSize: "10.5px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.6)" }}
              >
                {c}
              </span>
            </div>
          ))}
        </div>

        {/* Animation keyframes are defined globally in app/globals.css for performance */}
      </div>
    </section>
  );
}