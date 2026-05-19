"use client";

import { Fragment, useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";

// Mettre à jour ces valeurs avec les données réelles (ex: depuis un CMS ou un fichier de config).
// Si une valeur est inconnue, la passer à null pour afficher "Données en cours de collecte".
const stats: { target: number | null; suffix: string; label: string }[] = [
  { target: 75, suffix: "%", label: "Taux de réussite" },
  { target: 56, suffix: "", label: "Entreprises partenaires" },
  { target: 98, suffix: "%", label: "Satisfaction étudiante" },
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <>
      {/* suppressHydrationWarning évite une erreur SSR/client : le serveur rend la valeur
          finale, le client démarre l'animation à 0 (légère différence intentionnelle). */}
      <span ref={ref} suppressHydrationWarning>{target}</span>
      {suffix}
    </>
  );
}

export function Statistics() {
  return (
    <section className="py-20 px-6 bg-black/60">
      <div className="max-w-6xl mx-auto">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                className="stats-item"
              >
                <div className="text-6xl md:text-7xl bg-gradient-to-r from-[#5C6FFF] to-[#AD6BFF] bg-clip-text text-transparent mb-4">
                  {stat.target !== null ? (
                    <Counter target={stat.target} suffix={stat.suffix} />
                  ) : (
                    <span style={{ fontSize: "1.25rem" }}>Données en cours de collecte</span>
                  )}
                </div>
                <p className="text-lg text-white">{stat.label}</p>
              </motion.div>
              {index < stats.length - 1 && (
                <motion.span
                  className="stats-sep"
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.1, ease: "easeOut" }}
                >
                  /
                </motion.span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
