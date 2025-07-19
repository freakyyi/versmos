"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Palette, Layers, Sparkles, Brush } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Character Animation",
    description: "Bring characters to life with fluid, expressive 2D animation"
  },
  {
    icon: Layers,
    title: "Motion Graphics",
    description: "Dynamic animated graphics that capture attention and convey your message"
  },
  {
    icon: Sparkles,
    title: "Explainer Videos",
    description: "Clear, engaging animations that simplify complex concepts"
  },
  {
    icon: Brush,
    title: "Custom Illustrations",
    description: "Unique hand-crafted illustrations tailored to your brand"
  }
];

const benefits = [
  "Cost-effective compared to 3D animation while maintaining high quality",
  "Faster production turnaround times for tight deadlines",
  "Perfect for explainer videos, educational content, and social media",
  "Highly versatile style that works across all platforms",
  "Easily updateable and modifiable for future needs",
  "Ideal for creating memorable brand mascots and characters"
];

export default function Animation2DPage() {
  return (
    <ServicePageTemplate
      title="2D Animation"
      subtitle="Services"
      description="Create captivating stories with our professional 2D animation services. From character animation to motion graphics, we bring your ideas to life with style and creativity."
      features={features}
      benefits={benefits}
      category="Animation"
    />
  );
}