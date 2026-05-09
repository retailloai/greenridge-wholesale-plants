# Wholesale Green Co Greenridge Style V4

This is the correct Greenridge-style real-coded version.

Confirm correct upload:
- app/page.tsx must contain: export default function WholesaleGreenCoGreenridgeV4()
- It must NOT contain: PremiumWholesalePlantDemo
- It must NOT use /screens/home.png, /screens/catalogue.png, or screenshot prototype files.

Includes:
- Real responsive Greenridge-style layout
- Working navigation
- Working search
- Working filters
- Working product detail modal
- Working approved buyer pricing
- Working cart drawer
- Supabase trade application saving
- Supabase quote request saving

Required Vercel environment variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
