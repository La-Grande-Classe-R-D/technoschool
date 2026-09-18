import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Formations } from "../components/Formations";
import { Team } from "../components/Team";
import { Statistics } from "../components/Statistics";
import { Testimonials } from "../components/Testimonials";
import { Events } from "../components/Events";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { ChatBot } from "../components/ChatBot";
import { ParticlesBackground } from "../components/ParticlesBackground";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticlesBackground count={90} />
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
