"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MapPin, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useContent } from "../hooks/useContent";

export default function ServiceAreas() {
  const { sectionHeaders, serviceAreas } = useContent();

  const sh = sectionHeaders?.serviceAreas || {
    badge: "Proudly Serving",
    heading1: "Statewide Coverage.",
    heading2: "Local Management Expertise.",
    description: ""
  };

  const {
    coordinateLabels = [],
    mapVersionLabel = "",
    tooltipLabels = {
      statewideTitle: "Statewide Operations",
      statewideUnit: "Active Regions",
      statewideDesc: "Full-service management solutions across South Carolina."
    },
    ctaLabel = "Request a Consultation",
    citiesData = []
  } = serviceAreas || {};

  const [activeCity, setActiveCity] = useState<string | null>(null);
  const activeCityData = citiesData.find((c: any) => c.id === activeCity);

  return (
    <section id="service-areas" className="relative bg-white overflow-hidden py-12 lg:py-16"
      style={{ borderTop: "1px solid #eceae4" }}>

      {/* Soft Gold Ambient Glow Blob */}
      <motion.div
        animate={{
          scale: [1, 1.15, 0.95, 1],
          x: [0, 20, -15, 0],
          y: [0, -15, 20, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-[10%] w-[450px] h-[450px] bg-[var(--brand-gold)]/[0.045] rounded-full blur-[110px] pointer-events-none select-none z-0"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] items-center gap-12 lg:gap-16">

          {/* Left Column: Copy + City Cards */}
          <div className="flex flex-col items-start justify-center">

            {/* Elegant capsule section badge */}
            <div className="inline-flex items-center gap-2 mb-4 border border-[var(--brand-gold)]/25 rounded-full px-3.5 py-1.5 bg-[var(--brand-gold)]/[0.03] shadow-[0_2px_10px_rgba(201,155,49,0.03)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-gold)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-gold)]"></span>
              </span>
              <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[var(--brand-gold)]">{sh.badge}</p>
            </div>

            {/* Editorial Title */}
            <h2
              className="font-display font-bold text-[var(--text-navy)] leading-[1.1] tracking-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
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

            <p className="text-[13.5px] font-sans leading-[1.7] text-[var(--text-slate)] mb-6 max-w-[480px]">
              {sh.description}
            </p>

            {/* City Chips Grid */}
            <div className="grid grid-cols-2 gap-3 w-full mb-6">
              {citiesData.map((city: any, idx: number) => {
                const isActive = activeCity === city.id;
                return (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03, duration: 0.5 }}
                    onMouseEnter={() => setActiveCity(city.id)}
                    onMouseLeave={() => setActiveCity(null)}
                    className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(8,38,66,0.01)] ${isActive
                        ? "bg-white border-[rgba(201,155,49,0.45)] shadow-[0_6px_20px_rgba(201,155,49,0.06)] -translate-y-0.5"
                        : "bg-white/80 backdrop-blur-sm border-[rgba(5,41,70,0.04)] hover:bg-white hover:border-[rgba(201,155,49,0.2)] hover:shadow-[0_4px_12px_rgba(8,38,66,0.02)]"
                      }`}
                  >
                    {/* Left side: Dot + Name */}
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${isActive ? "bg-[var(--brand-gold)] scale-110 shadow-[0_0_6px_var(--brand-gold)]" : "bg-black/10 group-hover:bg-[var(--brand-gold)]/30"
                        }`} />
                      <h4 className={`font-display font-bold text-[12.5px] transition-colors duration-200 ${isActive ? "text-[var(--text-navy)]" : "text-[var(--text-navy)]/80"
                        }`}>
                        {city.name}
                      </h4>
                    </div>

                    {/* Right side: Count + Detail */}
                    <div className="flex items-baseline gap-1">
                      <span className={`font-sans font-black text-[13.5px] leading-none transition-colors duration-200 ${isActive ? "text-[var(--brand-gold)]" : "text-[var(--text-navy)]/70"
                        }`}>
                        {city.count}
                      </span>
                      <span className={`font-sans text-[8px] font-semibold uppercase tracking-wider transition-colors duration-200 ${isActive ? "text-[var(--text-navy)]" : "text-[var(--text-slate)]/50"
                        }`}>
                        {city.type.split(" ").slice(-1)[0]}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              href="#contact"
              className="group inline-flex h-[44px] items-center justify-center gap-2.5 bg-[var(--brand-gold)] border border-[var(--brand-gold)] px-6 text-[11px] font-bold uppercase !text-white hover:!text-white tracking-wider transition-all duration-200 hover:bg-[var(--primary-navy)] hover:border-[var(--primary-navy)] active:scale-[0.97] rounded-[4px] shadow-lg shadow-black/5"
            >
              {ctaLabel}
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

          </div>

          {/* Right Column: Dynamic Map Dashboard */}
          <div className="relative flex justify-center items-center w-full">

            {/* Dashboard Map Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-[4/3] max-w-[650px] rounded-[32px] border border-[rgba(5,41,70,0.06)] bg-white/40 backdrop-blur-[4px] shadow-[0_12px_40px_rgba(8,38,66,0.03)] p-6 overflow-hidden flex items-center justify-center hover:border-[rgba(201,155,49,0.35)] hover:shadow-[0_20px_50px_rgba(201,155,49,0.08)] transition-all duration-300"
            >
              {/* Info Tooltip Overlay */}
              <div className="absolute bottom-4 left-4 p-4 rounded-xl border border-[rgba(201,155,49,0.18)] bg-[var(--primary-navy)]/95 backdrop-blur-md shadow-2xl z-30 pointer-events-none min-w-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCity ? activeCity : "statewide"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeCityData ? (
                      <>
                        <div className="flex items-center gap-2 mb-1 text-[var(--brand-gold)]">
                          <MapPin size={13} className="shrink-0 animate-bounce" />
                          <p className="font-display font-bold text-[12px] uppercase tracking-wider">{activeCityData.name}</p>
                        </div>
                        <p className="font-sans font-black text-white text-[24px] leading-none tracking-tight">
                          {activeCityData.count}
                        </p>
                        <p className="font-sans font-semibold text-[var(--brand-gold)]/80 text-[9.5px] uppercase tracking-widest mt-1">
                          {activeCityData.type}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1 text-[var(--brand-gold)]/60">
                          <Building2 size={13} className="shrink-0" />
                          <p className="font-display font-bold text-[11px] uppercase tracking-wider">{tooltipLabels.statewideTitle}</p>
                        </div>
                        <p className="font-sans font-black text-white text-[24px] leading-none tracking-tight">
                          8 <span className="text-[12px] text-white/50 font-normal">{tooltipLabels.statewideUnit}</span>
                        </p>
                        <p className="font-sans font-semibold text-white/50 text-[9.5px] uppercase tracking-widest mt-1">
                          {tooltipLabels.statewideDesc}
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* South Carolina Interactive Map */}
              <svg viewBox="0 0 520 390" role="img" aria-label="South Carolina service area map" className="h-auto w-full drop-shadow-md relative z-10 select-none">
                <defs>
                  {/* Deep navy-to-midnight gradient for the map body */}
                  <linearGradient id="map-fill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-navy)" />
                    <stop offset="100%" stopColor="var(--midnight-navy)" />
                  </linearGradient>

                  {/* Gold border gradient for the map outline */}
                  <linearGradient id="map-border-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--brand-gold)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#e8b84b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--brand-gold)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {/* Transformed Map Group to Center & Scale South Carolina Shape */}
                <g transform="translate(-2990, -1410) scale(4.3)">

                  {/* State outline - Navy gradient layer */}
                  <path
                    d="M 764.94328,408.16488 L 763.16622,409.13438 L 760.57965,407.84109 L 759.93301,405.7395 L 758.63973,402.18297 L 756.37647,400.08137 L 753.7899,399.43473 L 752.1733,394.58492 L 749.42506,388.60347 L 745.22189,386.66353 L 743.12029,384.72361 L 741.82701,382.13704 L 739.72542,380.1971 L 737.46217,378.90382 L 735.19892,375.99393 L 732.12737,373.73069 L 727.60086,371.95241 L 727.11588,370.49747 L 724.69098,367.58758 L 724.20599,366.13262 L 720.81111,360.95949 L 717.41624,361.12115 L 713.37472,358.69623 L 712.08144,357.40295 L 711.75812,355.62468 L 712.56642,353.68476 L 714.82967,352.71478 L 714.31885,350.4257 L 720.08695,348.08913 L 729.20245,343.50013 L 736.97718,342.69182 L 753.09158,342.26934 L 755.72983,344.14677 L 757.40893,347.50499 L 761.71128,346.89501 L 774.32081,345.44005 L 777.2307,346.24836 L 789.84024,353.84642 L 799.94832,361.9681 L 794.52715,367.42644 L 791.94058,373.56954 L 791.4556,379.8743 L 789.839,380.6826 L 788.70737,383.43083 L 786.28247,384.07747 L 784.18088,387.634 L 781.43265,390.38223 L 779.16941,393.7771 L 777.5528,394.5854 L 773.99627,397.98027 L 771.08638,398.14193 L 772.05635,401.37514 L 767.04487,406.8716 L 764.94328,408.16488 z"
                    fill="url(#map-fill-grad)"
                  />

                  {/* State outline - Glowing border line */}
                  <path
                    d="M 764.94328,408.16488 L 763.16622,409.13438 L 760.57965,407.84109 L 759.93301,405.7395 L 758.63973,402.18297 L 756.37647,400.08137 L 753.7899,399.43473 L 752.1733,394.58492 L 749.42506,388.60347 L 745.22189,386.66353 L 743.12029,384.72361 L 741.82701,382.13704 L 739.72542,380.1971 L 737.46217,378.90382 L 735.19892,375.99393 L 732.12737,373.73069 L 727.60086,371.95241 L 727.11588,370.49747 L 724.69098,367.58758 L 724.20599,366.13262 L 720.81111,360.95949 L 717.41624,361.12115 L 713.37472,358.69623 L 712.08144,357.40295 L 711.75812,355.62468 L 712.56642,353.68476 L 714.82967,352.71478 L 714.31885,350.4257 L 720.08695,348.08913 L 729.20245,343.50013 L 736.97718,342.69182 L 753.09158,342.26934 L 755.72983,344.14677 L 757.40893,347.50499 L 761.71128,346.89501 L 774.32081,345.44005 L 777.2307,346.24836 L 789.84024,353.84642 L 799.94832,361.9681 L 794.52715,367.42644 L 791.94058,373.56954 L 791.4556,379.8743 L 789.839,380.6826 L 788.70737,383.43083 L 786.28247,384.07747 L 784.18088,387.634 L 781.43265,390.38223 L 779.16941,393.7771 L 777.5528,394.5854 L 773.99627,397.98027 L 771.08638,398.14193 L 772.05635,401.37514 L 767.04487,406.8716 L 764.94328,408.16488 z"
                    fill="none"
                    stroke="url(#map-border-grad)"
                    strokeWidth="0.58"
                  />

                  {/* Network connection lines from Columbia (Center Hub) */}
                  {[
                    { target: "Greenville", d: "M 754 370 Q 740 354, 727 348" },
                    { target: "Spartanburg", d: "M 754 370 Q 746 353, 738 346" },
                    { target: "Anderson", d: "M 754 370 Q 737 357, 720 354" },
                    { target: "Florence", d: "M 754 370 Q 765 361, 776 360" },
                    { target: "Myrtle Beach", d: "M 754 370 Q 772 364, 790 366" },
                    { target: "Charleston", d: "M 754 370 Q 763 384, 772 390" },
                    { target: "Beaufort", d: "M 754 370 Q 757 389, 760 398" },
                  ].map((line: any) => {
                    const isLineActive = activeCity === line.target;
                    return (
                      <g key={line.target}>
                        <path
                          d={line.d}
                          fill="none"
                          stroke={isLineActive ? "var(--brand-gold)" : "rgba(201, 155, 49, 0.22)"}
                          strokeWidth={isLineActive ? "0.46" : "0.17"}
                          strokeDasharray={isLineActive ? "1.2" : "0.7 0.9"}
                          className={`transition-all duration-300 pointer-events-none ${isLineActive ? "active-network-line" : ""
                            }`}
                          style={{
                            filter: isLineActive ? "drop-shadow(0 0 1px rgba(201, 155, 49, 0.5))" : "none"
                          }}
                        />
                        {isLineActive && (
                          <path
                            d={line.d}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="0.8"
                            strokeDasharray="2 10"
                            className="travel-pulse-line pointer-events-none"
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Dynamic Radar Scanning Ripple from Columbia */}
                  <AnimatePresence>
                    {activeCity && (
                      <motion.circle
                        cx="754"
                        cy="370"
                        initial={{ r: 2, opacity: 0.8 }}
                        animate={{ r: 48, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                        fill="none"
                        stroke="var(--brand-gold)"
                        strokeWidth="0.35"
                        className="pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  {/* Central HQ Hub - Columbia Pin (always visible, special styling) */}
                  <g className="pointer-events-none select-none">
                    <circle cx="754" cy="370" r="4.2" fill="none" stroke="var(--brand-gold)" strokeWidth="0.4" className="opacity-40" />
                    <circle cx="754" cy="370" r="1.8" fill="var(--brand-gold)" />
                  </g>

                  {citiesData.map((city: any) => {
                    const isActive = activeCity === city.id;
                    return (
                      <g
                        key={city.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setActiveCity(city.id)}
                        onMouseLeave={() => setActiveCity(null)}
                      >
                        {/* Outer Pulse Halo */}
                        {isActive && (
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r="3.5"
                            fill="none"
                            stroke="var(--brand-gold)"
                            strokeWidth="0.35"
                            className="opacity-75 animate-ping origin-center"
                          />
                        )}

                        {/* Pin Circle */}
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={isActive ? "2.1" : "1.4"}
                          fill={isActive ? "var(--brand-gold)" : "rgba(201, 155, 49, 0.85)"}
                          className="transition-all duration-300"
                        />
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={isActive ? "0.9" : "0.6"}
                          fill="var(--primary-navy)"
                          className="transition-all duration-300"
                        />

                        {/* Label text */}
                        <text
                          x={city.x + 3}
                          y={city.y + 1}
                          fill={isActive ? "var(--brand-gold)" : "#ffffff"}
                          fontSize="2.7"
                          fontWeight={isActive ? "800" : "600"}
                          className="transition-all duration-300 pointer-events-none select-none font-sans"
                          style={{
                            textShadow: "0 0.5px 1px rgba(0,0,0,0.6)"
                          }}
                        >
                          {city.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
