-- Supabase Schema for YouTube Videos and Case Studies

-- YouTube Playlists table
CREATE TABLE youtube_playlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_playlist_id VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  item_count INTEGER DEFAULT 0,
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- YouTube Videos table
CREATE TABLE youtube_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_video_id VARCHAR(255) UNIQUE NOT NULL,
  playlist_id UUID REFERENCES youtube_playlists(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_default TEXT,
  thumbnail_medium TEXT,
  thumbnail_high TEXT,
  thumbnail_maxres TEXT,
  duration VARCHAR(20),
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Video Categories table
CREATE TABLE video_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7),
  parent_id UUID REFERENCES video_categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Case Studies table
CREATE TABLE case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES youtube_videos(id) ON DELETE CASCADE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  hero_image TEXT,
  thumbnail_card TEXT,
  thumbnail_social TEXT,
  
  -- Client information
  client_name VARCHAR(255),
  client_logo TEXT,
  client_testimonial TEXT,
  client_testimonial_author VARCHAR(255),
  client_testimonial_role VARCHAR(255),
  
  -- Content sections
  challenge TEXT,
  approach TEXT,
  technical_details TEXT,
  results TEXT,
  key_takeaways TEXT[],
  
  -- Metrics
  metric_views VARCHAR(50),
  metric_engagement VARCHAR(50),
  metric_conversion VARCHAR(50),
  custom_metrics JSONB,
  
  -- SEO
  primary_keyword VARCHAR(255),
  secondary_keywords TEXT[],
  long_tail_keywords TEXT[],
  
  -- Relations
  related_services TEXT[],
  related_case_studies UUID[],
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SEO Content table for dynamic pages
CREATE TABLE seo_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type VARCHAR(50) NOT NULL, -- home, portfolio, service, case-study
  page_identifier VARCHAR(255), -- could be slug, category, etc.
  title VARCHAR(255),
  meta_title VARCHAR(255),
  meta_description TEXT,
  h1_heading VARCHAR(255),
  intro_text TEXT,
  body_content TEXT,
  schema_markup JSONB,
  og_title VARCHAR(255),
  og_description TEXT,
  og_image TEXT,
  twitter_card VARCHAR(50) DEFAULT 'summary_large_image',
  canonical_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_youtube_videos_playlist_id ON youtube_videos(playlist_id);
CREATE INDEX idx_youtube_videos_is_featured ON youtube_videos(is_featured);
CREATE INDEX idx_case_studies_video_id ON case_studies(video_id);
CREATE INDEX idx_case_studies_slug ON case_studies(slug);
CREATE INDEX idx_case_studies_status ON case_studies(status);
CREATE INDEX idx_case_studies_is_featured ON case_studies(is_featured);
CREATE INDEX idx_seo_content_page_type ON seo_content(page_type);
CREATE INDEX idx_seo_content_page_identifier ON seo_content(page_identifier);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_youtube_playlists_updated_at BEFORE UPDATE ON youtube_playlists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_youtube_videos_updated_at BEFORE UPDATE ON youtube_videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_content_updated_at BEFORE UPDATE ON seo_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE youtube_playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_content ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON youtube_playlists FOR SELECT USING (true);
CREATE POLICY "Public read access" ON youtube_videos FOR SELECT USING (true);
CREATE POLICY "Public read access" ON video_categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON case_studies FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access" ON seo_content FOR SELECT USING (true);

-- Sample data for video categories
INSERT INTO video_categories (name, slug, description, icon, color, display_order) VALUES
  ('Product Videos', 'product-videos', 'Professional product launch and demonstration videos', '🎬', '#25A3AB', 1),
  ('Motion Graphics', 'motion-graphics', '2D/3D animations and motion design projects', '✨', '#5A636A', 2),
  ('VFX & Compositing', 'vfx-compositing', 'Visual effects and post-production work', '🎨', '#2D4A53', 3),
  ('Social Media', 'social-media', 'Short-form content optimized for social platforms', '📱', '#69818D', 4),
  ('Testimonials', 'testimonials', 'Client testimonials and success stories', '💬', '#132E35', 5),
  ('Real Estate', 'real-estate', 'Property tours and real estate marketing', '🏠', '#0D1F23', 6);