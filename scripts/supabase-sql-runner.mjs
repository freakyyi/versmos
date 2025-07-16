import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function runSQL() {
  console.log('🚀 Creating Supabase tables via SQL...\n');
  
  // Read the SQL file
  const sqlPath = path.join(process.cwd(), 'supabase-complete-setup.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');
  
  // Extract project ref
  const projectRef = SUPABASE_URL.match(/https:\/\/(.+?)\.supabase\.co/)[1];
  
  console.log(`Project: ${projectRef}`);
  console.log('Attempting to execute SQL...\n');
  
  // Since direct SQL execution isn't available through the API,
  // let's create the tables using Supabase client in a different way
  
  // First, let's create a simple table creation script
  const simpleSQL = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables without foreign keys first
CREATE TABLE youtube_playlists (
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

CREATE TABLE youtube_videos (
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

CREATE TABLE case_studies (
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

CREATE TABLE services (
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

CREATE TABLE team_members (
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

CREATE TABLE client_testimonials (
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

CREATE TABLE client_logos (
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
`;

  // Save simplified SQL
  fs.writeFileSync('create-tables-simple.sql', simpleSQL);
  
  console.log('📄 Simplified SQL saved to: create-tables-simple.sql\n');
  
  // Show instructions
  console.log('📋 To create tables in Supabase:\n');
  console.log('METHOD 1 - Using Supabase Dashboard:');
  console.log('1. Go to: https://supabase.com/dashboard/project/ngxzbrajncyzjeisqpec/sql/new');
  console.log('2. Copy and paste the SQL from create-tables-simple.sql');
  console.log('3. Click "Run"\n');
  
  console.log('METHOD 2 - Using Supabase CLI:');
  console.log('1. Install Supabase CLI: npm install -g supabase');
  console.log('2. Login: supabase login');
  console.log('3. Link project: supabase link --project-ref ngxzbrajncyzjeisqpec');
  console.log('4. Run SQL: supabase db push create-tables-simple.sql\n');
  
  console.log('After creating tables, run: npm run import-youtube-data');
  
  // Try to open browser
  try {
    const { default: open } = await import('open');
    await open(`https://supabase.com/dashboard/project/${projectRef}/sql/new`);
    console.log('\n🌐 Opening Supabase SQL editor...');
  } catch (err) {
    // Ignore
  }
}

runSQL().catch(console.error);