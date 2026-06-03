import NavbarShell from "@/components/NavbarShell";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Vision from "@/components/Vision";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import InterestLinks from "@/components/InterestLinks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <NavbarShell />
      <main className="relative z-0 pb-20">
        <Hero />
        <About />
        <Vision />
        <Services />
        <Clients />
        <InterestLinks />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
