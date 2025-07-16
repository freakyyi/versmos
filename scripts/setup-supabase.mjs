import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

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

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n');
  
  // Individual table creation statements
  const tableStatements = [
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
  
  // Since we can't execute DDL directly, let's verify which tables need to be created
  const tables = [
    'youtube_playlists',
    'youtube_videos',
    'case_studies',
    'services',
    'team_members',
    'client_testimonials',
    'client_logos'
  ];
  
  console.log('Checking existing tables...\n');
  
  const missingTables = [];
  
  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('id')
        .limit(1);
      
      if (error && error.message.includes('does not exist')) {
        console.log(`❌ Table ${table} - NOT FOUND`);
        missingTables.push(table);
      } else {
        console.log(`✅ Table ${table} - EXISTS`);
      }
    } catch (err) {
      console.log(`❌ Table ${table} - NOT FOUND`);
      missingTables.push(table);
    }
  }
  
  if (missingTables.length > 0) {
    console.log('\n⚠️  Missing tables:', missingTables.join(', '));
    console.log('\n📝 Creating SQL file with only missing tables...');
    
    // Generate SQL for only missing tables
    const sqlStatements = [];
    missingTables.forEach((table, index) => {
      const tableIndex = tables.indexOf(table);
      sqlStatements.push(tableStatements[tableIndex]);
    });
    
    const sqlContent = sqlStatements.join(';\n\n') + ';\n\n' + 
      `-- Add foreign key constraints after all tables exist
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
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);`;
    
    // Save SQL to file
    const fs = await import('fs');
    fs.writeFileSync('create-missing-tables.sql', sqlContent);
    
    console.log('\n✅ SQL file created: create-missing-tables.sql');
    console.log('\n📋 Next steps:');
    console.log('1. Go to: https://supabase.com/dashboard/project/ngxzbrajncyzjeisqpec/sql/new');
    console.log('2. Copy and paste the contents of create-missing-tables.sql');
    console.log('3. Click "Run" to execute the SQL');
    console.log('4. Come back and run: npm run import-youtube-data');
    
    console.log('\n🔗 Direct link to SQL editor:');
    console.log('https://supabase.com/dashboard/project/ngxzbrajncyzjeisqpec/sql/new');
  } else {
    console.log('\n✅ All tables exist! Ready to import data.');
    console.log('\nRun: npm run import-youtube-data');
  }
}

// Run the setup
setupDatabase().catch(console.error);