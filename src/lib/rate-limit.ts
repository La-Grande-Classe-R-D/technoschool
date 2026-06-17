type Entry = { count: number; resetAt: number };

// Store en mémoire par instance serverless — efficace contre le spam casual,
// complémentaire au honeypot/timing pour une protection en profondeur.
const store = new Map<string, Entry>();

// Nettoyage périodique pour éviter les fuites mémoire sur instances longues
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 60_000);

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}
