"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HelpCircle, Phone, Mail, ChevronDown, ArrowRight, Users, Cpu, Layers, ShieldCheck } from "lucide-react";

import { useContent } from "@/hooks/useContent";
import CtaBar from "@/components/QuickQuote";
import ContactForm from "@/components/QAForm";

/* ── Premium Onboarding Path — border-sharing grid, page-specific ── */
function FAQOnboardingPath() {
  const steps = [
    {
      num: "01",
      title: "Intake & Advisory",
      desc: "We analyze your existing association covenants, financial statements, and reserve studies to understand your community's profile.",
      icon: Users,
    },
    {
      num: "02",
      title: "Database Transition",
      desc: "Our transition experts import resident histories, ledger balances, and audit documents into our secure management platform.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Platform Launch",
      desc: "We configure custom board and resident portals, distribute onboarding guides, and activate digital lockbox dues payments.",
      icon: Layers,
    },
    {
      num: "04",
      title: "Active Stewardship",
      desc: "A dedicated CMCA/AMS accredited manager assumes physical oversight, activates vendor SLAs, and initiates scheduled inspections.",
      icon: ShieldCheck,
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="relative mx-auto w-full max-w-[1160px] px-6 lg:px-8 z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[480px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-brand-gold" />
              <p className="text-[10px] font-black tracking-[0.28em] uppercase text-brand-gold">Onboarding Path</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-text-navy leading-[1.1] tracking-tight">
              How We Transition{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-tagline-gold">
                Your Property
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
            A structured four-phase transition ensures zero data loss, full compliance continuity, and a seamless experience for your residents.
          </motion.p>
        </div>

        {/* Border-sharing grid — 4 columns, 1 row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-[#e8ecf0] overflow-hidden">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLastCol = (idx % 4) === 3;

            return (
              <OnboardingCell
                key={step.num}
                num={step.num}
                title={step.title}
                desc={step.desc}
                icon={Icon}
                index={idx}
                isLastCol={isLastCol}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface OnboardingCellProps {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  index: number;
  isLastCol: boolean;
}

function OnboardingCell({ num, title, desc, icon: Icon, index, isLastCol }: OnboardingCellProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={[
        "group relative flex flex-col gap-5 p-8 cursor-default overflow-hidden",
        "transition-all duration-300 hover:bg-[rgba(201,155,49,0.02)]",
        !isLastCol ? "sm:border-r border-b sm:border-b lg:border-b-0 border-[rgba(201,155,49,0.18)]" : "border-b sm:border-b lg:border-b-0 border-[rgba(201,155,49,0.18)]",
      ].join(" ")}
    >
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 155, 49, 0.075), transparent 80%)`
        }}
      />

      {/* Gold top-sweep */}
      <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-gold/0 via-brand-gold to-brand-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Number + icon row */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-[10.5px] font-black tracking-[0.2em] text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-300">
          {num}
        </span>
        <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white text-text-slate shadow-[0_2px_8px_rgba(8,38,66,0.05)] transition-all duration-400 group-hover:bg-brand-gold group-hover:text-white group-hover:border-brand-gold group-hover:shadow-[0_6px_20px_rgba(201,155,49,0.25)]">
          <Icon size={19} strokeWidth={1.85} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-bold text-text-navy leading-snug tracking-tight group-hover:text-brand-gold transition-colors duration-300 relative z-10">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[13px] text-text-slate leading-[1.72] font-sans flex-1 relative z-10">
        {desc}
      </p>
    </motion.div>
  );
}

export default function FAQTemplate({ pageData }: { pageData?: any }) {
  const { resourcesFAQ } = useContent();

  const activeFaqSource = resourcesFAQ?.faqs?.length > 0 
    ? resourcesFAQ 
    : (pageData?.content?.resourcesFAQ || pageData?.resourcesFAQ || {});

  const {
    badge = "Information Hub",
    description = "Explore answers to common questions about association governance, maintenance, fees, and more.",
    supportCard = {
      title: "Need Direct Assistance?",
      subtitle: "Our South Carolina support team is standing by.",
      phone: "(864) 326-0000",
      phoneHref: "tel:8643260000",
      email: "info@firstchoicepg.com",
      emailHref: "mailto:info@firstchoicepg.com",
      ctaLabel: "Submit Support Request",
      ctaHref: "/contact"
    },
    faqs = []
  } = activeFaqSource;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqsList = Array.isArray(faqs) ? faqs : [];
  const categories = ["All", ...Array.from(new Set(faqsList.map((faq: any) => faq?.category).filter(Boolean)))];

  const filteredFaqs = selectedCategory === "All"
    ? faqsList
    : faqsList.filter((faq: any) => faq?.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

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
                Frequently Asked Questions
              </h1>

              <p className="text-[12px] font-bold tracking-widest text-[var(--brand-gold)]/80 uppercase font-sans mb-5">
                Answers to Common Inquiries
              </p>

              <p className="text-[13.5px] sm:text-[14px] text-white/75 leading-relaxed font-sans max-w-[540px] mb-6">
                {description}
              </p>
            </div>

            {/* Right Column: Rounded Photo */}
            <div className="lg:col-span-6 w-full">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85" 
                  alt="Customer service support" 
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

      {/* ── ASYMMETRICAL FAQ INTERFACE ── */}
      <section className="py-16 lg:py-20 bg-gray-50/50">
        <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Sticky Category Selector */}
            <div className="lg:col-span-4 lg:sticky lg:top-36 flex flex-col gap-6">
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-brand-gold">TOPICS</span>
                <h2 className="text-2xl font-display font-bold text-text-navy uppercase tracking-tight mt-1.5 leading-tight">
                  FILTER BY TOPIC
                </h2>
                <div className="h-[1.5px] w-12 bg-[var(--brand-gold)] mt-3 mb-4" />
              </div>

              {/* Vertical Category Button Stack */}
              <div className="flex flex-col gap-2 border-l-2 border-black/5 pl-4">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOpenIdx(null);
                      }}
                      className={`text-left text-[11px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between cursor-pointer py-1 ${
                        isActive ? "text-[var(--brand-gold)] font-black pl-2" : "text-text-navy/50 hover:text-text-navy"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`h-1 w-1 rounded-full ${isActive ? "bg-[var(--brand-gold)]" : "bg-transparent"}`} />
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Accordion Cards */}
            <div className="lg:col-span-8 flex flex-col gap-6 w-full">
              
              {/* Accordion Stack */}
              <div className="flex flex-col gap-3.5">
                <AnimatePresence mode="popLayout">
                  {filteredFaqs.map((faq: any, index: number) => {
                    const isOpen = openIdx === index;
                    return (
                      <motion.div
                        key={faq.q}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className={`p-6 rounded-2xl border transition-all duration-300 ${
                          isOpen 
                            ? "bg-white border-[var(--brand-gold)]/45 shadow-md" 
                            : "bg-white border-gray-100 hover:border-gray-200 shadow-sm"
                        }`}
                      >
                        {/* Question trigger */}
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full text-left flex items-start justify-between gap-5 cursor-pointer focus:outline-none"
                        >
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.16em]">
                              {faq.category}
                            </span>
                            <h3 className={`text-[15px] sm:text-[16px] font-bold text-text-navy transition-colors duration-200 ${
                              isOpen ? "text-[var(--brand-gold)]" : ""
                            }`}>
                              {faq.q}
                            </h3>
                          </div>
                          
                          {/* Minimal Chevron */}
                          <div className={`flex-shrink-0 mt-1 transition-colors ${
                            isOpen ? "text-[var(--brand-gold)]" : "text-text-navy/30"
                          }`}>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                            >
                              <ChevronDown size={15} strokeWidth={2.5} />
                            </motion.div>
                          </div>
                        </button>

                        {/* Collapsible Answer */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                              <div className="pb-1 pt-3 text-[13.5px] text-text-slate leading-relaxed font-sans max-w-[650px] border-t border-black/5 mt-3">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Minimal Support Card Block */}
              <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-[15px] font-display font-bold text-text-navy uppercase tracking-tight">
                    {supportCard.title}
                  </h3>
                  <p className="text-[12.5px] text-text-slate mt-1 font-sans">
                    {supportCard.subtitle}
                  </p>
                </div>
                <Link
                  href={supportCard.ctaHref}
                  className="group flex h-10 items-center justify-center gap-2 bg-[#072642] px-6 text-[10.5px] font-bold uppercase tracking-wider text-white hover:bg-[var(--brand-gold)] transition-all duration-300 rounded-[4px] shadow-md shrink-0 cursor-pointer"
                >
                  {supportCard.ctaLabel}
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── ONBOARDING PATH — PREMIUM DARK ── */}
      <FAQOnboardingPath />

      {/* ── CTA BAR & FOOTER FUNNEL ── */}
      <CtaBar />
      <ContactForm />
    </main>
  );
}
