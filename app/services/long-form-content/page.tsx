"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Film, Clock, Edit, Headphones } from "lucide-react";
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

export default function LongFormContentPage() {
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
          .eq('youtube_playlists.title', 'Long-form Content Video Edits')
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
      icon: Film,
      title: "Professional Editing",
      description: "Expert editing for documentaries, podcasts, and educational content"
    },
    {
      icon: Clock,
      title: "Engaging Pacing",
      description: "Keep viewers engaged throughout long-form content"
    },
    {
      icon: Edit,
      title: "Story Structure",
      description: "Crafting compelling narratives that hold attention"
    },
    {
      icon: Headphones,
      title: "Audio Excellence",
      description: "Professional audio mixing and enhancement"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Content Analysis",
      description: "We review your raw footage and understand your vision"
    },
    {
      step: "02",
      title: "Story Development",
      description: "Structure your content for maximum impact and engagement"
    },
    {
      step: "03",
      title: "Professional Editing",
      description: "Cut, color grade, and enhance your content"
    },
    {
      step: "04",
      title: "Final Polish",
      description: "Add graphics, transitions, and finishing touches"
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
                Long-form Content <span className="text-brand-cyan">Video Edits</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Professional editing for documentaries, podcasts, interviews, and educational content. 
                We transform your raw footage into polished, engaging long-form videos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-sm hover:bg-brand-cyan transition-all duration-300"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-sm hover:border-brand-cyan hover:text-brand-cyan transition-all duration-300"
                >
                  View Portfolio
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
                Why Choose Us for Long-form Content?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges of long-form content editing
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
                Long-form Content Portfolio
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Documentaries, podcasts, and educational content we&apos;ve edited
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

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Editing Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From raw footage to polished final product
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {processSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 mb-8"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-cyan text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
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
                Ready to Transform Your Long-form Content?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Let&apos;s create engaging long-form videos that captivate your audience
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