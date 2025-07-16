import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setup() {
  console.log('🚀 Versmos Database Setup\n');
  console.log('═'.repeat(50));
  
  // Check if tables exist
  console.log('Checking database status...\n');
  
  const tables = [
    'youtube_playlists',
    'youtube_videos',
    'case_studies',
    'services',
    'team_members',
    'client_testimonials',
    'client_logos'
  ];
  
  let tablesExist = true;
  
  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('id')
        .limit(1);
      
      if (error && error.message.includes('does not exist')) {
        console.log(`❌ Table ${table} - NOT FOUND`);
        tablesExist = false;
      } else {
        console.log(`✅ Table ${table} - EXISTS`);
      }
    } catch (err) {
      console.log(`❌ Table ${table} - NOT FOUND`);
      tablesExist = false;
    }
  }
  
  if (!tablesExist) {
    console.log('\n⚠️  Tables missing! Creating them now...\n');
    
    // Since we can't execute DDL directly, we'll open the browser
    // and provide a one-click solution
    const projectRef = supabaseUrl.match(/https:\/\/(.+?)\.supabase\.co/)[1];
    
    console.log('📋 Instructions:');
    console.log('1. Your browser will open to the Supabase SQL editor');
    console.log('2. The SQL file is ready at: supabase/migrations/001_create_tables.sql');
    console.log('3. Copy and paste the SQL, then click "Run"');
    console.log('4. Come back and run this command again\n');
    
    // Open browser
    try {
      const { default: open } = await import('open');
      await open(`https://supabase.com/dashboard/project/${projectRef}/sql/new`);
      console.log('🌐 Opening Supabase SQL editor...');
      
      // Also copy SQL to clipboard if possible
      const sqlPath = path.join(process.cwd(), 'supabase/migrations/001_create_tables.sql');
      const sql = fs.readFileSync(sqlPath, 'utf-8');
      
      try {
        await execAsync(`echo "${sql}" | pbcopy`);
        console.log('📋 SQL copied to clipboard!');
      } catch (err) {
        // Clipboard copy failed, ignore
      }
    } catch (err) {
      console.log('Could not open browser automatically');
    }
    
    return;
  }
  
  console.log('\n✅ All tables exist!\n');
  
  // Check if data already exists
  const { count } = await supabase
    .from('youtube_videos')
    .select('*', { count: 'exact', head: true });
  
  if (count > 0) {
    console.log(`📊 Database already contains ${count} videos`);
    console.log('\n✅ Setup complete!');
    console.log('\nRun: npm run dev');
    console.log('Visit: http://localhost:3002');
    return;
  }
  
  // Import data
  console.log('📥 Importing YouTube data...\n');
  
  try {
    const { stdout } = await execAsync('npm run import-youtube-data');
    console.log(stdout);
    
    // Verify import
    const { count: finalCount } = await supabase
      .from('youtube_videos')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n✅ Successfully imported ${finalCount} videos!`);
    console.log('\n🎉 Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Visit: http://localhost:3002');
    console.log('3. Check out your dynamic content!');
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    console.log('\nTry running manually: npm run import-youtube-data');
  }
}

// Run setup
setup().catch(console.error);