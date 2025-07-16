import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Extract project reference from URL
const projectRef = SUPABASE_URL.match(/https:\/\/(.+?)\.supabase\.co/)[1];

async function executeSQL(sql) {
  // Try different endpoints
  const endpoints = [
    `${SUPABASE_URL}/pg/query`,
    `${SUPABASE_URL}/rest/v1/rpc/query`,
    `https://api.supabase.com/platform/v1/projects/${projectRef}/db/query`
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Trying endpoint: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'apikey': SUPABASE_SERVICE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ query: sql })
      });
      
      if (response.ok) {
        console.log('✅ SQL executed successfully!');
        return true;
      } else {
        const text = await response.text();
        console.log(`❌ Failed: ${response.status} - ${text.substring(0, 100)}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  return false;
}

async function createTables() {
  console.log('🚀 Attempting to create Supabase tables automatically...\n');
  
  // Read the SQL file
  const sql = fs.readFileSync('create-missing-tables.sql', 'utf-8');
  
  const success = await executeSQL(sql);
  
  if (!success) {
    console.log('\n❌ Automated table creation failed.');
    console.log('\n📝 Manual steps required:');
    console.log('\n1. Open Supabase SQL Editor:');
    console.log(`   https://supabase.com/dashboard/project/${projectRef}/sql/new`);
    console.log('\n2. Copy this SQL and paste it in the editor:\n');
    console.log('═'.repeat(80));
    console.log(sql);
    console.log('═'.repeat(80));
    console.log('\n3. Click "Run" to execute');
    console.log('\n4. Come back and run: npm run import-youtube-data');
    
    // Open the URL in the browser if possible
    const open = (await import('open')).default;
    try {
      await open(`https://supabase.com/dashboard/project/${projectRef}/sql/new`);
      console.log('\n🌐 Opening Supabase SQL editor in your browser...');
    } catch (err) {
      // Ignore if open fails
    }
  } else {
    console.log('\n✅ Tables created successfully!');
    console.log('\nNow run: npm run import-youtube-data');
  }
}

createTables().catch(console.error);