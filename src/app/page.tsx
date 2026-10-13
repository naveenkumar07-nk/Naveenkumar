import BusCinematicHero from "@/components/sections/BusCinematicHero";
import OffersBanner from "@/components/sections/OffersBanner";
import Fleet from "@/components/sections/Fleet";
import InteriorShowcase from "@/components/sections/InteriorShowcase";
import Journeys from "@/components/sections/Journeys";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import ParticleBackground from "@/components/animation/ParticleBackground";
import TopOffersMarquee from "@/components/ui/TopOffersMarquee";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060608] relative overflow-x-hidden">
      {/* Interactive Ambient Glow Particles */}
      <ParticleBackground />

      {/* Top Trending Offers Banner */}
      <div className="pt-16 md:pt-20">
        <TopOffersMarquee />
      </div>

      {/* Cinematic Animated 3D Bus Hero Section */}
      <BusCinematicHero />

      {/* Special Deals & Offers Showcase Banner */}
      <OffersBanner />

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
