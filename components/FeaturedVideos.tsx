"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Video {
  id: string;
  youtube_video_id: string;
  title: string;
  description: string;
  thumbnail_high: string;
  view_count: number;
  duration: string;
  playlist: {
    title: string;
    category: string;
  };
}

export default function FeaturedVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
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
            duration,
            playlist:youtube_playlists(title, category)
          `)
          .eq('is_featured', true)
          .order('view_count', { ascending: false })
          .limit(6);

        if (error) throw error;
        setVideos(data || []);
      } catch (error) {
        console.error('Error fetching featured videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedVideos();
  }, [supabase]);

  // Format duration from ISO 8601
  const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    if (!match) return duration;
    
    const minutes = match[1] ? parseInt(match[1]) : 0;
    const seconds = match[2] ? parseInt(match[2]) : 0;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
            <Image
              src={video.thumbnail_high || '/api/placeholder/600/400'}
              alt={video.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Link
                href={`https://youtube.com/watch?v=${video.youtube_video_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300"
              >
                <Play className="w-8 h-8 text-brand-darkest ml-1" fill="currentColor" />
              </Link>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {formatDuration(video.duration)}
            </div>
          </div>
          
          <div>
            <span className="text-xs text-brand-cyan font-semibold uppercase tracking-wider">
              {video.playlist?.category?.replace('-', ' ')}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatViews(video.view_count)} views</span>
              <span>{video.playlist?.title}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}