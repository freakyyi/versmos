import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Missing Supabase credentials in environment variables');
  process.exit(1);
}

// Extract project ref from URL
const projectRef = supabaseUrl.match(/https:\/\/(.+?)\.supabase\.co/)[1];

async function executeSQLViaAPI() {
  console.log('🚀 Executing SQL via Supabase API...\n');
  
  // Read the SQL schema
  const schemaPath = path.join(process.cwd(), 'lib', 'supabase-schema.sql');
  const sqlContent = fs.readFileSync(schemaPath, 'utf-8');
  
  // Using the Supabase Management API
  const apiUrl = `https://api.supabase.com/v1/projects/${projectRef}/database/query`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: sqlContent
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.log('Management API not accessible. Trying alternative approach...\n');
      
      // Alternative: Use the SQL endpoint directly
      const sqlEndpoint = `${supabaseUrl}/rest/v1/rpc/execute_sql`;
      
      const altResponse = await fetch(sqlEndpoint, {
        method: 'POST',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: sqlContent
        })
      });
      
      if (!altResponse.ok) {
        throw new Error('SQL execution failed');
      }
      
      console.log('✅ SQL executed successfully!');
    } else {
      console.log('✅ SQL executed successfully via Management API!');
    }
  } catch (error) {
    console.log('❌ Automated SQL execution not available.');
    console.log('\n📋 Here\'s what you need to do:\n');
    console.log('1. Copy the SQL below (or from /lib/supabase-schema.sql)');
    console.log('2. Go to: https://supabase.com/dashboard/project/ngxzbrajncyzjeisqpec/sql/new');
    console.log('3. Paste and execute the SQL');
    console.log('4. Run: npm run import-youtube-data\n');
    console.log('═'.repeat(80));
    console.log('\nSQL TO EXECUTE:');
    console.log('═'.repeat(80));
    console.log(sqlContent);
    console.log('═'.repeat(80));
    
    // Also save to file for convenience
    fs.writeFileSync('execute-this.sql', sqlContent);
    console.log('\n📄 SQL also saved to: execute-this.sql');
  }
}

// Run the script
executeSQLViaAPI();