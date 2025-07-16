# Database Setup Guide

## Setting up Supabase Tables

Follow these steps to set up your database tables in Supabase:

### 1. Access Supabase SQL Editor
1. Log into your Supabase dashboard at https://supabase.com/dashboard
2. Select your project (ngxzbrajncyzjeisqpec)
3. Navigate to the SQL Editor from the left sidebar

### 2. Create Tables
Copy and paste the SQL schema from `/lib/supabase-schema.sql` into the SQL editor and run it.

This will create:
- `youtube_playlists` table
- `youtube_videos` table  
- `case_studies` table
- `services` table
- `team_members` table
- `client_testimonials` table
- `client_logos` table

### 3. Set up Storage Buckets
1. Go to Storage in the left sidebar
2. Create the following buckets:
   - `thumbnails` - For video thumbnails
   - `team-photos` - For team member photos
   - `client-logos` - For client company logos
   - `client-photos` - For testimonial author photos
   - `case-studies` - For case study assets

3. Set each bucket to PUBLIC (toggle the "Public bucket" option)

### 4. Import YouTube Data
Once tables are created, run the import script:

```bash
# Make sure you have the YouTube data fetched
npm run fetch-youtube

# Generate case studies (if not done already)
npm run generate-case-studies

# Import data to Supabase
npm run import-youtube-data
```

### 5. Verify Data Import
You can verify the data was imported by running these queries in the SQL editor:

```sql
-- Check playlists
SELECT COUNT(*) as playlist_count FROM youtube_playlists;

-- Check videos
SELECT COUNT(*) as video_count FROM youtube_videos;

-- Check featured videos
SELECT COUNT(*) as featured_count FROM youtube_videos WHERE is_featured = true;

-- Check case studies
SELECT COUNT(*) as case_study_count FROM case_studies;

-- View sample data
SELECT title, view_count, category FROM youtube_videos ORDER BY view_count DESC LIMIT 10;
```

### 6. Test the Application
1. Run the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3002 to see:
   - Homepage with dynamic featured videos
   - Portfolio page with all videos
   - Case study pages with SEO content

### Troubleshooting

If you encounter errors:

1. **Permission Denied**: Make sure you're using the service role key for imports
2. **Table Already Exists**: Drop existing tables first with:
   ```sql
   DROP TABLE IF EXISTS case_studies CASCADE;
   DROP TABLE IF EXISTS youtube_videos CASCADE;
   DROP TABLE IF EXISTS youtube_playlists CASCADE;
   -- etc for other tables
   ```
3. **Import Fails**: Check that your `.env.local` has the correct Supabase credentials

### Next Steps
- Configure Row Level Security (RLS) policies for production
- Set up database backups
- Monitor usage in Supabase dashboard