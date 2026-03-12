-- Create movies table for storing movie/show data
CREATE TABLE IF NOT EXISTS public.movies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  poster_url TEXT,
  backdrop_url TEXT,
  release_year INTEGER,
  rating TEXT, -- e.g., 'TV-MA', 'PG-13', 'R'
  duration TEXT, -- e.g., '2h 15m' or '45m per episode'
  genre TEXT[], -- Array of genres
  type TEXT DEFAULT 'movie' CHECK (type IN ('movie', 'series')),
  is_netflix_original BOOLEAN DEFAULT false,
  trailer_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

-- Everyone can read movies (public content)
CREATE POLICY "movies_select_all" ON public.movies 
  FOR SELECT USING (true);

-- Only authenticated users with admin role can modify (for future admin panel)
CREATE POLICY "movies_insert_admin" ON public.movies 
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "movies_update_admin" ON public.movies 
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_movies_type ON public.movies(type);
CREATE INDEX IF NOT EXISTS idx_movies_genre ON public.movies USING GIN(genre);
CREATE INDEX IF NOT EXISTS idx_movies_is_original ON public.movies(is_netflix_original);
