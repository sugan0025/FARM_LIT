export const SITE_CONFIG = {
  name: 'Farm_lit',
  title: 'Farm_lit | Fresh Vegetables, Fruits, Grains & Everyday Groceries',
  description:
    'Order fresh vegetables, fruits, stone-ground flours, and everyday grocery essentials online from Farm_lit. Harvested fresh from local farms with doorstep delivery.',
  // Dynamic base URL with fallback to the active production deployment
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://farmlit.vercel.app'),
  social: {
    instagram: 'https://www.instagram.com/farm_lit?stkn=MTJuaWwyMHZ5bWcycw==',
    instagramHandle: '@farm_lit',
  },
  contact: {
    email: 'support@farmlit.com',
    phone: '+91 8000 456 789',
    address: 'Green Valley Agro Logistics, Hinjawadi Phase 2, Pune, Maharashtra 411057',
  },
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'H9B-G6_XMCWWpvjJi2V8uHXwSDpBDJE6e32or8Z6x-U',
};
