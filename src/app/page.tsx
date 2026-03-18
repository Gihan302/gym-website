import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import GallerySection from "../components/sections/GallerySection";
import PricingSection from "../components/sections/PricingSection";
import ContactSection from "../components/sections/ContactSection";
import ClientSection from "../components/sections/ClientSection";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection id="home" />
        <AboutSection id="about" />
        <ServicesSection id="services" />
        <ClientSection id="clients" />
        <GallerySection id="gallery" />
        <PricingSection id="pricing" />
        <ContactSection id="contact" />
      </main>
      <Footer />
    </>
  );
}
