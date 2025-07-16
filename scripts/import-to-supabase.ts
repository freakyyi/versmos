import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Initialize Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Load data files
const youtubeDataPath = path.join(process.cwd(), 'data', 'youtube-data.json')
const caseStudiesPath = path.join(process.cwd(), 'data', 'case-studies.json')

const youtubeData = JSON.parse(fs.readFileSync(youtubeDataPath, 'utf-8'))
const caseStudies = JSON.parse(fs.readFileSync(caseStudiesPath, 'utf-8'))

// Category mapping
const categoryMapping: { [key: string]: string } = {
  'Long-form Content Video Edits': 'video-editing',
  'Social Media Post Animations': 'social-media',
  'VFX & Compositing': 'vfx-compositing',
  'Facebook Service/Product Video Ads -': 'product-videos',
  'Twitch, Kick, Facebook - Streaming Essentials': 'streaming-content',
  'Testimonial Edits, YouTube Shorts, Instagram & Tiktok Reels': 'testimonials',
  '2D Explainers / Motion Graphics': 'motion-graphics',
  'Logo Animations': 'brand-animation'
}

async function importPlaylists() {
  console.log('📁 Importing playlists...')
  
  const playlistsToInsert = youtubeData.playlists.map((playlist: any, index: number) => ({
    youtube_playlist_id: playlist.id,
    title: playlist.title,
    description: playlist.description || null,
    thumbnail_url: playlist.thumbnail,
    item_count: playlist.itemCount,
    category: categoryMapping[playlist.title] || 'general',
    display_order: index,
    is_active: true
  }))
  
  const { data, error } = await supabase
    .from('youtube_playlists')
    .insert(playlistsToInsert)
    .select()
  
  if (error) {
    console.error('❌ Error importing playlists:', error)
    return null
  }
  
  console.log(`✅ Imported ${data.length} playlists`)
  return data
}

async function importVideos(playlists: any[]) {
  console.log('🎬 Importing videos...')
  
  let totalVideos = 0
  
  for (const dbPlaylist of playlists) {
    const sourcePlaylist = youtubeData.playlists.find(
      (p: any) => p.id === dbPlaylist.youtube_playlist_id
    )
    
    if (!sourcePlaylist) continue
    
    const videosToInsert = sourcePlaylist.videos.map((video: any) => ({
      youtube_video_id: video.id,
      playlist_id: dbPlaylist.id,
      title: video.title,
      description: video.description || null,
      thumbnail_default: video.thumbnails.default,
      thumbnail_medium: video.thumbnails.medium,
      thumbnail_high: video.thumbnails.high,
      thumbnail_maxres: video.thumbnails.maxres,
      duration: video.duration,
      published_at: video.publishedAt,
      view_count: video.viewCount,
      like_count: video.likeCount,
      comment_count: video.commentCount,
      tags: video.tags || [],
      is_featured: video.viewCount > 10000, // Feature videos with 10k+ views
      display_order: video.position
    }))
    
    const { data, error } = await supabase
      .from('youtube_videos')
      .insert(videosToInsert)
      .select()
    
    if (error) {
      console.error(`❌ Error importing videos for ${sourcePlaylist.title}:`, error)
      continue
    }
    
    totalVideos += data.length
    console.log(`  ✅ Imported ${data.length} videos for ${sourcePlaylist.title}`)
  }
  
  console.log(`✅ Total videos imported: ${totalVideos}`)
  
  // Get all videos for case study mapping
  const { data: allVideos } = await supabase
    .from('youtube_videos')
    .select('*')
  
  return allVideos
}

async function importCaseStudies(videos: any[]) {
  console.log('📝 Importing case studies...')
  
  const caseStudiesToInsert = caseStudies.map((cs: any) => {
    // Find the corresponding video in the database
    const video = videos.find(v => v.youtube_video_id === cs.video_id)
    
    if (!video) {
      console.warn(`⚠️  Video not found for case study: ${cs.title}`)
      return null
    }
    
    return {
      video_id: video.id,
      slug: cs.slug,
      title: cs.title,
      meta_title: cs.meta_title,
      meta_description: cs.meta_description,
      hero_image: cs.hero_image,
      thumbnail_card: cs.thumbnail_card,
      thumbnail_social: cs.thumbnail_social,
      client_name: cs.client_name,
      client_testimonial: cs.client_testimonial,
      challenge: cs.challenge,
      approach: cs.approach,
      technical_details: cs.technical_details,
      results: cs.results,
      key_takeaways: cs.key_takeaways,
      metric_views: cs.metric_views,
      metric_engagement: cs.metric_engagement,
      primary_keyword: cs.primary_keyword,
      secondary_keywords: cs.secondary_keywords,
      long_tail_keywords: cs.long_tail_keywords,
      status: 'published',
      is_featured: true,
      published_at: new Date().toISOString()
    }
  }).filter(Boolean)
  
  const { data, error } = await supabase
    .from('case_studies')
    .insert(caseStudiesToInsert)
    .select()
  
  if (error) {
    console.error('❌ Error importing case studies:', error)
    return
  }
  
  console.log(`✅ Imported ${data.length} case studies`)
}

async function importCategories() {
  console.log('🏷️  Importing video categories...')
  
  const categories = [
    { name: 'Video Editing & Production', slug: 'video-editing', icon: '🎬', color: '#25A3AB', display_order: 1 },
    { name: 'Product Videos', slug: 'product-videos', icon: '📦', color: '#5A636A', display_order: 2 },
    { name: 'Motion Graphics', slug: 'motion-graphics', icon: '✨', color: '#2D4A53', display_order: 3 },
    { name: 'VFX & Compositing', slug: 'vfx-compositing', icon: '🎨', color: '#69818D', display_order: 4 },
    { name: 'Social Media Content', slug: 'social-media', icon: '📱', color: '#132E35', display_order: 5 },
    { name: 'Testimonials', slug: 'testimonials', icon: '💬', color: '#0D1F23', display_order: 6 },
    { name: 'Brand Animation', slug: 'brand-animation', icon: '🚀', color: '#25A3AB', display_order: 7 },
    { name: 'Streaming Content', slug: 'streaming-content', icon: '🎮', color: '#5A636A', display_order: 8 }
  ]
  
  const { data, error } = await supabase
    .from('video_categories')
    .insert(categories)
    .select()
  
  if (error) {
    console.error('❌ Error importing categories:', error)
    return
  }
  
  console.log(`✅ Imported ${data.length} categories`)
}

async function main() {
  console.log('🚀 Starting Supabase data import...\n')
  
  // Check connection
  const { data: test, error: testError } = await supabase
    .from('youtube_playlists')
    .select('count')
    .limit(1)
  
  if (testError) {
    console.error('❌ Failed to connect to Supabase:', testError)
    console.log('\n📋 Please ensure:')
    console.log('1. Supabase project is created')
    console.log('2. Environment variables are set in .env.local')
    console.log('3. Database schema is created (run the SQL from /lib/supabase-schema.sql)')
    return
  }
  
  console.log('✅ Successfully connected to Supabase\n')
  
  try {
    // Import in order
    await importCategories()
    const playlists = await importPlaylists()
    
    if (playlists) {
      const videos = await importVideos(playlists)
      
      if (videos) {
        await importCaseStudies(videos)
      }
    }
    
    console.log('\n✅ Data import completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- Playlists: ${youtubeData.playlists.length}`)
    console.log(`- Videos: ${youtubeData.totalVideos}`)
    console.log(`- Case Studies: ${caseStudies.length}`)
    
  } catch (error) {
    console.error('\n❌ Import failed:', error)
  }
}

// Run the import
main()