export type TeamMember = {
  name: string;
  role: string;
  image: string | null; // null = avatar à initiales
};

// Liste de secours : utilisée si Supabase est indisponible ou la table vide.
const FALLBACK_TEAM: TeamMember[] = [
  { name: "Ismaël Niang", role: "CEO La grande classe & R&D", image: null },
  { name: "William Mercier", role: "Chef de projet junior R&D", image: "/asset/willy.png" },
  { name: "Kevin Oudelet", role: "Ingénieur IA R&D", image: "/asset/kevin.png" },
  { name: "Giuseppe Militello", role: "CTO R&D", image: "/asset/gius.png" },
  { name: "Diae Bootia El Oumami", role: "Responsable Juridique à la Direction", image: "/asset/diae.png" },
  { name: "Anna Feugueur", role: "Responsable formation", image: "/asset/anna.png" },
  { name: "Sarah Benyoussef", role: "Chargée d'admission", image: "/asset/sarah.png" },
  { name: "Houda Boussekay", role: "Relations entreprises", image: null },
];

type TeamRow = { name: string; role: string; image_url: string | null };

// Lit les membres publiés depuis Supabase (côté serveur uniquement, service_role).
// Ne lève jamais d'exception : en cas d'échec, retourne la liste de secours.
export async function getTeamMembers(): Promise<TeamMember[]> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return FALLBACK_TEAM;

  try {
    const res = await fetch(
      `${url}/rest/v1/team_members?select=name,role,image_url&published=eq.true&order=position.asc`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) {
      console.error("Erreur Supabase (team) :", res.status, await res.text());
      return FALLBACK_TEAM;
    }
    const rows = (await res.json()) as TeamRow[];
    if (!Array.isArray(rows) || rows.length === 0) return FALLBACK_TEAM;
    return rows.map((r) => ({ name: r.name, role: r.role, image: r.image_url }));
  } catch (err) {
    console.error("Erreur Supabase (team) :", err);
    return FALLBACK_TEAM;
  }
}
