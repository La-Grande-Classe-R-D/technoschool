type ContactRequest = {
  nom: string;
  email: string;
  telephone: string;
  formation?: string;
  message: string;
};

// Enregistre la demande de contact dans Supabase (côté serveur uniquement, service_role).
// Ne lève jamais d'exception : l'envoi du mail reste prioritaire.
export async function saveContactRequest(data: ContactRequest): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;

  try {
    const res = await fetch(`${url}/rest/v1/contact_requests`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ ...data, formation: data.formation || null }),
    });
    if (!res.ok) console.error("Erreur Supabase :", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("Erreur Supabase :", err);
    return false;
  }
}
