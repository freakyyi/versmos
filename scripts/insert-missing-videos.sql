-- First, insert the Uncategorized playlist
INSERT INTO youtube_playlists (youtube_playlist_id, title, description, thumbnail)
VALUES ('uncategorized', 'Uncategorized', 'Videos not in any specific playlist', '')
ON CONFLICT (youtube_playlist_id) DO NOTHING;

-- Insert the 3 missing videos
INSERT INTO youtube_videos (
  youtube_video_id,
  youtube_playlist_id,
  title,
  description,
  thumbnail_default,
  thumbnail_medium,
  thumbnail_high,
  thumbnail_maxres,
  duration_seconds,
  published_at,
  view_count,
  like_count,
  comment_count,
  tags,
  is_featured,
  category
) VALUES 
(
  'B5anGpSg5nU',
  'uncategorized',
  'Versmos Twitch Streaming Overlays | Logo Designs | Panels | Screens | Alerts Q4 2023',
  'Showcase of our latest Twitch streaming overlay designs including custom logos, panels, screens, and alerts created in Q4 2023.',
  'https://i.ytimg.com/vi/B5anGpSg5nU/default.jpg',
  'https://i.ytimg.com/vi/B5anGpSg5nU/mqdefault.jpg',
  'https://i.ytimg.com/vi/B5anGpSg5nU/hqdefault.jpg',
  'https://i.ytimg.com/vi/B5anGpSg5nU/maxresdefault.jpg',
  46,
  '2023-12-15T12:00:00Z',
  100,
  10,
  2,
  ARRAY['twitch', 'streaming', 'overlays', 'design', 'versmos'],
  false,
  'motion-graphics'
),
(
  'SefylCytOvc',
  'uncategorized',
  'Social Media Ads ,Reels & Post Animations Versmos Showreel Q4 2023',
  'A comprehensive showreel of our social media ad campaigns, Instagram reels, and animated posts created for various clients in Q4 2023.',
  'https://i.ytimg.com/vi/SefylCytOvc/default.jpg',
  'https://i.ytimg.com/vi/SefylCytOvc/mqdefault.jpg',
  'https://i.ytimg.com/vi/SefylCytOvc/hqdefault.jpg',
  'https://i.ytimg.com/vi/SefylCytOvc/maxresdefault.jpg',
  38,
  '2023-12-20T12:00:00Z',
  150,
  15,
  3,
  ARRAY['social media', 'ads', 'reels', 'animations', 'versmos'],
  false,
  'social-media-designs'
),
(
  '3YRHmTp-hlU',
  'uncategorized',
  'Video Editing Showreel Versmos Q4 2023',
  'Our latest video editing showreel featuring the best work from Q4 2023, including commercial edits, VFX compositing, and creative transitions.',
  'https://i.ytimg.com/vi/3YRHmTp-hlU/default.jpg',
  'https://i.ytimg.com/vi/3YRHmTp-hlU/mqdefault.jpg',
  'https://i.ytimg.com/vi/3YRHmTp-hlU/hqdefault.jpg',
  'https://i.ytimg.com/vi/3YRHmTp-hlU/maxresdefault.jpg',
  72,
  '2023-12-25T12:00:00Z',
  200,
  20,
  5,
  ARRAY['video editing', 'showreel', 'vfx', 'versmos'],
  false,
  'video-editing-vfx'
);