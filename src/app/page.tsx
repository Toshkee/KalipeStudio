import About from "@/components/About";
import Bridal from "@/components/Bridal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import ScrollProvider from "@/components/ScrollProvider";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <ScrollProvider />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Bridal />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
