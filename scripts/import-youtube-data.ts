import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface YouTubeData {
  channel: {
    id: string;
    handle: string;
  };
  playlists: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    itemCount: number;
    videos: Array<{
      id: string;
      title: string;
      description: string;
      thumbnails: {
        default: string;
        medium: string;
        high: string;
        maxres: string;
      };
      duration: string;
      publishedAt: string;
      viewCount: number;
      likeCount: number;
      commentCount: number;
      tags: string[];
      position: number;
    }>;
  }>;
  totalVideos: number;
}

interface CaseStudyData {
  featuredCaseStudies: Array<{
    videoId: string;
    title: string;
    client: string;
    industry: string;
    keywords: string[];
    searchVolume: number;
    difficulty: string;
    description: string;
    challenge: string;
    solution: string;
    results: Array<{
      metric: string;
      value: string;
      impact: string;
    }>;
    testimonial: {
      quote: string;
      author: string;
      position: string;
      company: string;
    };
    technologies: string[];
    deliverables: string[];
    timeline: string;
    featuredIn: string[];
  }>;
}

// Function to parse ISO 8601 duration to seconds
function parseDuration(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;
  
  const hours = (match[1] ? parseInt(match[1]) : 0);
  const minutes = (match[2] ? parseInt(match[2]) : 0);
  const seconds = (match[3] ? parseInt(match[3]) : 0);
  
  return hours * 3600 + minutes * 60 + seconds;
}

// Function to determine category from playlist title
function determineCategory(playlistTitle: string): string {
  const title = playlistTitle.toLowerCase();
  
  if (title.includes('animation') || title.includes('2d') || title.includes('3d')) {
    return 'Animation';
  } else if (title.includes('motion') || title.includes('graphics')) {
    return 'Motion Graphics';
  } else if (title.includes('vfx') || title.includes('effects') || title.includes('compositing')) {
    return 'VFX';
  } else if (title.includes('commercial') || title.includes('ads') || title.includes('promo')) {
    return 'Commercials';
  } else if (title.includes('real estate') || title.includes('property')) {
    return 'Real Estate';
  } else if (title.includes('product') || title.includes('review')) {
    return 'Product Videos';
  } else if (title.includes('testimonial') || title.includes('interview')) {
    return 'Testimonials';
  } else if (title.includes('social') || title.includes('shorts')) {
    return 'Social Media';
  } else {
    return 'Other';
  }
}

async function importData() {
  console.log('🚀 Starting YouTube data import to Supabase...\n');
  
  // Load YouTube data
  const youtubeDataPath = path.join(process.cwd(), 'data', 'youtube-data.json');
  const caseStudiesPath = path.join(process.cwd(), 'data', 'case-studies.json');
  
  if (!fs.existsSync(youtubeDataPath)) {
    console.error('ERROR: youtube-data.json not found. Run fetch-youtube-data.ts first.');
    return;
  }
  
  const youtubeData: YouTubeData = JSON.parse(fs.readFileSync(youtubeDataPath, 'utf-8'));
  const caseStudiesData: CaseStudyData = fs.existsSync(caseStudiesPath) 
    ? JSON.parse(fs.readFileSync(caseStudiesPath, 'utf-8'))
    : { featuredCaseStudies: [] };
  
  console.log(`📊 Found ${youtubeData.playlists.length} playlists with ${youtubeData.totalVideos} videos`);
  console.log(`📊 Found ${caseStudiesData.featuredCaseStudies.length} case studies\n`);
  
  // Import playlists
  console.log('1. Importing playlists...');
  for (const playlist of youtubeData.playlists) {
    const { error } = await supabase
      .from('youtube_playlists')
      .upsert({
        youtube_playlist_id: playlist.id,
        title: playlist.title,
        description: playlist.description || '',
        thumbnail_url: playlist.thumbnail,
        video_count: playlist.itemCount,
        channel_id: youtubeData.channel.id
      }, {
        onConflict: 'youtube_playlist_id'
      });
      
    if (error) {
      console.error(`❌ Error importing playlist ${playlist.title}:`, error.message);
    } else {
      console.log(`✅ Imported playlist: ${playlist.title}`);
    }
  }
  
  // Import videos
  console.log('\n2. Importing videos...');
  let videoCount = 0;
  for (const playlist of youtubeData.playlists) {
    const category = determineCategory(playlist.title);
    
    for (const video of playlist.videos) {
      const { error } = await supabase
        .from('youtube_videos')
        .upsert({
          youtube_video_id: video.id,
          youtube_playlist_id: playlist.id,
          title: video.title,
          description: video.description || '',
          thumbnail_default: video.thumbnails.default,
          thumbnail_medium: video.thumbnails.medium,
          thumbnail_high: video.thumbnails.high,
          thumbnail_maxres: video.thumbnails.maxres,
          duration_seconds: parseDuration(video.duration),
          published_at: video.publishedAt,
          view_count: video.viewCount,
          like_count: video.likeCount,
          comment_count: video.commentCount,
          tags: video.tags,
          position_in_playlist: video.position,
          category: category,
          is_featured: false // Will update for case study videos
        }, {
          onConflict: 'youtube_video_id'
        });
        
      if (error) {
        console.error(`❌ Error importing video ${video.title}:`, error.message);
      } else {
        videoCount++;
      }
    }
  }
  console.log(`✅ Imported ${videoCount} videos`);
  
  // Import case studies and mark featured videos
  console.log('\n3. Importing case studies...');
  for (const caseStudy of caseStudiesData.featuredCaseStudies) {
    // First, mark the video as featured
    const { error: videoError } = await supabase
      .from('youtube_videos')
      .update({ is_featured: true })
      .eq('youtube_video_id', caseStudy.videoId);
      
    if (videoError) {
      console.error(`❌ Error marking video as featured:`, videoError.message);
    }
    
    // Import case study
    const { error } = await supabase
      .from('case_studies')
      .upsert({
        video_id: caseStudy.videoId,
        client_name: caseStudy.client,
        industry: caseStudy.industry,
        challenge: caseStudy.challenge,
        solution: caseStudy.solution,
        results: caseStudy.results,
        testimonial: caseStudy.testimonial,
        technologies: caseStudy.technologies,
        deliverables: caseStudy.deliverables,
        timeline: caseStudy.timeline,
        keywords: caseStudy.keywords,
        search_volume: caseStudy.searchVolume,
        difficulty: caseStudy.difficulty,
        is_featured: true
      }, {
        onConflict: 'video_id'
      });
      
    if (error) {
      console.error(`❌ Error importing case study for ${caseStudy.title}:`, error.message);
    } else {
      console.log(`✅ Imported case study: ${caseStudy.title}`);
    }
  }
  
  // Get summary statistics
  console.log('\n📊 Import Summary:');
  
  const { count: playlistCount } = await supabase
    .from('youtube_playlists')
    .select('*', { count: 'exact', head: true });
    
  const { count: videoCount2 } = await supabase
    .from('youtube_videos')
    .select('*', { count: 'exact', head: true });
    
  const { count: caseStudyCount } = await supabase
    .from('case_studies')
    .select('*', { count: 'exact', head: true });
    
  const { count: featuredCount } = await supabase
    .from('youtube_videos')
    .select('*', { count: 'exact', head: true })
    .eq('is_featured', true);
  
  console.log(`- Total Playlists: ${playlistCount}`);
  console.log(`- Total Videos: ${videoCount2}`);
  console.log(`- Featured Videos: ${featuredCount}`);
  console.log(`- Case Studies: ${caseStudyCount}`);
  
  console.log('\n✅ YouTube data import completed!');
  console.log('\n🎯 Next steps:');
  console.log('1. Run the development server: npm run dev');
  console.log('2. Visit http://localhost:3002 to see dynamic content');
  console.log('3. Check the portfolio page for all videos');
  console.log('4. Visit case study pages for SEO-optimized content');
}

// Run the import
importData().catch(console.error);