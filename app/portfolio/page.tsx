"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play, Filter, Grid, List } from "lucide-react";
import VideoModal from "@/components/VideoModal";

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  duration: string;
  description: string;
  videoUrl?: string;
}

const categories = [
  { id: "all", name: "All Works", count: 29 },
  { id: "product", name: "Product Videos", count: 8 },
  { id: "explainer", name: "Explainer Videos", count: 12 },
  { id: "social", name: "Social Media", count: 15 },
  { id: "animation", name: "Animation", count: 10 },
  { id: "real-estate", name: "Real Estate", count: 6 },
  { id: "testimonial", name: "Testimonials", count: 7 },
  { id: "vfx", name: "VFX & Compositing", count: 9 },
];

// Sample projects data - in production, this would come from the database
const projects: Project[] = [
  {
    id: "1",
    title: "AI Voice Generator - Product Launch",
    client: "TechStart Inc.",
    category: "product",
    thumbnail: "/api/placeholder/600/400",
    duration: "2:30",
    description: "Product launch video showcasing AI voice generation capabilities",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Real Estate Virtual Tour - Luxury Villa",
    client: "Prime Properties",
    category: "real-estate",
    thumbnail: "/api/placeholder/600/400",
    duration: "3:45",
    description: "Immersive virtual tour of a luxury beachfront villa",
  },
  {
    id: "3",
    title: "Fitness App Explainer Animation",
    client: "FitLife Pro",
    category: "explainer",
    thumbnail: "/api/placeholder/600/400",
    duration: "1:20",
    description: "2D animated explainer video for fitness tracking app",
  },
  {
    id: "4",
    title: "Restaurant Social Media Campaign",
    client: "Gourmet Delights",
    category: "social",
    thumbnail: "/api/placeholder/600/400",
    duration: "0:30",
    description: "Series of short-form videos for Instagram and TikTok",
  },
  {
    id: "5",
    title: "3D Product Animation - Headphones",
    client: "AudioTech",
    category: "animation",
    thumbnail: "/api/placeholder/600/400",
    duration: "1:15",
    description: "Photorealistic 3D animation showcasing premium headphones",
  },
  {
    id: "6",
    title: "Customer Success Story",
    client: "CloudShift",
    category: "testimonial",
    thumbnail: "/api/placeholder/600/400",
    duration: "2:00",
    description: "Client testimonial video with interview and b-roll footage",
  },
  {
    id: "7",
    title: "VFX Compositing - Action Scene",
    client: "IndieFilm Productions",
    category: "vfx",
    thumbnail: "/api/placeholder/600/400",
    duration: "0:45",
    description: "Green screen compositing with CGI elements",
  },
  {
    id: "8",
    title: "SaaS Platform Demo",
    client: "DataFlow Systems",
    category: "product",
    thumbnail: "/api/placeholder/600/400",
    duration: "3:30",
    description: "Comprehensive platform walkthrough with motion graphics",
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white pt-[80px]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-brand-cyan">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our diverse collection of video projects. From explainer animations to 
              cinematic productions, each piece tells a unique story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-[80px] bg-white border-b border-gray-200 z-40 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Category Pills */}
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? "bg-brand-cyan text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" 
                    ? "bg-brand-cyan text-white" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" 
                    ? "bg-brand-cyan text-white" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={
              viewMode === "grid" 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "space-y-6"
            }
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={
                  viewMode === "grid"
                    ? "group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white"
                    : "group flex gap-6 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                }
              >
                {viewMode === "grid" ? (
                  // Grid View
                  <>
                    <div 
                      className="aspect-video bg-gray-200 relative overflow-hidden cursor-pointer"
                      onClick={() => project.videoUrl && setSelectedVideo({ url: project.videoUrl, title: project.title })}
                    >
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white rounded-full p-4 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-8 h-8 text-brand-cyan ml-1" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">{project.duration}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-brand-cyan font-semibold uppercase tracking-wider">
                        {categories.find(c => c.id === project.category)?.name}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-brand-cyan transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{project.client}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                    </div>
                  </>
                ) : (
                  // List View
                  <>
                    <div 
                      className="w-80 flex-shrink-0 relative overflow-hidden bg-gray-200 cursor-pointer"
                      onClick={() => project.videoUrl && setSelectedVideo({ url: project.videoUrl, title: project.title })}
                    >
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        width={320}
                        height={180}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs text-brand-cyan font-semibold uppercase tracking-wider">
                            {categories.find(c => c.id === project.category)?.name}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-brand-cyan transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mt-1">{project.client}</p>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">{project.duration}</span>
                      </div>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-brand-cyan text-white font-semibold rounded-lg hover:bg-brand-cyan/90 transition-colors">
              Load More Projects
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-cyan to-brand-cyan/90">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s collaborate to create something extraordinary. Get in touch with our team today.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-darkest hover:text-brand-cyan font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
}