import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkFeaturedVideos() {
  // Check featured videos
  const { data: featured, error } = await supabase
    .from('youtube_videos')
    .select(`
      *,
      youtube_playlists (
        title
      )
    `)
    .eq('is_featured', true);
    
  if (error) {
    console.error('Error fetching featured videos:', error);
    return;
  }
  
  console.log('\nFeatured videos:', featured?.length);
  featured?.forEach(video => {
    console.log(`\n- ${video.title}`);
    console.log(`  ID: ${video.id}`);
    console.log(`  YouTube ID: ${video.youtube_video_id}`);
    console.log(`  Thumbnail: ${video.thumbnail_high}`);
    console.log(`  Duration: ${video.duration_seconds}s`);
    console.log(`  Views: ${video.view_count}`);
    console.log(`  Category: ${video.category}`);
    console.log(`  Playlist: ${video.youtube_playlists?.title || 'N/A'}`);
  });

  // Also check a regular video fetch to see the structure
  console.log('\n\nChecking regular video fetch:');
  const { data: sample, error: sampleError } = await supabase
    .from('youtube_videos')
    .select('*')
    .limit(1);
    
  if (!sampleError && sample?.[0]) {
    console.log('\nSample video structure:');
    console.log(JSON.stringify(sample[0], null, 2));
  }
}

checkFeaturedVideos();