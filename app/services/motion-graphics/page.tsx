"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Zap, TrendingUp, Eye, Layers3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Dynamic Typography",
    description: "Eye-catching animated text that delivers your message with impact"
  },
  {
    icon: TrendingUp,
    title: "Data Visualization",
    description: "Transform complex data into engaging visual stories"
  },
  {
    icon: Eye,
    title: "Logo Animation",
    description: "Bring your brand to life with memorable logo animations"
  },
  {
    icon: Layers3,
    title: "Infographics",
    description: "Animated infographics that educate and entertain"
  }
];

const benefits = [
  "Increases engagement and retention of information",
  "Perfect for social media and digital marketing campaigns",
  "Enhances brand recognition and memorability",
  "Simplifies complex information into digestible content",
  "Versatile format works across all digital platforms",
  "Boosts conversion rates with compelling visual content"
];

export default function MotionGraphicsPage() {
  return (
    <ServicePageTemplate
      title="Motion Graphics"
      subtitle="Design"
      description="Elevate your content with stunning motion graphics. We create visually striking animations that capture attention, communicate your message effectively, and leave a lasting impression."
      features={features}
      benefits={benefits}
      category="Animation"
    />
  );
}