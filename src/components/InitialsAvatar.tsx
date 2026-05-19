// Génère un avatar avec initiales stylisées pour les membres sans photo.
// Usage : <InitialsAvatar name="Ismaël Niang" /> → cercle "IN" coloré.

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const PALETTE = [
  { bg: "#1e3a5f", fg: "#60a5fa" },
  { bg: "#1e1b4b", fg: "#818cf8" },
  { bg: "#2d1b4e", fg: "#c084fc" },
  { bg: "#0f2942", fg: "#38bdf8" },
  { bg: "#1a2e1a", fg: "#4ade80" },
  { bg: "#2d1b1b", fg: "#f87171" },
  { bg: "#2c1810", fg: "#fb923c" },
  { bg: "#1b2a2a", fg: "#2dd4bf" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type InitialsAvatarProps = {
  name: string;
  className?: string;
  style?: React.CSSProperties;
};

export function InitialsAvatar({ name, className, style }: InitialsAvatarProps) {
  const color = PALETTE[hashString(name) % PALETTE.length];
  const initials = getInitials(name);

  return (
    <div
      className={className}
      style={{
        background: color.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
        fontWeight: 700,
        color: color.fg,
        letterSpacing: "0.05em",
        userSelect: "none",
        borderRadius: "50%",
        ...style,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
