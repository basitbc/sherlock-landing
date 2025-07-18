// utils/generateMetadata.js

export const generateKashmirPageMetadata = () => {
  return {
    title: 'Kashmir Tour Packages | Best Kashmir Travel Packages 2025 | Sherlock Travels',
    description: 'Discover the best Kashmir tour packages with Sherlock Travels. Explore Kashmir honeymoon packages, family adventures, luxury retreats & spiritual journeys. Book your Kashmir trip today!',
    keywords: 'Kashmir tour packages, Kashmir travel, Kashmir honeymoon packages, Kashmir family tours, Gulmarg packages, Pahalgam tours, Dal Lake houseboats, Kashmir tourism, best Kashmir packages 2025',
    canonical: '/kashmir',
    openGraph: {
      title: 'Kashmir Tour Packages | Best Kashmir Travel Packages 2025 | Sherlock Travels',
      description: 'Discover the best Kashmir tour packages with Sherlock Travels. Explore Kashmir honeymoon packages, family adventures, luxury retreats & spiritual journeys. Book your Kashmir trip today!',
      image: '/assets/images/packages/couple-snow.jpg',
      url: '/kashmir',
      type: 'website',
      locale: 'en_US',
      siteName: 'Sherlock Travels'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kashmir Tour Packages | Best Kashmir Travel Packages 2025 | Sherlock Travels',
      description: 'Discover the best Kashmir tour packages with Sherlock Travels. Explore Kashmir honeymoon packages, family adventures, luxury retreats & spiritual journeys. Book your Kashmir trip today!',
      image: '/assets/images/packages/couple-snow.jpg'
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": "Kashmir Tour Packages",
      "description": "Premium Kashmir tour packages offering honeymoon trips, family adventures, and luxury experiences in the paradise on earth.",
      "url": "https://kashmir.thesherlocktravels.com/kashmir",
      "image": "/assets/images/packages/couple-snow.jpg",
      "provider": {
        "@type": "TravelAgency",
        "name": "Sherlock Travels",
        "url": "https://kashmir.thesherlocktravels.com"
      }
    }
  };
};

export const generateTripDetailMetadata = (trip) => {
  if (!trip) {
    return {
      title: 'Package Not Found | Sherlock Travels',
      description: 'The requested travel package could not be found. Explore our other Kashmir tour packages.',
      robots: 'noindex, nofollow'
    };
  }

  const baseUrl = 'https://kashmir.thesherlocktravels.com';
  const tripSlug = trip.packageName?.replace(/\s+/g, "-").toLowerCase();
  const packageUrl = `${baseUrl}/${tripSlug}?id=${trip.id}`;
  
  // Dynamic keywords based on package content
  const generateKeywords = (trip) => {
    const baseKeywords = ['Kashmir tour', 'Kashmir package', 'Kashmir travel', 'Sherlock Travels'];
    const locationKeywords = [];
    const activityKeywords = [];
    
    // Add location-specific keywords
    if (trip.location?.toLowerCase() === 'kashmir') {
      locationKeywords.push('Srinagar', 'Gulmarg', 'Pahalgam', 'Dal Lake', 'Kashmir valley');
    }
    
    // Add activity-specific keywords based on package name
    const packageName = trip.packageName?.toLowerCase() || '';
    if (packageName.includes('honeymoon')) {
      activityKeywords.push('Kashmir honeymoon', 'romantic Kashmir', 'couples Kashmir tour');
    }
    if (packageName.includes('family')) {
      activityKeywords.push('Kashmir family tour', 'family Kashmir package', 'Kashmir with kids');
    }
    if (packageName.includes('luxury')) {
      activityKeywords.push('luxury Kashmir tour', 'premium Kashmir package', 'luxury Kashmir hotels');
    }
    if (packageName.includes('spiritual')) {
      activityKeywords.push('Vaishno Devi', 'Kashmir pilgrimage', 'spiritual Kashmir tour');
    }
    if (packageName.includes('adventure') || packageName.includes('expedition')) {
      activityKeywords.push('Kashmir adventure', 'Kashmir trekking', 'Kashmir expedition');
    }
    
    return [...baseKeywords, ...locationKeywords, ...activityKeywords].join(', ');
  };

  // Generate rich description
  const generateRichDescription = (trip) => {
    let description = trip.description || '';
    
    // Add pricing info if available
    if (trip.price) {
      description += ` Starting from ₹${trip.price} per person for ${trip.duration}.`;
    }
    
    // Add key highlights
    if (trip.tourPlan && trip.tourPlan.length > 0) {
      const highlights = trip.tourPlan.slice(0, 3).map(day => day.title).join(', ');
      description += ` Highlights include: ${highlights}.`;
    }
    
    return description.length > 160 ? description.substring(0, 157) + '...' : description;
  };

  return {
    title: `${trip.packageName} - ${trip.duration} | From ₹${trip.price} | Sherlock Travels`,
    description: generateRichDescription(trip),
    keywords: generateKeywords(trip),
    canonical: `/${tripSlug}`,
    openGraph: {
      title: `${trip.packageName} - ${trip.duration} | Sherlock Travels`,
      description: generateRichDescription(trip),
      image: trip.bgImage || trip.images?.[0]?.src || '/assets/images/logo/company-logo.png',
      url: packageUrl,
      type: 'article',
      locale: 'en_US',
      siteName: 'Sherlock Travels',
      article: {
        publishedTime: new Date().toISOString(),
        modifiedTime: new Date().toISOString(),
        section: 'Travel Packages',
        tag: generateKeywords(trip).split(', ')
      }
    },
    twitter: {
      card: 'summary_large_image',
      title: `${trip.packageName} - ${trip.duration} | Sherlock Travels`,
      description: generateRichDescription(trip),
      image: trip.bgImage || trip.images?.[0]?.src || '/assets/images/logo/company-logo.png'
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": trip.packageName,
      "description": trip.description,
      "duration": trip.duration,
      "offers": {
        "@type": "Offer",
        "price": trip.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      "provider": {
        "@type": "TravelAgency",
        "name": "Sherlock Travels",
        "url": "https://kashmir.thesherlocktravels.com"
      },
      "url": packageUrl,
      "image": trip.bgImage || trip.images?.[0]?.src,
      "itinerary": trip.tourPlan?.map(day => ({
        "@type": "Day",
        "name": day.title,
        "description": day.description
      }))
    }
  };
};
