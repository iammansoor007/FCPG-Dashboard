"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useContent } from "../hooks/useContent";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

function Counter({ to, suffix = "", duration = 1.5 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);
  
  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
    }
  }, [inView, count, to, duration]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function ProofBar() {
  const { whyChooseUs, about } = useContent();

  // Dynamically pull stats from CMS: try whyChooseUs first, then about, then fall back
  const cmsStats = whyChooseUs?.stats || about?.stats || [];
  const badge = whyChooseUs?.section?.badge || about?.badge || "Track Record";

  const defaultStats = [
    { to: 15, suffix: "+", label: "Years Experience", sub: "Veteran-owned local expertise in Greenville, SC." },
    { to: 500, suffix: "+", label: "Premium Projects", sub: "Residential and commercial roofs completed with precision." },
    { to: 100, suffix: "%", label: "Satisfaction", sub: "Fully backing all our exterior craftsmanship." },
    { to: 10, suffix: "yr", label: "Workmanship Warranty", sub: "Long-term warranties alongside lifetime material guarantees." }
  ];

  const stats = cmsStats.length > 0
    ? cmsStats.map((s: any) => ({
        to: typeof s.value === 'number' ? s.value : parseFloat(String(s.value)) || 0,
        suffix: s.suffix || "",
        label: s.label || "",
        sub: s.sub || s.description || "Durable exterior building solutions."
      }))
    : defaultStats;

  return (
    <section className="bg-white border-y border-gray-200">
      <div className="mx-auto max-w-[1160px] px-6 py-8 sm:py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <span style={{ display: "block", height: "2px", width: "24px", background: "#c99b31", borderRadius: "9999px" }} />
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#052946" }}>
            {badge}
          </p>
          <span style={{ display: "block", height: "1px", flex: 1, background: "linear-gradient(90deg, #c99b31, transparent)", opacity: 0.3 }} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map(({ to, suffix, label, sub }: any, i: number) => (
            <motion.div
              key={label || i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2 pl-4"
              style={{ borderLeft: "3px solid #c99b31" }}
            >
              <p style={{ fontSize: "38px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", color: "#052946", fontFamily: "var(--font-display)" }} className="font-heading">
                <Counter to={to} suffix={suffix} />
              </p>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#052946", marginTop: "4px" }}>
                {label}
              </p>
              <p style={{ fontSize: "11.5px", color: "#43566a", lineHeight: 1.5 }}>
                {sub}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}