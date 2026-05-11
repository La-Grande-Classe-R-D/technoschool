"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Code2, Database, Shield } from "lucide-react";
import { motion } from "motion/react";

const SITE_URL = "https://technoschool.lagrandeclasse.fr";

const coursesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Formations TechnoSchool",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Course",
        "@id": `${SITE_URL}/#course-bts-sio`,
        name: "Développement Web / Full Stack - BTS SIO",
        description:
          "Maîtrisez les technologies front-end et back-end pour créer des applications web modernes et performantes. Formation BTS SIO option SLAM.",
        provider: {
          "@type": "EducationalOrganization",
          "@id": `${SITE_URL}/#organization`,
          name: "TechnoSchool — LGC R&D",
        },
        educationalLevel: "BTS",
        teaches: "Développement web, Full Stack, JavaScript, bases de données, cybersécurité",
        inLanguage: "fr-FR",
        url: `${SITE_URL}/#formations`,
        courseCode: "BTS-SIO-SLAM",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "onsite",
          inLanguage: "fr-FR",
          location: {
            "@type": "Place",
            name: "TechnoSchool — LGC R&D",
            address: {
              "@type": "PostalAddress",
              streetAddress: "51 rue Gaston Lauriau",
              addressLocality: "Montreuil",
              postalCode: "93100",
              addressCountry: "FR",
            },
          },
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Course",
        "@id": `${SITE_URL}/#course-data-ia`,
        name: "Data & IA",
        description:
          "Exploitez la puissance des données et de l'intelligence artificielle pour résoudre des problèmes complexes.",
        provider: {
          "@type": "EducationalOrganization",
          "@id": `${SITE_URL}/#organization`,
          name: "TechnoSchool — LGC R&D",
        },
        teaches: "Data science, intelligence artificielle, machine learning, analyse de données",
        inLanguage: "fr-FR",
        url: `${SITE_URL}/#formations`,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "onsite",
          inLanguage: "fr-FR",
          location: {
            "@type": "Place",
            name: "TechnoSchool — LGC R&D",
            address: {
              "@type": "PostalAddress",
              streetAddress: "51 rue Gaston Lauriau",
              addressLocality: "Montreuil",
              postalCode: "93100",
              addressCountry: "FR",
            },
          },
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Course",
        "@id": `${SITE_URL}/#course-cybersecurite`,
        name: "Cybersécurité",
        description:
          "Protégez les systèmes et les données contre les menaces numériques avec des compétences en sécurité avancées.",
        provider: {
          "@type": "EducationalOrganization",
          "@id": `${SITE_URL}/#organization`,
          name: "TechnoSchool — LGC R&D",
        },
        teaches: "Cybersécurité, protection des systèmes, gestion des accès, prévention cyberattaques",
        inLanguage: "fr-FR",
        url: `${SITE_URL}/#formations`,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "onsite",
          inLanguage: "fr-FR",
          location: {
            "@type": "Place",
            name: "TechnoSchool — LGC R&D",
            address: {
              "@type": "PostalAddress",
              streetAddress: "51 rue Gaston Lauriau",
              addressLocality: "Montreuil",
              postalCode: "93100",
              addressCountry: "FR",
            },
          },
        },
      },
    },
  ],
};

const formations = [
  {
    icon: Code2,
    title: "Développement Web / Full Stack - BTS SIO",
    description:
      "Maîtrisez les technologies front-end et back-end pour créer des applications web modernes et performantes.",
    detailBadge: "BTS SIO option SLAM",
    detailContent: [
      "Le BTS SIO option SLAM forme aux compétences essentielles du développement web et full stack : programmation, conception de bases de données, intégration front-end, développement back-end, cybersécurité, gestion de projet et maintenance applicative.",
      "Une formation professionnalisante pour apprendre à concevoir des solutions numériques modernes, performantes et adaptées aux besoins des entreprises.",
    ],
  },
  {
    icon: Database,
    title: "Data & IA",
    description:
      "Exploitez la puissance des données et de l'intelligence artificielle pour résoudre des problèmes complexes.",
    detailBadge: "Parcours Data & IA",
    detailContent: [
      "Cette formation initie aux fondamentaux de la data et de l intelligence artificielle en abordant la collecte, l analyse et l exploitation des donnees, ainsi que les principes de base du machine learning, de l automatisation et des outils d aide a la decision.",
      "Les apprenants developpent une comprehension concrete des usages de la data et de l IA dans les entreprises, avec une approche orientee pratique, innovation et resolution de problematiques reelles.",
    ],
  },
  {
    icon: Shield,
    title: "Cybersécurité",
    description:
      "Protégez les systèmes et les données contre les menaces numériques avec des compétences en sécurité avancées.",
    detailBadge: "Parcours Cybersécurité",
    detailContent: [
      "Cette formation aborde les fondamentaux de la cybersécurité en sensibilisant aux enjeux de protection des systèmes, des réseaux, des données et des utilisateurs.",
      "Les apprenants découvrent les principales menaces informatiques, les bonnes pratiques de sécurité, la gestion des accès, la protection des environnements numériques et les bases de la prévention des cyberattaques.",
    ],
  },
];

export function Formations() {
  const [selectedFormation, setSelectedFormation] = React.useState<(typeof formations)[number] | null>(null);
  const [isClosing, setIsClosing] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!selectedFormation) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedFormation]);

  function openDialog(formation: (typeof formations)[number]) {
    setIsClosing(false);
    setSelectedFormation(formation);
  }

  function closeDialog() {
    setIsClosing(true);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
      />
      <section
        id="formations"
        className="section-scroll-margin py-20 px-6 bg-black/60"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Nos formations</h2>
            <p className="text-lg text-gray-400">
              Des cursus complets en développement web, data et cybersécurité.
            </p>
          </motion.div>

          <div className="space-y-6">
            {formations.map((formation, index) => {
              const Icon = formation.icon;
              const isClickable = Boolean(formation.detailContent);

              return (
                <motion.div
                  key={formation.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group bg-gradient-to-r from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-[#5C6FFF] hover:shadow-[0_0_30px_rgba(92,111,255,0.3)]`}
                  style={{ cursor: "pointer" }}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  onClick={isClickable ? () => openDialog(formation) : undefined}
                  onKeyDown={
                    isClickable
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openDialog(formation);
                          }
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-gradient-to-br from-[#5C6FFF] to-[#AD6BFF] rounded-xl group-hover:shadow-[0_0_20px_rgba(92,111,255,0.5)] transition-shadow duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className={isClickable ? "mb-2 text-2xl cursor-pointer" : "mb-2 text-2xl"}>
                        {formation.title}
                      </h3>
                      <p className="text-gray-400">{formation.description}</p>
                      <span className="mt-4 inline-flex w-fit cursor-pointer items-center gap-3 whitespace-nowrap text-sm font-medium text-[#AD6BFF]">
                        <span className="whitespace-nowrap">Découvrir la formation</span>
                        <ArrowRight className="inline-block h-4 w-4 shrink-0" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {mounted && selectedFormation
        ? createPortal(
            <div
              className={`formation-detail-overlay ${isClosing ? "is-closing" : "is-opening"}`}
              onAnimationEnd={(event) => {
                if (isClosing && event.target === event.currentTarget) {
                  setSelectedFormation(null);
                }
              }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  closeDialog();
                }
              }}
            >
              <div
                ref={dialogRef}
                className={`formation-detail-content ${isClosing ? "is-closing" : "is-opening"}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                tabIndex={-1}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    closeDialog();
                  }
                }}
              >
                <button
                  type="button"
                  className="formation-detail-close"
                  aria-label="Fermer la modale"
                  onClick={closeDialog}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12" />
                    <path d="M18 6l-12 12" />
                  </svg>
                </button>

                <div className="formation-detail-badge">
                  {selectedFormation.detailBadge}
                </div>
                <h3 id={titleId} className="formation-detail-title">
                  {selectedFormation.title}
                </h3>
                <div id={descriptionId} className="formation-detail-body">
                  {selectedFormation.detailContent?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
