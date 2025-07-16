# Supabase Setup Guide for Versmos Website

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New project"
4. Fill in:
   - Project name: `versmos-website`
   - Database Password: (generate a strong password)
   - Region: Choose closest to Pakistan (e.g., Singapore)
5. Click "Create new project"

## 2. Get API Keys

Once project is created:
1. Go to Settings → API
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

## 3. Set Up Database

1. Go to SQL Editor
2. Create a new query
3. Copy and paste the contents of `/lib/supabase-schema.sql`
4. Click "Run" to create all tables

## 4. Set Up Storage Buckets

1. Go to Storage
2. Create the following buckets:

### client-logos
- Public bucket: Yes
- Allowed MIME types: image/png, image/jpeg, image/webp
- Max file size: 2MB

### portfolio-thumbnails
- Public bucket: Yes
- Allowed MIME types: image/png, image/jpeg, image/webp
- Max file size: 5MB

### case-study-images
- Public bucket: Yes
- Allowed MIME types: image/png, image/jpeg, image/webp
- Max file size: 5MB

### team-photos
- Public bucket: Yes
- Allowed MIME types: image/png, image/jpeg, image/webp
- Max file size: 2MB

## 5. Update Environment Variables

Add to `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 6. Import Initial Data

Run the data import script:
```bash
npm run import-youtube-data
```

## 7. Test the Connection

Visit `/api/health` to verify Supabase connection

## Security Notes

- Never commit `.env.local` to git
- Use Row Level Security (RLS) policies
- service_role key should only be used server-side
- Enable 2FA on your Supabase account

## Troubleshooting

### Connection Issues
- Verify API keys are correct
- Check if project is paused (free tier pauses after 1 week of inactivity)
- Ensure RLS policies allow public read access

### Data Not Showing
- Check if data was imported successfully
- Verify RLS policies are set correctly
- Check browser console for errors