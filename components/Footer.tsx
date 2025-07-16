"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Clock
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Video Editing & VFX", href: "/services/video-editing-vfx" },
      { name: "Motion Graphics", href: "/services/motion-graphics" },
      { name: "2D/3D Animation", href: "/services/2d-3d-animation" },
      { name: "Social Media Content", href: "/services/social-media-content" },
      { name: "Product Videos", href: "/services/product-videos" },
      { name: "Testimonial Videos", href: "/services/testimonial-videos" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Our Process", href: "/process" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
    resources: [
      { name: "Video Marketing Guide", href: "/resources/video-marketing-guide" },
      { name: "Animation Styles", href: "/resources/animation-styles" },
      { name: "Pricing Calculator", href: "/resources/pricing" },
      { name: "FAQ", href: "/faq" },
      { name: "Client Portal", href: "/client-portal" },
      { name: "Download Assets", href: "/resources/downloads" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "Refund Policy", href: "/refund-policy" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/versmos" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/versmos" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/versmos" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/versmos" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@versmos" },
  ];

  return (
    <footer className="bg-brand-darkest text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Get the latest updates on video marketing trends and exclusive offers
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-cyan transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-cyan text-white font-semibold rounded-lg hover:bg-brand-cyan/90 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Subscribe
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-brand-cyan rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <span className="text-2xl font-bold">Versmos</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Digital Agency That Thrives on Your Success. We combine versatility 
              and motion to create compelling video content that drives results.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-cyan transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-brand-cyan transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-brand-cyan transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-brand-cyan transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Plaza No. 9, Shop No. 4, 1st Floor, Business District, Phase 8 Bahria Town, Rawalpindi
                </span>
              </li>
              <li>
                <a 
                  href="tel:+923001234567" 
                  className="flex items-center gap-3 text-gray-300 hover:text-brand-cyan transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-brand-cyan" />
                  <span className="text-sm">+92 300 1234567</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@versmos.com" 
                  className="flex items-center gap-3 text-gray-300 hover:text-brand-cyan transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-brand-cyan" />
                  <span className="text-sm">info@versmos.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-cyan" />
                <span className="text-gray-300 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-cyan">500+</div>
              <div className="text-sm text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-cyan">200+</div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-cyan">5+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-cyan">24/7</div>
              <div className="text-sm text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} Versmos. All rights reserved. Versatility + Motion = Versmos
            </div>
            <div className="flex gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-brand-cyan transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}