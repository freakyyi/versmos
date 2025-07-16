import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

// Use the direct PostgreSQL connection details you provided
const POSTGRES_HOST = "db.ngxzbrajncyzjeisqpec.supabase.co";
const POSTGRES_USER = "postgres";
const POSTGRES_PASSWORD = "DTuTifuupfSwIH6p";
const POSTGRES_DATABASE = "postgres";

async function executeSQLDirectly() {
  console.log('🚀 Creating Supabase tables using direct PostgreSQL connection...\n');
  
  const client = new Client({
    host: POSTGRES_HOST,
    port: 5432,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // SQL statements to execute
    const statements = [
      // Enable UUID extension
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
      
      // Create tables
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

    // Execute each statement
    console.log('Creating tables...\n');
    let successCount = 0;
    let errorCount = 0;

    for (const statement of statements) {
      try {
        const shortDesc = statement.match(/CREATE\s+(EXTENSION|TABLE)\s+(?:IF\s+NOT\s+EXISTS\s+)?([^\s(]+)/i);
        const desc = shortDesc ? `${shortDesc[1]} ${shortDesc[2]}` : 'Statement';
        
        process.stdout.write(`Creating ${desc}...`);
        await client.query(statement);
        console.log(' ✅');
        successCount++;
      } catch (error) {
        console.log(' ❌');
        console.log(`  Error: ${error.message}`);
        errorCount++;
      }
    }

    // Add foreign key constraints
    console.log('\nAdding foreign key constraints...');
    
    try {
      await client.query(`
        ALTER TABLE youtube_videos 
        ADD CONSTRAINT fk_youtube_videos_playlist 
        FOREIGN KEY (youtube_playlist_id) 
        REFERENCES youtube_playlists(youtube_playlist_id) 
        ON DELETE CASCADE
      `);
      console.log('✅ Added foreign key for youtube_videos');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        console.log(`❌ Error: ${error.message}`);
      }
    }

    try {
      await client.query(`
        ALTER TABLE case_studies
        ADD CONSTRAINT fk_case_studies_video
        FOREIGN KEY (video_id)
        REFERENCES youtube_videos(youtube_video_id)
        ON DELETE CASCADE
      `);
      console.log('✅ Added foreign key for case_studies');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        console.log(`❌ Error: ${error.message}`);
      }
    }

    // Create indexes
    console.log('\nCreating indexes...');
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_youtube_videos_playlist ON youtube_videos(youtube_playlist_id)',
      'CREATE INDEX IF NOT EXISTS idx_youtube_videos_featured ON youtube_videos(is_featured)',
      'CREATE INDEX IF NOT EXISTS idx_youtube_videos_category ON youtube_videos(category)',
      'CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(is_featured)',
      'CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active)',
      'CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug)'
    ];

    for (const index of indexes) {
      try {
        await client.query(index);
        const indexName = index.match(/INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?([^\s]+)/i)[1];
        console.log(`✅ Created index ${indexName}`);
      } catch (error) {
        console.log(`❌ Error creating index: ${error.message}`);
      }
    }

    // Verify tables exist
    console.log('\n🔍 Verifying tables...');
    
    const verifyQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;
    
    const result = await client.query(verifyQuery);
    console.log('\nTables in database:');
    result.rows.forEach(row => {
      console.log(`✅ ${row.table_name}`);
    });

    console.log('\n🎉 Database setup completed successfully!');
    console.log(`\n📊 Summary: ${successCount} successful, ${errorCount} errors`);
    
    if (errorCount === 0) {
      console.log('\n✅ All tables created successfully!');
      console.log('\nNext steps:');
      console.log('1. Run: npm run import-youtube-data');
      console.log('2. Run: npm run dev');
      console.log('3. Visit: http://localhost:3002');
    }

  } catch (error) {
    console.error('\n❌ Connection error:', error.message);
    console.error('Error details:', error);
  } finally {
    await client.end();
    console.log('\n👋 Database connection closed.');
  }
}

// Run the script
executeSQLDirectly().catch(console.error);