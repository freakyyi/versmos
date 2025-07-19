"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import VideoModal from "@/components/VideoModal";

interface Video {
  id: string;
  youtube_video_id: string;
  title: string;
  description: string;
  thumbnail_high: string;
  view_count: number;
  duration_seconds: number;
  category: string;
  youtube_playlists: {
    title: string;
  } | null;
}

export default function FeaturedVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchFeaturedVideos() {
      try {
        const { data, error } = await supabase
          .from('youtube_videos')
          .select(`
            id,
            youtube_video_id,
            title,
            description,
            thumbnail_high,
            view_count,
            duration_seconds,
            category,
            youtube_playlists:youtube_playlists!youtube_playlist_id (
              title
            )
          `)
          .eq('is_featured', true)
          .order('view_count', { ascending: false })
          .limit(6);
        
        if (error) throw error;
        
        // Process the data to handle the playlist relationship
        const processedVideos = (data || []).map(video => ({
          ...video,
          youtube_playlists: Array.isArray(video.youtube_playlists) 
            ? video.youtube_playlists[0] || null
            : video.youtube_playlists
        }));
        
        setVideos(processedVideos);
      } catch (error) {
        console.error('Error fetching featured videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedVideos();
  }, [supabase]);

  // Format duration from seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format view count
  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-video rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No featured videos available.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group cursor-pointer"
          onClick={() => setSelectedVideo(video)}
        >
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
            {video.thumbnail_high && (
              <Image
                src={video.thumbnail_high}
                alt={video.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-8 h-8 text-brand-darkest ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {formatDuration(video.duration_seconds)}
            </div>
          </div>
          
          <div>
            <span className="text-xs text-brand-cyan font-semibold uppercase tracking-wider">
              {video.category?.replace('-', ' ') || 'Video'}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatViews(video.view_count)} views</span>
              {video.youtube_playlists?.title && <span>{video.youtube_playlists.title}</span>}
            </div>
          </div>
        </motion.div>
      ))}
      </div>
      
      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoId={selectedVideo.youtube_video_id}
          title={selectedVideo.title}
        />
      )}
    </>
  );
}