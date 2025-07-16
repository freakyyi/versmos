import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const searchParams = request.nextUrl.searchParams
    
    // Build base query
    let query = supabase
      .from('youtube_videos')
      .select(`
        *,
        playlist:youtube_playlists(*)
      `)
    
    // Add filters
    const playlistId = searchParams.get('playlist_id')
    if (playlistId) {
      query = query.eq('playlist_id', playlistId)
    }
    
    const featured = searchParams.get('featured')
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }
    
    const search = searchParams.get('search')
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }
    
    // Sorting
    const sortBy = searchParams.get('sort_by') || 'display_order'
    const sortOrder = searchParams.get('sort_order') || 'asc'
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    query = query.range(from, to)
    
    // Execute query
    const { data, error, count } = await query
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch videos', details: error.message },
        { status: 500 }
      )
    }
    
    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('youtube_videos')
      .select('*', { count: 'exact', head: true })
    
    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit)
      }
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}