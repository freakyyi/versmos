
-- YouTube Playlists table
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

-- YouTube Videos table
CREATE TABLE IF NOT EXISTS youtube_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_video_id VARCHAR(255) UNIQUE NOT NULL,
  youtube_playlist_id VARCHAR(255) REFERENCES youtube_playlists(youtube_playlist_id) ON DELETE CASCADE,
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

-- Case Studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id VARCHAR(255) UNIQUE REFERENCES youtube_videos(youtube_video_id) ON DELETE CASCADE,
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

-- Services table
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

-- Team Members table
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

-- Client Testimonials table
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

-- Client Logos table
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

-- Create indexes for better performance
CREATE INDEX idx_youtube_videos_playlist ON youtube_videos(youtube_playlist_id);
CREATE INDEX idx_youtube_videos_featured ON youtube_videos(is_featured);
CREATE INDEX idx_youtube_videos_category ON youtube_videos(category);
CREATE INDEX idx_case_studies_featured ON case_studies(is_featured);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_slug ON services(slug);
