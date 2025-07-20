import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY || 'AIzaSyAAM1u6TdYtbeNJWgY7XZn2GKC7rTQ4d5o'
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  return hours * 3600 + minutes * 60 + seconds;
}

async function fetchMissingVideos() {
  console.log('Fetching missing videos from YouTube...');

  try {
    // Get channel info
    const channelResponse = await youtube.channels.list({
      part: ['contentDetails'],
      forHandle: 'versmos'
    });

    const channel = channelResponse.data.items?.[0];
    if (!channel) {
      console.error('Channel not found');
      return;
    }

    // Get all videos from uploads playlist
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      console.error('Uploads playlist not found');
      return;
    }

    // Get existing video IDs from database
    const { data: existingVideos } = await supabase
      .from('youtube_videos')
      .select('youtube_video_id');

    const existingVideoIds = new Set(existingVideos?.map(v => v.youtube_video_id) || []);
    console.log(`Found ${existingVideoIds.size} videos in database`);

    // Fetch all videos from uploads playlist
    let nextPageToken: string | undefined = undefined;
    const missingVideos: any[] = [];

    do {
      const uploadsResponse = await youtube.playlistItems.list({
        part: ['contentDetails', 'snippet'],
        playlistId: uploadsPlaylistId,
        maxResults: 50,
        pageToken: nextPageToken
      });

      for (const item of uploadsResponse.data.items || []) {
        const videoId = item.contentDetails!.videoId!;
        if (!existingVideoIds.has(videoId)) {
          // Get full video details
          const videoResponse = await youtube.videos.list({
            part: ['snippet', 'contentDetails', 'statistics'],
            id: [videoId]
          });

          const video = videoResponse.data.items?.[0];
          if (video) {
            missingVideos.push(video);
            console.log(`Found missing video: ${video.snippet?.title}`);
          }
        }
      }

      nextPageToken = uploadsResponse.data.nextPageToken || undefined;
    } while (nextPageToken);

    console.log(`\nFound ${missingVideos.length} missing videos`);

    if (missingVideos.length > 0) {
      // Create "Uncategorized" playlist if needed
      const { data: uncategorizedPlaylist } = await supabase
        .from('youtube_playlists')
        .select('*')
        .eq('youtube_playlist_id', 'uncategorized')
        .single();

      if (!uncategorizedPlaylist) {
        console.log('Creating Uncategorized playlist...');
        const { data: newPlaylist, error: playlistError } = await supabase
          .from('youtube_playlists')
          .insert({
            youtube_playlist_id: 'uncategorized',
            title: 'Uncategorized',
            description: 'Videos not in any specific playlist',
            thumbnail: '',
            item_count: missingVideos.length
          })
          .select()
          .single();

        if (playlistError) {
          console.error('Error creating playlist:', playlistError);
          return;
        }
        console.log('Created Uncategorized playlist');
      }

      // Insert missing videos
      const videosToInsert = missingVideos.map(video => ({
        youtube_video_id: video.id,
        youtube_playlist_id: 'uncategorized',
        title: video.snippet?.title || '',
        description: video.snippet?.description || '',
        thumbnail_default: video.snippet?.thumbnails?.default?.url || '',
        thumbnail_medium: video.snippet?.thumbnails?.medium?.url || '',
        thumbnail_high: video.snippet?.thumbnails?.high?.url || '',
        thumbnail_maxres: video.snippet?.thumbnails?.maxresdefault?.url || '',
        duration_seconds: parseDuration(video.contentDetails?.duration || 'PT0S'),
        published_at: video.snippet?.publishedAt || new Date().toISOString(),
        view_count: parseInt(video.statistics?.viewCount || '0'),
        like_count: parseInt(video.statistics?.likeCount || '0'),
        comment_count: parseInt(video.statistics?.commentCount || '0'),
        tags: video.snippet?.tags || [],
        is_featured: false,
        category: 'video-editing-vfx' // Default category for uncategorized videos
      }));

      console.log('\nInserting missing videos into database...');
      const { error } = await supabase
        .from('youtube_videos')
        .insert(videosToInsert);

      if (error) {
        console.error('Error inserting videos:', error);
      } else {
        console.log('Successfully inserted missing videos');
        
        // Update playlist item count
        await supabase
          .from('youtube_playlists')
          .update({ item_count: missingVideos.length })
          .eq('youtube_playlist_id', 'uncategorized');
      }
    }

    // Final count
    const { count } = await supabase
      .from('youtube_videos')
      .select('*', { count: 'exact', head: true });

    console.log(`\nTotal videos in database after update: ${count}`);

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchMissingVideos();