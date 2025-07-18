// app/page.jsx

import TripPage from '@/components/home/tripPage';
import { generateKashmirPageMetadata } from '@/utilis/seo/generateMetadata';

// Export metadata for the page (works only in server components)
export const metadata = generateKashmirPageMetadata();

export default function KashmirPage() {
  return <TripPage />;
}