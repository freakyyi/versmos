#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🚀 Versmos Complete Setup\n');
console.log('═'.repeat(50));

async function setup() {
  try {
    console.log('\n1️⃣  Starting development server...');
    console.log('   This will allow us to create database tables.\n');
    
    // Start the dev server in background
    const devProcess = exec('npm run dev');
    
    // Wait a bit for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('2️⃣  Opening database setup page...');
    console.log('   Visit: http://localhost:3002/api/setup-database\n');
    
    // Open the setup page
    try {
      const { default: open } = await import('open');
      await open('http://localhost:3002/api/setup-database');
    } catch (err) {
      console.log('   Please open this URL manually in your browser:');
      console.log('   http://localhost:3002/api/setup-database\n');
    }
    
    console.log('3️⃣  Follow the instructions on the setup page:');
    console.log('   - If tables are missing, download the SQL file');
    console.log('   - Run the SQL using one of the provided methods');
    console.log('   - Refresh the page to verify tables were created\n');
    
    console.log('4️⃣  After tables are created:');
    console.log('   - Press Ctrl+C to stop this script');
    console.log('   - Run: npm run import-youtube-data');
    console.log('   - Run: npm run dev');
    console.log('   - Visit: http://localhost:3002\n');
    
    console.log('📝 Note: Delete /app/api/setup-database after setup!\n');
    
    // Keep the process running
    process.stdin.resume();
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

setup();