"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  thumbnail?: string;
  autoplay?: boolean;
  showControls?: boolean;
  className?: string;
}

export default function YouTubeEmbed({ 
  videoId, 
  title = "Video",
  thumbnail,
  autoplay = false,
  showControls = true,
  className = ""
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract video ID from various YouTube URL formats
  const extractVideoId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([^&\n?#]+)$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return url;
  };

  const cleanVideoId = extractVideoId(videoId);
  const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=${showControls ? 1 : 0}${autoplay ? '&autoplay=1' : ''}`;
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;

  return (
    <div className={`relative aspect-video bg-black rounded-xl overflow-hidden ${className}`}>
      {!isLoaded && (
        <>
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              onClick={() => setIsLoaded(true)}
              className="group relative"
              aria-label="Play video"
            >
              <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <Play className="w-8 h-8 text-brand-cyan ml-1" fill="currentColor" />
              </div>
            </button>
          </div>
        </>
      )}
      
      {isLoaded && (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
}