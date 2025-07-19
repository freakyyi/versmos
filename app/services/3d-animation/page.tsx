"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Box, Cpu, Globe, Camera } from "lucide-react";

const features = [
  {
    icon: Box,
    title: "3D Modeling",
    description: "High-quality 3D models with attention to detail and realistic textures"
  },
  {
    icon: Cpu,
    title: "Advanced Rendering",
    description: "Photorealistic rendering with cutting-edge technology and techniques"
  },
  {
    icon: Globe,
    title: "Environmental Design",
    description: "Immersive 3D environments and worlds for any project"
  },
  {
    icon: Camera,
    title: "Camera Animation",
    description: "Dynamic camera movements that enhance storytelling"
  }
];

const benefits = [
  "Photorealistic quality that captures every detail",
  "Perfect for product visualization and demonstrations",
  "Ideal for architectural walkthroughs and real estate",
  "Creates immersive experiences for viewers",
  "Unlimited creative possibilities with no physical constraints",
  "Can showcase products before they're manufactured"
];

export default function Animation3DPage() {
  return (
    <ServicePageTemplate
      title="3D Animation"
      subtitle="Services"
      description="Step into the future with stunning 3D animations. Our expert team creates photorealistic 3D content that brings your products, concepts, and stories to life in spectacular detail."
      features={features}
      benefits={benefits}
      category="Animation"
    />
  );
}