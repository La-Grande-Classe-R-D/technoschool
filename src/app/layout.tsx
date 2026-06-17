import type { Metadata } from "next";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

const SITE_URL = "https://technoschool.lagrandeclasse.fr";

export const metadata: Metadata = {
  title: "TechnoSchool - LGC R&D",
  description:
    "TechnoSchool by LGC R&D — formations en développement web Full Stack (BTS SIO), Data & IA et Cybersécurité à Montreuil.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    apple: [{ url: "/favicon/logo-lgc-TS.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon/logo-lgc-TS.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/logo-lgc-TS.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "TechnoSchool — LGC R&D",
    title: "TechnoSchool - LGC R&D",
    description:
      "Formations en développement web Full Stack (BTS SIO), Data & IA et Cybersécurité à Montreuil.",
    locale: "fr_FR",
    images: [
      {
        url: `${SITE_URL}/favicon/logo-lgc-TS.png`,
        width: 512,
        height: 512,
        alt: "TechnoSchool — LGC R&D · Formations numériques à Montreuil",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "TechnoSchool - LGC R&D",
    description:
      "Formations en développement web Full Stack (BTS SIO), Data & IA et Cybersécurité à Montreuil.",
    images: [`${SITE_URL}/favicon/logo-lgc-TS.png`],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  "@id": `${SITE_URL}/#organization`,
  name: "TechnoSchool - LGC Recherche & Développement",
  alternateName: "LGC R&D",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon/logo-lgc-TS.png`,
    width: 512,
    height: 512,
  },
  description:
    "Organisme de formation spécialisé dans le numérique : développement web Full Stack (BTS SIO SLAM), Data & IA et Cybersécurité, basé à Montreuil.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "51 rue Gaston Lauriau",
    addressLocality: "Montreuil",
    postalCode: "93100",
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33-1-40-10-27-22",
    contactType: "customer service",
    availableLanguage: "French",
    email: "contact@lgc-rd.fr",
  },
  sameAs: [
    "https://www.linkedin.com/company/lgc-rd",
    "https://www.facebook.com/lgcrd",
    "https://www.instagram.com/lgcrd",
  ],
  legalName: "LGC Recherche et Développement",
  identifier: {
    "@type": "PropertyValue",
    name: "SIRET",
    value: "882 626 229 00026",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "TechnoSchool - LGC R&D",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "fr-FR",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:outline-none focus:ring-2 focus:ring-[#5C6FFF]"
        >
          Aller au contenu principal
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
