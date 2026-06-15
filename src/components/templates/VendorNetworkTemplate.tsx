"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, Users, CheckCircle2, ArrowRight, Send, ClipboardCheck, BadgeDollarSign } from "lucide-react";

import { useContent } from "@/hooks/useContent";
import VendorNetworkLight from "@/components/VendorNetworkLight";
import CtaBar from "@/components/QuickQuote";
import ContactForm from "@/components/QAForm";

const cycleSteps = [
  {
    num: "01",
    label: "Dispatch",
    title: "Rapid Mobilization",
    desc: "Work orders are instantly generated in our portal and dispatched to the nearest approved crew. Emergency issues get responsive dispatch in under 15 minutes.",
    icon: Send,
    accent: "from-[#c99b31] to-[#d3a438]"
  },
  {
    num: "02",
    label: "Inspection",
    title: "Field Diagnosis",
    desc: "Technicians conduct checks, document issues with geotagged photo logs, and upload real-time estimates directly from site locations.",
    icon: ClipboardCheck,
    accent: "from-[#052946] to-[#0a3d6b]"
  },
  {
    num: "03",
    label: "Approval",
    title: "Owner Consent",
    desc: "Owners and board treasurers receive instant, itemized repair notifications on their mobile devices, approving proposals with a single click.",
    icon: CheckCircle2,
    accent: "from-[#c99b31] to-[#d3a438]"
  },
  {
    num: "04",
    label: "Payment",
    title: "Quick Settlement",
    desc: "Once work is verified complete, we process payments to the vendor within 7 business days, ensuring premium priority status for future jobs.",
    icon: BadgeDollarSign,
    accent: "from-[#052946] to-[#0a3d6b]"
  }
];

function WorkOrderCycle() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cycle-dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill="#052946" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cycle-dots)" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-[1160px] px-6 lg:px-8 z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[480px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-brand-gold" />
              <p className="text-[10px] font-black tracking-[0.28em] uppercase text-brand-gold">Our Cycle</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-text-navy leading-[1.1] tracking-tight">
              The Work Order{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-tagline-gold">
                SLA Lifecycle
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[14px] text-text-slate leading-[1.75] font-sans md:max-w-[340px]"
          >
            From dispatch to payment, every work order follows a transparent, auditable four-stage lifecycle.
          </motion.p>
        </div>

        {/* Timeline cards */}
        <div className="relative">
          {/* Connecting line — visible on lg */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {cycleSteps.map((step, idx) => {
              const Icon = step.icon;
              const isHovered = hoveredIdx === idx;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group relative flex flex-col z-10"
                >
                  {/* Step number circle with connector */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`relative w-[52px] h-[52px] rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      isHovered 
                        ? "bg-brand-gold border-brand-gold shadow-[0_0_20px_rgba(201,155,49,0.35)]"
                        : "bg-white border-gray-200 shadow-[0_2px_8px_rgba(5,41,70,0.06)]"
                    }`}>
                      <span className={`text-[14px] font-display font-black tracking-tight transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-text-navy"
                      }`}>
                        {step.num}
                      </span>
                    </div>
                    <span className="text-[9px] font-black tracking-[0.25em] uppercase text-brand-gold/70">
                      {step.label}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="relative flex-1 p-7 rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-500 group-hover:border-brand-gold/30 group-hover:shadow-[0_12px_40px_rgba(5,41,70,0.08)]">
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[rgba(201,155,49,0.03)] to-transparent" />
                    
                    {/* Gold top-sweep line on hover */}
                    <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-gold/0 via-brand-gold to-brand-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-400 ${
                      isHovered 
                        ? "bg-brand-gold text-white shadow-[0_6px_20px_rgba(201,155,49,0.25)]" 
                        : "bg-[#052946]/5 text-brand-gold"
                    }`}>
                      <Icon size={18} strokeWidth={2} />
                    </div>

                    <h3 className="text-[16px] font-display font-bold text-text-navy tracking-tight mb-2.5 group-hover:text-brand-gold transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-text-slate leading-[1.7] font-sans">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VendorNetworkTemplate({ pageData }: { pageData?: any }) {
  const { vendorNetwork } = useContent();

  const activeVendorSource = vendorNetwork?.sections?.length > 0
    ? vendorNetwork
    : (pageData?.content?.vendorNetwork || pageData?.vendorNetwork || {});

  const {
    badge = "APPROVED REGISTRY",
    description = "First Choice Property Group partners with South Carolina's premier contractors. By enforcing strict general liability auditing and digital work-order SLAs, we protect your assets and resolve requests efficiently.",
  } = activeVendorSource;

  return (
    <main className="min-h-screen bg-white text-[#072642]">
      
      {/* ── SPLIT HERO WITH PHOTO ── */}
      <section className="relative py-10 lg:py-14 bg-[#031b31] text-white overflow-hidden">
        <div className="relative mx-auto w-full max-w-[1160px] px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Copy */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--tagline-gold)] font-sans">
                  {badge}
                </span>
              </div>

              <h1 className="font-display font-bold text-white uppercase leading-tight tracking-tight mb-3 text-3xl sm:text-4xl lg:text-5xl">
                Approved Vendor Network
              </h1>

              <p className="text-[12px] font-bold tracking-widest text-[var(--brand-gold)]/80 uppercase font-sans mb-5">
                Built for Speed, Compliance & Quality
              </p>

              <p className="text-[13.5px] sm:text-[14px] text-white/75 leading-relaxed font-sans max-w-[540px] mb-6">
                {description}
              </p>

              <div className="flex">
                <Link
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 bg-[var(--brand-gold)] hover:bg-white hover:text-[#072642] px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition-all duration-300 rounded-[4px] shadow-md cursor-pointer"
                >
                  Join Our Network
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Rounded Contractor Photo */}
            <div className="lg:col-span-6 w-full">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85" 
                  alt="Contractors working" 
                  fill 
                  priority 
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── VENDOR NETWORK — LIGHT MODE VERSION ── */}
      <VendorNetworkLight />

      {/* ── WORK ORDER CYCLE — PREMIUM TIMELINE ── */}
      <WorkOrderCycle />

      {/* ── FUNNELS ── */}
      <CtaBar />
      <ContactForm defaultService="General Consultation" />
    </main>
  );
}
