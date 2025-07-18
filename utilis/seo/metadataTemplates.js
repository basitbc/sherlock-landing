export const generateHomePageMetadata = () => {
  return {
    title: 'Sherlock Travels | Best Kashmir Tour Packages & Travel Agency 2025',
    description: 'Discover Kashmir with Sherlock Travels - Your trusted travel partner. Book best Kashmir tour packages, honeymoon trips, family vacations & luxury tours. Customize your Kashmir experience today!',
    keywords: 'Kashmir tours, Kashmir travel packages, Kashmir tourism, best Kashmir tour operator, Kashmir honeymoon packages, Kashmir family tours, travel agency Kashmir, Kashmir holidays 2025',
    canonical: '/',
    openGraph: {
      title: 'Sherlock Travels | Best Kashmir Tour Packages & Travel Agency 2025',
      description: 'Discover Kashmir with Sherlock Travels - Your trusted travel partner. Book best Kashmir tour packages, honeymoon trips, family vacations & luxury tours.',
      image: '/assets/images/hero/kashmir-landscape.jpg',
      url: 'https://kashmir.thesherlocktravels.com',
      type: 'website'
    },
    schema: generateLocalBusinessSchema()
  };
};

export const generateDestinationMetadata = (destination) => {
  return {
    title: `${destination.name} Tour Packages | Best ${destination.name} Travel Deals | Sherlock Travels`,
    description: `Explore ${destination.name} with our expertly crafted tour packages. ${destination.description}`,
    keywords: `${destination.name} tours, ${destination.name} packages, ${destination.name} travel, ${destination.name} tourism`,
    canonical: `/destinations/${destination.slug}`,
    openGraph: {
      title: `${destination.name} Tour Packages | Sherlock Travels`,
      description: `Explore ${destination.name} with our expertly crafted tour packages. ${destination.description}`,
      image: destination.image,
      type: 'website'
    }
  };
};