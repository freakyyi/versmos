import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Map playlist names to service categories
const playlistCategoryMap: Record<string, string> = {
  'Long-form Content Video Edits': 'video-editing-vfx',
  'Social Media Post Animations': 'social-media-designs',
  'VFX & Compositing': 'video-editing-vfx',
  'Facebook Service/Product Video Ads -': 'product-videos',
  'Twitch, Kick, Facebook - Streaming Essentials': 'motion-graphics',
  'Logo Animation - After Effects': 'motion-graphics',
  'Testimonial Videos': 'testimonial-videos',
  'Show Case & Project': 'video-editing-vfx'
};

async function updateVideoCategories() {
  console.log('Updating video categories based on playlist names...');

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
    for (const video of videos || []) {
      const playlistTitle = (video.youtube_playlists as any)?.title;
      if (playlistTitle) {
        const newCategory = playlistCategoryMap[playlistTitle] || 'video-editing-vfx';
        
        if (video.category !== newCategory) {
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

    console.log(`\nUpdated ${updates.length} videos:`);
    updates.forEach(update => {
      console.log(`- "${update.title}" (${update.playlist}): ${update.oldCategory} → ${update.newCategory}`);
    });

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
      console.log(`  ${category}: ${count} videos`);
    });

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

updateVideoCategories();