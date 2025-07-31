"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  companyType?: string;
  image: string;
  testimonial: string;
  linkedinUrl?: string;
}

export default function TestimonialCardMotionCue({
  name,
  position,
  company,
  companyType = "Business",
  image,
  testimonial,
  linkedinUrl,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
      {/* Testimonial Text */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        &quot;{testimonial}&quot;
      </p>
      
      {/* Client Info */}
      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
            >
              <Linkedin className="w-4 h-4 text-[#0077B5]" />
            </Link>
          )}
        </div>
        
        {/* Name and Details */}
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{position}</p>
          <p className="text-xs text-gray-500">{company} • {companyType}</p>
        </div>
      </div>
    </div>
  );
}