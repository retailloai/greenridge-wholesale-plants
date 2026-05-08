# Greenridge Wholesale Plants - Vercel Starter

This is a Next.js + Tailwind starter ready for Vercel deployment.

## Fast deploy with Vercel

1. Create a new GitHub repository.
2. Upload all files from this folder into the repository.
3. Go to Vercel and choose **Add New Project**.
4. Import the GitHub repository.
5. Framework should auto-detect as **Next.js**.
6. Build command: `npm run build`
7. Output: leave default.
8. Deploy.
9. Add your domain in Vercel Project Settings > Domains.

## Important

This starter has front-end demo gating for approved buyer mode.
For real secure hidden pricing, connect Supabase Auth and protect pricing data server-side.

Recommended next upgrade:
- Supabase Auth
- buyer_profiles table with approved status
- products table
- quote_requests table
- admin approval dashboard
