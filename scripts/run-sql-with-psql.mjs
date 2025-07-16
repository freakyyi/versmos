import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const execAsync = promisify(exec);

dotenv.config({ path: '.env.local' });

const DATABASE_URL = process.env.DATABASE_URL || "postgres://postgres.ngxzbrajncyzjeisqpec:DTuTifuupfSwIH6p@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require";

async function runSQL() {
  console.log('🚀 Creating Supabase tables using psql...\n');
  
  // Create SQL file
  const sqlContent = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS youtube_playlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_playlist_id VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  video_count INTEGER DEFAULT 0,
  channel_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
  published_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  tags TEXT[],
  position_in_playlist INTEGER,
  category VARCHAR(100),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_logos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  industry VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_youtube_videos_playlist ON youtube_videos(youtube_playlist_id);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_featured ON youtube_videos(is_featured);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_category ON youtube_videos(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

-- Enable RLS
ALTER TABLE youtube_playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY;

-- Create public read policies
CREATE POLICY "Allow public read" ON youtube_playlists FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON youtube_videos FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON case_studies FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON client_testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON client_logos FOR SELECT USING (true);

-- Verify tables
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
`;

  // Save SQL file
  const sqlPath = path.join(process.cwd(), 'create-all-tables.sql');
  fs.writeFileSync(sqlPath, sqlContent);
  console.log(`📄 SQL file created: ${sqlPath}\n`);

  // Run psql command
  console.log('🔧 Running psql...\n');
  
  try {
    const { stdout, stderr } = await execAsync(`psql "${DATABASE_URL}" -f "${sqlPath}"`);
    
    if (stdout) {
      console.log('✅ Output:\n', stdout);
    }
    
    if (stderr && !stderr.includes('NOTICE')) {
      console.error('⚠️  Warnings:\n', stderr);
    }
    
    console.log('\n🎉 Tables created successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run import-youtube-data');
    console.log('2. Run: npm run dev');
    console.log('3. Visit: http://localhost:3002');
    
  } catch (error) {
    console.error('❌ Error running psql:', error.message);
    console.log('\nYou can also run manually:');
    console.log(`psql "${DATABASE_URL}" -f create-all-tables.sql`);
  }
}

// Run the script
runSQL().catch(console.error);