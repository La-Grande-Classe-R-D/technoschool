"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Code2, Database, Shield } from "lucide-react";

// import { ContactInquiryDialog } from "./ContactInquiryDialog";
import { EXTERNAL_FORM_URL } from "@/lib/constants";

const heroBadges = [
  { icon: Code2, label: "Développement Web / Full Stack", accent: "#22d3ee" },
  { icon: Database, label: "Data & IA", accent: "#AD6BFF" },
  { icon: Shield, label: "Cybersécurité", accent: "#5C6FFF" },
];

export function Hero() {
  return (
    <section
      className="hero-section relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-[180px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-[180px]" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-violet-600 rounded-full opacity-20 blur-[180px]" />
      </div>

      {/* Gradient bottom border */}
      <div className="hero-gradient-border" />

      {/* Content */}
      <div className="hero-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-copy"
        >
          <span className="eyebrow hero-eyebrow">LGC · TechnoSchool</span>

          <h1 className="hero-title text-3xl md:text-5xl leading-tight">
            Développez votre{" "}
            <span className="hero-gradient-text">
              expertise Tech LGC
            </span>
            <br />
            programmez votre{" "}
            <span className="hero-gradient-text">
              avenir
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300" style={{ marginTop: "1.5rem" }}>
            La grande classe TechnoSchool forme celles et ceux qui construisent le monde
            digital de demain.
          </p>

          <div className="hero-badges">
            {heroBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div className="hero-badge" key={badge.label}>
                  <span
                    className="hero-badge-icon"
                    style={{ background: `${badge.accent}22`, color: badge.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  {badge.label}
                </div>
              );
            })}
          </div>

          <div className="hero-actions">
            {/* <ContactInquiryDialog
              trigger={
                <button type="button" className="px-8 py-4 bg-[#5C6FFF] hover:bg-[#4D5FEF] text-white btn-rounded shadow-[0_0_30px_rgba(92,111,255,0.5)] transition-all duration-300">
                  Découvrir nos formations
                </button>
              }
            /> */}
            <a
              href={EXTERNAL_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#5C6FFF] hover:bg-[#4D5FEF] text-white btn-rounded shadow-[0_0_30px_rgba(92,111,255,0.5)] transition-all duration-300"
            >
              Découvrir nos formations
            </a>
            <a href="#events" className="hero-btn-secondary">
              Voir les événements
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-visual"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="hero-visual-glow" aria-hidden="true" />
            <div className="hero-visual-frame">
              <Image
                src="/asset/affiche-technoSchool-lgc.webp"
                alt="TechnoSchool — La Grande Classe R&D"
                width={1122}
                height={1402}
                priority
                sizes="(max-width: 1024px) 90vw, 32rem"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
