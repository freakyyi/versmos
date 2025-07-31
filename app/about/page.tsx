"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Users, Clock, Globe, Star } from "lucide-react";

const teamMembers = [
  {
    name: "Ahmed Khan",
    role: "Creative Director",
    image: "/assets/generated/team-creative-director.jpg",
    bio: "15+ years in video production and creative storytelling",
  },
  {
    name: "Sarah Johnson",
    role: "Lead Animator",
    image: "/assets/generated/team-lead-animator.jpg",
    bio: "Expert in 2D/3D animation with a passion for visual effects",
  },
  {
    name: "Mike Chen",
    role: "Motion Designer",
    image: "/assets/generated/team-motion-designer.jpg",
    bio: "Specializes in compositing and motion graphics",
  },
  {
    name: "Lisa Rodriguez",
    role: "Video Editor",
    image: "/assets/generated/team-video-editor.jpg",
    bio: "Ensuring smooth delivery and client satisfaction",
  },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every frame, every edit, and every project we deliver.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in working closely with our clients to bring their vision to life.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "Deadlines matter. We deliver on time, every time, without compromising quality.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "Staying ahead with the latest tools and techniques in video production.",
  },
];

const testimonials = [
  {
    name: "Tony - Kingwasabi",
    comment: "Good, reliable, with excellent communication. Would definitely work with them again!",
    rating: 5,
    project: "Product Launch Video",
  },
  {
    name: "Filip Grizelj",
    position: "CEO at Nexy.Media",
    comment: "Outstanding quality and professionalism. They exceeded our expectations!",
    rating: 5,
    project: "Corporate Brand Video",
  },
  {
    name: "Xavier Mares",
    position: "Twitch Streamer",
    comment: "They left me speechless when I saw the results. Amazing work!",
    rating: 5,
    project: "Gaming Channel Intro",
  },
  {
    name: "Dilpreet Kaur",
    position: "Graphic Designer",
    comment: "Super talented and very quick! They understood my vision perfectly.",
    rating: 5,
    project: "Animation Portfolio",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-40">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-brand-cyan">Versmos</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Digital Agency That Thrives on Your Success
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Versmos = Versatility + Motion. We&apos;re a passionate team of creative professionals 
              dedicated to crafting compelling visual stories that drive results for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2019, Versmos began with a simple mission: to help businesses 
                tell their stories through the power of video. What started as a small team 
                of passionate creatives has grown into a full-service video production company.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We&apos;ve had the privilege of working with over 200 clients across various 
                industries, creating everything from explainer animations to cinematic brand films. 
                Our commitment to quality and innovation has made us a trusted partner for 
                businesses looking to make an impact.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="text-3xl font-bold text-brand-cyan mb-2">500+</h3>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-brand-cyan mb-2">200+</h3>
                  <p className="text-gray-600">Happy Clients</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-brand-cyan mb-2">50+</h3>
                  <p className="text-gray-600">Team Members</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-brand-cyan mb-2">5+</h3>
                  <p className="text-gray-600">Years Experience</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/assets/generated/versmos-office.jpg"
                alt="Versmos Team"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-cyan text-white p-6 rounded-xl shadow-lg">
                <p className="text-2xl font-bold">Since 2019</p>
                <p className="text-white/90">Creating Visual Magic</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and how we work with our clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <value.icon className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The creative minds behind your success stories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-brand-cyan font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg">&quot;{testimonial.comment}&quot;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    {testimonial.position && (
                      <div className="text-sm text-gray-600">{testimonial.position}</div>
                    )}
                  </div>
                  <div className="text-sm text-brand-cyan font-medium">
                    {testimonial.project}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Ready to start your next video project? We&apos;d love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visit Our Office</h3>
                  <p className="text-gray-600">
                    Plaza No. 9, Shop No. 4, 1st Floor<br />
                    Business District, Near New Head Office<br />
                    Phase 8 Bahria Town, Rawalpindi, 46000
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-brand-cyan text-white font-semibold rounded-lg hover:bg-brand-cyan/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Start a Conversation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-2xl h-96 relative overflow-hidden">
                {/* Map placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-brand-cyan mx-auto mb-4" />
                    <p className="text-gray-600">Rawalpindi, Pakistan</p>
                  </div>
                </div>
              </div>
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
              Let&apos;s Create Something Amazing Together
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Ready to take your brand to the next level? Get in touch with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-brand-darkest hover:text-brand-cyan font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-brand-cyan transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}