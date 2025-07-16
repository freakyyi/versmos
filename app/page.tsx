"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight, CheckCircle, Star, Users, Zap, Clock, Award, Palette, Megaphone, Film, Sparkles, TrendingUp, Heart, Shield, Headphones } from "lucide-react";
import Image from "next/image";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import TestimonialCard from "@/components/TestimonialCard";
import ClientLogosGrid from "@/components/ClientLogosGrid";
import FeaturedVideos from "@/components/FeaturedVideos";

export default function Home() {
  const clientLogos = [
    { name: "EON", src: "/assets/EON-150x150.png" },
    { name: "Airgearpro", src: "/assets/Airgearpro-150x150.png" },
    { name: "Comex soft", src: "/assets/Comex-soft-150x150.png" },
    { name: "SENPI", src: "/assets/SENPI-150x150.png" },
    { name: "gym armour", src: "/assets/gym-armour-150x150.png" },
    { name: "CloudShift", src: "/assets/CloudShift-150x150.png" },
    { name: "About Cars", src: "/assets/About-Cars-150x150.png" },
  ];

  const services = [
    {
      title: "Video Editing & VFX",
      description: "Professional video editing with stunning visual effects that captivate your audience",
      icon: "🎬",
      features: ["Color Grading", "Motion Tracking", "Green Screen", "3D Compositing"],
    },
    {
      title: "Motion Graphics",
      description: "Eye-catching animations that bring your ideas to life with dynamic movement",
      icon: "✨",
      features: ["Logo Animation", "Infographics", "Title Sequences", "Transitions"],
    },
    {
      title: "2D/3D Animation",
      description: "Custom animations for any purpose or platform, from simple to complex",
      icon: "🎨",
      features: ["Character Animation", "Product Demos", "Explainer Videos", "3D Modeling"],
    },
    {
      title: "Social Media Content",
      description: "Engaging content optimized for all social platforms to maximize reach",
      icon: "📱",
      features: ["Instagram Reels", "YouTube Shorts", "TikTok Videos", "Stories"],
    },
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: Film },
    { number: "200+", label: "Happy Clients", icon: Heart },
    { number: "50+", label: "Team Members", icon: Users },
    { number: "5+", label: "Years Experience", icon: Award },
  ];

  const testimonials = [
    {
      name: "Tony - Kingwasabi",
      position: "Content Creator",
      company: "Kingwasabi",
      image: "/api/placeholder/200/200",
      testimonial: "Good, reliable, with excellent communication. Would definitely work with them again!",
      rating: 5,
      project: "Product Launch Video",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      name: "Filip Grizelj",
      position: "CEO",
      company: "Nexy.Media",
      companyLogo: "/api/placeholder/120/40",
      image: "/api/placeholder/200/200",
      testimonial: "Outstanding quality and professionalism. They exceeded our expectations!",
      rating: 5,
      project: "Corporate Brand Video",
      socials: {
        linkedin: "https://linkedin.com",
        website: "https://nexy.media",
      },
    },
    {
      name: "Xavier Mares",
      position: "Content Creator",
      company: "Twitch Streaming",
      image: "/api/placeholder/200/200",
      testimonial: "They left me speechless when I saw the results. Amazing work!",
      rating: 5,
      project: "Gaming Channel Intro",
      socials: {
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Dilpreet Kaur",
      position: "Graphic Designer",
      company: "Freelance",
      image: "/api/placeholder/200/200",
      testimonial: "Super talented and very quick! They understood my vision perfectly.",
      rating: 5,
      project: "Animation Portfolio",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
      },
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Consultation",
      description: "We start by understanding your vision, goals, and target audience to create a tailored strategy.",
      icon: Megaphone,
    },
    {
      step: "02",
      title: "Creative Development",
      description: "Our team develops concepts, storyboards, and scripts that align with your brand message.",
      icon: Palette,
    },
    {
      step: "03",
      title: "Production & Animation",
      description: "We bring your vision to life with cutting-edge tools and techniques for stunning results.",
      icon: Film,
    },
    {
      step: "04",
      title: "Review & Refinement",
      description: "We work closely with you to ensure every detail is perfect, with unlimited revisions.",
      icon: CheckCircle,
    },
    {
      step: "05",
      title: "Final Delivery",
      description: "Receive your video in all required formats, optimized for your chosen platforms.",
      icon: Sparkles,
    },
  ];

  const portfolioCategories = [
    { name: "All", count: 29 },
    { name: "Product Videos", count: 8 },
    { name: "Explainer Videos", count: 12 },
    { name: "Social Media", count: 15 },
    { name: "Animation", count: 10 },
    { name: "Real Estate", count: 6 },
  ];

  const recentProjects = [
    {
      title: "AI Voice Generator Launch",
      client: "TechStart Inc.",
      category: "Product Video",
      thumbnail: "/api/placeholder/400/300",
    },
    {
      title: "Real Estate Virtual Tour",
      client: "Prime Properties",
      category: "Real Estate",
      thumbnail: "/api/placeholder/400/300",
    },
    {
      title: "Fitness App Explainer",
      client: "FitLife Pro",
      category: "Explainer Video",
      thumbnail: "/api/placeholder/400/300",
    },
    {
      title: "Restaurant Social Campaign",
      client: "Gourmet Delights",
      category: "Social Media",
      thumbnail: "/api/placeholder/400/300",
    },
  ];

  const faqs = [
    {
      question: "How long does it take to complete a video project?",
      answer: "Project timelines vary depending on complexity. Simple projects can be completed in 3-5 days, while more complex animations may take 2-3 weeks. We always work to meet your deadlines.",
    },
    {
      question: "What is your revision policy?",
      answer: "We offer unlimited revisions to ensure you're 100% satisfied with the final product. Our goal is to bring your vision to life exactly as you imagined it.",
    },
    {
      question: "Do you provide voiceover services?",
      answer: "Yes! We offer professional voiceover services in multiple languages. We work with talented voice artists to match the perfect voice to your project.",
    },
    {
      question: "What formats do you deliver?",
      answer: "We deliver in all major formats including MP4, MOV, AVI, and more. We'll also optimize your video for specific platforms like YouTube, Instagram, or your website.",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white pt-[80px] overflow-hidden">
        <div className="w-full relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
            {/* Left Content - Full Width */}
            <div className="w-full lg:w-[55%] px-6 lg:pl-[5%] xl:pl-[8%] lg:pr-12 z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 max-w-2xl"
              >
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Video Animation
                  <span className="text-brand-cyan block">Company</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  From 2D animated explainers to 3D videos, Versmos creates award-winning 
                  animations for businesses that turn browsers into true believers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-lg hover:bg-brand-cyan transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Create Your Video
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-brand-cyan hover:text-brand-cyan transition-all duration-300"
                  >
                    View Portfolio
                  </Link>
                </div>

                {/* Client Logos Grid */}
                <div className="pt-12">
                  <ClientLogosGrid logos={clientLogos} />
                </div>
              </motion.div>
            </div>
            
            {/* Right Video Section - Full Bleed */}
            <div className="w-full lg:w-[60%] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 px-6 lg:px-0">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="lg:ml-8 lg:mr-0">
                  <div className="relative aspect-video">
                    <YouTubeEmbed
                      videoId="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      title="Versmos Showreel 2024"
                      className="shadow-2xl rounded-xl lg:rounded-l-2xl lg:rounded-r-none"
                    />
                    <div className="absolute -bottom-6 left-6 bg-brand-cyan text-white px-8 py-4 rounded-xl shadow-xl z-10">
                      <p className="font-bold text-lg">2024 Showreel</p>
                      <p className="text-sm opacity-90">Watch our best work • 2 mins</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Digital Agency That Thrives on Your Success
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                If you are looking for an agency to help you create a remarkable presence online, 
                you&apos;ve come to the right place. We can help you take your business to the next level.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Versmos = Versatility + Motion. We combine creative storytelling with cutting-edge 
                technology to deliver videos that not only look amazing but also drive real results 
                for your business.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">100% Satisfaction</h4>
                    <p className="text-sm text-gray-600">Unlimited revisions until you&apos;re happy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Fast Delivery</h4>
                    <p className="text-sm text-gray-600">Quick turnaround without compromising quality</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Results Driven</h4>
                    <p className="text-sm text-gray-600">Videos that convert viewers into customers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                    <p className="text-sm text-gray-600">Always here when you need us</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Versmos Office"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand-darkest/10 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-brand-darkest" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">5+ Years</p>
                    <p className="text-gray-600">Industry Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of video production services to bring your vision to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A streamlined approach to deliver exceptional results every time
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 hidden lg:block"></div>
            
            <div className="space-y-12">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <div className={`bg-white p-8 rounded-xl shadow-lg ${
                      index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                    }`}>
                      <div className={`flex items-center gap-4 mb-4 ${
                        index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                      }`}>
                        <step.icon className="w-8 h-8 text-brand-cyan" />
                        <span className="text-4xl font-bold text-gray-200">{step.step}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Circle */}
                  <div className="hidden lg:flex items-center justify-center">
                    <div className="w-12 h-12 bg-brand-darkest rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our latest work across various industries and styles
            </p>
            
            {/* Portfolio Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {portfolioCategories.map((category, index) => (
                <button
                  key={category.name}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    index === 0
                      ? 'bg-brand-darkest text-white hover:bg-brand-cyan'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Dynamic Featured Videos */}
          <FeaturedVideos />

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-lg hover:bg-brand-cyan transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View Full Portfolio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-brand-cyan to-brand-cyan/90">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-5xl lg:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Versmos?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine creativity, technology, and strategy to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <Zap className="w-12 h-12 text-brand-cyan mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Turnaround</h3>
              <p className="text-gray-600 mb-4">
                We understand deadlines. Our efficient workflow ensures your project is delivered on time, every time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Quick project initiation
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Regular progress updates
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  On-time delivery guarantee
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <Star className="w-12 h-12 text-brand-cyan mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600 mb-4">
                Every project is crafted with attention to detail and a commitment to excellence.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Industry-leading tools
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Experienced professionals
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Unlimited revisions
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <Users className="w-12 h-12 text-brand-cyan mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dedicated Support</h3>
              <p className="text-gray-600 mb-4">
                Our team is here to support you throughout the entire creative process and beyond.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  24/7 communication
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Dedicated project manager
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Post-delivery support
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Got questions? We&apos;ve got answers
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start">
                  <span className="text-brand-cyan mr-2">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-6">
                  <span className="text-brand-cyan font-bold">A:</span> {faq.answer}
                </p>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Let&apos;s create something amazing together. Get in touch with us today and let&apos;s discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-darkest hover:text-brand-cyan font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-brand-cyan transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">VERSMOS</h3>
              <p className="text-gray-400 mb-4">
                Digital Agency That Thrives on Your Success
              </p>
              <p className="text-gray-400 text-sm">
                Versmos = Versatility + Motion
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/video-editing" className="hover:text-white transition-colors">Video Editing & VFX</Link></li>
                <li><Link href="/services/motion-graphics" className="hover:text-white transition-colors">Motion Graphics</Link></li>
                <li><Link href="/services/2d-3d-animation" className="hover:text-white transition-colors">2D/3D Animation</Link></li>
                <li><Link href="/services/social-media" className="hover:text-white transition-colors">Social Media Content</Link></li>
                <li><Link href="/services/product-videos" className="hover:text-white transition-colors">Product Videos</Link></li>
                <li><Link href="/services/testimonial-videos" className="hover:text-white transition-colors">Testimonial Videos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 mb-4">
                Plaza No. 9, Shop No. 4, 1st Floor<br />
                Business District, Near New Head Office<br />
                Phase 8, Bahria Town<br />
                Rawalpindi, 46000
              </p>
              <p className="text-gray-400">
                <strong>Email:</strong> info@versmos.com<br />
                <strong>Phone:</strong> +92 XXX XXXXXXX
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Versmos. All rights reserved. | <Link href="/privacy" className="hover:text-white">Privacy Policy</Link> | <Link href="/terms" className="hover:text-white">Terms of Service</Link></p>
          </div>
        </div>
      </footer>
    </div>
  );
}