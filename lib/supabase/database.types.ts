// Database types generated from Supabase schema
// This file will be auto-generated once connected to Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      youtube_playlists: {
        Row: {
          id: string
          youtube_playlist_id: string
          title: string
          description: string | null
          thumbnail_url: string | null
          item_count: number
          category: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          youtube_playlist_id: string
          title: string
          description?: string | null
          thumbnail_url?: string | null
          item_count?: number
          category?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          youtube_playlist_id?: string
          title?: string
          description?: string | null
          thumbnail_url?: string | null
          item_count?: number
          category?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      youtube_videos: {
        Row: {
          id: string
          youtube_video_id: string
          playlist_id: string
          title: string
          description: string | null
          thumbnail_default: string | null
          thumbnail_medium: string | null
          thumbnail_high: string | null
          thumbnail_maxres: string | null
          duration: string | null
          published_at: string | null
          view_count: number
          like_count: number
          comment_count: number
          tags: string[]
          is_featured: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          youtube_video_id: string
          playlist_id: string
          title: string
          description?: string | null
          thumbnail_default?: string | null
          thumbnail_medium?: string | null
          thumbnail_high?: string | null
          thumbnail_maxres?: string | null
          duration?: string | null
          published_at?: string | null
          view_count?: number
          like_count?: number
          comment_count?: number
          tags?: string[]
          is_featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          youtube_video_id?: string
          playlist_id?: string
          title?: string
          description?: string | null
          thumbnail_default?: string | null
          thumbnail_medium?: string | null
          thumbnail_high?: string | null
          thumbnail_maxres?: string | null
          duration?: string | null
          published_at?: string | null
          view_count?: number
          like_count?: number
          comment_count?: number
          tags?: string[]
          is_featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      video_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          color: string | null
          parent_id: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          color?: string | null
          parent_id?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          parent_id?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      case_studies: {
        Row: {
          id: string
          video_id: string
          slug: string
          title: string
          meta_title: string | null
          meta_description: string | null
          hero_image: string | null
          thumbnail_card: string | null
          thumbnail_social: string | null
          client_name: string | null
          client_logo: string | null
          client_testimonial: string | null
          client_testimonial_author: string | null
          client_testimonial_role: string | null
          challenge: string | null
          approach: string | null
          technical_details: string | null
          results: string | null
          key_takeaways: string[]
          metric_views: string | null
          metric_engagement: string | null
          metric_conversion: string | null
          custom_metrics: Json | null
          primary_keyword: string | null
          secondary_keywords: string[]
          long_tail_keywords: string[]
          related_services: string[]
          related_case_studies: string[]
          status: 'draft' | 'published' | 'archived'
          is_featured: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          video_id: string
          slug: string
          title: string
          meta_title?: string | null
          meta_description?: string | null
          hero_image?: string | null
          thumbnail_card?: string | null
          thumbnail_social?: string | null
          client_name?: string | null
          client_logo?: string | null
          client_testimonial?: string | null
          client_testimonial_author?: string | null
          client_testimonial_role?: string | null
          challenge?: string | null
          approach?: string | null
          technical_details?: string | null
          results?: string | null
          key_takeaways?: string[]
          metric_views?: string | null
          metric_engagement?: string | null
          metric_conversion?: string | null
          custom_metrics?: Json | null
          primary_keyword?: string | null
          secondary_keywords?: string[]
          long_tail_keywords?: string[]
          related_services?: string[]
          related_case_studies?: string[]
          status?: 'draft' | 'published' | 'archived'
          is_featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          video_id?: string
          slug?: string
          title?: string
          meta_title?: string | null
          meta_description?: string | null
          hero_image?: string | null
          thumbnail_card?: string | null
          thumbnail_social?: string | null
          client_name?: string | null
          client_logo?: string | null
          client_testimonial?: string | null
          client_testimonial_author?: string | null
          client_testimonial_role?: string | null
          challenge?: string | null
          approach?: string | null
          technical_details?: string | null
          results?: string | null
          key_takeaways?: string[]
          metric_views?: string | null
          metric_engagement?: string | null
          metric_conversion?: string | null
          custom_metrics?: Json | null
          primary_keyword?: string | null
          secondary_keywords?: string[]
          long_tail_keywords?: string[]
          related_services?: string[]
          related_case_studies?: string[]
          status?: 'draft' | 'published' | 'archived'
          is_featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      case_study_status: 'draft' | 'published' | 'archived'
    }
  }
}