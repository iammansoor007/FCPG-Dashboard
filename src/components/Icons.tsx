"use client";

import React, { useState } from "react";
import { Facebook, Linkedin, Instagram, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LogoMark() {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#c99b31] text-[#031b31] shadow-lg shrink-0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </div>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return <Facebook className={className} size={14} />;
}

export function LinkedinIcon({ className }: { className?: string }) {
  return <Linkedin className={className} size={14} />;
}

export function InstagramIcon({ className }: { className?: string }) {
  return <Instagram className={className} size={14} />;
}

const cities = [
  { id: "columbia", name: "Columbia", x: 754, y: 370, isHQ: true },
  { id: "greenville", name: "Greenville", x: 727, y: 348 },
  { id: "spartanburg", name: "Spartanburg", x: 738, y: 346 },
  { id: "anderson", name: "Anderson", x: 720, y: 354 },
  { id: "florence", name: "Florence", x: 776, y: 360 },
  { id: "myrtle-beach", name: "Myrtle Beach", x: 790, y: 366 },
  { id: "charleston", name: "Charleston", x: 772, y: 390 },
  { id: "beaufort", name: "Beaufort", x: 760, y: 398 }
];

const connectionLines = [
  { target: "greenville", d: "M 754 370 Q 740 354, 727 348" },
  { target: "spartanburg", d: "M 754 370 Q 746 353, 738 346" },
  { target: "anderson", d: "M 754 370 Q 737 357, 720 354" },
  { target: "florence", d: "M 754 370 Q 765 361, 776 360" },
  { target: "myrtle-beach", d: "M 754 370 Q 772 364, 790 366" },
  { target: "charleston", d: "M 754 370 Q 763 384, 772 390" },
  { target: "beaufort", d: "M 754 370 Q 757 389, 760 398" }
];

export function SouthCarolinaMap() {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[4/3] max-w-[650px] rounded-[24px] border border-[rgba(5,41,70,0.06)] bg-white shadow-sm overflow-hidden flex items-center justify-center transition-all duration-300">
      
      {/* Map Presence Overlay Badge */}
      <div className="absolute bottom-4 left-4 p-4 rounded-xl border border-[#c99b31]/18 bg-[#052946]/95 backdrop-blur-md shadow-2xl z-30 pointer-events-none min-w-[170px] flex flex-col justify-start">
        <div className="flex items-center gap-1.5 mb-1 text-[#c99b31]/75">
          <Building2 size={13} className="shrink-0" />
          <p className="font-sans font-bold text-[10px] uppercase tracking-wider">SC Presence</p>
        </div>
        <p className="font-sans font-black text-white text-[22px] leading-none tracking-tight">
          8 <span className="text-[11px] text-white/50 font-normal">Regions</span>
        </p>
        <p className="font-sans font-semibold text-[#c99b31] text-[9px] uppercase tracking-widest mt-1">
          Licensed Management
        </p>
      </div>

      {/* South Carolina Vector Map SVG */}
      <svg
        viewBox="0 0 520 390"
        role="img"
        aria-label="South Carolina service area map"
        className="h-auto w-full drop-shadow-md relative z-10 select-none"
      >
        <defs>
          {/* Deep navy-to-midnight gradient for the map body */}
          <linearGradient id="map-fill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#052946" />
            <stop offset="100%" stopColor="#031b31" />
          </linearGradient>

          {/* Gold border gradient for the map outline */}
          <linearGradient id="map-border-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c99b31" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#e8b84b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c99b31" stopOpacity="0.3" />
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
          {connectionLines.map((line: any) => {
            const isLineActive = activeCity === line.target;
            return (
              <g key={line.target}>
                <path
                  d={line.d}
                  fill="none"
                  stroke={isLineActive ? "#c99b31" : "rgba(201, 155, 49, 0.22)"}
                  strokeWidth={isLineActive ? "0.46" : "0.17"}
                  strokeDasharray={isLineActive ? "1.2" : "0.7 0.9"}
                  className="transition-all duration-300 pointer-events-none"
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
                stroke="#c99b31"
                strokeWidth="0.35"
                className="pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Central HQ Hub - Columbia Pin */}
          <g className="pointer-events-none select-none">
            <circle cx="754" cy="370" r="4.2" fill="none" stroke="#c99b31" strokeWidth="0.4" className="opacity-40" />
            <circle cx="754" cy="370" r="1.8" fill="#c99b31" />
          </g>

          {/* City Points and Labels */}
          {cities.map((city) => {
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
                    stroke="#c99b31"
                    strokeWidth="0.35"
                    className="opacity-75 animate-ping origin-center"
                  />
                )}

                {/* Pin Circle */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={isActive ? "2.1" : "1.4"}
                  fill={isActive ? "#c99b31" : "rgba(201, 155, 49, 0.85)"}
                  className="transition-all duration-300"
                />
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={isActive ? "0.9" : "0.6"}
                  fill="#052946"
                  className="transition-all duration-300"
                />

                {/* Label text */}
                <text
                  x={city.x + 3}
                  y={city.y + 1}
                  fill={isActive ? "#c99b31" : "#ffffff"}
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
    </div>
  );
}
