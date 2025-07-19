"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Package, ShoppingCart, Target, Sparkles } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Product Showcases",
    description: "Highlight features and benefits with stunning product presentations"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Videos",
    description: "Drive sales with compelling product videos for online stores"
  },
  {
    icon: Target,
    title: "Demo Videos",
    description: "Clear demonstrations showing your product in action"
  },
  {
    icon: Sparkles,
    title: "360° Views",
    description: "Interactive product views from every angle"
  }
];

const benefits = [
  "Increases conversion rates by up to 80% on product pages",
  "Reduces product returns by showing accurate representations",
  "Builds trust and confidence in your products",
  "Perfect for Amazon listings and e-commerce platforms",
  "Showcases product features better than static images",
  "Creates emotional connections with potential customers"
];

export default function ProductVideosPage() {
  return (
    <ServicePageTemplate
      title="Product Videos"
      subtitle="That Sell"
      description="Showcase your products in their best light with professional product videos. We create compelling visual content that highlights features, demonstrates value, and drives purchasing decisions."
      features={features}
      benefits={benefits}
      category="Commercials"
    />
  );
}