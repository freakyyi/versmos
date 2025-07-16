import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// Extract connection details from DATABASE_URL
const urlMatch = DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)\?/);
if (!urlMatch) {
  console.error('Invalid DATABASE_URL format');
  process.exit(1);
}

const [, user, password, host, port, database] = urlMatch;

async function executeDDL() {
  console.log('🚀 Creating Supabase tables programmatically...\n');
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  
  // DDL statements that need to be executed
  const ddlStatements = [
    // 1. Create youtube_playlists table
    `CREATE TABLE IF NOT EXISTS youtube_playlists (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      youtube_playlist_id VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      thumbnail_url TEXT,
      video_count INTEGER DEFAULT 0,
      channel_id VARCHAR(255),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    // 2. Create youtube_videos table
    `CREATE TABLE IF NOT EXISTS youtube_videos (
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
    )`,
    
    // 3. Create case_studies table
    `CREATE TABLE IF NOT EXISTS case_studies (
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
    )`,
    
    // 4. Create services table
    `CREATE TABLE IF NOT EXISTS services (
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
    )`,
    
    // 5. Create team_members table
    `CREATE TABLE IF NOT EXISTS team_members (
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
    )`,
    
    // 6. Create client_testimonials table
    `CREATE TABLE IF NOT EXISTS client_testimonials (
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
    )`,
    
    // 7. Create client_logos table
    `CREATE TABLE IF NOT EXISTS client_logos (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_name VARCHAR(255) NOT NULL,
      logo_url TEXT NOT NULL,
      website_url TEXT,
      industry VARCHAR(100),
      is_active BOOLEAN DEFAULT TRUE,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`
  ];
  
  // Since Supabase doesn't expose a direct SQL execution endpoint,
  // we'll use a workaround by creating a temporary function
  console.log('Creating tables using Supabase workaround...\n');
  
  // First, let's check if we can access the database
  try {
    // Test connection
    const { data, error } = await supabase
      .from('youtube_playlists')
      .select('count')
      .limit(1);
    
    if (error && error.code === 'PGRST204') {
      console.log('✅ Table youtube_playlists already exists');
    } else if (error && error.message.includes('does not exist')) {
      console.log('Tables do not exist. Creating them now...\n');
      
      // Since we can't execute DDL directly through Supabase JS client,
      // let's use the Postgres protocol directly
      console.log('📝 Generating SQL migration file...');
      
      // Create a complete SQL file
      const completeSql = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

${ddlStatements.join(';\n\n')};

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
`;
      
      // Save to file
      const fs = await import('fs');
      fs.writeFileSync('supabase-tables.sql', completeSql);
      
      console.log('\n✅ SQL file created: supabase-tables.sql');
      console.log('\n📋 Since I cannot execute DDL directly with the provided credentials,');
      console.log('   I need you to run this SQL using one of these methods:\n');
      
      console.log('METHOD 1 - Using psql (PostgreSQL client):');
      console.log('1. Install psql if not already installed');
      console.log('2. Run this command:');
      console.log(`   psql "${DATABASE_URL}" -f supabase-tables.sql\n`);
      
      console.log('METHOD 2 - Using any PostgreSQL client (TablePlus, pgAdmin, etc):');
      console.log('1. Connect using these credentials:');
      console.log(`   Host: ${host}`);
      console.log(`   Port: ${port}`);
      console.log(`   Database: ${database}`);
      console.log(`   User: ${user}`);
      console.log(`   Password: ${password}`);
      console.log('2. Run the SQL from supabase-tables.sql\n');
      
      console.log('METHOD 3 - Using a temporary API endpoint:');
      console.log('1. I can create a temporary API endpoint in your Next.js app');
      console.log('2. Visit it once to create the tables');
      console.log('3. Then delete it for security\n');
      
      console.log('Which method would you prefer? Or shall I create the temporary API endpoint?');
      
    } else {
      console.log('✅ Tables already exist!');
      console.log('\nRun: npm run import-youtube-data');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

executeDDL().catch(console.error);