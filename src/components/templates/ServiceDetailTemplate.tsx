"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  UsersRound, ShieldCheck, BadgeDollarSign, MessageCircle, ClipboardCheck,
  Home, TrendingUp, Wrench, Building2, Cpu, HardHat, Layers, Clock, CalendarDays,
  ArrowRight, CheckCircle2, Award
} from "lucide-react";

import { useContent } from "@/hooks/useContent";
import QuickQuote from "@/components/QuickQuote";
import QAForm from "@/components/QAForm";

/* ── Icon map ── */
const IconMap: Record<string, any> = {
  UsersRound, ShieldCheck, BadgeDollarSign, MessageCircle, ClipboardCheck,
  Home, TrendingUp, Wrench, Building2, Cpu, HardHat, Layers, Clock, CalendarDays
};

/* ── Static fallback service data ── */
const staticServiceData: Record<string, any> = {
  "hoa-management": {
    title: "HOA Management Services",
    subtitle: "Community Operations & Board Support",
    badge: "Board Support & Governance",
    bgImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    description: "Expert governance, transparent financial oversight, and responsive homeowner support to elevate community standards.",
    formOption: "HOA Property Management",
    sideImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
    focusPoints: [
      { title: "Board Support", description: "Assisting board members with meeting prep, minutes, action items, and strategic advisory to run effective associations.", icon: "UsersRound" },
      { title: "Governance & Compliance", description: "Enforcing bylaws fairly, managing architectural reviews (ARC), and keeping up with evolving South Carolina statutes.", icon: "ShieldCheck" },
      { title: "Financial Management", description: "Delivering double-entry accounting, real-time balance sheets, automated dues collection, and long-term reserve planning.", icon: "BadgeDollarSign" },
      { title: "Community Communication", description: "Providing modern resident portals, automated notifications, transparent board reporting, and prompt dispute resolution.", icon: "MessageCircle" },
      { title: "Covenant Enforcement", description: "Conducting objective, photographic compliance drives and sending respectful, automated violation notices.", icon: "ClipboardCheck" },
      { title: "Community Operations", description: "Overseeing facility maintenance, gate programming, pool vendors, and site inspections with dedicated managers.", icon: "Home" }
    ],
    caseStudy: {
      heading: "Association Stabilization Study",
      metric: "$140,000",
      metricLabel: "Bylaw Deficit Resolved",
      desc: "First Choice stabilized an Upstate townhome HOA with chronic budget deficits. By auditing historical vendor invoices and optimizing reserve allocations, we restored financial health in under six months.",
      result: "100% compliance rate with SC bylaws achieved."
    }
  },
  "residential-management": {
    title: "Residential Property Management",
    subtitle: "Maximizing Investment Returns & Asset Longevity",
    badge: "ROI & Tenant Stability",
    bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
    description: "Comprehensive leasing, rent optimization, and tenant relations to protect asset value and maximize net operating income.",
    formOption: "Residential Rentals",
    sideImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    focusPoints: [
      { title: "ROI & Asset Optimization", description: "Conducting market analyses, optimizing rental rates, and minimizing vacancy cycles to maximize your net operating income.", icon: "TrendingUp" },
      { title: "Rigorous Tenant Placement", description: "Multi-point screening including credit checks, nationwide eviction reports, criminal history, and 3x income validation.", icon: "UsersRound" },
      { title: "Tenant Stability & Retention", description: "Building positive relations with residents, offering convenient portal payment options, and securing high lease renewal rates.", icon: "MessageCircle" },
      { title: "Maintenance Coordination", description: "Supervising critical repairs and preventative care using vetted contractors from our licensed network.", icon: "Wrench" },
      { title: "Asset Protection & Audits", description: "Conducting thorough move-in, move-out, and scheduled mid-lease inspections with photo documentation to preserve property value.", icon: "ShieldCheck" }
    ],
    caseStudy: {
      heading: "Investor Portfolio Enhancement",
      metric: "99.4%",
      metricLabel: "Rent Collection Efficiency",
      desc: "For a multi-family landlord with high vacancy rates, we implemented targeted digital leasing campaigns, 3x income vetting, and automatic tenant portal incentives to secure stable long-term tenancies.",
      result: "Average vacancy time reduced to under 12 days."
    }
  },
  "commercial-management": {
    title: "Commercial Property Management",
    subtitle: "Elite Operations & Lease Administration",
    badge: "Professional Commercial Oversight",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85",
    description: "Strategic facility management, professional vendor oversight, and strict lease compliance for office, retail, and mixed-use properties.",
    formOption: "Commercial Management",
    sideImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85",
    focusPoints: [
      { title: "Professional Oversight", description: "Deploying certified commercial asset managers to protect physical assets and ensure building safety compliance.", icon: "Building2" },
      { title: "Vendor Network Management", description: "Bidding, negotiating, and auditing contracts for janitorial, HVAC, security, elevators, and landscaping services.", icon: "Wrench" },
      { title: "Lease Administration", description: "Tracking escalations, managing CAM reconciliations, processing options, and maintaining high tenant rent retention.", icon: "ClipboardCheck" },
      { title: "Efficient Operations", description: "Implementing building management systems (BMS), reducing energy footprints, and planning capital expenditures (CapEx).", icon: "Cpu" }
    ],
    caseStudy: {
      heading: "CAM Contract Optimization",
      metric: "14%",
      metricLabel: "Operating Cost Reduction",
      desc: "We consolidated mechanical, elevator, and cleaning services for a medical and retail complex in Columbia. Contract re-bidding and strict SLA reviews trimmed operational expenses without lowering quality.",
      result: "Saved tenants thousands in CAM reconciliations annually."
    }
  },
  "developer-services": {
    title: "Developer & Builder Services",
    subtitle: "Transition from Construction to Association",
    badge: "Development Continuity",
    bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85",
    description: "Providing interim property operations, budget coordination, and strategic transition planning for master-planned communities.",
    formOption: "General Consultation",
    sideImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85",
    focusPoints: [
      { title: "Interim Management", description: "Managing community assets and builder liabilities while residential phases are under construction.", icon: "HardHat" },
      { title: "Development Continuity", description: "Ensuring design review guidelines (DRB) and developer vision are upheld continuously across build phases.", icon: "Layers" },
      { title: "Budget & Financial Support", description: "Structuring initial operating budgets, estimating reserve requirements, and balancing developer subsidy calculations.", icon: "BadgeDollarSign" },
      { title: "Vendor Coordination", description: "Onboarding critical landscaping, civil maintenance, and utility infrastructure partners for new tracts.", icon: "Wrench" },
      { title: "Transition Planning", description: "Preparing documents, audits, and assets for a smooth turnover from developer control to the homeowner board.", icon: "Clock" }
    ],
    caseStudy: {
      heading: "Master-Planned Tract Transition",
      metric: "420",
      metricLabel: "Homes Handed Over",
      desc: "Supervised the multi-phase audit and transition of a large master-planned residential development from builder control to homeowner governance, resolving critical drainage and road disputes.",
      result: "Zero litigation and clean balance sheet turnover."
    }
  },
  "financial-management": {
    title: "Financial Management Services",
    subtitle: "Absolute Transparency & Accurate Reporting",
    badge: "Financial Stewardship",
    bgImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85",
    description: "Rigorous accounting, transparent monthly distributions, and expert tax compliance for properties and community associations.",
    formOption: "Financial Services Only",
    sideImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85",
    focusPoints: [
      { title: "Financial Transparency", description: "Providing real-time portal access to bank statements, general ledgers, invoices, and payment histories.", icon: "BadgeDollarSign" },
      { title: "Comprehensive Reporting", description: "Generating balance sheets, income statements, delinquency logs, and budget variances monthly by the 10th.", icon: "ClipboardCheck" },
      { title: "Budget Planning", description: "Facilitating annual committee workshops, analyzing historical run-rates, and mapping realistic funding schedules.", icon: "CalendarDays" },
      { title: "Bank Reconciliation", description: "Daily reconciliation of operating and reserve accounts to detect anomalies and guarantee asset security.", icon: "ShieldCheck" },
      { title: "Strict Accountability", description: "Enforcing dual-authorization on expenses, securing annual independent audits, and adhering to GASB standards.", icon: "UsersRound" }
    ],
    caseStudy: {
      heading: "Reserve Ledger Stabilization",
      metric: "12 Years",
      metricLabel: "Ledger History Audited",
      desc: "Reconciled over a decade of manual bookkeeping records for an active Greenville community, resolving unallocated dues disputes and ensuring absolute tax filing compliance.",
      result: "100% clean audit certification achieved."
    }
  }
};

/* ── Service Focus Card — cursor spotlight ── */
function ServiceFocusCard({ point, idx }: { point: any; idx: number }) {
  const Icon = IconMap[point.icon] || ShieldCheck;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative bg-white p-8 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-[400ms] hover:border-brand-gold/30 hover:shadow-[0_16px_48px_rgba(5,41,70,0.08)] flex flex-col items-start gap-5 cursor-default"
    >
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201,155,49,0.06), transparent 80%)`
        }}
      />

      {/* Gold top-sweep */}
      <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-gold/0 via-brand-gold to-brand-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Top: number + icon */}
      <div className="flex items-center justify-between w-full relative z-10">
        <span className="text-[10.5px] font-black tracking-[0.2em] text-brand-gold/50 group-hover:text-brand-gold transition-colors duration-300">
          {String(idx + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white text-text-slate shadow-[0_2px_8px_rgba(8,38,66,0.05)] transition-all duration-[400ms] group-hover:bg-brand-gold group-hover:text-white group-hover:border-brand-gold group-hover:shadow-[0_6px_20px_rgba(201,155,49,0.25)]">
          <Icon size={19} strokeWidth={1.85} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[16px] font-display font-bold text-text-navy tracking-tight group-hover:text-brand-gold transition-colors duration-300 relative z-10">
        {point.title}
      </h3>

      {/* Description */}
      <p className="text-[13px] text-text-slate leading-[1.72] font-sans flex-1 relative z-10">
        {point.description}
      </p>
    </motion.div>
  );
}

/* ── Case Study — Contained Premium Card ── */
function ServiceCaseStudy({ study }: { study: any }) {
  if (!study) return null;

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #031b31 0%, #052946 100%)" }}
        >
          {/* Dot overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cs-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="0.8" fill="#ffffff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cs-dots)" />
            </svg>
          </div>

          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-[2px] border-l-[2px] border-brand-gold/50 rounded-tl-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-[2px] border-r-[2px] border-brand-gold/50 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[2px] border-l-[2px] border-brand-gold/50 rounded-bl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[2px] border-r-[2px] border-brand-gold/50 rounded-br-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-10 lg:p-14 items-center">

            {/* Left: Metric */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-center lg:text-center">
              <span className="text-[9px] font-black tracking-[0.28em] uppercase text-brand-gold mb-3">Case Study</span>
              <span
                className="font-display font-black text-[52px] sm:text-[64px] text-transparent bg-clip-text leading-none tracking-tight"
                style={{ backgroundImage: "linear-gradient(135deg, #c99b31 0%, #f1cd7c 50%, #c99b31 100%)" }}
              >
                {study.metric}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 mt-2">
                {study.metricLabel}
              </span>
            </div>

            {/* Divider */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <div className="w-[1px] h-28 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            </div>
            <div className="lg:hidden h-[1px] w-full bg-white/10" />

            {/* Right: Narrative */}
            <div className="lg:col-span-7 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight leading-[1.2] mb-3">
                {study.heading}
              </h3>
              <p className="text-[13.5px] text-white/55 leading-[1.7] font-sans mb-5 max-w-[540px]">
                {study.desc}
              </p>
              <div className="flex items-center gap-2.5 mb-5">
                <CheckCircle2 size={14} className="text-brand-gold shrink-0" />
                <span className="text-[12px] font-bold text-brand-gold">{study.result}</span>
              </div>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 h-10 px-5 rounded-[4px] font-bold text-[10px] uppercase tracking-wider transition-all duration-300 active:scale-[0.97] w-fit bg-brand-gold hover:bg-tagline-gold text-white"
              >
                Discuss Your Property
                <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Compliance & Standards ── */
function ServiceCompliance({ sideImage }: { sideImage: string }) {
  const standards = [
    "24-Hour Urgent Response SLA",
    "Double-Authorization Accounting",
    "Annual Reserve Account Audits",
    "CMCA / AMS Certified Managers",
    "Fully Vetted Contractor Network",
    "Direct Partner Advisory"
  ];

  return (
    <section className="bg-white py-20 lg:py-28 relative overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="comp-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill="#052946" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#comp-dots)" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-[1160px] px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-start"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-brand-gold" />
              <span className="text-[10px] font-black tracking-[0.28em] uppercase text-brand-gold">
                South Carolina Standards
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-navy leading-[1.1] tracking-tight mb-4">
              Certified Compliance{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-tagline-gold">
                & SLAs
              </span>
            </h2>

            <p className="text-[14px] text-text-slate leading-[1.75] font-sans mb-8 max-w-[500px]">
              As a fully certified and licensed property management firm in South Carolina, we combine local field knowledge with advanced property systems to deliver optimal outcomes.
            </p>

            {/* Standards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {standards.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-brand-gold/30 hover:shadow-[0_4px_16px_rgba(5,41,70,0.05)] transition-all duration-300"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors duration-300">
                    <CheckCircle2 size={13} className="text-brand-gold" />
                  </div>
                  <span className="text-[12.5px] font-semibold text-text-navy leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative">
              {/* Gold offset frame */}
              <div className="absolute -top-3 -right-3 w-full h-full rounded-2xl border-2 border-brand-gold/20 pointer-events-none" />

              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(5,41,70,0.1)] border border-gray-100">
                <Image
                  src={sideImage}
                  alt="Management Compliance"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating certification badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-5 py-3 shadow-[0_8px_30px_rgba(5,41,70,0.1)] border border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Award size={16} className="text-brand-gold" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-text-navy">SC Licensed & Certified</p>
                  <p className="text-[9px] text-text-slate font-medium">CMCA · AMS · PCAM</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ── Main Export ── */
export default function ServiceDetailTemplate({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { services } = useContent();

  /* Try to find service from DB first */
  const dbServices: any[] = services?.services || [];
  const dbService = dbServices.find((s: any) => s.slug === slug && s.status !== "draft");

  /* Merge DB service with static fallback */
  const staticFallback = staticServiceData[slug];

  if (!dbService && !staticFallback) {
    notFound();
  }

  /* Build the final service object — DB data takes precedence, static fills gaps */
  const service = {
    title: dbService?.title || staticFallback?.title || "",
    subtitle: dbService?.subtitle || staticFallback?.subtitle || "",
    badge: dbService?.badge || staticFallback?.badge || "Property Management",
    description: dbService?.description || staticFallback?.description || "",
    bgImage:
      dbService?.image ||
      dbService?.bgImage ||
      staticFallback?.bgImage ||
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    sideImage:
      dbService?.sideImage ||
      staticFallback?.sideImage ||
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
    formOption: dbService?.formOption || staticFallback?.formOption || "General Consultation",
    focusPoints:
      (dbService?.focusPoints && dbService.focusPoints.length > 0
        ? dbService.focusPoints
        : staticFallback?.focusPoints) || [],
    caseStudy: dbService?.caseStudy || staticFallback?.caseStudy || null,
  };

  return (
    <main className="min-h-screen bg-white text-[#072642]">

      {/* ── SPLIT-SCREEN HERO ── */}
      <section className="relative py-10 lg:py-14 bg-[#031b31] text-white overflow-hidden">
        <div className="relative mx-auto w-full max-w-[1160px] px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left: Copy */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--tagline-gold)] font-sans">
                  {service.badge}
                </span>
              </div>

              <h1 className="font-display font-bold text-white uppercase leading-tight tracking-tight mb-3 text-3xl sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>

              <p className="text-[12px] font-bold tracking-widest text-[var(--brand-gold)]/80 uppercase font-sans mb-5">
                {service.subtitle}
              </p>

              <p className="text-[13.5px] sm:text-[14px] text-white/75 leading-relaxed font-sans max-w-[540px] mb-6">
                {service.description}
              </p>

              <div className="flex">
                <Link
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 bg-[var(--brand-gold)] hover:bg-white hover:text-[#072642] px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition-all duration-300 rounded-[4px] shadow-md cursor-pointer"
                >
                  Request Proposal
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="lg:col-span-6 w-full">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={service.bgImage}
                  alt={service.title}
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

      {/* ── FOCUS PILLARS GRID ── */}
      {service.focusPoints.length > 0 && (
        <section className="py-20 lg:py-28 bg-gray-50/50">
          <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-8">

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
                  <p className="text-[10px] font-black tracking-[0.28em] uppercase text-brand-gold">Core Focus</p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-navy leading-[1.1] tracking-tight">
                  Our Core{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-tagline-gold">
                    Focus Areas
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
                Every service pillar is designed to protect your investment, streamline operations, and exceed industry standards.
              </motion.p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.focusPoints.map((point: any, idx: number) => (
                <ServiceFocusCard key={point.title} point={point} idx={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CASE STUDY ── */}
      <ServiceCaseStudy study={service.caseStudy} />

      {/* ── COMPLIANCE & STANDARDS ── */}
      <ServiceCompliance sideImage={service.sideImage} />

      {/* ── CTA BAR & CONTACT FORM ── */}
      <QuickQuote />
      <QAForm defaultService={service.formOption} />

    </main>
  );
}
