-- Create table for user's saved/favorite plants
CREATE TABLE public.saved_plants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plant_name TEXT NOT NULL,
  scientific_name TEXT,
  image_url TEXT,
  air_quality_benefit TEXT,
  sunlight TEXT,
  watering TEXT,
  pollution_resistance TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, plant_name)
);

-- Create table for user's search history
CREATE TABLE public.search_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  search_type TEXT NOT NULL, -- 'location', 'plant', 'recommendation'
  search_query TEXT,
  location TEXT,
  air_quality_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.saved_plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for saved_plants
CREATE POLICY "Users can view their own saved plants"
ON public.saved_plants FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can save their own plants"
ON public.saved_plants FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved plants"
ON public.saved_plants FOR DELETE
USING (auth.uid() = user_id);

-- RLS policies for search_history
CREATE POLICY "Users can view their own search history"
ON public.search_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own search history"
ON public.search_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own search history"
ON public.search_history FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_saved_plants_user_id ON public.saved_plants(user_id);
CREATE INDEX idx_search_history_user_id ON public.search_history(user_id);
CREATE INDEX idx_search_history_created_at ON public.search_history(created_at DESC);