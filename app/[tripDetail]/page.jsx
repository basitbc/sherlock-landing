// app/[tripDetail]/page.jsx

import TripDetailPage from '@/components/home/TripDetailPage';
import { generateTripDetailMetadata } from '@/utilis/seo/generateMetadata';
import tripData from '../../data/tripsData.json';

export async function generateMetadata({ params, searchParams }) {
  const tripSlug = params?.tripDetail;
  const tripId = searchParams?.id;

  let foundTrip = null;

  if (tripId) {
    foundTrip = tripData.find(trip => trip.id === tripId);
  }

  if (!foundTrip && tripSlug) {
    const slugifiedTrips = tripData.map(trip => ({
      ...trip,
      slug: trip.packageName?.replace(/\s+/g, '-').toLowerCase()
    }));
    foundTrip = slugifiedTrips.find(trip => trip.slug === tripSlug);
  }

  return generateTripDetailMetadata(foundTrip); // pass trip to your metadata generator
}

export default function KashmirPage() {
  return <TripDetailPage />;
}
