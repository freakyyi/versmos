import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Function to execute SQL statements one by one
async function executeSQLStatements() {
  console.log('🚀 Creating Supabase tables directly...\n');

  // Individual CREATE TABLE statements
  const statements = [
    // Enable UUID extension
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
    
    // YouTube Playlists
    `CREATE TABLE IF NOT EXISTS youtube_playlists (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      youtube_playlist_id VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      thumbnail_url TEXT,
      video_count INTEGER DEFAULT 0,
      channel_id VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    
    // YouTube Videos
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
    )`,
    
    // Case Studies
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
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    
    // Services
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
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    
    // Team Members
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
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    
    // Client Testimonials
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
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    
    // Client Logos
    `CREATE TABLE IF NOT EXISTS client_logos (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_name VARCHAR(255) NOT NULL,
      logo_url TEXT NOT NULL,
      website_url TEXT,
      industry VARCHAR(100),
      is_active BOOLEAN DEFAULT TRUE,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`
  ];

  // Try to execute through Supabase's query endpoint
  const projectRef = supabaseUrl.match(/https:\/\/(.+?)\.supabase\.co/)[1];
  
  // First, let's try to use the Supabase client to check if we can access the database
  console.log('Testing database connection...');
  
  try {
    // Test query
    const { data, error } = await supabase
      .from('youtube_playlists')
      .select('count')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.log('Tables do not exist yet. Creating them...\n');
      
      // Since we can't execute DDL through the client, we'll need to use a different approach
      // Let's create a Node.js PostgreSQL connection
      console.log('Installing pg package for direct PostgreSQL connection...');
      
      // Create a setup file that uses pg
      const pgSetupScript = `
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const DATABASE_URL = process.env.DATABASE_URL;

async function setupTables() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Read and execute the SQL file
    const sql = \`${statements.join(';\n\n')};\`;
    
    await client.query(sql);
    console.log('✅ Tables created successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

setupTables();
`;

      fs.writeFileSync('scripts/pg-setup.mjs', pgSetupScript);
      
      console.log('\n📦 Installing PostgreSQL client...');
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      
      await execAsync('npm install pg');
      
      console.log('\n🔧 Running database setup...');
      await execAsync('node scripts/pg-setup.mjs');
      
      console.log('\n✅ Database setup complete!');
      
    } else if (!error) {
      console.log('✅ Tables already exist!');
    }
  } catch (error) {
    console.error('Error checking tables:', error);
  }
}

// Run the setup
executeSQLStatements().catch(console.error);