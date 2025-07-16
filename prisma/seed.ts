import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Service Categories
  const videoCategory = await prisma.serviceCategory.create({
    data: {
      slug: 'video-production',
      title: 'Video Production',
      description: 'Professional video production services',
      icon: '🎬',
      order: 1,
    },
  });

  const designCategory = await prisma.serviceCategory.create({
    data: {
      slug: 'design-animation',
      title: 'Design & Animation',
      description: 'Creative design and animation services',
      icon: '✨',
      order: 2,
    },
  });

  // Create Services
  await prisma.service.createMany({
    data: [
      {
        slug: 'video-editing-vfx',
        title: 'Video Editing & VFX Compositing',
        shortDesc: 'Professional video editing with stunning visual effects',
        description: 'Transform your raw footage into compelling visual stories with our professional video editing and VFX compositing services. We combine technical expertise with creative vision to deliver high-quality videos that captivate your audience.',
        features: ['Color Grading', 'Motion Tracking', 'Green Screen', 'CGI Integration', 'Audio Mixing'],
        benefits: ['Professional Quality', 'Fast Turnaround', 'Unlimited Revisions', 'HD/4K Output'],
        categoryId: videoCategory.id,
        order: 1,
      },
      {
        slug: 'social-media-designs',
        title: 'Social Media Designs',
        shortDesc: 'Engaging content optimized for social platforms',
        description: 'Create thumb-stopping social media content that drives engagement and builds your brand. Our designs are optimized for each platform to maximize reach and impact.',
        features: ['Instagram Posts', 'YouTube Thumbnails', 'Facebook Covers', 'LinkedIn Graphics', 'TikTok Videos'],
        benefits: ['Platform Optimized', 'Brand Consistency', 'High Engagement', 'Quick Delivery'],
        categoryId: designCategory.id,
        order: 2,
      },
      {
        slug: 'motion-graphics',
        title: 'Motion Graphics',
        shortDesc: 'Dynamic animations that bring ideas to life',
        description: 'Elevate your message with stunning motion graphics that capture attention and communicate complex ideas simply. Perfect for explainer videos, brand animations, and promotional content.',
        features: ['Logo Animations', 'Infographics', 'Title Sequences', 'Lower Thirds', 'Transitions'],
        benefits: ['Eye-catching Design', 'Clear Communication', 'Brand Enhancement', 'Versatile Use'],
        categoryId: designCategory.id,
        order: 3,
      },
      {
        slug: '2d-animation',
        title: '2D Animation',
        shortDesc: 'Captivating 2D animations for any purpose',
        description: 'Bring your stories to life with professional 2D animation. From character animation to explainer videos, we create engaging animated content that resonates with your audience.',
        features: ['Character Animation', 'Explainer Videos', 'Animated Logos', 'Educational Content', 'Marketing Videos'],
        benefits: ['Engaging Storytelling', 'Cost-Effective', 'Fast Production', 'Wide Appeal'],
        categoryId: designCategory.id,
        order: 4,
      },
      {
        slug: '3d-animation',
        title: '3D Animation',
        shortDesc: 'Stunning 3D visuals and animations',
        description: 'Create impressive 3D animations that showcase your products, concepts, or stories in stunning detail. Our 3D animation services bring depth and realism to your visual content.',
        features: ['Product Visualization', '3D Character Animation', 'Architectural Visualization', 'Medical Animation', 'Technical Animation'],
        benefits: ['Photorealistic Quality', 'Detailed Visualization', 'Flexible Viewing Angles', 'High Impact'],
        categoryId: designCategory.id,
        order: 5,
      },
      {
        slug: 'product-videos',
        title: 'Product Videos',
        shortDesc: 'Showcase your products in the best light',
        description: 'Highlight your products with professional videos that drive sales and build trust. We create compelling product demonstrations, unboxing videos, and promotional content.',
        features: ['Product Demos', 'Unboxing Videos', '360° Views', 'Feature Highlights', 'Comparison Videos'],
        benefits: ['Increased Sales', 'Better Understanding', 'Trust Building', 'Social Proof'],
        categoryId: videoCategory.id,
        order: 6,
      },
      {
        slug: 'testimonial-videos',
        title: 'Testimonial Videos',
        shortDesc: 'Authentic customer stories that build trust',
        description: 'Build credibility with authentic testimonial videos that showcase real customer experiences. We help capture and present customer success stories in a compelling way.',
        features: ['Customer Interviews', 'Case Study Videos', 'Success Stories', 'Review Compilations', 'Social Proof Content'],
        benefits: ['Build Trust', 'Increase Conversions', 'Authentic Content', 'Emotional Connection'],
        categoryId: videoCategory.id,
        order: 7,
      },
    ],
  });

  // Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Tony - Kingwasabi',
        role: 'UX Designer',
        content: 'Good, reliable, with excellent communication',
        rating: 5,
        featured: true,
        order: 1,
      },
      {
        name: 'Filip Grizelj',
        role: 'CEO',
        company: 'Nexy.Media',
        content: 'Was not expecting the final results to be this good. the Versmos team outdid themselves on the this project. If anyone wants an intro or 3D logo animation done by anyone I highly recommend Versmos.',
        rating: 5,
        featured: true,
        order: 2,
      },
      {
        name: 'Xavier Mares',
        role: 'Twitch Streamer',
        content: 'They left me speechless when i saw the results. THANK YOU VERY MUCH FOR THIS VERSMOS!!!!!',
        rating: 5,
        featured: true,
        order: 3,
      },
      {
        name: 'Dilpreet kaur',
        role: 'Graphic Designer',
        content: 'Faheem and his team is super talented and very quick! Easy to work with and gets the vibe effortlessly, will definitely work with again! Highly recommend.',
        rating: 5,
        featured: true,
        order: 4,
      },
    ],
  });

  // Create Site Settings
  await prisma.siteSettings.create({
    data: {
      siteName: 'Versmos',
      tagline: 'Digital Agency That Thrives on Your Success',
      description: 'Versmos is derived from the combination of two words: "Vers," signifying versatility, and "Mos," representing motion. Our primary objective is to furnish content creators with a dedicated platform for manifesting their creative concepts and elevating the visual appeal of their videos.',
      email: 'hello@versmos.com',
      phone: '+92 300 1234567',
      address: 'Plaza No. 9, Shop No. 4, 1st Floor, Business District, Near New Head Office, Phase 8 Bahria Town, Rawalpindi, 46000',
      socialLinks: {
        youtube: 'https://www.youtube.com/@versmos',
        instagram: 'https://instagram.com/versmos',
        linkedin: 'https://linkedin.com/company/versmos',
      },
      seoKeywords: ['video production', 'video editing', 'VFX', 'motion graphics', 'animation', 'social media design'],
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });