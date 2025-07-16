import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

const API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyAAM1u6TdYtbeNJWgY7XZn2GKC7rTQ4d5o';
const CHANNEL_HANDLE = 'versmos'; // From @versmos

interface YouTubeChannelResponse {
  items: Array<{
    id: string;
    snippet: {
      title: string;
      description: string;
      customUrl: string;
      publishedAt: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
    statistics: {
      viewCount: string;
      subscriberCount: string;
      videoCount: string;
    };
  }>;
}

interface YouTubePlaylistResponse {
  items: Array<{
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
        standard?: { url: string };
        maxres?: { url: string };
      };
      channelTitle: string;
    };
    contentDetails: {
      itemCount: number;
    };
  }>;
  nextPageToken?: string;
}

interface YouTubePlaylistItemsResponse {
  items: Array<{
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
        standard?: { url: string };
        maxres?: { url: string };
      };
      channelTitle: string;
      playlistId: string;
      position: number;
      resourceId: {
        kind: string;
        videoId: string;
      };
    };
    contentDetails: {
      videoId: string;
      videoPublishedAt: string;
    };
  }>;
  nextPageToken?: string;
}

interface YouTubeVideoDetailsResponse {
  items: Array<{
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
        standard?: { url: string };
        maxres?: { url: string };
      };
      tags?: string[];
      categoryId: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
    };
    statistics: {
      viewCount: string;
      likeCount?: string;
      commentCount?: string;
    };
  }>;
}

async function getChannelId(): Promise<string | null> {
  try {
    // First try to get channel by handle/username
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${CHANNEL_HANDLE}&key=${API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json() as any;
    
    if (searchData.items && searchData.items.length > 0) {
      // Find the channel that matches the handle
      for (const item of searchData.items) {
        if (item.snippet.channelTitle.toLowerCase().includes('versmos') || 
            item.snippet.description.toLowerCase().includes('versmos')) {
          console.log('Found channel:', item.snippet.channelTitle);
          return item.snippet.channelId;
        }
      }
    }
    
    console.error('Channel not found');
    return null;
  } catch (error) {
    console.error('Error fetching channel ID:', error);
    return null;
  }
}

async function fetchPlaylists(channelId: string): Promise<any[]> {
  const playlists: any[] = [];
  let nextPageToken: string | undefined;
  
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json() as YouTubePlaylistResponse;
    
    if (data.items) {
      playlists.push(...data.items);
    }
    
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
  
  return playlists;
}

async function fetchPlaylistVideos(playlistId: string): Promise<any[]> {
  const videos: any[] = [];
  let nextPageToken: string | undefined;
  
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json() as YouTubePlaylistItemsResponse;
    
    if (data.items) {
      videos.push(...data.items);
    }
    
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
  
  return videos;
}

async function fetchVideoDetails(videoIds: string[]): Promise<any[]> {
  const videos: any[] = [];
  
  // YouTube API allows max 50 video IDs per request
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${batch.join(',')}&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json() as YouTubeVideoDetailsResponse;
    
    if (data.items) {
      videos.push(...data.items);
    }
  }
  
  return videos;
}

async function main() {
  console.log('🎬 Fetching Versmos YouTube data...\n');
  
  // Step 1: Get Channel ID
  console.log('1. Finding channel ID for @versmos...');
  const channelId = await getChannelId();
  
  if (!channelId) {
    console.error('❌ Could not find channel ID. Please check the channel handle.');
    return;
  }
  
  console.log(`✅ Channel ID: ${channelId}\n`);
  
  // Step 2: Fetch all playlists
  console.log('2. Fetching playlists...');
  const playlists = await fetchPlaylists(channelId);
  console.log(`✅ Found ${playlists.length} playlists\n`);
  
  // Step 3: Fetch videos from each playlist
  const allData: any = {
    channel: {
      id: channelId,
      handle: CHANNEL_HANDLE
    },
    playlists: [],
    totalVideos: 0
  };
  
  for (const playlist of playlists) {
    console.log(`3. Fetching videos from "${playlist.snippet.title}"...`);
    const playlistVideos = await fetchPlaylistVideos(playlist.id);
    
    // Get video IDs for detailed info
    const videoIds = playlistVideos.map(v => v.snippet.resourceId.videoId);
    const videoDetails = await fetchVideoDetails(videoIds);
    
    const playlistData = {
      id: playlist.id,
      title: playlist.snippet.title,
      description: playlist.snippet.description,
      thumbnail: playlist.snippet.thumbnails.high?.url || playlist.snippet.thumbnails.medium.url,
      itemCount: playlist.contentDetails.itemCount,
      videos: videoDetails.map((video, index) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnails: {
          default: video.snippet.thumbnails.default.url,
          medium: video.snippet.thumbnails.medium.url,
          high: video.snippet.thumbnails.high.url,
          maxres: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url
        },
        duration: video.contentDetails.duration,
        publishedAt: video.snippet.publishedAt,
        viewCount: parseInt(video.statistics.viewCount),
        likeCount: video.statistics.likeCount ? parseInt(video.statistics.likeCount) : 0,
        commentCount: video.statistics.commentCount ? parseInt(video.statistics.commentCount) : 0,
        tags: video.snippet.tags || [],
        position: playlistVideos[index].snippet.position
      }))
    };
    
    allData.playlists.push(playlistData);
    allData.totalVideos += playlistData.videos.length;
    
    console.log(`✅ Found ${playlistData.videos.length} videos\n`);
  }
  
  // Step 4: Save data to JSON file
  const outputPath = path.join(process.cwd(), 'data', 'youtube-data.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));
  
  console.log('📊 Summary:');
  console.log(`- Channel: @${CHANNEL_HANDLE} (${channelId})`);
  console.log(`- Total Playlists: ${allData.playlists.length}`);
  console.log(`- Total Videos: ${allData.totalVideos}`);
  console.log(`\n✅ Data saved to: ${outputPath}`);
  
  // Print playlist categories for reference
  console.log('\n📁 Playlist Categories:');
  allData.playlists.forEach((playlist: any, index: number) => {
    console.log(`${index + 1}. ${playlist.title} (${playlist.videos.length} videos)`);
  });
}

// Run the script
main().catch(console.error);