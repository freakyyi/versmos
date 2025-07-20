"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play, Grid, List } from "lucide-react";
import VideoModal from "@/components/VideoModal";
import { createClient } from "@/lib/supabase/client";

interface Video {
  id: string;
  youtube_video_id: string;
  title: string;
  description: string;
  thumbnail_high: string;
  duration_seconds: number;
  view_count: number;
  category: string;
  youtube_playlists: {
    title: string;
  } | null;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadPortfolio() {
      try {
        // Fetch all videos
        const { data: videosData, error: videosError } = await supabase
          .from('youtube_videos')
          .select(`
            id,
            youtube_video_id,
            title,
            description,
            thumbnail_high,
            duration_seconds,
            view_count,
            category,
            youtube_playlists:youtube_playlists!youtube_playlist_id (
              title
            )
          `)
          .order('published_at', { ascending: false });

        if (videosError) throw videosError;
        
        // Process the data to handle the playlist relationship
        const processedVideos = (videosData || []).map(video => ({
          ...video,
          youtube_playlists: Array.isArray(video.youtube_playlists) 
            ? video.youtube_playlists[0] || null
            : video.youtube_playlists
        }));
        
        setVideos(processedVideos);

        // Calculate categories from actual data
        const categoryMap = new Map<string, number>();
        categoryMap.set('all', processedVideos.length);
        
        processedVideos.forEach(video => {
          const cat = video.category || 'Other';
          categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
        });

        // Category display names
        const categoryDisplayNames: Record<string, string> = {
          'all': 'All Works',
          'video-editing-vfx': 'Video Editing & VFX',
          'social-media-designs': 'Social Media Designs',
          'motion-graphics': 'Motion Graphics',
          'product-videos': 'Product Videos',
          'testimonial-videos': 'Testimonial Videos',
          '2d-animation': '2D Animation',
          '3d-animation': '3D Animation'
        };

        // Convert to categories array
        const categoriesArray: Category[] = Array.from(categoryMap.entries())
          .map(([name, count]) => ({
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name: categoryDisplayNames[name] || name,
            count
          }))
          .sort((a, b) => {
            if (a.id === 'all') return -1;
            if (b.id === 'all') return 1;
            return b.count - a.count;
          });

        setCategories(categoriesArray);
      } catch (error) {
        console.error('Error loading portfolio:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, [supabase]);

  // Filter videos by category
  const filteredVideos = selectedCategory === "all"
    ? videos
    : videos.filter(video => 
        (video.category || 'other').toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );

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
      <div className="min-h-screen pt-40 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 aspect-video rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen pt-40 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 fhd:px-20 max-w-10xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Explore our diverse collection of video projects, from product launches to brand stories.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-brand-darkest text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? 'bg-white text-brand-darkest shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? 'bg-white text-brand-darkest shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid/List */}
          {viewMode === "grid" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 fhd:grid-cols-5 2k:grid-cols-6 gap-4 sm:gap-6 lg:gap-8"
            >
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-brand-cyan transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {video.youtube_playlists?.title || video.category || 'Video'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatViews(video.view_count)} views
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="relative w-full lg:w-80 aspect-video bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {video.thumbnail_high && (
                        <Image
                          src={video.thumbnail_high}
                          alt={video.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 320px"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-6 h-6 text-brand-darkest ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(video.duration_seconds)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-cyan transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-medium">
                          {video.youtube_playlists?.title || video.category || 'Video'}
                        </span>
                        <span>{formatViews(video.view_count)} views</span>
                        <span>{formatDuration(video.duration_seconds)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No videos found in this category.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {filteredVideos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-lg hover:bg-brand-cyan transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Discuss Your Project
              </Link>
            </motion.div>
          )}
        </div>
      </main>

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