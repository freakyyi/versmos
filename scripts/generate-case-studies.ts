import * as fs from 'fs';
import * as path from 'path';

// Load the YouTube data
const dataPath = path.join(process.cwd(), 'data', 'youtube-data.json');
const youtubeData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Define categories for better organization
const categoryMapping: { [key: string]: string } = {
  'Long-form Content Video Edits': 'video-editing',
  'Social Media Post Animations': 'social-media',
  'VFX & Compositing': 'vfx-compositing',
  'Facebook Service/Product Video Ads -': 'product-videos',
  'Twitch, Kick, Facebook - Streaming Essentials': 'streaming-content',
  'Testimonial Edits, YouTube Shorts, Instagram & Tiktok Reels': 'testimonials',
  '2D Explainers / Motion Graphics': 'motion-graphics',
  'Logo Animations': 'brand-animation'
};

// Select featured videos for case studies (one from each major category)
const featuredVideos = [
  {
    playlistTitle: 'Long-form Content Video Edits',
    videoIndex: 0, // ClearThink Marketing video
    keywords: ['construction marketing video', 'b2b video production', 'offer development video', 'construction company marketing'],
    targetAudience: 'Construction companies and B2B service providers looking for marketing video solutions'
  },
  {
    playlistTitle: 'Facebook Service/Product Video Ads -',
    videoIndex: 0, // First product video
    keywords: ['facebook video ads', 'product video production', 'social media advertising', 'ecommerce video marketing'],
    targetAudience: 'E-commerce brands and businesses looking to create compelling product advertisements'
  },
  {
    playlistTitle: 'Logo Animations',
    videoIndex: 0, // First logo animation
    keywords: ['logo animation services', 'brand identity animation', 'corporate logo reveal', 'motion graphics branding'],
    targetAudience: 'Startups and established businesses seeking professional logo animations'
  },
  {
    playlistTitle: 'Testimonial Edits, YouTube Shorts, Instagram & Tiktok Reels',
    videoIndex: 0, // First testimonial
    keywords: ['testimonial video production', 'client success story video', 'social proof video marketing', 'customer review videos'],
    targetAudience: 'Businesses looking to showcase customer testimonials and build trust'
  }
];

// Function to generate SEO-optimized case study content
function generateCaseStudy(video: any, playlist: any, config: any) {
  const slug = video.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
    
  const category = categoryMapping[playlist.title] || 'general';
  
  // Extract client name from title if possible
  const clientMatch = video.title.match(/\|([^|]+)$/);
  const clientName = clientMatch ? clientMatch[1].trim() : 'Our Client';
  
  // Parse duration from ISO 8601
  const duration = video.duration.replace('PT', '').replace('S', '').replace('M', ':');
  
  const caseStudy = {
    id: video.id,
    video_id: video.id,
    slug: slug,
    title: `${video.title} - Video Production Case Study`,
    meta_title: `${video.title.substring(0, 50)} | Versmos Video Production`,
    meta_description: `Discover how Versmos created ${video.title.substring(0, 100)}. Professional video production services in Pakistan with proven results.`,
    
    // Images
    hero_image: video.thumbnails.maxres,
    thumbnail_card: video.thumbnails.high,
    thumbnail_social: video.thumbnails.maxres,
    
    // Client info
    client_name: clientName,
    client_testimonial: generateTestimonial(video, category),
    
    // Content sections
    challenge: generateChallenge(video, category),
    approach: generateApproach(video, category),
    technical_details: generateTechnicalDetails(video, category, duration),
    results: generateResults(video),
    key_takeaways: generateKeyTakeaways(video, category),
    
    // Metrics
    metric_views: formatNumber(video.viewCount),
    metric_engagement: calculateEngagement(video),
    
    // SEO
    primary_keyword: config.keywords[0],
    secondary_keywords: config.keywords.slice(1),
    long_tail_keywords: generateLongTailKeywords(video, category, 'Pakistan'),
    
    // Meta
    category: category,
    playlist_id: playlist.id,
    playlist_title: playlist.title,
    published_at: video.publishedAt,
    tags: video.tags || []
  };
  
  return caseStudy;
}

// Helper functions
function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
  return num.toString();
}

function calculateEngagement(video: any): string {
  const totalEngagement = video.likeCount + video.commentCount;
  const engagementRate = video.viewCount > 0 ? (totalEngagement / video.viewCount * 100).toFixed(1) : '0';
  return `${engagementRate}%`;
}

function generateTestimonial(video: any, category: string): string {
  const testimonials = {
    'video-editing': "Versmos delivered exceptional video editing that perfectly captured our brand message. The attention to detail and professional finish exceeded our expectations.",
    'product-videos': "The product video created by Versmos significantly boosted our conversion rates. Their understanding of visual storytelling is outstanding.",
    'brand-animation': "Our logo animation by Versmos gave our brand a professional edge. It's exactly what we needed to stand out in the market.",
    'testimonials': "Versmos helped us showcase our customer success stories beautifully. The testimonial videos have become powerful tools in our sales process."
  };
  
  return testimonials[category] || "Working with Versmos was a game-changer for our video marketing strategy. Highly recommended!";
}

function generateChallenge(video: any, category: string): string {
  const challenges = {
    'video-editing': `The client needed to transform raw footage into a compelling narrative that would resonate with their target audience while maintaining brand consistency across all touchpoints.`,
    'product-videos': `Creating a product video that not only showcases features but also connects emotionally with potential customers and drives conversions in a competitive market.`,
    'brand-animation': `Developing a memorable logo animation that captures the essence of the brand while being versatile enough for use across multiple platforms and contexts.`,
    'testimonials': `Crafting authentic testimonial videos that build trust and credibility while keeping viewers engaged throughout the entire message.`
  };
  
  return challenges[category] || "The client needed a professional video solution that would elevate their brand and engage their target audience effectively.";
}

function generateApproach(video: any, category: string): string {
  return `Our approach began with a comprehensive understanding of the client's objectives and target audience. We developed a creative strategy that emphasized:

1. **Strategic Planning**: Detailed pre-production planning to ensure every shot serves the narrative
2. **Creative Execution**: Professional filming and editing techniques tailored to the ${category.replace('-', ' ')} style
3. **Brand Alignment**: Ensuring all visual elements align with the client's brand guidelines
4. **Platform Optimization**: Adapting the content for optimal performance across different platforms
5. **Iterative Refinement**: Multiple review rounds to perfect every detail`;
}

function generateTechnicalDetails(video: any, category: string, duration: string): string {
  return `**Production Specifications:**
- Duration: ${duration}
- Resolution: 4K Ultra HD
- Frame Rate: 24/30/60 fps (optimized for platform)
- Color Grading: Professional cinema-grade color correction
- Audio: Crystal clear audio with background music licensing
- Graphics: Custom motion graphics and animations
- Delivery Formats: Optimized for YouTube, social media, and web

**Post-Production Techniques:**
- Advanced color grading for visual consistency
- Professional audio mixing and sound design
- Motion tracking and compositing where applicable
- Custom transitions and effects
- Multi-format export optimization`;
}

function generateResults(video: any): string {
  const viewCount = formatNumber(video.viewCount);
  return `The video has achieved impressive results since its launch:

- **Views**: ${viewCount} organic views and growing
- **Engagement**: Strong audience retention and interaction
- **Business Impact**: Increased brand awareness and lead generation
- **Client Satisfaction**: Exceeded expectations on all deliverables
- **ROI**: Measurable improvement in marketing metrics

The success of this project demonstrates our ability to create content that not only looks professional but also delivers tangible business results.`;
}

function generateKeyTakeaways(video: any, category: string): string[] {
  return [
    `Professional ${category.replace('-', ' ')} can significantly impact brand perception`,
    'Strategic planning and creative execution are equally important',
    'Understanding the target audience is crucial for effective video content',
    'Quality production values translate to better business outcomes',
    'Collaboration between client and production team ensures success'
  ];
}

function generateLongTailKeywords(video: any, category: string, location: string): string[] {
  return [
    `best ${category.replace('-', ' ')} services in ${location}`,
    `professional video production company ${location}`,
    `${category.replace('-', ' ')} for businesses near me`,
    `affordable ${category.replace('-', ' ')} Rawalpindi Islamabad`,
    `top video production agency Pakistan`
  ];
}

// Generate case studies
function main() {
  const caseStudies: any[] = [];
  
  featuredVideos.forEach(config => {
    const playlist = youtubeData.playlists.find((p: any) => p.title === config.playlistTitle);
    if (playlist && playlist.videos[config.videoIndex]) {
      const video = playlist.videos[config.videoIndex];
      const caseStudy = generateCaseStudy(video, playlist, config);
      caseStudies.push(caseStudy);
    }
  });
  
  // Save case studies
  const outputPath = path.join(process.cwd(), 'data', 'case-studies.json');
  fs.writeFileSync(outputPath, JSON.stringify(caseStudies, null, 2));
  
  console.log(`✅ Generated ${caseStudies.length} case studies`);
  console.log(`📁 Saved to: ${outputPath}`);
  
  // Print summary
  caseStudies.forEach((cs, index) => {
    console.log(`\n${index + 1}. ${cs.title}`);
    console.log(`   - Slug: ${cs.slug}`);
    console.log(`   - Category: ${cs.category}`);
    console.log(`   - Primary Keyword: ${cs.primary_keyword}`);
  });
}

main();