create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  role text not null check (char_length(role) between 2 and 150),
  -- Chemin public (/asset/xxx.png) ou URL ; null = avatar à initiales.
  image_url text check (char_length(image_url) <= 500),
  position integer not null default 0,
  published boolean not null default true
);

create index if not exists team_members_position_idx
  on public.team_members (position);

-- RLS activé sans policy : lecture/écriture réservées au service_role (côté serveur).
-- Le futur backoffice ajoutera ses propres policies (utilisateurs authentifiés).
alter table public.team_members enable row level security;

insert into public.team_members (name, role, image_url, position) values
  ('Ismaël Niang',          'CEO La grande classe & R&D',           null,              1),
  ('William Mercier',       'Chef de projet junior R&D',            '/asset/willy.png', 2),
  ('Kevin Oudelet',         'Ingénieur IA R&D',                     '/asset/kevin.png', 3),
  ('Giuseppe Militello',    'CTO R&D',                              '/asset/gius.png',  4),
  ('Diae Bootia El Oumami', 'Responsable Juridique à la Direction', '/asset/diae.png',  5),
  ('Anna Feugueur',         'Responsable formation',                '/asset/anna.png',  6),
  ('Sarah Benyoussef',      'Chargée d''admission',                 '/asset/sarah.png', 7),
  ('Houda Boussekay',       'Relations entreprises',                null,              8);
