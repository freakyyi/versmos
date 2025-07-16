"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Play, Film, Wand2, Layers, Palette } from "lucide-react";

const features = [
  {
    icon: Film,
    title: "Professional Editing",
    description: "Expert editing with industry-standard software to create polished, engaging content"
  },
  {
    icon: Wand2,
    title: "Visual Effects",
    description: "Stunning VFX that seamlessly blend with your footage for maximum impact"
  },
  {
    icon: Layers,
    title: "Compositing",
    description: "Advanced layering and compositing techniques for complex visual storytelling"
  },
  {
    icon: Palette,
    title: "Color Grading",
    description: "Professional color correction and grading to set the perfect mood"
  }
];

const portfolio = [
  {
    title: "Tech Product Launch",
    client: "TechCorp",
    image: "/api/placeholder/400/300",
    category: "Product Video"
  },
  {
    title: "Action Scene VFX",
    client: "FilmStudio",
    image: "/api/placeholder/400/300",
    category: "Visual Effects"
  },
  {
    title: "Corporate Presentation",
    client: "BusinessInc",
    image: "/api/placeholder/400/300",
    category: "Corporate"
  }
];

export default function VideoEditingVFXPage() {
  return (
    <div className="min-h-screen bg-white pt-[80px]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Video Editing & 
                <span className="text-brand-cyan block">VFX Compositing</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform raw footage into cinematic masterpieces with our professional 
                video editing and visual effects services. We bring your vision to life 
                with cutting-edge techniques and creative expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-cyan text-white font-semibold rounded-lg hover:bg-brand-cyan/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="group relative">
                    <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <Play className="w-8 h-8 text-brand-cyan ml-1" fill="currentColor" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive video editing and VFX services to elevate your content
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
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-brand-cyan mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Video Editing Services
              </h2>
              <p className="text-gray-600 mb-6">
                Our expert editors transform your raw footage into compelling stories 
                that engage and inspire your audience.
              </p>
              <ul className="space-y-3">
                {[
                  "Multi-camera editing and synchronization",
                  "Color correction and professional grading",
                  "Audio mixing and sound design",
                  "Motion graphics and title sequences",
                  "Transitions and visual flow optimization",
                  "Format optimization for all platforms"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                VFX & Compositing
              </h2>
              <p className="text-gray-600 mb-6">
                Add the impossible to your videos with our advanced visual effects 
                and compositing capabilities.
              </p>
              <ul className="space-y-3">
                {[
                  "Green screen removal and compositing",
                  "3D tracking and integration",
                  "Particle effects and simulations",
                  "Digital matte painting",
                  "Rotoscoping and masking",
                  "CGI elements and enhancement"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See our video editing and VFX work in action
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              >
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <span className="text-xs text-brand-cyan font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600">{project.client}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-brand-cyan font-semibold hover:gap-4 transition-all"
            >
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
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
              Ready to Elevate Your Video Content?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-brand-darkest hover:text-brand-cyan font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-brand-cyan transition-all duration-300"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}