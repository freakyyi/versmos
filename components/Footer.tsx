"use client";

import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube
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
      {/* CTA Section */}
      <div className="bg-brand-cyan">
        <div className="container mx-auto px-6 lg:px-12 py-16 text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">Ready to win with video?</h3>
          <p className="text-xl text-white/90 mb-8">
            Set up a free 30-minute strategy session with our team.
          </p>
          <Link
            href="https://calendly.com/versmos/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-darkest hover:bg-gray-100 font-semibold uppercase tracking-wider rounded-sm transform hover:scale-105 transition-all duration-300"
          >
            SCHEDULE A CALL
          </Link>
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

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
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