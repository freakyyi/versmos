"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ClientLogo {
  name: string;
  src: string;
}

interface ClientLogosGridProps {
  logos: ClientLogo[];
}

export default function ClientLogosGrid({ logos }: ClientLogosGridProps) {
  // Define shape classes for each logo position
  const shapes = [
    "rounded-full", // Circle
    "rounded-3xl", // Rounded square
    "hexagon", // Hexagon (will use clip-path)
    "rounded-lg", // Square with slight rounding
    "rounded-full", // Circle
    "rounded-3xl", // Rounded square
    "rounded-lg", // Square
  ];

  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-8">Trusted by leading brands:</p>
      
      <div className="relative">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={`${logo.name}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Logo Container */}
              <div
                className={`
                  relative w-24 h-24 sm:w-20 sm:h-20 bg-gray-100 flex items-center justify-center
                  overflow-hidden transition-all duration-300 group-hover:scale-110
                  ${index === 2 ? 'hexagon' : shapes[index] || 'rounded-lg'}
                  ${index < logos.length - 1 ? 'hover:bg-gray-200' : ''}
                `}
                style={index === 2 ? {
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
                } : {}}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={60}
                  height={60}
                  className="w-14 h-14 sm:w-12 sm:h-12 object-contain filter grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}

          {/* Final CTA Square with Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: logos.length * 0.1 }}
            className="relative group col-span-1"
          >
            {/* Arrow pointing to CTA */}
            <motion.div
              className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:block"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-8 h-8 text-brand-darkest/50" />
            </motion.div>

            {/* CTA Square */}
            <div className="relative w-24 h-24 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-darkest to-brand-dark rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
              <div className="text-white text-center">
                <div className="text-2xl font-bold">+</div>
                <div className="text-xs">You?</div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-xs font-semibold">Join Us</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="sm:hidden mt-4 text-center text-xs text-gray-500">
          <div className="flex items-center justify-center gap-1">
            <span>Swipe to see more</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}