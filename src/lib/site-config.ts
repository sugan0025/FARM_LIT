export const SITE_CONFIG = {
  name: 'Farm_lit',
  title: 'Farm_lit | Fresh Vegetables, Fruits & Groceries in Sathyamangalam',
  description:
    'Order fresh farm vegetables, seasonal fruits, stone-ground flours, and grocery essentials online in Sathyamangalam, Erode, and Western Tamil Nadu from Farm_lit. Daily harvest with doorstep delivery.',
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
    address: 'Farm_lit Agro Fulfillment Hub, Bhavani River Road, Sathyamangalam, Erode District, Tamil Nadu 638401',
    city: 'Sathyamangalam',
    district: 'Erode',
    state: 'Tamil Nadu',
    pincode: '638401',
    country: 'India',
    coordinates: {
      latitude: 11.5034,
      longitude: 77.2441,
    },
  },
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'H9B-G6_XMCWWpvjJi2V8uHXwSDpBDJE6e32or8Z6x-U',
};
