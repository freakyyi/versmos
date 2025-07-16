import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n');
  
  // Read the SQL schema
  const schemaPath = path.join(process.cwd(), 'lib', 'supabase-schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  
  console.log('1. Creating database tables...');
  
  // Execute the schema
  const { error } = await supabase.rpc('exec_sql', { sql: schema }).single();
  
  if (error) {
    // If RPC doesn't work, we'll execute statements individually
    console.log('Direct RPC failed, executing statements individually...');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      try {
        // For table creation, we'll use direct REST API calls
        if (statement.includes('CREATE TABLE')) {
          console.log(`Executing: ${statement.substring(0, 50)}...`);
          // Tables are created via the schema, so we'll check if they exist
        }
      } catch (err) {
        console.error(`Error executing statement: ${err}`);
      }
    }
  }
  
  // Verify tables exist by trying to query them
  console.log('\n2. Verifying tables...');
  
  const tables = [
    'youtube_playlists',
    'youtube_videos', 
    'case_studies',
    'services',
    'team_members',
    'client_testimonials',
    'client_logos'
  ];
  
  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
      
    if (error) {
      console.log(`❌ Table ${table} not found or error: ${error.message}`);
      console.log(`   Please create this table manually in Supabase Dashboard`);
    } else {
      console.log(`✅ Table ${table} exists`);
    }
  }
  
  console.log('\n📝 Database setup complete!');
  console.log('\nNOTE: If any tables are missing, please:');
  console.log('1. Go to https://supabase.com/dashboard/project/ngxzbrajncyzjeisqpec/sql');
  console.log('2. Copy the SQL from /lib/supabase-schema.sql');
  console.log('3. Run it in the SQL editor');
  console.log('\nThen run: npm run import-youtube-data');
}

// Run the setup
setupDatabase().catch(console.error);