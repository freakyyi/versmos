import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Map playlist names to service categories based on actual YouTube playlists
const playlistCategoryMap: Record<string, string> = {
  'Long-form Content Video Edits': 'video-editing-vfx',
  'Social Media Post Animations': 'social-media-designs',
  'VFX & Compositing': 'video-editing-vfx',
  'Facebook Service/Product Video Ads -': 'product-videos',
  'Twitch, Kick, Facebook - Streaming Essentials': 'motion-graphics',
  '2D Explainers / Motion Graphics': 'motion-graphics',
  'Logo Animations': 'motion-graphics',
  'Testimonial Edits, YouTube Shorts, Instagram & Tiktok Reels': 'testimonial-videos',
  'Show Case & Project': 'video-editing-vfx',
  'Uncategorized': 'video-editing-vfx'
};

// Also create proper display names for categories
const categoryDisplayNames: Record<string, string> = {
  'video-editing-vfx': 'Video Editing & VFX',
  'social-media-designs': 'Social Media Designs',
  'motion-graphics': 'Motion Graphics',
  'product-videos': 'Product Videos',
  'testimonial-videos': 'Testimonial Videos',
  '2d-animation': '2D Animation',
  '3d-animation': '3D Animation'
};

async function fixVideoCategories() {
  console.log('Fixing video categories based on actual YouTube playlists...');

  try {
    // First, get all videos with their playlist information
    const { data: videos, error: videosError } = await supabase
      .from('youtube_videos')
      .select(`
        id,
        title,
        youtube_playlist_id,
        category,
        youtube_playlists (
          title
        )
      `);

    if (videosError) {
      console.error('Error fetching videos:', videosError);
      return;
    }

    console.log(`Found ${videos?.length || 0} videos to update`);

    // Update each video's category based on its playlist
    const updates = [];
    let updateCount = 0;
    
    for (const video of videos || []) {
      const playlistTitle = video.youtube_playlists?.title;
      if (playlistTitle) {
        const newCategory = playlistCategoryMap[playlistTitle];
        
        if (newCategory && video.category !== newCategory) {
          updateCount++;
          updates.push({
            id: video.id,
            oldCategory: video.category,
            newCategory,
            title: video.title,
            playlist: playlistTitle
          });

          // Update the video category
          const { error: updateError } = await supabase
            .from('youtube_videos')
            .update({ category: newCategory })
            .eq('id', video.id);

          if (updateError) {
            console.error(`Error updating video ${video.id}:`, updateError);
          }
        }
      }
    }

    console.log(`\nUpdated ${updateCount} videos`);
    
    if (updates.length > 0) {
      console.log('\nSample updates:');
      updates.slice(0, 5).forEach(update => {
        console.log(`- "${update.title}" (${update.playlist}): ${update.oldCategory} → ${update.newCategory}`);
      });
    }

    // Show category distribution
    const { data: categoryCounts } = await supabase
      .from('youtube_videos')
      .select('category')
      .order('category');

    const distribution: Record<string, number> = {};
    categoryCounts?.forEach(row => {
      distribution[row.category] = (distribution[row.category] || 0) + 1;
    });

    console.log('\nCategory distribution after update:');
    Object.entries(distribution).forEach(([category, count]) => {
      const displayName = categoryDisplayNames[category] || category;
      console.log(`  ${displayName} (${category}): ${count} videos`);
    });

    // Show playlist distribution
    console.log('\nPlaylist distribution:');
    const { data: playlists } = await supabase
      .from('youtube_playlists')
      .select('title, video_count')
      .order('video_count', { ascending: false });

    playlists?.forEach(playlist => {
      const category = playlistCategoryMap[playlist.title] || 'unknown';
      console.log(`  ${playlist.title}: ${playlist.video_count} videos → ${category}`);
    });

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

fixVideoCategories();