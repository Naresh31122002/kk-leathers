import Hero from "@/sections/hero/Hero";
import Manifesto from "@/sections/Manifesto";
import Collections from "@/sections/collections/Collections";
import Craftsmanship from "@/sections/craft/Craftsmanship";
import ProductShowcase from "@/sections/showcase/ProductShowcase";
import Business from "@/sections/Business";
import Accessories from "@/sections/Accessories";
import Gallery from "@/sections/gallery/Gallery";
import Story from "@/sections/Story";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/contact/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

/**
 * Homepage flow (doc 01 §13, enriched):
 * Loader → Hero → Manifesto → Collections → Craftsmanship → Product Showcase →
 * Business → Accessories → Gallery → Story → Testimonials → Contact → Footer.
 * The Oxford travels from Hero → Showcase → Gallery as the connective thread.
 */
export default function Home() {
  return (
    <main>
      <JsonLd />
      <Hero />
      <Manifesto />
      <Collections />
      <Craftsmanship />
      <ProductShowcase />
      <Business />
      <Accessories />
      <Gallery />
      <Story />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
