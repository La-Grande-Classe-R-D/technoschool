import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité — TechnoSchool LGC R&D",
  description:
    "Déclaration de conformité RGAA 4.1 de TechnoSchool, service numérique édité par LGC Recherche & Développement.",
};

export default function AccessibilitePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050508",
        color: "#e5e7eb",
        padding: "3rem 1.5rem 5rem",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Retour */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.875rem",
            color: "#9ca3af",
            textDecoration: "none",
            marginBottom: "2.5rem",
          }}
        >
          ← Retour à l'accueil
        </Link>

        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #5C6FFF, #AD6BFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Déclaration d'accessibilité
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
          Établie le <strong style={{ color: "#9ca3af" }}>[DATE_DECLARATION]</strong> — à compléter après audit formel.
        </p>

        <Section title="Engagement">
          <p>
            LGC Recherche &amp; Développement s'engage à rendre son service numérique{" "}
            <strong>TechnoSchool</strong> (
            <a href="https://technoschool.lagrandeclasse.fr" style={linkStyle}>
              technoschool.lagrandeclasse.fr
            </a>
            ) accessible, conformément à l'article 47 de la loi n°&nbsp;2005-102 du 11&nbsp;février 2005 et au
            décret n°&nbsp;2019-768 du 24&nbsp;juillet 2019.
          </p>
        </Section>

        <Section title="État de conformité">
          <p>
            Le site <strong>TechnoSchool</strong> est en conformité{" "}
            <Tag>partielle</Tag> avec le Référentiel Général d'Amélioration de
            l'Accessibilité (RGAA) version 4.1.
          </p>
          <InfoBox>
            Une auto-évaluation a été réalisée en interne. Un audit formel par un
            organisme accrédité est prévu. Les résultats seront publiés ici dès
            qu'ils seront disponibles.
          </InfoBox>
          <Row label="Taux de conformité estimé" value="[X]% — à compléter après audit" />
          <Row label="Référentiel utilisé" value="RGAA 4.1" />
          <Row label="Date du dernier audit" value="[DATE_AUDIT] — à compléter" />
        </Section>

        <Section title="Contenus non accessibles">
          <p style={{ color: "#9ca3af", marginBottom: "1rem" }}>
            Les contenus suivants sont identifiés comme non conformes ou à améliorer.
            Cette liste sera mise à jour après audit formel.
          </p>
          <ul style={listStyle}>
            <li>Certaines images décoratives peuvent manquer d'alternative textuelle vide.</li>
            <li>
              La navigation au clavier dans les modales est partiellement implémentée
              (focus trap en place, mais certains éléments dynamiques peuvent être manqués).
            </li>
            <li>
              Les animations de compteurs (section statistiques) ne sont pas réductibles
              via <code style={codeStyle}>prefers-reduced-motion</code>.
            </li>
            <li>
              Certains contrastes dans les éléments d'interface secondaires (placeholders)
              peuvent être inférieurs au ratio AA.
            </li>
            <li>
              [À compléter après audit RGAA formel]
            </li>
          </ul>
        </Section>

        <Section title="Mesures prises par LGC R&D">
          <ul style={listStyle}>
            <li>Navigation entièrement clavier dans les modales (focus trap, touche Échap).</li>
            <li>Labels ARIA sur tous les éléments interactifs principaux.</li>
            <li>Contrastes de couleurs conformes au niveau AA sur les textes principaux.</li>
            <li>Bannière de consentement cookies accessible au clavier.</li>
            <li>Structure sémantique HTML (titres hiérarchisés, landmarks).</li>
          </ul>
        </Section>

        <Section title="Retour d'information et contact">
          <p style={{ marginBottom: "1rem" }}>
            Si vous rencontrez un défaut d'accessibilité qui vous empêche d'accéder à un
            contenu ou à une fonctionnalité, vous pouvez nous contacter :
          </p>
          <Row label="Email" value="contact@lgc-rd.fr" isLink="mailto:contact@lgc-rd.fr" />
          <Row label="Téléphone" value="01 40 10 27 22" />
          <Row label="Adresse postale" value="51 rue Gaston Lauriau, 93100 Montreuil" />
          <p style={{ marginTop: "1rem", color: "#9ca3af", fontSize: "0.875rem" }}>
            Nous nous engageons à accuser réception de votre demande sous <strong>5 jours ouvrés</strong> et
            à vous fournir une réponse ou une solution alternative sous <strong>20 jours ouvrés</strong>.
          </p>
        </Section>

        <Section title="Voies de recours">
          <p style={{ marginBottom: "1rem" }}>
            Si vous ne recevez pas de réponse dans ces délais, ou si la réponse ne vous satisfait pas,
            vous pouvez saisir :
          </p>
          <ul style={listStyle}>
            <li>
              <strong>Le Défenseur des droits</strong> :{" "}
              <a href="https://www.defenseurdesdroits.fr" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                defenseurdesdroits.fr
              </a>{" "}
              ou par courrier : Défenseur des droits, libre réponse 71120, 75342 Paris Cedex 07.
            </li>
            <li>
              <strong>Le délégué du Défenseur des droits</strong> dans votre région.
            </li>
            <li>
              <strong>La Direction interministérielle du numérique (DINUM)</strong> :{" "}
              <a href="https://www.numerique.gouv.fr/contact/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                numerique.gouv.fr/contact
              </a>
            </li>
          </ul>
        </Section>

        <Section title="Historique des mises à jour">
          <Row label="Déclaration établie le" value="[DATE_DECLARATION] — à compléter" />
          <Row label="Dernière révision" value="[DATE_REVISION] — à compléter" />
        </Section>

        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #1f2937" }}>
          <Link href="/" style={{ color: "#6b7280", fontSize: "0.875rem", textDecoration: "none" }}>
            ← Retour à l'accueil TechnoSchool
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ── Sous-composants internes ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontSize: "1.15rem",
          fontWeight: 600,
          color: "#f3f4f6",
          borderLeft: "3px solid #5C6FFF",
          paddingLeft: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h2>
      <div style={{ color: "#9ca3af", lineHeight: 1.7 }}>{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
  isLink,
}: {
  label: string;
  value: string;
  isLink?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        padding: "0.625rem 0.875rem",
        borderRadius: "0.5rem",
        background: "#0d0d14",
        marginBottom: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      <span style={{ color: "#6b7280", minWidth: 180, flexShrink: 0 }}>{label}</span>
      {isLink ? (
        <a href={isLink} style={linkStyle}>
          {value}
        </a>
      ) : (
        <span style={{ color: "#e5e7eb" }}>{value}</span>
      )}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.15rem 0.6rem",
        borderRadius: 9999,
        background: "rgba(92,111,255,0.15)",
        border: "1px solid rgba(92,111,255,0.4)",
        color: "#818cf8",
        fontSize: "0.875rem",
        fontWeight: 600,
        verticalAlign: "middle",
      }}
    >
      {children}
    </span>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(92,111,255,0.07)",
        border: "1px solid rgba(92,111,255,0.2)",
        borderRadius: "0.75rem",
        padding: "0.875rem 1rem",
        color: "#9ca3af",
        fontSize: "0.875rem",
        lineHeight: 1.6,
        marginTop: "0.75rem",
        marginBottom: "1rem",
      }}
    >
      {children}
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  color: "#818cf8",
  textDecoration: "underline",
  textUnderlineOffset: 3,
};

const listStyle: React.CSSProperties = {
  paddingLeft: "1.25rem",
  lineHeight: 1.8,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const codeStyle: React.CSSProperties = {
  background: "#1f2937",
  padding: "0.1rem 0.4rem",
  borderRadius: 4,
  fontSize: "0.8rem",
  color: "#d1d5db",
};
