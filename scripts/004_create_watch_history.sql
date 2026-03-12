-- Create watch history table for "Continue Watching" feature
CREATE TABLE IF NOT EXISTS public.watch_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  progress_seconds INTEGER DEFAULT 0, -- How far into the movie/show
  duration_seconds INTEGER, -- Total duration
  completed BOOLEAN DEFAULT false,
  last_watched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);

-- Enable RLS
ALTER TABLE public.watch_history ENABLE ROW LEVEL SECURITY;

-- Users can only see their own watch history
CREATE POLICY "watch_history_select_own" ON public.watch_history 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "watch_history_insert_own" ON public.watch_history 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "watch_history_update_own" ON public.watch_history 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "watch_history_delete_own" ON public.watch_history 
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_watch_history_user ON public.watch_history(user_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_last_watched ON public.watch_history(last_watched_at DESC);
