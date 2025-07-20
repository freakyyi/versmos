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

export function ServicesGridAceternity() {
  const services = [
    {
      title: "Video Editing & VFX",
      description: "Professional video editing with stunning visual effects that captivate your audience.",
      icon: <Video className="w-6 h-6" />,
      href: "/services/video-editing-vfx",
    },
    {
      title: "Motion Graphics",
      description: "Eye-catching animations that bring your ideas to life with dynamic movement.",
      icon: <Sparkles className="w-6 h-6" />,
      href: "/services/motion-graphics",
    },
    {
      title: "2D Animation",
      description: "Custom 2D animations for explainers, characters, and storytelling.",
      icon: <Palette className="w-6 h-6" />,
      href: "/services/2d-animation",
    },
    {
      title: "3D Animation",
      description: "Immersive 3D animations and modeling for products and visual effects.",
      icon: <Wand2 className="w-6 h-6" />,
      href: "/services/3d-animation",
    },
    {
      title: "Social Media Designs",
      description: "Engaging content optimized for all social platforms to maximize reach.",
      icon: <Share2 className="w-6 h-6" />,
      href: "/services/social-media-designs",
    },
    {
      title: "Product Videos",
      description: "Showcase your products with compelling videos that drive conversions.",
      icon: <Monitor className="w-6 h-6" />,
      href: "/services/product-videos",
    },
    {
      title: "Testimonial Videos",
      description: "Build trust with authentic testimonial videos and client success stories.",
      icon: <MessageSquare className="w-6 h-6" />,
      href: "/services/testimonial-videos",
    },
    {
      title: "Showreels & Portfolios",
      description: "Create stunning showreels that showcase your best work professionally.",
      icon: <Film className="w-6 h-6" />,
      href: "/portfolio",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {services.map((service, index) => (
        <Feature key={service.title} {...service} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  href,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  index: number;
}) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex flex-col lg:border-r py-10 relative group/feature border-gray-200",
          (index === 0 || index === 4) && "lg:border-l border-gray-200",
          index < 4 && "lg:border-b border-gray-200"
        )}
      >
        {index < 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
        )}
        {index >= 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
        )}
        <div className="mb-4 relative z-10 px-10 text-gray-600">
          {icon}
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-300 group-hover/feature:bg-brand-cyan transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-800">
            {title}
          </span>
        </div>
        <p className="text-sm text-gray-600 max-w-xs relative z-10 px-10">
          {description}
        </p>
      </div>
    </Link>
  );
};