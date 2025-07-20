-- Add position column to youtube_videos table
ALTER TABLE youtube_videos 
ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;