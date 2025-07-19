"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Film, Wand2, Layers, Palette } from "lucide-react";

const features = [
  {
    icon: Film,
    title: "Professional Editing",
    description: "Expert editing with industry-standard software to create polished, engaging content"
  },
  {
    icon: Wand2,
    title: "Visual Effects",
    description: "Stunning VFX that seamlessly blend with your footage for maximum impact"
  },
  {
    icon: Layers,
    title: "Compositing",
    description: "Advanced layering and compositing techniques for complex visual storytelling"
  },
  {
    icon: Palette,
    title: "Color Grading",
    description: "Professional color correction and grading to set the perfect mood"
  }
];

const benefits = [
  "Transform raw footage into polished, professional content",
  "Add Hollywood-quality visual effects to any project",
  "Enhance storytelling with creative editing techniques",
  "Fix technical issues and improve overall video quality",
  "Create seamless transitions and engaging pacing",
  "Deliver broadcast-ready content for any platform"
];

export default function VideoEditingVFXPage() {
  return (
    <ServicePageTemplate
      title="Video Editing &"
      subtitle="VFX Compositing"
      description="Transform raw footage into cinematic masterpieces with our professional video editing and visual effects services. We bring your vision to life with cutting-edge techniques and creative expertise."
      features={features}
      benefits={benefits}
      category="Other"
    />
  );
}