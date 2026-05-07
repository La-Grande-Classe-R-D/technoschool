import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://technoschool.lagrandeclasse.fr";

export const metadata: Metadata = {
  title: "TechnoSchool - LGC R&D",
  description:
    "TechnoSchool by LGC R&D — formations en développement web Full Stack (BTS SIO), Data & IA et Cybersécurité à Montreuil.",
  metadataBase: new URL(SITE_URL),
  icons: {
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  "@id": `${SITE_URL}/#organization`,
  name: "TechnoSchool — LGC Recherche & Développement",
  alternateName: "LGC R&D",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon/apple-touch-icon.png`,
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
  taxID: "882 626 229 00026",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "TechnoSchool — LGC R&D",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "fr-FR",
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
      <body>{children}</body>
    </html>
  );
}
