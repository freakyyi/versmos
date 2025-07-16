import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const searchParams = request.nextUrl.searchParams
    
    // Build query
    let query = supabase
      .from('youtube_playlists')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
    
    // Add category filter if provided
    const category = searchParams.get('category')
    if (category) {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch playlists', details: error.message },
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