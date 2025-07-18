import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useSEO = (metadata) => {
  const router = useRouter();

  useEffect(() => {
    if (!metadata) return;

    // Update page title
    if (metadata.title) {
      document.title = metadata.title;
    }

    // Add/update meta tags
    const updateMetaTag = (name, content, property = false) => {
      if (!content) return;
      
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute(property ? 'property' : 'name', name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    // Basic meta tags
    updateMetaTag('description', metadata.description);
    updateMetaTag('keywords', metadata.keywords);
    updateMetaTag('robots', metadata.robots || 'index, follow');

    // Open Graph tags
    if (metadata.openGraph) {
      Object.entries(metadata.openGraph).forEach(([key, value]) => {
        updateMetaTag(`og:${key}`, value, true);
      });
    }

    // Twitter tags
    if (metadata.twitter) {
      Object.entries(metadata.twitter).forEach(([key, value]) => {
        updateMetaTag(`twitter:${key}`, value);
      });
    }

    // Canonical URL
    if (metadata.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://kashmir.thesherlocktravels.com${metadata.canonical}`);
      } else {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', `https://kashmir.thesherlocktravels.com${metadata.canonical}`);
        document.head.appendChild(canonical);
      }
    }

  }, [metadata]);
};