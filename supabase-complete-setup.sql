-- Versmos Supabase Database Setup
-- Run this entire script in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if needed (uncomment if you want to reset)
-- DROP TABLE IF EXISTS case_studies CASCADE;
-- DROP TABLE IF EXISTS youtube_videos CASCADE;
-- DROP TABLE IF EXISTS youtube_playlists CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;
-- DROP TABLE IF EXISTS team_members CASCADE;
-- DROP TABLE IF EXISTS client_testimonials CASCADE;
-- DROP TABLE IF EXISTS client_logos CASCADE;

-- Create YouTube Playlists table
CREATE TABLE IF NOT EXISTS youtube_playlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_playlist_id VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  video_count INTEGER DEFAULT 0,
  channel_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create YouTube Videos table
CREATE TABLE IF NOT EXISTS youtube_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_video_id VARCHAR(255) UNIQUE NOT NULL,
  youtube_playlist_id VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_default TEXT,
  thumbnail_medium TEXT,
  thumbnail_high TEXT,
  thumbnail_maxres TEXT,
  duration_seconds INTEGER,
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  tags TEXT[],
  position_in_playlist INTEGER,
  category VARCHAR(100),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Case Studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id VARCHAR(255) UNIQUE,
  client_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  challenge TEXT,
  solution TEXT,
  results JSONB,
  testimonial JSONB,
  technologies TEXT[],
  deliverables TEXT[],
  timeline VARCHAR(100),
  keywords TEXT[],
  search_volume INTEGER,
  difficulty VARCHAR(50),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  features TEXT[],
  price_range VARCHAR(100),
  turnaround_time VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Team Members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  skills TEXT[],
  years_experience INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Client Testimonials table
CREATE TABLE IF NOT EXISTS client_testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_title VARCHAR(255),
  client_company VARCHAR(255),
  client_photo_url TEXT,
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  project_type VARCHAR(100),
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Client Logos table
CREATE TABLE IF NOT EXISTS client_logos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  industry VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraints
ALTER TABLE youtube_videos 
ADD CONSTRAINT fk_youtube_videos_playlist 
FOREIGN KEY (youtube_playlist_id) 
REFERENCES youtube_playlists(youtube_playlist_id) 
ON DELETE CASCADE;

ALTER TABLE case_studies
ADD CONSTRAINT fk_case_studies_video
FOREIGN KEY (video_id)
REFERENCES youtube_videos(youtube_video_id)
ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_youtube_videos_playlist ON youtube_videos(youtube_playlist_id);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_featured ON youtube_videos(is_featured);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_category ON youtube_videos(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE youtube_playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON youtube_playlists FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON youtube_videos FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON case_studies FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON client_testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON client_logos FOR SELECT USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_youtube_playlists_updated_at BEFORE UPDATE ON youtube_playlists
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_youtube_videos_updated_at BEFORE UPDATE ON youtube_videos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_testimonials_updated_at BEFORE UPDATE ON client_testimonials
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_logos_updated_at BEFORE UPDATE ON client_logos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'youtube_playlists',
  'youtube_videos',
  'case_studies',
  'services',
  'team_members',
  'client_testimonials',
  'client_logos'
)
ORDER BY table_name;