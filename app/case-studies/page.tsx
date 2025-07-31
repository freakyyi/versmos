"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import VideoModal from "@/components/VideoModal";

interface CaseStudy {
  id: string;
  video_id: string;
  client_name: string;
  project_title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  key_deliverables: string[];
  technologies_used: string[];
  project_duration: string;
  youtube_video_id: string;
  client_website: string;
  logo_url: string;
  created_at: string;
}

interface Video {
  youtube_video_id: string;
  title: string;
  description: string;
  thumbnail_high: string;
  view_count: number;
  duration_seconds: number;
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<(CaseStudy & { video?: Video })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function loadCaseStudies() {
      try {
        // Fetch case studies with their associated videos
        const { data, error } = await supabase
          .from('case_studies')
          .select(`
            *,
            youtube_videos!video_id (
              youtube_video_id,
              title,
              description,
              thumbnail_high,
              view_count,
              duration_seconds
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Map the data to include video information
        const mappedData = data?.map(study => ({
          ...study,
          video: study.youtube_videos
        })) || [];

        setCaseStudies(mappedData);
      } catch (error) {
        console.error('Error loading case studies:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCaseStudies();
  }, [supabase]);

  // Format view count
  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-12"></div>
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Case Studies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover how we&#39;ve helped businesses transform their ideas into compelling visual stories that drive results.
            </p>
          </motion.div>

          {/* Case Studies List */}
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left: Video/Thumbnail */}
                  <div className="relative aspect-video lg:aspect-auto">
                    {study.video?.thumbnail_high ? (
                      <>
                        <Image
                          src={study.video.thumbnail_high}
                          alt={study.project_title}
                          fill
                          className="object-cover"
                        />
                        <div 
                          className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                          onClick={() => setSelectedVideo({ 
                            id: study.youtube_video_id || study.video?.youtube_video_id || '', 
                            title: study.project_title 
                          })}
                        >
                          <div className="bg-white rounded-full p-6 transform scale-90 hover:scale-100 transition-transform duration-300">
                            <Play className="w-10 h-10 text-brand-darkest ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No preview available</span>
                      </div>
                    )}
                  </div>

                  {/* Right: Content */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-brand-cyan font-semibold uppercase tracking-wider">
                        {study.industry}
                      </span>
                      {study.video?.view_count && (
                        <span className="text-sm text-gray-500">
                          {formatViews(study.video.view_count)} views
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      {study.project_title}
                    </h2>
                    
                    <p className="text-lg text-gray-600 mb-6">
                      {study.client_name}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Challenge</h3>
                        <p className="text-gray-600">{study.challenge}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Solution</h3>
                        <p className="text-gray-600">{study.solution}</p>
                      </div>

                      {study.results && study.results.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Results</h3>
                          <ul className="space-y-2">
                            {study.results.map((result, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-brand-cyan mt-1">•</span>
                                <span className="text-gray-600">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 pt-4">
                        {study.key_deliverables && study.key_deliverables.map((deliverable, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/case-studies/${study.id}`}
                        className="inline-flex items-center text-brand-darkest hover:text-brand-cyan font-semibold transition-colors group"
                      >
                        View Full Case Study
                        <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {caseStudies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-6">
                No case studies available yet.
              </p>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-lg hover:bg-brand-cyan transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                View Our Portfolio
              </Link>
            </div>
          )}

          {/* CTA Section */}
          {caseStudies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16 text-center bg-gradient-to-r from-brand-darkest to-brand-dark rounded-2xl p-12 text-white"
            >
              <h2 className="text-3xl font-bold mb-4">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Let&#39;s discuss how we can help transform your vision into compelling visual content that drives results.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-darkest font-semibold rounded-lg hover:bg-brand-cyan hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
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
          videoId={selectedVideo.id}
          title={selectedVideo.title}
        />
      )}
    </>
  );
}