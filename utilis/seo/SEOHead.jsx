import React from 'react';
import { useMetadata } from './useMetadata';
import StructuredData from './StructuredData';

const SEOHead = ({ 
  title,
  description,
  keywords,
  canonical,
  image,
  type = 'website',
  structuredData,
  noIndex = false,
  children 
}) => {
  const metadata = {
    title,
    description,
    keywords,
    canonical,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title,
      description,
      image,
      type,
      url: canonical ? `https://kashmir.thesherlocktravels.com${canonical}` : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image
    }
  };

  useMetadata(metadata);

  return (
    <>
      {structuredData && <StructuredData data={structuredData} />}
      {children}
    </>
  );
};

export default SEOHead;