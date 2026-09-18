"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { InitialsAvatar } from "./InitialsAvatar";

/* Equipe LGC */

const team = [
  {
    name: "Ismaël Niang",
    role: "CEO La grande classe & R&D",
    image: "/asset/avatar.svg",
  },
  {
    name: "William Mercier",
    role: "Chef de projet junior R&D",
    image: "/asset/willy.png",
  },
  {
    name: "Kevin Oudelet",
    role: "Ingénieur IA R&D",
    image: "/asset/kevin.png",
  },
  {
    name: "Giuseppe Militello",
    role: "CTO R&D",
    image: "/asset/gius.png"
  },
   {
    name: "Diae Bootia El Oumami",
    role: "Responsable Juridique à la Direction",
    image: "/asset/diae.png"
  },
    {
    name: "Anna Feugueur",
    role: "Responsable formation",
    image: "/asset/anna.png"
  },
      {
    name: "Sarah Benyoussef",
    role: "Chargée d'admission",
    image: "/asset/sarah.png"
  },
 
      {
    name: "Houda BOUSSEKAY",
    role: "Relations entreprises",
    image: "/asset/avatar.svg"
  },
   

];

export function Team() {
  return (
    <section id="team" className="section-scroll-margin py-20 px-6 bg-black/60">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-intro"
        >
          <span className="eyebrow">La Team</span>
          <h2 className="section-title">
            La Team La grande classe &amp;
            <span className="bg-gradient-to-r from-[#5C6FFF] to-[#AD6BFF] bg-clip-text text-transparent">
              &nbsp;TechnoSchool - R&D
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#5C6FFF]/20 to-[#AD6BFF]/20 p-1">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
                  {/* Avatar with glow effect */}
                  <div className="relative aspect-square overflow-hidden rounded-full border border-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5C6FFF]/30 to-[#AD6BFF]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    {member.image === "/asset/avatar.svg" ? (
                      <InitialsAvatar name={member.name} />
                    ) : (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-full"
                        priority={false}
                      />
                    )}
                    {/* Glow overlay */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(92,111,255,0.3)] group-hover:shadow-[inset_0_0_80px_rgba(173,107,255,0.4)] transition-shadow duration-300" />
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl mb-1">{member.name}</h3>
                    <p className="text-gray-400">{member.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

