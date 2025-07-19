"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Users, Star, MessageSquare, Award } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Customer Stories",
    description: "Authentic testimonials that showcase real customer experiences"
  },
  {
    icon: Star,
    title: "Review Videos",
    description: "Transform written reviews into compelling video content"
  },
  {
    icon: MessageSquare,
    title: "Interview Style",
    description: "Professional interviews that bring out the best stories"
  },
  {
    icon: Award,
    title: "Case Studies",
    description: "In-depth success stories that demonstrate results"
  }
];

const benefits = [
  "Build trust and credibility with authentic customer voices",
  "Increase conversion rates with social proof",
  "Create emotional connections with potential customers",
  "Showcase real results and success stories",
  "Perfect for websites, social media, and sales presentations",
  "Overcome objections with genuine customer feedback"
];

export default function TestimonialVideosPage() {
  return (
    <ServicePageTemplate
      title="Testimonial Videos"
      subtitle="That Convert"
      description="Build trust and credibility with powerful testimonial videos. We help capture authentic customer stories that resonate with your audience and drive conversions."
      features={features}
      benefits={benefits}
      category="Testimonials"
    />
  );
}