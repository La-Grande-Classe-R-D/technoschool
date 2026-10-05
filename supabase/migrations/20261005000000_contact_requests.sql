create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null check (char_length(nom) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  telephone text not null check (char_length(telephone) between 6 and 20),
  formation text check (char_length(formation) <= 200),
  message text not null check (char_length(message) between 10 and 2000)
);

-- RLS activé sans policy : seul le service_role (côté serveur) peut lire/écrire.
alter table public.contact_requests enable row level security;
