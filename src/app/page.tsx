import About from "@/components/About";
import Bridal from "@/components/Bridal";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import Pricing from "@/components/Pricing";
import ScrollProvider from "@/components/ScrollProvider";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <JsonLd />
      <ScrollProvider />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Bridal />
      <Gallery />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
