import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY || 'AIzaSyAAM1u6TdYtbeNJWgY7XZn2GKC7rTQ4d5o' // Using the key from earlier
});

async function checkYouTubeTotal() {
  console.log('Checking total videos from YouTube channel...');

  try {
    // Get channel info
    const channelResponse = await youtube.channels.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      forHandle: 'versmos'
    });

    const channel = channelResponse.data.items?.[0];
    if (!channel) {
      console.error('Channel not found');
      return;
    }

    console.log('\nChannel Statistics:');
    console.log(`- Channel Name: ${channel.snippet?.title}`);
    console.log(`- Total Videos: ${channel.statistics?.videoCount}`);
    console.log(`- Channel ID: ${channel.id}`);

    // Get all playlists
    const playlistsResponse = await youtube.playlists.list({
      part: ['snippet', 'contentDetails'],
      channelId: channel.id,
      maxResults: 50
    });

    console.log(`\nTotal Playlists: ${playlistsResponse.data.items?.length || 0}`);

    let totalVideosInPlaylists = 0;
    const videoIds = new Set<string>();

    // Get videos from each playlist
    for (const playlist of playlistsResponse.data.items || []) {
      console.log(`\nPlaylist: ${playlist.snippet?.title} (${playlist.contentDetails?.itemCount} videos)`);
      
      let nextPageToken: string | undefined = undefined;
      let playlistVideoCount = 0;

      do {
        const playlistItemsResponse = await youtube.playlistItems.list({
          part: ['contentDetails'],
          playlistId: playlist.id!,
          maxResults: 50,
          pageToken: nextPageToken
        });

        for (const item of playlistItemsResponse.data.items || []) {
          videoIds.add(item.contentDetails!.videoId!);
          playlistVideoCount++;
        }

        nextPageToken = playlistItemsResponse.data.nextPageToken || undefined;
      } while (nextPageToken);

      totalVideosInPlaylists += playlistVideoCount;
      console.log(`  - Fetched ${playlistVideoCount} videos from this playlist`);
    }

    console.log(`\n=== SUMMARY ===`);
    console.log(`Total videos according to channel statistics: ${channel.statistics?.videoCount}`);
    console.log(`Total videos across all playlists (with duplicates): ${totalVideosInPlaylists}`);
    console.log(`Unique videos found in playlists: ${videoIds.size}`);

    // Check for videos not in any playlist
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
    if (uploadsPlaylistId) {
      console.log('\nChecking uploads playlist for any missed videos...');
      let nextPageToken: string | undefined = undefined;
      const uploadedVideoIds = new Set<string>();

      do {
        const uploadsResponse = await youtube.playlistItems.list({
          part: ['contentDetails'],
          playlistId: uploadsPlaylistId,
          maxResults: 50,
          pageToken: nextPageToken
        });

        for (const item of uploadsResponse.data.items || []) {
          uploadedVideoIds.add(item.contentDetails!.videoId!);
        }

        nextPageToken = uploadsResponse.data.nextPageToken || undefined;
      } while (nextPageToken);

      console.log(`Total videos in uploads playlist: ${uploadedVideoIds.size}`);
      
      // Find videos in uploads but not in any custom playlist
      const missedVideos = Array.from(uploadedVideoIds).filter(id => !videoIds.has(id));
      console.log(`Videos not in any custom playlist: ${missedVideos.length}`);
      
      if (missedVideos.length > 0) {
        console.log('\nMissing video IDs:');
        missedVideos.forEach(id => console.log(`- ${id}`));
        
        // Get details for missing videos
        const videoDetails = await youtube.videos.list({
          part: ['snippet', 'contentDetails'],
          id: missedVideos
        });
        
        console.log('\nMissing video details:');
        videoDetails.data.items?.forEach(video => {
          console.log(`\nID: ${video.id}`);
          console.log(`Title: ${video.snippet?.title}`);
          console.log(`Duration: ${video.contentDetails?.duration}`);
        });
      }
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

checkYouTubeTotal();