import { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/db';
import { SITE_CONFIG } from '@/lib/site-config';
import { COMMUNITY_ARTICLES } from '@/lib/articles-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.baseUrl;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const staticPages = [
    '',
    '/shop',
    '/about',
    '/offers',
    '/community',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/refund-policy',
    '/shipping-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  const productPages = products.map((p) => ({
    url: `${baseUrl}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const articlePages = COMMUNITY_ARTICLES.map((a) => ({
    url: `${baseUrl}/community/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...articlePages];
}
