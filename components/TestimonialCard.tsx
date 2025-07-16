"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Globe, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  companyLogo?: string;
  image: string;
  testimonial: string;
  rating?: number;
  socials?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
  index?: number;
}

export default function TestimonialCard({
  name,
  position,
  company,
  companyLogo,
  image,
  testimonial,
  rating = 5,
  socials,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Client Info */}
        <div className="lg:w-1/3 bg-gradient-to-br from-brand-darkest to-brand-dark p-8 text-white flex flex-col items-center justify-center text-center">
          {/* Client Photo */}
          <div className="relative w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-brand-cyan rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
            <Image
              src={image}
              alt={name}
              width={128}
              height={128}
              className="relative z-10 w-full h-full rounded-full object-cover border-4 border-white/20"
            />
          </div>

          {/* Client Info */}
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-sm text-brand-cyan mb-1">{position}</p>
          <p className="text-sm text-white/80 mb-4">{company}</p>

          {/* Company Logo */}
          {companyLogo && (
            <div className="mb-4">
              <Image
                src={companyLogo}
                alt={company}
                width={100}
                height={40}
                className="h-8 w-auto object-contain filter brightness-0 invert opacity-80"
              />
            </div>
          )}

          {/* Social Links */}
          {socials && (
            <div className="flex gap-3 mt-4">
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-brand-cyan transition-all duration-300"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-brand-cyan transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-brand-cyan transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {socials.website && (
                <a
                  href={socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-brand-cyan transition-all duration-300"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right Section - Testimonial */}
        <div className="lg:w-2/3 p-8 lg:p-12 relative">
          {/* Quote Icon */}
          <Quote className="absolute top-8 right-8 w-16 h-16 text-brand-darkest/10" />

          {/* Rating */}
          {rating && (
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          )}

          {/* Testimonial Text */}
          <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 relative z-10">
            "{testimonial}"
          </blockquote>

          {/* Project/Service Tag */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="px-3 py-1 bg-brand-darkest/5 rounded-full text-brand-darkest font-medium">
              Video Production
            </span>
            <span className="px-3 py-1 bg-brand-cyan/10 rounded-full text-brand-cyan font-medium">
              5-Star Review
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}