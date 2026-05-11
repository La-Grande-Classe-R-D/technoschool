"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowRight, X } from "lucide-react";
import Image from "next/image";

const events = [
  {
    date: "15 Nov 2026",
    title: "Portes Ouvertes - Découverte des formations",
    description: "Venez rencontrer notre équipe et découvrir nos campus.",
  },
  {
    date: "22 Nov 2026",
    title: "Workshop IA & Machine Learning",
    description: "Introduction pratique aux concepts d'intelligence artificielle.",
  },
  {
    date: "5 Déc 2026",
    title: "Hackathon Cybersécurité",
    description: "24h pour relever des défis de sécurité informatique.",
  },
];

export function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const openModal = () => {
    setClosing(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setClosing(false);
    }, 600);
  };

  return (
    <>
    <section id="events" className="section-scroll-margin py-20 px-6 bg-black/60">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-16 bg-gradient-to-r from-[#5C6FFF] via-[#AD6BFF] to-[#FF9966] bg-clip-text text-transparent"
        >
          Prochains événements
        </motion.h2>

        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gradient-to-r from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-[#5C6FFF] hover:shadow-[0_0_30px_rgba(92,111,255,0.2)] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-[#5C6FFF]" />
                    <span className="text-[#5C6FFF]">{event.date}</span>
                  </div>
                  <h3 className="text-2xl mb-2">{event.title}</h3>
                  <p className="text-gray-400">{event.description}</p>
                </div>
                <button type="button" onClick={openModal} className="event-cta flex items-center gap-2 text-[#5C6FFF] hover:text-[#AD6BFF]">
                  En savoir plus
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {modalOpen && (
      <div
        className={closing ? "modal-overlay-closing" : "modal-overlay"}
        style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1rem" }}
        onClick={closeModal}
      >
        <div
          className={closing ? "modal-panel-closing" : "modal-panel"}
          style={{ width: "420px", maxWidth: "100%", backgroundColor: "#0a0a0f", border: "1px solid #1f2937", borderRadius: "1rem", boxShadow: "0 25px 60px rgba(0,0,0,1)", overflow: "hidden", position: "relative" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeModal}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Fermer"
            style={{ position: "absolute", top: "1rem", right: "1rem" }}
          >
            <X className="w-4 h-4" />
          </button>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2.5rem 2rem", gap: "1.5rem" }}>
            <Image
              src="/favicon/logo-lgc-TS.png"
              alt="TechnoSchool — LGC R&D"
              width={80}
              height={80}
              style={{ borderRadius: "0.75rem" }}
            />
            <p style={{ color: "#d1d5db", fontSize: "1rem", textAlign: "center", lineHeight: 1.6 }}>
              Événement à déterminer
            </p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
