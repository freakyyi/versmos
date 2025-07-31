import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getPlaylistNames() {
  try {
    console.log('Fetching all unique playlist names from youtube_playlists...\n');

    // Query all playlists ordered by title
    const { data: playlists, error } = await supabase
      .from('youtube_playlists')
      .select('id, title, description, video_count')
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching playlists:', error);
      return;
    }

    if (!playlists || playlists.length === 0) {
      console.log('No playlists found in the database.');
      return;
    }

    console.log(`Found ${playlists.length} playlists:\n`);
    console.log('='.repeat(80));

    playlists.forEach((playlist, index) => {
      console.log(`${index + 1}. ${playlist.title}`);
      console.log(`   ID: ${playlist.id}`);
      console.log(`   Videos: ${playlist.video_count || 0}`);
      if (playlist.description) {
        console.log(`   Description: ${playlist.description.substring(0, 100)}${playlist.description.length > 100 ? '...' : ''}`);
      }
      console.log('-'.repeat(80));
    });

    console.log('\n\nPlaylist titles only (for easy copying):');
    console.log('='.repeat(80));
    playlists.forEach((playlist) => {
      console.log(playlist.title);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
getPlaylistNames();