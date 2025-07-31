"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Play, LucideIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import VideoModal from "@/components/VideoModal";

interface ServicePageProps {
  title: string;
  subtitle?: string;
  description: string;
  features: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  benefits?: string[];
  category?: string; // For filtering videos
}

interface Video {
  id: string;
  youtube_video_id: string;
  title: string;
  description: string;
  thumbnail_high: string;
  duration_seconds: number;
  view_count: number;
  category: string;
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  features,
  benefits,
  category
}: ServicePageProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function loadVideos() {
      try {
        let query = supabase
          .from('youtube_videos')
          .select('*')
          .order('view_count', { ascending: false })
          .limit(6);

        // Filter by category if provided
        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;
        if (error) throw error;
        setVideos(data || []);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, [supabase, category]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  {title}
                  {subtitle && <span className="text-brand-cyan block">{subtitle}</span>}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-lg hover:bg-brand-cyan transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-brand-cyan hover:text-brand-cyan transition-all duration-300"
                  >
                    View Portfolio
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="relative aspect-video bg-gradient-to-br from-brand-cyan/10 to-brand-cyan/5 rounded-2xl overflow-hidden shadow-2xl">
                  {videos[0]?.thumbnail_high ? (
                    <>
                      <Image
                        src={videos[0].thumbnail_high}
                        alt={videos[0].title}
                        fill
                        className="object-cover"
                      />
                      <div 
                        className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors"
                        onClick={() => setSelectedVideo(videos[0])}
                      >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Play className="w-8 h-8 text-brand-cyan ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                          <Play className="w-8 h-8 text-brand-cyan ml-1" fill="currentColor" />
                        </div>
                        <p className="text-gray-500">View Our Work</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What We Offer
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive services ensure your project gets the professional treatment it deserves.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-brand-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        {benefits && benefits.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                  Why Choose Our Services
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Portfolio Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Recent Work
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our latest projects and see the quality we deliver.
              </p>
            </motion.div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-video rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : videos.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-brand-cyan transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {video.category || 'Video'}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No videos available in this category yet.</p>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center mt-4 px-6 py-3 bg-brand-darkest text-white font-semibold rounded-lg hover:bg-brand-cyan transition-colors"
                >
                  View All Portfolio
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-darkest to-brand-dark">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <h2 className="text-4xl font-bold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Let&#39;s discuss how we can bring your vision to life with our professional services.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-darkest font-semibold rounded-lg hover:bg-brand-cyan hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Get a Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
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