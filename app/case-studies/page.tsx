"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Award, TrendingUp, Users, Clock } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  thumbnail: string;
  videoUrl?: string;
  metrics: {
    icon: typeof Award | typeof TrendingUp | typeof Users | typeof Clock;
    label: string;
    value: string;
  }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Transforming Product Launch with 3D Animation",
    client: "TechStart Inc.",
    industry: "Technology",
    challenge: "TechStart needed to explain their complex AI voice generation technology in a simple, engaging way for their product launch.",
    solution: "We created a stunning 3D animated explainer video that visualized the AI process, making it easy for viewers to understand the technology.",
    results: [
      "500K+ views in first month",
      "85% increase in product sign-ups",
      "Featured in major tech publications",
    ],
    thumbnail: "/api/placeholder/800/600",
    metrics: [
      { icon: TrendingUp, label: "Conversion Rate", value: "+85%" },
      { icon: Users, label: "Reach", value: "500K+" },
      { icon: Clock, label: "Engagement", value: "4.5 min" },
    ],
  },
  {
    id: "2",
    title: "Real Estate Virtual Tours That Sell",
    client: "Prime Properties",
    industry: "Real Estate",
    challenge: "Prime Properties wanted to showcase luxury properties to international buyers who couldn't visit in person.",
    solution: "We produced immersive virtual tour videos with drone footage, 360° views, and professional narration for their premium listings.",
    results: [
      "300% increase in international inquiries",
      "Average viewing time of 8 minutes",
      "50% reduction in physical showings needed",
    ],
    thumbnail: "/api/placeholder/800/600",
    metrics: [
      { icon: TrendingUp, label: "Inquiries", value: "+300%" },
      { icon: Users, label: "International Reach", value: "Global" },
      { icon: Clock, label: "View Time", value: "8 min" },
    ],
  },
  {
    id: "3",
    title: "Social Media Campaign That Went Viral",
    client: "Gourmet Delights",
    industry: "Food & Beverage",
    challenge: "Gourmet Delights needed to increase brand awareness among younger demographics on social media.",
    solution: "We created a series of short, trendy videos showcasing their menu items with engaging music and transitions optimized for Instagram Reels and TikTok.",
    results: [
      "10M+ total views across platforms",
      "200% increase in social media followers",
      "45% boost in foot traffic",
    ],
    thumbnail: "/api/placeholder/800/600",
    metrics: [
      { icon: TrendingUp, label: "Views", value: "10M+" },
      { icon: Users, label: "New Followers", value: "+200%" },
      { icon: Award, label: "Engagement Rate", value: "12%" },
    ],
  },
  {
    id: "4",
    title: "B2B SaaS Demo That Converts",
    client: "DataFlow Systems",
    industry: "Software",
    challenge: "DataFlow needed to demonstrate their complex data analytics platform in a way that resonated with enterprise clients.",
    solution: "We created a comprehensive product demo video with screen recordings, motion graphics, and clear narration that highlighted key features and benefits.",
    results: [
      "60% reduction in sales cycle time",
      "40% increase in demo requests",
      "Used by entire sales team",
    ],
    thumbnail: "/api/placeholder/800/600",
    metrics: [
      { icon: Clock, label: "Sales Cycle", value: "-60%" },
      { icon: TrendingUp, label: "Demo Requests", value: "+40%" },
      { icon: Award, label: "ROI", value: "500%" },
    ],
  },
];

export default function CaseStudiesPage() {
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
              Case <span className="text-brand-cyan">Studies</span>
            </h1>
            <p className="text-xl text-gray-600">
              Real results from real clients. Explore how we&apos;ve helped businesses 
              achieve their goals through the power of video.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-cyan/10 to-brand-cyan/5 rounded-3xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-16">
                <span className="text-brand-cyan font-semibold uppercase tracking-wider text-sm">
                  Featured Success Story
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
                  {caseStudies[0].title}
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {caseStudies[0].solution}
                </p>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {caseStudies[0].metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <metric.icon className="w-8 h-8 text-brand-cyan mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/case-studies/${caseStudies[0].id}`}
                  className="inline-flex items-center text-brand-cyan font-semibold hover:gap-4 transition-all"
                >
                  Read Full Case Study
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative bg-gray-200 aspect-video lg:aspect-auto">
                <Image
                  src={caseStudies[0].thumbnail}
                  alt={caseStudies[0].title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer">
                  <div className="bg-white rounded-full p-6 shadow-xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-12 h-12 text-brand-cyan ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              More Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we&apos;ve helped businesses across various industries achieve remarkable results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.slice(1).map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <Image
                    src={study.thumbnail}
                    alt={study.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-900">{study.industry}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-cyan transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{study.client}</p>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {study.challenge}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      {study.metrics.slice(0, 2).map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="text-lg font-bold text-brand-cyan">{metric.value}</div>
                          <div className="text-xs text-gray-600">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/case-studies/${study.id}`}
                      className="text-brand-cyan font-medium hover:underline"
                    >
                      View Case →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Impact We Create
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aggregated results across all our client projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-brand-cyan mb-2">150M+</div>
              <div className="text-gray-600">Total Views Generated</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-brand-cyan mb-2">85%</div>
              <div className="text-gray-600">Average Engagement Increase</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-brand-cyan mb-2">3x</div>
              <div className="text-gray-600">Average ROI</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-brand-cyan mb-2">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </motion.div>
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
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help you achieve similar results for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-darkest hover:text-brand-cyan font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}