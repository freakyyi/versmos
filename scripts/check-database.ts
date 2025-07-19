import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  console.log('Checking Supabase database...\n');
  
  try {
    // Check youtube_videos table
    const { data: videos, error: videosError, count } = await supabase
      .from('youtube_videos')
      .select('*', { count: 'exact', head: false })
      .limit(5);
    
    if (videosError) {
      console.error('Error querying youtube_videos:', videosError);
    } else {
      console.log(`Total videos in database: ${count}`);
      console.log('Sample videos:', videos?.map(v => ({ 
        id: v.id, 
        title: v.title, 
        is_featured: v.is_featured,
        duration_seconds: v.duration_seconds,
        category: v.category
      })));
    }
    
    // Check featured videos
    const { data: featured, count: featuredCount } = await supabase
      .from('youtube_videos')
      .select('*', { count: 'exact' })
      .eq('is_featured', true);
    
    console.log(`\nFeatured videos: ${featuredCount || 0}`);
    
    // Check playlists
    const { data: playlists, error: playlistsError, count: playlistCount } = await supabase
      .from('youtube_playlists')
      .select('*', { count: 'exact' })
      .limit(5);
    
    if (playlistsError) {
      console.error('Error querying youtube_playlists:', playlistsError);
    } else {
      console.log(`\nTotal playlists: ${playlistCount}`);
      console.log('Sample playlists:', playlists?.map(p => ({ 
        id: p.id, 
        title: p.title,
        youtube_playlist_id: p.youtube_playlist_id
      })));
    }
    
    // Test join query
    console.log('\nTesting join query...');
    const { data: joinTest, error: joinError } = await supabase
      .from('youtube_videos')
      .select(`
        id,
        title,
        youtube_playlist_id,
        youtube_playlists (
          title
        )
      `)
      .limit(3);
    
    if (joinError) {
      console.error('Join query error:', joinError);
    } else {
      console.log('Join query result:', JSON.stringify(joinTest, null, 2));
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkDatabase();