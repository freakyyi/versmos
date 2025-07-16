import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL not found in .env.local');
  process.exit(1);
}

async function createTables() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🚀 Connecting to Supabase PostgreSQL...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Read the complete SQL setup
    const sqlPath = path.join(process.cwd(), 'supabase-complete-setup.sql');
    const fullSQL = fs.readFileSync(sqlPath, 'utf-8');
    
    // Split into individual statements and filter out comments and empty lines
    const statements = fullSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📝 Executing ${statements.length} SQL statements...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      if (statement.length === 0) continue;
      
      // Show progress
      const shortStatement = statement.substring(0, 50).replace(/\n/g, ' ');
      process.stdout.write(`[${i + 1}/${statements.length}] ${shortStatement}...`);
      
      try {
        await client.query(statement);
        successCount++;
        console.log(' ✅');
      } catch (error) {
        errorCount++;
        console.log(' ❌');
        
        // Only log actual errors (not "already exists" errors)
        if (!error.message.includes('already exists')) {
          console.log(`   Error: ${error.message}`);
        }
      }
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);

    // Verify tables exist
    console.log('\n🔍 Verifying tables...');
    
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
      const result = await client.query(`
        SELECT EXISTS (
          SELECT 1 FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        )
      `, [table]);
      
      const exists = result.rows[0].exists;
      console.log(`${exists ? '✅' : '❌'} Table ${table}`);
    }

    console.log('\n🎉 Database setup complete!');
    console.log('\nNext step: npm run import-youtube-data');

  } catch (error) {
    console.error('\n❌ Connection error:', error.message);
    console.error('Make sure your DATABASE_URL is correct in .env.local');
  } finally {
    await client.end();
  }
}

// Run the setup
createTables().catch(console.error);