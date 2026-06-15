"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ProofBar from "@/components/RoofingExperts"; // RoofingExperts refactored in-place as ProofBar
import ServiceDivisions from "@/components/Services"; // Services refactored in-place as ServiceDivisions
import WhyChoose from "@/components/HowWeWork"; // HowWeWork refactored in-place as WhyChoose
import VendorNetwork from "@/components/Leadership"; // Leadership refactored in-place as VendorNetwork
import TrustStrip from "@/components/BrandStore"; // BrandStore refactored in-place as TrustStrip
import Testimonials from "@/components/Testimonials"; // Testimonials refactored in-place as Testimonials
import ResourcesFAQ from "@/components/FAQ"; // FAQ refactored in-place as ResourcesFAQ

// Dynamic import for client-side map rendering
const ServiceAreas = dynamic(() => import("@/components/ServiceAreaMap"), { ssr: false }); // ServiceAreaMap refactored in-place as ServiceAreas

import CtaBar from "@/components/QuickQuote"; // QuickQuote refactored in-place as CtaBar
import ContactForm from "@/components/QAForm"; // QAForm refactored in-place as ContactForm

export default function HomeTemplate({ pageData, params }: { pageData?: any, params?: any }) {
  return (
    <div className="relative min-h-screen bg-white text-[#072642]">
      <Hero />
      <ProofBar />
      <ServiceDivisions />
      <WhyChoose />
      <VendorNetwork />
      <TrustStrip />
      <Testimonials />
      <ResourcesFAQ />
      <ServiceAreas />
      <CtaBar />
      <ContactForm />
    </div>
  );
}
