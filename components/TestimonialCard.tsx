"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Globe } from "lucide-react";

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
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group max-w-full"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Client Info */}
        <div className="lg:w-1/3 bg-gradient-to-br from-brand-darkest to-brand-dark p-6 sm:p-8 text-white flex flex-col items-center justify-center text-center">
          {/* Client Photo */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-6">
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
          <h3 className="text-lg sm:text-xl font-bold mb-1">{name}</h3>
          <p className="text-xs sm:text-sm text-brand-cyan mb-1">{position}</p>
          <p className="text-xs sm:text-sm text-white/80 mb-4">{company}</p>

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
        <div className="lg:w-2/3 p-6 sm:p-8 lg:p-12 relative">
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 text-brand-darkest/10">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

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
          <blockquote className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 relative z-10">
            &ldquo;{testimonial}&rdquo;
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