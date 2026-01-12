-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: algorithms
create table if not exists algorithms (
  id bigint primary key,
  name text not null,
  slug text not null unique,
  description text,
  category text,
  domain text,
  domain_id integer,
  difficulty text,
  paradigm text,
  tags text[],
  time_complexity jsonb,
  space_complexity text,
  implementation text,
  pseudocode text,
  intuition text,
  visualization_type text,
  applications text[],
  advantages text[],
  disadvantages text[],
  related_algorithms text[],
  use_cases text[],
  real_world_examples text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for searching algorithms
create index if not exists idx_algorithms_slug on algorithms(slug);
create index if not exists idx_algorithms_domain_id on algorithms(domain_id);

-- Table: user_profiles
create table if not exists user_profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: user_favorites (Likes)
create table if not exists user_favorites (
  user_id uuid references auth.users on delete cascade,
  algo_slug text references algorithms(slug) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, algo_slug)
);

-- Table: user_progress (Completion)
create table if not exists user_progress (
  user_id uuid references auth.users on delete cascade,
  algo_slug text references algorithms(slug) on delete cascade,
  status text check (status in ('started', 'completed')),
  completed_at timestamp with time zone,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, algo_slug)
);

-- Set up Row Level Security (RLS)
alter table algorithms enable row level security;
alter table user_profiles enable row level security;
alter table user_favorites enable row level security;
alter table user_progress enable row level security;

-- Policies
create policy "Algorithms are viewable by everyone" on algorithms for select using (true);

create policy "Users can view their own profile" on user_profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on user_profiles for update using (auth.uid() = id);

create policy "Users can view their own favorites" on user_favorites for select using (auth.uid() = user_id);
create policy "Users can manage their own favorites" on user_favorites for all using (auth.uid() = user_id);

create policy "Users can view their own progress" on user_progress for select using (auth.uid() = user_id);
create policy "Users can manage their own progress" on user_progress for all using (auth.uid() = user_id);

-- Trigger for user profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
