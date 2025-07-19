"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Film, Palette, Megaphone, Sparkles, Box, Package, MessageCircle } from "lucide-react";

const services = [
  {
    id: "video-editing-vfx",
    title: "Video Editing & VFX Compositing",
    description: "Professional video editing with stunning visual effects that captivate your audience",
    icon: Film,
    features: [
      "Color Grading & Correction",
      "Motion Tracking",
      "Green Screen Compositing",
      "3D Integration",
      "Advanced Transitions",
      "Sound Design"
    ],
    href: "/services/video-editing-vfx"
  },
  {
    id: "social-media-designs",
    title: "Social Media Designs",
    description: "Eye-catching content optimized for all social platforms to maximize engagement",
    icon: Megaphone,
    features: [
      "Instagram Reels & Stories",
      "YouTube Shorts",
      "TikTok Videos",
      "LinkedIn Videos",
      "Facebook Ads",
      "Platform Optimization"
    ],
    href: "/services/social-media-designs"
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    description: "Dynamic animations that bring your ideas to life with creative movement",
    icon: Palette,
    features: [
      "Logo Animations",
      "Infographics",
      "Title Sequences",
      "Lower Thirds",
      "Animated Typography",
      "Data Visualization"
    ],
    href: "/services/motion-graphics"
  },
  {
    id: "2d-animation",
    title: "2D Animation",
    description: "Engaging 2D animations for explainers, characters, and storytelling",
    icon: Sparkles,
    features: [
      "Character Animation",
      "Explainer Videos",
      "Whiteboard Animation",
      "Motion Comics",
      "Educational Content",
      "Animated Illustrations"
    ],
    href: "/services/2d-animation"
  },
  {
    id: "3d-animation",
    title: "3D Animation",
    description: "Photorealistic 3D animations for products, environments, and visual effects",
    icon: Box,
    features: [
      "Product Visualization",
      "Architectural Walkthroughs",
      "Character Modeling",
      "3D Motion Graphics",
      "Visual Effects",
      "360° Videos"
    ],
    href: "/services/3d-animation"
  },
  {
    id: "product-videos",
    title: "Product Videos",
    description: "Showcase your products with compelling videos that drive conversions",
    icon: Package,
    features: [
      "Product Demos",
      "Launch Videos",
      "How-to Guides",
      "Unboxing Videos",
      "Feature Highlights",
      "Comparison Videos"
    ],
    href: "/services/product-videos"
  },
  {
    id: "testimonial-videos",
    title: "Testimonial Videos",
    description: "Authentic customer stories that build trust and credibility",
    icon: MessageCircle,
    features: [
      "Customer Interviews",
      "Case Study Videos",
      "Success Stories",
      "Documentary Style",
      "B-Roll Integration",
      "Multi-Camera Setup"
    ],
    href: "/services/testimonial-videos"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white pt-40">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-brand-cyan">Services</span>
            </h1>
            <p className="text-xl text-gray-600">
              From concept to creation, we offer comprehensive video production services 
              tailored to your unique needs and goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={service.href}>
                  <div className="bg-white border border-gray-200 rounded-xl p-8 h-full hover:shadow-xl hover:border-brand-cyan/20 transition-all duration-300">
                    <service.icon className="w-12 h-12 text-brand-cyan mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-cyan transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="text-brand-cyan mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-brand-cyan font-semibold group-hover:gap-4 transition-all">
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures your project runs smoothly from start to finish
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your goals and vision" },
              { step: "02", title: "Planning", desc: "Creating concepts and storyboards" },
              { step: "03", title: "Production", desc: "Bringing your vision to life" },
              { step: "04", title: "Delivery", desc: "Final edits and optimization" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-brand-cyan/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create something amazing together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-darkest hover:text-brand-cyan font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get a Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}