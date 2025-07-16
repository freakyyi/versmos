import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// SQL statements to create tables
const createTableStatements = [
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  
  // Foreign key constraints
  `ALTER TABLE youtube_videos 
   ADD CONSTRAINT fk_youtube_videos_playlist 
   FOREIGN KEY (youtube_playlist_id) 
   REFERENCES youtube_playlists(youtube_playlist_id) 
   ON DELETE CASCADE`,
  
  `ALTER TABLE case_studies
   ADD CONSTRAINT fk_case_studies_video
   FOREIGN KEY (video_id)
   REFERENCES youtube_videos(youtube_video_id)
   ON DELETE CASCADE`,
];

// Index creation statements
const createIndexStatements = [
  `CREATE INDEX IF NOT EXISTS idx_youtube_videos_playlist ON youtube_videos(youtube_playlist_id)`,
  `CREATE INDEX IF NOT EXISTS idx_youtube_videos_featured ON youtube_videos(is_featured)`,
  `CREATE INDEX IF NOT EXISTS idx_youtube_videos_category ON youtube_videos(category)`,
  `CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(is_featured)`,
  `CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active)`,
  `CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug)`,
];

// RLS policies
const rlsStatements = [
  `ALTER TABLE youtube_playlists ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE services ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE team_members ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE client_testimonials ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY`,
  
  `CREATE POLICY "Allow public read" ON youtube_playlists FOR SELECT USING (true)`,
  `CREATE POLICY "Allow public read" ON youtube_videos FOR SELECT USING (true)`,
  `CREATE POLICY "Allow public read" ON case_studies FOR SELECT USING (true)`,
  `CREATE POLICY "Allow public read" ON services FOR SELECT USING (true)`,
  `CREATE POLICY "Allow public read" ON team_members FOR SELECT USING (true)`,
  `CREATE POLICY "Allow public read" ON client_testimonials FOR SELECT USING (true)`,
  `CREATE POLICY "Allow public read" ON client_logos FOR SELECT USING (true)`,
];

export async function GET() {
  try {
    console.log('🚀 Database setup started...');
    
    // Since we can't execute raw SQL through Supabase client,
    // we'll check if tables exist and provide instructions
    const tables = [
      'youtube_playlists',
      'youtube_videos',
      'case_studies',
      'services',
      'team_members',
      'client_testimonials',
      'client_logos'
    ];
    
    const results = {
      tablesChecked: [] as any[],
      tablesExist: [] as string[],
      tablesMissing: [] as string[],
      success: false,
      message: '',
      sqlGenerated: false
    };
    
    // Check each table
    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .select('id')
          .limit(1);
        
        if (error && error.message.includes('does not exist')) {
          results.tablesMissing.push(table);
          results.tablesChecked.push({ table, exists: false, error: error.message });
        } else {
          results.tablesExist.push(table);
          results.tablesChecked.push({ table, exists: true });
        }
      } catch (err: any) {
        results.tablesMissing.push(table);
        results.tablesChecked.push({ table, exists: false, error: err.message });
      }
    }
    
    if (results.tablesMissing.length === 0) {
      results.success = true;
      results.message = 'All tables already exist!';
    } else {
      // Generate SQL file
      const allStatements = [
        ...createTableStatements,
        ...createIndexStatements,
        ...rlsStatements
      ];
      
      const sqlContent = allStatements.join(';\n\n') + ';';
      
      // Write SQL to public directory so it can be downloaded
      const fs = await import('fs');
      const path = await import('path');
      const sqlPath = path.join(process.cwd(), 'public', 'setup-database.sql');
      fs.writeFileSync(sqlPath, sqlContent);
      
      results.sqlGenerated = true;
      results.message = `${results.tablesMissing.length} tables need to be created. SQL file generated.`;
    }
    
    // Return HTML response with instructions
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Versmos Database Setup</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: #0D1F23;
      color: #fff;
    }
    h1 { color: #25A3AB; }
    .status { 
      background: #132E35; 
      padding: 1.5rem; 
      border-radius: 8px; 
      margin: 1rem 0;
    }
    .success { border-left: 4px solid #22c55e; }
    .error { border-left: 4px solid #ef4444; }
    .warning { border-left: 4px solid #f59e0b; }
    .table-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }
    .table-item {
      background: #2D4A53;
      padding: 1rem;
      border-radius: 4px;
    }
    .exists { border-left: 3px solid #22c55e; }
    .missing { border-left: 3px solid #ef4444; }
    pre {
      background: #000;
      padding: 1rem;
      overflow-x: auto;
      border-radius: 4px;
    }
    .button {
      display: inline-block;
      background: #25A3AB;
      color: #0D1F23;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 0.5rem 0;
    }
    .button:hover {
      background: #1e8891;
    }
    .sql-box {
      background: #000;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      max-height: 400px;
      overflow-y: auto;
    }
  </style>
</head>
<body>
  <h1>🚀 Versmos Database Setup</h1>
  
  <div class="status ${results.success ? 'success' : 'warning'}">
    <h2>Status: ${results.message}</h2>
  </div>
  
  <h2>📊 Table Status</h2>
  <div class="table-list">
    ${results.tablesChecked.map(t => `
      <div class="table-item ${t.exists ? 'exists' : 'missing'}">
        ${t.exists ? '✅' : '❌'} ${t.table}
      </div>
    `).join('')}
  </div>
  
  ${!results.success ? `
    <div class="status error">
      <h2>⚠️ Manual Setup Required</h2>
      <p>Since I cannot execute DDL commands directly with the provided credentials, you need to run the SQL manually.</p>
      
      <h3>Option 1: Download and Run SQL</h3>
      <a href="/setup-database.sql" class="button" download>📥 Download SQL File</a>
      
      <h3>Option 2: Use psql Command Line</h3>
      <pre>psql "${process.env.DATABASE_URL}" -f setup-database.sql</pre>
      
      <h3>Option 3: Copy SQL Below</h3>
      <details>
        <summary>Click to show SQL</summary>
        <div class="sql-box">
          <pre>${sqlContent}</pre>
        </div>
      </details>
      
      <h3>After Running SQL:</h3>
      <ol>
        <li>Refresh this page to verify tables were created</li>
        <li>Run: <code>npm run import-youtube-data</code></li>
        <li>Start the dev server: <code>npm run dev</code></li>
      </ol>
    </div>
  ` : `
    <div class="status success">
      <h2>✅ Database Ready!</h2>
      <p>All tables exist. You can now import the YouTube data.</p>
      <h3>Next Steps:</h3>
      <ol>
        <li>Run: <code>npm run import-youtube-data</code></li>
        <li>Start the dev server: <code>npm run dev</code></li>
        <li>Visit: <a href="http://localhost:3002">http://localhost:3002</a></li>
      </ol>
    </div>
  `}
  
  <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #2D4A53;">
    <p><strong>Security Note:</strong> Remember to delete the <code>/api/setup-database</code> route after setup is complete.</p>
  </div>
</body>
</html>
    `;
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Setup failed', 
      message: error.message 
    }, { status: 500 });
  }
}