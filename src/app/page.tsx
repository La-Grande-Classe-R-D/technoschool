import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Formations } from "../components/Formations";
import { Team } from "../components/Team";
import { Statistics } from "../components/Statistics";
import { Testimonials } from "../components/Testimonials";
import { Events } from "../components/Events";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { Particles } from "../components/Particles";
import { ChatBot } from "../components/ChatBot";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Fixed side particles (visible partout sauf masquées par le fond opaque du Hero) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "200px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Particles count={50} size={3.5} />
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          right: 0,
          width: "200px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Particles count={50} size={3.5} />
      </div>

      <ChatBot />
      <Nav />
      <main id="main-content" className="relative z-10 pt-16">
        <Hero />
        <Formations />
        <Team />
        <Statistics />
        <Testimonials />
        <Events />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
