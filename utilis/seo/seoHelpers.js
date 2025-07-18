export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-'); // Remove leading/trailing hyphens
};

export const truncateText = (text, maxLength = 160) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + '...';
};

export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": `https://kashmir.thesherlocktravels.com${breadcrumb.url}`
    }))
  };
};

export const generateFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Sherlock Travels",
    "image": "https://kashmir.thesherlocktravels.com/assets/images/logo/company-logo.png",
    "description": "Premier travel agency specializing in Kashmir tour packages and customized travel experiences.",
    "url": "https://kashmir.thesherlocktravels.com",
    "telephone": "+91-9797009339", // Add your phone number
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chinkral Mohalla, Habba Kadal", // Add your address
      "addressLocality": "Srinagar",
      "addressRegion": "Jammu and Kashmir",
      "postalCode": "190001", // Add your postal code
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0837, // Add your latitude
      "longitude": 74.7973 // Add your longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/thesherlocktravels", // Add your social media URLs
      "https://www.instagram.com/sherlocktravels_",
      "https://www.linkedin.com/company/sherlocktravels"
    ]
  };
};