import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Farm_lit | Fresh. Natural. Everyday.',
    short_name: 'Farm_lit',
    description:
      'Farm-harvested fresh vegetables, fruits, stone-ground flours, and grocery essentials delivered to your doorstep.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfaf8',
    theme_color: '#1e6b37',
    icons: [
      {
        src: '/images/categories/vegetables.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/images/categories/vegetables.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  };
}
