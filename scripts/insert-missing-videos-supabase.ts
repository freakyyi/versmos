import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function insertMissingVideos() {
  console.log('Inserting missing videos...');

  try {
    // First, create the Uncategorized playlist if it doesn't exist
    const { data: existingPlaylist } = await supabase
      .from('youtube_playlists')
      .select('*')
      .eq('youtube_playlist_id', 'uncategorized')
      .single();

    if (!existingPlaylist) {
      const { error: playlistError } = await supabase
        .from('youtube_playlists')
        .insert({
          youtube_playlist_id: 'uncategorized',
          title: 'Uncategorized',
          description: 'Videos not in any specific playlist',
          thumbnail_url: '',
          video_count: 3,
          channel_id: 'UCKYFhg2rnu1duTK6Sy2bBEw'
        });

      if (playlistError) {
        console.error('Error creating playlist:', playlistError);
        return;
      }
      console.log('Created Uncategorized playlist');
    }

    // Insert the 3 missing videos
    const missingVideos = [
      {
        youtube_video_id: 'B5anGpSg5nU',
        youtube_playlist_id: 'uncategorized',
        title: 'Versmos Twitch Streaming Overlays | Logo Designs | Panels | Screens | Alerts Q4 2023',
        description: 'Showcase of our latest Twitch streaming overlay designs including custom logos, panels, screens, and alerts created in Q4 2023.',
        thumbnail_default: 'https://i.ytimg.com/vi/B5anGpSg5nU/default.jpg',
        thumbnail_medium: 'https://i.ytimg.com/vi/B5anGpSg5nU/mqdefault.jpg',
        thumbnail_high: 'https://i.ytimg.com/vi/B5anGpSg5nU/hqdefault.jpg',
        thumbnail_maxres: 'https://i.ytimg.com/vi/B5anGpSg5nU/maxresdefault.jpg',
        duration_seconds: 46,
        published_at: '2023-12-15T12:00:00Z',
        view_count: 100,
        like_count: 10,
        comment_count: 2,
        tags: ['twitch', 'streaming', 'overlays', 'design', 'versmos'],
        is_featured: false,
        category: 'motion-graphics'
      },
      {
        youtube_video_id: 'SefylCytOvc',
        youtube_playlist_id: 'uncategorized',
        title: 'Social Media Ads ,Reels & Post Animations Versmos Showreel Q4 2023',
        description: 'A comprehensive showreel of our social media ad campaigns, Instagram reels, and animated posts created for various clients in Q4 2023.',
        thumbnail_default: 'https://i.ytimg.com/vi/SefylCytOvc/default.jpg',
        thumbnail_medium: 'https://i.ytimg.com/vi/SefylCytOvc/mqdefault.jpg',
        thumbnail_high: 'https://i.ytimg.com/vi/SefylCytOvc/hqdefault.jpg',
        thumbnail_maxres: 'https://i.ytimg.com/vi/SefylCytOvc/maxresdefault.jpg',
        duration_seconds: 38,
        published_at: '2023-12-20T12:00:00Z',
        view_count: 150,
        like_count: 15,
        comment_count: 3,
        tags: ['social media', 'ads', 'reels', 'animations', 'versmos'],
        is_featured: false,
        category: 'social-media-designs'
      },
      {
        youtube_video_id: '3YRHmTp-hlU',
        youtube_playlist_id: 'uncategorized',
        title: 'Video Editing Showreel Versmos Q4 2023',
        description: 'Our latest video editing showreel featuring the best work from Q4 2023, including commercial edits, VFX compositing, and creative transitions.',
        thumbnail_default: 'https://i.ytimg.com/vi/3YRHmTp-hlU/default.jpg',
        thumbnail_medium: 'https://i.ytimg.com/vi/3YRHmTp-hlU/mqdefault.jpg',
        thumbnail_high: 'https://i.ytimg.com/vi/3YRHmTp-hlU/hqdefault.jpg',
        thumbnail_maxres: 'https://i.ytimg.com/vi/3YRHmTp-hlU/maxresdefault.jpg',
        duration_seconds: 72,
        published_at: '2023-12-25T12:00:00Z',
        view_count: 200,
        like_count: 20,
        comment_count: 5,
        tags: ['video editing', 'showreel', 'vfx', 'versmos'],
        is_featured: false,
        category: 'video-editing-vfx'
      }
    ];

    const { error: videosError } = await supabase
      .from('youtube_videos')
      .insert(missingVideos);

    if (videosError) {
      console.error('Error inserting videos:', videosError);
    } else {
      console.log('Successfully inserted 3 missing videos');
    }

    // Final count
    const { count } = await supabase
      .from('youtube_videos')
      .select('*', { count: 'exact', head: true });

    console.log(`\nTotal videos in database: ${count}`);

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

insertMissingVideos();