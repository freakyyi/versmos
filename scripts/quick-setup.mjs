import { exec } from 'child_process';
import { promisify } from 'util';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

const execAsync = promisify(exec);

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTables() {
  console.log('🔍 Checking if tables exist...\n');
  
  const tables = ['youtube_playlists', 'youtube_videos', 'case_studies'];
  let allExist = true;
  
  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('id')
        .limit(1);
      
      if (error && error.message.includes('does not exist')) {
        console.log(`❌ Table ${table} not found`);
        allExist = false;
      } else {
        console.log(`✅ Table ${table} exists`);
      }
    } catch (err) {
      console.log(`❌ Table ${table} not found`);
      allExist = false;
    }
  }
  
  return allExist;
}

async function runSetup() {
  console.log('🚀 Versmos YouTube Data Setup\n');
  console.log('═'.repeat(50));
  
  // Step 1: Check if tables exist
  const tablesExist = await checkTables();
  
  if (!tablesExist) {
    console.log('\n⚠️  Tables not found!');
    console.log('\n📋 Please follow these steps:');
    console.log('1. The Supabase SQL editor should be open in your browser');
    console.log('2. Copy the SQL from create-missing-tables.sql');
    console.log('3. Paste and click "Run"');
    console.log('4. Come back and run this script again: node scripts/quick-setup.mjs');
    
    // Try to open the browser again
    try {
      const { default: open } = await import('open');
      const projectRef = supabaseUrl.match(/https:\/\/(.+?)\.supabase\.co/)[1];
      await open(`https://supabase.com/dashboard/project/${projectRef}/sql/new`);
    } catch (err) {
      // Ignore
    }
    
    return;
  }
  
  console.log('\n✅ All tables exist!\n');
  
  // Step 2: Check if data exists
  const { count: videoCount } = await supabase
    .from('youtube_videos')
    .select('*', { count: 'exact', head: true });
  
  if (videoCount > 0) {
    console.log(`📊 Found ${videoCount} videos already in database`);
    console.log('\n✅ Setup complete! Your data is ready.');
    console.log('\nRun the development server: npm run dev');
    return;
  }
  
  // Step 3: Import data
  console.log('📥 Importing YouTube data...\n');
  
  try {
    // Run the import script
    const { stdout, stderr } = await execAsync('npm run import-youtube-data');
    
    if (stderr && !stderr.includes('injecting env')) {
      console.error('Error:', stderr);
    } else {
      console.log(stdout);
      console.log('\n✅ Data import complete!');
    }
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    console.log('\nTry running manually: npm run import-youtube-data');
  }
  
  // Step 4: Final verification
  const { count: finalCount } = await supabase
    .from('youtube_videos')
    .select('*', { count: 'exact', head: true });
  
  if (finalCount > 0) {
    console.log(`\n🎉 Success! Imported ${finalCount} videos`);
    console.log('\n🚀 Your Versmos website is ready!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Visit: http://localhost:3002');
    console.log('3. Check out the dynamic content!');
  }
}

// Run the setup
runSetup().catch(console.error);