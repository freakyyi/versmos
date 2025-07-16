// YouTube and Case Study Types for Supabase

export interface YouTubePlaylist {
  id: string;
  youtube_playlist_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  item_count: number;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface YouTubeVideo {
  id: string;
  youtube_video_id: string;
  playlist_id: string;
  title: string;
  description: string | null;
  thumbnail_default: string | null;
  thumbnail_medium: string | null;
  thumbnail_high: string | null;
  thumbnail_maxres: string | null;
  duration: string | null;
  published_at: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  tags: string[];
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  
  // Relations
  playlist?: YouTubePlaylist;
}

export interface VideoCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  parent_id: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface CaseStudyMetrics {
  views?: string;
  engagement?: string;
  conversion?: string;
  custom?: Array<{
    label: string;
    value: string;
  }>;
}

export interface CaseStudy {
  id: string;
  video_id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  hero_image: string | null;
  thumbnail_card: string | null;
  thumbnail_social: string | null;
  
  // Client information
  client_name: string | null;
  client_logo: string | null;
  client_testimonial: string | null;
  client_testimonial_author: string | null;
  client_testimonial_role: string | null;
  
  // Content sections
  challenge: string | null;
  approach: string | null;
  technical_details: string | null;
  results: string | null;
  key_takeaways: string[];
  
  // Metrics
  metric_views: string | null;
  metric_engagement: string | null;
  metric_conversion: string | null;
  custom_metrics: CaseStudyMetrics['custom'] | null;
  
  // SEO
  primary_keyword: string | null;
  secondary_keywords: string[];
  long_tail_keywords: string[];
  
  // Relations
  related_services: string[];
  related_case_studies: string[];
  
  // Status
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  
  // Relations
  video?: YouTubeVideo;
}

export interface SEOContent {
  id: string;
  page_type: 'home' | 'portfolio' | 'service' | 'case-study';
  page_identifier: string | null;
  title: string | null;
  meta_title: string | null;
  meta_description: string | null;
  h1_heading: string | null;
  intro_text: string | null;
  body_content: string | null;
  schema_markup: any | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_card: string;
  canonical_url: string | null;
  created_at: string;
  updated_at: string;
}

// Helper types for API responses
export interface VideoWithPlaylist extends YouTubeVideo {
  playlist: YouTubePlaylist;
}

export interface CaseStudyWithVideo extends CaseStudy {
  video: YouTubeVideo & {
    playlist: YouTubePlaylist;
  };
}

// Filter and sorting options
export interface VideoFilters {
  category?: string;
  playlist_id?: string;
  is_featured?: boolean;
  search?: string;
  tags?: string[];
}

export interface CaseStudyFilters {
  category?: string;
  status?: CaseStudy['status'];
  is_featured?: boolean;
  client_name?: string;
  search?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}