import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const ALLOWED_ORIGINS = [
  "https://technoschool.lagrandeclasse.fr",
  "https://www.technoschool.lagrandeclasse.fr",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
];

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;

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
  // Vérification origine
  const origin = req.headers.get("origin") ?? "";
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ error: "Origine non autorisée" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Rate limiting — 20 messages par IP par minute
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (!rateLimit(`chat:${ip}`, 20, 60 * 1000)) {
    return new Response(JSON.stringify({ error: "Trop de messages. Veuillez patienter." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validation Content-Type
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Corps de requête invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let messages: unknown;
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response(JSON.stringify({ error: "Corps de requête invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validation structure messages
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Messages invalides" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (messages.length > MAX_MESSAGES) {
    return new Response(JSON.stringify({ error: "Historique trop long" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  for (const msg of messages) {
    if (
      typeof msg !== "object" ||
      msg === null ||
      !["user", "assistant"].includes((msg as Record<string, unknown>).role as string) ||
      typeof (msg as Record<string, unknown>).content !== "string" ||
      ((msg as Record<string, unknown>).content as string).length > MAX_MESSAGE_LENGTH
    ) {
      return new Response(JSON.stringify({ error: "Format de message invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

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
