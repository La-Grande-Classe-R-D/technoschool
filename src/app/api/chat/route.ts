import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de La Grande Classe (LGC) Recherche & Développement, une entreprise SAS implantée au 51 rue Gaston Lauriau, 93100 Montreuil (SIRET 882 626 229 00026, code APE 72.19Z).

Ton rôle est d'aider les étudiants en BTS SIO (Services Informatiques aux Organisations) à comprendre :
- Le fonctionnement et les activités de LGC R&D
- Les deux options du BTS SIO : SLAM (Solutions Logicielles et Applications Métiers) et SISR (Solutions d'Infrastructure, Systèmes et Réseaux)
- Les débouchés professionnels après un BTS SIO
- Les projets et formations proposés par LGC dans le domaine du numérique
- L'alternance et les stages possibles au sein de LGC
- Les technologies enseignées (développement web, réseaux, bases de données, cybersécurité…)

Règles :
- Réponds toujours en français, de façon claire, pédagogique et bienveillante.
- Sois concis : 2 à 4 phrases maximum sauf si l'utilisateur demande un développement.
- Si tu ne sais pas, invite l'utilisateur à contacter LGC directement : 01 40 10 27 22 ou contact@lgc-rd.fr.
- Ne réponds pas aux questions sans rapport avec LGC ou le BTS SIO.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey || apiKey === "your_deepseek_api_key_here") {
    return new Response(
      JSON.stringify({ error: "Clé API DeepSeek manquante dans .env.local" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const upstream = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      max_tokens: 512,
      temperature: 0.5,
    }),
  });

  if (!upstream.ok) {
    const err = await upstream.text();
    return new Response(err, { status: upstream.status });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
