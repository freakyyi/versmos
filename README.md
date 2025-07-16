# Versmos - Video Production Company Website

A modern, high-performance website for Versmos Studios built with Next.js 14, TypeScript, and Supabase.

## 🚀 Features

- **Dynamic Content Management**: Powered by Supabase for real-time content updates
- **YouTube Integration**: Automated playlist and video fetching from @versmos channel
- **SEO Optimized**: Case studies with keyword targeting and schema markup
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Focused**: Next.js 14 with App Router and optimized images
- **Custom Typography**: Nohemi font integration
- **Animation**: Smooth transitions with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Animation**: Framer Motion
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- YouTube Data API key

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/RaiAnsar/versmos.git
cd versmos
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Update `.env.local` with your credentials:
```env
# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=UCKYFhg2rnu1duTK6Sy2bBEw

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL schema from `/lib/supabase-schema.sql`
   - Create storage buckets as outlined in `/docs/SUPABASE_SETUP.md`

5. Import YouTube data:
```bash
npm run fetch-youtube
npm run generate-case-studies
npm run import-youtube-data
```

6. Run the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
versmos-website/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── portfolio/         # Portfolio pages
│   ├── services/          # Service pages
│   └── ...
├── components/            # React components
├── lib/                   # Utilities and configs
│   └── supabase/         # Supabase client
├── public/               # Static assets
│   ├── fonts/           # Custom fonts
│   └── assets/          # Images and logos
├── scripts/              # Data import scripts
├── data/                 # Generated data files
└── docs/                 # Documentation
```

## 🚀 Deployment

### Vercel Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

Add these in Vercel dashboard:
- `YOUTUBE_API_KEY`
- `YOUTUBE_CHANNEL_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run fetch-youtube` - Fetch YouTube data
- `npm run generate-case-studies` - Generate SEO content
- `npm run import-youtube-data` - Import to Supabase

## 🎨 Design System

### Colors
- Primary: `#0D1F23` (brand-darkest)
- Accent: `#25A3AB` (brand-cyan)
- Supporting colors defined in `tailwind.config.ts`

### Typography
- Custom Font: Nohemi
- Responsive type scale
- Optimized for readability

## 📱 Features by Page

### Homepage
- Hero section with showreel
- Dynamic featured videos from YouTube
- Service overview
- Client testimonials
- Client logos showcase

### Portfolio
- Video grid with filtering
- Category-based organization
- Direct YouTube embeds

### Case Studies
- SEO-optimized content
- Video showcases
- Client testimonials
- Performance metrics

## 🔒 Security

- Environment variables for sensitive data
- Row Level Security (RLS) in Supabase
- Secure API routes
- Input validation

## 📈 Performance

- Static generation where possible
- Image optimization with Next.js Image
- Lazy loading for videos
- Efficient data fetching

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is proprietary and confidential.

## 👥 Team

Built with ❤️ by Versmos Studios

---

For detailed setup instructions, see `/docs/SUPABASE_SETUP.md`