// YouTube Data API utilities for fetching playlists and videos
// Note: This is a placeholder structure. In production, you'll need a YouTube API key

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  playlistId: string;
  playlistTitle: string;
}

// Sample data structure based on Versmos YouTube channel
// In production, replace with actual API calls
export const samplePlaylists: YouTubePlaylist[] = [
  {
    id: "PL1",
    title: "Product Videos",
    description: "Showcase of product launch videos and demonstrations",
    thumbnail: "https://img.youtube.com/vi/default/maxresdefault.jpg",
    itemCount: 12
  },
  {
    id: "PL2",
    title: "Motion Graphics & Animation",
    description: "2D/3D animations and motion graphics projects",
    thumbnail: "https://img.youtube.com/vi/default/maxresdefault.jpg",
    itemCount: 18
  },
  {
    id: "PL3",
    title: "VFX & Compositing",
    description: "Visual effects and compositing showreel",
    thumbnail: "https://img.youtube.com/vi/default/maxresdefault.jpg",
    itemCount: 8
  },
  {
    id: "PL4",
    title: "Social Media Content",
    description: "Short-form content for social media platforms",
    thumbnail: "https://img.youtube.com/vi/default/maxresdefault.jpg",
    itemCount: 25
  },
  {
    id: "PL5",
    title: "Testimonial Videos",
    description: "Client testimonials and success stories",
    thumbnail: "https://img.youtube.com/vi/default/maxresdefault.jpg",
    itemCount: 10
  },
  {
    id: "PL6",
    title: "Real Estate Videos",
    description: "Property tours and real estate marketing videos",
    thumbnail: "https://img.youtube.com/vi/default/maxresdefault.jpg",
    itemCount: 15
  }
];

// Sample video data for case studies
export const sampleVideos: YouTubeVideo[] = [
  {
    id: "video1",
    title: "AI Voice Generator - Revolutionary Product Launch",
    description: "Cutting-edge AI voice generation technology showcase featuring real-time voice synthesis, multiple language support, and seamless integration capabilities.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    publishedAt: "2024-01-15",
    playlistId: "PL1",
    playlistTitle: "Product Videos"
  },
  {
    id: "video2",
    title: "Luxury Villa Virtual Tour - Beachfront Paradise",
    description: "Immersive 4K virtual tour of a premium beachfront villa featuring drone footage, interior walkthroughs, and lifestyle visualization.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    publishedAt: "2024-02-20",
    playlistId: "PL6",
    playlistTitle: "Real Estate Videos"
  },
  {
    id: "video3",
    title: "Tech Startup Brand Animation - From Concept to Launch",
    description: "Complete brand identity animation package including logo reveal, explainer videos, and social media motion graphics.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    publishedAt: "2024-03-10",
    playlistId: "PL2",
    playlistTitle: "Motion Graphics & Animation"
  }
];

// Function to fetch playlists (placeholder for actual API implementation)
export async function fetchYouTubePlaylists(): Promise<YouTubePlaylist[]> {
  // In production, implement actual YouTube API call here
  // const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&key=${API_KEY}`);
  return samplePlaylists;
}

// Function to fetch videos from a playlist
export async function fetchPlaylistVideos(playlistId: string): Promise<YouTubeVideo[]> {
  // In production, implement actual YouTube API call here
  return sampleVideos.filter(video => video.playlistId === playlistId);
}

// Function to categorize videos by playlist
export async function categorizeVideosByPlaylist(): Promise<Map<string, YouTubeVideo[]>> {
  const videosByPlaylist = new Map<string, YouTubeVideo[]>();
  
  for (const playlist of samplePlaylists) {
    const videos = await fetchPlaylistVideos(playlist.id);
    videosByPlaylist.set(playlist.title, videos);
  }
  
  return videosByPlaylist;
}