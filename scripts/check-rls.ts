import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

// Use service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkRLS() {
  console.log('Checking RLS policies...\n');
  
  // Check if RLS is enabled on tables
  const tables = ['youtube_videos', 'youtube_playlists', 'case_studies'];
  
  for (const table of tables) {
    console.log(`\nTable: ${table}`);
    
    // Test with anon key
    const anonSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { data: anonData, error: anonError } = await anonSupabase
      .from(table)
      .select('id')
      .limit(1);
      
    if (anonError) {
      console.log(`  ❌ Anon access error: ${anonError.message}`);
    } else {
      console.log(`  ✅ Anon access OK - found ${anonData?.length || 0} rows`);
    }
    
    // Test with service role
    const { data: serviceData, error: serviceError } = await supabase
      .from(table)
      .select('id')
      .limit(1);
      
    if (serviceError) {
      console.log(`  ❌ Service role error: ${serviceError.message}`);
    } else {
      console.log(`  ✅ Service role OK - found ${serviceData?.length || 0} rows`);
    }
  }
}

checkRLS();