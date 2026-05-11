"use client";

import { Facebook, Instagram, Linkedin, X } from "lucide-react";
import { useState } from "react";
import { ContactInquiryDialog } from "./ContactInquiryDialog";

export function Footer() {
  const year = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [isAccessOpen, setIsAccessOpen] = useState(false);
  const [isAccessClosing, setIsAccessClosing] = useState(false);

  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isPolicyClosing, setIsPolicyClosing] = useState(false);

  const closeModal = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 600);
  };

  const closeAccessModal = () => {
    if (isAccessClosing) return;
    setIsAccessClosing(true);
    setTimeout(() => {
      setIsAccessOpen(false);
      setIsAccessClosing(false);
    }, 600);
  };

  const closePolicyModal = () => {
    if (isPolicyClosing) return;
    setIsPolicyClosing(true);
    setTimeout(() => {
      setIsPolicyOpen(false);
      setIsPolicyClosing(false);
    }, 600);
  };

  return (
    <>
      <footer className="bg-black border-t border-gray-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 hover:bg-gray-900 rounded-full transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-gray-900 rounded-full transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-gray-900 rounded-full transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-gray-400">
              <a
                href="https://lagrandeclasse.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                lagrandeclasse.fr
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Mentions légales
              </button>
              <button
                type="button"
                onClick={() => setIsAccessOpen(true)}
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Accessibilité
              </button>
              <ContactInquiryDialog
                title="Contactez-nous"
                description="Indiquez vos coordonnées et votre message. Nous reviendrons vers vous rapidement."
                submitLabel="Envoyer"
                trigger={
                  <button
                    type="button"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Contact
                  </button>
                }
              />
              <button
                type="button"
                data-open-policy
                onClick={() => setIsPolicyOpen(true)}
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Politique de confidentialité
              </button>
              
            </div>
          </div>

          <div className="footer-copyright mt-8 border-t border-gray-900 text-center text-sm text-gray-500">
            © {year}&nbsp;TechnoSchool — Recherche &amp; Développement, tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Modal Mentions légales */}
      {isModalOpen && (
        <div
          className={isClosing ? "modal-overlay-closing" : "modal-overlay"}
          style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1rem" }}
          onClick={() => closeModal()}
        >
          <div
            className={isClosing ? "modal-panel-closing" : "modal-panel"}
            style={{ width: "750px", maxWidth: "100%", backgroundColor: "#0a0a0f", border: "1px solid #1f2937", borderRadius: "1rem", boxShadow: "0 25px 60px rgba(0,0,0,1)", overflow: "hidden", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-base font-semibold text-white tracking-wide">
                <strong>Mentions légales</strong>
              </h2>
              <button
                type="button"
                onClick={() => closeModal()}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-5 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Éditeur du service
                </p>
                <p className="text-gray-400 mb-4">
                  Le présent espace <strong>LGC Recherche Développement</strong> est édité par :
                </p>
                <div className="bg-gray-900 rounded-xl p-4 space-y-2.5">
                  <p className="font-semibold text-white">
                    <strong>LGC Recherche et Développement</strong>
                  </p>
                  <div className="w-full h-px bg-gray-800" />
                  <ul className="divide-y divide-gray-800 text-gray-400">
                    <li className="py-1.5">SAS : Société par actions simplifiée</li>
                    <li className="py-1.5">51 rue Gaston Lauriau, 93100 Montreuil</li>
                    <li className="py-1.5">Directeur : Ismaëla Niang</li>
                    <li className="py-1.5">Téléphone : 01 40 10 27 22</li>
                    <li className="py-1.5">
                      <span className="text-gray-500">SIRET</span>{" "}
                      882 626 229 00026
                    </li>
                    <li className="py-1.5">
                      <span className="text-gray-500">Code APE</span>{" "}
                      72.19Z – R&amp;D en autres sciences physiques et naturelles
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-800 flex justify-end">
              <button
                type="button"
                onClick={() => closeModal()}
                className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Accessibilité */}
      {isAccessOpen && (
        <div
          className={isAccessClosing ? "modal-overlay-closing" : "modal-overlay"}
          style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1rem" }}
          onClick={() => closeAccessModal()}
        >
          <div
            className={isAccessClosing ? "modal-panel-closing" : "modal-panel"}
            style={{ width: "750px", maxWidth: "100%", backgroundColor: "#0a0a0f", border: "1px solid #1f2937", borderRadius: "1rem", boxShadow: "0 25px 60px rgba(0,0,0,1)", overflow: "hidden", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-base font-semibold text-white tracking-wide">
                <strong>Accessibilité</strong>
              </h2>
              <button
                type="button"
                onClick={() => closeAccessModal()}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-5 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Déclaration d&apos;accessibilité
                </p>
                <p className="text-gray-400 mb-4">
                  LGC Recherche &amp; Développement s&apos;engage à rendre ce service accessible conformément à la loi n° 2005-102 du 11 février 2005.
                </p>
                <div className="bg-gray-900 rounded-xl p-4 space-y-2.5">
                  <p className="font-semibold text-white">
                    <strong>État de conformité</strong>
                  </p>
                  <div className="w-full h-px bg-gray-800" />
                  <ul className="divide-y divide-gray-800 text-gray-400">
                    <li className="py-1.5">Conformité partielle au RGAA 4.1</li>
                    <li className="py-1.5">Navigation clavier disponible</li>
                    <li className="py-1.5">Contrastes conformes aux niveaux AA</li>
                    <li className="py-1.5">
                      <span className="text-gray-500">Contact</span>{" "}
                      contact@lgc-rd.fr
                    </li>
                  
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-800 flex justify-end">
              <button
                type="button"
                onClick={() => closeAccessModal()}
                className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Politique de confidentialité */}
      {isPolicyOpen && (
        <div
          className={isPolicyClosing ? "modal-overlay-closing" : "modal-overlay"}
          style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1rem" }}
          onClick={() => closePolicyModal()}
        >
          <div
            className={isPolicyClosing ? "modal-panel-closing" : "modal-panel"}
            style={{ width: "750px", maxWidth: "100%", backgroundColor: "#0a0a0f", border: "1px solid #1f2937", borderRadius: "1rem", boxShadow: "0 25px 60px rgba(0,0,0,1)", overflow: "hidden", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-base font-semibold text-white tracking-wide">
                <strong>Politique de confidentialité</strong>
              </h2>
              <button
                type="button"
                onClick={() => closePolicyModal()}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-5 text-sm max-h-[60vh] overflow-y-auto">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Collecte des données
                  </p>
                  <div className="bg-gray-900 rounded-xl p-4">
                    <ul className="divide-y divide-gray-800 text-gray-400">
                      <li className="py-1.5">LGC R&amp;D collecte uniquement les données nécessaires au fonctionnement du service.</li>
                      <li className="py-1.5">Données collectées : nom, prénom, adresse email, établissement scolaire.</li>
                      <li className="py-1.5">Aucune donnée n&apos;est vendue ou transmise à des tiers à des fins commerciales.</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Finalités du traitement
                  </p>
                  <div className="bg-gray-900 rounded-xl p-4">
                    <ul className="divide-y divide-gray-800 text-gray-400">
                      <li className="py-1.5">Gestion des accès à la plateforme TechnoSchool.</li>
                      <li className="py-1.5">Suivi pédagogique et communication avec les apprenants.</li>
                      <li className="py-1.5">Amélioration des services proposés par LGC R&amp;D.</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Vos droits (RGPD)
                  </p>
                  <div className="bg-gray-900 rounded-xl p-4">
                    <ul className="divide-y divide-gray-800 text-gray-400">
                      <li className="py-1.5">Droit d&apos;accès, de rectification et d&apos;effacement de vos données.</li>
                      <li className="py-1.5">Droit d&apos;opposition et de limitation du traitement.</li>
                      <li className="py-1.5">
                        <span className="text-gray-500">Contact DPO</span>{" "}
                        <a href="mailto:contact@lgc-rd.fr" className="hover:text-white transition-colors">contact@lgc-rd.fr</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Conservation des données
                  </p>
                  <div className="bg-gray-900 rounded-xl p-4">
                    <ul className="divide-y divide-gray-800 text-gray-400">
                      <li className="py-1.5">Les données sont conservées pendant la durée de la relation pédagogique.</li>
                      <li className="py-1.5">Suppression dans un délai de 3 ans après la fin du parcours.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-800 flex justify-end">
              <button
                type="button"
                onClick={() => closePolicyModal()}
                className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
