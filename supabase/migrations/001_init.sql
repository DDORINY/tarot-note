create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text,
  created_at timestamptz not null default now()
);

create table if not exists public.tarot_cards (
  id text primary key,
  name_ko text not null,
  name_en text not null,
  arcana text not null,
  suit text,
  number int,
  upright_meaning text not null,
  reversed_meaning text not null,
  keywords text[] not null default '{}',
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.spreads (
  id text primary key,
  name text not null,
  description text not null,
  category text not null,
  card_count int not null,
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.spread_positions (
  id uuid primary key default gen_random_uuid(),
  spread_id text not null references public.spreads(id) on delete cascade,
  position_index int not null,
  label text not null,
  meaning text not null,
  x numeric not null,
  y numeric not null,
  rotation numeric not null default 0,
  z_index int not null default 1,
  unique (spread_id, position_index)
);

create table if not exists public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  spread_id text not null references public.spreads(id),
  category text not null,
  question text not null,
  result_summary text not null,
  advice text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reading_cards (
  id uuid primary key default gen_random_uuid(),
  reading_id uuid not null references public.readings(id) on delete cascade,
  position_index int not null,
  position_label text not null,
  position_meaning text not null,
  card_id text not null references public.tarot_cards(id),
  orientation text not null check (orientation in ('upright', 'reversed')),
  interpretation text not null
);

create table if not exists public.diary_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reading_id uuid references public.readings(id) on delete set null,
  emotion text,
  note text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.tarot_cards enable row level security;
alter table public.spreads enable row level security;
alter table public.spread_positions enable row level security;
alter table public.readings enable row level security;
alter table public.reading_cards enable row level security;
alter table public.diary_entries enable row level security;

create policy "public tarot card read" on public.tarot_cards for select using (true);
create policy "public spread read" on public.spreads for select using (true);
create policy "public spread position read" on public.spread_positions for select using (true);

create policy "profiles owner read" on public.profiles for select using (auth.uid() = id);
create policy "profiles owner insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles owner update" on public.profiles for update using (auth.uid() = id);

create policy "readings owner read" on public.readings for select using (auth.uid() = user_id);
create policy "readings authenticated insert" on public.readings for insert with check (auth.uid() = user_id and auth.role() = 'authenticated');

create policy "reading cards owner read" on public.reading_cards
  for select using (
    exists (
      select 1 from public.readings
      where readings.id = reading_cards.reading_id
        and readings.user_id = auth.uid()
    )
  );

create policy "reading cards owner insert" on public.reading_cards
  for insert with check (
    exists (
      select 1 from public.readings
      where readings.id = reading_cards.reading_id
        and readings.user_id = auth.uid()
    )
  );

create policy "diary owner read" on public.diary_entries for select using (auth.uid() = user_id);
create policy "diary owner insert" on public.diary_entries for insert with check (auth.uid() = user_id);
create policy "diary owner update" on public.diary_entries for update using (auth.uid() = user_id);
create policy "diary owner delete" on public.diary_entries for delete using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
