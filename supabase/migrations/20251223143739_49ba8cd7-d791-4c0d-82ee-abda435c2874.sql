-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own profile, not enumerate others
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Profiles: users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Profiles: users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create climaxes table
CREATE TABLE public.climaxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_slug TEXT NOT NULL,
  movie_title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on climaxes
ALTER TABLE public.climaxes ENABLE ROW LEVEL SECURITY;

-- Climaxes: anyone can read
CREATE POLICY "Anyone can read climaxes"
ON public.climaxes FOR SELECT
USING (true);

-- Climaxes: authenticated users can create their own
CREATE POLICY "Authenticated users can create climaxes"
ON public.climaxes FOR INSERT
WITH CHECK (auth.uid() = author_id);

-- Climaxes: users can update their own
CREATE POLICY "Users can update own climaxes"
ON public.climaxes FOR UPDATE
USING (auth.uid() = author_id);

-- Climaxes: users can delete their own
CREATE POLICY "Users can delete own climaxes"
ON public.climaxes FOR DELETE
USING (auth.uid() = author_id);

-- Create votes table (one vote per user per climax)
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  climax_id UUID NOT NULL REFERENCES public.climaxes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(climax_id, user_id)
);

-- Enable RLS on votes
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Votes: anyone can read (for counting)
CREATE POLICY "Anyone can read votes"
ON public.votes FOR SELECT
USING (true);

-- Votes: authenticated users can vote
CREATE POLICY "Authenticated users can vote"
ON public.votes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Votes: users can remove their own vote
CREATE POLICY "Users can remove own votes"
ON public.votes FOR DELETE
USING (auth.uid() = user_id);

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  RETURN new;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create index for faster climax queries
CREATE INDEX idx_climaxes_movie_slug ON public.climaxes(movie_slug);
CREATE INDEX idx_climaxes_author_id ON public.climaxes(author_id);
CREATE INDEX idx_votes_climax_id ON public.votes(climax_id);