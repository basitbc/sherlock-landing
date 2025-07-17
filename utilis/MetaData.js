// File Structure:
// utils/metadata.js (create this file with the metadata utility functions)
// app/destinations/[destination]/page.js
// app/destinations/[destination]/DestinationPageComponent.js
// app/destinations/[destination]/[tripDetail]/page.js
// app/destinations/[destination]/[tripDetail]/TripDetailPageComponent.js

// ===== utils/metadata.js =====
import { destinationData } from '@/data/destinationData';
import tripData from '@/data/tripsData.json';

const baseMetadata = {
  siteName: 'Sherlock Travels',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://sherlocktravels.com',
  defaultImage: '/assets/images/logo/company-logo.png',
  twitterHandle: '@sherlocktravels',
};

export function generateDestinationMetadata(destinationSlug) {
  const destination = destinationData[destinationSlug];
  
  if (!destination) {
    return generateNotFoundMetadata();
  }

  const title = `${destination.title} Tours & Packages | Sherlock Travels`;
  const description = destination.overview?.description || 
    `Discover ${destination.title} with Sherlock Travels. Explore handpicked travel experiences, luxury accommodations, and authentic local adventures in ${destination.title.split(' - ')[0]}.`;
  
  const image = destination.heroImage || baseMetadata.defaultImage;
  const url = `${baseMetadata.baseUrl}/destinations/${destinationSlug}`;

  return {
    title,
    description,
    keywords: [
      destination.title.split(' - ')[0],
      'travel packages',
      'tours',
      'Kashmir travel',
      'Sherlock Travels',
      destinationSlug,
      'luxury travel',
      'customized tours'
    ].join(', '),
    
    openGraph: {
      title,
      description,
      url,
      siteName: baseMetadata.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${destination.title} - Travel with Sherlock Travels`,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: baseMetadata.twitterHandle,
    },
    
    alternates: {
      canonical: url,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateTripMetadata(tripId, destinationSlug) {
  const trip = tripData.find(t => t.id === tripId);
  
  if (!trip) {
    return generateNotFoundMetadata();
  }

  const title = `${trip.packageName} | ${trip.destination || trip.location} Package - Sherlock Travels`;
  const description = trip.description || 
    `Book ${trip.packageName} with Sherlock Travels. ${trip.duration} trip starting from ${trip.currency || '₹'}${trip.price}. Includes ${trip.mealsPlan} and premium accommodations.`;
  
  const image = trip.images?.[0] || baseMetadata.defaultImage;
  const url = `${baseMetadata.baseUrl}/destinations/${destinationSlug}/${trip.slug || 'trip'}?id=${tripId}`;

  return {
    title,
    description,
    keywords: [
      trip.packageName,
      trip.destination || trip.location,
      'travel package',
      'Kashmir tour',
      'Sherlock Travels',
      trip.duration,
      'luxury travel',
      'customized tour'
    ].join(', '),
    
    openGraph: {
      title,
      description,
      url,
      siteName: baseMetadata.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${trip.packageName} - ${trip.destination || trip.location}`,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: baseMetadata.twitterHandle,
    },
    
    alternates: {
      canonical: url,
    },
    
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateNotFoundMetadata() {
  return {
    title: 'Page Not Found | Sherlock Travels',
    description: 'The page you are looking for could not be found. Explore our travel packages and destinations.',
    robots: {
      index: false,
      follow: false,
    },
  };
}


