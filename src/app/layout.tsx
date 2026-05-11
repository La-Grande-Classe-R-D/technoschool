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
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
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
        url: `${SITE_URL}/favicon/android-chrome-512x512.png`,
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
    images: [`${SITE_URL}/favicon/android-chrome-512x512.png`],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  "@id": `${SITE_URL}/#organization`,
  name: "TechnoSchool — LGC Recherche & Développement",
  alternateName: "LGC R&D",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon/apple-touch-icon.png`,
    width: 180,
    height: 180,
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
  name: "TechnoSchool — LGC R&D",
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
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
