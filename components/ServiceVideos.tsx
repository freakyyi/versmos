"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Clock, Eye } from "lucide-react";

interface Video {
  id: string;
  youtube_video_id: string;
  title: string;
  description: string;
  thumbnail_high: string;
  duration_seconds: number;
  view_count: number;
}

interface ServiceVideosProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

export default function ServiceVideos({ videos, onVideoClick }: ServiceVideosProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group cursor-pointer"
          onClick={() => onVideoClick(video)}
        >
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
            <Image
              src={video.thumbnail_high}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
              </div>
            </div>
            
            {/* Duration Badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {formatDuration(video.duration_seconds)}
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-cyan transition-colors">
              {video.title}
            </h3>
            
            {video.description && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {video.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViewCount(video.view_count)} views
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(video.duration_seconds)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}