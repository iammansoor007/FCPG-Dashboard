"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  UsersRound, Home, Building2, HardHat, BadgeDollarSign,
  ArrowUpRight, ShieldCheck, MapPin, TrendingUp, HelpCircle
} from "lucide-react";
import { useContent } from "../hooks/useContent";
import RichTextRenderer from "./ui/RichTextRenderer";

const IconMap: Record<string, any> = {
  UsersRound,
  Home,
  Building2,
  HardHat,
  BadgeDollarSign,
  ShieldCheck,
  MapPin,
  TrendingUp,
  HelpCircle
};

function FullBleedCard({
  title, text, icon: Icon, image, badge, index, delay = 0,
  className = "", contentPadding = "p-7", slug = ""
}: any) {
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(3,27,49,0.15)] hover:shadow-[0_20px_50px_rgba(201,155,49,0.22)] transition-all duration-500 ${className}`}
    >
      {/* Background image */}
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
          priority={index === 0}
        />
      )}

      {/* Dark gradient — heavier at bottom for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#021321]/92 via-[#021321]/45 to-transparent z-10 pointer-events-none" />

      {/* Subtle hover tint overlay */}
      <div className="absolute inset-0 bg-[#031b31]/0 group-hover:bg-[#031b31]/15 transition-colors duration-700 z-10 pointer-events-none" />

      {/* Badge pill */}
      {badge && (
        <div className="absolute top-5 left-5 z-30">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-gold text-midnight-navy text-[9px] font-black tracking-[0.15em] uppercase shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-midnight-navy/40 animate-pulse" />
            {badge}
          </span>
        </div>
      )}

      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl z-25"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 155, 49, 0.12), transparent 80%)`
        }}
      />

      {/* Content — pinned to bottom */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 ${contentPadding} flex flex-col gap-3.5`}>
        {/* Icon + Title row */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold transition-all duration-500 group-hover:bg-brand-gold group-hover:text-midnight-navy group-hover:border-brand-gold group-hover:shadow-[0_0_22px_rgba(201,155,49,0.4)]">
            <Icon size={17} strokeWidth={2.2} />
          </div>
          <h3 className="font-display font-bold text-white leading-tight tracking-tight text-lg font-heading">
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="text-[13px] text-white/70 leading-[1.6] font-sans line-clamp-2 group-hover:text-white/90 transition-colors duration-500">
          <RichTextRenderer content={text} stripParagraphs={true} />
        </div>

        {/* CTA */}
        <Link
          href={`/services/${slug}`}
          className="inline-flex items-center gap-2 self-start mt-0.5 group/cta"
        >
          <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-brand-gold/90 group-hover/cta:text-brand-gold transition-colors duration-300">
            Explore Details
          </span>
          <span className="flex items-center justify-center w-6 h-6 rounded-full border border-brand-gold/30 text-brand-gold/70 transition-all duration-300 group-hover/cta:bg-brand-gold group-hover/cta:text-midnight-navy group-hover/cta:border-brand-gold group-hover/cta:shadow-[0_0_10px_rgba(201,155,49,0.4)]">
            <ArrowUpRight size={11} strokeWidth={2.5} />
          </span>
        </Link>
      </div>

      {/* Animated border overlay */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.07] group-hover:border-brand-gold/30 transition-colors duration-500 z-30 pointer-events-none" />
    </motion.div>
  );
}

export default function Services() {
  const { services: servicesData } = useContent();

  const {
    badge = "Premium Exterior Divisions",
    headline = { prefix: "Elite", highlight: "Roofing", suffix: "Services" },
    description = "Providing high-performance exterior solutions backed by industry-leading warranties.",
    services = []
  } = (servicesData || {}) as any;

  const servicesListRaw = Array.isArray(services) ? services : [];
  const servicesList = servicesListRaw.filter((s: any) => !s.status || s.status === 'published');

  // Hardcoded trust pills mapping directly to our styling
  const trustPills = [
    { icon: "ShieldCheck", label: "Certified Installers" },
    { icon: "TrendingUp", label: "Lifetime Warranties" }
  ];

  return (
    <section
      id="services"
      className="bg-[#f8fafc] relative overflow-hidden py-16 lg:py-20"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(8,38,66,0.038) 1px, transparent 0)",
        backgroundSize: "26px 26px",
      }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-0 w-[520px] h-[520px] bg-brand-gold/[0.05] rounded-full blur-[130px] pointer-events-none -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#052946]/[0.04] rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-4 items-start"
          >
            <div
              className="flex-shrink-0 w-[3px] self-stretch rounded-full mt-1"
              style={{ background: "linear-gradient(180deg, #c99b31 0%, rgba(201,155,49,0.4) 60%, transparent 100%)" }}
            />
            <div>
              <p className="text-[10px] font-black tracking-[0.28em] uppercase text-brand-gold mb-3">
                {badge}
              </p>
              <h2 className="text-4xl md:text-[2.7rem] lg:text-5xl font-bold font-display text-slate-900 leading-[1.1] tracking-tight font-heading">
                {headline.prefix && <>{headline.prefix}<br /></>}
                {headline.highlight}{" "}
                {headline.suffix && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-tagline-gold">
                    {headline.suffix}
                  </span>
                )}
              </h2>
            </div>
          </motion.div>

          {/* Right — description + trust pills */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:max-w-[360px] flex flex-col gap-5"
          >
            <div className="text-[14px] text-slate-600 leading-relaxed font-sans font-medium">
              <RichTextRenderer content={description} stripParagraphs={true} />
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {trustPills.map(({ icon, label }) => {
                const I = IconMap[icon] || ShieldCheck;
                return (
                  <div key={label} className="flex items-center gap-1.5">
                    <I size={14} className="text-brand-gold flex-shrink-0" strokeWidth={2.2} />
                    <span className="text-[10.5px] font-semibold text-slate-700">{label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {servicesList.map((service: any, i: number) => {
            // Check if it's the first service (featured large card)
            const isFeatured = i === 0;
            const cardClass = isFeatured
              ? "lg:col-span-1 lg:row-span-2 min-h-[400px] lg:min-h-[580px]"
              : "lg:col-span-1 min-h-[280px]";

            // Map standard icons
            let iconComponent = Home;
            const lowercaseTitle = service.title.toLowerCase();
            if (lowercaseTitle.includes("commercial")) {
              iconComponent = Building2;
            } else if (lowercaseTitle.includes("residential") || lowercaseTitle.includes("roofing")) {
              iconComponent = Home;
            } else if (lowercaseTitle.includes("gutter") || lowercaseTitle.includes("water")) {
              iconComponent = HardHat;
            } else if (IconMap[service.icon]) {
              iconComponent = IconMap[service.icon];
            }

            const imageUrlRaw = service.overviewImage || service.breadcrumbImage || service.image;
            const imageSrc = typeof imageUrlRaw === 'object' && imageUrlRaw !== null ? imageUrlRaw.src : imageUrlRaw;

            return (
              <FullBleedCard
                key={service._id || i}
                title={service.title}
                text={service.description}
                icon={iconComponent}
                image={imageSrc}
                badge={service.badge || (isFeatured ? "Featured Division" : "")}
                index={i}
                delay={i * 0.08}
                slug={service.slug}
                className={cardClass}
              />
            );
          })}
        </div>

        {/* ── Footer strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex items-center justify-center gap-2.5 mt-10 border-t border-gray-200/60 pt-8"
        >
          <ShieldCheck size={15} className="text-brand-gold" strokeWidth={2} />
          <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
            Greenville's Fully Licensed, Bonded & Insured Roofing Dispatch Authority
          </p>
        </motion.div>

      </div>
    </section>
  );
}