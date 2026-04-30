"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import DashboardShowcase from "@/components/showcase/DashboardShowcase";
import FeaturesBento from "@/components/features/FeaturesBento";
import HowItWorks from "@/components/workflow/HowItWorks";
import SocialProof from "@/components/social/SocialProof";

import FAQAccordion from "@/components/faq/FAQAccordion";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import PricingSection from "@/components/pricing/PricingSection";
import CTASection from "@/components/cta/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <DashboardShowcase />
        <FeaturesBento />
        <HowItWorks />
        <SocialProof />
        <PricingSection />

        <FAQAccordion />
        <CTASection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
