"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ArrowDown,
  ChevronDown
} from "lucide-react";

import { useContent } from "@/hooks/useContent";
import { SouthCarolinaMap } from "@/components/Icons";

const CardIconMap: Record<string, React.ElementType> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function ContactTemplate({ pageData }: { pageData?: any }) {
  const { contactPage: cpData, contactForm: cfData } = useContent();

  const contactPage = pageData?.content?.contactPage || cpData || {};
  const cf = pageData?.content?.contactForm || cfData || {};

  const { hero = {}, directory = {}, form = {} } = contactPage;
  const cards = cf.cards || [];
  const serviceOptions = cf.serviceOptions || ["General Inquiry"];
  const labels = cf.labels || {};
  const placeholders = cf.placeholders || {};

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyName: "",
    serviceType: serviceOptions[0] || "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          type: "Contact Form",
          subject: `New Contact Form Submission - ${formState.firstName || ""} ${formState.lastName || ""}`.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Submission failed");
      }
      setSubmitStatus("success");
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyName: "",
        serviceType: serviceOptions[0] || "",
        message: ""
      });
    } catch (err: any) {
      setSubmitStatus("idle");
      alert(err.message || "Failed to send. Please try again.");
    }
  };

  // Calculate form completion progress percentage
  const fieldsFilled = [
    formState.firstName.trim(),
    formState.lastName.trim(),
    formState.email.trim(),
    formState.phone.trim(),
    formState.propertyName.trim(),
    formState.serviceType.trim(),
    formState.message.trim()
  ].filter((val) => val !== "").length;
  const progressPercent = Math.min(Math.round((fieldsFilled / 7) * 100), 100);

  const handleScrollDown = () => {
    const section = document.getElementById("contact-details");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#072642]">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[380px] lg:min-h-[460px] overflow-hidden bg-[var(--midnight-navy)] flex items-center text-white">
        {/* Background Image with slow zoom */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {hero.bgImage && (
            <Image
              src={hero.bgImage}
              alt={hero.bgImageAlt || "Contact"}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--midnight-navy)] via-[var(--midnight-navy)]/90 to-[var(--midnight-navy)]/25 md:from-[var(--midnight-navy)] md:via-[var(--midnight-navy)]/80 md:to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight-navy)]/50 via-transparent to-transparent z-10" />

        {/* Grid dots matrix & coordinates overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-grid-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#ffffff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid-dots)" />
          </svg>
          {/* Blueprint style details */}
          {hero.coordLng && <div className="absolute top-6 right-8 text-[9px] font-mono text-[var(--brand-gold)]/35 tracking-widest">{hero.coordLng}</div>}
          {hero.coordLat && <div className="absolute bottom-16 right-8 text-[9px] font-mono text-[var(--brand-gold)]/35 tracking-widest">{hero.coordLat}</div>}
          <div className="absolute bottom-6 left-8 text-[9px] font-mono text-[var(--brand-gold)]/20 tracking-wider hidden md:block">BLUEPRINT_REF: CONTACT_HERO_SC // PROTOCOL_ACTIVE</div>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-[var(--brand-gold)]/[0.06] rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" />

        {/* Bottom accent gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--brand-gold)] to-transparent z-20 opacity-70" />

        <div className="relative mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20 z-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-[620px]"
          >
            {/* Tagline */}
            {hero.tagline && (
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)] animate-pulse" />
                <span className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--tagline-gold)]">
                  {hero.tagline}
                </span>
              </motion.div>
            )}

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-[28px] sm:text-[48px] lg:text-[58px] font-display font-bold leading-[1.06] tracking-tight text-white"
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

            {/* Description */}
            {hero.description && (
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-[540px] text-[13px] sm:text-[14px] md:text-[15.5px] font-normal leading-[1.65] text-white/80"
              >
                {hero.description}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300" onClick={handleScrollDown}>
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Scroll Details</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center w-7 h-7 rounded-full border border-white/20 bg-white/5 text-[var(--brand-gold)]"
          >
            <ArrowDown size={12} strokeWidth={2.5} />
          </motion.div>
        </div>
      </section>

      {/* ── SPLIT CONTACT SECTION ── */}
      <section id="contact-details" className="relative bg-white overflow-hidden py-16 lg:py-24 scroll-mt-24">
        {/* Soft grid background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(5, 41, 70, 0.03) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 50%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Office Directory & Map */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-[1.5px] bg-brand-gold" />
                  <p className="text-[10px] font-black tracking-[0.28em] uppercase text-brand-gold">
                    {directory.badge}
                  </p>
                </div>
                <h2 className="text-3xl md:text-4.5xl font-bold font-display text-text-navy leading-none tracking-tight">
                  {directory.heading1}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-tagline-gold">
                    {directory.heading2}
                  </span>
                </h2>
                <p className="mt-2 text-[14px] text-text-slate leading-[1.7]">
                  {directory.description}
                </p>
              </div>

              {/* Office info directory cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {cards.map((card: any) => {
                  const Icon = CardIconMap[card.type] || MapPin;
                  const isClickable = card.href;
                  const Tag = isClickable ? "a" : "div";
                  return (
                    <Tag
                      key={card.label}
                      {...(isClickable ? { href: card.href } : {})}
                      className={`p-3.5 sm:p-4 rounded-xl border border-[rgba(5,41,70,0.06)] bg-[#f7f8fa]/80 backdrop-blur-sm shadow-sm transition-all duration-300
                        ${isClickable ? "group cursor-pointer hover:bg-white hover:border-[rgba(201,155,49,0.3)] hover:shadow-md flex flex-col justify-start" : "flex flex-col justify-start"}
                      `}
                    >
                      <div className="flex items-center gap-2 mb-2 text-[var(--brand-gold)]">
                        <Icon size={13} />
                        <span className="text-[9.5px] font-black uppercase tracking-wider text-[var(--text-navy)]/40 font-sans">{card.label}</span>
                      </div>
                      <p className={`text-[13.5px] font-bold text-[var(--text-navy)] ${isClickable ? "group-hover:text-[var(--brand-gold)] transition-colors duration-200" : ""}`}>
                        {card.line1}
                      </p>
                      <p className="text-[11.5px] text-[var(--text-slate)] mt-0.5 leading-tight font-medium">
                        {card.type === "phone" || card.type === "email" ? (
                          <span className="flex items-center gap-1.5">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse shrink-0" />
                            {card.line2}
                          </span>
                        ) : (
                          card.line2
                        )}
                      </p>
                    </Tag>
                  );
                })}
              </div>

              {/* Interactive SC Presence Map */}
              <div className="flex flex-col gap-4 p-3 sm:p-6 rounded-2xl border border-[rgba(201,155,49,0.18)] bg-white shadow-sm overflow-hidden items-center group relative">
                {/* Gold grid overlay decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="map-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.5" fill="#c99b31" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#map-dots)" />
                  </svg>
                </div>
                <h3 className="text-[12.5px] font-bold text-text-navy uppercase tracking-wider self-start border-b border-brand-gold/25 pb-1">
                  Active Statewide Coverage Map
                </h3>
                <SouthCarolinaMap />
              </div>
            </div>

            {/* Right Column: Detailed Proposal Request Form */}
            <div className="lg:col-span-6 w-full">
              <div className="p-4 sm:p-10 rounded-2xl border border-[rgba(201,155,49,0.18)] bg-white shadow-xl relative overflow-hidden">
                {/* Thin gold top accent border */}
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-brand-gold to-tagline-gold" />

                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-5.5 h-[1.5px] bg-brand-gold" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold">{form.badge}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-text-navy leading-none tracking-tight mt-1">
                    {form.heading}
                  </h3>
                  <p className="text-[13px] text-text-slate leading-[1.6] mt-1">
                    {form.description}
                  </p>
                </div>

                {/* Form completion progress indicator */}
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex justify-between items-center text-[10px] font-black tracking-wider text-text-navy/60">
                    <span className="uppercase">{form.progressLabel}</span>
                    <span className="font-mono text-brand-gold">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {submitStatus !== "success" ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4 text-text-navy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Name row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="firstName" className="text-[10.5px] font-bold uppercase tracking-wider text-text-navy/70">
                            {labels.firstName || "First Name"}
                          </label>
                          <input
                            required
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleChange}
                            placeholder={placeholders.firstName}
                            className="h-10 px-3.5 bg-[#f7f8fa] border border-gray-200 rounded-md text-[13px] placeholder-gray-400 focus-visible:outline-none focus-visible:border-brand-gold/60 focus-visible:bg-white transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="lastName" className="text-[10.5px] font-bold uppercase tracking-wider text-text-navy/70">
                            {labels.lastName || "Last Name"}
                          </label>
                          <input
                            required
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleChange}
                            placeholder={placeholders.lastName}
                            className="h-10 px-3.5 bg-[#f7f8fa] border border-gray-200 rounded-md text-[13px] placeholder-gray-400 focus-visible:outline-none focus-visible:border-brand-gold/60 focus-visible:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Contact row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-[10.5px] font-bold uppercase tracking-wider text-text-navy/70">
                            {labels.email || "Email"}
                          </label>
                          <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder={placeholders.email}
                            className="h-10 px-3.5 bg-[#f7f8fa] border border-gray-200 rounded-md text-[13px] placeholder-gray-400 focus-visible:outline-none focus-visible:border-brand-gold/60 focus-visible:bg-white transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="phone" className="text-[10.5px] font-bold uppercase tracking-wider text-text-navy/70">
                            {labels.phone || "Phone"}
                          </label>
                          <input
                            required
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder={placeholders.phone}
                            className="h-10 px-3.5 bg-[#f7f8fa] border border-gray-200 rounded-md text-[13px] placeholder-gray-400 focus-visible:outline-none focus-visible:border-brand-gold/60 focus-visible:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Property Detail row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="propertyName" className="text-[10.5px] font-bold uppercase tracking-wider text-text-navy/70">
                            {labels.propertyName || "Property Name"}
                          </label>
                          <input
                            required
                            type="text"
                            id="propertyName"
                            name="propertyName"
                            value={formState.propertyName}
                            onChange={handleChange}
                            placeholder={placeholders.propertyName}
                            className="h-10 px-3.5 bg-[#f7f8fa] border border-gray-200 rounded-md text-[13px] placeholder-gray-400 focus-visible:outline-none focus-visible:border-brand-gold/60 focus-visible:bg-white transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="serviceType" className="text-[10.5px] font-bold uppercase tracking-wider text-text-navy/70">
                            {labels.serviceNeeded || "Service Needed"}
                          </label>
                          <div className="relative">
                            <select
                              id="serviceType"
                              name="serviceType"
                              value={formState.serviceType}
                              onChange={handleChange}
                              className="w-full h-10 pl-3.5 pr-8 bg-[#f7f8fa] border border-gray-200 rounded-md text-[13px] focus-visible:outline-none focus-visible:border-brand-gold/60 focus-visible:bg-white transition-all appearance-none cursor-pointer font-medium"
                            >
                              {serviceOptions.map((opt: string) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Message area */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-[10.5px] font-bold uppercase tracking-wider text-text-navy/70">
                          {labels.message || "Message"}
                        </label>
                        <textarea
                          required
                          rows={4}
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder={placeholders.message}
                          className="p-3.5 bg-[#f7f8fa] border border-gray-200 rounded-md text-[13px] placeholder-gray-400 focus-visible:outline-none focus-visible:border-brand-gold/60 focus-visible:bg-white transition-all resize-none"
                        />
                      </div>

                      {/* Submit action */}
                      <button
                        type="submit"
                        disabled={submitStatus === "loading"}
                        className="group flex h-12 w-full items-center justify-center gap-2.5 bg-[var(--brand-gold)] text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[var(--primary-navy)] active:scale-[0.98] transition-all duration-300 rounded-[4px] cursor-pointer shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed mt-2"
                      >
                        <Send size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        {submitStatus === "loading"
                          ? (form.loadingLabel || "Sending...")
                          : (form.submitLabel || "Submit")}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-panel"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center justify-center py-10 px-4 text-center gap-4 border border-emerald-100 bg-emerald-50/20 rounded-xl"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                      >
                        <CheckCircle2 size={32} strokeWidth={2} />
                      </motion.div>
                      <div>
                        <h4 className="text-[17px] font-bold text-text-navy font-display">{form.successTitle}</h4>
                        <p className="mt-2 text-[12.5px] leading-relaxed text-text-slate max-w-[340px]">
                          {form.successDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => setSubmitStatus("idle")}
                        className="mt-4 px-5 py-2.5 border border-gray-200 hover:border-brand-gold/45 text-[10.5px] font-bold uppercase tracking-wider rounded-md text-text-navy bg-white hover:bg-[#f7f8fa] transition cursor-pointer active:scale-95"
                      >
                        {form.resetLabel}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}