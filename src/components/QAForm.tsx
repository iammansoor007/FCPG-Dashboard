"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useContent } from "../hooks/useContent";

const CardIconMap: Record<string, any> = { address: MapPin, phone: Phone, email: Mail, hours: Clock };

export default function ContactForm({ defaultService }: { defaultService?: string }) {
  const { contactPage, footer, services } = useContent();
  
  // Dynamic links and values
  const phoneVal = footer?.contact?.phone || "(636) 449-9714";
  const phoneHref = footer?.contact?.phone 
    ? `tel:${footer.contact.phone.replace(/[^0-9+]/g, '')}` 
    : "tel:+16364499714";

  const emailVal = footer?.contact?.email || "esellers@RealRoof.com";
  const emailHref = `mailto:${emailVal}`;

  // Dynamic service list from CMS
  const dynamicServiceOptions = Array.isArray(services?.services) 
    ? services.services.filter((s: any) => !s.status || s.status === 'published').map((s: any) => s.title)
    : [];

  const defaultServiceOptions = [
    "Residential Roofing",
    "Commercial Roofing",
    "Windows & Doors",
    "Custom Decks",
    "Siding, Soffit & Fascia",
    "Gutters & Protection",
    "Vinyl and aluminum Fencing"
  ];

  const serviceOptions = dynamicServiceOptions.length > 0 ? dynamicServiceOptions : defaultServiceOptions;

  // Adapt database overrides to the new card layout design
  const cf = {
    badge: contactPage?.header?.badge || "GET IN TOUCH",
    heading1: contactPage?.header?.headline || "We'd Love to",
    heading2: contactPage?.header?.description || "Hear From You",
    description: "Have a question or ready to start your next exterior project? Contact Greenville's premium exterior remodeling specialists today.",
    cards: [
      { type: "address", label: "Visit Our Showroom", line1: footer?.contact?.address || "Greenville, SC", line2: "Serving the entire Upstate area", href: null },
      { type: "phone", label: "Call Us Directly", line1: phoneVal, line2: footer?.contact?.hours || "Mon-Fri: 8:00 AM - 5:00 PM", href: phoneHref },
      { type: "email", label: "Email Our Team", line1: emailVal, line2: "We reply within 4 hours", href: emailHref },
      { type: "hours", label: "Emergency Service", line1: footer?.contact?.emergency || "24/7 Roof Tarping", line2: "Immediate response team", href: null }
    ],
    successTitle: "Message Sent!",
    successDesc: "Your request has been successfully received. One of our premium specialists will follow up with you within 4-8 hours.",
    resetLabel: "Send Another Message",
    submitLabel: "Send Message",
    loadingLabel: "Sending...",
    labels: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      propertyName: "Property / HOA Association Name",
      serviceNeeded: "Service Needed",
      message: "How Can We Help You?"
    },
    placeholders: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "(636) 449-9714",
      propertyName: "e.g., Oak Creek HOA",
      message: "Briefly describe your project or inquiry..."
    },
    serviceOptions: serviceOptions
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyName: "",
    serviceType: defaultService || cf.serviceOptions[0],
    message: ""
  });
  
  const [smsConsent, setSmsConsent] = useState(false);
  const [showSmsError, setShowSmsError] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsConsent) {
      setShowSmsError(true);
      return;
    }
    setShowSmsError(false);
    setStatus("loading");

    const emailContent = `
🔨 NEW CONTACT FORM INQUIRY - RealRoof
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${form.firstName} ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}
Property/Association: ${form.propertyName}
Service Requested: ${form.serviceType}
SMS Consent: Yes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Message:
${form.message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️ Submitted: ${new Date().toLocaleString()}
`;

    try {
      const payload = {
        type: 'Contact Form',
        subject: `Contact Inquiry - ${form.firstName} ${form.lastName}`.trim(),
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        propertyName: form.propertyName,
        project_type: form.serviceType,
        message: form.message,
        sms_consent: 'Yes'
      };

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus("success");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          propertyName: "",
          serviceType: cf.serviceOptions[0],
          message: ""
        });
        setSmsConsent(false);
      } else {
        throw new Error('API submission failed, falling back to mailto');
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Fallback to mailto link
      const mailtoLink = `mailto:${emailVal}?subject=Contact Inquiry - ${form.firstName} ${form.lastName}&body=${encodeURIComponent(emailContent)}`;
      window.location.href = mailtoLink;
      setStatus("success");
    }
  };

  return (
    <section id="contact" className="relative bg-white overflow-hidden py-12 lg:py-16"
      style={{ borderTop: "1px solid #eceae4" }}>
      {/* ── Background Grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          inset: "-40%",
          backgroundImage: "radial-gradient(rgba(5, 41, 70, 0.03) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#c99b31]/[0.045] rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#052946]/[0.035] rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Direct info block */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-5 border border-[#c99b31]/25 rounded-full px-3.5 py-1.5 bg-[#c99b31]/[0.03] shadow-sm w-fit">
              <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#c99b31]">{cf.badge}</p>
            </div>

            {/* Title */}
            <h2
              className="font-display font-bold text-[#052946] leading-[1.1] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 2.8rem)" }}
            >
              <span className="font-serif italic font-normal text-[#052946]/95 block mb-1">
                {cf.heading1}
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
                {cf.heading2}
              </span>
            </h2>

            <p className="text-[14px] font-sans leading-[1.7] text-[#43566a] mb-6 max-w-[480px]">
              {cf.description}
            </p>

            {/* Premium Gold Accent Line Divider */}
            <div className="h-[1.5px] w-20 bg-gradient-to-r from-[#c99b31] to-transparent mb-8" />

            {/* 2x2 Grid of Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {cf.cards.map((card) => {
                const Icon = CardIconMap[card.type];
                const isClickable = card.href;
                const Tag = isClickable ? "a" : "div";
                return (
                  <Tag
                    key={card.label}
                    {...(isClickable ? { href: card.href } : {})}
                    className={`premium-shimmer p-4 rounded-2xl border border-[rgba(5,41,70,0.05)] bg-[#f7f8fa]/80 backdrop-blur-sm shadow-sm hover:border-[rgba(201,155,49,0.3)] hover:shadow-md transition-all duration-300${isClickable ? " group cursor-pointer hover:bg-white flex flex-col justify-start" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-2 text-[#c99b31]">
                      <Icon size={13} />
                      <span className="text-[9.5px] font-black uppercase tracking-wider text-[#052946]/40 font-sans">{card.label}</span>
                    </div>
                    <p className={`text-[13.5px] font-bold text-[#052946]${isClickable ? " group-hover:text-[#c99b31] transition-colors duration-200" : ""}`}>{card.line1}</p>
                    <p className="text-[11.5px] text-[#43566a] mt-0.5 leading-tight font-sans">
                      {card.line2}
                    </p>
                  </Tag>
                );
              })}
            </div>

          </div>

          {/* Right Column: Form Card wrapper */}
          <div className="lg:col-span-7 w-full flex justify-center sm:justify-end">
            
            <div className="relative w-full max-w-[620px] rounded-[32px] border border-[rgba(5,41,70,0.06)] bg-white/95 backdrop-blur-md shadow-2xl p-6 sm:p-10 overflow-hidden flex flex-col justify-center min-h-[500px]">
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] mb-6">
                      <CheckCircle2 size={32} />
                    </span>
                    <h3 className="font-display font-bold text-[22px] text-[#052946] leading-tight">
                      {cf.successTitle}
                    </h3>
                    <p className="text-[14px] text-[#43566a] leading-relaxed mt-3 max-w-[360px]">
                      {cf.successDesc}
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 px-6 py-2.5 bg-[#052946] text-white hover:bg-[#052946]/90 font-bold text-[11px] uppercase tracking-wider rounded-[4px] transition-all duration-200 active:scale-[0.97]"
                    >
                      {cf.resetLabel}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4 relative z-10"
                  >

                    {/* Name grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9.5px] font-black uppercase tracking-[0.12em] text-[#052946]/60 font-sans">{cf.labels.firstName}</label>
                        <input
                          required
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder={cf.placeholders.firstName}
                          className="h-11 px-4 border border-black/10 focus:border-[#c99b31]/60 bg-[#f8f9fb] focus:bg-white transition duration-200 text-[13.5px] font-medium outline-none rounded-[6px] focus:ring-2 focus:ring-[#c99b31]/30 focus:shadow-[0_4px_12px_rgba(201,155,49,0.08)]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9.5px] font-black uppercase tracking-[0.12em] text-[#052946]/60 font-sans">{cf.labels.lastName}</label>
                        <input
                          required
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder={cf.placeholders.lastName}
                          className="h-11 px-4 border border-black/10 focus:border-[#c99b31]/60 bg-[#f8f9fb] focus:bg-white transition duration-200 text-[13.5px] font-medium outline-none rounded-[6px] focus:ring-2 focus:ring-[#c99b31]/30 focus:shadow-[0_4px_12px_rgba(201,155,49,0.08)]"
                        />
                      </div>
                    </div>

                    {/* Email/Phone grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9.5px] font-black uppercase tracking-[0.12em] text-[#052946]/60 font-sans">{cf.labels.email}</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder={cf.placeholders.email}
                          className="h-11 px-4 border border-black/10 focus:border-[#c99b31]/60 bg-[#f8f9fb] focus:bg-white transition duration-200 text-[13.5px] font-medium outline-none rounded-[6px] focus:ring-2 focus:ring-[#c99b31]/30 focus:shadow-[0_4px_12px_rgba(201,155,49,0.08)]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9.5px] font-black uppercase tracking-[0.12em] text-[#052946]/60 font-sans">{cf.labels.phone}</label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder={cf.placeholders.phone}
                          className="h-11 px-4 border border-black/10 focus:border-[#c99b31]/60 bg-[#f8f9fb] focus:bg-white transition duration-200 text-[13.5px] font-medium outline-none rounded-[6px] focus:ring-2 focus:ring-[#c99b31]/30 focus:shadow-[0_4px_12px_rgba(201,155,49,0.08)]"
                        />
                      </div>
                    </div>

                    {/* Property / Association Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] font-black uppercase tracking-[0.12em] text-[#052946]/60 font-sans">{cf.labels.propertyName}</label>
                      <input
                        required
                        type="text"
                        name="propertyName"
                        value={form.propertyName}
                        onChange={handleChange}
                        placeholder={cf.placeholders.propertyName}
                        className="h-11 px-4 border border-black/10 focus:border-[#c99b31]/60 bg-[#f8f9fb] focus:bg-white transition duration-200 text-[13.5px] font-medium outline-none rounded-[6px] focus:ring-2 focus:ring-[#c99b31]/30 focus:shadow-[0_4px_12px_rgba(201,155,49,0.08)]"
                      />
                    </div>

                    {/* Dropdown service needed */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] font-black uppercase tracking-[0.12em] text-[#052946]/60 font-sans">{cf.labels.serviceNeeded}</label>
                      <select
                        name="serviceType"
                        value={form.serviceType}
                        onChange={handleChange}
                        className="h-11 px-3 border border-black/10 focus:border-[#c99b31]/60 bg-[#f8f9fb] focus:bg-white transition duration-200 text-[13px] font-semibold text-[#052946] outline-none rounded-[6px] focus:ring-2 focus:ring-[#c99b31]/30 focus:shadow-[0_4px_12px_rgba(201,155,49,0.08)]"
                      >
                        {cf.serviceOptions.map((opt: string) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message Area */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] font-black uppercase tracking-[0.12em] text-[#052946]/60 font-sans">{cf.labels.message}</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={cf.placeholders.message}
                        className="p-4 border border-black/10 focus:border-[#c99b31]/60 bg-[#f8f9fb] focus:bg-white transition duration-200 text-[13.5px] font-medium outline-none rounded-[6px] resize-none focus:ring-2 focus:ring-[#c99b31]/30 focus:shadow-[0_4px_12px_rgba(201,155,49,0.08)]"
                      />
                    </div>

                    {/* SMS Consent Checkbox */}
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100 mt-1">
                      <input
                        type="checkbox"
                        id="smsConsentContact"
                        checked={smsConsent}
                        onChange={(e) => {
                          setSmsConsent(e.target.checked);
                          if (e.target.checked) setShowSmsError(false);
                        }}
                        className="mt-1 cursor-pointer"
                      />
                      <label htmlFor="smsConsentContact" className={`text-[10px] sm:text-[11px] leading-relaxed cursor-pointer ${showSmsError ? "text-red-500 font-bold" : "text-gray-500"}`}>
                        I agree to receive informational SMS text messages from RealRoof related to my inquiry, including appointments and updates. Reply STOP to opt out. Message & data rates may apply. See our <Link href="/privacy" className="text-[#c99b31] underline">Privacy Policy</Link> and <Link href="/terms" className="text-[#c99b31] underline">Terms</Link>.
                      </label>
                    </div>
                    {showSmsError && (
                      <p className="text-red-500 text-[10px] font-bold mt-[-5px]">Please check the box to agree to SMS communications.</p>
                    )}

                    {/* Button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group w-full h-[48px] rounded-[4px] bg-[#c99b31] hover:bg-[#052946] text-white hover:!text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.97] shadow-lg border border-[#c99b31] hover:border-[#052946] disabled:opacity-75 disabled:pointer-events-none mt-2 cursor-pointer"
                    >
                      {status === "loading" ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {cf.loadingLabel}
                        </>
                      ) : (
                        <>
                          {cf.submitLabel}
                          <Send size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}