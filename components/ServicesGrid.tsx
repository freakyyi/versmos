"use client";

import { cn } from "@/lib/utils";
import { 
  Video, 
  Sparkles, 
  Palette, 
  Monitor, 
  Share2, 
  MessageSquare,
  Wand2,
  Film
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Video Editing & VFX",
    description: "Professional video editing with stunning visual effects that captivate your audience. From color grading to 3D compositing.",
    icon: <Video className="w-6 h-6" />,
    href: "/services/video-editing-vfx",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Motion Graphics",
    description: "Eye-catching animations that bring your ideas to life. Logo animations, infographics, and dynamic transitions.",
    icon: <Sparkles className="w-6 h-6" />,
    href: "/services/motion-graphics",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "2D Animation",
    description: "Custom 2D animations for any purpose. Character animation, explainer videos, and animated storytelling.",
    icon: <Palette className="w-6 h-6" />,
    href: "/services/2d-animation",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "3D Animation",
    description: "Immersive 3D animations and modeling. Product visualization, architectural renders, and 3D character design.",
    icon: <Wand2 className="w-6 h-6" />,
    href: "/services/3d-animation",
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "Social Media Designs",
    description: "Engaging content optimized for all social platforms. Instagram reels, YouTube shorts, and viral TikTok videos.",
    icon: <Share2 className="w-6 h-6" />,
    href: "/services/social-media-designs",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "Product Videos",
    description: "Showcase your products with compelling videos. Product demos, unboxing videos, and promotional content.",
    icon: <Monitor className="w-6 h-6" />,
    href: "/services/product-videos",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Testimonial Videos",
    description: "Build trust with authentic testimonial videos. Client interviews, case studies, and success stories.",
    icon: <MessageSquare className="w-6 h-6" />,
    href: "/services/testimonial-videos",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Showreels & Portfolios",
    description: "Create stunning showreels that showcase your best work. Professional portfolio videos for artists and businesses.",
    icon: <Film className="w-6 h-6" />,
    href: "/portfolio",
    gradient: "from-teal-500 to-green-500"
  }
];

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((feature) => (
        <Link href={feature.href} key={feature.title}>
          <Feature {...feature} />
        </Link>
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  gradient,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col py-10 px-8 h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100",
        "hover:-translate-y-1"
      )}
    >
      {/* Gradient background on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300",
        gradient
      )} />
      
      {/* Icon with gradient background */}
      <div className={cn(
        "mb-6 relative w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
        gradient
      )}>
        {icon}
      </div>
      
      {/* Content */}
      <div className="relative flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-brand-cyan transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">
          {description}
        </p>
        
        {/* Learn more link */}
        <div className="mt-4 flex items-center text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium">Learn more</span>
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};