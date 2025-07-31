"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Target, TrendingUp, DollarSign, Users } from "lucide-react";
import ServiceVideos from "@/components/ServiceVideos";
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
}

export default function FacebookVideoAdsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchVideos() {
      try {
        const { data, error } = await supabase
          .from('youtube_videos')
          .select(`
            id,
            youtube_video_id,
            title,
            description,
            thumbnail_high,
            duration_seconds,
            view_count,
            youtube_playlists!inner(title)
          `)
          .eq('youtube_playlists.title', 'Facebook Service/Product Video Ads')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setVideos(data || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [supabase]);

  const benefits = [
    {
      icon: Target,
      title: "Targeted Messaging",
      description: "Ads crafted to resonate with your specific Facebook audience"
    },
    {
      icon: TrendingUp,
      title: "Higher Conversions",
      description: "Video ads that drive clicks, leads, and sales"
    },
    {
      icon: DollarSign,
      title: "ROI Focused",
      description: "Designed to maximize your advertising spend effectiveness"
    },
    {
      icon: Users,
      title: "Audience Engagement",
      description: "Compelling content that stops the scroll and captures attention"
    }
  ];

  const adFormats = [
    {
      format: "Feed Videos",
      specs: "4:5 or 1:1 ratio, 15-60 seconds",
      best: "Product showcases, brand stories"
    },
    {
      format: "Stories Ads",
      specs: "9:16 vertical, 5-15 seconds",
      best: "Quick promotions, flash sales"
    },
    {
      format: "Reels Ads",
      specs: "9:16 vertical, up to 60 seconds",
      best: "Entertaining, trend-based content"
    },
    {
      format: "Collection Ads",
      specs: "Multiple products, instant experience",
      best: "E-commerce, product catalogs"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Facebook Service/Product <span className="text-brand-cyan">Video Ads</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                High-converting Facebook video ads that showcase your products and services. 
                Drive sales with compelling visual storytelling optimized for the Facebook platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-sm hover:bg-brand-cyan transition-all duration-300"
                >
                  Create Your Video Ad
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-sm hover:border-brand-cyan hover:text-brand-cyan transition-all duration-300"
                >
                  View Ad Examples
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Facebook Ads That Convert
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic video content designed for Facebook&apos;s unique audience and algorithms
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-brand-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Facebook Video Ad Portfolio
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Successful video ad campaigns we&apos;ve created for businesses
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
              <ServiceVideos videos={videos} onVideoClick={setSelectedVideo} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No videos available in this category yet.</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-sm hover:bg-brand-cyan transition-all duration-300"
              >
                View Full Portfolio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Ad Formats Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Facebook Ad Formats We Create
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Optimized for every placement and objective
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {adFormats.map((format, index) => (
                <motion.div
                  key={format.format}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{format.format}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Specs:</span> {format.specs}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Best for:</span> {format.best}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-darkest">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Boost Your Facebook Sales?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Let&apos;s create video ads that convert viewers into customers
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-cyan text-white font-semibold rounded-sm hover:bg-brand-cyan/90 transition-all duration-300"
              >
                Start Your Campaign
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