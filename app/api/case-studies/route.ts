import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const searchParams = request.nextUrl.searchParams
    
    // Build base query
    let query = supabase
      .from('case_studies')
      .select(`
        *,
        video:youtube_videos(
          *,
          playlist:youtube_playlists(*)
        )
      `)
      .eq('status', 'published')
    
    // Add filters
    const featured = searchParams.get('featured')
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }
    
    const category = searchParams.get('category')
    if (category) {
      // This requires a join through videos table
      query = query.eq('video.playlist.category', category)
    }
    
    const limit = parseInt(searchParams.get('limit') || '10')
    query = query.limit(limit)
    
    // Sort by published date
    query = query.order('published_at', { ascending: false })
    
    const { data, error } = await query
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch case studies', details: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ data })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}