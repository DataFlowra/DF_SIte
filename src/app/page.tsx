"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import DashboardShowcase from "@/components/showcase/DashboardShowcase";
import FeaturesBento from "@/components/features/FeaturesBento";
import HowItWorks from "@/components/workflow/HowItWorks";

import FAQAccordion from "@/components/faq/FAQAccordion";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <DashboardShowcase />
        <FeaturesBento />
        <HowItWorks />

        <FAQAccordion />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
