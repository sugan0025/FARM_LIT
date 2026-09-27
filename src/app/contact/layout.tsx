import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact Farm_lit | Customer Support & Fulfillment Hub Sathyamangalam',
  description:
    'Get in touch with Farm_lit customer support. Located on Bhavani River Road, Sathyamangalam, Tamil Nadu. Reach us by phone, email, or order assistance.',
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Farm_lit | Customer Support & Farm Hub',
    description:
      'Reach Farm_lit customer support for doorstep grocery deliveries across Sathyamangalam, Gobichettipalayam, and Erode.',
    url: `${SITE_CONFIG.baseUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
