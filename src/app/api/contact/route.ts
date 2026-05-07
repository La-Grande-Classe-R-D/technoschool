import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const MIN_FILL_MS = 3000; // temps minimum humain pour remplir le formulaire

const contactSchema = z.object({
  nom: z.string().min(2, "Nom trop court").max(100, "Nom trop long"),
  email: z.string().email("Email invalide").max(254, "Email trop long"),
  telephone: z
    .string()
    .min(6, "Téléphone invalide")
    .max(20, "Téléphone trop long")
    .regex(/^[\d\s+\-(). ]+$/, "Format de téléphone invalide"),
  formation: z.string().max(200, "Formation invalide").optional(),
  message: z
    .string()
    .min(10, "Message trop court (10 caractères minimum)")
    .max(2000, "Message trop long (2000 caractères maximum)"),
  _url: z.string().max(0).optional(),   // honeypot — nom anodin pour tromper les bots
  _t: z.string().optional(),            // timestamp d'ouverture du formulaire
});

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function buildHtml(
  nom: string,
  email: string,
  telephone: string,
  formation: string,
  message: string,
): string {
  const safeNom = esc(nom);
  const safeEmail = esc(email);
  const safeTel = esc(telephone);
  const safeFormation = esc(formation || "Non précisée");
  const safeMessage = esc(message).replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau contact — TechnoSchool LGC</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;color:#e5e7eb">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:linear-gradient(135deg,#111827,#030712);border:1px solid rgba(92,111,255,0.35);border-radius:16px;overflow:hidden">
          <!-- Header -->
          <tr>
            <td style="padding:28px 32px;background:linear-gradient(135deg,rgba(92,111,255,0.25),rgba(173,107,255,0.22));border-bottom:1px solid rgba(173,107,255,0.2)">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#ad6bff">TechnoSchool — LGC R&amp;D</p>
              <h1 style="margin:6px 0 0;font-size:22px;font-weight:600;color:#fff">Nouveau message de contact</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px">
              <!-- Fields -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Nom complet</p>
                    <p style="margin:0;font-size:16px;color:#f9fafb;font-weight:500">${safeNom}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Email</p>
                    <p style="margin:0;font-size:16px;color:#818cf8">${safeEmail}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Téléphone</p>
                    <p style="margin:0;font-size:16px;color:#f9fafb">${safeTel}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Formation souhaitée</p>
                    <p style="margin:0;font-size:16px;color:#a78bfa;font-weight:500">${safeFormation}</p>
                  </td>
                </tr>
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.06);padding-top:20px">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Message</p>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;font-size:15px;line-height:1.7;color:#d1d5db">${safeMessage}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background:rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.06)">
              <p style="margin:0;font-size:12px;color:#4b5563">
                Ce message a été envoyé depuis le formulaire de contact de
                <a href="https://technoschool-lgc.fr" style="color:#6366f1;text-decoration:none">technoschool-lgc.fr</a>.
                Répondre directement à cet email contactera <strong style="color:#e5e7eb">${safeEmail}</strong>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(
  nom: string,
  email: string,
  telephone: string,
  formation: string,
  message: string,
): string {
  return [
    "=== NOUVEAU CONTACT — TECHNOSCHOOL LGC ===",
    "",
    `Nom        : ${nom}`,
    `Email      : ${email}`,
    `Téléphone  : ${telephone}`,
    `Formation  : ${formation || "Non précisée"}`,
    "",
    "--- Message ---",
    message,
    "",
    "---",
    "Envoyé depuis le formulaire de contact de technoschool-lgc.fr",
    `Répondre à cet email contactera directement : ${email}`,
  ].join("\n");
}

export async function POST(req: NextRequest) {
  // Validation Content-Type
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Corps de requête invalide" },
      { status: 400 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide" },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // Honeypot (_url) — si rempli = bot, réponse silencieuse
  if (data._url) {
    return NextResponse.json({ success: true });
  }

  // Vérification timing — un humain met au moins 3 secondes
  const ts = Number(data._t);
  if (!ts || Date.now() - ts < MIN_FILL_MS) {
    return NextResponse.json({ success: true }); // silencieux pour ne pas informer le bot
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données de formulaire invalides" }, { status: 400 });
  }

  const { nom, email, telephone, formation, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from =
    process.env.CONTACT_EMAIL_FROM ??
    "TechnoSchool LGC <noreply@technoschool-lgc.fr>";

  if (!apiKey || !to) {
    console.error(
      "Variables d'environnement manquantes : RESEND_API_KEY ou CONTACT_EMAIL_TO",
    );
    return NextResponse.json(
      { error: "Service d'envoi temporairement indisponible" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Nouveau contact — ${nom}`,
    html: buildHtml(nom, email, telephone, formation ?? "", message),
    text: buildText(nom, email, telephone, formation ?? "", message),
  });

  if (error) {
    console.error("Erreur Resend :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
