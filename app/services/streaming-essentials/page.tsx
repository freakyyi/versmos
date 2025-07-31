"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Twitch, Youtube, Wifi, Monitor } from "lucide-react";
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

export default function StreamingEssentialsPage() {
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
          .eq('youtube_playlists.title', 'Twitch, Kick, Facebook - Streaming Essentials')
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
      icon: Twitch,
      title: "Professional Overlays",
      description: "Custom overlays that match your brand and streaming style"
    },
    {
      icon: Youtube,
      title: "Multi-Platform Ready",
      description: "Works seamlessly on Twitch, YouTube, Facebook, and Kick"
    },
    {
      icon: Monitor,
      title: "Interactive Elements",
      description: "Alerts, notifications, and animations that engage viewers"
    },
    {
      icon: Wifi,
      title: "Stream-Ready Assets",
      description: "Optimized for low latency and high performance"
    }
  ];

  const streamingPackages = [
    {
      name: "Starter Pack",
      features: [
        "Basic overlay design",
        "Starting/Ending screens",
        "Simple alerts",
        "Basic transitions"
      ]
    },
    {
      name: "Pro Streamer",
      features: [
        "Custom animated overlay",
        "Full scene package",
        "Advanced alerts & notifications",
        "Custom transitions",
        "Animated webcam frame"
      ]
    },
    {
      name: "Ultimate Bundle",
      features: [
        "Everything in Pro",
        "Custom emotes",
        "Sub badges",
        "Panel designs",
        "Full brand package"
      ]
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
                Streaming <span className="text-brand-cyan">Essentials</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Professional overlays, alerts, and graphics for Twitch, YouTube, Facebook, and Kick streamers. 
                Stand out from the crowd with custom streaming assets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-sm hover:bg-brand-cyan transition-all duration-300"
                >
                  Get Your Stream Package
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-sm hover:border-brand-cyan hover:text-brand-cyan transition-all duration-300"
                >
                  View Examples
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
                Level Up Your Stream
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional streaming graphics that help you build your brand
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
                Streaming Graphics Portfolio
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Custom overlays and graphics we&apos;ve created for content creators
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
            ) : (
              <ServiceVideos videos={videos} onVideoClick={setSelectedVideo} />
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

        {/* Packages Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Streaming Packages
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose a package that fits your streaming needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {streamingPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{pkg.name}</h3>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="block text-center py-3 bg-brand-darkest text-white font-semibold rounded-sm hover:bg-brand-cyan transition-colors"
                  >
                    Get Started
                  </Link>
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
                Ready to Professional Your Stream?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Let&apos;s create streaming graphics that help you stand out and grow your audience
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-cyan text-white font-semibold rounded-sm hover:bg-brand-cyan/90 transition-all duration-300"
              >
                Start Your Project
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