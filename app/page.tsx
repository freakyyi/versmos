"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Award, Shield, Headphones, TrendingUp } from "lucide-react";
import Image from "next/image";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import TestimonialCardMotionCue from "@/components/TestimonialCardMotionCue";
import ClientList from "@/components/ClientList";
import FeaturedVideos from "@/components/FeaturedVideos";
import { ServicesGridAceternity } from "@/components/ServicesGridAceternity";

export default function Home() {
  const clientLogos = [
    { name: "EON", src: "/assets/clients/EON.png" },
    { name: "Senpi", src: "/assets/clients/senpi.png" },
    { name: "Gym Armour", src: "/assets/clients/gym-armour.png" },
    { name: "Saltys Media", src: "/assets/clients/saltys-media.png" },
  ];


  const testimonials = [
    {
      name: "Tony - Kingwasabi",
      position: "Content Creator",
      company: "Kingwasabi",
      image: "/assets/generated/testimonial-tony.jpg",
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
      companyLogo: "/assets/generated/nexy-media-logo.svg",
      image: "/assets/generated/testimonial-filip.jpg",
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
      image: "/assets/generated/testimonial-xavier.jpg",
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
      image: "/assets/generated/testimonial-dilpreet.jpg",
      testimonial: "Super talented and very quick! They understood my vision perfectly.",
      rating: 5,
      project: "Animation Portfolio",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
      },
    },
  ];




  const faqs = [
    {
      question: "How long does it take to complete a video project?",
      answer: "Project timelines vary depending on complexity. Simple projects can be completed in 3-5 days, while more complex animations may take 2-3 weeks. We always work to meet your deadlines.",
    },
    {
      question: "What is your revision policy?",
      answer: "We offer unlimited revisions to ensure you&#39;re 100% satisfied with the final product. Our goal is to bring your vision to life exactly as you imagined it.",
    },
    {
      question: "Do you provide voiceover services?",
      answer: "Yes! We offer professional voiceover services in multiple languages. We work with talented voice artists to match the perfect voice to your project.",
    },
    {
      question: "What formats do you deliver?",
      answer: "We deliver in all major formats including MP4, MOV, AVI, and more. We&#39;ll also optimize your video for specific platforms like YouTube, Instagram, or your website.",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[636px] flex items-center bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 2k:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  Video Animation
                  <span className="text-brand-cyan block">Company</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  From 2D animated explainers to 3D videos, Versmos creates award-winning 
                  animations for businesses that turn browsers into true believers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold rounded-sm hover:bg-brand-cyan transition-all duration-300 shadow-lg"
                  >
                    Create Your Video
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-sm hover:border-brand-cyan hover:text-brand-cyan transition-all duration-300"
                  >
                    View Portfolio
                  </Link>
                </div>

                {/* These companies clicked the button */}
                <div className="pt-8">
                  <p className="text-sm text-gray-500 mb-4 font-medium">These companies clicked the button:</p>
                  <div className="grid grid-cols-4 gap-6 max-w-md">
                    {clientLogos.map((logo) => (
                      <div key={logo.name} className="flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={80}
                          height={40}
                          className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Video Section */}
            <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-0">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative aspect-video">
                  <YouTubeEmbed
                    videoId="Ej3ez3U0czk"
                    title="Logo Animation Portfolio - Versmos Studios"
                    className="shadow-2xl rounded-lg"
                  />
                  <div className="absolute -bottom-4 sm:-bottom-6 left-4 sm:left-6 bg-brand-cyan text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg shadow-xl z-10">
                    <p className="font-bold text-base sm:text-lg">Portfolio Showreel</p>
                    <p className="text-xs sm:text-sm opacity-90">Logo Animations • 1 min</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 fhd:px-20 max-w-10xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                Digital Agency That Thrives on Your Success
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                If you are looking for an agency to help you create a remarkable presence online, 
                you&#39;ve come to the right place. We can help you take your business to the next level.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Versmos = Versatility + Motion. We combine creative storytelling with cutting-edge 
                technology to deliver videos that not only look amazing but also drive real results 
                for your business.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">100% Satisfaction</h4>
                    <p className="text-sm text-gray-600">Unlimited revisions until you&#39;re happy</p>
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
                  src="/assets/generated/versmos-office.jpg"
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of video production services to bring your vision to life
            </p>
          </motion.div>

          <div className="w-full">
            <ServicesGridAceternity />
          </div>
        </div>
      </section>


      {/* Testimonials Section - Moved from bottom */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 2k:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialCardMotionCue
                  name={testimonial.name}
                  position={testimonial.position}
                  company={testimonial.company}
                  companyType={testimonial.company.includes("Startup") ? "Startup" : "Business"}
                  image={testimonial.image}
                  testimonial={testimonial.testimonial}
                  linkedinUrl={testimonial.socials?.linkedin}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client List Section */}
      <ClientList />

      {/* Portfolio Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 2k:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Check out some of our work
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;ve created amazing videos for brands across various industries
            </p>
          </motion.div>

          {/* Dynamic Featured Videos */}
          <FeaturedVideos />

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-darkest text-white font-semibold uppercase tracking-wider rounded-sm hover:bg-brand-cyan transition-all duration-300 shadow-lg"
            >
              SEE MORE PROJECTS
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>


      {/* Who is Versmos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 2k:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Who is Versmos?
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Versmos is a video animation company serving clients across the United States. It&apos;s home to a team of talented, idiosyncratic individuals who love animation, design, and marketing. Animated video production is our expertise and we take pride in helping brands uncover the power of this medium.
              </p>
              
              <p>
                Our clients range from prestigious Fortune 100 companies that you know to inspiring young startups that you&apos;ll know about someday. We&apos;re invested in the success of each of them—big and small—and we&apos;ll put in the extra effort to make sure your project exceeds your expectations.
              </p>
            </div>

            {/* States We've Worked With */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">States we&apos;ve worked with:</h3>
              <div className="flex flex-wrap gap-3">
                {['Florida', 'Texas', 'Puerto Rico', 'Seattle', 'New York', 'California'].map((state) => (
                  <span key={state} className="text-gray-700">
                    {state}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Got questions? We&#39;ve got answers
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


    </div>
  );
}