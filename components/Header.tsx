"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

const services = [
  { title: "Long-form Content Video Edits", href: "/services/long-form-content" },
  { title: "Social Media Post Animations", href: "/services/social-media-animations" },
  { title: "VFX & Compositing", href: "/services/vfx-compositing" },
  { title: "Streaming Essentials", href: "/services/streaming-essentials" },
  { title: "Facebook Video Ads", href: "/services/facebook-video-ads" },
  { title: "2D Explainers / Motion Graphics", href: "/services/motion-graphics" },
  { title: "Logo Animations", href: "/services/logo-animations" },
  { title: "Testimonial & Social Reels", href: "/services/testimonial-social-reels" },
];

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-[99999] shadow-sm w-full">
      <div className="w-full px-4 sm:px-6 lg:px-[50px] 2k:px-[80px]">
        <div className="flex items-center justify-between h-[84px] w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/versmos-logo.svg"
              alt="Versmos"
              width={180}
              height={30}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link
                href="/services"
                className="flex items-center gap-1 text-[16px] font-medium text-gray-900 hover:text-brand-cyan transition-colors"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </Link>
              
              {/* Dropdown Menu with invisible bridge */}
              {isServicesOpen && (
                <>
                  {/* Invisible bridge to prevent gap */}
                  <div className="absolute top-full left-0 w-72 h-2" />
                  <div
                    className="absolute top-full left-0 w-72 bg-white py-4 mt-2 shadow-lg rounded-md border border-gray-100"
                  >
                    <Link
                      href="/services"
                      className="block px-6 py-3 text-[15px] font-semibold text-gray-900 hover:bg-gray-50 hover:text-brand-cyan transition-colors border-b border-gray-100"
                    >
                      All Services
                    </Link>
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-6 py-3 text-[15px] text-gray-700 hover:bg-gray-50 hover:text-brand-cyan transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href="/portfolio" className="text-[16px] font-medium text-gray-900 hover:text-brand-cyan transition-colors">
              Portfolio
            </Link>
            
            <Link href="/case-studies" className="text-[16px] font-medium text-gray-900 hover:text-brand-cyan transition-colors">
              Case Studies
            </Link>
            
            <Link href="/about" className="text-[16px] font-medium text-gray-900 hover:text-brand-cyan transition-colors">
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/get-a-quote"
            className="hidden lg:inline-flex px-7 py-3.5 bg-brand-darkest text-white text-[15px] font-medium uppercase tracking-wider hover:bg-brand-cyan transition-colors rounded-sm"
          >
            Get a Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <nav className="px-8 py-4">
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full py-2 text-left text-gray-800 font-semibold"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block py-2 text-sm text-gray-600 hover:text-brand-cyan"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link
                href="/portfolio"
                className="block py-2 text-gray-800 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              
              <Link
                href="/case-studies"
                className="block py-2 text-gray-800 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Case Studies
              </Link>
              
              <Link
                href="/about"
                className="block py-2 text-gray-800 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <Link
                href="/get-a-quote"
                className="inline-flex px-6 py-3 bg-brand-darkest text-white font-medium uppercase tracking-wider mt-4 hover:bg-brand-cyan transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}