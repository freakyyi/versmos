"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Smartphone, Hash, Heart, Share2 } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Platform Optimization",
    description: "Content tailored for Instagram, TikTok, YouTube, and more"
  },
  {
    icon: Hash,
    title: "Trending Content",
    description: "Stay relevant with content that follows current trends"
  },
  {
    icon: Heart,
    title: "Engagement Focus",
    description: "Designs created to maximize likes, shares, and comments"
  },
  {
    icon: Share2,
    title: "Multi-Format",
    description: "Stories, Reels, Posts, and IGTV content in all formats"
  }
];

const benefits = [
  "Boost social media engagement and follower growth",
  "Consistent brand presence across all platforms",
  "Content optimized for each platform's algorithm",
  "Quick turnaround for timely social media campaigns",
  "Eye-catching designs that stop the scroll",
  "Increase brand awareness and reach new audiences"
];

export default function SocialMediaDesignsPage() {
  return (
    <ServicePageTemplate
      title="Social Media"
      subtitle="Designs"
      description="Stand out in the crowded social media landscape with scroll-stopping content. We create engaging videos and animations optimized for maximum impact on every social platform."
      features={features}
      benefits={benefits}
      category="Animation"
    />
  );
}