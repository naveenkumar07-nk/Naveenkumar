import Hero from "@/components/sections/Hero";
import Fleet from "@/components/sections/Fleet";
import InteriorShowcase from "@/components/sections/InteriorShowcase";
import Journeys from "@/components/sections/Journeys";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Fleet />
      <InteriorShowcase />
      <Journeys />
      <WhyChooseUs />
      <Team />
      <Contact />
    </main>
  );
}
