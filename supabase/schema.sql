-- Create the users (signups) table
create table public.signups (
  id          uuid        default gen_random_uuid() primary key,
  first_name  text        not null,
  last_name   text        not null,
  email       text        not null,
  top_pathway text,
  created_at  timestamptz default now()
);

alter table public.signups enable row level security;

-- Allow anyone to insert (public signup form)
create policy "Anyone can sign up"
  on public.signups for insert
  with check (true);

-- ─────────────────────────────────────────────────────────────────────────────

-- Create the resources table
create table public.resources (
  id          uuid        default gen_random_uuid() primary key,
  title       text        not null,
  description text        not null,
  pathway     text        not null check (pathway in ('tech', 'business', 'creative', 'health', 'social')),
  type        text        not null check (type in ('program', 'course', 'mentorship', 'community', 'guide')),
  url         text        not null,
  cost        text        not null default 'Free',
  tags        text[]      default '{}',
  created_at  timestamptz default now()
);

-- Enable row-level security
alter table public.resources enable row level security;

-- Anyone can read resources (no login required)
create policy "Public can read resources"
  on public.resources for select
  using (true);

-- ─── Sample seed data ──────────────────────────────────────────────────────

insert into public.resources (title, description, pathway, type, url, cost, tags) values
  ('Google Career Certificates', 'Job-ready certificates in tech fields like IT support, data analytics, UX design, and cybersecurity. No degree required.', 'tech', 'course', 'https://grow.google/certificates/', 'Free / Subsidised', ARRAY['beginner', 'certificate', 'google']),
  ('Girls Who Code', 'Free coding programs and clubs for girls in middle and high school. Includes summer immersion and college loops.', 'tech', 'program', 'https://girlswhocode.com', 'Free', ARRAY['coding', 'community', 'beginner']),
  ('She Leads Africa', 'Community and resources for young African women who want to build businesses and careers in Africa.', 'business', 'community', 'https://sheleadsafrica.org', 'Free', ARRAY['africa', 'entrepreneurship', 'network']),
  ('Coursera Financial Aid', 'Apply for financial aid on thousands of Coursera courses including business, marketing, and finance.', 'business', 'course', 'https://www.coursera.org/financial-aid', 'Free (with aid)', ARRAY['finance', 'marketing', 'flexible']),
  ('Canva Design School', 'Free design courses covering visual communication, social media design, and brand identity.', 'creative', 'course', 'https://www.canva.com/learn/design-school/', 'Free', ARRAY['design', 'visual', 'beginner']),
  ('Adobe Creative Residency', 'Paid residency program for emerging creatives. Adobe funds your creative project for a year.', 'creative', 'program', 'https://adobe.com/creativeresidency', 'Paid (stipend)', ARRAY['paid', 'residency', 'portfolio']),
  ('WHO Health Workforce', 'Global health resources, training, and open-access courses from the World Health Organization.', 'health', 'guide', 'https://www.who.int/health-topics/health-workforce', 'Free', ARRAY['global', 'public health', 'who']),
  ('Coursera Public Health', 'Public health courses from Johns Hopkins, Michigan, and other universities — many fully free.', 'health', 'course', 'https://www.coursera.org/browse/health', 'Free / Paid', ARRAY['public health', 'research', 'university']),
  ('UN Women Youth', 'Fellowships, advocacy training, and leadership programs for young women working in social change.', 'social', 'program', 'https://www.unwomen.org/en/partnerships/youth', 'Free', ARRAY['un', 'advocacy', 'fellowship']);
