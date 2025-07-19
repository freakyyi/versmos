"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SupabaseTest() {
  const [result, setResult] = useState<{
    totalVideos: number;
    featuredVideos: number;
    withPlaylistInfo: unknown;
    sampleVideo: unknown;
  } | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testConnection() {
      const supabase = createClient();
      
      try {
        // Test 1: Simple query to check if table exists
        console.log("Testing basic query...");
        const { data: videos, error: videosError } = await supabase
          .from('youtube_videos')
          .select('id, title, is_featured')
          .limit(5);
        
        if (videosError) {
          console.error("Videos query error:", videosError);
          setError(videosError);
          return;
        }
        
        console.log("Videos found:", videos);
        
        // Test 2: Check for featured videos
        const { data: featured, error: featuredError } = await supabase
          .from('youtube_videos')
          .select('*')
          .eq('is_featured', true)
          .limit(3);
          
        if (featuredError) {
          console.error("Featured query error:", featuredError);
          setError(featuredError);
          return;
        }
        
        console.log("Featured videos:", featured);
        
        // Test 3: Test join with playlists
        const { data: withPlaylist, error: joinError } = await supabase
          .from('youtube_videos')
          .select(`
            id,
            title,
            youtube_playlist_id,
            youtube_playlists (
              title,
              youtube_playlist_id
            )
          `)
          .limit(3);
          
        if (joinError) {
          console.error("Join query error:", joinError);
          setError(joinError);
          return;
        }
        
        console.log("Videos with playlists:", withPlaylist);
        
        setResult({
          totalVideos: videos?.length || 0,
          featuredVideos: featured?.length || 0,
          withPlaylistInfo: withPlaylist,
          sampleVideo: videos?.[0]
        });
        
      } catch (err) {
        console.error("Test error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    
    testConnection();
  }, []);

  if (loading) return <div className="p-4">Testing Supabase connection...</div>;
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-bold mb-2">Supabase Error</h3>
        <pre className="text-xs text-red-600 overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-green-800 font-bold mb-2">Supabase Connection Success</h3>
      <pre className="text-xs text-green-600 overflow-auto">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}