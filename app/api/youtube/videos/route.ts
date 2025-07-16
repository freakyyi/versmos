import { NextRequest, NextResponse } from 'next/server';
import { YouTubeVideo, VideoFilters } from '@/types/youtube';

// Sample data for now - replace with Supabase queries
const sampleVideos: YouTubeVideo[] = [
  {
    id: "1",
    youtube_video_id: "dQw4w9WgXcQ",
    playlist_id: "PL1",
    title: "AI Voice Generator - Revolutionary Product Launch",
    description: "Cutting-edge AI voice generation technology showcase featuring real-time voice synthesis, multiple language support, and seamless integration capabilities.",
    thumbnail_default: "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
    thumbnail_medium: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    thumbnail_high: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    thumbnail_maxres: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "3:12",
    published_at: "2024-01-15T10:00:00Z",
    view_count: 2100000,
    like_count: 45000,
    comment_count: 3200,
    tags: ["AI", "voice generator", "product launch", "technology"],
    is_featured: true,
    display_order: 1,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    youtube_video_id: "L_jWHffIx5E",
    playlist_id: "PL6",
    title: "Luxury Villa Virtual Tour - Beachfront Paradise",
    description: "Immersive 4K virtual tour of a premium beachfront villa featuring drone footage, interior walkthroughs, and lifestyle visualization.",
    thumbnail_default: "https://img.youtube.com/vi/L_jWHffIx5E/default.jpg",
    thumbnail_medium: "https://img.youtube.com/vi/L_jWHffIx5E/mqdefault.jpg",
    thumbnail_high: "https://img.youtube.com/vi/L_jWHffIx5E/hqdefault.jpg",
    thumbnail_maxres: "https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg",
    duration: "4:45",
    published_at: "2024-02-20T10:00:00Z",
    view_count: 850000,
    like_count: 12000,
    comment_count: 890,
    tags: ["real estate", "luxury villa", "virtual tour", "beachfront property"],
    is_featured: true,
    display_order: 2,
    created_at: "2024-02-20T10:00:00Z",
    updated_at: "2024-02-20T10:00:00Z"
  },
  {
    id: "3",
    youtube_video_id: "9bZkp7q19f0",
    playlist_id: "PL2",
    title: "Tech Startup Brand Animation - From Concept to Launch",
    description: "Complete brand identity animation package including logo reveal, explainer videos, and social media motion graphics.",
    thumbnail_default: "https://img.youtube.com/vi/9bZkp7q19f0/default.jpg",
    thumbnail_medium: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
    thumbnail_high: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
    thumbnail_maxres: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    duration: "2:30",
    published_at: "2024-03-10T10:00:00Z",
    view_count: 620000,
    like_count: 8500,
    comment_count: 420,
    tags: ["brand animation", "motion graphics", "startup", "logo reveal"],
    is_featured: false,
    display_order: 3,
    created_at: "2024-03-10T10:00:00Z",
    updated_at: "2024-03-10T10:00:00Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse filters
    const filters: VideoFilters = {
      category: searchParams.get('category') || undefined,
      playlist_id: searchParams.get('playlist_id') || undefined,
      is_featured: searchParams.get('featured') === 'true' ? true : undefined,
      search: searchParams.get('search') || undefined,
    };
    
    // Filter videos based on criteria
    let filteredVideos = [...sampleVideos];
    
    if (filters.is_featured !== undefined) {
      filteredVideos = filteredVideos.filter(v => v.is_featured === filters.is_featured);
    }
    
    if (filters.playlist_id) {
      filteredVideos = filteredVideos.filter(v => v.playlist_id === filters.playlist_id);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredVideos = filteredVideos.filter(v => 
        v.title.toLowerCase().includes(searchLower) ||
        v.description?.toLowerCase().includes(searchLower) ||
        v.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort by display order
    filteredVideos.sort((a, b) => a.display_order - b.display_order);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedVideos = filteredVideos.slice(startIndex, endIndex);
    
    return NextResponse.json({
      data: paginatedVideos,
      pagination: {
        page,
        limit,
        total: filteredVideos.length,
        totalPages: Math.ceil(filteredVideos.length / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

// POST endpoint for creating/updating videos (admin only)
export async function POST(request: NextRequest) {
  try {
    // In production, add authentication check here
    const body = await request.json();
    
    // Validate required fields
    if (!body.youtube_video_id || !body.title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In production, save to Supabase
    // const { data, error } = await supabase
    //   .from('youtube_videos')
    //   .insert(body)
    //   .select()
    //   .single();
    
    return NextResponse.json({
      message: 'Video created successfully',
      data: { ...body, id: Date.now().toString() }
    });
    
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}