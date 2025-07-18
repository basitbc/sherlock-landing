// app/page.jsx

const TripPage = dynamic(() => import('@/components/home/TripPage'), { ssr: false });
import { generateKashmirPageMetadata } from '@/utilis/seo/generateMetadata';
import dynamic from 'next/dynamic';

// Export metadata for the page (works only in server components)
export const metadata = generateKashmirPageMetadata();

export default function KashmirPage() {
  return <TripPage />;
}