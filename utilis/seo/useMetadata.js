
// utils/useMetadata.js

import { useEffect } from 'react';

export const useMetadata = (metadata) => {
  useEffect(() => {
    if (!metadata) return;

    // Update document title
    if (metadata.title) {
      document.title = metadata.title;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      if (!content) return;
      
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector);
      
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };

    // Helper function to update or create link tags
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      
      let linkTag = document.querySelector(`link[rel="${rel}"]`);
      
      if (linkTag) {
        linkTag.setAttribute('href', href);
      } else {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', rel);
        linkTag.setAttribute('href', href);
        document.head.appendChild(linkTag);
      }
    };

    // Basic meta tags
    updateMetaTag('description', metadata.description);
    updateMetaTag('keywords', metadata.keywords);
    updateMetaTag('robots', metadata.robots || 'index, follow');

    // Canonical URL
    if (metadata.canonical) {
      updateLinkTag('canonical', `https://kashmir.thesherlocktravels.com${metadata.canonical}`);
    }

    // Open Graph tags
    if (metadata.openGraph) {
      updateMetaTag('og:title', metadata.openGraph.title, true);
      updateMetaTag('og:description', metadata.openGraph.description, true);
      updateMetaTag('og:image', metadata.openGraph.image, true);
      updateMetaTag('og:url', metadata.openGraph.url, true);
      updateMetaTag('og:type', metadata.openGraph.type, true);
      updateMetaTag('og:locale', metadata.openGraph.locale, true);
      updateMetaTag('og:site_name', metadata.openGraph.siteName, true);
      
      // Article specific tags
      if (metadata.openGraph.article) {
        updateMetaTag('article:published_time', metadata.openGraph.article.publishedTime, true);
        updateMetaTag('article:modified_time', metadata.openGraph.article.modifiedTime, true);
        updateMetaTag('article:section', metadata.openGraph.article.section, true);
        
        if (metadata.openGraph.article.tag) {
          metadata.openGraph.article.tag.forEach(tag => {
            const metaTag = document.createElement('meta');
            metaTag.setAttribute('property', 'article:tag');
            metaTag.setAttribute('content', tag);
            document.head.appendChild(metaTag);
          });
        }
      }
    }

    // Twitter tags
    if (metadata.twitter) {
      updateMetaTag('twitter:card', metadata.twitter.card);
      updateMetaTag('twitter:title', metadata.twitter.title);
      updateMetaTag('twitter:description', metadata.twitter.description);
      updateMetaTag('twitter:image', metadata.twitter.image);
    }

    // JSON-LD Schema
    if (metadata.schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      
      if (schemaScript) {
        schemaScript.textContent = JSON.stringify(metadata.schema);
      } else {
        schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.textContent = JSON.stringify(metadata.schema);
        document.head.appendChild(schemaScript);
      }
    }

  }, [metadata]);
};

