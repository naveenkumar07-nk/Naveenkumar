import BusCinematicHero from "@/components/sections/BusCinematicHero";
import Fleet from "@/components/sections/Fleet";
import InteriorShowcase from "@/components/sections/InteriorShowcase";
import Journeys from "@/components/sections/Journeys";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import ParticleBackground from "@/components/animation/ParticleBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060608] relative overflow-x-hidden">
      {/* Interactive Ambient Glow Particles */}
      <ParticleBackground />

      {/* Cinematic Animated 3D Bus Hero Section */}
      <BusCinematicHero />

      {/* Core Website Showcase Sections */}
      <Fleet />
      <InteriorShowcase />
      <Journeys />
      <WhyChooseUs />
      <Team />
      <Contact />
    </main>
  );
}
